using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Sysphera.Middleware.Drapo.Pipe
{
    public class DrapoPlumberHub : Hub
    {
        private readonly DrapoMiddlewareOptions _options;
        private readonly IDrapoConnectionManager _connectionManager;

        public DrapoPlumberHub(DrapoMiddlewareOptions options, IDrapoConnectionManager connectionManager)
        {
            this._options = options;
            this._connectionManager = connectionManager;
        }
        public string GetConnectionId()
        {
            return (this.Context.ConnectionId);
        }

        public async void Register()
        {
            string connectionId = this.GetConnectionId();
            DrapoPipeMessage message = new DrapoPipeMessage();
            message.Type = DrapoPipeMessageType.Register;
            message.Data = connectionId;
            IClientProxy proxy = this.Clients.Client(connectionId);
            await proxy.SendAsync(this._options.Config.PipeActionNotify, message);
        }

        public override async Task OnConnectedAsync()
        {
            // Validate Origin header to prevent Cross-Site WebSocket Hijacking (CSWSH)
            if (this._options.Config.ValidateWebSocketOrigin)
            {
                if (!IsOriginAllowed())
                {
                    Context.Abort();
                    return;
                }
            }

            string connectionId = this.GetConnectionId();
            string domain = this.GetDomain() ?? string.Empty;
            string containerId = GetContainerId();
            _connectionManager.Create(domain, connectionId, containerId);
            await Groups.AddToGroupAsync(connectionId, domain);
            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            string connectionId = this.GetConnectionId();
            string domain = this.GetDomain() ?? string.Empty;
            _connectionManager.Remove(domain, connectionId);
            await Groups.RemoveFromGroupAsync(connectionId, domain);
            await base.OnDisconnectedAsync(exception);
        }

        private string GetDomain() 
        {
            string domainRegex = this._options.Config.DomainRegex;
            if (string.IsNullOrEmpty(domainRegex))
                return (string.Empty);
            string host = this.Context?.GetHttpContext()?.Request?.Host.Host;
            if (string.IsNullOrEmpty(host))
                return (string.Empty);
            Match match = Regex.Match(host, domainRegex);
            if (match == null)
                return (string.Empty);
            string domain = match.Groups[this._options.Config.DomainGroup].Value;
            if (string.IsNullOrEmpty(domain))
                return (string.Empty);
            return (domain);
        }

        private string GetContainerId() {
            return (Environment.MachineName);
        }

        private bool IsOriginAllowed()
        {
            HttpContext httpContext = this.Context?.GetHttpContext();
            if (httpContext == null)
                return false;
            // Get the Origin header
            string origin = httpContext.Request.Headers["Origin"].ToString();
            // If no Origin header is present, check Referer as fallback
            if (string.IsNullOrEmpty(origin))
            {
                origin = httpContext.Request.Headers["Referer"].ToString();
                if (!string.IsNullOrEmpty(origin))
                {
                    // Extract origin from referer URL
                    try
                    {
                        Uri refererUri = new Uri(origin);
                        origin = $"{refererUri.Scheme}://{refererUri.Authority}";
                    }
                    catch (UriFormatException)
                    {
                        // Invalid URI format in Referer header
                        return false;
                    }
                }
            }
            // If still no origin, reject the connection
            if (string.IsNullOrEmpty(origin))
                return false;
            // Always validate against the current request host
            string requestScheme = httpContext.Request.Scheme;
            string requestHost = httpContext.Request.Host.ToString();
            string expectedOrigin = $"{requestScheme}://{requestHost}";
            // Check if origin matches current domain
            if (string.Equals(origin, expectedOrigin, StringComparison.OrdinalIgnoreCase))
                return true;
            // Also check configured list of allowed origins if present
            if (this._options.Config.AllowedWebSocketOrigins != null && this._options.Config.AllowedWebSocketOrigins.Count > 0)
                return this._options.Config.AllowedWebSocketOrigins.Any(allowedOrigin => string.Equals(origin, allowedOrigin, StringComparison.OrdinalIgnoreCase));
            // Origin is neither current domain nor in the allowed list
            return false;
        }

        public async Task Polling(DrapoPipePollingMessage message) {
            string domain = this.GetDomain();
            string connectionId = this.GetConnectionId();
            string hash = this._options.PollingEvent != null ? await this._options.PollingEvent(domain, connectionId, message.Key): string.Empty;
            IClientProxy proxy = this.Clients.Client(connectionId);
            message.Hash = hash;
            await proxy.SendAsync(this._options.Config.PipeActionPolling, message);
        }
    }
}

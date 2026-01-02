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

        private bool IsValidHttpScheme(Uri uri)
        {
            // Only accept http or https schemes for security
            return string.Equals(uri.Scheme, "http", StringComparison.OrdinalIgnoreCase) ||
                   string.Equals(uri.Scheme, "https", StringComparison.OrdinalIgnoreCase);
        }

        private bool IsOriginAllowed()
        {
            HttpContext httpContext = this.Context?.GetHttpContext();
            if (httpContext == null)
                return false;
            
            // Extract the origin host (authority) from either Origin or Referer header
            // This allows gateways to handle HTTPS while internal app uses HTTP
            string originHost;
            
            // Get the Origin header
            string origin = httpContext.Request.Headers["Origin"].ToString();
            if (!string.IsNullOrEmpty(origin))
            {
                // Parse Origin header to extract host
                try
                {
                    Uri originUri = new Uri(origin);
                    if (!IsValidHttpScheme(originUri))
                        return false;
                    originHost = originUri.Authority;
                }
                catch (UriFormatException)
                {
                    // Invalid origin format
                    return false;
                }
            }
            else
            {
                // If no Origin header, check Referer as fallback
                string referer = httpContext.Request.Headers["Referer"].ToString();
                if (string.IsNullOrEmpty(referer))
                    return false;
                
                // Parse Referer to extract host
                try
                {
                    Uri refererUri = new Uri(referer);
                    if (!IsValidHttpScheme(refererUri))
                        return false;
                    originHost = refererUri.Authority;
                }
                catch (UriFormatException)
                {
                    // Invalid URI format in Referer header
                    return false;
                }
            }
            
            // Always validate against the current request host (scheme-independent)
            string requestHost = httpContext.Request.Host.ToString();
            
            // Check if origin host matches current domain host (ignoring scheme)
            if (string.Equals(originHost, requestHost, StringComparison.OrdinalIgnoreCase))
                return true;
            
            // Also check configured list of allowed origins if present
            if (this._options.Config.AllowedWebSocketOrigins != null && this._options.Config.AllowedWebSocketOrigins.Count > 0)
            {
                foreach (string allowedOrigin in this._options.Config.AllowedWebSocketOrigins)
                {
                    try
                    {
                        // Extract host from allowed origin and compare (scheme-independent)
                        Uri allowedUri = new Uri(allowedOrigin);
                        if (!IsValidHttpScheme(allowedUri))
                            continue;
                        if (string.Equals(originHost, allowedUri.Authority, StringComparison.OrdinalIgnoreCase))
                            return true;
                    }
                    catch (UriFormatException)
                    {
                        // If allowed origin is not a valid URI, skip it
                        continue;
                    }
                }
            }
            
            // Origin host is neither current domain nor in the allowed list
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

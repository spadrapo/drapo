using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
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
    }
}

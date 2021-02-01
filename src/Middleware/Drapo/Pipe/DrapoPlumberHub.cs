using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Sysphera.Middleware.Drapo.Pipe
{
    public class DrapoPlumberHub : Hub
    {
        private DrapoMiddlewareOptions _options;
        
        public DrapoPlumberHub(DrapoMiddlewareOptions options)
        {
            this._options = options;
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

        public override Task OnConnectedAsync()
        {
            string connectionId = Context.ConnectionId;
            string domain = Context.UserIdentifier;
            DrapoPlumber._connections.TryAdd(connectionId, new DrapoConnection(connectionId, domain));
            return base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            string connectionId = Context.ConnectionId;
            DrapoPlumber._connections.TryRemove(connectionId, out _);
            await base.OnDisconnectedAsync(exception);
        }
    }
}

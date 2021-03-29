using Microsoft.AspNetCore.SignalR;
using Sysphera.Middleware.Drapo.Request;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sysphera.Middleware.Drapo.Pipe
{
    public class DrapoPlumber : IDrapoPlumber
    {
        private readonly DrapoMiddlewareOptions _options;
        private readonly IDrapoRequestReader _requestReader;
        private readonly IHubContext<DrapoPlumberHub> _hub;
        private readonly IDrapoConnectionManager _connectionManager;

        public DrapoPlumber(DrapoMiddlewareOptions options, IDrapoRequestReader requestHeaderReader, IHubContext<DrapoPlumberHub> hub, IDrapoConnectionManager connectionManager)
        {
            this._options = options;
            this._requestReader = requestHeaderReader;
            this._hub = hub;
            _connectionManager = connectionManager;
        }

        public async Task<bool> Send(DrapoPipeMessage message, DrapoPipeAudienceType recipient)
        {
            IClientProxy proxy = this.GetRecipients(recipient);
            if (proxy == null)
                return (await Task.FromResult<bool>(false));
            await proxy.SendAsync(this._options.Config.PipeActionNotify, message);
            return (await Task.FromResult<bool>(true));
        }

        private IClientProxy GetRecipients(DrapoPipeAudienceType recipient)
        {
            string connectionId = this._requestReader.GetPipeHeaderConnectionId();
            if (string.IsNullOrEmpty(connectionId))
                return (null);
            DrapoConnection connection = _connectionManager.Get(_requestReader.GetDomain() ?? string.Empty, connectionId);
            if (connection == null)
                return (null);
            if (recipient == DrapoPipeAudienceType.Others)
                return (this._hub.Clients.GroupExcept(connection.Domain, new List<string>(){ connectionId }));
            else if (recipient == DrapoPipeAudienceType.Me)
                return (this._hub.Clients.Client(connectionId));
            else if (recipient == DrapoPipeAudienceType.Everyone)
                return (this._hub.Clients.Group(connection.Domain));
            return (null);
        }

        public async Task<long> Count()
        {
            return (await Task.FromResult<long>(_connectionManager.Count(_requestReader.GetDomain() ?? string.Empty)));
        }

        public async Task<bool> Identify(long identity)
        {
            string connectionId = this._requestReader.GetPipeHeaderConnectionId();
            if (string.IsNullOrEmpty(connectionId))
                return (false);
            bool updated = _connectionManager.Identify(_requestReader.GetDomain() ?? string.Empty, connectionId, identity);
            return (await Task.FromResult<bool>(updated));
        }

        public async Task<List<DrapoConnection>> GetConnections()
        {
            List<DrapoConnection> connections = _connectionManager.GetAll(_requestReader.GetDomain() ?? string.Empty);
            return (await Task.FromResult<List<DrapoConnection>>(connections));
        }
    }
}

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
        private DrapoMiddlewareOptions _options;
        private IDrapoRequestHeaderReader _requestHeaderReader;
        private IHubContext<DrapoPlumberHub> _hub;
        internal static ConcurrentDictionary<string, DrapoConnection> _connections = new ConcurrentDictionary<string, DrapoConnection>();
        public DrapoPlumber(DrapoMiddlewareOptions options, IDrapoRequestHeaderReader requestHeaderReader, IHubContext<DrapoPlumberHub> hub)
        {
            this._options = options;
            this._requestHeaderReader = requestHeaderReader;
            this._hub = hub;
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
            if (recipient == DrapoPipeAudienceType.Others)
                return (this._hub.Clients.AllExcept(new List<string>(){this._requestHeaderReader.GetPipeHeaderConnectionId() }));
            else if (recipient == DrapoPipeAudienceType.Me)
                return (this._hub.Clients.Client(this._requestHeaderReader.GetPipeHeaderConnectionId()));
            else if (recipient == DrapoPipeAudienceType.Everyone)
                return (_hub.Clients.All);
            return (null);
        }

        public async Task<long> Count(string domain = null)
        {
            string domainCurrent = domain ?? string.Empty;
            return (await Task.FromResult<long>(_connections.Values.ToList().FindAll(c => c.Domain == domainCurrent).Count()));
        }

        public async Task<bool> Identify(long identity)
        {
            string connectionId = this._requestHeaderReader.GetPipeHeaderConnectionId();
            if (string.IsNullOrEmpty(connectionId))
                return (false);
            if (!DrapoPlumber._connections.TryGetValue(connectionId, out DrapoConnection connection))
                return (false);
            connection.Identity = identity;
            return (await Task.FromResult<bool>(true));
        }

        public async Task<List<DrapoConnection>> GetConnections(string domain = null)
        {
            string domainCurrent = domain ?? string.Empty;
            List<DrapoConnection> connections = new List<DrapoConnection>(_connections.Values.ToList().FindAll(c => c.Domain == domainCurrent));
            return (await Task.FromResult<List<DrapoConnection>>(connections));
        }
    }
}

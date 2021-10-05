﻿using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sysphera.Middleware.Drapo.Pipe
{
    public class DrapoConnectionManagerSingle : IDrapoConnectionManager
    {
        private readonly ConcurrentDictionary<string, DrapoConnection> _connections = new ConcurrentDictionary<string, DrapoConnection>();
        public void Create(string domain, string connectionId, string containerId) {
            _connections.TryAdd(connectionId, new DrapoConnection(connectionId, domain, containerId));
        }
        public bool Remove(string domain, string connectionId) {
            return(_connections.TryRemove(connectionId, out _));
        }
        public long Count(string domain) {
            return (this.GetAll(domain).Count);
        }
        public DrapoConnection Get(string domain, string connectionId) {
            if (_connections.TryGetValue(connectionId, out DrapoConnection connection))
                return (connection);
            return (null);
        }
        public bool Identify(string domain, string connectionId, long identity) {
            DrapoConnection connection = this.Get(domain, connectionId);
            if (connection == null)
                return (false);
            connection.Identity = identity;
            return (true);
        }
        public List<DrapoConnection> GetAll(string domain) {
            List<DrapoConnection> connections = new List<DrapoConnection>(_connections.Values.ToList().FindAll(c => c.Domain == domain));
            return (connections);
        }

        public bool Check() 
        {
            return (false);
        }
    }
}

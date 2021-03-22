using ServiceStack.Redis;
using System;
using System.Collections.Generic;
using System.Text;

namespace Sysphera.Middleware.Drapo.Pipe
{
    public class DrapoConnectionManagerRedis : IDrapoConnectionManager
    {
        private readonly RedisManagerPool _redisManagerPool = null;
        public DrapoConnectionManagerRedis(DrapoMiddlewareOptions options) {
            _redisManagerPool = new RedisManagerPool(options.BackplaneRedis);
        }

        private string CreateDomainKey(string domain) {
            return ($"drapo_connection_{domain}");
        }
        private string CreateConnectionKey(string domain, string connectionId)
        {
            return ($"drapo_connection_{domain}_{connectionId}");
        }

        public void Create(string domain, string connectionId)
        {
            using (IRedisClient client = _redisManagerPool.GetClient()) 
            {
                DrapoConnection connection = new DrapoConnection(connectionId, domain);
                client.Set<DrapoConnection>(this.CreateConnectionKey(domain, connectionId), connection);
            }
        }
        public bool Remove(string domain, string connectionId)
        {
            using (IRedisClient client = _redisManagerPool.GetClient()) 
            {
                return(client.Remove(this.CreateConnectionKey(domain, connectionId)));
            }
        }

        public long Count(string domain)
        {
            return (this.GetAll(domain).Count);
        }
        public DrapoConnection Get(string domain, string connectionId)
        {
            using (IRedisClient client = _redisManagerPool.GetClient()) {
                return(client.Get<DrapoConnection>(this.CreateConnectionKey(domain, connectionId)));
            }
        }

        public bool Identify(string domain, string connectionId, long identity)
        {
            using (IRedisClient client = _redisManagerPool.GetClient())
            {
                DrapoConnection connection = client.Get<DrapoConnection>(this.CreateConnectionKey(domain, connectionId));
                if (connection == null)
                    return (false);
                connection.Identity = identity;
                client.Set<DrapoConnection>(this.CreateConnectionKey(domain, connectionId), connection);
            }
            return (true);
        }

        public List<DrapoConnection> GetAll(string domain)
        {
            List<DrapoConnection> connections = new List<DrapoConnection>();
            using (IRedisClient client = _redisManagerPool.GetClient())
            {
                foreach (string key in client.GetKeysByPattern(this.CreateDomainKey(domain) + "*")) 
                {
                    DrapoConnection connection = client.Get<DrapoConnection>(key);
                    if (connection != null)
                        connections.Add(connection);
                }
            }
            return (connections);
        }
    }
}

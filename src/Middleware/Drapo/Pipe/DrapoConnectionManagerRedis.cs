using Newtonsoft.Json;
using StackExchange.Redis;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Sysphera.Middleware.Drapo.Pipe
{
    public class DrapoConnectionManagerRedis : IDrapoConnectionManager
    {
        private readonly ConnectionMultiplexer _connection = null;
        public DrapoConnectionManagerRedis(DrapoMiddlewareOptions options)
        {
            _connection = ConnectionMultiplexer.Connect(options.BackplaneRedis);
            Check();
        }

        private string CreateDomainKey(string domain)
        {
            return ($"drapo_connection_{domain}");
        }
        private string CreateConnectionKey(string domain, string connectionId)
        {
            return ($"drapo_connection_{domain}_{connectionId}");
        }

        public void Create(string domain, string connectionId, string containerId)
        {
            IDatabase database = _connection.GetDatabase();
            DrapoConnection connection = new DrapoConnection(connectionId, domain, containerId);
            database.StringSet(this.CreateConnectionKey(domain, connectionId), Serialize(connection));
        }
        public bool Remove(string domain, string connectionId)
        {
            IDatabase database = _connection.GetDatabase();
            return (database.KeyDelete(this.CreateConnectionKey(domain, connectionId)));
        }

        public long Count(string domain)
        {
            return (this.GetAll(domain).Count);
        }
        public DrapoConnection Get(string domain, string connectionId)
        {
            IDatabase database = _connection.GetDatabase();
            return (Get<DrapoConnection>(database, this.CreateConnectionKey(domain, connectionId)));
        }

        public bool Identify(string domain, string connectionId, long identity)
        {
            IDatabase database = _connection.GetDatabase();
            DrapoConnection connection = Get<DrapoConnection>(database, this.CreateConnectionKey(domain, connectionId));
            if (connection == null)
                return (false);
            connection.Identity = identity;
            database.StringSet(this.CreateConnectionKey(domain, connectionId), Serialize(connection));
            return (true);
        }

        public List<DrapoConnection> GetAll(string domain)
        {
            List<DrapoConnection> connections = new List<DrapoConnection>();
            IDatabase database = _connection.GetDatabase();
            foreach (string key in GetKeysByPattern(this.CreateDomainKey(domain) + "*"))
            {
                DrapoConnection connection = Get<DrapoConnection>(database, key);
                if (connection != null)
                    connections.Add(connection);
            }
            return (connections);
        }

        public bool Check()
        {
            bool updated = false;
            Dictionary<string, bool> containers = new Dictionary<string, bool>();
            IDatabase database = _connection.GetDatabase();
            foreach (string key in GetKeysByPattern(this.CreateDomainKey(string.Empty) + "*"))
            {
                DrapoConnection connection = Get<DrapoConnection>(database, key);
                if (connection == null)
                    continue;
                if (string.IsNullOrEmpty(connection.ContainerId))
                    continue;
                if (!containers.ContainsKey(connection.ContainerId))
                    containers.Add(connection.ContainerId, IsContainerConnected(database, connection.ContainerId));
                if (containers[connection.ContainerId])
                    continue;
                if (database.KeyDelete(key))
                    updated = true;
            }
            return (updated);
        }

        private bool IsContainerConnected(IDatabase database, string containerId)
        {
            List<string> keys = new List<string>();
            foreach (System.Net.EndPoint endPoint in _connection.GetEndPoints())
            {
                IServer server = _connection.GetServer(endPoint);
                RedisChannel[] channels = server.SubscriptionChannels("*" + containerId + "*");
                if ((channels != null) && (channels.Length > 0))
                    return (true);
            }
            return (false);
        }

        private List<string> GetKeysByPattern(string pattern)
        {
            List<string> keys = new List<string>();
            IDatabase database = _connection.GetDatabase();
            foreach (System.Net.EndPoint endPoint in _connection.GetEndPoints())
            {
                IServer server = _connection.GetServer(endPoint);
                foreach (RedisKey redisKey in server.Keys(database.Database, pattern))
                {
                    keys.Add(redisKey);
                }
            }
            return (keys);
        }

        private T Get<T>(IDatabase database, string key)
        {
            string data = database.StringGet(key);
            if (data is null)
                return (default(T));
            return (Deserialize<T>(data));
        }

        private string Serialize(object data)
        {
            return (JsonConvert.SerializeObject(data));
        }

        private T Deserialize<T>(string data)
        {
            return (JsonConvert.DeserializeObject<T>(data));
        }
    }
}

using System;
using System.Collections.Generic;
using System.Text;

namespace Sysphera.Middleware.Drapo.Pipe
{
    public class DrapoConnectionManagerRedis : IDrapoConnectionManager
    {
        private readonly DrapoMiddlewareOptions _options;
        public DrapoConnectionManagerRedis(DrapoMiddlewareOptions options) {
            _options = options;
        }

        public void Create(string domain, string connectionId)
        {
        }
        public bool Remove(string domain, string connectionId)
        {
            return (false);
        }

        public long Count(string domain)
        {
            return (0);
        }
        public DrapoConnection Get(string domain, string connectionId)
        {
            return (null);
        }
        public List<DrapoConnection> GetAll(string domain)
        {
            return (null);
        }
    }
}

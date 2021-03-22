using System;
using System.Collections.Generic;
using System.Text;

namespace Sysphera.Middleware.Drapo.Pipe
{
    public interface IDrapoConnectionManager
    {
        void Create(string domain, string connectionId);
        bool Remove(string domain, string connectionId);
        long Count(string domain);
        DrapoConnection Get(string domain, string connectionId);
        bool Identify(string domain, string connectionId, long identity);
        List<DrapoConnection> GetAll(string domain);
    }
}

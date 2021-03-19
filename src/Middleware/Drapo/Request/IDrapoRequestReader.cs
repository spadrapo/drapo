using System;
using System.Collections.Generic;
using System.Text;

namespace Sysphera.Middleware.Drapo.Request
{
    public interface IDrapoRequestReader
    {
        string Get(string key);
        string GetPipeHeaderConnectionId();
        void SetPipeHeaderConnectionId(string connectionId);
        string GetDomain();
    }
}

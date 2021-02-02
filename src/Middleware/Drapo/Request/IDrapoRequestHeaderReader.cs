using System;
using System.Collections.Generic;
using System.Text;

namespace Sysphera.Middleware.Drapo.Request
{
    public interface IDrapoRequestHeaderReader
    {
        string Get(string key);
        string GetPipeHeaderConnectionId();
        void SetPipeHeaderConnectionId(string connectionId);
    }
}

using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Sysphera.Middleware.Drapo.User
{
    public interface IDrapoUserConfig
    {
        Task Ensure(Dictionary<string, string> values);
    }
}

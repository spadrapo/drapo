using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Text;

namespace Sysphera.Middleware.Drapo
{
    public class DrapoPackRequest
    {
        public string PackName { set; get; }
        public HttpContext Context { set; get; }
    }
}

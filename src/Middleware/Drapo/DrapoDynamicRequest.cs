using System;
using System.Collections.Generic;
using System.Text;

namespace Sysphera.Middleware.Drapo
{
    public class DrapoDynamicRequest
    {
        public string Code { set; get; }
        public string Context { set; get; }
        public string Path { set; get; }
        public string PathBase { set; get; }
    }
}

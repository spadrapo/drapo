using System;
using System.Collections.Generic;
using System.Text;

namespace Sysphera.Middleware.Drapo
{
    public class DrapoDynamicResponse
    {
        public string Content { set; get; }
        public bool IsContext { set; get; }
        public DateTime LastModified { set; get; }
        public int? Status { set; get; }
        public Dictionary<string, string> Headers { set; get; }
    }
}

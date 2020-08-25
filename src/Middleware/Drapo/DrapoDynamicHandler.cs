using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace Sysphera.Middleware.Drapo
{
    public class DrapoDynamicHandler
    {
        public string Name { set; get; }
        public string Tag { set; get; }
        public string ContentType { set; get; }
        public bool UseTheme { set; get; }
        public bool UseView { set; get; }
        [IgnoreDataMember]
        public Func<DrapoDynamicRequest, Task<DrapoDynamicResponse>> Handler { set; get; }
    }
}

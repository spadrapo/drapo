using System;
using System.Collections.Generic;
using System.Text;

namespace Sysphera.Middleware.Drapo
{
    public class DrapoFile
    {
        public string Key { set; get; }
        public bool Exists { set; get; }
        public string Path { set; get; }
        public string ETag { set; get; }
        public string LastModified { set; get; }
        public string ContentData { set; get; }

    }
}

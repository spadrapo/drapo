using System;
using System.Collections.Generic;
using System.Text;

namespace Sysphera.Middleware.Drapo
{
    public class DrapoPackResponse
    {
        public string Name { set; get; }
        public List<DrapoPackFile> Files { set; get; }
        public string Content { set; get; }

        public DrapoPackResponse()
        {
            this.Files = new List<DrapoPackFile>();
        }
    }
}

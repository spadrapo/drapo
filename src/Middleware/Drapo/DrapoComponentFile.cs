using System;
using System.Collections.Generic;
using System.Text;

namespace Sysphera.Middleware.Drapo
{
    public class DrapoComponentFile
    {
        public string Name { set; get; }
        public DrapoResourceType ResourceType { set; get; }
		public DrapoFileType Type { set; get; }

		public string Path { set; get; }
    }
}

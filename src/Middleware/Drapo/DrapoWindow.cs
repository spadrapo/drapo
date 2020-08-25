using System;
using System.Collections.Generic;
using System.Text;

namespace Sysphera.Middleware.Drapo
{
    public class DrapoWindow
    {
        public string Name { set; get; }
        public string Path { set; get; }
        public string Did { set; get; }
        public Dictionary<string,string> Parameters { set; get; }
        public DrapoWindow()
        {
            this.Parameters = new Dictionary<string, string>();
        }
    }
}

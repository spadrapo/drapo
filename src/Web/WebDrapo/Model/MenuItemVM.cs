using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebDrapo.Model
{
    public class MenuItemVM
    {
        public string Name { set; get; }
        public string Type { set; get; }
        public string TypeImageClass { set; get; }
        public string Action { set; get; }
        public string Activated { set; get; }
        public string Url { set; get; }
        public bool Selected { set; get; }

    }
}

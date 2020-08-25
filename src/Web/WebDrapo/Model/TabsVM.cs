using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebDrapo.Model
{
    public class TabsVM
    {
        public List<TabVM> Tabs { set; get; }
        public int TabIndex { set; get; }

        public TabsVM()
        {
            this.Tabs = new List<TabVM>();
        }
    }
}

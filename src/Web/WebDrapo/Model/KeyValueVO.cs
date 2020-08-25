using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebDrapo.Model
{
    public class KeyValueVO
    {
        public string Key { set; get; }
        public string Value { set; get; }
        public List<KeyValueVO> Children { set; get; }
        public bool Visible { set; get; }
        public string Selection { set; get; }

        public KeyValueVO()
        {
            this.Visible = true;
            this.Children = new List<KeyValueVO>();
        }
    }
}

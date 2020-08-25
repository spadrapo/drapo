using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebDrapo.Model
{
    public class ObjectComplexVM
    {
        public string Name { set; get; }
        public Dictionary<string,string> Properties { set; get; }
        public ObjectComplexVM Child { set; get;}

        public ObjectComplexVM()
        {
            this.Properties = new Dictionary<string, string>();
        }
    }
}

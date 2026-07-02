using System.Collections.Generic;

namespace WebDrapo.Model
{
    public class DataNestedVM
    {
        public int? Code { set; get; }
        public string Name { set; get; }
        public List<DataVM> Items { set; get; } = new List<DataVM>();
    }
}

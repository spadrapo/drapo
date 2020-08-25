using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebDrapo.Model
{
    public class ObjectVM
    {
        public int Code { set; get; }
        public int? Previous { set; get; }
        public int? Next { set; get; }
        public string Name { set; get; }
        public string Description { set; get; }
        public decimal Value { set; get; }
        public DateTime Date { set; get; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebDrapo.Model
{
    public class TodoVM
    {
        public Guid? Code { set; get; }
        public string Task { set; get; }
        public bool Completed { set; get; }
        public bool Edit { set; get; }
    }
}

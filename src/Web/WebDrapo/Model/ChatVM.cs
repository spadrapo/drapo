using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebDrapo.Model
{
    public class ChatVM
    {
        public Guid? Code { set; get; }
        public DateTime? Date { set; get; }
        public string User { set; get; }
        public string Message { set; get; }
    }
}

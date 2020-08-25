using System;
using System.Collections.Generic;
using System.Text;

namespace Sysphera.Middleware.Drapo
{
    public class DrapoUnitOfWork<T>
    {
        public List<T> Inserted { set; get; }
        public List<T> Updated { set; get; }
        public List<T> Deleted { set; get; }
        public List<T> Entities { set; get; }
    }
}

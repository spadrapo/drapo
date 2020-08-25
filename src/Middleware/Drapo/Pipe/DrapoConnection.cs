using System;
using System.Collections.Generic;
using System.Text;

namespace Sysphera.Middleware.Drapo.Pipe
{
    public class DrapoConnection
    {
        public string ConnectionId { private set; get; }
        public DateTime Start { private set;  get; }
        public long Identity { set; get; }

        public DrapoConnection(string connectionId)
        {
            this.ConnectionId = connectionId;
            this.Start = DateTime.Now;
        }
    }
}

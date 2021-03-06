﻿using System;
using System.Collections.Generic;
using System.Text;

namespace Sysphera.Middleware.Drapo.Pipe
{
    public class DrapoConnection
    {
        public string ConnectionId { private set; get; }
        public string Domain { private set; get; }
        public DateTime Start { private set;  get; }
        public long Identity { set; get; }

        public DrapoConnection(string connectionId, string domain)
        {
            this.ConnectionId = connectionId;
            this.Domain = domain;
            this.Start = DateTime.Now;
        }
    }
}

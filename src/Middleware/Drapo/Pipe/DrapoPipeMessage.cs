using System;
using System.Collections.Generic;
using System.Text;

namespace Sysphera.Middleware.Drapo.Pipe
{
    public class DrapoPipeMessage
    {
        private DrapoPipeMessageType _type = DrapoPipeMessageType.Storage;
        private string _data = null;

        public DrapoPipeMessageType Type { get => _type; set => _type = value; }
        public string Data { get => _data; set => _data = value; }
    }
}

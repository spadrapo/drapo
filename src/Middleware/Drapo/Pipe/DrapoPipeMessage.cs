using System;
using System.Collections.Generic;
using System.Text;

namespace Sysphera.Middleware.Drapo.Pipe
{
    public class DrapoPipeMessage
    {
        private DrapoPipeMessageType _type = DrapoPipeMessageType.Storage;
        private string _data = null;
        private string _sector = null;

        public DrapoPipeMessageType Type { get => _type; set => _type = value; }
        public string Data { get => _data; set => _data = value; }
        /// <summary>The sector a Storage message reloads in; null reloads in every sector holding the key.</summary>
        public string Sector { get => _sector; set => _sector = value; }
    }
}

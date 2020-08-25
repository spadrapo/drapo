using System;
using System.Collections.Generic;
using System.Text;

namespace Sysphera.Middleware.Drapo
{
    public class DrapoDynamic
    {
        private string _eTag;
        private string _lastModified;
        private string _contentType;
        private string _contentData;
        private int _status;

        public string ETag { get => _eTag; set => _eTag = value; }
        public string LastModified { get => _lastModified; set => _lastModified = value; }
        public string ContentType { get => _contentType; set => _contentType = value; }
        public string ContentData { get => _contentData; set => _contentData = value; }
        public int Status { get => _status; set => _status = value; }
        public Dictionary<string, string> Headers { set; get; }

        public DrapoDynamic()
        {
            this._status = 200;
        }
    }
}

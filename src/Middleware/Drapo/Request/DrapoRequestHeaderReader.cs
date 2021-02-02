using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Primitives;
using System;
using System.Collections.Generic;
using System.Text;

namespace Sysphera.Middleware.Drapo.Request
{
    public class DrapoRequestHeaderReader : IDrapoRequestHeaderReader
    {
        private DrapoMiddlewareOptions _options;
        private IHttpContextAccessor _context;
        private string _connectionId = null;
        public DrapoRequestHeaderReader(DrapoMiddlewareOptions options, IHttpContextAccessor context)
        {
            this._options = options;
            this._context = context;
        }
        public string Get(string key)
        {
            if(!this._context.HttpContext.Request.Headers.TryGetValue(key, out StringValues values))
                return (null);
            return (values.ToString());
        }

        public string GetPipeHeaderConnectionId()
        {
            if (this._connectionId == null)
                this._connectionId = this.Get(this._options.Config.PipeHeaderConnectionId);
            return (this._connectionId);
        }

        public void SetPipeHeaderConnectionId(string connectionId) 
        {
            this._connectionId = connectionId;
        }
    }
}

using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Primitives;
using System;
using System.Collections.Generic;
using System.Text;
using System.Text.RegularExpressions;

namespace Sysphera.Middleware.Drapo.Request
{
    public class DrapoRequestReader : IDrapoRequestReader
    {
        private DrapoMiddlewareOptions _options;
        private IHttpContextAccessor _context;
        private string _connectionId = null;
        private string _domain = null;
        public DrapoRequestReader(DrapoMiddlewareOptions options, IHttpContextAccessor context)
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

        public string GetDomain()
        {
            if (this._domain != null)
                return (this._domain);
            string domainRegex = this._options.Config.DomainRegex;
            if (string.IsNullOrEmpty(domainRegex))
                return (string.Empty);
            string host = this._context.HttpContext.Request.Host.Host;
            if (string.IsNullOrEmpty(host))
                return (string.Empty);
            Match match = Regex.Match(host, domainRegex);
            if (match == null)
                return (string.Empty);
            string domain = match.Groups[this._options.Config.DomainGroup].Value;
            if (string.IsNullOrEmpty(domain))
                return (string.Empty);
            return (domain);
        }

        public void SetDomain(string domain) {
            this._domain = domain;
        }
    }
}

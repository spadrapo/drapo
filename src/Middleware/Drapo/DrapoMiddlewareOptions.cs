using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.StaticFiles;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Sysphera.Middleware.Drapo
{
    public class DrapoMiddlewareOptions
    {
        #region Fields
        private DrapoConfig _config = new DrapoConfig();
        public delegate Task<string> PollingDelegate(string domain, string connectionId, string key);
        public PollingDelegate PollingEvent;
        public delegate Task<List<DrapoRoute>> RouteDelegate(Microsoft.AspNetCore.Http.HttpContext context);
        public RouteDelegate RouteEvent;
        /// <summary>
        /// Delegate for dynamically generating the route index content.
        /// This enables multi-tenant scenarios where different index content is served based on HttpContext.
        /// The delegate receives the HttpContext and returns the HTML content as a string.
        /// If not set, the default /index.html file will be used.
        /// </summary>
        public delegate Task<string> RouteIndexDelegate(HttpContext context);
        /// <summary>
        /// Event handler for generating dynamic route index content.
        /// Set this to provide custom index content based on tenant information from the HttpContext.
        /// </summary>
        public RouteIndexDelegate RouteIndexEvent;
        #endregion
        #region Properties
        public bool Debug { set; get;}
        public bool UseInternalComponents { set; get; }
        public string BackplaneRedis { set; get; }
        public string ContainerUrl { set; get; }
        public DrapoConfig Config
        {
            get
            {
                return (this._config);
            }
        }
        #endregion
        #region Constructors
            public DrapoMiddlewareOptions()
            {
                this.UseInternalComponents = true;
            }
        #endregion

        public bool CanCache(StaticFileResponseContext context)
        {
            //Static
            if (!_config.UseCacheStatic)
                return (false);
            string path = context.Context.Request.Path;
            if (!this.IsPathStatic(path))
                return (false);
            string queryString = context.Context.Request.QueryString.ToString();
            return (queryString.Contains("ab=" + _config.ApplicationBuild));
        }

        private bool IsPathStatic(string path)
        {
            if (path.Contains(".html"))
                return (true);
            if (path.Contains(".css"))
                return (true);
            if (path.Contains(".js"))
                return (true);
            return (false);
        }
    }
}

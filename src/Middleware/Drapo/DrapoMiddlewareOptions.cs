using Microsoft.AspNetCore.StaticFiles;

namespace Sysphera.Middleware.Drapo
{
    public class DrapoMiddlewareOptions
    {
        #region Fields
        private DrapoConfig _config = new DrapoConfig();
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

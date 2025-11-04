using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Sysphera.Middleware.Drapo;
using Microsoft.Net.Http.Headers;
using Newtonsoft.Json.Serialization;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.AspNetCore.Authentication.Cookies;
using Sysphera.Middleware.Drapo.Pipe;
using System.IO;
using System.Text;
using Microsoft.Extensions.Hosting;

namespace WebDrapo
{
    public class Startup
    {
        static readonly string _RequireAuthenticatedUserPolicy = "RequireAuthenticatedUserPolicy";
        IWebHostEnvironment _environment = null;
        DrapoMiddlewareOptions _options = null;
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddHttpContextAccessor();
            services.AddSignalR().AddJsonProtocol(options => options.PayloadSerializerOptions.PropertyNamingPolicy = null);
            services.AddDrapo();
            services.AddControllersWithViews()
                .AddNewtonsoftJson(options =>
                {
                    options.SerializerSettings.ContractResolver = new DefaultContractResolver();
                })
                .AddJsonOptions(options =>
                {
                    options.JsonSerializerOptions.PropertyNamingPolicy = null;
                });
            services.AddAuthentication(options =>
            {
                options.DefaultScheme = "drapo";
                options.DefaultChallengeScheme = CookieAuthenticationDefaults.AuthenticationScheme;
                options.DefaultSignInScheme = CookieAuthenticationDefaults.AuthenticationScheme;
                options.DefaultAuthenticateScheme = CookieAuthenticationDefaults.AuthenticationScheme;
            }).AddCookie(options =>
            {
                options.AccessDeniedPath = "/Account/Forbidden/";
                options.LoginPath = "/Account/SignIn/";
                options.Cookie.Name = "drapo";
            });
            services.AddAuthorization(o => o.AddPolicy(_RequireAuthenticatedUserPolicy, builder => builder.RequireAuthenticatedUser()));
        }
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, ILoggerFactory loggerFactory)
        {
            this._environment = env;
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            app.UseDrapo(o => { ConfigureDrapo(env, o); });
            DefaultFilesOptions options = new DefaultFilesOptions();
            options.DefaultFileNames.Clear();
            options.DefaultFileNames.Add("/Drapo/Help.html");
            app.UseDefaultFiles(options);
            app.UseStaticFiles(new StaticFileOptions()
            {
                OnPrepareResponse = (context) =>
                {
                    var headers = context.Context.Response.GetTypedHeaders();
                    headers.CacheControl = new CacheControlHeaderValue()
                    {
                        NoCache = !_options.CanCache(context)
                    };
                }
            });
            app.UseRouting();
            app.UseAuthentication();
            app.UseAuthorization();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapDefaultControllerRoute().RequireAuthorization(_RequireAuthenticatedUserPolicy);
                endpoints.MapHub<DrapoPlumberHub>(string.Format("/{0}", _options.Config.PipeHubName));
            });
        }

        private void ConfigureDrapo(IWebHostEnvironment env, DrapoMiddlewareOptions options)
        {
            if (env.IsDevelopment())
                options.Debug = true;
            options.Config.UsePipes = true;
            options.Config.UseRouter = false;
            options.Config.UseCacheStatic = true;
            options.Config.UseCacheLocalStorage = true;
            options.Config.UseComponentsCacheBurst = true;
            options.Config.CacheKeysView = "applicationbuild,url,view";
            options.Config.CacheKeysComponentView = "applicationbuild,url,view";
            options.Config.CacheKeysComponentStyle = "applicationbuild,url,theme";
            options.Config.CacheKeysComponentScript = "applicationbuild,url";
            options.Config.ApplicationBuild = "1.0";
            options.Config.HeaderContainerId = "DrapoContainerId";
            options.Config.CreateTheme("Default", "");
            options.Config.CreateTheme("Dark", "dark");
            options.Config.CreateTheme("Light", "light");
            options.Config.CreateView("Mobile", "mobile", "{{__browser.Width}} < 768");
            options.Config.CreateView("Web", "default");
            options.Config.CreateDynamic("view", "view", "text/html", false, true, HandleView);
            options.Config.CreateDynamic("redirect", "redirect", "text/html", false, false, HandleRedirect);
            options.Config.HandlerCustom = HandlerCustom;
            options.Config.CreateWindow("Confirm", "/DrapoPages/WindowConfirm.html", "Windows", new Dictionary<string, string>() { { "[Message]", "" }, { "[Yes]", "" }, { "[No]", "" } });
            options.Config.StorageErrors = "errors";
            options.Config.StorageBadRequest = "badrequest";
            options.Config.OnAuthorizationRequest = "AddDataItem(list,keyValue)";
            options.Config.OnError = "";
            options.Config.OnBadRequest = "UpdateDataField(config,message,{{badrequest}})";
            options.Config.ValidatorUncheckedClass = "validationUnchecked";
            options.Config.ValidatorValidClass = "validatorValid";
            options.Config.ValidatorInvalidClass = "validatorInvalid";
            // Load regular components
            options.Config.LoadComponents(string.Format("{0}{1}components", env.WebRootPath, Path.AltDirectorySeparatorChar), "~/components");
            // Create a pack
            options.Config.CreatePack("testpack").AddIncludePath("~/testpack/*").AddIncludePath("~/components/labelcontext/*").AddExcludePath("*.ts").AddExcludePath("*.d.ts");
            // Create a dynamic pack
            options.Config.CreatePack("dynamicpack").SetDynamic(true);
            // Set the dynamic pack handler
            options.Config.HandlerPackDynamic = HandlePackDynamic;
            options.Config.CreateRoute("^/city/(?<cityCode>\\d+)/(?<cityName>\\w+)$", "UpdateSector(content,~/DrapoPages/RouteAppCity.html)");
            options.Config.CreateRoute("^/state/(?<stateCode>\\d+)/(?<stateName>\\w+)$", "UpdateSector(content,~/DrapoPages/RouteAppState.html)");
            options.Config.CreateRoute("^/$", "UpdateSector(content,~/DrapoPages/RouteApp.html)");
            options.Config.CreateRejectedRoute("^/allowed/deny.*$");
            options.Config.CreateRoute("^/allowed/.*$", "UpdateSector(content,~/DrapoPages/RouteApp.html)");
            options.PollingEvent += Polling;
            options.RouteEvent += DynamicRoutes;
            options.RouteIndexEvent += RouteIndex;
            this._options = options;
        }

        private async Task<DrapoDynamicResponse> HandleView(DrapoDynamicRequest request)
        {
            string path = this._environment.WebRootPath;
            string filePath = this.GetHandleViewPath(path, request.Code, request.Context, out bool isContext);
            if (string.IsNullOrEmpty(filePath))
                return (null);
            DrapoDynamicResponse response = new DrapoDynamicResponse();
            response.IsContext = isContext;
            response.Content = File.ReadAllText(filePath, Encoding.Unicode);
            response.LastModified = File.GetLastWriteTime(filePath);
            return (await Task.FromResult<DrapoDynamicResponse>(response));
        }

        private async Task<DrapoDynamicResponse> HandleRedirect(DrapoDynamicRequest request)
        {
            DrapoDynamicResponse response = new DrapoDynamicResponse();
            response.Status = 302;
            response.Headers = new Dictionary<string, string>();
            response.Headers.Add("Location", request.Path.Replace("redirect", "DrapoPages"));
            return (await Task.FromResult<DrapoDynamicResponse>(response));
        }

        private async Task<DrapoDynamic> HandlerCustom(DrapoDynamic dynamic)
        {
            if (dynamic.ContentData != null)
                dynamic.ContentData = dynamic.ContentData.Replace("[HandlerCustom]", "<span>HandlerCustom</span>");
            return (await Task.FromResult<DrapoDynamic>(dynamic));
        }

        private string GetHandleViewPath(string path, string code, string context, out bool isContext)
        {
            isContext = false;
            //Context
            if (!string.IsNullOrEmpty(context))
            {
                string filePathContext = string.Format("{0}/DrapoPages/{1}.{2}.html", path, code, context);
                if (isContext = File.Exists(filePathContext))
                    return (filePathContext);
            }
            //Specific
            string filePath = string.Format("{0}/DrapoPages/{1}.html", path, code);
            if (File.Exists(filePath))
                return (filePath);
            return (null);
        }

        private async Task<string> Polling(string domain, string connectionId, string key) {
            string hash = Math.Ceiling((decimal)(DateTime.Now.Second / 5)).ToString();
            return (await Task.FromResult<string>(hash));
        }

<<<<<<< HEAD
        private async Task<List<DrapoRoute>> DynamicRoutes(HttpContext context)
        {
            // Example: Determine routes based on tenant from subdomain or header
            // For demonstration, we'll check for a custom header "X-Tenant"
            string tenant = context.Request.Headers["X-Tenant"].ToString();
            
            List<DrapoRoute> routes = new List<DrapoRoute>();
            
            if (!string.IsNullOrEmpty(tenant))
            {
                // Multi-tenant specific routes
                if (tenant.Equals("tenant1", StringComparison.OrdinalIgnoreCase))
                {
                    DrapoRoute route = new DrapoRoute();
                    route.Uri = "^/tenant1/home$";
                    route.Expression = "UpdateSector(content,~/DrapoPages/RouteDynamicTenant1.html)";
                    routes.Add(route);
                }
                else if (tenant.Equals("tenant2", StringComparison.OrdinalIgnoreCase))
                {
                    DrapoRoute route = new DrapoRoute();
                    route.Uri = "^/tenant2/home$";
                    route.Expression = "UpdateSector(content,~/DrapoPages/RouteDynamicTenant2.html)";
                    routes.Add(route);
                }
            }
            
            // Suppress async warning - keeping async for future extensibility
            return await Task.FromResult(routes);
        }

=======
>>>>>>> remotes/origin/master
        private async Task<DrapoPackResponse> HandlePackDynamic(DrapoPackRequest request)
        {
            // This handler can use the HttpContext to determine what content to return
            // For this example, we'll create a simple pack with dynamically generated content
            DrapoPackResponse response = new DrapoPackResponse();
            response.Name = request.PackName;
            
            // Add files to the pack
            response.Files.Add(new DrapoPackFile
            {
                Path = "~/dynamic/script.js",
                Content = @"
// Dynamically generated JavaScript
function initDynamicPack() {
    console.log('Dynamic pack loaded from delegate handler!');
    // Set dynamic data
    const app = window['drapo'];
    if (app) {
        app.Storage.UpdateData('dynamicData', null, {
            loaded: true,
            message: 'Dynamic pack content generated at ' + new Date().toISOString(),
            source: 'HttpContext-based delegate handler'
        });
        document.getElementById('packStatus').textContent = 'Dynamic pack loaded successfully!';
    }
}
// Auto-execute on load
initDynamicPack();
"
            });

            return await Task.FromResult(response);
        }

        private async Task<string> RouteIndex(HttpContext context)
        {
            // Example: Multi-tenant support based on tenant header
            // In a real implementation, you would check headers, domains, or other tenant identifiers
            string tenant = context.Request.Headers["X-Tenant"].ToString();
            string path = this._environment.WebRootPath;
            
            // If tenant header is present, try to load tenant-specific index
            if (!string.IsNullOrEmpty(tenant))
            {
                // Sanitize tenant identifier to prevent path traversal attacks
                // Only allow alphanumeric characters and hyphens
                string sanitizedTenant = System.Text.RegularExpressions.Regex.Replace(tenant, @"[^a-zA-Z0-9\-]", "");
                if (!string.IsNullOrEmpty(sanitizedTenant))
                {
                    string tenantIndexPath = Path.Combine(path, $"index.{sanitizedTenant}.html");
                    // Verify the path is still within the web root to prevent path traversal
                    string fullTenantPath = Path.GetFullPath(tenantIndexPath);
                    if (fullTenantPath.StartsWith(Path.GetFullPath(path)) && File.Exists(tenantIndexPath))
                        return (await File.ReadAllTextAsync(tenantIndexPath));
                }
            }
            
            // Default fallback to standard index.html
            string defaultIndexPath = Path.Combine(path, "index.html");
            if (File.Exists(defaultIndexPath))
                return (await File.ReadAllTextAsync(defaultIndexPath));
            
            // If no index file exists, return a basic HTML page
            return "<!DOCTYPE html><html><head><title>Drapo</title></head><body><h1>Welcome to Drapo</h1></body></html>";
        }
    }
}

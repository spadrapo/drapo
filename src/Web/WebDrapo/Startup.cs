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
            options.Config.LoadComponents(string.Format("{0}{1}components", env.WebRootPath, Path.AltDirectorySeparatorChar), "~/components");
            options.PollingEvent += Polling;
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
    }
}

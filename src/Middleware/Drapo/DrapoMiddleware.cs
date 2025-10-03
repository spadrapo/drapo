using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.IO;
using System.IO.Compression;
using System.Linq;
using System.Net;
using System.Reflection;
using System.Runtime.CompilerServices;
using System.Security.Cryptography;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Sysphera.Middleware.Drapo
{
    public class DrapoMiddleware
    {
        #region Constants
        private const string ACTIVATORJS = "drapo.js";
        private const string ACTIVATORJSON = "drapo.json";
        private const string ACTIVATORJSMAP = "/drapo.js.map";
        private const string LIB_RELEASE = "drapo.min.js";
        private const string LIB_DEBUG = "drapo.js";
        private const string CONTENT_TYPE_HTML = "text/html; charset=utf-8";
        #endregion
        #region Fields
        private readonly RequestDelegate _next;
        private readonly DrapoMiddlewareOptions _options = null;
        private readonly string _webRootPath = null;
        private readonly string _urlActivator = null;
        private readonly string _urlConfig = null;
        private string _libContent = null;
        private string _libETag = null;
        private string _libLastModified = null;
        private string _configContent = null;
        private string _configETag = null;
        private string _jsMapContent = null;
        private string _jsMapETag = null;
        private ConcurrentDictionary<string, string> _cacheComponentFileContent = new ConcurrentDictionary<string, string>();
        private ConcurrentDictionary<string, string> _cachePackContent = new ConcurrentDictionary<string, string>();
        private ConcurrentDictionary<string, string> _cachePackETag = new ConcurrentDictionary<string, string>();
        private List<DrapoFile> _cacheFiles = new List<DrapoFile>();
        #endregion
        #region Properties
        #endregion

        #region Constructors
        public DrapoMiddleware(RequestDelegate next, IHostingEnvironment env, DrapoMiddlewareOptions options)
        {
            this._next = next;
            this._options = options ?? new DrapoMiddlewareOptions();
            this._webRootPath = env.WebRootPath;
            this._urlActivator = string.Format("/{0}", ACTIVATORJS);
            this._urlConfig = string.Format("/{0}", ACTIVATORJSON);
            Initialize();
        }
        #endregion

        #region Initialize
        private void Initialize()
        {
            Dictionary<string, string> resources = this.GetResources();
            //Type
            string libName = this._options.Debug ? LIB_DEBUG : LIB_RELEASE;
            if (!resources.ContainsKey(libName))
                throw new Exception("Drapo Middleware does not contain the lib");
            //Components
            if (this._options.UseInternalComponents)
                InitilizeInternalComponents();
            //Content
            this._libContent = resources[libName];
            this._libETag = GenerateETag(Encoding.UTF8.GetBytes(this._libContent));
            this._jsMapContent = this.CreateJsMapContent(resources);
            this._jsMapETag = GenerateETag(Encoding.UTF8.GetBytes(this._jsMapContent));
            this._configContent = this.GetConfigContent();
            this._configETag = GenerateETag(Encoding.UTF8.GetBytes(this._configContent));
            this._libLastModified = System.IO.File.GetLastWriteTime(System.Reflection.Assembly.GetEntryAssembly().Location).ToString("R");
        }
        #endregion
        #region Resources
        private Dictionary<string, string> GetResources(Assembly assembly = null)
        {
            Dictionary<string, string> resources = new Dictionary<string, string>();
            if (assembly == null)
                assembly = typeof(DrapoMiddleware).GetTypeInfo().Assembly;
            foreach (string resourcePath in assembly.GetManifestResourceNames())
                resources.Add(resourcePath, (new StreamReader(assembly.GetManifestResourceStream(resourcePath))).ReadToEnd());
            return (resources);
        }
        #endregion

        #region Invoke
        public async Task Invoke(HttpContext context)
        {
            DrapoComponent component = null;
            DrapoComponentFile file = null;
            DrapoDynamic dynamic = null;
            DrapoRoute route = null;
            //Activator
            if (this.IsActivator(context))
            {
                //JS
                bool isCache = ((context.Request.Headers.ContainsKey("If-None-Match")) && (context.Request.Headers["If-None-Match"].ToString() == this._libETag));
                context.Response.StatusCode = isCache ? (int)HttpStatusCode.NotModified : (int)HttpStatusCode.OK;
                context.Response.Headers["ETag"] = new[] { this._libETag };
                context.Response.Headers.Add("Last-Modified", new[] { this._libLastModified });
                context.Response.Headers.Add("Cache-Control", new[] { "no-cache" });
                context.Response.Headers.Add("Content-Type", new[] { "text/javascript" });
                AppendHeaderContainerId(context);
                if (!isCache)
                    await context.Response.WriteAsync(this._libContent);
            }
            else if (this.IsJsMapActivator(context))
            {
                //.JS.MAP
                bool isCache = ((context.Request.Headers.ContainsKey("If-None-Match")) && (context.Request.Headers["If-None-Match"].ToString() == this._jsMapETag));
                context.Response.StatusCode = isCache ? (int)HttpStatusCode.NotModified : (int)HttpStatusCode.OK;
                context.Response.Headers["ETag"] = new[] { this._jsMapETag };
                context.Response.Headers.Add("Last-Modified", new[] { this._libLastModified });
                context.Response.Headers.Add("Cache-Control", new[] { "no-cache" });
                context.Response.Headers.Add("Content-Type", new[] { "application/json" });
                AppendHeaderContainerId(context);
                if (!isCache)
                    await context.Response.WriteAsync(this._jsMapContent);
            }
            else if (this.IsConfig(context))
            {
                //Config
                bool isCache = ((context.Request.Headers.ContainsKey("If-None-Match")) && (context.Request.Headers["If-None-Match"].ToString() == this._configETag));
                context.Response.StatusCode = isCache ? (int)HttpStatusCode.NotModified : (int)HttpStatusCode.OK;
                context.Response.Headers["ETag"] = new[] { this._configETag };
                context.Response.Headers.Add("Last-Modified", new[] { this._libLastModified });
                context.Response.Headers.Add("Cache-Control", new[] { "no-cache" });
                context.Response.Headers.Add("Content-Type", new[] { "application/json" });
                AppendHeaderContainerId(context);
                if (!isCache)
                    await context.Response.WriteAsync(this.GetConfigContentForRequest(context));
            }
            else if (this.IsComponentFile(context, out component, out file))
            {
                //Component File
                string key = this.CreateKeyComponentFile(component, file);
                string eTag = file.ETag;
                bool isCache = ((context.Request.Headers.ContainsKey("If-None-Match")) && (context.Request.Headers["If-None-Match"].ToString() == eTag));
                context.Response.StatusCode = isCache ? (int)HttpStatusCode.NotModified : (int)HttpStatusCode.OK;
                context.Response.Headers["ETag"] = new[] { eTag };
                context.Response.Headers.Add("Last-Modified", new[] { file.LastModified });
                if (this._options.Config.UseComponentsCacheBurst)
                    context.Response.Headers.Add("Cache-Control", new[] { "public, max-age=7000000, immutable" });
                else
                    context.Response.Headers.Add("Cache-Control", new[] { "no-cache" });
                context.Response.Headers.Add("Content-Type", new[] { file.GetContentType() });
                AppendHeaderContainerId(context);
                if (!isCache)
                    await context.Response.WriteAsync(this.GetComponentFileContent(component, file, key));
            }
            else if (this.IsPackFile(context, out string packName))
            {
                //Pack File
                string packETag = this.GetPackETag(packName);
                bool isCache = ((context.Request.Headers.ContainsKey("If-None-Match")) && (context.Request.Headers["If-None-Match"].ToString() == packETag));
                context.Response.StatusCode = isCache ? (int)HttpStatusCode.NotModified : (int)HttpStatusCode.OK;
                context.Response.Headers["ETag"] = new[] { packETag };
                context.Response.Headers.Add("Last-Modified", new[] { this._libLastModified });
                context.Response.Headers.Add("Cache-Control", new[] { "no-cache" });
                context.Response.Headers.Add("Content-Type", new[] { "application/json" });
                AppendHeaderContainerId(context);
                if (!isCache)
                    await context.Response.WriteAsync(this.GetPackContent(packName), Encoding.UTF8);
            }
            else if ((dynamic = await this.IsRequestCustom(context)) != null)
            {
                //Custom
                bool isCache = ((context.Request.Headers.ContainsKey("If-None-Match")) && (context.Request.Headers["If-None-Match"].ToString() == dynamic.ETag));
                context.Response.StatusCode = isCache ? (int)HttpStatusCode.NotModified : dynamic.Status;
                if (!string.IsNullOrEmpty(dynamic.ETag))
                    context.Response.Headers["ETag"] = new[] { dynamic.ETag };
                if (!string.IsNullOrEmpty(dynamic.LastModified))
                    context.Response.Headers.Add("Last-Modified", new[] { dynamic.LastModified });
                context.Response.Headers.Add("Cache-Control", new[] { "no-cache" });
                if (!string.IsNullOrEmpty(dynamic.ContentType))
                    context.Response.Headers.Add("Content-Type", new[] { dynamic.ContentType });
                if (dynamic.Headers != null)
                    foreach (KeyValuePair<string, string> entry in dynamic.Headers)
                        context.Response.Headers.Add(entry.Key, new[] { entry.Value });
                AppendHeaderContainerId(context);
                if ((!isCache) && (!string.IsNullOrEmpty(dynamic.ContentData)))
                    await context.Response.WriteAsync(dynamic.ContentData, Encoding.UTF8);

            }
            else if ((route = this.GetRoute(context)) != null)
            {
                //Route
                string routeBasePath = GetRouteBasePath();
                string routeBaseContent = await GetRouteBaseContent(routeBasePath);
                string routeContentETag = this.GetRouteContentETag(routeBaseContent);
                bool isCache = ((context.Request.Headers.ContainsKey("If-None-Match")) && (context.Request.Headers["If-None-Match"].ToString() == routeContentETag));
                context.Response.StatusCode = isCache ? (int)HttpStatusCode.NotModified : (int)HttpStatusCode.OK;
                context.Response.Headers["ETag"] = new[] { routeContentETag };
                context.Response.Headers.Add("Last-Modified", new[] { this.GetRouteBaseLastModified(routeBasePath) });
                context.Response.Headers.Add("Cache-Control", new[] { "no-cache" });
                context.Response.Headers.Add("Content-Type", new[] { "text/html" });
                AppendHeaderContainerId(context);
                if (!isCache)
                    await context.Response.WriteAsync(routeBaseContent);
            }
            else
            {
                AppendHeaderContainerId(context);
                await _next.Invoke(context);
            }
        }

        private bool HasHeaderContainerId()
        {
            return (!string.IsNullOrEmpty(this._options.Config.HeaderContainerId));
        }

        private void AppendHeaderContainerId(HttpContext httpContext)
        {
            string headerContainerId = this._options.Config.HeaderContainerId;
            if (string.IsNullOrEmpty(headerContainerId))
                return;
            httpContext.Response.Headers.Add(headerContainerId, new[] { Environment.MachineName });
        }
        #endregion

        #region ETag
        private string GenerateETag(byte[] data)
        {
            string etag = string.Empty;
            using (var md5 = MD5.Create())
            {
                var hash = md5.ComputeHash(data);
                string hex = BitConverter.ToString(hash);
                etag = hex.Replace("-", "");
            }
            return (etag);
        }
        #endregion
        #region Cookies
        private Dictionary<string, string> ExtractCookieValues(HttpContext context, string cookieName)
        {
            if (!context.Request.Cookies.ContainsKey(cookieName))
                return (null);
            string cookieValue = context.Request.Cookies[cookieName];
            if (string.IsNullOrEmpty(cookieValue))
                return (null);
            return (CreateCookieValues(cookieValue));
        }

        private Dictionary<string, string> CreateCookieValues(string value)
        {
            Dictionary<string, string> values = new Dictionary<string, string>();
            string[] keyValues = value.Split('&');
            for (int i = 0; i < keyValues.Length; i++)
            {
                string keyValue = keyValues[i];
                int index = keyValue.IndexOf('=');
                if (index < 0)
                    continue;
                string valueOfKey = keyValue.Substring(index + 1);
                values.Add(keyValue.Substring(0, index), valueOfKey);
            }
            return (values);
        }
        #endregion


        #region Activator
        private bool IsActivator(HttpContext context)
        {
            return (context.Request.Path.Value == this._urlActivator);
        }
        #endregion
        #region JsMap
        private bool IsJsMapActivator(HttpContext context)
        {
            return (context.Request.Path.Value == ACTIVATORJSMAP);
        }

        private static string GetThisSourceFilePath([CallerFilePath] string path = null) => path;

        private string CreateJsMapContent(Dictionary<string, string> resources)
        {
            //collect line offsets
            List<(string jsMapFilename, int lineOffset)> jsMapsOffsets = new List<(string jsMapFilename, int offset)>();
            string[] libLines = this._libContent.Split('\n');
            int currentOffset = 0;
            for (int lineNumber = 0; lineNumber < libLines.Length; ++lineNumber)
            {
                string line = libLines[lineNumber];
                if (line.StartsWith("//# sourceMappingURL="))
                {
                    string jsMapFilename = line[21..].Trim();
                    jsMapsOffsets.Add((jsMapFilename, currentOffset));
                    currentOffset = lineNumber + 1;
                }
            }
            //mount sections
            string localRootPath = Path.GetDirectoryName(GetThisSourceFilePath()).Replace('\\', '/');
            List<string> sections = new List<string>(jsMapsOffsets.Count);
            foreach (var jsOffset in jsMapsOffsets)
            {
                string jsOffsetMapContent = null;
                if (resources.TryGetValue(jsOffset.jsMapFilename, out jsOffsetMapContent))
                {
                    jsOffsetMapContent = jsOffsetMapContent.Replace("../ts", $"file:///{localRootPath}/ts");
                    sections.Add($@" {{ ""offset"": {{""line"":{jsOffset.lineOffset}, ""column"":0}}, ""map"": {jsOffsetMapContent} }} ");
                }
            }
            string sectionsString = string.Join(',', sections);
            if (string.IsNullOrEmpty(sectionsString)) //return dummy map
                return @"{""version"":3,""file"":""drapo.js"",""sourceRoot"":"""",""sources"":[""drapo.js""],""names"":[],""mappings"":""""}";
            return $@"{{ ""version"": 3, ""file"": ""drapo.js"", ""sections"": [{sectionsString}] }}";
        }
        #endregion
        #region Config
        private bool IsConfig(HttpContext context)
        {
            return (context.Request.Path.Value == this._urlConfig);
        }

        private string GetConfigContent()
        {
            return (JsonConvert.SerializeObject(this._options.Config));
        }

        private string GetConfigContentForRequest(HttpContext context)
        {
            if (this.IsBotRequest(context))
                return (this.GetConfigContentForBot());
            return (this._configContent);
        }

        private bool IsBotRequest(HttpContext context)
        {
            var userAgent = context.Request.Headers["User-Agent"].ToString().ToLowerInvariant();
            if (string.IsNullOrWhiteSpace(userAgent))
                return (false);
            if (userAgent.Contains("bot"))
                return (true);
            if (userAgent.Contains("crawler"))
                return (true);
            if (userAgent.Contains("spider"))
                return (true);
            if (userAgent.Contains("pagespeed"))
                return (true);
            if (userAgent.Contains("lighthouse"))
                return (true);
            return (false);
        }

        private string GetConfigContentForBot()
        {
            string configContent = GetConfigContent();
            DrapoConfig configBot = JsonConvert.DeserializeObject<DrapoConfig>(configContent);
            configBot.CanUseWebSocket = false;
            return (JsonConvert.SerializeObject(configBot));
        }
        #endregion
        #region Components
        private void InitilizeInternalComponents()
        {
            Assembly assembly = typeof(DrapoMiddleware).GetTypeInfo().Assembly;
            this._options.Config.LoadComponentsEmbedded(assembly, "Sysphera.Middleware.Drapo.components");
        }

        private bool IsComponentFile(HttpContext context, out DrapoComponent component, out DrapoComponentFile file)
        {
            component = null;
            file = null;
            string url = context.Request.Path.Value;
            int index = url.IndexOf("/components/");
            if (index < 0)
                return (false);
            string[] split = url.Substring(index + 12).Split('/');
            if (split.Length != 2)
                return (false);
            component = this._options.Config.GetComponent(split[0]);
            if (component == null)
                return (false);
            file = component.GetFile(split[1]);
            if (file == null)
                return (false);
            return true;
        }

        private string CreateKeyComponentFile(DrapoComponent component, DrapoComponentFile file)
        {
            return (string.Format("{0}:{1}", component.Name, file.Name));
        }

        private string GetComponentFileContent(DrapoComponent component, DrapoComponentFile file, string key)
        {
            if (file is DrapoComponentFileDisk)
                return file.GetContent();
            if (!this._cacheComponentFileContent.ContainsKey(key))
                this._cacheComponentFileContent.TryAdd(key, file.GetContent());
            return (this._cacheComponentFileContent[key]);
        }
        #endregion
        #region Pack
        private bool IsPackFile(HttpContext context, out string packName)
        {
            packName = null;
            string url = context.Request.Path.Value;
            int index = url.IndexOf("/packs/");
            if (index < 0)
                return (false);
            string[] split = url.Substring(index + 7).Split('/');
            if (split.Length != 1)
                return (false);
            packName = Path.GetFileNameWithoutExtension(split[0]);
            DrapoPack pack = this._options.Config.GetPack(packName);
            if (pack == null)
                return (false);
            return true;
        }

        private string GetPackETag(string packName)
        {
            if (!this._cachePackETag.ContainsKey(packName))
            {
                string content = this.GeneratePackContent(packName);
                string eTag = GenerateETag(Encoding.UTF8.GetBytes(content));
                this._cachePackETag.TryAdd(packName, eTag);
            }
            return this._cachePackETag[packName];
        }

        private string GetPackContent(string packName)
        {
            string cacheKey = $"{packName}";
            if (!this._cachePackContent.ContainsKey(cacheKey))
            {
                string content = this.GeneratePackContent(packName);
                this._cachePackContent.TryAdd(cacheKey, content);
            }
            return this._cachePackContent[cacheKey];
        }

        private string GeneratePackContent(string packName)
        {
            DrapoPack pack = this._options.Config.GetPack(packName);
            if (pack == null)
                return "{}";
            List<object> files = new List<object>();
            string[] filesPaths = this.ResolvePackFiles(pack);
            foreach (string filePath in filesPaths)
            {
                string content = File.ReadAllText(filePath);
                string relativePath = this.GetRelativePath(filePath);
                files.Add(new { path = relativePath, content = content });
            }
            var packData = new { name = packName, files = files };
            return JsonConvert.SerializeObject(packData);
        }

        private string[] ResolvePackFiles(DrapoPack pack)
        {
            List<string> allFiles = new List<string>();
            // Handle multiple include paths
            string basePath = this._webRootPath ?? "";
            foreach (string includePath in pack.IncludePaths)
            {
                string searchPattern = includePath;
                // Remove leading ~/ if present
                if (searchPattern.StartsWith("~/"))
                    searchPattern = searchPattern.Substring(2);
                string fullSearchPath = Path.Combine(basePath, searchPattern);
                string directory = Path.GetDirectoryName(fullSearchPath);
                string pattern = Path.GetFileName(fullSearchPath);
                if (Directory.Exists(directory))
                {
                    string[] files = Directory.GetFiles(directory, pattern, SearchOption.AllDirectories);
                    allFiles.AddRange(files);
                }
            }
            // Remove duplicates
            allFiles = allFiles.Distinct().ToList();
            // Apply exclusions
            if (pack.ExcludePaths.Count > 0)
            {
                allFiles = allFiles.Where(file =>
                {
                    string relativePath = this.GetRelativePath(file);
                    return !pack.ExcludePaths.Any(exclude => this.MatchesPattern(relativePath, exclude));
                }).ToList();
            }
            return allFiles.ToArray();
        }

        private string GetRelativePath(string fullPath)
        {
            string basePath = this._webRootPath ?? "";
            if (fullPath.StartsWith(basePath))
                return fullPath.Substring(basePath.Length).TrimStart(Path.DirectorySeparatorChar, Path.AltDirectorySeparatorChar);
            return fullPath;
        }

        private bool MatchesPattern(string path, string pattern)
        {
            // Simple pattern matching - could be enhanced for more complex wildcards
            if (pattern.Contains("*"))
            {
                Regex regex = new Regex("^" + Regex.Escape(pattern).Replace("\\*", ".*") + "$", RegexOptions.IgnoreCase);
                return regex.IsMatch(path);
            }
            return path.Equals(pattern, StringComparison.OrdinalIgnoreCase);
        }
        #endregion
        #region Custom
        private async Task<DrapoDynamic> IsRequestCustom(HttpContext context)
        {
            //Cookies
            string theme = null;
            string view = null;
            Dictionary<string, string> cookieValues = this.ExtractCookieValues(context, this._options.Config.CookieName);
            if (cookieValues != null)
            {
                if (cookieValues.ContainsKey("theme"))
                    theme = cookieValues["theme"];
                if (cookieValues.ContainsKey("view"))
                    view = cookieValues["view"];
                if (theme == "default")
                    theme = null;
                if (view == "default")
                    view = null;
            }
            //Theme Or View
            DrapoDynamic dynamic = await IsRequestThemeOrView(context, theme, view);
            if (dynamic != null)
            {
                if (this._options.Config.HandlerCustom != null)
                    dynamic = await this._options.Config.HandlerCustom(dynamic);
                return (dynamic);
            }
            //Dynamic
            dynamic = await IsRequestDynamic(context, theme, view);
            if (dynamic != null)
            {
                if (this._options.Config.HandlerCustom != null)
                    dynamic = await this._options.Config.HandlerCustom(dynamic);
                return (dynamic);
            }
            return (null);
        }
        #endregion
        #region Themes and Views
        private async Task<DrapoDynamic> IsRequestThemeOrView(HttpContext context, string theme, string view)
        {
            //Content Type Supported
            string path = context.Request.Path;
            string extension = Path.GetExtension(path);
            string contentType = GetContentType(extension);
            if (string.IsNullOrEmpty(contentType))
                return (null);
            //Themes
            if (contentType == "text/css")
            {
                if (this._options.Config.HandlerCustomTheme != null)
                {
                    DrapoDynamic customTheme = await this._options.Config.HandlerCustomTheme(context, theme);
                    if (customTheme != null)
                        return (customTheme);
                }
                if ((this._options.Config.HandlerCustom != null) || (this._options.Config.Themes.Count > 0))
                    return (await IsRequestCustomType(context, path, theme, extension, contentType));
            }
            //Views
            if ((contentType == CONTENT_TYPE_HTML) && ((this._options.Config.HandlerCustom != null) || (!string.IsNullOrEmpty(view))))
                return (await IsRequestCustomType(context, path, view, extension, contentType));
            return (null);
        }

        private string GetContentType(string extension)
        {
            if (extension == ".html")
                return (CONTENT_TYPE_HTML);
            if (extension == ".css")
                return ("text/css");
            return (null);
        }

        private async Task<DrapoDynamic> IsRequestCustomType(HttpContext context, string path, string custom, string extension, string contentType)
        {
            string key = string.Format("{0}{1}", custom, path);
            DrapoFile file = this.GetCacheFile(key);
            if (file == null)
                file = CreateCacheFile(context, path, custom, extension, key);
            if (!file.Exists)
                return (null);
            DrapoDynamic dynamic = new DrapoDynamic();
            dynamic.ETag = file.ETag;
            dynamic.LastModified = file.LastModified;
            dynamic.ContentData = file.ContentData;
            dynamic.ContentType = contentType;
            return (await Task.FromResult<DrapoDynamic>(dynamic));
        }

        private bool IsRequestCustomTypeInternal(HttpContext context, string path, string custom, string extension, out string eTag, out string lastModified, out string contentData)
        {
            eTag = lastModified = contentData = null;
            string file = GetDiskPath(path);
            string fileCustom = string.IsNullOrEmpty(custom) ? file : file.Replace(extension, string.Format(".{0}{1}", custom, extension));
            if (!File.Exists(fileCustom))
                return (false);
            contentData = File.ReadAllText(fileCustom, Encoding.UTF8);
            eTag = GenerateETag(Encoding.UTF8.GetBytes(contentData));
            lastModified = System.IO.File.GetLastWriteTime(fileCustom).ToString("R");
            return (true);
        }

        private string GetDiskPath(string path)
        {
            string pathEscape = Uri.UnescapeDataString(path);
            string pathRelative = (Path.DirectorySeparatorChar != '/') ? pathEscape.Replace('/', Path.DirectorySeparatorChar) : pathEscape;
            return (string.Format("{0}{1}", this._webRootPath, pathRelative));
        }

        private DrapoFile GetCacheFile(string key)
        {
            for (int i = this._cacheFiles.Count - 1; i >= 0; i--)
            {
                DrapoFile file = this._cacheFiles[i];
                if (file.Key == key)
                    return (file);
            }
            return (null);
        }

        private DrapoFile CreateCacheFile(HttpContext context, string path, string custom, string extension, string key)
        {
            DrapoFile file = new DrapoFile();
            file.Key = key;
            file.Path = path;
            file.Exists = IsRequestCustomTypeInternal(context, path, custom, extension, out string eTag, out string lastModified, out string contentData);
            file.ETag = eTag;
            file.LastModified = lastModified;
            file.ContentData = contentData;
            this._cacheFiles.Add(file);
            return (file);
        }
        #endregion
        #region Dynamic
        private async Task<DrapoDynamic> IsRequestDynamic(HttpContext context, string theme, string view)
        {
            DrapoDynamic dynamic = new DrapoDynamic();
            if (!this.ExtractRequestDynamic(context, out string tag, out string code))
                return (null);
            for (int i = 0; i < this._options.Config.Dynamics.Count; i++)
            {
                DrapoDynamicHandler dynamicHandler = this._options.Config.Dynamics[i];
                if (dynamicHandler.Tag != tag)
                    continue;
                DrapoDynamicRequest request = new DrapoDynamicRequest();
                request.Code = code;
                request.Context = dynamicHandler.UseTheme ? theme : dynamicHandler.UseView ? view : null;
                request.Path = context.Request.Path;
                request.PathBase = context.Request.PathBase;
                DrapoDynamicResponse response = await dynamicHandler.Handler(request);
                if (response == null)
                {
                    dynamic.Status = 404;
                    return (dynamic);
                }
                dynamic.Status = response.Status ?? 200;
                dynamic.Headers = response.Headers;
                if (dynamic.Status == 302)
                    return (dynamic);
                dynamic.ETag = GenerateETag(Encoding.UTF8.GetBytes(response.Content));
                dynamic.LastModified = response.LastModified.ToString("R");
                dynamic.ContentType = dynamicHandler.ContentType;
                dynamic.ContentData = response.Content;
                return (dynamic);
            }
            return (null);
        }

        private bool ExtractRequestDynamic(HttpContext context, out string tag, out string code)
        {
            tag = code = null;
            string path = context.Request.Path;
            if (path.Length == 0)
                return (false);
            int index = path.IndexOf('/', 1);
            if (index <= 0)
                return (false);
            tag = path.Substring(1, index - 1);
            code = path.Substring(index + 1);
            return (true);
        }
        #endregion
        #region Route
        private DrapoRoute GetRoute(HttpContext context)
        {
            foreach (DrapoRoute route in this._options.Config.Routes)
                if (Regex.IsMatch(context.Request.Path, route.Uri))
                    return (route);
            return (null);
        }

        private string GetRouteBasePath()
        {
            return (GetDiskPath("/index.html"));
        }

        private async Task<string> GetRouteBaseContent(string path)
        {
            return (await File.ReadAllTextAsync(path));
        }

        private string GetRouteBaseLastModified(string path)
        {
            return (File.GetLastWriteTime(path).ToString("R"));
        }

        private string GetRouteContentETag(string routeContent)
        {
            //Content
            string tag = string.Empty;
            using (MD5 md5 = MD5.Create())
            {
                byte[] hash = md5.ComputeHash(Encoding.UTF8.GetBytes(routeContent));
                string hex = BitConverter.ToString(hash);
                tag = hex.Replace("-", "");
            }
            return (tag);
        }
        #endregion
    }
}

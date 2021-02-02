using System;
using System.Collections.Generic;
using System.IO;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace Sysphera.Middleware.Drapo
{
    public class DrapoConfig
    {
        #region Fields
        private Dictionary<string, string> _properties = new Dictionary<string, string>();
        private List<DrapoComponent> _components = new List<DrapoComponent>();
        private List<DrapoTheme> _themes = new List<DrapoTheme>();
        private List<DrapoView> _views = new List<DrapoView>();
        private List<DrapoDynamicHandler> _dynamics = new List<DrapoDynamicHandler>();
        [IgnoreDataMember]
        private Func<DrapoDynamic, Task<DrapoDynamic>> _handlerCustom = null;
        private List<DrapoWindow> _windows = new List<DrapoWindow>();
        private bool _usePipes = false;
        private bool _useRouter = true;
        private bool _useCacheStatic = false;
        private bool _useCacheLocalStorage = true;
        private string _cacheKeysComponentView = null;
        private string _cacheKeysComponentStyle = null;
        private string _cacheKeysComponentScript = null;
        private string _cacheKeysView = null;
        private string _pipeHubName = "drapoHub";
        private string _pipeActionRegister = "Register";
        private string _pipeActionNotify = "Notify";
        private string _pipeHeaderConnectionId = "DrapoPipeConnnectionId";
        private string _cookieName = null;
        private string _storageErrors = null;
        private string _storageBadRequest = null;
        private string _onAuthorizationRequest = null;
        private string _onError = null;
        private string _onBadRequest = null;
        private string _validatorUncheckedClass = null;
        private string _validatorValidClass = null;
        private string _validatorInvalidClass = null;
        private string _applicationBuild = null;
        private string _domainRegex = null;
        private string _domainGroup = "domain";
        #endregion
        #region Properties
        public Dictionary<string, string> Properties { get => _properties; set => _properties = value; }
        public List<DrapoComponent> Components { get => _components; set => _components = value; }
        public List<DrapoTheme> Themes { get => _themes; set => _themes = value; }
        public List<DrapoView> Views { get => _views; set => _views = value; }
        public List<DrapoDynamicHandler> Dynamics { get => _dynamics; set => _dynamics = value; }
        [IgnoreDataMember]
        public Func<DrapoDynamic, Task<DrapoDynamic>> HandlerCustom { get => _handlerCustom; set => _handlerCustom = value; }
        public bool UsePipes { get => _usePipes; set => _usePipes = value; }
        public bool UseRouter { get => _useRouter; set => _useRouter = value; }
        public bool UseCacheStatic { get => (_useCacheStatic) && (!string.IsNullOrEmpty(this._applicationBuild)); set => _useCacheStatic = value; }
        public bool UseCacheLocalStorage { get => _useCacheLocalStorage; set => _useCacheLocalStorage = value; }
        public string CacheKeysComponentView { get => _cacheKeysComponentView; set => _cacheKeysComponentView = value; }
        public string CacheKeysComponentStyle { get => _cacheKeysComponentStyle; set => _cacheKeysComponentStyle = value; }
        public string CacheKeysComponentScript { get => _cacheKeysComponentScript; set => _cacheKeysComponentScript = value; }
        public string CacheKeysView { get => _cacheKeysView; set => _cacheKeysView = value; }
        public string PipeHubName { get => _pipeHubName; set => _pipeHubName = value; }
        public string PipeActionRegister { get => _pipeActionRegister; set => _pipeActionRegister = value; }
        public string PipeActionNotify { get => _pipeActionNotify; set => _pipeActionNotify = value; }
        public string PipeHeaderConnectionId { get => _pipeHeaderConnectionId; set => _pipeHeaderConnectionId = value; }
        public string CookieName { get => _cookieName; set => _cookieName = value; }
        public string StorageErrors { get => _storageErrors; set => _storageErrors = value; }
        public string StorageBadRequest { get => _storageBadRequest; set => _storageBadRequest = value; }
        public string OnAuthorizationRequest { get => _onAuthorizationRequest; set => _onAuthorizationRequest = value; }
        public string OnError { get => _onError; set => _onError = value; }
        public string OnBadRequest { get => _onBadRequest; set => _onBadRequest = value; }
        public List<DrapoWindow> Windows { get => _windows; set => _windows = value; }
        public string ValidatorUncheckedClass { get => _validatorUncheckedClass; set => _validatorUncheckedClass = value; }
        public string ValidatorValidClass { get => _validatorValidClass; set => _validatorValidClass = value; }
        public string ValidatorInvalidClass { get => _validatorInvalidClass; set => _validatorInvalidClass = value; }
        public string ApplicationBuild { get => _applicationBuild; set => _applicationBuild = value; }
        public string DomainRegex { get => _domainRegex; set => _domainRegex = value; }
        public string DomainGroup { get => _domainGroup; set => _domainGroup = value; }
        #endregion

        #region Constructors
        public DrapoConfig()
        {
            Initialize();
        }
        private void Initialize()
        {
            this._cookieName = "drapo";
        }
        #endregion

        #region Component
        public DrapoComponent CreateComponent(string name, string tag = null, string constructor = null)
        {
            if (string.IsNullOrEmpty(tag))
                tag = string.Format("d-{0}", name);
            if (constructor == null)
                constructor = string.Format("{0}Constructor", name);
            if (!tag.StartsWith("d-"))
                throw new Exception("Drapo - Every component must starts with d-");
            if (tag != tag.ToLower())
                throw new Exception("Drapo - Every component must have the tag in lower case");
            DrapoComponent component = new DrapoComponent();
            component.Name = name;
            component.Constructor = constructor;
            component.Tag = tag;
            this.Components.Add(component);
            return (component);
        }

        public DrapoComponent GetComponent(string name)
        {
            return (this.Components.Find(c => c.Name == name));
        }

        public List<DrapoComponent> LoadComponents(string pathBase, string urlBase)
        {
            List<DrapoComponent> components = new List<DrapoComponent>();
            foreach (string directory in Directory.EnumerateDirectories(pathBase))
            {
                string directoryName = new DirectoryInfo(directory).Name;
                DrapoComponent component = this.CreateComponent(directoryName.ToLower());
                foreach (string file in Directory.EnumerateFiles(directory))
                {
                    string fileName = new FileInfo(file).Name;
                    DrapoFileType? type = this.GetFileType(fileName);
                    if (!type.HasValue)
                        continue;
                    component.CreateFile(fileName, type.Value, DrapoResourceType.Url, string.Format("{0}/{1}/{2}", urlBase, directoryName, fileName));
                }
                components.Add(component);
            }
            return (components);
        }

        private DrapoFileType? GetFileType(string fileName)
        {
            string extension = Path.GetExtension(fileName.ToLower());
            if (extension == ".html")
                return (DrapoFileType.View);
            if (extension == ".css")
                return (DrapoFileType.Style);
            if (extension == ".js")
                return (DrapoFileType.Script);
            return (null);
        }
        #endregion
        #region Theme
        public DrapoTheme CreateTheme(string name, string tag)
        {
            DrapoTheme theme = new DrapoTheme();
            theme.Name = name;
            theme.Tag = tag;
            this.Themes.Add(theme);
            return (theme);
        }
        #endregion
        #region View
        public DrapoView CreateView(string name, string tag, string conditional = null)
        {
            DrapoView view = new DrapoView();
            view.Name = name;
            view.Tag = tag;
            view.Condition = conditional;
            this.Views.Add(view);
            return (view);
        }
        #endregion
        #region Dynamic
        public DrapoDynamicHandler CreateDynamic(string name, string tag, string contentType, bool useTheme, bool useView, Func<DrapoDynamicRequest, Task<DrapoDynamicResponse>> handler)
        {
            DrapoDynamicHandler dynamicHandler = new DrapoDynamicHandler();
            dynamicHandler.Name = name;
            dynamicHandler.Tag = tag;
            dynamicHandler.ContentType = contentType;
            dynamicHandler.UseTheme = useTheme;
            dynamicHandler.UseView = useView;
            dynamicHandler.Handler = handler;
            this.Dynamics.Add(dynamicHandler);
            return (dynamicHandler);
        }
        #endregion
        #region Window
        public DrapoWindow CreateWindow(string name, string path, string did, Dictionary<string, string> parameters)
        {
            DrapoWindow window = new DrapoWindow();
            window.Name = name;
            window.Path = path;
            window.Did = did;
            foreach (KeyValuePair<string, string> entry in parameters)
                window.Parameters.Add(entry.Key, entry.Value);
            this.Windows.Add(window);
            return (window);
        }
        #endregion
    }
}

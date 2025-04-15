using System.IO;
using System.Reflection;
using System.Text;

namespace Sysphera.Middleware.Drapo
{
    public class DrapoComponentFileEmbedded : DrapoComponentFile
    {
        private Assembly _assembly;

        public DrapoComponentFileEmbedded(Assembly assembly, string name, DrapoFileType type, string path)
        {
            _assembly = assembly;
            Name = name;
            Type = type;
            Path = path;
            ResourceType = DrapoResourceType.Embedded;
            if (_assembly is null)
            {
                LastModified = string.Empty;
                ETag = string.Empty;
            }
            else
            {
                LastModified = File.GetLastWriteTime(_assembly.Location).ToString("R");
                ETag = GenerateETag(Encoding.UTF8.GetBytes(GetContent()));
            }
        }

        public override string GetContent()
        {
            string path = string.IsNullOrEmpty(ETag) ? this.Path : this.Path.Replace($".{this.ETag}.", ".");
            foreach (string resourcePath in _assembly.GetManifestResourceNames())
            {
                if (resourcePath == path)
                    return (new StreamReader(_assembly.GetManifestResourceStream(resourcePath)).ReadToEnd());
            }
            return string.Empty;
        }
    }
}

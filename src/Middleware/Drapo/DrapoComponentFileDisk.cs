using System.IO;
using System.Text;

namespace Sysphera.Middleware.Drapo
{
    public class DrapoComponentFileDisk : DrapoComponentFile
    {
        private string _rootDir;

        public DrapoComponentFileDisk(string rootDir, string name, DrapoFileType type, string path)
        {
            _rootDir = rootDir;
            Name = name;
            Type = type;
            Path = path;
            ResourceType = DrapoResourceType.Url;
            string diskPath = this.GetDiskPath();
            if (string.IsNullOrEmpty(diskPath) || !File.Exists(diskPath))
            {
                LastModified = string.Empty;
                ETag = string.Empty;
            }
            else
            {
                LastModified = File.GetLastWriteTime(this.GetDiskPath()).ToString("R");
                ETag = GenerateETag(File.ReadAllBytes(this.GetDiskPath()));
            }
        }

        public override string GetContent()
        {
            string diskPath = this.GetDiskPath();
            if (string.IsNullOrEmpty(diskPath) || !File.Exists(diskPath))
                return null;
            return File.ReadAllText(diskPath, Encoding.UTF8);
        }

        private string GetDiskPath()
        {
            string name = this.Name;
            if (!string.IsNullOrEmpty(ETag))
                name = name.Replace($".{this.ETag}.", ".");
            return $"{this._rootDir}{System.IO.Path.DirectorySeparatorChar}{name}";
        }

    }
}

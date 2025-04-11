using System;
using System.Collections.Generic;
using System.IO;
using System.Reflection;
using System.Text;

namespace Sysphera.Middleware.Drapo
{
    public class DrapoComponent
    {
        #region Properties
        public string Name { set; get; }
        public string Tag { set; get; }
		public string Constructor { set; get; }
        public List<DrapoComponentFile> Files { set; get; }
        #endregion
        #region Constructors
        public DrapoComponent()
        {
            this.Files = new List<DrapoComponentFile>();
        }
        #endregion

        #region File
        [Obsolete("Use CreateEmbeddedFile or CreateDiskFile")]
        public DrapoComponentFile CreateFile(string name, DrapoFileType type, DrapoResourceType resourceType, string path, Assembly assembly = null)
        {
            if (resourceType == DrapoResourceType.Embedded)
                return (this.CreateEmbeddedFile(assembly, name, type, path));
            else
                return (this.CreateDiskFile(path, name, type, path));
        }

        public DrapoComponentFile CreateEmbeddedFile(Assembly assembly, string name, DrapoFileType type, string path)
        {
            DrapoComponentFile file = new DrapoComponentFileEmbedded(assembly, name, type, path);
            this.Files.Add(file);
            return (file);
        }

        public DrapoComponentFile CreateDiskFile(string rootDir, string name, DrapoFileType type, string path)
        {
            DrapoComponentFile file = new DrapoComponentFileDisk(rootDir, name, type, path);
            this.Files.Add(file);
            return (file);
        }

        public DrapoComponentFile GetFile(string name)
        {
            return (this.Files.Find(f => string.Equals(name, f.Name, StringComparison.OrdinalIgnoreCase)));
        }

        public void SortFiles() {
            for (int i = this.Files.Count - 1; i >= 0; i--) {
                DrapoComponentFile file = this.Files[i];
                if (!file.Name.StartsWith("_"))
                    continue;
                this.Files.RemoveAt(i);
                this.Files.Add(file);
            }
        }
        #endregion
    }
}

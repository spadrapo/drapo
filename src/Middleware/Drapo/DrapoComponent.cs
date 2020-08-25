using System;
using System.Collections.Generic;
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
        public DrapoComponentFile CreateFile(string name, DrapoFileType type, DrapoResourceType resourceType, string path)
        {
            DrapoComponentFile file = new DrapoComponentFile();
            file.Name = name;
			file.Type = type;
			file.ResourceType = resourceType;
            file.Path = path;
            this.Files.Add(file);
            return (file);
        }

        public DrapoComponentFile GetFile(string name)
        {
            return (this.Files.Find(f => f.Name == name));
        }
        #endregion
    }
}

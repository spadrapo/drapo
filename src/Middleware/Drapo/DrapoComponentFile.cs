using System;
using System.Security.Cryptography;
using System.Text.RegularExpressions;

namespace Sysphera.Middleware.Drapo
{
    public abstract class DrapoComponentFile
    {
        public string Name { get; protected set; }
        public DrapoResourceType ResourceType { get; protected set; }
		public DrapoFileType Type { get; protected set; }
        public string Path { get; protected set; }
        public string ETag { get; protected set; }
        public string LastModified { get; protected set; }

        public abstract string GetContent();

        public void ApplyCacheBurstTag()
        {
            if (string.IsNullOrEmpty(this.ETag))
                return;
            string fileExtension = Regex.Match(Path, @"\..{2,4}$").Value;
            this.Name = Regex.Replace(this.Name, @$"{fileExtension}$", $".{this.ETag}{fileExtension}");
            this.Path = Regex.Replace(this.Path, @$"{fileExtension}$", $".{this.ETag}{fileExtension}");
        }

        public string GetContentType()
        {
            if (this.Type == DrapoFileType.View)
                return ("text/html");
            else if (this.Type == DrapoFileType.Script)
                return ("text/javascript");
            else if (this.Type == DrapoFileType.Style)
                return ("text/css");
            return string.Empty;
        }

        static protected string GenerateETag(byte[] fileData)
        {
            string tag = string.Empty;
            using (MD5 md5 = MD5.Create())
            {
                byte[] hash = md5.ComputeHash(fileData);
                string hex = BitConverter.ToString(hash);
                tag = hex.Replace("-", "");
            }
            return (tag);
        }
    }
}

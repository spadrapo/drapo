using System;
using System.Collections.Generic;
using System.Text;

namespace Sysphera.Middleware.Drapo
{
    public class DrapoPack
    {
        #region Properties
        public string Name { get; set; }
        public string FilesPath { get; set; }
        public List<string> ExcludePaths { get; set; }
        #endregion

        #region Constructors
        public DrapoPack()
        {
            this.ExcludePaths = new List<string>();
        }

        public DrapoPack(string name, string filesPath) : this()
        {
            this.Name = name;
            this.FilesPath = filesPath;
        }
        #endregion

        #region Methods
        public void AddExcludePath(string excludePath)
        {
            if (!string.IsNullOrEmpty(excludePath))
                this.ExcludePaths.Add(excludePath);
        }
        #endregion
    }
}
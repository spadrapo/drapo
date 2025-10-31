using System;
using System.Collections.Generic;
using System.Text;

namespace Sysphera.Middleware.Drapo
{
    public class DrapoPack
    {
        #region Properties
        public string Name { get; set; }
        public List<string> IncludePaths { get; set; }
        public List<string> ExcludePaths { get; set; }
        public bool IsDynamic { get; set; }
        #endregion

        #region Constructors
        public DrapoPack()
        {
            this.IncludePaths = new List<string>();
            this.ExcludePaths = new List<string>();
        }

        public DrapoPack(string name) : this()
        {
            this.Name = name;
        }
        #endregion

        #region Methods
        public DrapoPack AddIncludePath(string includePath)
        {
            if (!string.IsNullOrEmpty(includePath))
                this.IncludePaths.Add(includePath);
            return this;
        }

        public DrapoPack AddExcludePath(string excludePath)
        {
            if (!string.IsNullOrEmpty(excludePath))
                this.ExcludePaths.Add(excludePath);
            return this;
        }

        public DrapoPack SetDynamic(bool isDynamic)
        {
            this.IsDynamic = isDynamic;
            return this;
        }
        #endregion
    }
}
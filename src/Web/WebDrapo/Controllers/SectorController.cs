using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace WebDrapo.Controllers
{
    [AllowAnonymous]
    public class SectorController : Controller
    {

        [HttpGet]
        public string GetContentDynamic(int levels = 0, int children = 2)
        {
            StringBuilder builder = new StringBuilder();
            builder.AppendLine("<div>");
            builder.AppendLine("<span>Content Dynamic</span>");
            InsertSectorToContentDynamic(builder, string.Empty, levels, children);
            builder.AppendLine("</div>");
            return (builder.ToString());
        }

        private void InsertSectorToContentDynamic(StringBuilder builder, string prefix, int levels, int children)
        {
            if (levels > 0)
            {
                for (int i = 0; i < children; i++)
                    InsertSectorToContentDynamicNonLeaf(builder, $"{prefix}_L{levels}C{i}", levels - 1, children);
            }
            else {
                for (int i = 0; i < children; i++)
                    InsertSectorToContentDynamicLeaf(builder, $"{prefix}_C{i}");
            }
        }

        private void InsertSectorToContentDynamicNonLeaf(StringBuilder builder, string prefix, int levels, int children)
        {
            builder.AppendLine($"<div d-sector='{prefix}' >");
            InsertSectorToContentDynamic(builder, prefix, levels, children);
            builder.AppendLine("</div>");
        }

        private void InsertSectorToContentDynamicLeaf(StringBuilder builder, string sectorName)
        {
            builder.AppendLine($"<div d-sector='{sectorName}' >");
            builder.AppendLine("   <div d-dataKey='items' d-dataUrlGet='~/Data/GetModelSample'></div>");
            builder.AppendLine("   <div>");
            builder.AppendLine("      <div d-for='item in items'>");
            builder.AppendLine("         <input type='text' d-model='{{item.Key}}'>");
            builder.AppendLine("         <span>{{item.Key}}</span>");
            builder.AppendLine("         <br />");
            builder.AppendLine("      </div>");
            builder.AppendLine("   </div>");
            builder.AppendLine("   <br />");
            builder.AppendLine("</div>");
        }
    }
}
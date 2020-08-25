using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Sysphera.Middleware.Drapo.User
{
    public class DrapoUserConfig : IDrapoUserConfig
    {
        private DrapoMiddlewareOptions _options;
        private IHttpContextAccessor _context;
        public DrapoUserConfig(DrapoMiddlewareOptions options, IHttpContextAccessor context)
        {
            this._options = options;
            this._context = context;
        }
        public Task Ensure(Dictionary<string, string> values)
        {
            Dictionary<string, string> valuesBefore = this.Extract();
            Dictionary<string, string> valuesJoin = this.Join(valuesBefore, values);
            CookieOptions option = new CookieOptions();
            option.Expires = new DateTimeOffset(new DateTime(2980, 06, 03));
            string value = this.CreateCookieValue(valuesJoin);
            this._context.HttpContext.Response.Cookies.Append(this._options.Config.CookieName, value, option);
            return (Task.CompletedTask);
        }

        private Dictionary<string, string> Extract()
        {
            if (!this._context.HttpContext.Request.Cookies.ContainsKey(this._options.Config.CookieName))
                return (null);
            string value = this._context.HttpContext.Request.Cookies[this._options.Config.CookieName];
            return (this.CreateValues(value));
        }

        private Dictionary<string, string> Join(Dictionary<string, string> values1, Dictionary<string, string> values2)
        {
            if (values1 == null)
                return (values2);
            if (values2 == null)
                return (values1);
            foreach (KeyValuePair<string, string> entry in values2)
            {
                if (values1.ContainsKey(entry.Key))
                    values1[entry.Key] = entry.Value;
                else
                    values1.Add(entry.Key,entry.Value);
            }
            return (values1);
        }

        private string CreateCookieValue(Dictionary<string, string> values)
        {
            StringBuilder builder = new StringBuilder();
            foreach (KeyValuePair<string, string> entry in values)
            {
                if (builder.Length > 0)
                    builder.Append("&");
                builder.Append($"{entry.Key}={entry.Value}");
            }
            return (builder.ToString());
        }

        private Dictionary<string, string> CreateValues(string value)
        {
            Dictionary<string, string> values = new Dictionary<string, string>();
            string[] valuesSplit = value.Split("&");
            foreach (string valueSplit in valuesSplit)
            {
                if (string.IsNullOrEmpty(valueSplit))
                    continue;
                string[] keyValue = valueSplit.Split("=");
                if (keyValue.Length != 2)
                    continue;
                values.Add(keyValue[0], keyValue[1]);
            }
            return (values);
        }
    }
}

using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace Sysphera.Middleware.Drapo
{
    public class DrapoConverter
    {
        public static T DeserializeObject<T>(string value)
        {
            if (IsUnicodeHexadecimal(value))
                value = ConvertUnicodeHexadecimalToUnicode(value);
            return (JsonConvert.DeserializeObject<T>(value));
        }

        private static bool IsUnicodeHexadecimal(string value)
        {
            if (string.IsNullOrEmpty(value))
                return (false);
            return(value.StartsWith("\\u"));
        }

        private static string ConvertUnicodeHexadecimalToUnicode(string value)
        {
            StringBuilder builder = new StringBuilder();
            string[] values = value.Split("\\u");
            foreach (string valueConvert in values)
            {
                if (string.IsNullOrEmpty(valueConvert))
                    continue;
                builder.Append((char)Convert.ToInt64(valueConvert, valueConvert.Length == 2 ? 16 : 32));
            }
            return (builder.ToString());
        }
    }
}

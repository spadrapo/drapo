using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace Sysphera.Middleware.Drapo
{
    public class DrapoObjectConverter : JsonConverter
    {
        public override void WriteJson(JsonWriter writer, object value, JsonSerializer serializer)
        {
            DrapoObject obj = (DrapoObject)value;
            writer.WriteStartObject();
            foreach (KeyValuePair<string, object> entry in obj.GetProperties(true))
            {
                writer.WritePropertyName(entry.Key);
                if (this.WriteJsonArray(writer, entry.Value, serializer))
                    continue;
                DrapoObject objValue = entry.Value as DrapoObject;
                if (objValue == null)
                    writer.WriteValue(entry.Value);
                else
                    this.WriteJson(writer, objValue, serializer);
            }
            writer.WriteEnd();
        }

        private bool WriteJsonArray(JsonWriter writer, object value, JsonSerializer serializer)
        {
            System.Collections.IList list = value as System.Collections.IList;
            if (list == null)
                return (false);
            writer.WriteStartArray();
            foreach (Object itemArray in list)
                WriteJson(writer, itemArray, serializer);
            writer.WriteEndArray();
            return (true);
        }

        public override object ReadJson(JsonReader reader, Type objectType, object existingValue, JsonSerializer serializer)
        {
            DrapoObject obj = new DrapoObject();

            while (reader.Read())
            {
                if (reader.TokenType == JsonToken.PropertyName)
                    continue;
                if (reader.TokenType == JsonToken.EndObject)
                    continue;
                obj.Properties.Add(reader.Path, reader.Value);
            }
            return(obj);
        }

        public override bool CanConvert(Type objectType)
        {
            return (objectType == typeof(DrapoObject));
        }
    }
}

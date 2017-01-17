using System;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace BA.WebApi.Converters {
    public class IsoFlatDateConverter : IsoDateTimeConverter {
        public IsoFlatDateConverter() {
        }

        public override object ReadJson(JsonReader reader, Type objectType, object existingValue, JsonSerializer serializer) {
            var results = base.ReadJson(reader, objectType, existingValue, serializer);

            return ((DateTime)results).ToUniversalTime().Date;
        }
    }
}
using System;
using BA.WebApi.Converters;
using Newtonsoft.Json;

namespace BA.WebApi.Models {
    public class DateEntry {
        public int DateEntryId { get; set; }

        //[JsonConverter(typeof(IsoFlatDateConverter))]
        public DateTime FlatDate { get; set; }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Text.Json.Serialization;


namespace Domain.src.Entities
{
    public class Product: BaseEntityWithId
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public float Price { get; set; }
        public int Inventory { get; set; }
        public Category Category { get; set; }
        public List<string> Images { get; set; }
    }

    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum Category {
        Footwear,
        Apparel,
        Accessories,
    }
}
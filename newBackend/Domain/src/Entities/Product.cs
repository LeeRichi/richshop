using System.Text.Json.Serialization;

namespace Domain.src.Entities
{
    public class Product: BaseEntityWithId
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public float Price { get; set; }
        public Inventory Inventory { get; set; }
        public Category Category { get; set; }
        public List<string> Images { get; set; }
        public Color Color { get; set; }
        public bool IsOnSale { get; set; }
        public string Brand{ get; set; }
    }
    
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum Category {
        Footwear,
        Apparel,
        Accessories,
    }

    public class Inventory {
        public int S { get; set; }
        public int M { get; set; }
        public int L { get; set; }
        public int XL { get; set; }
    }

    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum Color
    {
        Red,
        Blue,
        Green,
        Yellow,
        Purple,
        Orange,
        Pink,
        Brown,
        Black,
        White
    }

}

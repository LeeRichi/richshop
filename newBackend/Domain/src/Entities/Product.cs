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
        public Size Size { get; set; }
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

    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum Size{
        S,
        M,
        L,
        XL
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
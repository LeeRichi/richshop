using Domain.src.Entities;
using System.Text.Json.Serialization;


namespace Business.src.Dtos
{
    public class ProductReadDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public float Price { get; set; }
        public Category Category { get; set; }
        public List<string> Images { get; set; }
        // public int Inventory { get; set; }
        // public Size Size { get; set; }
        public Inventory Inventory { get; set; }
        public Color Color { get; set; }
        public bool IsOnSale { get; set; }
        public string Brand{ get; set; }
    }

    public class ProductCreateDto
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public float Price { get; set; }
        public Category Category { get; set; }
        public List<string> Images { get; set; }
        public Inventory Inventory { get; set; }
        //public int Inventory { get; set; }
        // public Size Size { get; set; }    
        public Color Color { get; set; }
        public bool IsOnSale { get; set; }
        public string Brand{ get; set; }
    }

    public class ProductUpdateDto
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public float Price { get; set; }
        public Category Category { get; set; }
        public List<string> Images { get; set; }
        public Inventory Inventory { get; set; }
        // public int Inventory { get; set; }
        // public Size Size { get; set; }
        public Color Color { get; set; }
        public bool IsOnSale { get; set; }
        public string Brand{ get; set; }
    }
}
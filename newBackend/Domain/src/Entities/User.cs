using System.Text.Json.Serialization;

namespace Domain.src.Entities
{
    public class User : BaseEntityWithId
    {
        public string Name { get; set; }
        public string Address { get; set; }
        public string Email { get; set; }
        public string Avatar { get; set; }  
        public string Password { get; set; }
        public byte[] Salt { get; set; }
        public Role Role { get; set; }
        public List<Order> Orders { get; set; }
        public List<CartItem> Carts { get; set; }
        public List<Product> Favorites { get; set; } = new List<Product>();
        public List<Product> BrowseHistory { get; set; }
    }

    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum Role
    {
        Admin,
        User
    }
}
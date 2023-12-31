using System.Text.Json.Serialization;

namespace Domain.src.Entities
{
    public class Order: BaseEntityWithId
    {
        public OrderStatus OrderStatus { get; set; }
        public List<OrderProduct> OrderProducts { get; set; }
        public User User {get; set;}
        public Guid UserId { get; set; }
        public float OrderTotal { get; set; }
    }

    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum OrderStatus {
        Pending,
        Shipping,
        Arrived,
        PickedUp,
    }
}
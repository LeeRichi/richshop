using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Text.Json.Serialization;


namespace Domain.src.Entities
{
    public class Order: BaseEntityWithId
    {
        public OrderStatus OrderStatus { get; set; }
        public List<OrderProduct> OrderProducts { get; set; } = new List<OrderProduct>();
        public Guid UserId {get; set;}
        public User User {get; set;}
    }

    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum OrderStatus {
        Pending,
        Shipped,
        Arrived,
        PickedUp,
    }
}
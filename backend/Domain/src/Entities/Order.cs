using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Text.Json.Serialization;


namespace Domain.src.Entities
{
    public class Order: BaseEntityWithId
    {
        public Guid UserId { get; set; } // Foreign key property
        public OrderStatus OrderStatus { get; set; }
        public User User{ get; set; }   
    }

    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum OrderStatus {
        Pending,
        Shipped,
        Arrived,
        PickedUp,
        
    }
}
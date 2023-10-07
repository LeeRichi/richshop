using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain.src.Entities
{
    public class Order : BaseEntityWithId
    {
        public OrderStatus OrderStatus { get; set; }
        // public List<OrderProduct> OrderProducts { get; set; } = new List<OrderProduct>();
        public List<OrderProduct> OrderProducts { get; set; }
        public User User {get; set;}    
    }

    public enum OrderStatus {
        Pending,
        Shipped,
        Arrived,
        PickedUp,
    }
}
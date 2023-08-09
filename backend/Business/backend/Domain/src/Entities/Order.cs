using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain.src.Entities
{
    public class Order: BaseEntityWithId
    {
        public OderStatus OderStatus { get; set; }
        public User User{ get; set; }   
        public List<OrderProduct> OrderProducts{ get; set; }   
    }
    public enum OderStatus {
        Pending,
        Shipped,
        Arrived,
        PickedUp,
    }
}
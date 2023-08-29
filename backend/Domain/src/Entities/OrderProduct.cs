using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain.src.Entities
{
    public class OrderProduct
    {
        public Guid OrderId { get; set; } // Foreign key to Order
        public Order Order { get; set; } // Navigation property

        public Guid ProductId { get; set; } // Foreign key to Product
        public Product Product { get; set; } // Navigation property

        public int Amount { get; set; } = 1;
    }
}

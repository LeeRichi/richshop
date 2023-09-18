using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain.src.Entities
{
    public class OrderProduct
    {
        public Guid OrderId { get; set; }
        public Order Order { get; set; } 

        public Guid ProductId { get; set; }
        public Product Product { get; set; }

        public int Amount { get; set; } = 1;
    }
}

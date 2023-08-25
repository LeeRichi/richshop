using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain.src.Entities
{
    public class OrderProduct : BaseEntityWithId
    {
        public Guid ProductId { get; set; } // Foreign key to Product
        public int Amount { get; set; }

        public Product Product { get; set; } // Navigation property

        // Other properties if needed
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain.src.Entities
{
    public class OrderProduct
    {
        public Order Order { get; set; }  
        public Product Product{ get; set; }
        public int Amount {get; set; }
    }
}
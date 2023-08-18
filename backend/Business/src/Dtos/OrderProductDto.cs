using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.src.Entities;


namespace Business.src.Dtos
{
    public class OrderProductReadDto
    {
        public Order Order { get; set; }  
        public Product Product{ get; set; }
        public int Amount {get; set; }
    }
    public class OrderProductCreateDto
    {
        public Order Order { get; set; }  
        public Product Product{ get; set; }
        public int Amount {get; set; }
    }
    public class OrderProductUpdateDto
    {
        public Order Order { get; set; }  
        public Product Product{ get; set; }
        public int Amount {get; set; }
    }
}
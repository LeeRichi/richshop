using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.src.Entities;

namespace Business.src.Dtos
{
    public class OrderReadDto
    {
        public OrderStatus OrderStatus { get; set; }        
        public List<OrderProductReadDto> OrderProducts { get; set; }
        public List<Guid> OrderProductId { get; set; }
        public Guid UserId {get; set;}
        public User User {get; set;}
    }

    public class OrderCreateDto
    {
        public OrderStatus OrderStatus { get; set; }
        public List<Guid> OrderProductId { get; set; }
        public Guid UserId {get; set;}
    }

    public class OrderUpdateDto
    {
        public OrderStatus OrderStatus { get; set; }
        public List<Guid> OrderProductId { get; set; }
        public Guid UserId {get; set;}
    }
}
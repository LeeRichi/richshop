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
        public UserReadDto User { get; set; }
        public List<OrderProductReadDto> OrderProducts { get; set; } //OrderProductReadDto
    }

    public class OrderCreateDto
    {
        public OrderStatus OrderStatus { get; set; }
        public Guid UserId { get; set; }
        public List<OrderProduct> OrderProducts { get; set; } //OrderProductCreateDto
    }

    // public class OrderCreateDto
    // {
    //     public OrderStatus OrderStatus { get; set; }
    //     public Guid UserId { get; set; }
    //     public List<OrderProduct> OrderProducts { get; set; } //OrderProductCreateDto
    // }

    public class OrderUpdateDto
    {
        public OrderStatus OrderStatus { get; set; }
    }
}
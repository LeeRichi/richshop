using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.src.Entities;


namespace Business.src.Dtos
{
    public class OrderProductReadDto
    {
        public Guid OrderId { get; set; }
        public Guid ProductId { get; set; }
        public int Amount { get; set; }
    }
    public class OrderProductCreateDto
    {
        public Guid ProductId { get; set; }
        public int Amount { get; set; }
    }
    public class OrderProductUpdateDto
    {
        public Guid ProductId { get; set; }
        public int Amount { get; set; }
    }
}
using System;
using System.Collections.Generic;

namespace Business.src.Dtos
{
    public class CartItemDto
    {
        public Guid UserId { get; set; }
        public Guid ProductId { get; set; }
        public int Quantity { get; set; }
    }
}

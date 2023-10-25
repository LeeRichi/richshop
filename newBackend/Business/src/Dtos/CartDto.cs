using System;
using System.Collections.Generic;

namespace Business.src.Dtos
{
    public class CartReadDto
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public List<CartItemReadDto> CartItems { get; set; }
    }

    public class CartCreateDto
    {
        public Guid UserId { get; set; } // Add properties to create a new cart
        public List<CartItemCreateDto> CartItems { get; set; } // Add items to the cart during creation
    }

    public class CartUpdateDto
    {
        public List<CartItemUpdateDto> CartItems { get; set; } // Update items in the cart
    }

    public class CartItemDto
    {
        public Guid ProductId { get; set; }
        public int Quantity { get; set; }
    }
}

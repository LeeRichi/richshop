using Domain.src.Entities;

namespace Business.src.Dtos
{
    public class CartItemReadDto
    {
        public Guid UserId { get; set; }
        // public Guid ProductId { get; set; }
        public Product Product { get; set; }
        public int Quantity { get; set; }
    }

    public class CartItemCreateDto
    {
        public Guid UserId { get; set; }
        public Guid ProductId { get; set; }
    }
    
    public class CartItemDeleteDto{
        public Guid Id { get; set; }
    }
}

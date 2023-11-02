using Domain.src.Entities;

namespace Business.src.Dtos
{
    public class OrderReadDto
    {
        public Guid Id {get; set;}
        public OrderStatus OrderStatus { get; set; }        
        public List<OrderProductReadDto> OrderProducts { get; set; }
        public Guid UserId {get; set;}
        // public User User {get; set;}
        public DateTime CreateAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public float OrderTotal { get; set; }
    }

    public class OrderCreateDto
    {
        public OrderStatus OrderStatus { get; set; }
        public List<OrderProductCreateDto> OrderProducts { get; set; }
        public Guid UserId {get; set;}
    }

    public class OrderUpdateDto
    {
        public OrderStatus OrderStatus { get; set; }
        // public List<OrderProductUpdateDto> OrderProducts { get; set; }
    }
}
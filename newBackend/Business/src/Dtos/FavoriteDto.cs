using Domain.src.Entities;

namespace Business.src.Dtos
{
    public class FavoriteCreateDto
    {
        public Guid UserId { get; set; }
        public Guid ProductId { get; set; }
    }

    public class FavoriteReadDto{
        public User User { get; set; }
        public Guid UserId { get; set; }
        public Product Product { get; set; }
        public Guid ProductId { get; set; } 
    }
}
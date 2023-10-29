namespace Domain.src.Entities
{
    public class Favorite
    {
        public User User { get; set; }
        public Guid UserId { get; set; }
        public Product Product { get; set; }
        public Guid ProductId { get; set; }
    }
}
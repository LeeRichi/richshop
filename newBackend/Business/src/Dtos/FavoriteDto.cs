namespace Business.src.Dtos
{
    public class FavoriteCreateDto
    {
        public Guid UserId { get; set; }
        public Guid ProductId { get; set; }
    }
}
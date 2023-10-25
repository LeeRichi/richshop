namespace Domain.src.Entities
{
    public class Cart : BaseEntityWithId
    {
        public Guid UserId { get; set; }
        public List<CartItem> CartItems { get; set; }
    }

    public class CartItem
    {
        public Product Product{ get; set; }
        public Guid ProductId { get; set; }
        public int Quantity { get; set; }
        public Cart Cart { get; set; }
        public Guid CartId{ get; set; }
    }
}

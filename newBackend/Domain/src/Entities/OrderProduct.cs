namespace Domain.src.Entities
{
    public class OrderProduct
    {
        public Order Order { get; set; }
        public Guid OrderId { get; set; }
        public Product Product { get; set; }
        public Guid ProductId { get; set; }
        public int Amount { get; set; }
    }
}

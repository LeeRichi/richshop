namespace Business.src.Dtos
{
    public class CartItemReadDto
    {
        public Guid ProductId { get; set; }
        public int Quantity { get; set; }
        public Guid CartId{ get; set; }
    }
    public class CartItemCreateDto
    {
        public Guid ProductId { get; set; }
        public int Quantity { get; set; }
    }
    public class CartItemUpdateDto
    {
        public Guid ProductId { get; set; }
        public int Quantity { get; set; }
    }
}
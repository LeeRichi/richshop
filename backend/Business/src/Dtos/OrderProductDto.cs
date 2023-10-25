namespace Business.src.Dtos
{
    public class OrderProductReadDto
    {
        public string OrderId { get; set; }
        public string ProductId { get; set; }
        public int Amount { get; set; }
    }
    public class OrderProductCreateDto
    {
        public string ProductId { get; set; }
        public int Amount { get; set; }
    }
    public class OrderProductUpdateDto
    {
        public string ProductId { get; set; }
        public int Amount { get; set; }
    }
}
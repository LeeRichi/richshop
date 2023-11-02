using AutoMapper;
using Business.src.Abstraction;
using Business.src.Dtos;
using Domain.src.Abstractions;
using Domain.src.Entities;

namespace Business.src.Implementations
{
    public class OrderService : BaseService<Order, OrderReadDto, OrderCreateDto, OrderUpdateDto>, IOrderService
    {
        private readonly IOrderRepo _orderRepo;
        private readonly IProductRepo _productRepo;
        public OrderService(IOrderRepo orderRepo, IProductRepo productRepo, IMapper mapper) : base(orderRepo, mapper, productRepo)
        {
            _orderRepo = orderRepo;
            _productRepo = productRepo;
        }
        public override async Task<OrderReadDto> CreateOne(OrderCreateDto orderCreateDto)
        {
            var order = _mapper.Map<Order>(orderCreateDto);

            float orderTotal = 0; 

            foreach (var orderProductCreateDto in orderCreateDto.OrderProducts)
            {
                var productId = orderProductCreateDto.ProductId; 
                var size = orderProductCreateDto.Size;

                if (productId == Guid.Empty)
                {
                    System.Console.WriteLine("Invalid ProductId: " + productId);
                }
                else
                {
                    var product = await _productRepo.GetOneById(productId);

                    if (product == null)
                    {
                        System.Console.WriteLine("Product not found for ID: " + productId);
                    }
                    else
                    {
                        int availableQuantity = GetAvailableQuantity(product.Inventory, size);

                        if (availableQuantity >= orderProductCreateDto.Amount)
                        {
                            float orderProductTotal = product.Price * orderProductCreateDto.Amount;
                            orderTotal += orderProductTotal;
                        }
                        else
                        {
                            throw new Exception($"Not enough inventory for size {size}");
                        }
                    }
                }
            }
            order.OrderTotal = orderTotal;

            var createdOrder = await _orderRepo.CreateOne(order);

            var orderReadDto = _mapper.Map<OrderReadDto>(createdOrder);
            return orderReadDto;
        }

        private int GetAvailableQuantity(Inventory inventory, Size size)
        {
            string sizeString = size.ToString();
            switch (sizeString)
            {
                case "S":
                    return inventory.S;
                case "M":
                    return inventory.M;
                case "L":
                    return inventory.L;
                case "XL":
                    return inventory.XL;
                default:
                    return 0;
            }
        }
    }
}




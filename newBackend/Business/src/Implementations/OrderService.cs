using System.Runtime.CompilerServices;
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
        
            foreach (var orderProductCreateDto in orderCreateDto.OrderProducts)
            {
                System.Console.WriteLine("Processing order product: " + orderProductCreateDto.ProductId);

                var productId = orderProductCreateDto.ProductId; // Assuming ProductId is of type Guid

                if (productId == Guid.Empty)
                {
                    System.Console.WriteLine("Invalid ProductId: " + productId);
                }
                else
                {
                    System.Console.WriteLine("in else");
                    var product = await _productRepo.GetOneById(productId);

                    if (product == null)
                    {
                        System.Console.WriteLine("Product not found for ID: " + productId);
                    }
                    else
                    {
                        // Process the product as needed
                        System.Console.WriteLine("Product found:");
                        System.Console.WriteLine($"Product ID: {product.Id}");
                        System.Console.WriteLine($"Product Title: {product.Title}");
                        System.Console.WriteLine($"Product Inventory: {product.Inventory}");
                        
                        // Check inventory, etc.
                    }
                }
            }

            var createdOrder = await _orderRepo.CreateOne(order);

            var orderReadDto = _mapper.Map<OrderReadDto>(createdOrder);
            return orderReadDto;
        }
    }
}




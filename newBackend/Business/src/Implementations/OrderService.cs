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

        public OrderService(IOrderRepo orderRepo, IMapper mapper) : base(orderRepo, mapper)
        {
            _orderRepo = orderRepo;
        }

        public override async Task<OrderReadDto> CreateOne(OrderCreateDto orderCreateDto)
        {
            var order = _mapper.Map<Order>(orderCreateDto);

            var createdOrder = await _orderRepo.CreateOne(order);

            var orderReadDto = _mapper.Map<OrderReadDto>(createdOrder);
            return orderReadDto;
        }
    }
}




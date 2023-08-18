using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Business.src.Abstraction;
using Business.src.Dtos;
using Domain.src.Abstraction;
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

        public override async Task<OrderReadDto> CreateOne(OrderCreateDto dto)
        {
            var entity = _mapper.Map<Order>(dto);
            var created = await _orderRepo.CreateOne(entity);
            return _mapper.Map<OrderReadDto>(created); 
        }
    }
}

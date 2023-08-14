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
        public OrderService(IBaseRepo<Order> baseRepo, IMapper mapper) : base(baseRepo, mapper)
        {
        }
    }
}
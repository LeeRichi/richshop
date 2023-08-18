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
    public class OrderProductService: BaseService<OrderProduct, OrderProductReadDto, OrderProductCreateDto, OrderProductUpdateDto>, IOrderProductService
    {
        private readonly IOrderProductRepo _orderProductRepo;

        public OrderProductService(IOrderProductRepo orderProductRepo, IMapper mapper) : base(orderProductRepo, mapper)
        {
            _orderProductRepo = orderProductRepo;
        }
    }
}
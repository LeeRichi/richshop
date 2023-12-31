using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Business.src.Dtos;
using Domain.src.Entities;

namespace Business.src.Abstraction
{
    public interface IOrderService : IBaseService<Order, OrderReadDto, OrderCreateDto, OrderUpdateDto>
    {
        
    }
}

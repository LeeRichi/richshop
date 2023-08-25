using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Business.src.Abstraction;
using Business.src.Dtos;
using Domain.src.Entities;
using Microsoft.AspNetCore.Authorization;
using Domain.src.Shared;
using Microsoft.AspNetCore.Mvc;

namespace Controller.src.Controllers
{
    [AllowAnonymous]
    public class OrderProductController: CrudController<OrderProduct, OrderProductReadDto, OrderProductCreateDto, OrderProductUpdateDto>
    {
        private readonly IOrderProductService _orderProductService;

        public OrderProductController(IOrderProductService baseService) : base(baseService)
        {
            _orderProductService = baseService;
        }
    }
}
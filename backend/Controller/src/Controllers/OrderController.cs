using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Business.src.Abstraction;
using Business.src.Dtos;
using Business.src.Implementations;
using Domain.src.Entities;

namespace Controller.src.Controllers
{
    [AllowAnonymous]
    public class OrderController : CrudController<Order, OrderReadDto, OrderCreateDto, OrderUpdateDto>
    {
        private readonly IAuthorizationService _authorizationService;
        private readonly IOrderService _orderService;
        private readonly IUserService _userService; // Assuming you have a user service
        
        public OrderController(IOrderService baseService, IAuthorizationService authService, IUserService userService)
            : base(baseService)
        {
            _orderService = baseService;
            _authorizationService = authService;
            _userService = userService;
        }

        // [Authorize]
        // [AllowAnonymous]
        public override async Task<ActionResult<OrderReadDto>> UpdateOneById([FromRoute] Guid id, [FromBody] OrderUpdateDto update)
        {
            var user = HttpContext.User;
            var order = await _orderService.GetOneById(id);
            return await base.UpdateOneById(id, update);
        }
    }
}

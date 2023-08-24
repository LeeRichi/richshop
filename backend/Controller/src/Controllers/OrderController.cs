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
    public class OrderController : CrudController<Order, OrderReadDto, OrderCreateDto, OrderUpdateDto>
    {
       private readonly IAuthorizationService _authorizationService;
        private readonly IOrderService _orderService;
        
        public OrderController(IOrderService baseService, IAuthorizationService authService)
            : base(baseService)
        {
            _orderService = baseService;
            _authorizationService = authService;
        }

        // [Authorize]
        [AllowAnonymous]
        public override async Task<ActionResult<OrderReadDto>> UpdateOneById([FromRoute] Guid id, [FromBody] OrderUpdateDto update)
        {
            var user = HttpContext.User;
            var order = await _orderService.GetOneById(id);
            /* resource based authorization here */
            // var authorizeOwner = await _authorizationService.AuthorizeAsync(user, order, "OwnerOnly");
            // if (authorizeOwner.Succeeded)
            // {
                return await base.UpdateOneById(id, update);
            // }
            // else
            // {
            //     return new ForbidResult();
            // }
        }

        // public override async Task<ActionResult<OrderReadDto>> CreateOne([FromBody] OrderCreateDto dto){
        //     var createObj = await _orderService.CreateOne(dto);
        //     return CreatedAtAction(nameof(CreateOne), createObj); //be aware for later
        // }
    }
}
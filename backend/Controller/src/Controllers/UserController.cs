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
using Business.src.Implementations;



namespace Controller.src.Controllers
{
    // [Authorize]
    public class UserController: CrudController<User, UserReadDto, UserCreateDto, UserUpdateDto>
    {
        private readonly IUserService _userService;

        public UserController(IUserService baseService) : base(baseService)
        {
            _userService = baseService;
        }
        
        [Authorize(Roles = "Admin")]
        [HttpPost("admin")]
        public async Task<ActionResult<UserReadDto>> CreateAdmin([FromBody] UserCreateDto dto)
        {
            return CreatedAtAction(nameof(CreateAdmin), await _userService.CreateAdmin(dto));
        }


        [Authorize(Roles = "Admin")]
        public override async Task<ActionResult<IEnumerable<UserReadDto>>> GetAll([FromQuery] QueryOptions queryOptions)
        {
            return Ok(await _userService.GetAll(queryOptions));
        }

    }    
}
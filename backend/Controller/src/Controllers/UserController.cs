using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Business.src.Abstraction;
using Business.src.Dtos;
using Domain.src.Entities;
using Microsoft.AspNetCore.Authorization;


namespace Controller.src.Controllers
{
    [Authorize]
    public class UserController: CrudController<User, UserReadDto, UserCreateDto, UserUpdateDto>
    {
        private readonly IUserService _userService;

        public UserController(IUserService baseService) : base(baseService)
        {
            _userService = baseService;
        }
    }    
}
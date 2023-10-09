using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;
using Business.src.Abstractions;
using Business.src.Dtos;
using Domain.src.Entities;

namespace Controller.src.Controllers
{
    public class UserController: CrudController<User, UserReadDto, UserCreateDto, UserUpdateDto>
    {
        private readonly IUserService _userService;

        public UserController(IUserService baseService) : base(baseService){
            _userService = baseService;
        }
    }
}
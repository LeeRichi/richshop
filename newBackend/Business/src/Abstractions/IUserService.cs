using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Business.src.Dtos;
using Domain.src.Entities;

namespace Business.src.Abstractions
{
    public interface IUserService: IBaseService<User, UserReadDto, UserCreateDto, UserUpdateDto>
    {
        Task<UserReadDto> UpdatePassword(string id, string newPassword);
        // UserReadDto GetProfile(string id);
    }
} 
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.src.Entities;
using Business.src.Dtos;


namespace Business.src.Abstration
{
    public interface IUserService : IBaseService<User, UserDto>
    {
        UserDto UpdatePassword(string id, string newPassword);
        // UserDto GetProfile(string id); only need it controller because logic is the same
    }
} 
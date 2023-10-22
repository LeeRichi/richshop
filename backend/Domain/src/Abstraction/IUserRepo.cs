using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.src.Entities;


namespace Domain.src.Abstraction
{
    public interface IUserRepo : IBaseRepo<User>
    {
        Task<User> CreateAdmin(User user);
        Task<User> UpdatePassword(User user);
        Task<User?> FindOneByEmail(string email);
        Task<bool> CheckEmailExists(string email);
    }
}
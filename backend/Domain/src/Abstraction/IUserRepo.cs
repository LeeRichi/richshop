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
        Task<User> UpdatePassword(User user, string newPassword);
        Task<User?> FindOneByEmail(string email);
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain.src.Entities
{
    public interface IUserRepo : IBaseRepo<User>
    {
        User CreateAdmin(User user);
    }
}
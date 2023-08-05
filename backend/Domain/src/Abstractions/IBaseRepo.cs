using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain.src.Abstractions
{
    public interface IBaseRepo<T> 
    {
        IEnumerable<T> GetAll();
        T GetOneById(string id);
        T UpdateOneById(T updatedEntity);
        bool DeleteOneById(string id);
    }
}
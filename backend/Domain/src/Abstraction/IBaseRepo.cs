using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.src.Entities;


namespace Domain.src.Abstraction
{
    public interface IBaseRepo<T> 
    {
        IEnumerable<T> GetAll(QueryOptions queryOptions);
        T GetOneById(string id);
        T UpdateOneById(T originalEntity, T updatedEntity);
        bool DeleteOneById(string id);
    }
}




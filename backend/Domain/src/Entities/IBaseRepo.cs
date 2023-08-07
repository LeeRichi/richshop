using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain.src.Entities
{
    public interface IBaseRepo<T> 
    {
        IEnumerable<T> GetAll(QueryOptions queryOptions);
        T GetOneById(string id);
        T UpdateOneById(T updatedEntity);
        bool DeleteOneById(string id);
    }
}



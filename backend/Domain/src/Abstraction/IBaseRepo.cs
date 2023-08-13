using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.src.Entities;
using Domain.src.Shared;


namespace Domain.src.Abstraction
{
    public interface IBaseRepo<T> 
    {
        Task<IEnumerable<T>> GetAll(QueryOptions queryOptions);
        Task<T?> GetOneById(Guid id);
        Task<T> UpdateOneById(T updatedEntity);
        Task<bool> DeleteOneById(T entity);
        Task<T> CreateOne(T entity);
    }
}
 


 
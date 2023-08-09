using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.src.Entities;


namespace Domain.src.Abstraction
{
    public interface IBaseRepo<T> 
    {
        Task<IEnumerable<T>> GetAll(QueryOptions queryOptions);
        Task<T> GetOneById(string id);
        Task<T> UpdateOneById(T originalEntity, T updatedEntity);
        Task<bool> DeleteOneById(string id);
        Task<T> CreateOne(T entity);
    }
}
 


 
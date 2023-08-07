using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.src.Entities;


namespace Business.src.Abstration
{
    public interface IBaseService<T, TDto>
    {
        IEnumerable<TDto> GetAll(QueryOptions queryOptions);
        TDto GetOneById(string id);
        TDto UpdateOneById(string id, TDto updated);
        bool DeleteOneById(string id);
    }
}
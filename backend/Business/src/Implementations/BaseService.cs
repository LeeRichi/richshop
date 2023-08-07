using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Business.src.Implementations
{
    public class BaseService<T, TDto> : IBaseService<T, TDto>
    {
        public bool DeleteOneById(string id){
            throw new NotImplementedException();
        }
        public  IEnumerable<TDto> GetAll(QueryOptions queryOptions){
            throw new NotImplementedException();
        }

        public TDto GetOneById(string id){
            throw new NotImplementedException();
        }
        public TDto UpdateOneById(string id, TDto updated){
            throw new NotImplementedException();
        }
    }
}
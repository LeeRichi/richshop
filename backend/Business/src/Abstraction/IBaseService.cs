using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.src.Entities;
using Domain.src.Shared;



namespace Business.src.Abstraction
{
    public interface IBaseService<T, TReadDto, TCreateDto, TupdateDto>
    {
        Task<IEnumerable<TReadDto>> GetAll(QueryOptions queryOptions);
        Task<TReadDto> GetOneById(string id);
        Task<TReadDto> UpdateOneById(string id, TupdateDto updated);
        Task<bool> DeleteOneById(string id);
        Task<TReadDto> CreateOne(TCreateDto dto);
    }
}


//create user: name, email, password

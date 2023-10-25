using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.src.Entities;
using Domain.src.Shared;

namespace Business.src.Abstraction
{
    public interface IBaseService<T, TReadDto, TCreateDto, TUpdateDto>
    {
        Task<IEnumerable<TReadDto>> GetAll(QueryOptions queryOptions);
        Task<TReadDto> GetOneById(Guid id);
        Task<TReadDto> UpdateOneById(Guid id, TUpdateDto updated);
        Task<bool> DeleteOneById(Guid id);
        Task<TReadDto> CreateOne(TCreateDto dto);
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.src.Shared;

namespace Business.src.Abstractions
{
    public interface IBaseService<T, TReadDto, TCreateDto, TUpdateDto>
    {
        Task<IEnumerable<TReadDto>> GetAll(QueryOptions queryOptions);
        Task<TReadDto> GetOneById(string id);
        Task<TReadDto> UpdateOneById(string id, TUpdateDto updated);
        Task<bool> DeleteOneById(string id);
        Task<TReadDto> CreateOne(TCreateDto dto);
    }
}
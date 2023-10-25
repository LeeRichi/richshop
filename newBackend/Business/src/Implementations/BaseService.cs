using AutoMapper;
using Business.src.Abstraction;
using Domain.src.Abstractions;
using Domain.src.Shared;
using Business.src.Shared;

namespace Business.src.Implementations
{
    public class BaseService<T, TReadDto, TCreateDto, TUpdateDto> : IBaseService<T, TReadDto, TCreateDto, TUpdateDto>
    {
        private readonly IBaseRepo<T> _baseRepo;
        protected readonly IMapper _mapper;

        public BaseService(IBaseRepo<T> baseRepo, IMapper mapper)
        {
            _baseRepo = baseRepo;
            _mapper = mapper;
        }

        public async Task<TReadDto> GetOneById(Guid id)
        {
            return _mapper.Map<TReadDto>(await _baseRepo.GetOneById(id));
        }

        public async Task<bool> DeleteOneById(Guid id)
        {
            var foundItem = await _baseRepo.GetOneById(id);
            
            if (foundItem is null)
            {
                return false;
            }
            await _baseRepo.DeleteOneById(foundItem);
            return true;
        }

        public async Task<IEnumerable<TReadDto>> GetAll(QueryOptions queryOptions)
        {
            return _mapper.Map<IEnumerable<TReadDto>>(await _baseRepo.GetAll(queryOptions));
        }

        public async Task<TReadDto> UpdateOneById(Guid id, TUpdateDto updated)
        {
            var foundItem = await _baseRepo.GetOneById(id);
            if (foundItem == null)
            {
                throw CustomException.NotFoundException();
            }
            _mapper.Map(updated, foundItem);
            var updatedEntity = await _baseRepo.UpdateOneById(foundItem);
            return _mapper.Map<TReadDto>(updatedEntity);
        }

        public virtual async Task<TReadDto> CreateOne(TCreateDto dto)
        {
            var entity = await _baseRepo.CreateOne(_mapper.Map<T>(dto));
            return _mapper.Map<TReadDto>(entity);
        }
    }
}

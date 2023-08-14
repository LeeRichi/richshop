using AutoMapper;
using Business.src.Abstraction;
using Domain.src.Abstraction;
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
        public async Task<bool> DeleteOneById(Guid id)
        {
            var foundItem = await _baseRepo.GetOneById(id);
            if (foundItem is null)
            {
                //pre
                // await _baseRepo.DeleteOneById(foundItem);
                
                //new
                await _baseRepo.DeleteOneById(foundItem); // Corrected to delete by ID
                return true;
            }
            return false;
        }

        public async Task<IEnumerable<TReadDto>> GetAll(QueryOptions queryOptions)
        {
            return _mapper.Map<IEnumerable<TReadDto>>(await _baseRepo.GetAll(queryOptions));
        }

        public async Task<TReadDto> GetOneById(Guid id)
        {
            return _mapper.Map<TReadDto>(await _baseRepo.GetOneById(id));
        }
        
        //pre
        // public async Task<TReadDto> UpdateOneById(Guid id, TUpdateDto updated)
        // {
        //     var foundItem = await _baseRepo.GetOneById(id);
        //     if (foundItem is null)
        //     {
        //         await _baseRepo.DeleteOneById(foundItem);
        //         throw new Exception("Item not found"); 
        //     }
        //     var updatedEntity = _baseRepo.UpdateOneById(_mapper.Map<T>(updated));
        //     return _mapper.Map<TReadDto>(updatedEntity);
        // }

        public async Task<TReadDto> UpdateOneById(Guid id, TUpdateDto updated)
        {
            var foundItem = await _baseRepo.GetOneById(id);
            if (foundItem == null)
            {
                // throw new Exception("Item not found");
                throw CustomException.NotFoundException();
            }

            _mapper.Map(updated, foundItem); // Update the entity with the properties from the updated DTO
            var updatedEntity = await _baseRepo.UpdateOneById(foundItem); // Call the UpdateOneById method with the entity instance
            return _mapper.Map<TReadDto>(updatedEntity);
        }

        public virtual async Task<TReadDto> CreateOne(TCreateDto dto)
        {
            var entity = await _baseRepo.CreateOne(_mapper.Map<T>(dto));
            return _mapper.Map<TReadDto>(entity);
        }
    }
}

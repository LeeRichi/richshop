using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.src.Entities;
using Business.src.Abstraction;
using Business.src.Dtos;
using Domain.src.Abstraction;
using AutoMapper;
using Domain.src.Shared;




namespace Business.src.Implementations
{
    public class BaseService<T, TReadDto, TCreateDto, TupdateDto> : IBaseService<T, TReadDto, TCreateDto, TupdateDto>
    {
        private readonly IBaseRepo<T> _baseRepo;
        protected readonly IMapper _mapper;

        public BaseService(IBaseRepo<T> baseRepo, IMapper mapper){
            _baseRepo = baseRepo;
            _mapper = mapper;
        }
        
        public async Task<bool> DeleteOneById(string id){
            var foundItem = await _baseRepo.GetOneById(id);
            if(foundItem != null){
                await _baseRepo.DeleteOneById(id);
                return true;
            }
            return false;
        }

        public async Task<IEnumerable<TReadDto>> GetAll(QueryOptions queryOptions){
            return _mapper.Map<IEnumerable<TReadDto>>(await _baseRepo.GetAll(queryOptions));
        }

        public async Task<TReadDto> GetOneById(string id){
            return _mapper.Map<TReadDto>(await _baseRepo.GetOneById(id));
        }

        public async Task<TReadDto> UpdateOneById(string id, TupdateDto updated){
            var foundItem = await _baseRepo.GetOneById(id);
            if(foundItem == null){
                await _baseRepo.DeleteOneById(id);
                throw new Exception("Item not found"); //modify later
            }
            await _baseRepo.UpdateOneById(foundItem, _mapper.Map<T>(updated));

            var updatedEntity = await _baseRepo.UpdateOneById(foundItem, _mapper.Map<T>(updated));
            return _mapper.Map<TReadDto>(updatedEntity);
        }
        
        public async Task<TReadDto> CreateOne(TCreateDto dto){
            var entity = await _baseRepo.CreateOne(_mapper.Map<T>(dto));
            return _mapper.Map<TReadDto>(entity);
        }
    }
}
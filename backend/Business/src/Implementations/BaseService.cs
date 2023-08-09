using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.src.Entities;
using Business.src.Abstraction;
using Business.src.Dtos;
using Domain.src.Abstraction;
using AutoMapper;



namespace Business.src.Implementations
{
    public class BaseService<T, TDto> : IBaseService<T, TDto>
    {
        private readonly IBaseRepo<T> _baseRepo;
        protected readonly IMapper _mapper;

        public BaseService(IBaseRepo<T> baseRepo, IMapper mapper){
            _baseRepo = baseRepo;
            _mapper = mapper;
        }
        
        public bool DeleteOneById(string id){
            var foundItem = _baseRepo.GetOneById(id);
            if(foundItem != null){
                _baseRepo.DeleteOneById(id);
                return true;
            }
            return false;
        }

        public  IEnumerable<TDto> GetAll(QueryOptions queryOptions){
            return _mapper.Map<IEnumerable<TDto>>(_baseRepo.GetAll(queryOptions));
        }

        public TDto GetOneById(string id){
            return _mapper.Map<TDto>(_baseRepo.GetOneById(id));
        }

        public TDto UpdateOneById(string id, TDto updated){
            var foundItem = _baseRepo.GetOneById(id);
            if(foundItem == null){
                // _baseRepo.UpdateOneById(UpdateOneById);
                throw new Exception("Item not found"); //modify later
            }
            _baseRepo.UpdateOneById(foundItem, _mapper.Map<T>(updated));

            var updatedEntity = _baseRepo.UpdateOneById(foundItem, _mapper.Map<T>(updated));
            return _mapper.Map<TDto>(updatedEntity);
        }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.src.Entities;
using Business.src.Abstration;
using Business.src.Dtos;
using Domain.src.Abstraction;
using AutoMapper;



namespace Business.src.Implementations
{
    public class BaseService<T, TDto> : IBaseService<T, TDto>
    {
        private readonly IBaseRepo<T> _baseRepo;
        private readonly IMapper _mapper;

        public BaseService(IBaseRepo<T> baseRepo, IMapper mapper){
            _baseRepo = baseRepo;
            _mapper = mapper;
        }
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
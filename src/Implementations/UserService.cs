using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.src.Entities;
using Business.src.Dtos;
using Business.src.Abstraction;
using Domain.src.Abstraction;



namespace Business.src.Implementations
{
    public class UserService : BaseService<User, UserDto>, IUserService
    {
        private readonly IUserRepo _userRepo;

        public UserService(IUserRepo baseRepo, IMapper mapper) : base(baseRepo, mapper){
            
        }

        public UserDto UpdatePassword(string id, string newPassword){
            var foundUser = _userRepo.GetOneById(id);
            if (foundUser == null) {
                throw new Exception ("user not found");
            }
            return _mapper.Map<UserDto>(_userRepo.UpdatePassword(foundUser, newPassword));
        }
    } 
}
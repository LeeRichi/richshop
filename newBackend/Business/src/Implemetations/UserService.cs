using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.src.Abstractions;
using Business.src.Abstractions;
using Business.src.Dtos;
using Domain.src.Entities;
using AutoMapper;
using Business.src.Shared;




namespace Business.src.Implemetations
{
    public class UserService : BaseService<User, UserReadDto, UserCreateDto, UserUpdateDto>, IUserService
    {
        private readonly IUserRepo _userRepo;

        public UserService(IUserRepo userRepo, IMapper mapper) : base(userRepo, mapper){
            _userRepo = userRepo;
        }

        public async Task<UserReadDto> UpdatePassword(string id, string newPassword){
            var foundUser = await _userRepo.GetOneById(id);
            if (foundUser == null) {
                throw new Exception ("user not found");
            }
            // PasswordService.HashPassword(newPassword, out var hashedPassword, out var salt);
            // foundUser.Password = hashedPassword;
            // foundUser.Salt = salt;
            return _mapper.Map<UserReadDto>(await _userRepo.UpdatePassword(foundUser, newPassword));
        }

        public override async Task<UserReadDto> CreateOne(UserCreateDto dto){
            var entity = _mapper.Map<User>(dto);
            PasswordService.HashPassword(dto.Password, out var hashedPassword, out var salt);
            entity.Password = hashedPassword;
            entity.Salt = salt;
            var created = await _userRepo.CreateOne(entity);
            return _mapper.Map<UserReadDto>(created); 
        }
    }
}
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.src.Entities;
using Business.src.Dtos;
using Business.src.Abstraction;
using Domain.src.Abstractions;
using Business.src.Shared;

namespace Business.src.Implementations
{
    public class UserService : BaseService<User, UserReadDto, UserCreateDto, UserUpdateDto>, IUserService
    {
        private readonly IUserRepo _userRepo;
        private readonly IProductRepo _productRepo;

        public UserService(IUserRepo userRepo, IProductRepo productRepo, IMapper mapper) : base(userRepo, mapper, productRepo)
        // public UserService(IUserRepo userRepo, IMapper mapper) : base(userRepo, mapper)
        {
            _userRepo = userRepo;
            _productRepo = productRepo;
        }

        public async Task<UserReadDto> UpdatePassword(Guid id, string newPassword) {
            var foundUser = await _userRepo.GetOneById(id);
            if (foundUser == null) {
                throw new Exception("user not found");
            }
            PasswordService.HashPassword(newPassword, out var hashedPassword, out var salt);
            foundUser.Password = hashedPassword;
            foundUser.Salt = salt;
            return _mapper.Map<UserReadDto>(await _userRepo.UpdatePassword(foundUser));
        }

        public override async Task<UserReadDto> CreateOne(UserCreateDto dto) {
            var entity = _mapper.Map<User>(dto);
            PasswordService.HashPassword(dto.Password, out var hashedPassword, out var salt);
            entity.Password = hashedPassword;
            entity.Salt = salt;
            var created = await _userRepo.CreateOne(entity);
            return _mapper.Map<UserReadDto>(created);
        }

        public async Task<UserReadDto> CreateAdmin(UserCreateDto dto) {
            var entity = _mapper.Map<User>(dto);
            PasswordService.HashPassword(dto.Password, out var hashedPassword, out var salt);
            entity.Password = hashedPassword;
            entity.Salt = salt;
            var created = await _userRepo.CreateAdmin(entity);
            return _mapper.Map<UserReadDto>(created);
        }

        public async Task<CheckEmailResult> CheckEmailExists(string email)
        {
            var user = await _userRepo.FindOneByEmail(email);
            if (user != null)
            {
                return new CheckEmailResult { Exists = true, UserId = user.Id };
            }
            return new CheckEmailResult { Exists = false, UserId = null };
        }

        public async Task<ProductReadDto> CreateFavorite(FavoriteCreateDto favoriteDto)
        {
            // Retrieve the user and product entities based on the IDs provided in the DTO
            var user = await _userRepo.GetOneById(favoriteDto.UserId);
            var product = await _productRepo.GetOneById(favoriteDto.ProductId);

            Console.WriteLine("favoriteDto");
            Console.WriteLine($"favo: {favoriteDto.UserId}");
            System.Console.WriteLine(user.Favorites);

            if (user == null || product == null)
            {
                Console.WriteLine("User or product not found");
                return null;
            }

            if (user.Favorites == null)
{
    user.Favorites = new List<Product>(); // Initialize the Favorites property if it's null
}

            user.Favorites.Add(product);

            // Update the user entity in the database
            await _userRepo.UpdateOneById(user);

            // Return the product or any other appropriate response
            return _mapper.Map<ProductReadDto>(product);
        }
    } 
}
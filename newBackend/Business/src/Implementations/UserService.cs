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
        // public UserService(IUserRepo userRepo, IProductRepo productRepo, IMapper mapper) : base(userRepo, mapper)
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

        public async Task<FavoriteReadDto> ManageFavorite(FavoriteCreateDto favoriteDto, bool addFavorite)
        {
            var user = await _userRepo.GetOneById(favoriteDto.UserId);
            System.Console.WriteLine("test2");
            if (user == null)
            {
                Console.WriteLine("User or product not found");
                return null;
            }

            if (user.Favorites == null)
            {
                user.Favorites = new List<Favorite>();
            }

            var existingProduct = user.Favorites.FirstOrDefault(c => c.ProductId == favoriteDto.ProductId);

            if (addFavorite)
            {
                if (existingProduct != null)
                {
                    System.Console.WriteLine("This favorite is already exists");
                }                
                else
                {
                    user.Favorites.Add(new Favorite { ProductId = favoriteDto.ProductId });
                    System.Console.WriteLine("fired on creating" + existingProduct);
                }
            }
            else
            {
                if (existingProduct != null)
                {
                    user.Favorites.Remove(existingProduct);
                    System.Console.WriteLine("fired on deleteing" + existingProduct);
                }
                else
                {
                    System.Console.WriteLine("nothing to remove");
                }                
            }

            await _userRepo.UpdateOneById(user);

            return _mapper.Map<FavoriteReadDto>(favoriteDto);
        }

        public async Task<CartItemReadDto> ManageCart(CartItemCreateDto cartItemDto, bool addToCart)
        {
            var user = await _userRepo.GetOneById(cartItemDto.UserId);

            if (user == null)
            {
                Console.WriteLine("User or product not found");
                return null;
            }

            if (user.Carts == null)
            {
                user.Carts = new List<CartItem>();
            }

            var existingCartItem = user.Carts.FirstOrDefault(c => c.Product.Id == cartItemDto.ProductId);
            System.Console.WriteLine("hi" + existingCartItem.Quantity);
            
            if (addToCart)
            {
                if (existingCartItem != null)
                {
                    existingCartItem.Quantity = existingCartItem.Quantity + 1;
                }                
                else
                {
                    user.Carts.Add(new CartItem { ProductId = cartItemDto.ProductId, Quantity = 1 });
                }
            }
            else
            {
                if (existingCartItem != null)
                {
                    if (existingCartItem.Quantity == 1){
                        user.Carts.Remove(existingCartItem);
                    } else {
                        existingCartItem.Quantity--;
                    }
                }
            }

            await _userRepo.UpdateOneById(user);

            return _mapper.Map<CartItemReadDto>(existingCartItem);
        }

    } 
}
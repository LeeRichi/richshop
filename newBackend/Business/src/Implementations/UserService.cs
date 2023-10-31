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
            var product = await _productRepo.GetOneById(favoriteDto.ProductId);

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
                    var newFavorite = new Favorite { Product = product };
                    user.Favorites.Add(newFavorite);
                    System.Console.WriteLine("fired on creating" + newFavorite);
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

            var favoriteReadDto = new FavoriteReadDto
            {
                ProductId = product.Id,
                UserId = user.Id,
                Product = product,
            };

            return _mapper.Map<FavoriteReadDto>(favoriteReadDto);
        }

        public async Task<CartItemReadDto> ManageCart(CartItemCreateDto cartItemDto, bool addToCart)
        {
            var user = await _userRepo.GetOneById(cartItemDto.UserId);
            var product = await _productRepo.GetOneById(cartItemDto.ProductId);

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
            
            if (addToCart)
            {
                if (existingCartItem != null)
                {
                    existingCartItem.Quantity = existingCartItem.Quantity + 1;
                    System.Console.WriteLine("or here?");
                } 
                else
                {
                    user.Carts.Add(new CartItem { ProductId = cartItemDto.ProductId, Product = product, Quantity = 1 });
                    System.Console.WriteLine("is it here?");
                }
            }
            else
            {
                if (existingCartItem != null)
                {
                    if (existingCartItem.Quantity == 1){
                        user.Carts.Remove(existingCartItem);
                        System.Console.WriteLine(existingCartItem);
                        System.Console.WriteLine("trying to remove");
                    } else {
                        existingCartItem.Quantity--;
                    }
                }
            }

            await _userRepo.UpdateOneById(user);

            var cartItemReadDto = new CartItemReadDto
            {
                UserId = user.Id,
                Product = product,
                Quantity = addToCart ? (existingCartItem != null ? existingCartItem.Quantity : 0) + 1 : (existingCartItem != null && existingCartItem.Quantity > 1 ? existingCartItem.Quantity - 1 : 0)
            };

            return _mapper.Map<CartItemReadDto>(cartItemReadDto);
        }

    } 
}
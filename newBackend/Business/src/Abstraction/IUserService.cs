using Business.src.Dtos;
using Domain.src.Entities;
using Business.src.Abstraction;
using Business.src.Shared;

namespace Business.src.Abstraction
{
    public interface IUserService : IBaseService<User, UserReadDto, UserCreateDto, UserUpdateDto>
    {
        Task<UserReadDto> UpdatePassword(Guid id, string newPassword);
        Task<UserReadDto> CreateAdmin(UserCreateDto dto);
        Task<bool> DeleteOneById(Guid id);
        Task<CheckEmailResult> CheckEmailExists(string email);
        // Task<ProductReadDto> CreateFavorite(FavoriteCreateDto favorite);
        // Task<ProductReadDto> RemoveFavorite(FavoriteCreateDto favorite);
        Task<CartItemReadDto> ManageFavorite(CartItemCreateDto favorite,  bool addFavorite);
        Task<CartItemReadDto> ManageCart(CartItemCreateDto favorite,  bool addCart);
    }
}
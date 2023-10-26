using Domain.src.Entities;

namespace Domain.src.Abstractions
{
    public interface IUserRepo : IBaseRepo<User>
    {
        Task<User> CreateAdmin(User user);
        Task<User> UpdatePassword(User user);
        Task<User?> FindOneByEmail(string email);
        Task<bool> CheckEmailExists(string email);
        Task<Product> CreateFavorite(Product favorite);
        Task<bool> CheckIfFavoriteExists(Guid productId);
    }
} 



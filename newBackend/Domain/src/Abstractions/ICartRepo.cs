using Domain.src.Entities;

namespace Domain.src.Abstractions
{
    public interface ICartRepo: IBaseRepo<Cart>
    {
        Task<IEnumerable<Cart>> GetAllCartsWithCartItems();
    }
}
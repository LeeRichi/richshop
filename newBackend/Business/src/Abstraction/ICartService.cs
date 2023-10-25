using Business.src.Dtos;
using Domain.src.Entities;

namespace Business.src.Abstraction
{
    public interface ICartService : IBaseService<Cart, CartReadDto, CartCreateDto, CartUpdateDto>
    {
        Task<IEnumerable<CartReadDto>> GetAllCartsWithCartItems();
    }
}
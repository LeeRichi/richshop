using Business.src.Dtos;
using Domain.src.Entities;
using Business.src.Abstraction;

namespace Business.src.Abstraction
{
    public interface IUserService : IBaseService<User, UserReadDto, UserCreateDto, UserUpdateDto>
    {
        Task<UserReadDto> UpdatePassword(Guid id, string newPassword);
        Task<UserReadDto> CreateAdmin(UserCreateDto dto);
        Task<bool> DeleteOneById(Guid id);
    }
}
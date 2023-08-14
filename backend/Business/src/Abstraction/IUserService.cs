using Business.src.Dtos;
using Domain.src.Entities;
using Business.src.Abstraction;

namespace Business.src.Abstraction
{
    public interface IUserService : IBaseService<User, UserReadDto, UserCreateDto, UserUpdateDto>
    {
        Task<UserReadDto> UpdatePassword(Guid id, string newPassword);
        // UserDto GetProfile(Guid id); --> only have this method in controller because logic is same as in service
        Task<UserReadDto> CreateAdmin(UserCreateDto dto);
    }
}
using Domain.src.Entities;

namespace Business.src.Dtos
{
    public class UserReadDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string Email { get; set; }
        public string Avatar { get; set; }
        public Role Role { get; set; }
        public ICollection<OrderReadDto> Orders { get; set; }
        public ICollection<FavoriteReadDto> Favorites { get; set; }
        public List<CartItemReadDto> Carts { get; set; }
        public List<ProductReadDto> BrowseHistory { get; set; }
    }

    public class UserCreateDto
    {
        public string Name { get; set; }
        public string Address { get; set; }
        public string Email { get; set; }
        public string Avatar { get; set; }
        public string Password { get; set; }
    }

    public class UserUpdateDto
    {
        public string Name { get; set; }
        public string Address { get; set; }
        public string Avatar { get; set; }
    }

    public class UserCredentialsDto
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
using Domain.src.Entities;

namespace Business.src.Dtos
{
    public class UserReadDto
    {
        public Guid Id { get; set; }
        // public string FirstName { get; set; }
        // public string LastName { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Avatar { get; set; }
        public Role Role { get; set; }
        public ICollection<OrderReadDto> Orders { get; set; } // Include orders here
    }

    public class UserCreateDto
    {
        // public string FirstName { get; set; }
        // public string LastName { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Avatar { get; set; }
        public string Password { get; set; }
    }

    public class UserUpdateDto
    {
        public string Name { get; set; }
        // public string FirstName { get; set; }
        // public string LastName { get; set; }
        public string Avatar { get; set; }
    }

    public class UserCredentialsDto
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
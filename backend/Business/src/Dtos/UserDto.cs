using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.src.Entities;

namespace Business.src.Dtos
{
    public class UserReadDto
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Avatar { get; set; }  
        // public string Password { get; set; } no need in Dto //should be be allow to change the password
        public Role Role { get; set; }
    }

    public class UserCreateDto
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Avatar { get; set; }  
    }
    public class UserUpdateDto
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        // public string Email { get; set; }
        public string Avatar { get; set; }  
    }


}
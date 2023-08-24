using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Text.Json.Serialization;


namespace Domain.src.Entities
{
    public class User : BaseEntityWithId
    {
        public string Name { get; set; }
        // public string LastName { get; set; }
        public string Email { get; set; }
        public string Avatar { get; set; }  
        public string Password { get; set; }
        public byte[] Salt { get; set; }
        public Role Role { get; set; }
        public ICollection<Order> Orders { get; set; } = new List<Order>();
    }

    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum Role
    {
        Admin,
        User
    }
}
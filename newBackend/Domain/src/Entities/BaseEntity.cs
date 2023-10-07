using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain.src.Entities
{
    public class BaseEntity
    {
         public DateTime CreatedAt {get; set;}
         public DateTime UpdatedAt {get; set;}
    }
}
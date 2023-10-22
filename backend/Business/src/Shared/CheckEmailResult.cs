using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Business.src.Shared
{
    public class CheckEmailResult
    {
        public bool Exists { get; set; }
        public Guid? UserId { get; set; }
    }
}
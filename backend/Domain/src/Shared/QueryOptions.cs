using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// namespace Domain.src.Entities
namespace Domain.src.Shared

{
    public class QueryOptions
    {
        public string Search { get; set; } = string.Empty;
        public string Order { get; set; } = "UpdatedAt";
        public bool OrderByDescendign { get; set; } = false;
        public int PageNumber { get; set; } = 1;
        public int PerPage { get; set; } = 10;
    }
}
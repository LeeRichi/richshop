using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.src.Entities;

namespace Business.src.Dtos
{
    public class ProductReadDto
    {
        public string Title { get; set; }
        public string Descreption { get; set; }
        public float Price { get; set; }
        public List<string> Images { get; set; } // List of associated image IDs
    }

    public class ProductCreateDto
    {
        public string Title { get; set; }
        public string Descreption { get; set; }
        public float Price { get; set; }
        public List<string> Images { get; set; } // List of associated image IDs
        public int Inventory { get; set; }
    }

    public class ProductUpdateDto
    {
        public string Title { get; set; }
        public string Descreption { get; set; }
        public float Price { get; set; }
        public List<string> Images { get; set; } // List of associated image IDs
        public int Inventory { get; set; }
    }
}

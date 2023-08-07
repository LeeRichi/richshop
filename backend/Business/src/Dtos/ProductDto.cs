using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.src.Entities;


namespace Business.src.Dtos
{
    public class ProductDto
    {
        public string Title { get; set; }
        public string Descreption { get; set; }
        public float Price { get; set; }
        public List<Image> Images { get; set; }
    }
}
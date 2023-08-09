using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain.src.Entities
{
    public class Product: BaseEntityWithId
    {
        public string Title { get; set; }
        public string Descreption { get; set; }
        public float Price { get; set; }
        public int Inventory { get; set; }
        public List<Image> Images { get; set; }
    }
}
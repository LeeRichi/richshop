using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.src.Entities;
using Business.src.Dtos;

namespace Business.src.Abstration
{
    public interface IProductService : IBaseService<Product, ProductDto>
    {
        
    }
}
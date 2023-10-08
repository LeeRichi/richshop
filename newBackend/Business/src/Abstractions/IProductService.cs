using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Business.src.Dtos;
using Domain.src.Entities;

namespace Business.src.Abstractions
{
    public interface IProductService : IBaseService<Product, ProductReadDto, ProductCreateDto, ProductUpdateDto>
    {
        // Task<ProductReadDto> CreateProduct(ProductCreateDto dto);
    }
}
using Business.src.Dtos;
using Domain.src.Entities;

namespace Business.src.Abstraction
{
    public interface IProductService : IBaseService<Product, ProductReadDto, ProductCreateDto, ProductUpdateDto>
    {
        // Task<ProductReadDto> CreateProduct(ProductCreateDto dto);
    }
}
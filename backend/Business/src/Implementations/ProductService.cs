using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.src.Entities;
using Business.src.Dtos;
using Business.src.Abstraction;
using Domain.src.Abstraction;
using Business.src.Shared;

namespace Business.src.Implementations
{
    public class ProductService : BaseService<Product, ProductReadDto, ProductCreateDto, ProductUpdateDto>, IProductService
    {
        private readonly IProductRepo _productRepo;

        public ProductService(IProductRepo productRepo, IMapper mapper) : base(productRepo, mapper)
        {
            _productRepo = productRepo;
        }

        public override async Task<ProductReadDto> CreateOne(ProductCreateDto dto)
        {
            // Map the DTO to the entity
            var productEntity = _mapper.Map<Product>(dto);

            // Perform any additional processing or validation before creating
            // For example:
            // Check if the product already exists, perform validation, etc.

            // Call the repository to create the product
            var createdProduct = await _productRepo.CreateOne(productEntity);

            // Map the created entity back to DTO and return
            var createdProductDto = _mapper.Map<ProductReadDto>(createdProduct);
            return createdProductDto;
        }
    }
}

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
            var productEntity = _mapper.Map<Product>(dto);

            var createdProduct = await _productRepo.CreateOne(productEntity);

            var createdProductDto = _mapper.Map<ProductReadDto>(createdProduct);
            return createdProductDto;
        }
    }
}

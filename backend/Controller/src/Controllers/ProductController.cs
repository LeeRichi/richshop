using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Business.src.Abstraction;
using Business.src.Dtos;
using Domain.src.Entities;
using Microsoft.AspNetCore.Authorization;
using Domain.src.Shared;
using Microsoft.AspNetCore.Mvc;

namespace Controller.src.Controllers
{
    // [Authorize(Roles = "Admin")] // Apply authorization to the entire controller
    public class ProductController : CrudController<Product, ProductReadDto, ProductCreateDto, ProductUpdateDto>
    {
        private readonly IProductService _productService;

        public ProductController(IProductService baseService) : base(baseService)
        {
            _productService = baseService;
        }

    }    
}

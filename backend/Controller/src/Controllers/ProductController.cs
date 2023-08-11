using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Business.src.Dtos;
using Domain.src.Entities;
using Business.src.Abstraction;


namespace Controller.src.Controllers
{
    public class ProductController: CrudController<Product, ProductReadDto, ProductCreateDto, ProductUpdateDto>
    {
        public ProductController(IProductService baseService): base(baseService){

        }
    }
}
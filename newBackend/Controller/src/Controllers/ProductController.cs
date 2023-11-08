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

        [AllowAnonymous]
        public override async Task<ActionResult<IEnumerable<ProductReadDto>>> GetAll([FromQuery] QueryOptions queryOptions)
        {
            return Ok(await _productService.GetAll(queryOptions));
        }

        [Authorize(Roles = "Admin")]
        public override async Task<ActionResult<ProductReadDto>> CreateOne([FromBody] ProductCreateDto dto){
            var createObj = await _productService.CreateOne(dto);
            return CreatedAtAction(nameof(CreateOne), createObj); //be aware for later
        }

        [AllowAnonymous]
        // [HttpGet("{id:Guid}")]
        public override async Task<ActionResult<ProductReadDto>> GetOneById ([FromRoute]Guid id){
            return Ok(await _productService.GetOneById(id));
        }
    }    
}

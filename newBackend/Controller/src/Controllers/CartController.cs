using AutoMapper;
using Business.src.Abstraction;
using Business.src.Dtos;
using Domain.src.Entities;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace Controller.src.Controllers
{
    public class CartController : CrudController<Cart, CartReadDto, CartCreateDto, CartUpdateDto>
    {
        private readonly ICartService _cartService;
        private readonly IMapper _mapper;

        public CartController(ICartService baseService, IMapper mapper) : base(baseService)
        {
            _cartService = baseService;
            _mapper = mapper;
        }

        [HttpPost]
        public override async Task<ActionResult<CartReadDto>> CreateOne([FromBody] CartCreateDto dto)
        {
            var createObj = await _cartService.CreateOne(dto);
            return CreatedAtAction(nameof(CreateOne), createObj); // Return the created DTO
        }

        [HttpGet("carts")]
        public async Task<IActionResult> GetAllCartsWithCartItems()
        {
            try
            {
                var cartDtos = await _cartService.GetAllCartsWithCartItems();

                if (cartDtos != null && cartDtos.Any())
                {
                    return Ok(cartDtos);
                }
                else
                {
                    return NotFound(); // Handle the case where no carts with cart items were found.
                }
            }
            catch (Exception ex)
            {
                // Handle exceptions and return an appropriate error response.
                return StatusCode(500, "An error occurred.");
            }
        }
    }
}

using Business.src.Abstraction;
using Business.src.Dtos;
using Domain.src.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Controller.src.Controllers
{
    // [Authorize]
    public class UserController: CrudController<User, UserReadDto, UserCreateDto, UserUpdateDto>
    {
        private readonly IUserService _userService;

        public UserController(IUserService baseService) : base(baseService){
            _userService = baseService;
        }

        [HttpPost("admin")]
        public async Task<ActionResult<UserReadDto>> CreateAdmin([FromBody] UserCreateDto dto)
        {
            return CreatedAtAction(nameof(CreateAdmin), await _userService.CreateAdmin(dto));
        }
        
        [AllowAnonymous]
        public override async Task<ActionResult<UserReadDto>> CreateOne([FromBody] UserCreateDto dto){
            var createObj = await _userService.CreateOne(dto);
            return CreatedAtAction(nameof(CreateOne), createObj);
        }

        [AllowAnonymous]
        public override async Task<ActionResult<UserReadDto>> GetOneById ([FromRoute]Guid id){
            return Ok(await _baseService.GetOneById(id));
        }

        [AllowAnonymous]
        [HttpPost("add-favorite")]
        public async Task<ActionResult<FavoriteReadDto>> CreateFavorite([FromBody] FavoriteCreateDto favoriteDto)
        {
            try
            {
                var favorite = await _userService.ManageFavorite(favoriteDto, addFavorite: true);
                System.Console.WriteLine("controller:" + favorite);
                return CreatedAtAction(nameof(CreateFavorite), favorite);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [AllowAnonymous]
        [HttpPost("remove-favorite")]
        public async Task<ActionResult<FavoriteReadDto>> RemoveFavorite([FromBody] FavoriteCreateDto favoriteDto)
        {
            var result = await _userService.ManageFavorite(favoriteDto, addFavorite: false);
            
            if (result == null)
            {
                return BadRequest(new { message = "Failed to remove favorite." });
            }

            return Ok(result);
        }

        [AllowAnonymous]
        [HttpPost("add-to-cart")]
        public async Task<ActionResult<ProductReadDto>> AddToCart([FromBody] CartItemCreateDto cartItem)
        {
            try
            {
                var cartResult = await _userService.ManageCart(cartItem, addCart: true);
                return CreatedAtAction(nameof(AddToCart), cartResult);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [AllowAnonymous]
        [HttpPost("remove-from-cart")]
        public async Task<ActionResult<ProductReadDto>> RemoveFromCart([FromBody] CartItemCreateDto cartItem)
        {
            var result = await _userService.ManageCart(cartItem, addCart: false);

            if (result == null)
            {
                return BadRequest(new { message = "Failed to remove item from cart." });
            }

            return Ok(result);
        }
        
        [HttpGet("checkEmailExists")]
        [AllowAnonymous]
        public IActionResult CheckEmailExists([FromQuery] string email)
        {
            var userWithEmail = _userService.CheckEmailExists(email);

            return Ok(new { exists = userWithEmail });
        }
    }
}
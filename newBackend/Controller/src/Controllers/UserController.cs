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


        [HttpPost("favorite")]
        public async Task<ActionResult<ProductReadDto>> CreateFavorite([FromBody] FavoriteCreateDto favoriteDto)
        {
            // Extract the userId and productId from the dto
            // Guid productId = dto.Id;

            // Call the service to create a favorite
            try
            {
                var favorite = await _userService.CreateFavorite(favoriteDto);
                return CreatedAtAction(nameof(CreateFavorite), favorite);
            }
            catch (Exception ex)
            {
                // Handle the exception, for example, returning a BadRequest result
                return BadRequest(new { message = ex.Message });
            }
        }
    }
}
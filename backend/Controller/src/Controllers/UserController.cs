using Business.src.Abstraction;
using Business.src.Dtos;
using Business.src.Implementations;
using Domain.src.Entities;
using Microsoft.AspNetCore.Authorization;
using Domain.src.Shared;
using Microsoft.AspNetCore.Mvc;

namespace Controller.src.Controllers
{
    [Authorize]
    public class UserController: CrudController<User, UserReadDto, UserCreateDto, UserUpdateDto>
    {
        private readonly IUserService _userService;

        public UserController(IUserService baseService) : base(baseService)
        {
            _userService = baseService;
        }

        // [Authorize(Roles = "Admin")]
        [AllowAnonymous]
        [HttpPost("admin")]
        public async Task<ActionResult<UserReadDto>> CreateAdmin([FromBody] UserCreateDto dto)
        {
            return CreatedAtAction(nameof(CreateAdmin), await _userService.CreateAdmin(dto));
        }

        [Authorize(Roles = "Admin")]
        public override async Task<ActionResult<IEnumerable<UserReadDto>>> GetAll([FromQuery] QueryOptions queryOptions)
        {
            return Ok(await _userService.GetAll(queryOptions));
        }

        [AllowAnonymous]
        public override async Task<ActionResult<UserReadDto>> CreateOne([FromBody] UserCreateDto dto){
            var createObj = await _userService.CreateOne(dto);
            return CreatedAtAction(nameof(CreateOne), createObj); //be aware for later
        }

        [Authorize(Roles = "Admin")]
        public override async Task<ActionResult<UserReadDto>> UpdateOneById([FromRoute] Guid id,[FromBody] UserUpdateDto update){
            var updateObj = await _userService.UpdateOneById(id, update);
            return Ok(updateObj);
        }
        
        [AllowAnonymous]
        public override async Task<ActionResult<UserReadDto>> GetOneById ([FromRoute]Guid id){
            return Ok(await _baseService.GetOneById(id));
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
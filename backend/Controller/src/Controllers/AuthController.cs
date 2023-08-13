using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

using Business.src.Dtos;
using Business.src.Abstraction;


namespace Controller.src.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService){
            _authService = authService;
        }

        [HttpPost]
        public async Task<ActionResult<string>> VerifyCredentials([FromBody] UserCredentialsDto credentials){
            return Ok(await _authService.VerifyCredentials(credentials));
        }
    }
}
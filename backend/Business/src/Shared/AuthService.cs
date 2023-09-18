using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Business.src.Dtos;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims; 
using Business.src.Abstraction;
using Domain.src.Abstraction;
using Domain.src.Entities;
using System.Security.Cryptography;
using System.Text;
using Business.src.Shared;

namespace Business.src.Shared
{
    public class AuthService : IAuthService
    {
        private readonly IUserRepo _userRepo;

        public AuthService(IUserRepo userRepo){
            _userRepo = userRepo;
        }

        public async Task<string> VerifyCredentials(UserCredentialsDto credentials){
            var foundUserByEmail = await _userRepo.FindOneByEmail(credentials.Email) ?? throw new Exception("Email not found");
            var isAuthenticated = PasswordService.VerifyPassword(credentials.Password, foundUserByEmail.Password, foundUserByEmail.Salt);
            if (!isAuthenticated)
            {
                throw ServiceException.UnAuthenticatedException();
            }
            return GenerateToken(foundUserByEmail);
        }

        private string GenerateToken(User user){
            var claims = new List<Claim> {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Role, user.Role.ToString()),
            };
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("my-secrete-key-jsdguyfsdgcjsdbchjsdb jdhscjysdcsdj"));
            var SigningCredentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256Signature);
            var securityTokenDescriptor = new SecurityTokenDescriptor{
                Issuer = "ecommerce-backend",
                Expires = DateTime.Now.AddMinutes(10),
                Subject = new ClaimsIdentity(claims),
                SigningCredentials = SigningCredentials
            };
            var jwtSecurityTokenHandler = new JwtSecurityTokenHandler();
            var token = jwtSecurityTokenHandler.CreateToken(securityTokenDescriptor);
            return jwtSecurityTokenHandler.WriteToken(token);
        }
    }
}
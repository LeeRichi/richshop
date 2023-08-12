using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Business.src.Dtos;

namespace Business.src.Shared
{
    public class AuthService : IAuthService
    {
        private readonly IUserRepo _userReop;

        public AuthService(IUserRepo userRepo){
            _userReop = userRepo;
        }

        public Task<string> VerifyCredentials(UserCredentialsDto credentials){
            var foundUserByEmail = _userReop.FindOneByEmail(credentials.Email);
            var isAuthenticated = PasswordService.VerifyPassword(credentials.Password, foundUserByEmail.Password, foundUserByEmail.Salt);
        }
    }
}
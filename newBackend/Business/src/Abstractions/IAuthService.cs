using Business.src.Dtos;

namespace Business.src.Abstractions
{
    public interface IAuthService
    {
        Task<string> VerifyCredentials(UserCredentialsDto credentials);
    }
}
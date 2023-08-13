using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Security.Cryptography;
using System.Text;

namespace Business.src.Shared
{
    public class PasswordService
    {
        // public static void HashPassword(string originalPassword, out string hashedPassword, out byte[] salt){
        //     var hmac = new HMACSHA256();
        //     var salt = hmac.Key;
        //     var hashedPassword = hmac.ComputeHash(Encoding.UTF8.GetBytes(originalPassword)).ToString();
        // }

        // public static bool VerifyPassword(string originalPassword, string hashedPassword, byte[] salt){
        //     var hmac = new HMACSHA256(salt);
        //     var hashedOriginal = hmac.ComputeHash(Encoding.UTF8.GetBytes(originalPassword)).ToString();
        //     return hashedOriginal == hashedPassword;
        // }
        public static void HashPassword(string originalPassword, out string hashedPassword, out byte[] salt)
        {
            using (var hmac = new HMACSHA256())
            {
                salt = hmac.Key;
                hashedPassword = BitConverter.ToString(hmac.ComputeHash(Encoding.UTF8.GetBytes(originalPassword))).Replace("-", "").ToLower();
            }
        }

        public static bool VerifyPassword(string originalPassword, string hashedPassword, byte[] salt)
        {
            using (var hmac = new HMACSHA256(salt))
            {
                var hashedOriginal = BitConverter.ToString(hmac.ComputeHash(Encoding.UTF8.GetBytes(originalPassword))).Replace("-", "").ToLower();
                return hashedOriginal == hashedPassword;
            }
        }
    }
}
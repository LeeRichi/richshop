using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Business.src.Shared
{
    public class ServiceException : Exception
    {
        public int StatusCode { get; set; }
        public string Message { get; set; }

        public static ServiceException NotFoundException(string message = "The entity is not found")
        {
            return new ServiceException
            {
                StatusCode = 404,
                Message = message
            };
        }

        public static ServiceException UnAuthenticatedException(string message = "Credentials are wrong")
        {
            return new ServiceException
            {
                StatusCode = 401,
                Message = message
            };
        }
    }
}
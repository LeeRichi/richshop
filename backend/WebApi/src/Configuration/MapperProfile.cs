using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;

namespace WebApi.src.Configuration
{
    public class MapperProfile : Profile
    {
        public MapperProfile(){
            CreateMap<User, UserReadDto>();
            CreateMap<UserUpdateDto>();
            CreateMap<Product, ProductReadDto>();

            //order:
            // CreateMap<User, UserReadDto>();
        }
    }
}
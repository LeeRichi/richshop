using AutoMapper;
using Business.src.Dtos;
using Domain.src.Entities;


namespace Webapi.src.Configuration
{
    public class MapperProfile : Profile
    {
        public MapperProfile(){
            CreateMap<User, UserReadDto>();
            CreateMap<UserUpdateDto, User>();
            CreateMap<UserCreateDto, User>();

            CreateMap<Product, ProductReadDto>();
            CreateMap<ProductCreateDto, Product>();
            CreateMap<ProductUpdateDto, Product>();
        }
    }
}
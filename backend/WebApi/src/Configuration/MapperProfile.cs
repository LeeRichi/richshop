using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;

using AutoMapper;
using Business.src.Dtos;
using Domain.src.Entities;

namespace WebApi.src.Configuration
{
    public class MapperProfile : Profile
{
    public MapperProfile()
    {
        CreateMap<User, UserReadDto>();
        CreateMap<UserUpdateDto, User>();
        CreateMap<UserCreateDto, User>();

        CreateMap<Product, ProductReadDto>();
        CreateMap<ProductCreateDto, Product>();
        CreateMap<ProductUpdateDto, Product>();

        CreateMap<Order, OrderReadDto>();
        CreateMap<OrderCreateDto, Order>();
        CreateMap<OrderUpdateDto, Order>();
        
        CreateMap<OrderProduct, OrderProductReadDto>();
        CreateMap<OrderProductReadDto, OrderProduct>();
        CreateMap<OrderProductCreateDto, OrderProduct>();
    }
}

}
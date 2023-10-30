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

            CreateMap<Order, OrderReadDto>();
            CreateMap<OrderCreateDto, Order>();
            CreateMap<OrderUpdateDto, Order>();

            CreateMap<OrderProduct, OrderProductReadDto>();
            CreateMap<OrderProductReadDto, OrderProduct>();
            CreateMap<OrderProductCreateDto, OrderProduct>();
            CreateMap<OrderProductUpdateDto, OrderProduct>();

            CreateMap<CartItem, CartItemReadDto>(); 
            CreateMap<CartItem, CartItemCreateDto>();
            CreateMap<CartItemCreateDto, CartItem>(); 

            CreateMap<Favorite, FavoriteReadDto>();
            CreateMap<Favorite, FavoriteCreateDto>();
            CreateMap<FavoriteCreateDto, Favorite>();

            CreateMap<FavoriteCreateDto, FavoriteReadDto>();

        }
    }
}
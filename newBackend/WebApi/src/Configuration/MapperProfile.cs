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

            // CreateMap<Cart, CartReadDto>();
            // CreateMap<CartReadDto, Cart>();
            // CreateMap<CartCreateDto, Cart>()
            //     .ForMember(dest => dest.CartItems, opt => opt.MapFrom(src => src.CartItems));
            // CreateMap<CartItemDto, CartItem>();

            // CreateMap<CartItem, CartItemReadDto>();
            // CreateMap<CartItemCreateDto, CartItem>();
            // CreateMap<CartItemUpdateDto, CartItem>();
            CreateMap<CartItem, CartItemDto>(); 
        }
    }
}
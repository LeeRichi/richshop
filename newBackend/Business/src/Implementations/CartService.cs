
using Business.src.Abstraction;
using Business.src.Dtos;
using Domain.src.Entities;
using AutoMapper;
using Domain.src.Entities;
using Business.src.Dtos;
using Business.src.Abstraction;
using Domain.src.Abstractions;
using Business.src.Shared;

namespace Business.src.Implementations
{
    public class CartService: BaseService<Cart, CartReadDto, CartCreateDto, CartUpdateDto>, ICartService
    {
        private readonly ICartRepo _cartRepo;
        private readonly IMapper _mapper;
        public CartService(ICartRepo cartRepo, IMapper mapper) : base(cartRepo, mapper)
        {
            _cartRepo = cartRepo;
            _mapper = mapper;
        }
        public async Task<CartReadDto> CreateOne(CartCreateDto cartCreateDto)
        {
            // Use AutoMapper to map the CartCreateDto to a Cart entity
            var cart = _mapper.Map<CartCreateDto, Cart>(cartCreateDto);

            // Perform any additional logic you need for cart creation

            // Save the cart entity to the database
            var createdCart = await _cartRepo.CreateOne(cart);

            // Use AutoMapper to map the created Cart entity to a CartReadDto
            var cartReadDto = _mapper.Map<Cart, CartReadDto>(createdCart);

            return cartReadDto;
        }

        public async Task<IEnumerable<CartReadDto>> GetAllCartsWithCartItems()
        {       
            // Get all carts and include CartItems for each cart
            var carts = await _cartRepo.GetAllCartsWithCartItems();

            // Use AutoMapper to map the Cart entities to CartDto entities
            var cartDtos = _mapper.Map<IEnumerable<Cart>, IEnumerable<CartReadDto>>((IEnumerable<Cart>)carts);

            return cartDtos;
        }
    }
}
using Domain.src.Entities;
using WebApi.src.Database;
using Domain.src.Abstractions;
using Microsoft.EntityFrameworkCore;
using Domain.src.Shared;

namespace WebApi.src.RepoImplementations
{
    public class UserRepo : BaseRepo<User>, IUserRepo
    {
        private readonly DbSet<User> _users;
        private readonly DatabaseContext _context;

        public UserRepo(DatabaseContext dbContext) : base(dbContext)
        {
            _users = dbContext.Users;
            _context = dbContext;
        }

        public async Task<User> CreateAdmin(User user)
        {
            user.Role = Role.Admin;
            await _users.AddAsync(user);
            await _context.SaveChangesAsync();
            return user;
        }

        public async Task<User?> FindOneByEmail(string email)
        {
            return await _users.AsNoTracking().FirstOrDefaultAsync(u => u.Email == email);
        }

        public async Task<User> UpdatePassword(User user)
        {
            _users.Update(user);
            await _context.SaveChangesAsync();
            return user;
        }

        public override Task<User> CreateOne(User entity)
        {
            entity.Role = Role.User;
            return base.CreateOne(entity);
        }

        public async Task<bool> CheckEmailExists(string email)
        {
            var user = await _users.FirstOrDefaultAsync(u => u.Email == email);
            return user != null;
        }

        public async override Task<IEnumerable<User>> GetAll(QueryOptions queryOptions)
        {
            return await _users
                .Include(c => c.Orders)
                    .ThenInclude(o => o.OrderProducts)
                // .Include(c => c.Favorites)
                .Include(c => c.Carts)
                    .ThenInclude(o => o.Product)
                .ToListAsync();                            
        }

        public async Task<User> GetOneById(Guid id)
        {
            return await _users
                .AsNoTracking()
                .Include(c => c.Orders)
                    .ThenInclude(o => o.OrderProducts)
                .Include(c => c.Favorites) 
                    .AsNoTracking()
                .Include(c => c.Carts)
                    .ThenInclude(o => o.Product)
                    .AsNoTracking()
                .FirstOrDefaultAsync(u => u.Id == id);
        }

        public async Task<Product> CreateFavorite(Product favorite)
        {
            await _context.Favorites.AddAsync(favorite);
            await _context.SaveChangesAsync();
            return favorite;
        }

        // public async Task<bool> CheckIfFavoriteExists(Guid productId)
        // {
        //     return await _context.Favorites
        //         // .AnyAsync(f => f.UserId == userId && f.ProductId == productId);
        //         .AnyAsync(f => f.Id == productId);                
        // }

        // public async Task<CartItem> CreateCartItem(CartItem cartItem)
        // {
        //     await _context.Carts.AddAsync(cartItem);
        //     await _context.SaveChangesAsync();
        //     return cartItem;
        // }

        // public async Task<bool> CheckIfCartItemExists(Guid productId)
        // {
        //     return await _context.Carts
        //         // .AnyAsync(f => f.UserId == userId && f.ProductId == productId);
        //         .AnyAsync(f => f.Product.Id == productId);                
        // }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.src.Entities;
using WebApi.src.RepoImplementations;
using WebApi.src.Database;
using Domain.src.Abstractions;
using Microsoft.EntityFrameworkCore;

namespace WebApi.src.RepoImplementations
{    
    public class CartRepo: BaseRepo<Cart>, ICartRepo
    {
        private readonly DbSet<Cart> _carts;
        private readonly DatabaseContext _context;

        public CartRepo(DatabaseContext dbContext) : base(dbContext)
        {
            _carts = dbContext.Carts;
            _context = dbContext;
        }

        public async Task<IEnumerable<Cart>> GetAllCartsWithCartItems()
        {
            return await _carts
                .Include(c => c.CartItems)
                .ToListAsync();
        }
    }
}
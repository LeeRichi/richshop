using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.src.Entities;
using WebApi.src.RepoImplementations;
using WebApi.src.Database;
using Domain.src.Abstractions;
using Microsoft.EntityFrameworkCore;
using Domain.src.Shared;


namespace WebApi.src.RepoImplementations
{
    public class OrderRepo: BaseRepo<Order>, IOrderRepo
    {
        private readonly DbSet<Order> _orders;
        private readonly DatabaseContext _context;

        public OrderRepo(DatabaseContext dbContext) : base(dbContext)
        {
            _orders = dbContext.Orders;
            _context = dbContext;
        }

        public async override Task<IEnumerable<Order>> GetAll(QueryOptions queryOptions)
        {
            return await _orders
                .Include(c => c.OrderProducts)
                    .ThenInclude(p => p.Product)
                .ToListAsync();
        }
    }
}
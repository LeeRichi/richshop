using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.src.Entities;
using WebApi.src.RepoImplementations;
using WebApi.src.Database;
using Domain.src.Abstraction;
using Microsoft.EntityFrameworkCore;


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

        public async override Task<Order> CreateOne(Order entity)
        {
            // entity.OrderStatus = OrderStatus.Pending;
            // return base.CreateOne(entity);
            // entity.CreatedAt = DateTime.Now;
            // entity.UpdatedAt = DateTime.Now;
            await _orders.AddAsync(entity);
            await _context.SaveChangesAsync();
            // return entity;
            return await base.CreateOne(entity); // Corrected line

        }

    }
}
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
    public class ProductRepo: BaseRepo<Product>, IProductRepo
    {
        private readonly DbSet<Product> _products;
        private readonly DatabaseContext _context;

        public ProductRepo(DatabaseContext dbContext) : base(dbContext)
        {
            _products = dbContext.Products;
            _context = dbContext;
        }

        public override Task<Product> CreateOne(Product entity)
        {
            return base.CreateOne(entity);
        }

        public bool IsEntityTracked(Product product)
        {
            var entry = _context.ChangeTracker.Entries<Product>().FirstOrDefault(e => e.Entity == product);
            return entry != null && entry.State != EntityState.Detached;
        }

        // public void DetachEntity(Favorite product)
        // {
        //     var entityEntry = _context.Entry(product);
        //     if (entityEntry.State != EntityState.Detached)
        //     {
        //         entityEntry.State = EntityState.Detached;
        //     }
        // }
        public async Task<Product> FindAsync(Guid id)
        {
            return await _products.FirstOrDefaultAsync(p => p.Id == id);
        }

    }
}
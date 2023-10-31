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
    public class ProductRepo: BaseRepo<Product>, IProductRepo
    {
        private readonly DbSet<Product> _products;
        private readonly DatabaseContext _context;

        public ProductRepo(DatabaseContext dbContext) : base(dbContext)
        {
            _products = dbContext.Products;
            _context = dbContext;
        }
    }
}
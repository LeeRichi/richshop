using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameWorkCore;
using Domain.src.Entities;

namespace WebApi.src.Database
{
    public class DatabaseContext : DbContext
    {
        private readonly IConfiguration _config;

        private DatabaseContext(IConfiguration config): base(options){
            _config = config;
        };

        public DbSet<User> Users { get; set;}
        public DbSet<Product> Products { get; set;}
        public DbSet<Order> Orders { get; set;}
        public DbSet<OrderProduct> OrderProducts { get; set;}
        public DbSet<Image> Images {get; set;}

        

        protected override void OnConfiguring(DbContextOptionBuilder optionsBuilder){
            var builder = new NpgsqlDataSourceBuilder(_config.GetConnectionString("Default"));
            optionsBuilderUseNpqsel(builder.Build()).UseSankeCaseNamingConvention();
            // base.OnConfiguring(optionsBuilder);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder){
            base.OnModelCreating(modelBuilder);
        }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Domain.src.Entities;
using Npgsql;

using WebApi.src.Database;

namespace WebApi.src.Database
{
    public class DatabaseContext : DbContext
    {
        private readonly IConfiguration _config;
        public DbSet<User> Users { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderProduct> OrderProducts { get; set; }
        // public DbSet<Image> Images { get; set; }

        public DatabaseContext(DbContextOptions options, IConfiguration config) : base(options)
        {
            _config = config;
        }

        static DatabaseContext()
        {
            AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);
            AppContext.SetSwitch("Npgsql.DisableDateTimeInfinityConversions", true);
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var builder = new NpgsqlDataSourceBuilder(_config.GetConnectionString("Default"));
            builder.MapEnum<Role>();
            optionsBuilder.AddInterceptors(new TimeStampInterceptor());
            optionsBuilder.UseNpgsql(builder.Build()).UseSnakeCaseNamingConvention();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasPostgresEnum<Role>();
            modelBuilder.Entity<OrderProduct>().HasKey("OrderId", "ProductId");
            modelBuilder.Entity<User>().HasIndex(u => u.Email).IsUnique();
            // modelBuilder.Entity<Order>()
            // .HasOne(o => o.User) // Order entity has a User navigation property
            // .WithMany(u => u.Orders) // User entity has an Orders navigation property
            // .HasForeignKey(o => o.UserId) // Foreign key in Order entity
            // .OnDelete(DeleteBehavior.Cascade); // Define the behavior when a user is deleted

            base.OnModelCreating(modelBuilder);
        }
    }
}
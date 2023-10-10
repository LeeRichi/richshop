using Microsoft.EntityFrameworkCore;
using Domain.src.Entities;
using Npgsql;
using Microsoft.EntityFrameworkCore.Diagnostics;




namespace Webapi.src.Database
{
    public class DatabaseContext: DbContext
    {
        private readonly IConfiguration _config;
        public DbSet<User> Users { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderProduct> OrderProducts { get; set; }

        public DatabaseContext(DbContextOptions options, IConfiguration config) : base(options)
        {
            _config = config;
        }
        
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var builder = new NpgsqlDataSourceBuilder(_config.GetConnectionString("Default"));
            // builder.MapEnum<Role>();

            // var loggerFactory = LoggerFactory.Create(builder => builder.AddConsole());
            // optionsBuilder.UseLoggerFactory(loggerFactory);
            // optionsBuilder.AddInterceptors(new TimeStampInterceptor());
            optionsBuilder.UseNpgsql(builder.Build()).UseSnakeCaseNamingConvention();

            optionsBuilder.ConfigureWarnings(warnings => {
                warnings.Log(CoreEventId.ManyServiceProvidersCreatedWarning);
            });
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder){
            modelBuilder.Entity<OrderProduct>()
                // .HasNoKey();
                .HasKey("OrderId", "ProductId");
        }



    }
}
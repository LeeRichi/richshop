using Microsoft.EntityFrameworkCore;
using Domain.src.Entities;
using Npgsql;
using Microsoft.EntityFrameworkCore.Diagnostics;

namespace WebApi.src.Database
{
    public class DatabaseContext : DbContext
    {
        private readonly IConfiguration _config;
        public DbSet<User> Users { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderProduct> OrderProducts { get; set; }
        public DbSet<CartItem> Carts { get; set; }
        public DbSet<Product> Favorites{ get; set; }

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

            var loggerFactory = LoggerFactory.Create(builder => builder.AddConsole());
            optionsBuilder.UseLoggerFactory(loggerFactory);

            optionsBuilder.AddInterceptors(new TimeStampInterceptor());
            optionsBuilder.UseNpgsql(builder.Build()).UseSnakeCaseNamingConvention();

            optionsBuilder.ConfigureWarnings(warnings => {
                warnings.Log(CoreEventId.ManyServiceProvidersCreatedWarning);
            });

            optionsBuilder.EnableSensitiveDataLogging();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasPostgresEnum<Role>();

            modelBuilder.Entity<Order>()
                .HasMany(o => o.OrderProducts)
                .WithOne(op => op.Order)
                .HasForeignKey(op => op.OrderId);

            modelBuilder.Entity<OrderProduct>()
                .HasKey(op => new { op.OrderId, op.ProductId });
            modelBuilder.Entity<OrderProduct>()
                .HasOne(op => op.Product)
                .WithMany()
                .HasForeignKey(op => op.ProductId);

            modelBuilder.Entity<User>()
                .HasMany(u => u.Orders)
                .WithOne(o => o.User)
                .HasForeignKey(o => o.UserId);

            modelBuilder.Entity<CartItem>()
                .HasKey(op => new { op.UserId, op.ProductId });
            modelBuilder.Entity<CartItem>()
                .HasOne(c => c.User)
                .WithMany(u => u.Carts)
                .HasForeignKey(c => c.UserId);
                
            modelBuilder.Entity<CartItem>()
                .HasOne(c => c.Product)
                .WithMany()
                .HasForeignKey(c => c.ProductId);

            modelBuilder.Entity<User>().HasIndex(u => u.Email).IsUnique();

            modelBuilder.Entity<Product>()
                .Property(p => p.Category)
                .HasConversion<string>(); 

            base.OnModelCreating(modelBuilder);
        }        
    }
}


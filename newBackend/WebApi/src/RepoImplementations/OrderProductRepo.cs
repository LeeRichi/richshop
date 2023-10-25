// using Domain.src.Entities;
// using WebApi.src.RepoImplementations;
// using WebApi.src.Database;
// using Domain.src.Abstractions;
// using Microsoft.EntityFrameworkCore;

// namespace WebApi.src.RepoImplementations
// {
//     public class OrderProductRepo: BaseRepo<OrderProduct>, IOrderProductRepo
//     {
//         private readonly DbSet<OrderProduct> _orderProducts;
//         private readonly DatabaseContext _context;

//         public OrderProductRepo(DatabaseContext dbContext) : base(dbContext)
//         {
//             _orderProducts = dbContext.OrderProducts;
//             _context = dbContext;
//         }

//         public override Task<OrderProduct> CreateOne(OrderProduct entity)
//         {
//             return base.CreateOne(entity);
//         }
//     }
// }
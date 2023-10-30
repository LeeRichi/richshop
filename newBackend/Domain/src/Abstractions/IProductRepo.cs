using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.src.Entities;


namespace Domain.src.Abstractions
{
    public interface IProductRepo : IBaseRepo<Product>
    {
        bool IsEntityTracked(Product product);
        // void DetachEntity(Product product);
        Task<Product> FindAsync(Guid id);
        // void DetachEntity(Favorite existingProduct);
    }
}
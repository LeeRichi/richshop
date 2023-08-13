using Microsoft.EntityFrameworkCore;
using Domain.src.Abstraction;
using Domain.src.Entities;
using Domain.src.Shared;
using WebApi.src.Database;

namespace WebApi.src.RepoImplementations
{
    public class BaseRepo<T> : IBaseRepo<T> where T : class
    {
        private readonly DbSet<T> _dbSet;
        private readonly DatabaseContext _context;
        
        public BaseRepo(DatabaseContext dbContext)
        {
            _dbSet = dbContext.Set<T>();
            _context = dbContext;
        }
        public virtual async Task<T> CreateOne(T entity)
        {
            await _dbSet.AddAsync(entity);
            await _context.SaveChangesAsync();
            return entity;
        }

        public async Task<bool> DeleteOneById(T entity)
        {
            _dbSet.Remove(entity);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<IEnumerable<T>> GetAll(QueryOptions queryOptions)
        {
            /* not the right logic yet */
/*             if(typeof(T) == typeof(User))
            {
                
            }
            else if (typeof(T) == typeof(Product))
            {

            }
            else if (typeof(T) == typeof(Order))
            {

            } */
            return await _dbSet.ToArrayAsync();
        }

        public async Task<T?> GetOneById(Guid id)
        {
            return await _dbSet.FindAsync(id);
        }

        public async Task<T> UpdateOneById(T updatedEntity)
        {
            _dbSet.Update(updatedEntity);
            await _context.SaveChangesAsync();
            return updatedEntity;
        }
    }
}
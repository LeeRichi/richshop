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
            var query = _dbSet.AsQueryable();

            if (!string.IsNullOrEmpty(queryOptions.Search))
            {
                if (typeof(T) == typeof(Product))
                {
                    query = query.Where(e => ((Product)(object)e).Title.Contains(queryOptions.Search));
                }
                else if (typeof(T) == typeof(User))
                {
                    query = query.Where(e =>
                        ((User)(object)e).FirstName.Contains(queryOptions.Search) ||
                        ((User)(object)e).LastName.Contains(queryOptions.Search)
                    );
                }
                else if (typeof(T) == typeof(Order))
                {
                    query = query.Where(e => ((Order)(object)e).OrderStatus.ToString().Contains(queryOptions.Search));
                }
            }

            if (queryOptions.OrderByDescendign)
            {
                // Modify sorting logic based on the entity
                if (typeof(T) == typeof(Product))
                {
                    query = query.OrderByDescending(e => EF.Property<DateTime>((Product)(object)e, queryOptions.Order));
                }
                else if (typeof(T) == typeof(User))
                {
                    query = query.OrderByDescending(e => EF.Property<DateTime>((User)(object)e, queryOptions.Order));
                }
                else if (typeof(T) == typeof(Order))
                {
                    query = query.OrderByDescending(e => EF.Property<DateTime>((Order)(object)e, queryOptions.Order));
                }
                // Add similar conditions for other entity types
            }
            else
            {
                // Modify sorting logic based on the entity
                if (typeof(T) == typeof(Product))
                {
                    query = query.OrderBy(e => EF.Property<DateTime>((Product)(object)e, queryOptions.Order));
                }
                else if (typeof(T) == typeof(User))
                {
                    query = query.OrderBy(e => EF.Property<DateTime>((User)(object)e, queryOptions.Order));
                }
                else if (typeof(T) == typeof(Order))
                {
                    query = query.OrderBy(e => EF.Property<DateTime>((Order)(object)e, queryOptions.Order));
                }
                // Add similar conditions for other entity types
            }

            query = query.Skip((queryOptions.PageNumber - 1) * queryOptions.PerPage)
                        .Take(queryOptions.PerPage);

            return await query.ToListAsync();
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
using Domain.src.Entities;
using WebApi.src.Database;
using Domain.src.Abstractions;
using Microsoft.EntityFrameworkCore;

namespace WebApi.src.RepoImplementations
{
    public class UserRepo : BaseRepo<User>, IUserRepo
    {
        private readonly DbSet<User> _users;
        private readonly DatabaseContext _context;

        public UserRepo(DatabaseContext dbContext) : base(dbContext)
        {
            _users = dbContext.Users;
            _context = dbContext;
        }

        public async Task<User> CreateAdmin(User user)
        {
            user.Role = Role.Admin;
            await _users.AddAsync(user);
            await _context.SaveChangesAsync();
            return user;
        }

        public async Task<User?> FindOneByEmail(string email)
        {
            /* Where, FirstOrDefault, Find */
            // _users.FindAsync(email);
            return await _users.AsNoTracking().FirstOrDefaultAsync(u => u.Email == email);
        }

        public async Task<User> UpdatePassword(User user)
        {
            _users.Update(user);
            await _context.SaveChangesAsync();
            return user;
        }

        public override Task<User> CreateOne(User entity)
        {
            entity.Role = Role.User;
            return base.CreateOne(entity);
        }

        public async Task<bool> CheckEmailExists(string email)
        {
            var user = await _users.FirstOrDefaultAsync(u => u.Email == email);
            return user != null;
        }
    }
}
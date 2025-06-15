using InteractiveMapOfEnterprises.Server.Models;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json.Nodes;
using System.Text.Json;
using InteractiveMapOfEnterprises.Server.Persistence;
using Microsoft.EntityFrameworkCore;
using InteractiveMapOfEnterprises.Server.Helpers;
using InteractiveMapOfEnterprises.Server.Services.Interfaces;
using AutoMapper;

namespace InteractiveMapOfEnterprises.Server.Services.Implementation;

public class UserService : IUserService
{
    private readonly ApplicationDbContext _context;
    private readonly IMapper _mapper;
    private readonly IAuthService _authService;

    public UserService(ApplicationDbContext context, IMapper mapper , IAuthService authService)
    {
        _context = context;
        _mapper = mapper;
        _authService = authService;
    }
   

    public async Task<List<ApplicationUser>> GetAsync()
    {
        return await _context.ApplicationUsers.ToListAsync();
    }

    public async Task<ApplicationUser?> GetAsync(Guid id)
    {
        return await _context.ApplicationUsers.FirstOrDefaultAsync(x=>x.Id == id);
    }

    public async Task<ApplicationUser?> GetAsync(string username)
    {
        return await _context.ApplicationUsers.FirstOrDefaultAsync(x => x.UserName == username);
    }

    public async Task<List<ApplicationUser>> GetAdmins()
    {
        var admins = await _context.ApplicationUsers.Where(x => x.Roles == "Administrator").ToListAsync();
        return admins ?? new List<ApplicationUser>();
    }


    public async Task<ApplicationUser> CreateAsync(CreateUserViewModel? editUser)
    {

        //editUser = editUser ?? new CreateUserViewModel()
        //{
        //    UserName = "Beriklava",
        //    Roles = "Administrator",
        //    Password = "Beriklava"
        //};
        //var alreadyExistsAdmin = _context.ApplicationUsers.ToList().FirstOrDefault(x => x.UserName == user.UserName);

        var user = _mapper.Map<ApplicationUser>(editUser);
        user.IsDeleted = false;
        user.DateCreated = DateTime.Now;

        if (string.IsNullOrEmpty(editUser.Roles)) user.Roles = "User";

        var alreadyExistsUser = _context.ApplicationUsers.ToList().FirstOrDefault(x => x.UserName == user.UserName);
        if (alreadyExistsUser != null) throw new Exception("Пользователь с таким логином уже существует.");//{ _context.ApplicationUsers.Update(user); await _context.SaveChangesAsync(); return alreadyExistsUser; }

        var result = await _context.ApplicationUsers.AddAsync(user);
        await _context.SaveChangesAsync();

        return result.Entity;
    }

    public async Task<ApplicationUser> EditUserAsync(EditUserViewModel editUser)
    {
        var oldDbUser = await GetAsync(editUser.Id);
        if (oldDbUser == null) throw new Exception("Пользователь с таким ID не найден.");

        if (!string.IsNullOrEmpty(editUser.PasswordChanged)) throw new NotImplementedException();
        _authService.CheckPassword(oldDbUser.Password, editUser.Password);

        var userToEdit = _mapper.Map<ApplicationUser>(editUser);
        if (string.IsNullOrEmpty(editUser.Roles)) userToEdit.Roles = oldDbUser.Roles;
        var res = _context.ApplicationUsers.Update(userToEdit);
        await _context.SaveChangesAsync();
        return res.Entity;
    }

    public async Task<ApplicationUser> EditUserRoleAsync(Guid userId, string role)
    {
        var dbUser = await GetAsync(userId);
        if (dbUser == null) throw new Exception("Пользователь с таким ID не найден.");
        dbUser.Roles = role;

        var res = _context.ApplicationUsers.Update(dbUser);
        await _context.SaveChangesAsync();
        return res.Entity;
    }

    public async Task<ApplicationUser> Delete(Guid userId, Guid adminId, bool isSoft = true)
    {
        var dbUser = await GetAsync(userId);
        if(dbUser == null) throw new Exception("Пользователь с таким ID не найден.");
        if (!isSoft)
        {
            var companies = _context.Companies.Where(x => x.CreatorId == userId);
            foreach(var c in companies)
            {
                c.CreatorId = adminId;
                _context.Companies.Update(c);
                await _context.SaveChangesAsync();
            }
            //_context.Companies.RemoveRange(companies);
            var companies2 = _context.Companies.Where(x => x.CreatorId == userId);
            await _context.SaveChangesAsync();

            _context.ApplicationUsers.Remove(dbUser);
            await _context.SaveChangesAsync();
            return dbUser;
        }
        
        dbUser.IsDeleted = true;
        var editUser = _mapper.Map<EditUserViewModel>(dbUser);
        return await EditUserAsync(editUser);
    }
    public async Task Restore(Guid userId)
    {
        var dbUser = await GetAsync(userId);
        if (dbUser == null) throw new Exception("Пользователь с таким ID не найден.");
        dbUser.IsDeleted = false;
        var editUser = _mapper.Map<EditUserViewModel>(dbUser);
        await EditUserAsync(editUser);
    }

   
}

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
    public async Task<ApplicationUser> CreateAsync(CreateUserViewModel? editUser)
    {

        editUser = editUser ?? new CreateUserViewModel()
        {
            UserName = "Beriklava",
            Roles = "Administrator",
            Password = "Beriklava"
        };
        var user = _mapper.Map<ApplicationUser>(editUser);
        user.IsDeleted = false;
        user.SecurityStamp = "secure-stamp";

        if (string.IsNullOrEmpty(editUser.Roles)) user.Roles = "User";

        var alreadyExistsUser = _context.ApplicationUsers.ToList().FirstOrDefault(x => x.UserName == user.UserName) ;
        if (alreadyExistsUser != null) { _context.ApplicationUsers.Update(user); await _context.SaveChangesAsync(); return alreadyExistsUser; }
       
        var result = await _context.ApplicationUsers.AddAsync(user);
        await _context.SaveChangesAsync();

        return result.Entity;
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

    public async Task EditUserAsync(EditUserViewModel editUser)
    {
        var oldDbUser = await GetAsync(editUser.Id);
        if(oldDbUser == null) throw new Exception("User by id not found");
        var dbUser = await _authService.Authorizing(new LoginUserViewModel() { UserName = oldDbUser.UserName, Password = editUser.Password });
        if (dbUser.Id != editUser.Id) throw new Exception("Client-side error, not passed id");
        var userToEdit = _mapper.Map<ApplicationUser>(editUser);
        userToEdit.Roles = oldDbUser.Roles;
        _context.ApplicationUsers.Update(userToEdit);
        await _context.SaveChangesAsync();
    }

    public async Task EditUserAsync(Guid userId, string role)
    {
        var dbUser = await GetAsync(userId);
        if (dbUser == null) throw new Exception("User by id not found");
        dbUser.Roles = role;
        var editUser = _mapper.Map<EditUserViewModel>(dbUser);
        await EditUserAsync(editUser);
    }

    public async Task Delete(Guid userId, bool isSoft = true)
    {
        var dbUser = await GetAsync(userId);
        if(dbUser == null) throw new Exception("User by id not found");
        if (!isSoft)
        {
            _context.ApplicationUsers.Remove(dbUser);
            await _context.SaveChangesAsync();
            return;
        }
        
        dbUser.IsDeleted = true;
        var editUser = _mapper.Map<EditUserViewModel>(dbUser);
        await EditUserAsync(editUser);
    }
    public async Task Restore(Guid userId)
    {
        var dbUser = await GetAsync(userId);
        if (dbUser == null) throw new Exception("User by id not found");
        dbUser.IsDeleted = false;
        var editUser = _mapper.Map<EditUserViewModel>(dbUser);
        await EditUserAsync(editUser);
    }

    #region Helpers

    private async Task<string> SaveFile(IFormFile file)
    {
        var fileName = Guid.NewGuid() + Path.GetExtension(file.FileName);
        var filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/media", fileName);

        using (var stream = new FileStream(filePath, FileMode.Create))
        {
            await file.CopyToAsync(stream);
        }

        return fileName;
    }

    private void CorrelatePaths(JsonNode json, List<string> nameFiles, List<string> pathsInJson)
    {
        for (int i = 0; i < nameFiles.Count; i++)
        {
            var pathInJson = pathsInJson[i].Split('.');

            JsonNode node = json[int.Parse(pathInJson[0])];
            for (int j = 1; j < pathInJson.Length - 1; j++)
            {
                node = node[pathInJson[j]];
            }
            node[pathInJson[pathInJson.Length - 1]] = $"/api/media/{nameFiles[i]}";
        }
    }

    #endregion
}

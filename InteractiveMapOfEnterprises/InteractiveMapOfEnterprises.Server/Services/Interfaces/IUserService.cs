using InteractiveMapOfEnterprises.Server.Models;
using Microsoft.AspNetCore.Mvc;

namespace InteractiveMapOfEnterprises.Server.Services.Interfaces;
public interface IUserService
{
    public Task<List<ApplicationUser>> GetAsync();
    public Task<ApplicationUser?> GetAsync(string username);
    public Task<ApplicationUser?> GetAsync(Guid id);
    public Task<ApplicationUser> CreateAsync(CreateUserViewModel? editUser);
    public Task<ApplicationUser> EditUserRoleAsync(Guid userId, string role);
    public Task<ApplicationUser> EditUserAsync(EditUserViewModel editUser);
    public Task<ApplicationUser> Delete(Guid userId, bool isSoft = true);


}

using InteractiveMapOfEnterprises.Server.Models;
using Microsoft.AspNetCore.Mvc;

namespace InteractiveMapOfEnterprises.Server.Services
{
    public interface IApplicationUserService
    {
        public Task<ApplicationUser> CreateAsync();

        public Task<List<ApplicationUser>> GetAsync();
    }
}

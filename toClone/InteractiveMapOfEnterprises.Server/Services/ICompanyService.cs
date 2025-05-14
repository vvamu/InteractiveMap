using InteractiveMapOfEnterprises.Server.Models;
using Microsoft.AspNetCore.Mvc;

namespace InteractiveMapOfEnterprises.Server.Services
{
    public interface ICompanyService
    {
        public Task<Company> CreateAsync(IFormFileCollection files, string jsonData, Guid creatorId);
        public Task<Company?> EditAsync(IFormFileCollection files, string jsonData, Guid creatorId);
        public Task<List<Company>> GetAsync();
        public Task<Company?> GetAsync(Guid id);
        public Task<Company?> DeleteAsync(Guid id);

    }
}

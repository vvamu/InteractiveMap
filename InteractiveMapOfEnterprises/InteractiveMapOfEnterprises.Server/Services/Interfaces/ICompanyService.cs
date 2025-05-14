using InteractiveMapOfEnterprises.Server.Models;
using Microsoft.AspNetCore.Mvc;

namespace InteractiveMapOfEnterprises.Server.Services.Interfaces
{
    public interface ICompanyService
    {
        public Task<Company> CreateAsync(string jsonData, Guid creatorId, IFormFile? iconFormFile, IFormFileCollection? imageFormFiles);
        public Task<Company?> EditAsync(string jsonData, Guid creatorId, IFormFile? iconFormFile, IFormFileCollection? imageFormFiles);
        public Task<List<Company>> GetAsync();
        public Task<Company?> GetAsync(Guid id);
        public Task<List<Company>?> GetByRegionAsync(string regionId);
        public Task<List<Company>?> GetByUserAsync(Guid userId);
        public Task<Company?> DeleteAsync(Guid id);

    }
}

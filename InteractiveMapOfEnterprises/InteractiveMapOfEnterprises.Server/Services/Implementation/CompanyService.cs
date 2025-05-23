using InteractiveMapOfEnterprises.Server.Helpers;
using InteractiveMapOfEnterprises.Server.Models;
using InteractiveMapOfEnterprises.Server.Persistence;
using InteractiveMapOfEnterprises.Server.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;
using System.Text.Json.Nodes;

namespace InteractiveMapOfEnterprises.Server.Services.Implementation
{
    public class CompanyService : ICompanyService
    {
        private readonly ApplicationDbContext _context;
        public CompanyService(ApplicationDbContext context)
        {
            _context = context;
        }

        [Authorize(Roles = "Administrator")]

        public async Task<Company> CreateAsync(string jsonData, Guid creatorId, IFormFile? iconFormFile, IFormFileCollection? imageFormFiles)
        {
            var company =(Company) Mapper.Map(jsonData,new Company());
            company.CreatorId = creatorId;
            await SetImageToCourse(company, imageFormFiles?.FirstOrDefault());
            await SetIconToCourse(company, iconFormFile);

            if(company.Id != null && company.Id !=  Guid.Empty)
            {
                var dbItem = await GetAsync(company.Id);

                if(iconFormFile ==null) company.IconBytes = dbItem.IconBytes;
                if(imageFormFiles.Count ==0)  company.ImageBytes = dbItem.ImageBytes;
                
                var result = _context.Companies.Update(company);
            }
            else
            {

                if (_context.Companies.FirstOrDefault(x => x.Name == company.Name) != null) throw new Exception("Компания с заданным именем уже существует");
                var resCompany = await _context.Companies.AddAsync(company);
                company = resCompany.Entity;
            }
            var res = await _context.SaveChangesAsync();

            return company;

        }

        public async Task<Company?> EditAsync(string jsonData, Guid creatorId, IFormFile? iconFormFile, IFormFileCollection? imageFormFiles)
        {
            var company = (Company)Mapper.Map(jsonData, new Company());
            company.CreatorId = creatorId;
            await SetImageToCourse(company, imageFormFiles?.FirstOrDefault());
            await SetIconToCourse(company, iconFormFile);

            var result = _context.Companies.Update(company);
            var res = await _context.SaveChangesAsync();
            return result.Entity;
        }
        public async Task<List<Company>> GetAsync()
        {
            return await _context.Companies.ToListAsync();
        }
        public async Task<Company?> GetAsync(Guid id)
        {
            var item = await _context.Companies.Include(x => x.Creator).FirstOrDefaultAsync(x => x.Id == id);
            item.CreatorName = item.Creator.UserName;
            item.Creator = null;
            return item;
        }
        public async Task<List<Company>?> GetByUserAsync(Guid userId)
        {
            var items = await _context.Companies.Where(x => x.CreatorId == userId).ToListAsync();
            return items;
        }

        public async Task<List<Company>?> GetByRegionAsync(string regionId)
        {
            var items = await _context.Companies.Where(x => x.RegionId == regionId).ToListAsync();
            return items;
        }
        public async Task<Company?> DeleteAsync(Guid id)
        {
            var item = await _context.Companies.FirstOrDefaultAsync(x => x.Id == id);
            if (item == null) return null;
            _context.Companies.Remove(item);
            await _context.SaveChangesAsync();
            return item;
        }

        #region Helpers
        private async Task<Company> SetImageToCourse(Company company, IFormFile? file)
        {
            if (file == null) return company;
            var bytes = await FileHandler.GetBytesAsync(file, company.ImageBytes);
            company.ImageBytes = bytes;
            return company;
        }
        private async Task<Company> SetIconToCourse(Company company, IFormFile? file)
        {
            if (file == null) return company;
            var bytes = await FileHandler.GetBytesAsync(file, company.IconBytes);
            company.IconBytes = bytes;
            return company;
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
}

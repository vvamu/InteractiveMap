using InteractiveMapOfEnterprises.Server.Models;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json.Nodes;
using System.Text.Json;
using InteractiveMapOfEnterprises.Server.Persistence;
using Microsoft.EntityFrameworkCore;
using InteractiveMapOfEnterprises.Server.Helpers;

namespace InteractiveMapOfEnterprises.Server.Services
{
    public class ApplicationUserService : IApplicationUserService
    {
        private readonly ApplicationDbContext _context;
        public ApplicationUserService(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<ApplicationUser> CreateAsync()
        {
            var user = new ApplicationUser()
            {
                Name = "Administrator",
                Companies = new List<Company>()
            };
            var alreadyExistsUser = _context.ApplicationUsers.ToList().FirstOrDefault(x => x.Name == user.Name) ;
            if (alreadyExistsUser != null) return alreadyExistsUser;
           
            var result = await _context.ApplicationUsers.AddAsync(user);
            await _context.SaveChangesAsync();

            return result.Entity;
        }

        public async Task<List<ApplicationUser>> GetAsync()
        {
            return await _context.ApplicationUsers.ToListAsync();
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
}

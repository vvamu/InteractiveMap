using InteractiveMapOfEnterprises.Server.Models;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json.Nodes;
using System.Text.Json;
using InteractiveMapOfEnterprises.Server.Persistence;
using Microsoft.EntityFrameworkCore;
using InteractiveMapOfEnterprises.Server.Helpers;

namespace InteractiveMapOfEnterprises.Server.Services
{
    public class CompanyService : ICompanyService
    {
        private readonly ApplicationDbContext _context;
        private string geoJsonDirectory => Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "geojson");
        private string companyJsonDirectory => Path.Combine(Directory.GetCurrentDirectory(), "wwwroot");
        public CompanyService(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<Company> CreateAsync(IFormFileCollection files, string jsonData,Guid creatorId)
        {
            
            var listNameFiles = new List<string>();
            foreach (var file in files)
            {
                listNameFiles.Add(await SaveFile(file));
            }

            JsonNode jsonNode = JsonNode.Parse(jsonData);
            JsonNode content = jsonNode["data"][0]["content"];
            var position = content["position"];

            /////////////////
            List<string> pathsInJson = JsonSerializer.Deserialize<List<string>>(jsonNode["props"]["filesPath"]);
            CorrelatePaths(jsonNode["data"], listNameFiles, pathsInJson);
            /////////////////

            var company = Mapper.Map(jsonData);
            company.Achievements = new List<string>(); //FIX
            company.CreatorId = creatorId;



            Company createdCompany = new Company();
            try
            {
                var result = await _context.Companies.AddAsync(company);
                createdCompany = result.Entity;
                var res = await _context.SaveChangesAsync();
            }
            catch(Exception ex)
            {
                Console.Write("");
            }

            var marker = new
            {
                id = createdCompany.Id,
                name = company.Name,
                position = position
            };

            var filePathGeojson = Path.Combine(geoJsonDirectory, $"{company.RegionId}.geojson");
            var geojsonNode = JsonNode.Parse(await System.IO.File.ReadAllTextAsync(filePathGeojson));
            geojsonNode["markers"].AsArray().Add(marker);
            System.IO.File.WriteAllText(filePathGeojson, geojsonNode.ToString());

            return company;

        }

        public async Task<Company?> EditAsync(IFormFileCollection files, string jsonData, Guid creatorId)
        {
            throw new NotImplementedException();
        }
        public async Task<List<Company>> GetAsync()
        {
            return await _context.Companies.ToListAsync();
        }

        public async Task<Company?> GetAsync(Guid id)
        {
            var temp = await _context.Companies.Include(x => x.Creator).FirstOrDefaultAsync(x => x.Id == id);
            var item = await _context.Companies.FirstOrDefaultAsync(x => x.Id == id);
            item.CreatorName = temp.Creator.Name;
            return item;
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

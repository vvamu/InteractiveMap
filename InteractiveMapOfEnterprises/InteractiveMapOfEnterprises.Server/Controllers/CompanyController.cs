using InteractiveMapOfEnterprises.Server.Models;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using System.Text.Json.Nodes;

namespace InteractiveMapOfEnterprises.Server.Controllers
{
    [ApiController]
    [Route("company")]
    public class CompanyController : Controller
    {
        private readonly string geoJsonDirectory = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "geojson");
        private readonly string companyJsonDirectory = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot");

        [HttpPost]
        [Route("create")]
        public async Task<IActionResult> Create([FromForm] IFormFileCollection files, [FromForm] string jsonData)
        {
            var listNameFiles = new List<string>();
            foreach (var file in files)
            {
                listNameFiles.Add(await SaveFile(file));
            }

            JsonNode jsonNode = JsonNode.Parse(jsonData);
            List<string> pathsInJson = JsonSerializer.Deserialize<List<string>>(jsonNode["props"]["filesPath"]);

            CorrelatePaths(jsonNode["data"], listNameFiles, pathsInJson);

            var id = Guid.NewGuid();

            

            JsonNode content = jsonNode["data"][0]["content"];

            System.IO.File.WriteAllText(Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "companies", $"{id}.json"), JsonSerializer.Serialize(new { idRegion = content["idRegion"], data = jsonNode["data"] }));

            var fileName = listNameFiles[0];
            var marker = new
            {
                id,
                name = content["name"],
                position = content["position"]
            };

            var filePathGeojson = Path.Combine(geoJsonDirectory, $"{content["idRegion"]}.geojson");


            var geojsonNode = JsonNode.Parse(await System.IO.File.ReadAllTextAsync(filePathGeojson));

            geojsonNode["markers"].AsArray().Add(marker);

            System.IO.File.WriteAllText(filePathGeojson, geojsonNode.ToString());

            Company company = new Company()
            {
                Id = marker.id,
                Name = content["name"].ToString(),
                LogoURL = $"/api/media/{fileName}"
            };


            var fileCompaniesGeoJson = Path.Combine(companyJsonDirectory, "companies.json");
            var companiesFile = JsonNode.Parse(await System.IO.File.ReadAllTextAsync(fileCompaniesGeoJson));

            companiesFile.AsArray().Add(company);

            System.IO.File.WriteAllText(fileCompaniesGeoJson, companiesFile.ToString());


            return Ok(new { message = "File and JSON data received successfully." });
        }

        [HttpGet]
        [Route("get")]
        public async Task<IActionResult> Get()
        {
            var fileCompaniesGeoJson = Path.Combine(companyJsonDirectory, "companies.json");
            return Json(await System.IO.File.ReadAllTextAsync(fileCompaniesGeoJson));
        }

        [HttpGet]
        [Route("get/{id}")]
        public async Task<IActionResult> Get(Guid id)
        {
            var filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "companies", $"{id}.json");

            if (!System.IO.File.Exists(filePath))
            {
                return NotFound();
            }

            return Json(await System.IO.File.ReadAllTextAsync(filePath));
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "companies", $"{id}.json");

            if (!System.IO.File.Exists(filePath))
            {
                return NotFound();
            }

            var fileCompaniesGeoJson = Path.Combine(companyJsonDirectory, "companies.json");
            JsonArray json = JsonNode.Parse(System.IO.File.ReadAllText(fileCompaniesGeoJson)).AsArray();
            JsonNode node = json.First((j) => j["id"].ToString() == id.ToString());
            
            json.Remove(node);

            var componyNode = JsonNode.Parse(await System.IO.File.ReadAllTextAsync(filePath));
            System.IO.File.WriteAllText(fileCompaniesGeoJson, json.ToString());
            var filePathGeojson = Path.Combine(geoJsonDirectory, $"{componyNode["idRegion"]}.geojson");
            var geojsonNode = JsonNode.Parse(await System.IO.File.ReadAllTextAsync(filePathGeojson));

            geojsonNode["markers"].AsArray().Remove(geojsonNode["markers"].AsArray().First((j) => j["id"].ToString() == id.ToString()));
            System.IO.File.WriteAllText(filePathGeojson, geojsonNode.ToString());
            System.IO.File.Delete(filePath);

            return Ok($"Delete company by id: {id}");
        }

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
    }
}

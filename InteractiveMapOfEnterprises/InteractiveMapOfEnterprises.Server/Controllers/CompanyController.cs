using InteractiveMapOfEnterprises.Server.Models;
using InteractiveMapOfEnterprises.Server.Services;
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
        private readonly ICompanyService _courseService;
        private readonly IApplicationUserService _userService;

        public CompanyController(Services.ICompanyService courseService, IApplicationUserService userService)
        {
            _courseService = courseService;
            _userService = userService;
        }
        [HttpPost]
        [Route("create")]
        public async Task<IActionResult> Create([FromForm] IFormFileCollection files, [FromForm] string jsonData)
        {
            var user = await _userService.CreateAsync();
            try
            {
                await _courseService.CreateAsync(files, jsonData, user.Id);
            }
            catch (Exception ex) { return BadRequest(new { message = "Course was not created" }); }
            return Ok(new { message = "Course was created successfully." });
        }

        [HttpGet]
        [Route("get")]
        public async Task<IActionResult> Get()
        {
            var companies = await _courseService.GetAsync();
            var jsonCompanies = JsonSerializer.Serialize(companies);
            return Json(jsonCompanies);
        }

        [HttpGet]
        [Route("get/{id}")]
        public async Task<IActionResult> Get(Guid id)
        {
            var company = await _courseService.GetAsync(id);
            if(company == null) return NotFound();
            
            var jsonCompany = JsonSerializer.Serialize(company);
            return Json(company);
        }

        [HttpDelete]
        [Route("delete/{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var company = await _courseService.DeleteAsync(id);
            if (company == null) return NotFound();

            var filePathGeojson = Path.Combine(geoJsonDirectory, $"{company.RegionId}.geojson");
            var geojsonNode = JsonNode.Parse(await System.IO.File.ReadAllTextAsync(filePathGeojson));
            geojsonNode["markers"].AsArray().Remove(geojsonNode["markers"].AsArray().First((j) => j["id"].ToString() == id.ToString()));
            System.IO.File.WriteAllText(filePathGeojson, geojsonNode.ToString());

            return Ok($"Delete company by id: {id}");
        }

       
    }
}

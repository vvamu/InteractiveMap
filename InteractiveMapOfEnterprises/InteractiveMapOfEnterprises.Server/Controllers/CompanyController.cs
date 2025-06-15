using InteractiveMapOfEnterprises.Server.Models;
using InteractiveMapOfEnterprises.Server.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
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
        private readonly IUserService _userService;
        private readonly IAuthService _authService;

        public CompanyController(ICompanyService courseService, IUserService userService, IAuthService authService)
        {
            _courseService = courseService;
            _userService = userService;
            _authService = authService;
        }
        [HttpPost]
        [Route("")]

        public async Task<IActionResult> Create( [FromForm] string jsonData, [FromForm] IFormFile? iconFormFile, [FromForm] IFormFileCollection? imageFormFiles)
        {
            var users = await _userService.GetAsync();
            Company company;
           
            var user = await _authService.GetCurrentUser(Request.HttpContext);
            if(user == null)
            {
                throw new Exception("User not auth");
                //user = users.FirstOrDefault(x => x.Roles == "Administrator");
                //if(user == null ) user = await _userService.CreateAsync(null);
            }
            try
            {
                //var getData = _courseService.GetAsync(user.Id);
                company =  await _courseService.CreateAsync(jsonData, user.Id, iconFormFile, imageFormFiles);
            }
            catch (Exception ex) {
                return BadRequest(ex.Message); }
            return Json(company);
        }



        [HttpGet]
        [Route("")]
        public async Task<IActionResult> Get()
        {
            var companies = await _courseService.GetAsync();
            var jsonCompanies = JsonSerializer.Serialize(companies);
            return Json(jsonCompanies);
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> Get(Guid id)
        {
            var company = await _courseService.GetAsync(id);
            if(company == null) return NotFound();
            
            var jsonCompany = JsonSerializer.Serialize(company);
            return Json(company);
        }

        [HttpGet]
        [Route("user/{userId}")]
        public async Task<IActionResult> GetByUser(Guid userId)
        {
            var companies = await _courseService.GetByUserAsync(userId);
            //if (companies == null) return NotFound();

            var jsonCompany = JsonSerializer.Serialize(companies);
            return Json(companies);
        }

       

        [HttpGet]
        [Route("region/{id}")]
        public async Task<IActionResult> GetByRegion(string regionId)
        {
            var companies = await _courseService.GetByRegionAsync(regionId);
            if (companies == null) return NotFound();

            var jsonCompany = JsonSerializer.Serialize(companies);
            return Json(companies);
        }

        [HttpPost]
        [Route("delete/{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
           
            var company = await _courseService.DeleteAsync(id);
            if (company == null) return NotFound();

            //var filePathGeojson = Path.Combine(geoJsonDirectory, $"{company.RegionId}.geojson");
            //var geojsonNode = JsonNode.Parse(await System.IO.File.ReadAllTextAsync(filePathGeojson));
            //geojsonNode["markers"].AsArray().Remove(geojsonNode["markers"].AsArray().First((j) => j["id"].ToString() == id.ToString()));
            //System.IO.File.WriteAllText(filePathGeojson, geojsonNode.ToString());

            return Ok($"Delete company by id: {id}");
        }

    }
}

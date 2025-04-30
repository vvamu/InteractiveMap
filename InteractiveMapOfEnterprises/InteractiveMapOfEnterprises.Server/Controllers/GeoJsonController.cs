using Microsoft.AspNetCore.Mvc;

namespace InteractiveMapOfEnterprises.Server.Controllers
{
    [ApiController]
    [Route("geo")]
    public class GeoJsonController : ControllerBase
    {
        private readonly string geoJsonDirectory = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "geojson");
        [HttpGet("{fileName}")] 
        public async Task<IActionResult> Geo(string fileName)
        {
            var filePath = Path.Combine(geoJsonDirectory, $"{fileName}.geojson"); 

            if (!System.IO.File.Exists(filePath))
            { 
                return NotFound(); 
            }

            var fileContent = await System.IO.File.ReadAllTextAsync(filePath);

            return Content(fileContent, "application/json"); 
        }
    }
}

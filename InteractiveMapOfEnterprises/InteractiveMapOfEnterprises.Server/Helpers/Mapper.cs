using InteractiveMapOfEnterprises.Server.Models;
using System.Text.Json.Nodes;
using System.Text.Json;
using Microsoft.Extensions.FileSystemGlobbing.Internal;
using System.Globalization;

namespace InteractiveMapOfEnterprises.Server.Helpers
{
    public static class Mapper
    {
        public static Company Map(string jsonData)
        {
            JsonNode jsonNode = JsonNode.Parse(jsonData);
            string pattern = "yyyy-MM-dd";


            JsonNode content = jsonNode["data"][0]["content"];
            var name = content["name"].ToString();
            var shortName = content["abbName"].ToString();
            var regionId = content["idRegion"].ToString();
            var position = content["position"];
            var positionLat = position["lat"].ToString();
            var positionLng = position["lng"].ToString();

            var foundationDate = new DateTime();
            DateTime.TryParseExact(content["foundationDate"].ToString(), pattern, null, DateTimeStyles.None, out foundationDate);
            try
            {
                var achievements = jsonNode["data"][1]["content"]["achievements"];
                var video = jsonNode["data"][2]["content"];
            }
            catch (Exception ex) { }

            Company company = new Company()
            {
                Name = name,
                ShortName = shortName,
                DateFoundation = foundationDate,
                RegionId = regionId,
                Latitude = positionLat,
                Altitude = positionLng,
                DateCreatedArticle = DateTime.Now
            };
            return company;
        }
    }
}

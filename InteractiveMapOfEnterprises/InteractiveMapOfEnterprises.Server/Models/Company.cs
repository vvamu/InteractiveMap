using System.Text.Json.Serialization;

namespace InteractiveMapOfEnterprises.Server.Models
{
    public class Company
    {
        [JsonPropertyName("id")]
        public Guid Id { get; set; }
        [JsonPropertyName("name")]
        public string Name { get; set; } = string.Empty;
        [JsonPropertyName("logoURL")]
        public string LogoURL { get; set; } = string.Empty;
    }
}

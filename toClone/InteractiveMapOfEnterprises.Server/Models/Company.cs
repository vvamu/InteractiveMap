using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Nodes;
using System.Text.Json.Serialization;

namespace InteractiveMapOfEnterprises.Server.Models
{
    public class Company
    {
        [JsonPropertyName("id")]
        public Guid Id { get; set; }

        public string RegionId { get; set; }

        [JsonPropertyName("name")]
        public string Name { get; set; } = string.Empty;
        public string? ShortName { get; set; }
        public byte[]? ImageBytes { get; set; }

        [NotMapped]
        public JsonObject[]? Position { get; set; }
        public string Latitude { get; set; }
        public string Altitude { get; set; } 
        public List<string> Achievements { get; set; }

        #region Informational

        public DateTime DateFoundation { get; set; }
        public DateTime DateCreatedArticle { get; set; }

        [NotMapped]
        public string CreatorName { get; set; }
        public ApplicationUser Creator { get; set; }
        public Guid CreatorId { get; set; }

        #endregion


    }
}

using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Nodes;
using System.Text.Json.Serialization;

namespace InteractiveMapOfEnterprises.Server.Models;
public class Company
{
    [JsonPropertyName("id")]
    public Guid Id { get; set; }
    [JsonPropertyName("regionId")]

    public string RegionId { get; set; }

    [JsonPropertyName("name")]
    public string Name { get; set; } = string.Empty;
    [JsonPropertyName("description")]

    public string? Description { get; set; }
    [JsonPropertyName("uri")]
    public Uri? Uri { get; set; }

    [JsonPropertyName("imageBytes")]
    public byte[]? ImageBytes { get; set; }
    [JsonPropertyName("iconBytes")]
    public byte[]? IconBytes { get; set; }
    [JsonPropertyName("category")]
    public string? Category { get; set; }

    [NotMapped]
    public JsonObject[]? Position { get; set; }
    [JsonPropertyName("latitude")]
    public string Latitude { get; set; }
    [JsonPropertyName("altitude")]
    public string Altitude { get; set; } 
    public List<string>? Achievements { get; set; }

    #region Informational
    [JsonPropertyName("dateFoundation")]
    public DateTime DateFoundation { get; set; }
    [JsonPropertyName("dateCreatedArticle")]

    public DateTime DateCreatedArticle { get; set; }

    [NotMapped]
    [JsonPropertyName("creatorName")]

    public string? CreatorName { get; set; }
    [JsonPropertyName("creatorId")]

    public Guid CreatorId { get; set; }

    public ApplicationUser Creator { get; set; }

    #endregion


}

using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace InteractiveMapOfEnterprises.Server.Models;

public class ApplicationUser 
{
    [JsonPropertyName("id")]
    public Guid Id { get; set; }
    [JsonPropertyName("username")]
    public string UserName { get; set; }
    public new string Password { get; set; }
    [JsonPropertyName("name")]
    public string? Name { get; set; }
    public List<Company>? Companies { get; set; }
    [JsonPropertyName("roles")]
    public string Roles { get; set; }


    [JsonPropertyName("dateCreated")]
    public DateTime DateCreated { get; set; }

    [JsonPropertyName("isDeleted")]
    public bool IsDeleted { get; set; }


    public override bool Equals(object? obj)
    {
        var newUser = obj as ApplicationUser;
        if (newUser == null) return false;
        var isEquals = UserName == newUser.UserName && Password == newUser.Password && Name == newUser.Name && IsDeleted== newUser.IsDeleted;
        return isEquals;
    }
}
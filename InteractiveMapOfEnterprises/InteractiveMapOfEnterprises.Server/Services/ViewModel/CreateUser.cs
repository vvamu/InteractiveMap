using System.Text.Json.Serialization;

namespace InteractiveMapOfEnterprises.Server.Models;

public class CreateUserViewModel
{
    public string UserName { get; set; }
    public string? Name { get; set; }
    public string Roles { get; set; }
    public string Password { get; set; }

}

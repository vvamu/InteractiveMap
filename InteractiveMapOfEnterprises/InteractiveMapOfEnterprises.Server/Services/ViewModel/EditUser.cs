using System.Text.Json.Serialization;

namespace InteractiveMapOfEnterprises.Server.Models;

public class EditUserViewModel
{
    public Guid Id { get; set; }
    public string UserName { get; set; }
    public string? Name { get; set; }

    public string? Roles { get; set; }
    public string Password { get; set; }
    public string? PasswordChanged { get; set; }

}

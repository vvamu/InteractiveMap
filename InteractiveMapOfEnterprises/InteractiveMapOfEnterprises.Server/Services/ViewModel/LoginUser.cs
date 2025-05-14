using System.Text.Json.Serialization;

namespace InteractiveMapOfEnterprises.Server.Models;

public class LoginUserViewModel
{
    public string UserName { get; set; }
    public string Password { get; set; }
}

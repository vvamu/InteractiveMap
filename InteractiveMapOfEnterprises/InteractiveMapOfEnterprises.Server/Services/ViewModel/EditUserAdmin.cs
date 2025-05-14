using System.Text.Json.Serialization;

namespace InteractiveMapOfEnterprises.Server.Models;

public class EditUserAdminViewModel
{
    public Guid Id { get; set; }
    public string Roles { get; set; }

}

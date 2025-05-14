using Microsoft.AspNetCore.Identity;

namespace InteractiveMapOfEnterprises.Server.Models
{
    public class ApplicationUser : IdentityUser<Guid>
    {
        public new string Password { get; set; }
        public string? Name { get; set; }
        public List<Company>? Companies { get; set; }

        public string Roles { get; set; }

        public bool IsDeleted { get; set; }
    }
}
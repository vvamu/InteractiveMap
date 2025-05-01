using System.Text.Json.Serialization;

namespace InteractiveMapOfEnterprises.Server.Models
{
    public class File
    {
        public Guid Id { get; set; }

        public string? Name { get; set; }
        public string Path { get; set; }
        public Company Company { get; set; }
        public Guid CompanyId { get; set; }

    }
}

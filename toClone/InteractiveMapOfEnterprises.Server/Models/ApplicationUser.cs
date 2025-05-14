namespace InteractiveMapOfEnterprises.Server.Models
{
    public class ApplicationUser
    {
        public Guid Id { get; set; }
        public string Name { get; set; }

        public List<Company>? Companies { get; set; }
    }
}
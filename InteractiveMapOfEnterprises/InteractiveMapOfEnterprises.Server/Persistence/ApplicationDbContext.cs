using InteractiveMapOfEnterprises.Server.Models;
using Microsoft.EntityFrameworkCore;
using System.Reflection.Emit;

namespace InteractiveMapOfEnterprises.Server.Persistence;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlite();
    }
    public DbSet<Company> Companies { get; set; }
    public DbSet<ApplicationUser> ApplicationUsers { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        builder.Entity<ApplicationUser>()
       .HasMany(user => user.Companies)
       .WithOne(company => company.Creator)
       .OnDelete(DeleteBehavior.Cascade);

        builder.Entity<Company>()
               .HasOne(x => x.Creator)
               .WithMany(x => x.Companies)
               .HasForeignKey(x => x.CreatorId)
               .OnDelete(DeleteBehavior.SetNull);
        base.OnModelCreating(builder);
    }
}
using InteractiveMapOfEnterprises.Server.Models;

namespace InteractiveMapOfEnterprises.Server.Services.Interfaces;

public interface IAuthService
{
    public  Task<ApplicationUser> Authorizing(LoginUserViewModel? user);
    public  Task LogoutAsync(HttpContext httpContext);
    public  Task<string> LoginAsync(LoginUserViewModel? user, HttpContext httpContext);
    public  Task<ApplicationUser> GetCurrentUser(HttpContext httpContext);
}
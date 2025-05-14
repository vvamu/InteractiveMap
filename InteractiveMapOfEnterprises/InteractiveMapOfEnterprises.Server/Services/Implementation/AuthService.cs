using InteractiveMapOfEnterprises.Server.Helpers;
using InteractiveMapOfEnterprises.Server.Models;
using InteractiveMapOfEnterprises.Server.Persistence;
using InteractiveMapOfEnterprises.Server.Services.Interfaces;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System;
using System.Security.Claims;
using System.Text.Json;
using System.Text.Json.Nodes;

namespace InteractiveMapOfEnterprises.Server.Services.Implementation;

public class AuthService : IAuthService
{
    private readonly ApplicationDbContext _context;
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly SignInManager<ApplicationUser> _signInManager;

    public AuthService(ApplicationDbContext context, UserManager<ApplicationUser> userManager,
        SignInManager<ApplicationUser> signInManager)
    {
        _context = context;
        _userManager = userManager;
        _signInManager = signInManager;
    }

    public async Task<ApplicationUser> GetCurrentUser(HttpContext httpContext)
    {
        var userId = httpContext.Request?.Cookies.ToList().FirstOrDefault(x=>x.Key == "UserId").Value;
        Guid id;
        if (!Guid.TryParse(userId, out id)) return null;
        if (id == Guid.Empty) return null;
        var dbUser = await _context.Users.FirstOrDefaultAsync(x => x.Id == id);
        if (dbUser == null) return null;
        return dbUser;

        //var userName = _signInManager.Context.User.Identity.Name;
        //var users = await _context.Users.ToListAsync();




        //var username = httpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        //if (username == null) throw new Exception("User not authenticated.");

        //var user = await _context.ApplicationUsers.FirstOrDefaultAsync(x=>x.Username == username);
        //if (user == null) throw new Exception("User by username was not found.");
        return dbUser;
    }


    public async Task<string> LoginAsync(LoginUserViewModel? user, HttpContext httpContext)
    {
        var userDb = await Authorizing(user);
        return userDb.Id.ToString();         //httpContext.Session.SetString("UserId", userDb.Id.ToString());



        //userDb.SecurityStamp = "secure-stamp";
        //await _signInManager.SignInAsync(userDb, true);
        //httpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme,new ClaimsPrincipal(), new AuthenticationProperties());

        //httpContext.
        //Response.Cookies.Append("YourCookieName", "cookieValue", new CookieOptions
        //{
        //    Expires = DateTimeOffset.UtcNow.AddDays(30),
        //    HttpOnly = true,
        //    Secure = true, // Set to true if using HTTPS
        //    SameSite = SameSiteMode.None // This is for cross-site cookies

        //});




        //var claims = new List<Claim>
        //{
        //    new Claim(ClaimTypes.NameIdentifier, userDb.Username),
        //    new Claim(ClaimTypes.Name, userDb.Name),
        //    new Claim(ClaimTypes.Role, userDb.Roles),
        //};

        //var scheme = CookieAuthenticationDefaults.AuthenticationScheme;
        //var claimsIdentity = new ClaimsIdentity(claims, scheme);
        //var claimPrincipal = new ClaimsPrincipal(claimsIdentity);

        //var authProperties = new AuthenticationProperties
        //{
        //    AllowRefresh = true,
        //    ExpiresUtc = DateTimeOffset.UtcNow.AddDays(30),
        //    IsPersistent = true,

        //};

        // await httpContext.SignInAsync(scheme, claimPrincipal, authProperties);


        //httpContext.
        //Response.Cookies.Append("YourCookieName", "cookieValue", new CookieOptions
        //{
        //    Expires = DateTimeOffset.UtcNow.AddDays(30),
        //    HttpOnly = true,
        //    Secure = true, // Set to true if using HTTPS
        //    SameSite = SameSiteMode.None // This is for cross-site cookies

        //});

        //httpContext.Session.SetString("UserId", userDb.Id.ToString());
    }

    [Authorize]
    public async Task LogoutAsync(HttpContext httpContext)
    {
        //httpContext.Session.SetString("UserId","");
        await _signInManager.SignOutAsync();

        //await httpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);


    }

    public async Task<ApplicationUser> Authorizing(LoginUserViewModel? user)
    {
        if (string.IsNullOrEmpty(user?.UserName) || string.IsNullOrEmpty(user?.Password)) throw new Exception("Not correct data");
        var dbUser = await _context.ApplicationUsers.FirstOrDefaultAsync(x => x.UserName == user.UserName);
        if (dbUser == null) throw new Exception("User by username not found");
        var isCorrectPassword = user.Password == dbUser.Password;
        if (!isCorrectPassword) throw new Exception("Incorrect password");
        return dbUser;
    }
}

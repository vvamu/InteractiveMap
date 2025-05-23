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

    public AuthService(ApplicationDbContext context)
    {
        _context = context;

    }

    public async Task<ApplicationUser> GetCurrentUser(HttpContext httpContext)
    {
        var user = new ApplicationUser()
        {
            UserName = "Beriklava",
            Roles = "Administrator",
            Password = "Beriklava",
            IsDeleted = false,
            
        };

        var alreadyExistsAdmin = _context.ApplicationUsers.ToList().FirstOrDefault(x => x.Roles == "Administrator");
        if (alreadyExistsAdmin == null) { await _context.ApplicationUsers.AddAsync(user); await _context.SaveChangesAsync(); }


        var userId = httpContext.Request?.Cookies.ToList().FirstOrDefault(x=>x.Key == "UserId").Value;
        Guid id;
        if (!Guid.TryParse(userId, out id)) return null;
        if (id == Guid.Empty) return null;
        var dbUser = await _context.ApplicationUsers.FirstOrDefaultAsync(x => x.Id == id);
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
        //await _signInManager.SignOutAsync();

        //await httpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);


    }

    public async Task<ApplicationUser> Authorizing(LoginUserViewModel? user)
    {
        if (string.IsNullOrEmpty(user?.UserName) || string.IsNullOrEmpty(user?.Password)) throw new Exception("Логин или пароль не заданы");
        var dbUser = await _context.ApplicationUsers.FirstOrDefaultAsync(x => x.UserName == user.UserName);
        if (dbUser == null) throw new Exception("Пользователь c таким логином не найден");
        CheckPassword(dbUser.Password,user.Password);
        return dbUser;
    }
    public  void CheckPassword(string oldPassword, string newPassword)
    {
        var isCorrectPassword = oldPassword == newPassword;
        if (!isCorrectPassword) throw new Exception("Некорректный пароль");
    }
}

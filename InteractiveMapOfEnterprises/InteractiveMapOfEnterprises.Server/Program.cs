using InteractiveMapOfEnterprises.Server.Models;
using InteractiveMapOfEnterprises.Server.Persistence;
using InteractiveMapOfEnterprises.Server.Services.Implementation;
using InteractiveMapOfEnterprises.Server.Services.Interfaces;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors();
builder.Services.AddAutoMapper(typeof(InteractiveMapOfEnterprises.Server.Helpers.MappingProfile).Assembly);



builder.Services.AddDistributedMemoryCache();

#region DbContext
var connectionString = builder.Configuration.GetConnectionString("RemoteConnection");

builder.Services.AddDbContext<ApplicationDbContext>(
options =>
{
    //options.UseSqlServer(connectionString, options => options.EnableRetryOnFailure().CommandTimeout(60));
    options.UseSqlite("Data Source=databse.dat");
    options.UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking);
    options.EnableSensitiveDataLogging();
},
ServiceLifetime.Scoped);
//builder.Services.AddIdentityCore<ApplicationUser>()
//    .AddRoles<IdentityRole<Guid>>()
//    .AddEntityFrameworkStores<ApplicationDbContext>()
//    .AddDefaultTokenProviders();
#endregion

//builder.Services.AddTransient<SignInManager<ApplicationUser>>();
//builder.Services.AddTransient<UserManager<ApplicationUser>>();

builder.Services.AddTransient<ICompanyService, CompanyService>();
builder.Services.AddTransient<IAuthService, AuthService>();
builder.Services.AddTransient<IUserService, UserService>();

builder.WebHost.ConfigureKestrel(options => { options.Limits.MaxRequestBodySize = 2147483647; });

builder.Services.AddCors(options =>
{
    options.AddPolicy("ReactClientPolicy",
        builder =>
        {
            builder
                .WithOrigins("http://localhost:5173", "https://localhost:5173")
                .AllowAnyMethod()
                .AllowAnyHeader()
                .AllowCredentials();
        });
});

//builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme);
//    .AddCookie(options =>
//    {
//        options.Cookie.Name = "YourCookieName";
//        options.SlidingExpiration = true;
//        options.Cookie.HttpOnly = true;
//        options.ExpireTimeSpan = TimeSpan.FromDays(30);
//        options.LoginPath = "/login";
//        options.AccessDeniedPath = "/accessdenied";
//    })
//    ;
//builder.Services.AddDistributedMemoryCache();
//builder.Services.AddSession();

builder.Services.AddSession();
builder.Services.ConfigureApplicationCookie(options =>
{
    options.Cookie.Name = "INTERACTIVE_MAP";
    options.ExpireTimeSpan = TimeSpan.FromDays(10); // ��������� ����� �������� ���� �� 10 ����
    options.SlidingExpiration = true; // ��������� ����������� ��������� ����� ��������


});
builder.Services.AddIdentity<ApplicationUser, IdentityRole<Guid>>().AddEntityFrameworkStores<ApplicationDbContext>()
.AddDefaultTokenProviders();


//builder.Services.AddAuthentication(options =>
//{
//    options.DefaultSignOutScheme = IdentityConstants.ApplicationScheme;
//}).AddCookie(IdentityConstants.ApplicationScheme, options =>
//{
//    options.Cookie.Name = "INTERACTIVEMAP_CookieName";
//    // Configure other cookie options as needed
//});

builder.Services.AddAuthorization();


var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

app.UseCors("ReactClientPolicy");

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

////app.UseSession();
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();

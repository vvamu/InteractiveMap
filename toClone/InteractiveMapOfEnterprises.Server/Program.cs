using InteractiveMapOfEnterprises.Server.Persistence;
using InteractiveMapOfEnterprises.Server.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors();
#region DbContext
var connectionString = builder.Configuration.GetConnectionString("RemoteConnection");

builder.Services.AddDbContext<ApplicationDbContext>(
options =>
{
    options.UseSqlServer(connectionString, options => options.EnableRetryOnFailure().CommandTimeout(60));
    options.UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking);
    options.EnableSensitiveDataLogging();
},
ServiceLifetime.Scoped);
#endregion

builder.Services.AddTransient<ICompanyService, CompanyService>();
builder.Services.AddTransient<IApplicationUserService, ApplicationUserService>();

builder.WebHost.ConfigureKestrel(options => { options.Limits.MaxRequestBodySize = 2147483647; });

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

app.UseCors(builder => builder.AllowAnyOrigin());

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();

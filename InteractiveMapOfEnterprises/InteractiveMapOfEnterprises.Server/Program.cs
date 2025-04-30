var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors();
//    options =>
//{
//    options.AddPolicy(name: "Client",
//        policy =>
//        {
//            policy.WithOrigins("http://localhost:5173");
//        });
//});

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

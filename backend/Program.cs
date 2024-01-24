using System;
using System.IO;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using AngularDotNetCRUDApp.Models;
using AngularDotNetCRUDApp.Services;
using AngularDotNetCRUDApp.Data;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// Add CORS policy
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "AllowSpecificOrigin",
                      policy =>
                      {
                          policy.WithOrigins("http://localhost:4200")
                                .AllowAnyHeader()
                                .AllowAnyMethod();
                      });
});

// Configure JWT Authentication
var key = "ExampleKey1234567890ExampleKey1234567890"; // Ensure this key matches the one in AuthController
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = "AngularDotNetCRUDApp.Local",
            ValidAudience = "AngularDotNetCRUDApp.Users",
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key))
        };
    });

// Register services and repositories
builder.Services.AddScoped<BookService>();
builder.Services.AddScoped<JsonFileRepository<Book>>(provider =>
{
    var jsonFilePath = Path.Combine(builder.Environment.ContentRootPath, "Data", "books.json");
    return new JsonFileRepository<Book>(jsonFilePath);
});

// Register QuoteService and JsonFileRepository<Quote>
builder.Services.AddScoped<QuoteService>();
builder.Services.AddScoped<JsonFileRepository<Quote>>(provider =>
{
    var jsonFilePath = Path.Combine(builder.Environment.ContentRootPath, "Data", "quotes.json");
    return new JsonFileRepository<Quote>(jsonFilePath);
});

builder.Services.AddScoped<AuthService>();
builder.Services.AddScoped<JsonFileRepository<User>>(provider =>
{
    var jsonFilePath = Path.Combine(builder.Environment.ContentRootPath, "Data", "users.json");
    return new JsonFileRepository<User>(jsonFilePath);
});

// Swagger configuration
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "Your API", Version = "v1" });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Your API v1"));
}

app.UseCors("AllowSpecificOrigin");

app.UseHttpsRedirection();

app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();

using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.Filters;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using Domain.src.Abstraction;
// using Business.src.RepoImplementations;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.Filters;
using Business.src.Abstraction;
using Business.src.Implementations;
using Business.src.Shared;
using Domain.src.Abstraction;
using WebApi.src.Database;
using WebApi.src.RepoImplementations;



var builder = WebApplication.CreateBuilder(args);

// Add Automapper DI
builder.Services.AddAutoMapper(typeof(Program).Assembly);

// Add db context
builder.Services.AddDbContext<DatabaseContext>();

// Add service DI
builder.Services
.AddScoped<IUserRepo, UserRepo>()
.AddScoped<IUserService, UserService>()
.AddScoped<IAuthService, AuthService>();

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.AddSecurityDefinition("oauth2", new OpenApiSecurityScheme
    {
        Description = "Bearer token authentication",
        Name = "Authentication",
        In = ParameterLocation.Header
    });
    options.OperationFilter<SecurityRequirementsOperationFilter>();
});

//config route
builder.Services.Configure<RouteOptions>(options =>{
    options.LowercaseUrls = true;
});


    
//config the authentictaion
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
.AddJwtBearer(options => {
    options.TokenValidationParameters = new TokenValidationParameters{
        ValidateIssuer = true,
        ValidIssuer = "ecommerce-backend",
        // SignatureValidator = new JsonWebKey("my-secret-key");
        // IssuerSigningKey = new JsonWebKey("my-secret-key"),
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("my-secret-key-fkwpkfpwkrfkrwpkgfgergr")),
        ValidateIssuerSigningKey = true  
    };
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();

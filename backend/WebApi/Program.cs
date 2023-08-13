using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.Filters;
using Microsoft.AspNetCore.Authentication.JwtBearer;

using System.Text; // Add this for the Encoding class
using Microsoft.IdentityModel.Tokens; // Add this for TokenValidationParameters
using System.IdentityModel.Tokens.Jwt; // Add this for JsonWebKey

var builder = WebApplication.CreateBuilder(args);

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
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("my-secret-key")),
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

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
using WebApi.src.AuthorizationRequirement;
using WebApi.src.MiddleWare;



var builder = WebApplication.CreateBuilder(args);

// Add Automapper DI
builder.Services.AddAutoMapper(typeof(Program).Assembly);

// Add db context
builder.Services.AddDbContext<DatabaseContext>();

// Add service DI
builder.Services
.AddScoped<IUserRepo, UserRepo>()
.AddScoped<IUserService, UserService>()
.AddScoped<IAuthService, AuthService>()

.AddScoped<IProductService, ProductService>()
.AddScoped<IProductRepo, ProductRepo>()

.AddScoped<IOrderService, OrderService>()
.AddScoped<IOrderRepo, OrderRepo>()

.AddScoped<IOrderProductService, OrderProductService>()
.AddScoped<IOrderProductRepo, OrderProductRepo>();


// Configure CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", builder =>
    {
        builder.WithOrigins("http://localhost:3000") // Add your frontend URL here
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});


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


builder.Services
// .AddSingleton<MinimumAgeRequirementHandler>()
.AddSingleton<ErrorHandlerMiddleware>()
.AddSingleton<OwnerOnlyRequirementHandler>();

//config route
builder.Services.Configure<RouteOptions>(options =>{
    options.LowercaseUrls = true;
});


    
//config the authentictaion
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
.AddJwtBearer(options => {
    options.TokenValidationParameters = new TokenValidationParameters{
        //pre
        // ValidateIssuer = true,
        // ValidIssuer = "ecommerce-backend",
        // // SignatureValidator = new JsonWebKey("my-secret-key");
        // // IssuerSigningKey = new JsonWebKey("my-secret-key"),
        // IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("my-secret-key-fkwpkfpwkrfkrwpkgfgergr")),
        // ValidateIssuerSigningKey = true  

        ValidateIssuer = true,
        ValidIssuer = "ecommerce-backend",
        ValidateAudience = false,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("my-secrete-key-jsdguyfsdgcjsdbchjsdb jdhscjysdcsdj")),
        ValidateIssuerSigningKey = true
    };
});


builder.Services.AddAuthorization(options =>
{
    // options.AddPolicy("EmailWhiteList", policy => policy.RequireClaim(ClaimTypes.Email, "alia@mail.com", "john@mail.com", "dave@mail.com"));
    // options.AddPolicy("Minimum18Years", policy => policy.Requirements.Add(new MinimumAgeRequirement(18)));
    options.AddPolicy("OwnerOnly", policy => policy.Requirements.Add(new OwnerOnlyRequirement()));
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("AllowFrontend");


app.UseMiddleware<ErrorHandlerMiddleware>();


app.UseAuthorization();

app.MapControllers();

app.Run();

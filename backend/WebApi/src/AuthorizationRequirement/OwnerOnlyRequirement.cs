using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Business.src.Dtos;
using Domain.src.Entities;

namespace WebApi.src.AuthorizationRequirement
{
    public class OwnerOnlyRequirement : IAuthorizationRequirement
    {
        
    }

    // public class OwnerOnlyRequirementHandler : AuthorizationHandler<OwnerOnlyRequirement, OrderReadDto>
    // {
    //     protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, OwnerOnlyRequirement requirement, OrderReadDto resource)
    //     {
    //         var authenticatedUser = context.User;
    //         var userId = authenticatedUser.FindFirst(ClaimTypes.NameIdentifier)!.Value;
    //         if(resource.User.Id.ToString() == userId)
    //         {
    //             context.Succeed(requirement);
    //         }
    //         return Task.CompletedTask;
    //     }
    // }
}
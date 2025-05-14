using Microsoft.AspNetCore.Mvc;

namespace InteractiveMapOfEnterprises.Server.Controllers;

using InteractiveMapOfEnterprises.Server.Helpers;
using InteractiveMapOfEnterprises.Server.Models;
using InteractiveMapOfEnterprises.Server.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Text.Json;
using System.Threading.Tasks;
using System.Text.Json;
using System.Text.Json.Nodes;

[Route("auth")]
[ApiController]
public class AuthController : Controller
{
    private readonly IAuthService _authService;

    public AuthController( IAuthService authService)
    {
        _authService = authService;
    }
 
    [HttpPost("login")]
    //public async Task<IActionResult> Login([FromBody] LoginUserViewModel user)
    public async Task<IActionResult> Login([FromForm]string jsonData)
    {
        try
        {

            var user = (LoginUserViewModel)Mapper.Map(jsonData, new LoginUserViewModel());
            var token = await _authService.LoginAsync(user, Response.HttpContext);
            return Json(token);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpPost("logout")]
    public async Task<IActionResult> Logout()
    {
        //await _authService.LogoutAsync(Response.HttpContext);
        return Ok("Logout successful");
    }

    [HttpGet("currentuser")]
    public async Task<IActionResult> GetCurrentUser()
    {
        try
        {
            var currentUser = await _authService.GetCurrentUser(Response.HttpContext);
            var json = JsonSerializer.Serialize(currentUser);
            return Json(json);
        }
        catch (Exception ex)
        {
            return Json(null);//BadRequest(ex.Message);
        }
    }

}
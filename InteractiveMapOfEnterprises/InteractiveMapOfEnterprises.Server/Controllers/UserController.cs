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

[Route("users")]
[ApiController]
public class UserController : ControllerBase
{
    private readonly IUserService _userService;
    private readonly IAuthService _authService;

    public UserController(IUserService userService, IAuthService authService)
    {
        _userService = userService;
        _authService = authService;
    }

    [HttpGet("")]
    public async Task<IActionResult> GetAsync()
    {
        try
        {
            var res = await _userService.GetAsync();
            return Ok(res);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
    [HttpGet("{username}")]
    public async Task<IActionResult> GetAsync(string username)
    {
        try
        {
            var res = await _userService.GetAsync(username);
            return res != null? Ok(res) : new EmptyResult();
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
    [HttpGet("{userId:guid}")]
    public async Task<IActionResult> GetAsync(Guid userId)
    {
        try
        {
            var res = await _userService.GetAsync(userId);
            return res != null ? Ok(res) : Ok(null);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpPost("create")]
    public async Task<IActionResult> Create([FromForm]string jsonData) 
    {
        try
        {
            var user = (CreateUserViewModel)Mapper.Map(jsonData, new CreateUserViewModel());
            await _userService.CreateAsync(user);
            return Ok("User created successful");
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    

    [HttpPut("editAdmin")]
    public async Task<IActionResult> EditUserRole([FromForm] string jsonData)
    {
        try
        {
            var editUserAdmin = (EditUserAdminViewModel)Mapper.Map(jsonData, new EditUserAdminViewModel());

            await _userService.EditUserAsync(editUserAdmin.Id, editUserAdmin.Roles);
            return Ok("User role updated successfully");
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpPut("edit")]
    public async Task<IActionResult> EditUser([FromForm] string jsonData)
    {
        try
        {
            var editUser = (EditUserViewModel)Mapper.Map(jsonData, new EditUserViewModel());

            await _userService.EditUserAsync(editUser);
            return Ok("User details updated successfully");
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
    [HttpPost("delete/{userId}")]
    public async Task<IActionResult> DeleteUser(Guid userId, bool isSoft = true)
    {
        try
        {
            await _userService.Delete(userId, isSoft);
            return Ok("User deleted successfully");
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
}


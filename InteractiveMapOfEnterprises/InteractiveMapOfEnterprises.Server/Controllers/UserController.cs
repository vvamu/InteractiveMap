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
public class UserController : Controller
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
            //var users = await _userService.GetAsync();

            //foreach (var use in users)
            //{
            //    await _userService.Delete(use.Id, false);
            //}
            var res = await _userService.GetAsync();
            return Json(res);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpGet("{userId}")]
    public async Task<IActionResult> GetAsync(Guid userId)
    {
        try
        {
            var res = await _userService.GetAsync(userId);
            return Json(res);
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
            var userDb = await _userService.CreateAsync(user);
            return Json(userDb);
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

            var user = await _userService.EditUserRoleAsync(editUserAdmin.Id, editUserAdmin.Roles);
            return Json(user);
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

            var user =  await _userService.EditUserAsync(editUser);
            return Json(user);
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
            isSoft = false;
            var curUser = await _authService.GetCurrentUser(Request.HttpContext);
            if (curUser == null) throw new Exception("Текущий пользователь не найден");
            var admins = await _userService.GetAdmins();
            admins = admins.Where(x => x.Id != userId).ToList();
            if (admins.Count() == 0) throw new Exception("Невозможно удалить пользователя при отсутствии администратора на сайте");
            var adminId = admins[0].Id;

            var user =  await _userService.Delete(userId, adminId, isSoft);
            return Json(user);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
}


using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using WebDrapo.Model;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebDrapo.Controllers
{
    [AllowAnonymous]
    public class AuthenticationController : Controller
    {
        [HttpPost]
        public async Task<ActionResult> Login([FromBody] KeyValueVO identity)
        {
            if ((identity.Key != "admin") || (identity.Value != "password"))
                return (Ok("Error"));
            List<Claim> claims = new List<Claim>();
            claims.Add(new Claim("userLogin", identity.Key));
            claims.Add(new Claim("domain", "domain"));
            ClaimsIdentity claimsIdentity = new ClaimsIdentity(claims, "local", "userlogin", "domain");
            await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(claimsIdentity));
            return (Ok("Ok"));
        }

        [HttpPost]
        public async Task<ActionResult> Logout([FromBody] string token)
        {
            if (token != "Ok")
                return (Ok("Error"));
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            return (Ok("Ok"));
        }
    }
}

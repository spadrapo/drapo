using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using WebDrapo.Model;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebDrapo.Controllers
{
    public class AuthorizationController : Controller
    {
        [HttpGet]
        public Dictionary<string, string> GetUserName()
        {
            Dictionary<string, string> values = new Dictionary<string, string>();
            List<Claim> claims = new List<Claim>(HttpContext.User.Claims);
            foreach (Claim claim in claims)
                if (!values.ContainsKey(claim.Type))
                    values.Add(claim.Type, claim.Value);
            return (values);
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace WebDrapo.Controllers
{
    [AllowAnonymous]
    public class MixedController : Controller
    {
        public IActionResult Index()
        {
            return PartialView();
        }
    }
}
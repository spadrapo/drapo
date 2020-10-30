using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace WebDrapo.Controllers
{
    [AllowAnonymous]
    public class ServerController : Controller
    {
        [HttpGet]
        public ActionResult Redirect()
        {
            ContentResult content = new ContentResult();
            content.StatusCode = 204;
            Response.Headers.Add("Location", "~/DrapoPages/ServerResponseRedirected.html");
            return (content);
        }

        public ActionResult GetNoCache([FromQuery] string value) {
            string content = $"<div><span>{value}</span></div>";
            this.Response.Headers.Add("cache-control", "no-store");
            return (Ok(content));
        }
    }
}

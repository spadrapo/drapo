using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Sysphera.Middleware.Drapo.User;

namespace WebDrapo.Controllers
{
    [AllowAnonymous]
    public class UserConfigurationController : Controller
    {
        private IDrapoUserConfig _userConfig;
        public UserConfigurationController(IDrapoUserConfig userConfig) 
        {
            _userConfig = userConfig;
        }
        [HttpGet]
        public async Task<string> ChangeTheme([FromQuery] string theme)
        {
            Dictionary<string, string> values = new Dictionary<string, string>();
            values.Add("theme", theme);
            await this._userConfig.Ensure(values);
            return (theme);
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Sysphera.Middleware.Drapo.Pipe;

namespace WebDrapo.Controllers
{
    [AllowAnonymous]
    public class PlumberController : Controller
    {
        private IDrapoPlumber _plumber;
        public PlumberController(IDrapoPlumber plumber)
        {
            this._plumber = plumber;
        }

        [HttpPost]
        public void Execute([FromBody] string expression)
        {
            _plumber.Send(new DrapoPipeMessage() {Type = DrapoPipeMessageType.Execute, Data = expression }, DrapoPipeAudienceType.Me);
        }

        [HttpPost]
        public void Notify([FromQuery] string dataKey)
        {
            _plumber.Send(new DrapoPipeMessage() { Type = DrapoPipeMessageType.Storage, Data = dataKey }, DrapoPipeAudienceType.Me);
        }

        [HttpGet]
        public async Task<long> GetCount()
        {
            return (await _plumber.Count());
        }
    }
}
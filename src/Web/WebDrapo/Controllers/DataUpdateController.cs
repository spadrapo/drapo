using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebDrapo.Model;
using Microsoft.AspNetCore.Authorization;

namespace WebDrapo.Controllers
{
    [AllowAnonymous]
    public class DataUpdateController : Controller
    {
        private static List<DataVM> _data = CreateData();
        public IActionResult Index()
        {
            return View();
        }

        private static List<DataVM> CreateData()
        {
            List<DataVM> data = new List<DataVM>();
            data.Add(new DataVM() { Code = 1, Name = "Dev1" });
            data.Add(new DataVM() { Code = 2, Name = "Dev2" });
            data.Add(new DataVM() { Code = 3, Name = "Dev3" });
            return (data);
        }

        [HttpGet]
        public List<DataVM> Get()
        {
            return (_data);
        }

        [HttpPost]
        public List<DataVM> Set([FromBody] List<DataVM> inserted, [FromBody] List<DataVM> updated, [FromBody] List<DataVM> deleted)
        {
            return (_data);
        }
    }
}
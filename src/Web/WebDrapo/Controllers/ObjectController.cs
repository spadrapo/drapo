using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Sysphera.Middleware.Drapo;
using WebDrapo.Model;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebDrapo.Controllers
{
    [AllowAnonymous]
    public class ObjectController : Controller
    {
        private static List<ObjectVM> _persons = Create();
        private static int _counter = 1;

        private static List<ObjectVM> Create()
        {
            List<ObjectVM> persons = new List<ObjectVM>();
            persons.Add(new ObjectVM() { Code = 1, Previous = null, Next = 2, Name = "Thiago Henrique da Silva", Description = "Father", Date = new DateTime(1980, 6, 3), Value = 37 });
            persons.Add(new ObjectVM() { Code = 2, Previous = 1, Next = 3, Name = "Catarina", Description = "Daughter", Date = new DateTime(2011, 7, 21), Value = 6 });
            persons.Add(new ObjectVM() { Code = 3, Previous = 2, Next = null, Name = "Augusto", Description = "Tornado", Date = new DateTime(2014, 10, 18), Value = 3 });
            return (persons);
        }

        [HttpGet]
        public async Task<DrapoObject> Get([FromQuery]int? code = null)
        {
            int index = _persons.FindIndex(p => p.Code == (code ?? 1));
            DrapoObject obj = new DrapoObject(_persons[index]);
            obj.Properties.Add("Index", index);
            return (await Task.FromResult<DrapoObject>(obj));
        }

        [HttpPost]
        public async Task Set([FromBody] DrapoObject obj)
        {
            int index = obj.GetProperty<int>("Index");
            ObjectVM person = obj.Cast<ObjectVM>();
            _persons[index] = person;
            await Task.CompletedTask;
        }

        [HttpGet]
        public async Task<List<ObjectComplexVM>> GetListComplexObjects()
        {
            List<ObjectComplexVM> list = new List<ObjectComplexVM>();
            for (int i = 0; i < 10; i++)
            {
                ObjectComplexVM complex = new ObjectComplexVM();
                complex.Name = "Thiago - [" + i + "]";
                if (i % 2 == 0)
                {
                    complex.Child = new ObjectComplexVM();
                    complex.Child.Name = "Catarina - [" + i + "]";
                }
                list.Add(complex);
            }
                
            return (await Task.FromResult<List<ObjectComplexVM>>(list));
        }

        [HttpGet]
        public async Task<ObjectComplexVM> GetComplex()
        {
            ObjectComplexVM complex = new ObjectComplexVM();
            complex.Name = "Thiago";
            complex.Child = new ObjectComplexVM();
            complex.Child.Name = "Catarina";
            return (await Task.FromResult<ObjectComplexVM>(complex));
        }

        [HttpPost]
        public async Task SetComplex([FromBody] ObjectComplexVM complex)
        {
            await Task.CompletedTask;
        }

        [HttpPost]
        public async Task<string> Join([FromQuery] string text1, [FromQuery] string text2)
        {
            return (await Task.FromResult(text1 + text2));
        }

        [HttpGet]
        public async Task<string> GetJoin([FromQuery] string text1, [FromQuery] string text2)
        {
            return (await Task.FromResult(text1 + text2));
        }

        [HttpGet]
        public async Task<ObjectComplexVM> GetChildProperties()
        {
            ObjectComplexVM complex = new ObjectComplexVM();
            complex.Name = "Thiago";
            complex.Child = new ObjectComplexVM();
            complex.Child.Name = "Catarina";
            complex.Child.Properties.Add("k1", "v1");
            complex.Child.Properties.Add("k2", "v2");
            complex.Child.Properties.Add("k3", "v3");
            return (await Task.FromResult<ObjectComplexVM>(complex));
        }

        [HttpGet]
        public async Task<ActionResult> GetReports()
        {
            List<DrapoObject> reports = new List<DrapoObject>();
            reports.Add(CreateReport(null, string.Empty));
            reports.Add(CreateReport(1, "Report1"));
            reports.Add(CreateReport(2, "Report2"));
            reports.Add(CreateReport(3, "Report3"));
            return (Ok(await Task.FromResult<List<DrapoObject>>(reports)));
        }

        private DrapoObject CreateReport(long? code, string name)
        {
            DrapoObject report = new DrapoObject();
            report.Properties.Add("Code", code);
            report.Properties.Add("Name", name);
            return (report);
        }

        [HttpGet]
        public int GetCounter()
        {
            return (_counter++);
        }
    }
}

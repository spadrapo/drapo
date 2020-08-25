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
    public class CultureController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public List<KeyValueVO> GetCultures(string culture)
        {
            List<KeyValueVO> cultures = new List<KeyValueVO>();
            cultures.Add(new KeyValueVO() { Key = "en", Value = "Ingles" });
            cultures.Add(new KeyValueVO() { Key = "pt", Value = "Portugues" });
            return (cultures);
        }

        [HttpGet]
        public Dictionary<string, string> GetUserConfig()
        {
            Dictionary<string, string> values = new Dictionary<string, string>();
            values.Add("Culture", "pt");
            return (values);
        }

        [HttpGet]
        public Dictionary<string, string> GetResources(string culture)
        {
            return (GetResourcesData(culture));
        }

        [HttpPost]
        public Dictionary<string, string> GetResources([FromQuery] string culture, [FromBody] List<string> keys)
        {
            return (GetResourcesData(culture, keys));
        }

        public Dictionary<string, string> GetResourcesData(string culture, List<string> keys = null)
        {
            Dictionary<string, string> values = new Dictionary<string, string>();
            Dictionary<string, string> dictionary = this.GetResourcesCulture(culture);
            if ((keys == null) || (keys.Count == 0))
                return (dictionary);
            foreach (string key in keys)
                if (dictionary.ContainsKey(key))
                    values.Add(key, dictionary[key]);
            return (values);
        }

        public Dictionary<string, string> GetResourcesCulture(string culture)
        {
            if (culture == "pt")
                return (GetResourcesPT());
            return (GetResourcesEN());
        }

        [HttpGet]
        public Dictionary<string, string> GetResourcesPT()
        {
            Dictionary<string, string> values = new Dictionary<string, string>();
            values.Add("User", "Usuário");
            values.Add("Name", "Nome");
            values.Add("Date", "Data");
            for (int i = 0; i < 10; i++)
                values.Add(i.ToString(), i.ToString());
            return (values);
        }

        private Dictionary<string, string> GetResourcesEN()
        {
            Dictionary<string, string> values = new Dictionary<string, string>();
            values.Add("User", "User");
            values.Add("Name", "Name");
            values.Add("Date", "Date");
            for (int i = 0; i < 10; i++)
                values.Add(i.ToString(), i.ToString());
            return (values);
        }

        [HttpGet]
        public List<DateObjectVM> GetObjectsCulture()
        {
            List<DateObjectVM> objectsCulture = new List<DateObjectVM>();
            List<DateObjectVM> objects = GetObjects();
            List<string> cultures = new List<string>() { "en", "pt", "es" };
            foreach (DateObjectVM obj in objects)
                foreach (string culture in cultures)
                    objectsCulture.Add(this.CloneCulture(obj, culture));
            return (objectsCulture);
        }

        private DateObjectVM CloneCulture(DateObjectVM obj, string culture)
        {
            DateObjectVM objectClone = new DateObjectVM();
            objectClone.Value = obj.Value;
            objectClone.Format = obj.Format;
            objectClone.Culture = culture;
            return (objectClone);
        }

        [HttpGet]
        public List<DateObjectVM> GetObjects()
        {
            List<DateObjectVM> dates = new List<DateObjectVM>();
            dates.Add(new DateObjectVM() { Value = new DateTime(1980, 6, 3), Format = "d" });
            dates.Add(new DateObjectVM() { Value = "Thiago", Format = "D" });
            dates.Add(new DateObjectVM() { Value = null, Format = "r" });
            dates.Add(new DateObjectVM() { Value = true, Format = "g" });
            dates.Add(new DateObjectVM() { Value = 1980, Format = "g" });
            dates.Add(new DateObjectVM() { Value = "1980", Format = "g" });
            dates.Add(new DateObjectVM() { Value = new DateTime(1980, 6, 3, 13, 4, 56), Format = "d" });
            dates.Add(new DateObjectVM() { Value = new DateTime(1980, 6, 3, 13, 4, 56), Format = "D" });
            dates.Add(new DateObjectVM() { Value = new DateTime(1980, 6, 3, 13, 4, 56), Format = "t" });
            dates.Add(new DateObjectVM() { Value = new DateTime(1980, 6, 3, 13, 4, 56), Format = "T" });
            dates.Add(new DateObjectVM() { Value = new DateTime(1980, 6, 3, 13, 4, 56), Format = "G" });
            dates.Add(new DateObjectVM() { Value = new DateTime(1980, 6, 3, 13, 4, 56), Format = "g" });
            dates.Add(new DateObjectVM() { Value = new DateTime(1980, 6, 3, 13, 4, 56), Format = "dddd, DD MMM YYYY" });
            dates.Add(new DateObjectVM() { Value = 10, Format = "N" });
            dates.Add(new DateObjectVM() { Value = .1M, Format = "N" });
            dates.Add(new DateObjectVM() { Value = ".6", Format = "N" });
            dates.Add(new DateObjectVM() { Value = 0.1M, Format = "P" });
            dates.Add(new DateObjectVM() { Value = "0.1", Format = "P" });
            dates.Add(new DateObjectVM() { Value = .1M, Format = "P" });
            dates.Add(new DateObjectVM() { Value = 1, Format = "P" });
            dates.Add(new DateObjectVM() { Value = 0, Format = "P" });
            dates.Add(new DateObjectVM() { Value = .0M, Format = "P" });
            dates.Add(new DateObjectVM() { Value = 0.123456M, Format = "P" });
            dates.Add(new DateObjectVM() { Value = "-100", Format = "N" });
            dates.Add(new DateObjectVM() { Value = 1234567.8901, Format = "N" });
            dates.Add(new DateObjectVM() { Value = 10, Format = "N{{date.Tag}}", Tag = "3" });
            dates.Add(new DateObjectVM() { Value = 12345, Format = "D" });
            dates.Add(new DateObjectVM() { Value = 12345, Format = "D8" });
            dates.Add(new DateObjectVM() { Value = -12345, Format = "D" });
            dates.Add(new DateObjectVM() { Value = -12345, Format = "D8" });
            dates.Add(new DateObjectVM() { Value = "Thiago", Format = "N" });
            dates.Add(new DateObjectVM() { Value = "-", Format = "D" });
            dates.Add(new DateObjectVM() { Value = ".", Format = "D" });
            dates.Add(new DateObjectVM() { Value = .1, Format = "D" });
            return (dates);
        }
    }
}
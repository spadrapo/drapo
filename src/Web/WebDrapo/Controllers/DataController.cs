using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebDrapo.Model;
using Microsoft.AspNetCore.Authorization;
using Sysphera.Middleware.Drapo;
using Newtonsoft.Json;
using Microsoft.AspNetCore.StaticFiles;

namespace WebDrapo.Controllers
{
    [AllowAnonymous]
    public class DataController : Controller
    {
        [HttpGet]
        public IEnumerable<KeyValueVO> Index()
        {
            List<KeyValueVO> dictionary = new List<KeyValueVO>();
            for (int i = 0; i < 5; i++)
                dictionary.Add(new KeyValueVO() { Key = string.Format("K{0}", i.ToString()), Value = string.Format("V{0}", i.ToString()) });
            return (dictionary);
        }

        [HttpGet]
        public IEnumerable<KeyValueVO> GetWithEmpty()
        {
            List<KeyValueVO> dictionary = new List<KeyValueVO>();
            dictionary.Add(new KeyValueVO() { Key = string.Empty, Value = string.Empty });
            for (int i = 0; i < 5; i++)
                dictionary.Add(new KeyValueVO() { Key = string.Format("K{0}", i.ToString()), Value = string.Format("V{0}", i.ToString()) });
            return (dictionary);
        }

        [HttpGet]
        public IEnumerable<KeyValueVO> GetLevels(int levels, int children = 5, bool includeIndex = false, string prefix = null)
        {
            List<KeyValueVO> dictionary = new List<KeyValueVO>();
            int index = 0;
            CreateLevels(dictionary, levels, children, includeIndex, ref index, prefix);
            return (dictionary);
        }

        [HttpGet]
        public KeyValueVO GetNull()
        {
            return (null);
        }

        [HttpGet]
        public List<string> GetColumns()
        {
            List<string> columns = new List<string>();
            columns.Add("Key");
            columns.Add("Value");
            columns.Add("Visible");
            columns.Add("Selection");
            return (columns);
        }

        private void CreateLevels(List<KeyValueVO> values, int levels, int childs, bool includeIndex, ref int index, string prefix)
        {
            if (levels < 0)
                return;
            for (int i = 0; i < childs; i++)
            {
                KeyValueVO keyValue = new KeyValueVO() { Key = string.Format("L{0}K{1}", levels, i.ToString()), Value = string.Format("L{0}V{1}", levels, i.ToString()) };
                if (includeIndex)
                    keyValue.Key = "I" + index + keyValue.Key;
                if (!string.IsNullOrEmpty(prefix))
                    keyValue.Key = prefix + keyValue.Key;
                values.Add(keyValue);
                index++;
                this.CreateLevels(keyValue.Children, levels - 1, childs, includeIndex, ref index, prefix);
            }
        }

        [HttpGet]
        public IEnumerable<KeyValueVO> GetIFSample()
        {
            List<KeyValueVO> dictionary = new List<KeyValueVO>();
            for (int i = 0; i < 10; i++)
                dictionary.Add(new KeyValueVO() { Key = string.Format("K{0}", i.ToString()), Value = string.Format("V{0}", i.ToString()), Visible = (i % 2 == 0) });
            return (dictionary);
        }

        [HttpGet]
        public IEnumerable<KeyValueVO> GetNullable()
        {
            List<KeyValueVO> dictionary = new List<KeyValueVO>();
            for (int i = 0; i < 10; i++)
                dictionary.Add(new KeyValueVO() { Key = ((i % 2 == 0) ? null : string.Format("K{0}", i.ToString())), Value = string.Format("V{0}", i.ToString()), Visible = (i % 2 == 0) });
            return (dictionary);
        }

        [HttpGet]
        public IEnumerable<KeyValueVO> GetModelSample()
        {
            List<KeyValueVO> dictionary = new List<KeyValueVO>();
            for (int i = 0; i < 8; i++)
                dictionary.Add(new KeyValueVO() { Key = string.Format("K{0}", i.ToString()), Value = string.Format("V{0}", i.ToString()), Visible = (i % 2 == 0) });
            return (dictionary);
        }

        [HttpGet]
        public IEnumerable<KeyValueVO> GetModelSelectOptions()
        {
            List<KeyValueVO> dictionary = new List<KeyValueVO>();
            for (int i = 0; i < 8; i++)
                dictionary.Add(new KeyValueVO() { Key = string.Format("K{0}", i.ToString()), Value = string.Format("V{0}", i.ToString()), Visible = (i % 2 == 0) });
            return (dictionary);
        }

        [HttpGet]
        public KeyValueVO GetModelSelectSelected()
        {
            KeyValueVO keyValue = new KeyValueVO();
            keyValue.Selection = "K1";
            return (keyValue);
        }

        [HttpGet]
        public List<KeyValueVO> GetMenuItems()
        {
            List<KeyValueVO> menuItems = new List<KeyValueVO>();
            menuItems.Add(new KeyValueVO() { Key = "Model Select", Value = "/DrapoPages/ControlFlowModelSelect.html" });
            menuItems.Add(new KeyValueVO() { Key = "Model Input Checkbox", Value = "/DrapoPages/ControlFlowModelInputCheckbox.html" });
            menuItems.Add(new KeyValueVO() { Key = "Model Input Text", Value = "/DrapoPages/ControlFlowModelInputText.html" });
            menuItems.Add(new KeyValueVO() { Key = "If Select", Value = "/DrapoPages/ControlFlowIfSelect.html" });
            return (menuItems);
        }

        [HttpGet]
        public List<KeyValueVO> GetData(int start = 0, int length = 10000, int? max = null)
        {
            List<KeyValueVO> dictionary = new List<KeyValueVO>();
            for (int i = start; (i < (start + length)) && ((!max.HasValue) || (i < max)); i++)
                dictionary.Add(new KeyValueVO() { Key = string.Format("K{0}", i.ToString()), Value = string.Format("V{0}", i.ToString()), Visible = (i % 2 == 0) });
            return (dictionary);
        }

        [HttpGet]
        public Dictionary<string, string> GetCulture()
        {
            return (GetCultureData());
        }

        [HttpPost]
        public Dictionary<string, string> GetCulture([FromBody] List<string> keys)
        {
            return (GetCultureData(keys));
        }

        public Dictionary<string, string> GetCultureData(List<string> keys = null)
        {
            Dictionary<string, string> values = new Dictionary<string, string>();
            Dictionary<string, string> dictionary = this.GetCulturePT();
            if ((keys == null) || (keys.Count == 0))
                return (dictionary);
            foreach (string key in keys)
                if (dictionary.ContainsKey(key))
                    values.Add(key, dictionary[key]);
            return (values);
        }

        private Dictionary<string, string> GetCulturePT()
        {
            Dictionary<string, string> values = new Dictionary<string, string>();
            values.Add("User", "Usuário");
            values.Add("Name", "Nome");
            values.Add("Date", "Data");
            for (int i = 0; i < 10; i++)
                values.Add(i.ToString(), i.ToString());
            return (values);
        }

        [HttpGet]
        public DataVM GetFunctionPostDataItem()
        {
            DataVM data = new DataVM();
            data.Name = "1";
            return (data);
        }

        [HttpPost]
        public DataVM SetFunctionPostDataItem([FromBody] DataVM data)
        {
            data.Name += " +1";
            return (data);
        }

        [HttpPost]
        public async Task<DataVM> SetFunctionPostDataItemSleep([FromBody] DataVM data, [FromQuery] int sleep)
        {
            data.Name += " +1";
            System.Threading.Thread.Sleep(sleep);
            return (await Task.FromResult<DataVM>(data));
        }

        [HttpPost]
        public DataVM SetFunctionPostDataItemError([FromBody] DataVM data)
        {
            throw new Exception("SetFunctionPostDataItemError");
        }

        [HttpPost]
        public DataVM SetFunctionPostDataItemIncremental([FromBody] DataVM data, [FromQuery]long incremental)
        {
            long value = long.Parse(data.Name);
            data.Name = (value + incremental).ToString();
            return (data);
        }

        [HttpGet]
        public List<DataVM> GetFunctionPostDataItems()
        {
            List<DataVM> datas = new List<DataVM>();
            for (int i = 0; i < 10; i++)
                datas.Add(new DataVM() { Code = i, Name = string.Format("Name {0}", i.ToString()) });
            return (datas);
        }

        [HttpGet]
        public IEnumerable<KeyValueVO> GetModelSelectOptionTree()
        {
            List<KeyValueVO> tree = new List<KeyValueVO>();
            for (int i = 0; i < 3; i++)
            {
                KeyValueVO parentNode = new KeyValueVO() { Key = string.Format("Parent {0}", i.ToString()), Value = string.Format("Parent {0}", i.ToString()) };
                for (int j = 0; j < 4; j++)
                {
                    parentNode.Children.Add(new KeyValueVO() { Key = string.Format("Child {0} of {1}", j.ToString(), i.ToString()), Value = string.Format("Child {0} of {1}", j.ToString(), i.ToString()) });
                }
                tree.Add(parentNode);
            }
            return (tree);
        }

        [HttpGet]
        public KeyValueVO GetOptionTreeSelection()
        {
            return new KeyValueVO() { Key = "Child 1 of 0", Value = "Child 1 of 0" };
        }

        [HttpGet]
        public List<DataVM> GetDataError()
        {
            throw new Exception("Error here");
        }

        [HttpGet]
        public List<DateVM> GetDates()
        {
            List<DateVM> dates = new List<DateVM>();
            dates.Add(new DateVM() { Date = new DateTime(1980, 6, 3), Format = "d" });
            dates.Add(new DateVM() { Date = new DateTime(1980, 6, 3), Format = "D" });
            dates.Add(new DateVM() { Date = new DateTime(1980, 6, 3), Format = "r" });
            dates.Add(new DateVM() { Date = new DateTime(1980, 6, 3), Format = "dddd, DD MMM YYYY" });
            dates.Add(new DateVM() { Date = null, Format = "g" });
            return (dates);
        }

        [HttpGet]
        public List<DateObjectVM> GetDatesObject()
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
            dates.Add(new DateObjectVM() { Value = 12345, Format = "N0" });
            return (dates);
        }

        [HttpGet]
        public List<DrapoObject> GetDatesCompare()
        {
            List<DrapoObject> objects = new List<DrapoObject>();
            objects.Add(CreateDataCompare(new DateTime(1980, 6, 3, 0, 0, 0, 0), new DateTime(1980, 6, 3, 0, 0, 0, 50)));
            objects.Add(CreateDataCompare(new DateTime(1980, 6, 3, 0, 0, 0, 0), new DateTime(1980, 6, 3, 0, 0, 25, 0)));
            objects.Add(CreateDataCompare(new DateTime(1980, 6, 3, 0, 0, 0, 0), new DateTime(1980, 6, 3, 0, 3, 0, 0)));
            objects.Add(CreateDataCompare(new DateTime(1980, 6, 3, 0, 0, 0, 0), new DateTime(1980, 6, 3, 2, 0, 0, 0)));
            objects.Add(CreateDataCompare(new DateTime(1980, 6, 3, 0, 0, 0, 0), new DateTime(1980, 6, 4, 0, 0, 0, 0)));
            objects.Add(CreateDataCompare(new DateTime(1980, 6, 3, 0, 0, 0, 0), null));
            objects.Add(CreateDataCompare(new DateTime(1980, 6, 3, 0, 0, 0, 0), new DateTime(1980, 6, 3, 0, 2, 30, 0)));
            objects.Add(CreateDataCompare(new DateTime(1980, 6, 3, 0, 0, 0, 0), new DateTime(1980, 6, 3, 4, 1, 22, 0)));
            return (objects);
        }

        private DrapoObject CreateDataCompare(DateTime dateStart, DateTime? dateEnd)
        {
            DrapoObject obj = new DrapoObject();
            obj.Properties.Add("start", dateStart);
            obj.Properties.Add("end", dateEnd);
            return (obj);
        }

        [HttpGet]
        public List<long> GetLargeNumbers()
        {
            List<long> values = new List<long>();
            values.Add(12);
            values.Add(1_200);
            values.Add(12_000_000);
            values.Add(12_300_000);
            values.Add(2_000_000_000);
            values.Add(8_000_000_000_000);
            return (values);
        }

        [HttpGet]
        public List<Dictionary<string, string>> GetFields()
        {
            List<Dictionary<string, string>> fields = new List<Dictionary<string, string>>();
            fields.Add(new Dictionary<string, string>()
            {
                { "Name", "Value" }
            });
            return fields;
        }

        [HttpGet]
        public TabsVM GetTabs()
        {
            TabsVM tabs = new TabsVM();
            tabs.TabIndex = 1;
            for (int i = 0; i < 4; i++)
                tabs.Tabs.Add(this.CreateTab(string.Format("Tab{0}", i.ToString())));
            return (tabs);
        }

        private TabVM CreateTab(string name)
        {
            TabVM tab = new TabVM();
            tab.Name = name;
            tab.Items = new List<KeyValueVO>(GetLevels(2, 2, true, name));
            return (tab);
        }

        [HttpGet]
        public DrapoObject GetObjectSizes()
        {
            DrapoObject objectSizes = new DrapoObject();
            List<DrapoObject> sizes = new List<DrapoObject>();
            sizes.Add(CreateSize(2));
            sizes.Add(CreateSize(3));
            sizes.Add(CreateSize(4));
            objectSizes.Properties.Add("Sizes", sizes);
            return (objectSizes);
        }

        private DrapoObject CreateSize(long? value)
        {
            DrapoObject size = new DrapoObject();
            size.Properties.Add("Value", value);
            return (size);
        }

        [HttpGet]
        public DrapoObject GetObjectSizeOptions()
        {
            DrapoObject objectSizeOptions = new DrapoObject();
            List<DrapoObject> sizeOption = new List<DrapoObject>();
            for (int i = 1; i < 10; i++)
                sizeOption.Add(CreateSizeOption(i.ToString(), i));
            objectSizeOptions.Properties.Add("Options", sizeOption);
            return (objectSizeOptions);
        }

        private DrapoObject CreateSizeOption(string name, long? code)
        {
            DrapoObject size = new DrapoObject();
            size.Properties.Add("Name", name);
            size.Properties.Add("Code", code);
            return (size);
        }

        [HttpGet]
        public ActionResult GetRequest(bool isBadRequest)
        {
            if (isBadRequest)
                return (BadRequest(400));
            return (Ok(200));
        }

        [HttpGet]
        public ActionResult GetContent(string v1 = null, string v2 = null, string v3 = null)
        {
            if ((!string.IsNullOrEmpty(v1)) && (v1.Contains("{{")))
                return (BadRequest());
            string content = string.Format("<div><span>v1 = {0}</span><br><span>v2 = {1}</span><br><span>v3 = {2}</span><br></div>", v1 ?? string.Empty, v2 ?? string.Empty, v3 ?? string.Empty);
            Response.StatusCode = 200;
            Response.Headers.Add("Content-Type", new[] { "text/html" });
            return Content(content);
        }

        [HttpPost]
        public DrapoObject GetCookieValues([FromBody] Dictionary<string, string> values, bool useHeaders = false)
        {
            DrapoObject result = new DrapoObject();
            if (values != null)
            {
                foreach (KeyValuePair<string, string> entry in values)
                    result.Properties.Add(entry.Key, entry.Value);
            }
            if (useHeaders)
            {
                foreach (var header in this.Request.Headers)
                {
                    if (header.Key.Contains("Custom"))
                        result.Properties.Add(header.Key, header.Value.ToString());
                }
            }
            return (result);
        }

        [HttpGet]
        public IEnumerable<KeyValueVO> GetHeadersJoin([FromHeader] string item = null, [FromHeader] string list1 = null, [FromHeader] string list2 = null)
        {
            List<KeyValueVO> list = new List<KeyValueVO>();
            KeyValueVO itemObject = DrapoConverter.DeserializeObject<KeyValueVO>(item);
            if (itemObject != null)
                list.Add(itemObject);
            List<KeyValueVO> list1Object = DrapoConverter.DeserializeObject<List<KeyValueVO>>(list1);
            if (list1Object != null)
                list.AddRange(list1Object);
            List<KeyValueVO> list2Object = list2 != null ? DrapoConverter.DeserializeObject<List<KeyValueVO>>(list2) : null;
            if (list2Object != null)
                list.AddRange(list2Object);
            return (list);
        }

        [HttpPost]
        public IEnumerable<KeyValueVO> SetHeadersJoin([FromBody] List<KeyValueVO> list, [FromHeader] string list1 = null, [FromHeader] string list2 = null)
        {
            if (list == null)
                list = new List<KeyValueVO>();
            List<KeyValueVO> list1Object = (list1 != null) ? DrapoConverter.DeserializeObject<List<KeyValueVO>>(list1) : null;
            if (list1Object != null)
                list.AddRange(list1Object);
            List<KeyValueVO> list2Object = list2 != null ? DrapoConverter.DeserializeObject<List<KeyValueVO>>(list2) : null;
            if (list2Object != null)
                list.AddRange(list2Object);
            return (list);
        }
        [HttpPost]
        public ActionResult SetLevelsBadRequest([FromBody] List<KeyValueVO> list)
        {
            return (BadRequest());
        }

        [HttpGet]
        public IEnumerable<KeyValueVO> GetBooleansAsString()
        {
            List<KeyValueVO> data = new List<KeyValueVO>();
            for (int i = 0; i < 8; i++)
                data.Add(new KeyValueVO() { Key = (i % 2 == 0).ToString() });
            return (data);
        }

        [HttpGet]
        public ActionResult GetFile(string path, string fileName)
        {
            FileExtensionContentTypeProvider fileProvider = new FileExtensionContentTypeProvider();
            string contentType = "text/html";
            if (fileProvider.TryGetContentType(fileName, out string fileContentType))
                contentType = fileContentType;
            return (File(path, contentType, fileName));
        }

        [HttpGet]
        public Dictionary<string, List<KeyValueVO>> GetDictionary()
        {
            Dictionary<string, List<KeyValueVO>> dictionary = new Dictionary<string, List<KeyValueVO>>();
            InsertDictionary(dictionary, "Thiago");
            InsertDictionary(dictionary, "Henrique");
            InsertDictionary(dictionary, "da");
            InsertDictionary(dictionary, "Silva");
            return (dictionary);
        }

        private void InsertDictionary(Dictionary<string, List<KeyValueVO>> dictionary, string value)
        {
            List<KeyValueVO> values = new List<KeyValueVO>();
            for (int i = 0; i < value.Length; i++)
                values.Add(new KeyValueVO() { Key = $"K{value[i]}", Value = $"V{value[i]}" });
            dictionary.Add(value, values);
        }
    }
}
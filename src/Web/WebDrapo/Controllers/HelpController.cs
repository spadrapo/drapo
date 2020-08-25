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
    public class HelpController : Controller
    {
        [HttpGet]
        public IEnumerable<KeyValueVO> Index()
        {
            List<KeyValueVO> dictionary = new List<KeyValueVO>();
            dictionary.Add(new KeyValueVO() { Key = "sector", Value = "Sectors", Children = GetSectorTags()});
            dictionary.Add(new KeyValueVO() { Key = "sector", Value = "Data Handlers", Children = GetDataTags() });
            dictionary.Add(new KeyValueVO() { Key = "sector", Value = "Statements", Children = GetStatementTags() });
            dictionary.Add(new KeyValueVO() { Key = "sector", Value = "Configurations", Children = GetConfigurationTags() });
            dictionary.Add(new KeyValueVO() { Key = "sector", Value = "Events", Children = GetEventTags() });
            dictionary.Add(new KeyValueVO() { Key = "sector", Value = "CSS Handlers", Children = GetCSSTags() });
            return dictionary;
        }

        private List<KeyValueVO> GetSectorTags()
        {
            List<KeyValueVO> sectorTags = new List<KeyValueVO>();
            sectorTags.Add(new KeyValueVO() { Key = "d-sector", Value = "Name of a sector that is contained by another sector" });
            sectorTags.Add(new KeyValueVO() { Key = "d-sector-url", Value = "Relative path to a page that is contained by another page" });
            sectorTags.Add(new KeyValueVO() { Key = "d-sector-parent", Value = "Name of a sector that contains other sector" });
            sectorTags.Add(new KeyValueVO() { Key = "d-sector-parent-url", Value = "Relative path to a page that contains other page" });
            sectorTags.Add(new KeyValueVO() { Key = "d-route", Value = "True by default, indicates whether or not to use routing features" });
            return sectorTags;
        }

        private List<KeyValueVO> GetDataTags()
        {
            List<KeyValueVO> dataTags = new List<KeyValueVO>();
            dataTags.Add(new KeyValueVO() { Key = "d-dataKey", Value = "Data identifier" });
            dataTags.Add(new KeyValueVO() { Key = "d-dataUrlGet", Value = "GET method that will return data associated with d-dataKey" });
            dataTags.Add(new KeyValueVO() { Key = "d-dataUrlSet", Value = "POST method that will be called on d-dataKey updates" });
            dataTags.Add(new KeyValueVO() { Key = "d-dataType=\"object\"", Value = "Indicates that d-dataKey is a object created on client side" });
            dataTags.Add(new KeyValueVO() { Key = "d-dataType=\"array\"", Value = "Indicates that d-dataKey is an array of objects created on client side" });
            dataTags.Add(new KeyValueVO() { Key = "d-dataType=\"value\"", Value = "Indicates that d-dataKey is a primitive object created on client side" });
            dataTags.Add(new KeyValueVO() { Key = "d-dataValue", Value = "Value of a d-dataType identifier value typed"});
            dataTags.Add(new KeyValueVO() { Key = "d-model", Value = "Indicates that d-dataKey is an object binded to server side" });
            dataTags.Add(new KeyValueVO() { Key = "d-dataProperty-<name>", Value = "Name of a property inside object defined by d-dataType" });
            dataTags.Add(new KeyValueVO() { Key = "d-attr-<name>", Value = "Value of object property d-dataProperty-<name>" });
            dataTags.Add(new KeyValueVO() { Key = "d-dataProperty-<name>-name", Value = "Name of a property inside object defined by d-dataType" });
            dataTags.Add(new KeyValueVO() { Key = "d-dataProperty-<name>-value", Value = "Value of a property inside object defined by d-dataType" });
            dataTags.Add(new KeyValueVO() { Key = "d-dataLazy", Value = "When set to true, data will be loaded in increments" });
            dataTags.Add(new KeyValueVO() { Key = "d-dataLazyStart", Value = "Start index of data item" });
            dataTags.Add(new KeyValueVO() { Key = "d-dataLazyIncrement", Value = "Quantity of data items to be loaded at each increment" });
            dataTags.Add(new KeyValueVO() { Key = "d-dataDelay", Value = "When set to true, loads properties individually instead of the whole object" });
            dataTags.Add(new KeyValueVO() { Key = "d-dataUnitOfWork", Value = "When set to true, d-dataKey object will be treated as DataSet" });
            return dataTags;
        }

        private List<KeyValueVO> GetStatementTags()
        {
            List<KeyValueVO> statementTags = new List<KeyValueVO>();
            statementTags.Add(new KeyValueVO() { Key = "d-for", Value = "Same behavior as \"foreach\""});
            statementTags.Add(new KeyValueVO() { Key = "d-if", Value = "Same behavior as \"if\"" });
            return statementTags;
        }

        private List<KeyValueVO> GetConfigurationTags()
        {
            List<KeyValueVO> configurationTags = new List<KeyValueVO>();
            configurationTags.Add(new KeyValueVO() { Key = "d-dataConfigGet", Value = "Object to access configuration items" });
            configurationTags.Add(new KeyValueVO() { Key = "d-dataCookieGet", Value = "Object to access cookie items" });
            return configurationTags;
        }
        
        private List<KeyValueVO> GetEventTags()
        {
            List<KeyValueVO> eventTags = new List<KeyValueVO>();
            eventTags.Add(new KeyValueVO() { Key = "d-model-event", Value = "Changes d-model event" });
            eventTags.Add(new KeyValueVO() { Key = "d-on-click", Value = "Functions to be called by OnClick events" });
            eventTags.Add(new KeyValueVO() { Key = "d-on-change", Value = "Functions to be called by OnChange events" });
            eventTags.Add(new KeyValueVO() { Key = "d-on-keyup-enter", Value = "Functions to be called by KeyUp events when key is Enter" });
            eventTags.Add(new KeyValueVO() { Key = "d-on-dblclick", Value = "Functions to be called by DoubleClick events" });
            eventTags.Add(new KeyValueVO() { Key = "d-on-blur", Value = "Functions to be called by OnBlur events" });
            return eventTags;
        }

        private List<KeyValueVO> GetCSSTags()
        {
            List<KeyValueVO> cssTags = new List<KeyValueVO>();
            cssTags.Add(new KeyValueVO() { Key = "d-class", Value = "Changes element css selector" });
            return cssTags;
        }

        [HttpGet]
        public string FindTag(string key)
        {
            List<KeyValueVO> tags = (List<KeyValueVO>)Index();
            foreach (KeyValueVO tag in tags)
            {
                if (tag.Key == key)
                    return tag.Value;
                string childValue = FindTagInChildren(key, tag.Children);
                if (childValue != null)
                    return childValue;
            }
            return null;
        }
        private string FindTagInChildren(string key, List<KeyValueVO> children)
        {
            foreach (KeyValueVO tag in children)
            {
                if (tag.Key == key)
                    return tag.Value;
                string childValue = FindTagInChildren(key, tag.Children);
                if (childValue != null)
                    return childValue;
            }
            return null;
        }
        [HttpGet]
        public string GetUsage(string key)
        {
            if (key == "d-model-event")
                return "<input class=\"edit\" type=\"text\" d-model=\"{{todo.Task}}\" d-model-event=\"blur\" d-on-blur=\"UncheckItemField({{todo.Edit}},false)\">";
            else if (key == "d-on-click")
                return "<input type=\"button\" value=\"Talk\" d-on-click=\"AddDataItem(chats, user, false); PostData(chats)\"/>";
            else if (key == "d-on-change")
                return "<select d-model=\"{{drapo.theme}}\" d-on-change=\"PostData(drapo); ReloadPage()\">";
            else if (key == "d-on-keyup-enter")
                return "<input type=\"text\" class=\"new- todo\"  d-model=\"{{taskAdd.Task}}\" d-on-keyup-enter=\"AddDataItem(todos, taskAdd); ClearDataField(taskAdd, Task)\">";
            else if (key == "d-on-dblclick")
                return "<label d-on-dblclick=\"CheckItemField({{todo.Edit}})\">\"Text\"</label>";
            else if (key == "d-on-blur")
                return "<input class=\"edit\" type=\"text\" d-model=\"{{todo.Task}}\" d-model-event=\"blur\" d-on-blur=\"UncheckItemField({{todo.Edit}},false)\">";
            else if (key == "d-sector")
                return "<div d-sector=\"sector\" d-sector-url=\"/DrapoPages/RouterOne.html\">";
            else if (key == "d-sector-url")
                return "<div d-sector=\"sector\" d-sector-url=\"/DrapoPages/RouterOne.html\">";
            else if (key == "d-sector-parent")
                return "<div d-sector-parent-url=\"/DrapoPages/RouterMaster.html\" d-sector-parent=\"sector\">";
            else if (key == "d-sector-parent-url")
                return "<div d-sector-parent-url=\"/DrapoPages/RouterMaster.html\" d-sector-parent=\"sector\">";
            else if (key == "d-route")
                return "<div d-sector=\"sectorSubMenu\" d-route=\"false\">";
            else if (key == "d-dataKey")
                return "<div d-dataKey=\"users\" d-dataUrlGet=\"/Data/GetIFSample\">";
            else if (key == "d-dataUrlGet")
                return "<div d-dataKey=\"cultures\" d-dataUrlGet=\"/Culture/GetCultures\">";
            else if (key == "d-dataUrlSet")
                return "<div d-dataKey=\"chats\" d-dataUnitOfWork=\"true\" d-dataUrlGet=\"/Chat/Get\" d-dataUrlSet=\"/Chat/Set\">";
            else if (key == "d-dataType=\"object\"")
                return "<div d-dataKey=\"response\" d-dataType=\"object\">";
            else if (key == "d-dataType=\"array\"")
                return "<div d-dataKey=\"list\" d-dataType=\"array\">";
            else if (key == "d-dataType=\"value\"")
                return "<div d-dataKey=\"response\" d-dataType=\"value\" d-dataValue=\"NewValue\">";
            else if (key == "d-dataValue")
                return "<div d-dataKey=\"response\" d-dataType=\"value\" d-dataValue=\"NewValue\">";
            else if (key == "d-model")
                return "<input type=\"text\" d-model=\"{{keyValue.Key}}\"/>";
            else if (key == "d-dataProperty-<name>")
                return "<div d-datakey=\"config\" d-dataType=\"object\" d-dataproperty-showactive=\"true\" d-dataproperty-showcompleted=\"true\">";
            else if (key == "d-attr-<name>")
                return "<input d-attr-placeholder=\"{{res.placeholder}}\" type=\"text\" d-attr-title=\"{{res.Tooltip}} \" placeholder=\"Name here\" title=\"I am a tip !\"/>";
            else if (key == "d-dataProperty-<name>-name")
                return "<div d-datakey=\"keyValue\" d-dataType=\"object\" d-dataproperty-key-name=\"Key\" d-dataproperty-key-value=\"admin\" d-dataurlset=\"/Authentication/Login\">";
            else if (key == "d-dataProperty-<name>-value")
                return "<div d-datakey=\"keyValue\" d-dataType=\"object\" d-dataproperty-key-name=\"Key\" d-dataproperty-key-value=\"admin\" d-dataurlset=\"/Authentication/Login\">";
            else if (key == "d-dataLazy")
                return "< div d-dataKey = \"users\" d-dataLazy = \"true\" d-dataLazyStart = \"0\" d-dataLazyIncrement = \"100\" d - dataUrlGet = \"/Data/GetData\"> ";
            else if (key == "d-dataLazyStart")
                return "< div d-dataKey = \"users\" d-dataLazy = \"true\" d-dataLazyStart = \"0\" d-dataLazyIncrement = \"100\" d - dataUrlGet = \"/Data/GetData\"> ";
            else if (key == "d-dataLazyIncrement")
                return "< div d-dataKey = \"users\" d-dataLazy = \"true\" d-dataLazyStart = \"0\" d-dataLazyIncrement = \"100\" d - dataUrlGet = \"/Data/GetData\"> ";
            else if (key == "d-dataDelay")
                return "<div d-dataKey=\"culture\" d-dataDelay=\"true\" d-dataUrlGet=\"/Data/GetCulture\">";
            else if (key == "d-dataUnitOfWork")
                return "<div d-dataKey=\"chats\" d-dataUnitOfWork=\"true\" d-dataUrlGet=\"/Chat/Get\" d-dataUrlSet=\"/Chat/Set\">";
            else if (key == "d-for")
                return "<div d-for=\"user in users\">";
            else if (key == "d-if")
                return "<option d-for=\"user in users\" d-if=\"{{user.Visible}}\" value=\"{{user.Key}}\">";
            else if (key == "d-dataConfigGet")
                return "<div d-dataKey=\"views\" d-dataConfigGet=\"Views\">";
            else if (key == "d-dataCookieGet")
                return "<div d-dataKey=\"drapo\" d-dataCookieGet=\"drapo\">";
            return "";
        }

        [HttpGet]
        public IEnumerable<KeyValueVO> GetRelatedTags(string key)
        {
            List<KeyValueVO> relatedTags = new List<KeyValueVO>();

            if (key == "d-model-event")
            {
                relatedTags.Add(new KeyValueVO() { Key = "d-on-click", Value = "Functions to be called by OnClick events" });
                relatedTags.Add(new KeyValueVO() { Key = "d-on-change", Value = "Functions to be called by OnChange events" });
                relatedTags.Add(new KeyValueVO() { Key = "d-on-keyup-enter", Value = "Functions to be called by KeyUp events when key is Enter" });
                relatedTags.Add(new KeyValueVO() { Key = "d-on-dblclick", Value = "Functions to be called by DoubleClick events" });
                relatedTags.Add(new KeyValueVO() { Key = "d-on-blur", Value = "Functions to be called by OnBlur events" });
            }
            else if (key == "d-on-click")
            {
                relatedTags.Add(new KeyValueVO() { Key = "d-model-event", Value = "Changes d-model event" });
                relatedTags.Add(new KeyValueVO() { Key = "d-on-change", Value = "Functions to be called by OnChange events" });
                relatedTags.Add(new KeyValueVO() { Key = "d-on-keyup-enter", Value = "Functions to be called by KeyUp events when key is Enter" });
                relatedTags.Add(new KeyValueVO() { Key = "d-on-dblclick", Value = "Functions to be called by DoubleClick events" });
                relatedTags.Add(new KeyValueVO() { Key = "d-on-blur", Value = "Functions to be called by OnBlur events" });
            }
            else if (key == "d-on-change")
            {
                relatedTags.Add(new KeyValueVO() { Key = "d-model-event", Value = "Changes d-model event" });
                relatedTags.Add(new KeyValueVO() { Key = "d-on-click", Value = "Functions to be called by OnClick events" });
                relatedTags.Add(new KeyValueVO() { Key = "d-on-keyup-enter", Value = "Functions to be called by KeyUp events when key is Enter" });
                relatedTags.Add(new KeyValueVO() { Key = "d-on-dblclick", Value = "Functions to be called by DoubleClick events" });
                relatedTags.Add(new KeyValueVO() { Key = "d-on-blur", Value = "Functions to be called by OnBlur events" });
            }
            else if (key == "d-on-keyup-enter")
            {
                relatedTags.Add(new KeyValueVO() { Key = "d-model-event", Value = "Changes d-model event" });
                relatedTags.Add(new KeyValueVO() { Key = "d-on-click", Value = "Functions to be called by OnClick events" });
                relatedTags.Add(new KeyValueVO() { Key = "d-on-change", Value = "Functions to be called by OnChange events" });
                relatedTags.Add(new KeyValueVO() { Key = "d-on-dblclick", Value = "Functions to be called by DoubleClick events" });
                relatedTags.Add(new KeyValueVO() { Key = "d-on-blur", Value = "Functions to be called by OnBlur events" });
            }
            else if (key == "d-on-dblclick")
            {
                relatedTags.Add(new KeyValueVO() { Key = "d-model-event", Value = "Changes d-model event" });
                relatedTags.Add(new KeyValueVO() { Key = "d-on-click", Value = "Functions to be called by OnClick events" });
                relatedTags.Add(new KeyValueVO() { Key = "d-on-change", Value = "Functions to be called by OnChange events" });
                relatedTags.Add(new KeyValueVO() { Key = "d-on-keyup-enter", Value = "Functions to be called by KeyUp events when key is Enter" });
                relatedTags.Add(new KeyValueVO() { Key = "d-on-blur", Value = "Functions to be called by OnBlur events" });
            }
            else if (key == "d-on-blur")
            {
                relatedTags.Add(new KeyValueVO() { Key = "d-model-event", Value = "Changes d-model event" });
                relatedTags.Add(new KeyValueVO() { Key = "d-on-click", Value = "Functions to be called by OnClick events" });
                relatedTags.Add(new KeyValueVO() { Key = "d-on-change", Value = "Functions to be called by OnChange events" });
                relatedTags.Add(new KeyValueVO() { Key = "d-on-keyup-enter", Value = "Functions to be called by KeyUp events when key is Enter" });
                relatedTags.Add(new KeyValueVO() { Key = "d-on-dblclick", Value = "Functions to be called by DoubleClick events" });
            }
            else if (key == "d-sector")
            {
                relatedTags.Add(new KeyValueVO() { Key = "d-sector-url", Value = "Relative path to a page that is contained by another page" });
            }
            else if (key == "d-sector-url")
            {
                relatedTags.Add(new KeyValueVO() { Key = "d-sector", Value = "Name of a sector that is contained by another sector" });
                relatedTags.Add(new KeyValueVO() { Key = "d-route", Value = "True by default, indicates whether or not to use routing features" });
            }
            else if (key == "d-sector-parent")
            {
                relatedTags.Add(new KeyValueVO() { Key = "d-sector-parent-url", Value = "Relative path to a page that contains other page" });
            }
            else if (key == "d-sector-parent-url")
            {
                relatedTags.Add(new KeyValueVO() { Key = "d-sector-parent", Value = "Name of a sector that contains other sector" });
                relatedTags.Add(new KeyValueVO() { Key = "d-route", Value = "True by default, indicates whether or not to use routing features" });
            }
            else if (key == "d-route")
            {
                relatedTags.Add(new KeyValueVO() { Key = "d-sector-parent-url", Value = "Relative path to a page that contains other page" });
                relatedTags.Add(new KeyValueVO() { Key = "d-sector", Value = "Name of a sector that is contained by another sector" });

            }
            else if (key == "d-dataKey")
            {
                relatedTags.Add(new KeyValueVO() { Key = "d-dataUrlGet", Value = "GET method that will return data associated with d-dataKey" });
                relatedTags.Add(new KeyValueVO() { Key = "d-dataUrlSet", Value = "POST method that will be called on d-dataKey updates" });
                relatedTags.Add(new KeyValueVO() { Key = "d-dataType=\"object\"", Value = "Indicates that d-dataKey is a object created on client side" });
                relatedTags.Add(new KeyValueVO() { Key = "d-dataType=\"array\"", Value = "Indicates that d-dataKey is an array of objects created on client side" });
                relatedTags.Add(new KeyValueVO() { Key = "d-dataType=\"value\"", Value = "Indicates that d-dataKey is a primitive object created on client side" });
                relatedTags.Add(new KeyValueVO() { Key = "d-dataValue", Value = "Value of a d-dataType identifier value typed" });
                relatedTags.Add(new KeyValueVO() { Key = "d-model", Value = "Indicates that d-dataKey is an object binded to server side" });
                relatedTags.Add(new KeyValueVO() { Key = "d-dataUnitOfWork", Value = "When set to true, d-dataKey object will be treated as DataSet" });
            }
            else if (key == "d-dataUrlGet")
            {
                relatedTags.Add(new KeyValueVO() { Key = "d-dataKey", Value = "Data identifier" });
                relatedTags.Add(new KeyValueVO() { Key = "d-dataUrlSet", Value = "POST method that will be called on d-dataKey updates" });
                relatedTags.Add(new KeyValueVO() { Key = "d-model", Value = "Indicates that d-dataKey is an object binded to server side" });
            }
            else if (key == "d-dataUrlSet")
            {
                relatedTags.Add(new KeyValueVO() { Key = "d-dataKey", Value = "Data identifier" });
                relatedTags.Add(new KeyValueVO() { Key = "d-dataUrlGet", Value = "GET method that will return data associated with d-dataKey" });
                relatedTags.Add(new KeyValueVO() { Key = "d-model", Value = "Indicates that d-dataKey is an object binded to server side" });


            }
            else if (key == "d-dataType=\"object\"")
            {
                relatedTags.Add(new KeyValueVO() { Key = "d-dataKey", Value = "Data identifier" });
                relatedTags.Add(new KeyValueVO() { Key = "d-dataType=\"array\"", Value = "Indicates that d-dataKey is an array of objects created on client side" });
                relatedTags.Add(new KeyValueVO() { Key = "d-dataType=\"value\"", Value = "Indicates that d-dataKey is a primitive object created on client side" });
                relatedTags.Add(new KeyValueVO() { Key = "d-dataValue", Value = "Value of a d-dataType identifier value typed" });
                relatedTags.Add(new KeyValueVO() { Key = "d-model", Value = "Indicates that d-dataKey is an object binded to server side" });
            }
            else if (key == "d-dataType=\"array\"")
            {
                relatedTags.Add(new KeyValueVO() { Key = "d-dataKey", Value = "Data identifier" });
                relatedTags.Add(new KeyValueVO() { Key = "d-dataType=\"object\"", Value = "Indicates that d-dataKey is a object created on client side" });
                relatedTags.Add(new KeyValueVO() { Key = "d-dataType=\"value\"", Value = "Indicates that d-dataKey is a primitive object created on client side" });
                relatedTags.Add(new KeyValueVO() { Key = "d-dataValue", Value = "Value of a d-dataType identifier value typed" });
                relatedTags.Add(new KeyValueVO() { Key = "d-model", Value = "Indicates that d-dataKey is an object binded to server side" });
            }
            else if (key == "d-dataType=\"value\"")
            {
                relatedTags.Add(new KeyValueVO() { Key = "d-dataKey", Value = "Data identifier" });
                relatedTags.Add(new KeyValueVO() { Key = "d-dataType=\"object\"", Value = "Indicates that d-dataKey is a object created on client side" });
                relatedTags.Add(new KeyValueVO() { Key = "d-dataType=\"array\"", Value = "Indicates that d-dataKey is an array of objects created on client side" });
                relatedTags.Add(new KeyValueVO() { Key = "d-model", Value = "Indicates that d-dataKey is an object binded to server side" });
            }
            else if (key == "d-dataValue")
            {
                relatedTags.Add(new KeyValueVO() { Key = "d-dataKey", Value = "Data identifier" });
                relatedTags.Add(new KeyValueVO() { Key = "d-dataType=\"object\"", Value = "Indicates that d-dataKey is a object created on client side" });
                relatedTags.Add(new KeyValueVO() { Key = "d-dataType=\"array\"", Value = "Indicates that d-dataKey is an array of objects created on client side" });
                relatedTags.Add(new KeyValueVO() { Key = "d-dataType=\"value\"", Value = "Indicates that d-dataKey is a primitive object created on client side" });
                relatedTags.Add(new KeyValueVO() { Key = "d-model", Value = "Indicates that d-dataKey is an object binded to server side" });
            }
            else if (key == "d-model")
            {
                relatedTags.Add(new KeyValueVO() { Key = "d-dataKey", Value = "Data identifier" });
                relatedTags.Add(new KeyValueVO() { Key = "d-dataValue", Value = "Value of a d-dataType identifier value typed" });

            }
            else if (key == "d-dataProperty-<name>")
            {
                relatedTags.Add(new KeyValueVO() { Key = "d-dataKey", Value = "Data identifier" });
                relatedTags.Add(new KeyValueVO() { Key = "d-dataType=\"object\"", Value = "Indicates that d-dataKey is a object created on client side" });
                relatedTags.Add(new KeyValueVO() { Key = "d-dataType=\"array\"", Value = "Indicates that d-dataKey is an array of objects created on client side" });
                relatedTags.Add(new KeyValueVO() { Key = "d-dataType=\"value\"", Value = "Indicates that d-dataKey is a primitive object created on client side" });
                relatedTags.Add(new KeyValueVO() { Key = "d-attr-<name>", Value = "Value of object property d-dataProperty-<name>" });
                relatedTags.Add(new KeyValueVO() { Key = "d-dataProperty-<name>-name", Value = "Name of a property inside object defined by d-dataType" });
                relatedTags.Add(new KeyValueVO() { Key = "d-dataProperty-<name>-value", Value = "Value of a property inside object defined by d-dataType" });
            }
            else if (key == "d-attr-<name>")
            {
                relatedTags.Add(new KeyValueVO() { Key = "d-dataKey", Value = "Data identifier" });
                relatedTags.Add(new KeyValueVO() { Key = "d-dataType=\"object\"", Value = "Indicates that d-dataKey is a object created on client side" });
                relatedTags.Add(new KeyValueVO() { Key = "d-dataType=\"array\"", Value = "Indicates that d-dataKey is an array of objects created on client side" });
                relatedTags.Add(new KeyValueVO() { Key = "d-dataType=\"value\"", Value = "Indicates that d-dataKey is a primitive object created on client side" });
                relatedTags.Add(new KeyValueVO() { Key = "d-dataProperty-<name>", Value = "Name of a property inside object defined by d-dataType" });
                relatedTags.Add(new KeyValueVO() { Key = "d-dataProperty-<name>-name", Value = "Name of a property inside object defined by d-dataType" });
                relatedTags.Add(new KeyValueVO() { Key = "d-dataProperty-<name>-value", Value = "Value of a property inside object defined by d-dataType" });
            }
            else if (key == "d-dataProperty-<name>-name")
            {
                relatedTags.Add(new KeyValueVO() { Key = "d-dataKey", Value = "Data identifier" });
                relatedTags.Add(new KeyValueVO() { Key = "d-dataType=\"object\"", Value = "Indicates that d-dataKey is a object created on client side" });
                relatedTags.Add(new KeyValueVO() { Key = "d-dataType=\"array\"", Value = "Indicates that d-dataKey is an array of objects created on client side" });
                relatedTags.Add(new KeyValueVO() { Key = "d-dataType=\"value\"", Value = "Indicates that d-dataKey is a primitive object created on client side" });
                relatedTags.Add(new KeyValueVO() { Key = "d-dataProperty-<name>", Value = "Name of a property inside object defined by d-dataType" });
                relatedTags.Add(new KeyValueVO() { Key = "d-attr-<name>", Value = "Value of object property d-dataProperty-<name>" });
                relatedTags.Add(new KeyValueVO() { Key = "d-dataProperty-<name>-value", Value = "Value of a property inside object defined by d-dataType" });
            }
            else if (key == "d-dataProperty-<name>-value")
            {
                relatedTags.Add(new KeyValueVO() { Key = "d-dataKey", Value = "Data identifier" });
                relatedTags.Add(new KeyValueVO() { Key = "d-dataType=\"object\"", Value = "Indicates that d-dataKey is a object created on client side" });
                relatedTags.Add(new KeyValueVO() { Key = "d-dataType=\"array\"", Value = "Indicates that d-dataKey is an array of objects created on client side" });
                relatedTags.Add(new KeyValueVO() { Key = "d-dataType=\"value\"", Value = "Indicates that d-dataKey is a primitive object created on client side" });
                relatedTags.Add(new KeyValueVO() { Key = "d-dataProperty-<name>", Value = "Name of a property inside object defined by d-dataType" });
                relatedTags.Add(new KeyValueVO() { Key = "d-attr-<name>", Value = "Value of object property d-dataProperty-<name>" });
                relatedTags.Add(new KeyValueVO() { Key = "d-dataProperty-<name>-name", Value = "Name of a property inside object defined by d-dataType" });
                relatedTags.Add(new KeyValueVO() { Key = "d-dataLazy", Value = "When set to true, data will be loaded in increments" });
            }
            else if (key == "d-dataLazy")
            {
                relatedTags.Add(new KeyValueVO() { Key = "d-dataLazyStart", Value = "Start index of data item" });
                relatedTags.Add(new KeyValueVO() { Key = "d-dataLazyIncrement", Value = "Quantity of data items to be loaded at each increment" });
                relatedTags.Add(new KeyValueVO() { Key = "d-dataDelay", Value = "When set to true, loads properties individually instead of the whole object" });
                relatedTags.Add(new KeyValueVO() { Key = "d-dataUnitOfWork", Value = "When set to true, d-dataKey object will be treated as DataSet" });
            }
            else if (key == "d-dataLazyStart")
            {
                relatedTags.Add(new KeyValueVO() { Key = "d-dataLazy", Value = "When set to true, data will be loaded in increments" });
                relatedTags.Add(new KeyValueVO() { Key = "d-dataLazyIncrement", Value = "Quantity of data items to be loaded at each increment" });
                relatedTags.Add(new KeyValueVO() { Key = "d-dataDelay", Value = "When set to true, loads properties individually instead of the whole object" });
                relatedTags.Add(new KeyValueVO() { Key = "d-dataUnitOfWork", Value = "When set to true, d-dataKey object will be treated as DataSet" });
            }
            else if (key == "d-dataLazyIncrement")
            {
                relatedTags.Add(new KeyValueVO() { Key = "d-dataLazy", Value = "When set to true, data will be loaded in increments" });
                relatedTags.Add(new KeyValueVO() { Key = "d-dataLazyStart", Value = "Start index of data item" });
                relatedTags.Add(new KeyValueVO() { Key = "d-dataDelay", Value = "When set to true, loads properties individually instead of the whole object" });
                relatedTags.Add(new KeyValueVO() { Key = "d-dataUnitOfWork", Value = "When set to true, d-dataKey object will be treated as DataSet" });
            }
            else if (key == "d-dataDelay")
            {
                relatedTags.Add(new KeyValueVO() { Key = "d-dataLazy", Value = "When set to true, data will be loaded in increments" });
                relatedTags.Add(new KeyValueVO() { Key = "d-dataLazyStart", Value = "Start index of data item" });
                relatedTags.Add(new KeyValueVO() { Key = "d-dataLazyIncrement", Value = "Quantity of data items to be loaded at each increment" });
                relatedTags.Add(new KeyValueVO() { Key = "d-dataUnitOfWork", Value = "When set to true, d-dataKey object will be treated as DataSet" });
            }
            else if (key == "d-dataUnitOfWork")
            {
                relatedTags.Add(new KeyValueVO() { Key = "d-dataKey", Value = "Data identifier" });
            }
            else if (key == "d-for")
            {
                relatedTags.Add(new KeyValueVO() { Key = "d-if", Value = "Same behavior as \"if\"" });
            }
            else if (key == "d-if")
            {
                relatedTags.Add(new KeyValueVO() { Key = "d-for", Value = "Same behavior as \"foreach\"" });
            }
            else if (key == "d-dataConfigGet")
            {
                relatedTags.Add(new KeyValueVO() { Key = "d-dataCookieGet", Value = "Object to access cookie items" });
            }
            else if (key == "d-dataCookieGet")
            {
                relatedTags.Add(new KeyValueVO() { Key = "d-dataConfigGet", Value = "Object to access configuration items" });
            }
            return relatedTags;

        }
        [HttpGet]
        public KeyValueVO GetSelectedTag()
        {
            KeyValueVO selectedTag = new KeyValueVO() { Key = "d-on-click", Value = "Functions to be called by OnClick events" };
            return selectedTag;

        }

    }
}

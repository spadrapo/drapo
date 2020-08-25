using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebDrapo.Model;
using Newtonsoft.Json.Linq;
using Microsoft.AspNetCore.Authorization;
using Sysphera.Middleware.Drapo.Pipe;

namespace WebDrapo.Controllers
{
    [AllowAnonymous]
    public class ChatController : Controller
    {
        private IDrapoPlumber _plumber;
        public ChatController(IDrapoPlumber plumber)
        {
            this._plumber = plumber;
        }
        private static List<ChatVM> _data = Create();
        public IActionResult Index()
        {
            return View();
        }

        public static List<ChatVM> Create()
        {
            List<ChatVM> chats = new List<ChatVM>();
            return (chats);
        }

        [HttpGet]
        public List<ChatVM> Get()
        {
            return (_data);
        }

        [HttpPost]
        public List<ChatVM> Set([FromBody] JObject data)
        {
            bool updated = false;
            //Inserted
            if (data["inserted"] != null)
            {
                List<ChatVM> inserted = data["inserted"].ToObject<List<ChatVM>>();
                if (inserted != null)
                {
                    foreach (ChatVM insert in inserted)
                    {
                        insert.Code = Guid.NewGuid();
                        insert.Date = DateTime.Now;
                        _data.Add(insert);
                        updated = true;
                    }
                }
            }
            //Deleted
            if (data["deleted"] != null)
            {
                List<ChatVM> deleted = data["deleted"].ToObject<List<ChatVM>>();
                if (deleted != null)
                {
                    foreach (ChatVM delete in deleted)
                    {
                        for (int i = 0; i < _data.Count; i++)
                        {
                            ChatVM item = _data[i];
                            if (item.Code != delete.Code)
                                continue;
                            _data.RemoveAt(i);
                            updated = true;
                            break;
                        }
                    }
                }
            }
            if (updated)
                _plumber.Send(new DrapoPipeMessage() { Data = "chat" });
            return (_data);
        }
    }
}
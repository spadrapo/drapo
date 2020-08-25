using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebDrapo.Model;
using Newtonsoft.Json.Linq;
using Microsoft.AspNetCore.Authorization;
using Sysphera.Middleware.Drapo.Pipe;
using Sysphera.Middleware.Drapo;

namespace WebDrapo.Controllers
{
    [AllowAnonymous]
    public class TodoController : Controller
    {
        private IDrapoPlumber _plumber;
        private static List<TodoVM> _data = Create();

        public TodoController(IDrapoPlumber plumber)
        {
            this._plumber = plumber;
        }

        public IActionResult Index()
        {
            return View();
        }

        public static List<TodoVM> Create()
        {
            List<TodoVM> chats = new List<TodoVM>();
            return (chats);
        }

        [HttpGet]
        public List<TodoVM> Get()
        {
            return (_data);
        }

        [HttpPost]
        public List<TodoVM> Set([FromBody] DrapoUnitOfWork<TodoVM> entity)
        {
            bool isUpdated = false;
            if (entity.Entities != null)
            {
                foreach (TodoVM insert in entity.Entities)
                {
                    if(insert.Code == null)
                        insert.Code = Guid.NewGuid();
                }
                isUpdated = true;
                _data = entity.Entities;
            }
            else
            {
                //Inserted
                if (entity.Inserted != null)
                {
                    List<TodoVM> inserted = entity.Inserted;
                    if (inserted != null)
                    {
                        foreach (TodoVM insert in inserted)
                        {
                            insert.Code = Guid.NewGuid();
                            _data.Add(insert);
                        }
                        isUpdated = true;
                    }
                }
                //Updated
                if (entity.Updated != null)
                {
                    List<TodoVM> updated = entity.Updated;
                    if (updated != null)
                    {
                        foreach (TodoVM update in updated)
                        {
                            for (int i = 0; i < _data.Count; i++)
                            {
                                TodoVM item = _data[i];
                                if (item.Code != update.Code)
                                    continue;
                                _data[i] = update;
                                isUpdated = true;
                                break;
                            }
                        }
                    }
                }
                //Deleted
                if (entity.Deleted != null)
                {
                    List<TodoVM> deleted = entity.Deleted;
                    if (deleted != null)
                    {
                        foreach (TodoVM delete in deleted)
                        {
                            for (int i = 0; i < _data.Count; i++)
                            {
                                TodoVM item = _data[i];
                                if (item.Code != delete.Code)
                                    continue;
                                _data.RemoveAt(i);
                                isUpdated = true;
                                break;
                            }
                        }
                    }
                }
            }
            if (isUpdated)
                _plumber.Send(new DrapoPipeMessage() { Data = "todo" });
            return (_data);
        }
    }
}
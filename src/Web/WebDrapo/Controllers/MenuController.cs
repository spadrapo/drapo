using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebDrapo.Model;
using Microsoft.AspNetCore.Authorization;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebDrapo.Controllers
{
    [AllowAnonymous]
    public class MenuController : Controller
    {
        [HttpGet]
        public List<MenuItemVM> GetItems()
        {
            List<MenuItemVM> items = new List<MenuItemVM>();
            items.Add(new MenuItemVM() { Name = "Home", Type = "Home", TypeImageClass= "glyphicon glyphicon-home", Action= "UncheckItemField({{menuState.visibleMenu}});UncheckItemField({{menuState.visibleSubMenu}});UpdateSector(sector,/DrapoPages/PageSimple.html)" });
            items.Add(new MenuItemVM() { Name = "New", Type = "New", TypeImageClass= "glyphicon glyphicon-file", Action = "UncheckItemField({{menuState.visibleSubMenu}});UpdateDataUrl(d-menuSubItems, /Menu/GetSubItemsNew);ClearSector(sectorSubMenu);CheckItemField({{menuState.visibleSubMenu}});UpdateSector(sectorSubMenu,/DrapoPages/SectorSubMenuIcons.html)" });
            items.Add(new MenuItemVM() { Name = "Explorer", Type = "Explorer", TypeImageClass= "glyphicon glyphicon-search", Action = "UncheckItemField({{menuState.visibleSubMenu}});UpdateDataUrl(d-menuSubItems, /Menu/GetSubItemsExplorer);ClearSector(sectorSubMenu);CheckItemField({{menuState.visibleSubMenu}});UpdateSector(sectorSubMenu,/DrapoPages/SectorSubMenuList.html)" });
            return (items);
        }

        [HttpGet]
        public List<MenuItemVM> GetSubItemsNew()
        {
            List<MenuItemVM> subItems = new List<MenuItemVM>();
            subItems.Add(new MenuItemVM() { Name = "Home", TypeImageClass = "glyphicon glyphicon-home", Action = "UncheckItemField({{menuState.visibleMenu}});UncheckItemField({{menuState.visibleSubMenu}});UncheckDataField(d-menuTabs,Selected,false);CheckItemField({{subMenuItem.Selected}},false);AddDataItem(d-menuTabs,subMenuItem);UpdateSector(sector,{{subMenuItem.Url}})", Url= "/DrapoPages/ControlFlowForUl.html" , Activated= "UncheckDataField(d-menuTabs,Selected,false);CheckItemField({{tab.Selected}});UpdateSector(sector,{{tab.Url}})" });
            return (subItems);
        }
        [HttpGet]
        public List<MenuItemVM> GetSubItemsExplorer()
        {
            List<MenuItemVM> subItems = new List<MenuItemVM>();
            subItems.Add(new MenuItemVM() { Name = "Explorer", TypeImageClass = "glyphicon glyphicon-search", Action = "UncheckItemField({{menuState.visibleMenu}});UncheckItemField({{menuState.visibleSubMenu}});UncheckDataField(d-menuTabs,Selected,false);CheckItemField({{subMenuItem.Selected}},false);AddDataItem(d-menuTabs,subMenuItem);UpdateSector(sector,{{subMenuItem.Url}})", Url = "/DrapoPages/ControlFlowForSelect.html", Activated = "UncheckDataField(d-menuTabs,Selected,false);CheckItemField({{tab.Selected}});UpdateSector(sector,{{tab.Url}})" });
            return (subItems);
        }

    }
}

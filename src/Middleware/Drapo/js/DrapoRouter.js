"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var DrapoRouter = (function () {
    function DrapoRouter(application) {
        this._routes = [];
        this._canUseRouter = null;
        this._application = application;
    }
    Object.defineProperty(DrapoRouter.prototype, "Application", {
        get: function () {
            return (this._application);
        },
        enumerable: false,
        configurable: true
    });
    DrapoRouter.prototype.Create = function (url, sector, title, state) {
        var route = new DrapoRouteItem();
        route.Url = url;
        route.Sector = sector;
        route.Title = title;
        route.State = state;
        this._routes.push(route);
        return (route);
    };
    DrapoRouter.prototype.GetLastRouteUrlBySector = function (sector) {
        var route = this.GetLastRouteBySector(sector);
        if (route == null)
            return (null);
        return (route.Url);
    };
    DrapoRouter.prototype.GetLastRouteUrl = function () {
        for (var i = this._routes.length - 1; i >= 0; i--) {
            var route = this._routes[i];
            if (route.Url != null)
                return (route.Url);
        }
        return (null);
    };
    DrapoRouter.prototype.GetLastRouteBySector = function (sector) {
        for (var i = this._routes.length - 1; i >= 0; i--) {
            var route = this._routes[i];
            if (route.Sector === sector)
                return (route);
        }
        return (null);
    };
    DrapoRouter.prototype.GetLastRouteTitle = function () {
        for (var i = this._routes.length - 1; i >= 0; i--) {
            var route = this._routes[i];
            if (route.Title !== null)
                return (route.Title);
        }
        return (null);
    };
    DrapoRouter.prototype.CanUseRouter = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(this._canUseRouter === null)) return [3, 2];
                        _a = this;
                        return [4, this.Application.Config.GetUseRouter()];
                    case 1:
                        _a._canUseRouter = _b.sent();
                        _b.label = 2;
                    case 2: return [2, (this._canUseRouter)];
                }
            });
        });
    };
    DrapoRouter.prototype.Route = function (url, sector, title, state) {
        if (sector === void 0) { sector = null; }
        if (title === void 0) { title = null; }
        if (state === void 0) { state = null; }
        return __awaiter(this, void 0, void 0, function () {
            var canUseRouter, route;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.CanUseRouter()];
                    case 1:
                        canUseRouter = _a.sent();
                        this.UpdateTitle(title);
                        if (canUseRouter) {
                            route = this.Create(this.Application.Server.ResolveUrl(url), sector, title, state);
                            history.pushState(null, route.Title, route.Url);
                        }
                        this._application.Log.WriteVerbose("Router - Route to {0}", url);
                        return [2];
                }
            });
        });
    };
    DrapoRouter.prototype.OnPopState = function (e) {
        var route = this._routes.pop();
        if (route == null)
            return;
        var routePrevious = this.GetLastRouteBySector(route.Sector);
        var title = this.GetLastRouteTitle();
        this.UpdateTitle(title);
        this.Application.Document.StartUpdate(null);
        if (routePrevious == null) {
            this.Application.Document.LoadChildSectorDefault(route.Sector);
        }
        else {
            this.Application.Document.LoadChildSector(route.Sector, route.Url, route.Title, false);
        }
    };
    DrapoRouter.prototype.UpdateTitle = function (title) {
        if (title == null)
            return;
        if (title == '')
            return;
        if (title == '=')
            return;
        document.title = title;
    };
    DrapoRouter.prototype.UpdateURL = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            var urlResolved;
            return __generator(this, function (_a) {
                urlResolved = this.Application.Server.ResolveUrl(url);
                history.pushState(null, document.title, urlResolved);
                return [2];
            });
        });
    };
    return DrapoRouter;
}());

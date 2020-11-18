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
        while (_) try {
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
var DrapoCookieHandler = (function () {
    function DrapoCookieHandler(application) {
        this._application = application;
    }
    Object.defineProperty(DrapoCookieHandler.prototype, "Application", {
        get: function () {
            return (this._application);
        },
        enumerable: true,
        configurable: true
    });
    DrapoCookieHandler.prototype.RetrieveData = function (name) {
        if (name === void 0) { name = 'drapo'; }
        var data = this.CreateStructure(name);
        var values = this.GetCookieValues(name);
        for (var i = 0; i < values.length; i++) {
            var value = values[i];
            data[value[0]] = value[1];
        }
        return (data);
    };
    DrapoCookieHandler.prototype.CreateStructure = function (name) {
        var object = {};
        if (name.toLowerCase() == 'drapo') {
            object.theme = '';
            object.view = '';
            object.culture = '';
        }
        return (object);
    };
    DrapoCookieHandler.prototype.GetCookieValues = function (name) {
        if (name === void 0) { name = 'drapo'; }
        var values = [];
        var cookieValue = this.GetCookieValue(name);
        if (cookieValue == null)
            return (values);
        return (this.CreateCookieValues(cookieValue));
    };
    DrapoCookieHandler.prototype.GetCookieValue = function (name) {
        var nameEqual = name + "=";
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i];
            while (cookie.charAt(0) == ' ') {
                cookie = cookie.substring(1);
            }
            if (cookie.indexOf(nameEqual) == 0) {
                return (cookie.substring(nameEqual.length, cookie.length));
            }
        }
        return (null);
    };
    DrapoCookieHandler.prototype.CreateCookieValues = function (value) {
        var valueDecoded = this.Application.Serializer.EnsureUrlDecoded(value);
        var values = [];
        var keyValues = valueDecoded.split('&');
        for (var i = 0; i < keyValues.length; i++) {
            var keyValue = keyValues[i];
            var index = keyValue.indexOf('=');
            if (index < 0)
                continue;
            values.push([keyValue.substring(0, index), keyValue.substring(index + 1)]);
        }
        return (values);
    };
    DrapoCookieHandler.prototype.SetCookieValue = function (dataItem) {
        if (dataItem.Data == null)
            return (false);
        var data = this.CreateCookieValue(dataItem.Data);
        return (this.SetDocumentCookie(dataItem.CookieName, data));
    };
    DrapoCookieHandler.prototype.CreateCookieValue = function (object) {
        var data = '';
        for (var name_1 in object) {
            var value = object[name_1];
            if (value == null)
                continue;
            if (data.length > 0)
                data = data + '&';
            data = data + name_1 + '=' + value;
        }
        return (data);
    };
    DrapoCookieHandler.prototype.SetDocumentCookie = function (name, value) {
        document.cookie = name + "=" + value + ";expires=Thu, 03 Jun 2980 00:00:00 UTC;path=/";
        return (true);
    };
    DrapoCookieHandler.prototype.HandleCookieValuesChanges = function (cookieValuesBefore) {
        return __awaiter(this, void 0, void 0, function () {
            var cookieValues, namesChanged, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cookieValues = this.GetCookieValues();
                        namesChanged = this.GetCookieValuesNamedChanged(cookieValuesBefore, cookieValues);
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < namesChanged.length)) return [3, 4];
                        return [4, this.HandleCookieValueChange(namesChanged[i])];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        i++;
                        return [3, 1];
                    case 4: return [2, (namesChanged.length > 0)];
                }
            });
        });
    };
    DrapoCookieHandler.prototype.HandleCookieValueChange = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(name === 'culture')) return [3, 2];
                        return [4, this.Application.Globalization.ReloadCulture()];
                    case 1:
                        _a.sent();
                        return [3, 4];
                    case 2:
                        if (!(name === 'theme')) return [3, 4];
                        return [4, this.Application.Stylist.ReloadStyles()];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2];
                }
            });
        });
    };
    DrapoCookieHandler.prototype.GetCookieValuesNamedChanged = function (cookieValuesBefore, cookieValues) {
        var changesNames = [];
        for (var i = 0; i < cookieValues.length; i++) {
            var cookieValue = cookieValues[i];
            var name_2 = cookieValue[0];
            var value = cookieValue[1];
            if (this.HasCookieValueChanged(cookieValuesBefore, name_2, value))
                changesNames.push(name_2);
        }
        return (changesNames);
    };
    DrapoCookieHandler.prototype.HasCookieValueChanged = function (cookieValues, name, value) {
        for (var i = 0; i < cookieValues.length; i++) {
            var cookieValue = cookieValues[i];
            var nameCurrent = cookieValue[0];
            if (name !== nameCurrent)
                continue;
            var valueCurrent = cookieValue[1];
            return (value !== valueCurrent);
        }
        return (true);
    };
    DrapoCookieHandler.prototype.GetTheme = function () {
        var cookieData = this.Application.CookieHandler.RetrieveData();
        if (cookieData == null)
            return ('');
        return (cookieData.theme);
    };
    DrapoCookieHandler.prototype.GetView = function () {
        var cookieData = this.Application.CookieHandler.RetrieveData();
        if (cookieData == null)
            return ('');
        return (cookieData.view);
    };
    return DrapoCookieHandler;
}());

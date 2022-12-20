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
var DrapoRegister = (function () {
    function DrapoRegister(application) {
        this._components = [];
        this._cacheKeys = [];
        this._cacheDatas = [];
        this._application = application;
    }
    Object.defineProperty(DrapoRegister.prototype, "Application", {
        get: function () {
            return (this._application);
        },
        enumerable: false,
        configurable: true
    });
    DrapoRegister.prototype.GetRegisteredComponent = function (tagName) {
        return __awaiter(this, void 0, void 0, function () {
            var components, i, component;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.Application.Config.GetSector("Components")];
                    case 1:
                        components = _a.sent();
                        if (components == null)
                            return [2, (null)];
                        for (i = 0; i < components.length; i++) {
                            component = components[i];
                            if (component.Tag == tagName)
                                return [2, (component)];
                        }
                        return [2, (null)];
                }
            });
        });
    };
    DrapoRegister.prototype.IsRegisteredComponent = function (tagName) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.GetRegisteredComponent(tagName)];
                    case 1: return [2, ((_a.sent()) != null)];
                }
            });
        });
    };
    DrapoRegister.prototype.IsActiveComponent = function (tagName) {
        for (var i = 0; i < this._components.length; i++)
            if (this._components[i] === tagName)
                return (true);
        return (false);
    };
    DrapoRegister.prototype.ActivateComponent = function (tagName) {
        return __awaiter(this, void 0, void 0, function () {
            var component, i, file;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.GetRegisteredComponent(tagName)];
                    case 1:
                        component = _a.sent();
                        this._components.push(tagName);
                        i = 0;
                        _a.label = 2;
                    case 2:
                        if (!(i < component.Files.length)) return [3, 7];
                        file = component.Files[i];
                        if (!(file.Type === 2)) return [3, 4];
                        return [4, this.ActivateComponentFileScript(component, file)];
                    case 3:
                        _a.sent();
                        return [3, 6];
                    case 4:
                        if (!(file.Type === 1)) return [3, 6];
                        return [4, this.ActivateComponentFileStyle(component, file)];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6:
                        i++;
                        return [3, 2];
                    case 7: return [2];
                }
            });
        });
    };
    DrapoRegister.prototype.ActivateComponentFileScript = function (component, file) {
        return __awaiter(this, void 0, void 0, function () {
            var relatedUrl, url, script;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.GetComponentFileUrl(component, file)];
                    case 1:
                        relatedUrl = _a.sent();
                        url = this.Application.Server.ResolveUrl(relatedUrl);
                        script = document.createElement('script');
                        script.src = url;
                        script.async = false;
                        document.head.appendChild(script);
                        return [2];
                }
            });
        });
    };
    DrapoRegister.prototype.ActivateComponentFileStyle = function (component, file) {
        return __awaiter(this, void 0, void 0, function () {
            var relatedUrl, url, link;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.GetComponentFileUrl(component, file)];
                    case 1:
                        relatedUrl = _a.sent();
                        url = this.Application.Server.ResolveUrl(relatedUrl);
                        link = document.createElement('link');
                        link.href = url;
                        link.rel = 'stylesheet';
                        document.head.appendChild(link);
                        return [2];
                }
            });
        });
    };
    DrapoRegister.prototype.CreateInstanceComponent = function (tagName, el) {
        return __awaiter(this, void 0, void 0, function () {
            var component, constructor, result, resultPromise;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.GetRegisteredComponent(tagName)];
                    case 1:
                        component = _a.sent();
                        if ((component.Constructor == null) || (component.Constructor == ''))
                            return [2];
                        return [4, this.WaitForFunction(component.Constructor)];
                    case 2:
                        _a.sent();
                        constructor = window[component.Constructor];
                        if (constructor == null)
                            return [2];
                        result = constructor(el, this.Application);
                        if (!(Promise.resolve(result) == result)) return [3, 4];
                        resultPromise = result;
                        return [4, resultPromise];
                    case 3: return [2, (_a.sent())];
                    case 4: return [2, (null)];
                }
            });
        });
    };
    DrapoRegister.prototype.WaitForFunction = function (functionName, retry, interval) {
        if (retry === void 0) { retry = 1000; }
        if (interval === void 0) { interval = 1000; }
        return __awaiter(this, void 0, void 0, function () {
            var i, functionReference;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < retry)) return [3, 4];
                        functionReference = window[functionName];
                        if (functionReference != null)
                            return [2];
                        return [4, this.Application.Document.Sleep(interval)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        i++;
                        return [3, 1];
                    case 4: return [2];
                }
            });
        });
    };
    DrapoRegister.prototype.GetRegisteredComponentViewContent = function (tagName) {
        return __awaiter(this, void 0, void 0, function () {
            var component, i, file;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.GetRegisteredComponent(tagName)];
                    case 1:
                        component = _a.sent();
                        if (component == null)
                            return [2, (null)];
                        i = 0;
                        _a.label = 2;
                    case 2:
                        if (!(i < component.Files.length)) return [3, 5];
                        file = component.Files[i];
                        if (!(file.Type === 0)) return [3, 4];
                        return [4, this.GetRegisteredComponentFileContent(component, file)];
                    case 3: return [2, (_a.sent())];
                    case 4:
                        i++;
                        return [3, 2];
                    case 5: return [2, (null)];
                }
            });
        });
    };
    DrapoRegister.prototype.GetRegisteredComponentFileContent = function (component, file) {
        return __awaiter(this, void 0, void 0, function () {
            var key, index, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        key = this.CreateKeyComponentFile(component, file);
                        index = this.GetCacheKeyIndex(key);
                        if (!(index == null)) return [3, 2];
                        _a = this.AddCacheData;
                        _b = [key];
                        return [4, this.GetRegisteredComponentFileContentInternal(component, file)];
                    case 1:
                        index = _a.apply(this, _b.concat([_c.sent()]));
                        _c.label = 2;
                    case 2: return [2, (this.GetCacheData(index))];
                }
            });
        });
    };
    DrapoRegister.prototype.GetComponentFileUrl = function (component, file) {
        return __awaiter(this, void 0, void 0, function () {
            var url, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        url = file.ResourceType === 1 ? file.Path : '~/components/' + component.Name + '/' + file.Name;
                        _a = url;
                        return [4, this.Application.Server.AppendUrlQueryStringCacheStatic(url)];
                    case 1:
                        url = _a + _b.sent();
                        return [2, (url)];
                }
            });
        });
    };
    DrapoRegister.prototype.GetRegisteredComponentFileContentInternal = function (component, file) {
        return __awaiter(this, void 0, void 0, function () {
            var url, htmlCached, response, html, allowCache;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.GetComponentFileUrl(component, file)];
                    case 1:
                        url = _a.sent();
                        htmlCached = this.Application.CacheHandler.GetCachedComponentView(url);
                        if (htmlCached != null)
                            return [2, (htmlCached)];
                        return [4, this.Application.Server.GetHTML(url)];
                    case 2:
                        response = _a.sent();
                        if (response == null)
                            return [2, (null)];
                        html = response[0];
                        allowCache = response[1];
                        if (allowCache)
                            this.Application.CacheHandler.SetCachedComponentView(url, html);
                        return [2, (html)];
                }
            });
        });
    };
    DrapoRegister.prototype.CreateKeyComponentFile = function (component, file) {
        return (component.Name + ':' + file.Name);
    };
    DrapoRegister.prototype.GetCacheKeyIndex = function (dataKey) {
        for (var i = 0; i < this._cacheKeys.length; i++) {
            if (this._cacheKeys[i] == dataKey)
                return (i);
        }
        return (null);
    };
    DrapoRegister.prototype.GetCacheData = function (dataIndex) {
        return (this._cacheDatas[dataIndex]);
    };
    DrapoRegister.prototype.AddCacheData = function (dataKey, data) {
        this._cacheKeys.push(dataKey);
        this._cacheDatas.push(data);
        return (this._cacheKeys.length - 1);
    };
    DrapoRegister.prototype.IsEndsWith = function (text, value) {
        var length = value.length;
        if (text.length < length)
            return (false);
        return (text.substr(text.length - length) === value);
    };
    return DrapoRegister;
}());

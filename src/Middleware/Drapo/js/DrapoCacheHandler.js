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
var DrapoCacheHandler = (function () {
    function DrapoCacheHandler(application) {
        this._hasLocalStorage = null;
        this._useLocalStorage = false;
        this._applicationBuild = null;
        this._cacheKeysView = null;
        this._cacheKeysComponentView = null;
        this._cacheKeysComponentStyle = null;
        this._cacheKeysComponentScript = null;
        this.TYPE_DATA = "d";
        this.TYPE_COMPONENTVIEW = "cv";
        this.TYPE_COMPONENTSTYLE = "cs";
        this.TYPE_COMPONENTSCRIPT = "cj";
        this.TYPE_VIEW = "v";
        this._application = application;
        this._hasLocalStorage = window.localStorage != null;
    }
    Object.defineProperty(DrapoCacheHandler.prototype, "Application", {
        get: function () {
            return (this._application);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoCacheHandler.prototype, "CanUseLocalStorage", {
        get: function () {
            return ((this._hasLocalStorage) && (this._useLocalStorage));
        },
        enumerable: false,
        configurable: true
    });
    DrapoCacheHandler.prototype.Initialize = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, _d, _e, _f;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        _a = this;
                        return [4, this.Application.Config.GetUseCacheLocalStorage()];
                    case 1:
                        _a._useLocalStorage = _g.sent();
                        _b = this;
                        return [4, this.Application.Config.GetApplicationBuild()];
                    case 2:
                        _b._applicationBuild = _g.sent();
                        _c = this;
                        return [4, this.GetConfigurationKeys('CacheKeysView')];
                    case 3:
                        _c._cacheKeysView = _g.sent();
                        _d = this;
                        return [4, this.GetConfigurationKeys('CacheKeysComponentView')];
                    case 4:
                        _d._cacheKeysComponentView = _g.sent();
                        _e = this;
                        return [4, this.GetConfigurationKeys('CacheKeysComponentStyle')];
                    case 5:
                        _e._cacheKeysComponentStyle = _g.sent();
                        _f = this;
                        return [4, this.GetConfigurationKeys('CacheKeysComponentScript')];
                    case 6:
                        _f._cacheKeysComponentScript = _g.sent();
                        return [2, (true)];
                }
            });
        });
    };
    DrapoCacheHandler.prototype.EnsureLoaded = function (storageItem, sector, dataKey, dataPath) {
        if (dataPath === void 0) { dataPath = null; }
        if (!this.CanUseLocalStorage)
            return (false);
        var cacheKey = this.CreateCacheKey(this.TYPE_DATA, storageItem.CacheKeys, sector, dataKey, dataPath, null);
        if (cacheKey == null)
            return (false);
        var valueCached = this.GetClientDataCache(cacheKey);
        if (valueCached == null)
            return (false);
        var appended = this.AppendStorageDataCache(storageItem, dataPath, valueCached);
        return (appended);
    };
    DrapoCacheHandler.prototype.GetCachedData = function (cacheKeys, sector, dataKey) {
        if (!this.CanUseLocalStorage)
            return (null);
        var cacheKey = this.CreateCacheKey(this.TYPE_DATA, cacheKeys, sector, dataKey, null, null);
        if (cacheKey == null)
            return (null);
        var valueCached = this.GetClientDataCache(cacheKey);
        return (valueCached);
    };
    DrapoCacheHandler.prototype.GetCachedDataPath = function (cacheKeys, sector, dataKey, dataPath) {
        if (!this.CanUseLocalStorage)
            return (null);
        var cacheKey = this.CreateCacheKey(this.TYPE_DATA, cacheKeys, sector, dataKey, dataPath, null);
        if (cacheKey == null)
            return (null);
        var valueCached = this.GetClientDataCache(cacheKey);
        return (valueCached);
    };
    DrapoCacheHandler.prototype.AppendCacheData = function (cacheKeys, sector, dataKey, value, isDelay) {
        if (isDelay === void 0) { isDelay = false; }
        if (!this.CanUseLocalStorage)
            return (false);
        if ((cacheKeys == null) || (cacheKeys.length == 0))
            return (null);
        var appended = false;
        if (isDelay) {
            for (var dataField in value) {
                var dataPath = [dataKey, dataField];
                var dataPathValue = value[dataField];
                if (this.AppendCacheDataEntry(cacheKeys, sector, dataKey, dataPath, dataPathValue))
                    appended = true;
            }
        }
        else {
            appended = this.AppendCacheDataEntry(cacheKeys, sector, dataKey, null, value);
        }
        return (appended);
    };
    DrapoCacheHandler.prototype.GetCachedView = function (url) {
        if (!this.CanUseLocalStorage)
            return (null);
        var cacheKey = this.CreateCacheKey(this.TYPE_VIEW, this._cacheKeysView, null, null, null, url);
        if (cacheKey == null)
            return (null);
        var value = this.GetClientDataCache(cacheKey);
        return (value);
    };
    DrapoCacheHandler.prototype.SetCachedView = function (url, value) {
        if (!this.CanUseLocalStorage)
            return (false);
        var cacheKey = this.CreateCacheKey(this.TYPE_VIEW, this._cacheKeysView, null, null, null, url);
        if (cacheKey == null)
            return (false);
        this.SetClientDataCache(cacheKey, value);
        return (true);
    };
    DrapoCacheHandler.prototype.GetCachedComponentView = function (url) {
        if (!this.CanUseLocalStorage)
            return (null);
        var cacheKey = this.CreateCacheKey(this.TYPE_COMPONENTVIEW, this._cacheKeysView, null, null, null, url);
        if (cacheKey == null)
            return (null);
        var value = this.GetClientDataCache(cacheKey);
        return (value);
    };
    DrapoCacheHandler.prototype.SetCachedComponentView = function (url, value) {
        if (!this.CanUseLocalStorage)
            return (false);
        var cacheKey = this.CreateCacheKey(this.TYPE_COMPONENTVIEW, this._cacheKeysView, null, null, null, url);
        if (cacheKey == null)
            return (false);
        this.SetClientDataCache(cacheKey, value);
        return (true);
    };
    DrapoCacheHandler.prototype.GetConfigurationKeys = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            var value, values;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.Application.Config.GetProperty(name)];
                    case 1:
                        value = _a.sent();
                        if ((value == null) || (value == ''))
                            return [2, (null)];
                        values = this.Application.Parser.ParsePipes(value);
                        if ((values == null) || (values.length == 0))
                            return [2, (null)];
                        return [2, (values)];
                }
            });
        });
    };
    DrapoCacheHandler.prototype.AppendCacheDataEntry = function (cacheKeys, sector, dataKey, dataPath, value) {
        var cacheKey = this.CreateCacheKey(this.TYPE_DATA, cacheKeys, sector, dataKey, dataPath, null);
        if (cacheKey == null)
            return (false);
        this.SetClientDataCache(cacheKey, value);
        return (true);
    };
    DrapoCacheHandler.prototype.CreateCacheKey = function (type, cacheKeys, sector, dataKey, dataPath, url) {
        if ((cacheKeys == null) || (cacheKeys.length == 0))
            return (null);
        var key = type;
        for (var i = 0; i < cacheKeys.length; i++) {
            var cacheKey = cacheKeys[i];
            var cacheKeyValue = this.GetKey(cacheKey, sector, dataKey, dataPath, url);
            if (cacheKeyValue == null)
                return (null);
            key = key + '_' + cacheKeyValue;
        }
        return (key);
    };
    DrapoCacheHandler.prototype.GetKey = function (cacheKey, sector, dataKey, dataPath, url) {
        var key = cacheKey.toLowerCase();
        if (key == 'datakey')
            return (dataKey);
        if (key == 'url')
            return (url);
        if (key == 'datapath') {
            if ((dataPath == null) || (dataPath.length <= 1))
                return (dataKey);
            var dataPathValue = dataPath[0];
            for (var i = 1; i < dataPath.length; i++)
                dataPathValue = dataPathValue + '.' + dataPath[i];
            return (dataPathValue);
        }
        if (key == 'culture')
            return (this.Application.Globalization.GetCulture());
        if (key == 'applicationbuild')
            return (this._applicationBuild);
        if (key == 'view')
            return (this.Application.CookieHandler.GetView());
        if (key == 'theme')
            return (this.Application.CookieHandler.GetTheme());
        return (null);
    };
    DrapoCacheHandler.prototype.AppendStorageDataCache = function (storageItem, dataPath, valueCached) {
        if (storageItem.IsDelay) {
            var data = storageItem.Data;
            var dataField = dataPath[1];
            data[dataField] = valueCached;
        }
        else {
            storageItem.Data = valueCached;
        }
        return (true);
    };
    DrapoCacheHandler.prototype.GetClientDataCache = function (cacheKey) {
        var value = null;
        try {
            value = window.localStorage.getItem(cacheKey);
            if (value == null)
                return (null);
        }
        catch (e) {
            this._useLocalStorage = false;
            this.Application.ExceptionHandler.Handle(e, 'DrapoCacheHandler - GetClientDataCache :' + cacheKey);
        }
        try {
            return (this.Application.Serializer.Deserialize(value));
        }
        catch (_a) {
            return (null);
        }
    };
    DrapoCacheHandler.prototype.SetClientDataCache = function (cacheKey, value) {
        try {
            var valueSerialized = this.Application.Serializer.SerializeObject(value);
            window.localStorage.setItem(cacheKey, valueSerialized);
        }
        catch (e) {
            this._useLocalStorage = false;
            this.Application.ExceptionHandler.Handle(e, 'DrapoCacheHandler - SetClientDataCache');
        }
    };
    return DrapoCacheHandler;
}());

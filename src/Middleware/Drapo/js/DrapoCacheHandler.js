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
        this.TYPE_DATA = "data";
        this._application = application;
        this._hasLocalStorage = window.localStorage != null;
    }
    Object.defineProperty(DrapoCacheHandler.prototype, "Application", {
        get: function () {
            return (this._application);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DrapoCacheHandler.prototype, "CanUseLocalStorage", {
        get: function () {
            return ((this._hasLocalStorage) && (this._useLocalStorage));
        },
        enumerable: true,
        configurable: true
    });
    DrapoCacheHandler.prototype.Initialize = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = this;
                        return [4, this.Application.Config.GetUseCacheLocalStorage()];
                    case 1:
                        _a._useLocalStorage = _c.sent();
                        _b = this;
                        return [4, this.Application.Config.GetApplicationBuild()];
                    case 2:
                        _b._applicationBuild = _c.sent();
                        return [2, (true)];
                }
            });
        });
    };
    DrapoCacheHandler.prototype.EnsureLoaded = function (storageItem, sector, dataKey, dataPath) {
        if (dataPath === void 0) { dataPath = null; }
        if (!this.CanUseLocalStorage)
            return (false);
        var cacheKey = this.CreateCacheKey(this.TYPE_DATA, storageItem.CacheKeys, sector, dataKey, dataPath);
        if (cacheKey == null)
            return (false);
        var valueCached = this.GetClientDataCache(cacheKey);
        if (valueCached == null)
            return (false);
        var appended = this.AppendStorageDataCache(storageItem, valueCached);
        return (appended);
    };
    DrapoCacheHandler.prototype.GetCachedData = function (cacheKeys, sector, dataKey) {
        if (!this.CanUseLocalStorage)
            return (null);
        var cacheKey = this.CreateCacheKey(this.TYPE_DATA, cacheKeys, sector, dataKey, null);
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
    DrapoCacheHandler.prototype.AppendCacheDataEntry = function (cacheKeys, sector, dataKey, dataPath, value) {
        var cacheKey = this.CreateCacheKey(this.TYPE_DATA, cacheKeys, sector, dataKey, dataPath);
        if (cacheKey == null)
            return (false);
        this.SetClientDataCache(cacheKey, value);
        return (true);
    };
    DrapoCacheHandler.prototype.CreateCacheKey = function (type, cacheKeys, sector, dataKey, dataPath) {
        if ((cacheKeys == null) || (cacheKeys.length == 0))
            return (null);
        var key = type;
        for (var i = 0; i < cacheKeys.length; i++) {
            var cacheKey = cacheKeys[i];
            var cacheKeyValue = this.GetKey(cacheKey, sector, dataKey, dataPath);
            if (cacheKeyValue == null)
                return (null);
            key = key + '_' + cacheKeyValue;
        }
        return (key);
    };
    DrapoCacheHandler.prototype.GetKey = function (cacheKey, sector, dataKey, dataPath) {
        var key = cacheKey.toLowerCase();
        if (key == 'datakey')
            return (dataKey);
        if (key == 'datapath') {
            if ((dataPath == null) || (dataPath.length <= 1))
                return (dataKey);
            var dataPathValue = dataPath[0];
            for (var i = 1; i < dataPath.length; i++)
                dataPathValue = dataPathValue + '.' + dataPath[i];
            return (dataPathValue);
        }
        if (key == 'culture') {
            return (this.Application.Globalization.GetCulture());
        }
        if (key == 'applicationbuild') {
            return (this._applicationBuild);
        }
        return (null);
    };
    DrapoCacheHandler.prototype.AppendStorageDataCache = function (storageItem, valueCached) {
        if (storageItem.IsDelay) {
            for (var dataField in valueCached)
                storageItem.Data[dataField] = valueCached[dataField];
        }
        else {
            storageItem.Data = valueCached;
        }
        return (true);
    };
    DrapoCacheHandler.prototype.GetClientDataCache = function (cacheKey) {
        var value = window.localStorage.getItem(cacheKey);
        if (value == null)
            return (null);
        return (this.Application.Serializer.Deserialize(value));
    };
    DrapoCacheHandler.prototype.SetClientDataCache = function (cacheKey, value) {
        var valueSerialized = this.Application.Serializer.SerializeObject(value);
        window.localStorage.setItem(cacheKey, valueSerialized);
    };
    return DrapoCacheHandler;
}());

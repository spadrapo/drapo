"use strict";
var DrapoStorageItem = (function () {
    function DrapoStorageItem(dataKey, type, access, element, data, urlGet, urlSet, urlParameters, postGet, start, increment, isIncremental, isFull, isUnitOfWork, isDelay, cookieName, isCookieChange, userConfig, isToken, sector, groups, pipes, channels, canCache, cacheKeys, onLoad, onAfterLoad, onAfterContainerLoad, onBeforeContainerUnload, onAfterCached, onNotify, headersGet, headersSet, pollingKey, pollingTimespan) {
        this._dataKey = null;
        this._type = null;
        this._access = null;
        this._data = [];
        this._dataInserted = [];
        this._dataUpdated = [];
        this._dataDeleted = [];
        this._urlGet = null;
        this._urlSet = null;
        this._urlParameters = null;
        this._postGet = null;
        this._start = null;
        this._increment = null;
        this._isIncremental = false;
        this._isFull = false;
        this._isGrowing = false;
        this._isUnitOfWork = false;
        this._isDelay = false;
        this._cookieName = null;
        this._isCookieChange = false;
        this._userConfig = null;
        this._isToken = false;
        this._sector = null;
        this._groups = null;
        this._pipes = null;
        this._channels = null;
        this._canCache = true;
        this._cacheKeys = null;
        this._onLoad = null;
        this._onAfterLoad = null;
        this._onAfterContainerLoad = null;
        this._onBeforeContainerUnload = null;
        this._onAfterCached = null;
        this._onNotify = null;
        this._headersGet = [];
        this._headersSet = [];
        this._hasChanges = false;
        this._pollingKey = null;
        this._pollingTimespan = null;
        this._pollingDate = null;
        this._pollingHash = null;
        this._dataKey = dataKey;
        this._type = type;
        this._access = access;
        this._element = element;
        this._data = data;
        this._urlGet = urlGet;
        this._urlSet = urlSet;
        this._urlParameters = urlParameters;
        this._postGet = postGet;
        this._start = start;
        this._increment = increment;
        this._isIncremental = isIncremental;
        this._isFull = isFull;
        this._isUnitOfWork = isUnitOfWork;
        this._isDelay = isDelay;
        this._cookieName = cookieName;
        this._isCookieChange = isCookieChange;
        this._userConfig = userConfig;
        this._isToken = isToken;
        this._sector = sector;
        this._groups = groups;
        this._pipes = pipes;
        this._channels = channels;
        this._canCache = canCache;
        this._cacheKeys = cacheKeys;
        this._onLoad = onLoad;
        this._onAfterLoad = onAfterLoad == null ? null : onAfterLoad;
        this._onAfterContainerLoad = onAfterContainerLoad == null ? null : onAfterContainerLoad;
        this._onBeforeContainerUnload = onBeforeContainerUnload == null ? null : onBeforeContainerUnload;
        this._onAfterCached = onAfterCached == null ? null : onAfterCached;
        this._onNotify = onNotify == null ? null : onNotify;
        this._headersGet = headersGet;
        this._headersSet = headersSet;
        this._pollingKey = pollingKey;
        this._pollingTimespan = pollingTimespan;
        this.Initialize();
    }
    Object.defineProperty(DrapoStorageItem.prototype, "DataKey", {
        get: function () {
            return (this._dataKey);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoStorageItem.prototype, "Type", {
        get: function () {
            return (this._type);
        },
        set: function (value) {
            this._type = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoStorageItem.prototype, "Access", {
        get: function () {
            return (this._access);
        },
        set: function (value) {
            this._access = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoStorageItem.prototype, "Element", {
        get: function () {
            return (this._element);
        },
        set: function (value) {
            this._element = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoStorageItem.prototype, "Data", {
        get: function () {
            return (this._data);
        },
        set: function (value) {
            this._data = value;
            this._isFull = false;
            this._isGrowing = false;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoStorageItem.prototype, "DataInserted", {
        get: function () {
            return (this._dataInserted);
        },
        set: function (value) {
            this._dataInserted = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoStorageItem.prototype, "DataUpdated", {
        get: function () {
            return (this._dataUpdated);
        },
        set: function (value) {
            this._dataUpdated = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoStorageItem.prototype, "DataDeleted", {
        get: function () {
            return (this._dataDeleted);
        },
        set: function (value) {
            this._dataDeleted = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoStorageItem.prototype, "UrlGet", {
        get: function () {
            return (this._urlGet);
        },
        set: function (value) {
            this._urlGet = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoStorageItem.prototype, "UrlSet", {
        get: function () {
            return (this._urlSet);
        },
        set: function (value) {
            this._urlSet = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoStorageItem.prototype, "UrlParameters", {
        get: function () {
            return (this._urlParameters);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoStorageItem.prototype, "IsUrlParametersRequired", {
        get: function () {
            return (this._urlParameters === 'required');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoStorageItem.prototype, "PostGet", {
        get: function () {
            return (this._postGet);
        },
        set: function (value) {
            this._postGet = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoStorageItem.prototype, "Start", {
        get: function () {
            return (this._start);
        },
        set: function (value) {
            this._start = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoStorageItem.prototype, "Increment", {
        get: function () {
            return (this._increment);
        },
        set: function (value) {
            this._increment = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoStorageItem.prototype, "IsIncremental", {
        get: function () {
            return (this._isIncremental);
        },
        set: function (value) {
            this._isIncremental = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoStorageItem.prototype, "IsFull", {
        get: function () {
            return (this._isFull);
        },
        set: function (value) {
            this._isFull = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoStorageItem.prototype, "IsGrowing", {
        get: function () {
            return (this._isGrowing);
        },
        set: function (value) {
            this._isGrowing = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoStorageItem.prototype, "IsUnitOfWork", {
        get: function () {
            return (this._isUnitOfWork);
        },
        set: function (value) {
            this._isUnitOfWork = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoStorageItem.prototype, "IsDelay", {
        get: function () {
            return (this._isDelay);
        },
        set: function (value) {
            this._isDelay = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoStorageItem.prototype, "CookieName", {
        get: function () {
            return (this._cookieName);
        },
        set: function (value) {
            this._cookieName = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoStorageItem.prototype, "IsCookieChange", {
        get: function () {
            return (this._isCookieChange);
        },
        set: function (value) {
            this._isCookieChange = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoStorageItem.prototype, "UserConfig", {
        get: function () {
            return (this._userConfig);
        },
        set: function (value) {
            this._userConfig = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoStorageItem.prototype, "IsTypeValue", {
        get: function () {
            return (this._type === 'value');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoStorageItem.prototype, "IsTypeObject", {
        get: function () {
            return (this._type === 'object');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoStorageItem.prototype, "IsTypeParent", {
        get: function () {
            return (this._type === 'parent');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoStorageItem.prototype, "IsTypeArray", {
        get: function () {
            return ((this._type === 'array') || (Array.isArray(this.Data)));
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoStorageItem.prototype, "IsTypeFunction", {
        get: function () {
            return (this._type === 'function');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoStorageItem.prototype, "IsAccessPublic", {
        get: function () {
            return (this._access === 'public');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoStorageItem.prototype, "IsAccessPrivate", {
        get: function () {
            return (this._access === 'private');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoStorageItem.prototype, "IsToken", {
        get: function () {
            return (this._isToken);
        },
        set: function (value) {
            this._isToken = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoStorageItem.prototype, "Sector", {
        get: function () {
            return (this._sector);
        },
        set: function (value) {
            this._sector = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoStorageItem.prototype, "Pipes", {
        get: function () {
            return (this._pipes);
        },
        set: function (value) {
            this._pipes = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoStorageItem.prototype, "Channels", {
        get: function () {
            return (this._channels);
        },
        set: function (value) {
            this._channels = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoStorageItem.prototype, "CanCache", {
        get: function () {
            return (this._canCache);
        },
        set: function (value) {
            this._canCache = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoStorageItem.prototype, "CacheKeys", {
        get: function () {
            return (this._cacheKeys);
        },
        set: function (value) {
            this._cacheKeys = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoStorageItem.prototype, "OnLoad", {
        get: function () {
            return (this._onLoad);
        },
        set: function (value) {
            this._onLoad = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoStorageItem.prototype, "OnAfterLoad", {
        get: function () {
            return (this._onAfterLoad);
        },
        set: function (value) {
            this._onAfterLoad = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoStorageItem.prototype, "OnAfterContainerLoad", {
        get: function () {
            return (this._onAfterContainerLoad);
        },
        set: function (value) {
            this._onAfterContainerLoad = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoStorageItem.prototype, "OnBeforeContainerUnload", {
        get: function () {
            return (this._onBeforeContainerUnload);
        },
        set: function (value) {
            this._onBeforeContainerUnload = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoStorageItem.prototype, "OnAfterCached", {
        get: function () {
            return (this._onAfterCached);
        },
        set: function (value) {
            this._onAfterCached = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoStorageItem.prototype, "OnNotify", {
        get: function () {
            return (this._onNotify);
        },
        set: function (value) {
            this._onNotify = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoStorageItem.prototype, "HeadersGet", {
        get: function () {
            return (this._headersGet);
        },
        set: function (value) {
            this._headersGet = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoStorageItem.prototype, "HeadersSet", {
        get: function () {
            return (this._headersSet);
        },
        set: function (value) {
            this._headersSet = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoStorageItem.prototype, "HasChanges", {
        get: function () {
            return (this._hasChanges);
        },
        set: function (value) {
            this._hasChanges = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoStorageItem.prototype, "PollingKey", {
        get: function () {
            return (this._pollingKey);
        },
        set: function (value) {
            this._pollingKey = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoStorageItem.prototype, "PollingTimespan", {
        get: function () {
            return (this._pollingTimespan);
        },
        set: function (value) {
            this._pollingTimespan = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoStorageItem.prototype, "PollingDate", {
        get: function () {
            return (this._pollingDate);
        },
        set: function (value) {
            this._pollingDate = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoStorageItem.prototype, "PollingHash", {
        get: function () {
            return (this._pollingHash);
        },
        set: function (value) {
            this._pollingHash = value;
        },
        enumerable: false,
        configurable: true
    });
    DrapoStorageItem.prototype.Initialize = function () {
        if (this._access == null)
            this._access = this.IsTypeParent ? 'private' : 'public';
        this.CheckpointPolling();
    };
    DrapoStorageItem.prototype.CheckpointPolling = function () {
        if (this._pollingTimespan === null)
            return;
        var currentDate = new Date();
        currentDate.setMilliseconds(currentDate.getMilliseconds() + this._pollingTimespan);
        this._pollingDate = currentDate;
    };
    DrapoStorageItem.prototype.ContainsGroup = function (group) {
        if (this._groups == null)
            return (false);
        for (var i = 0; i < this._groups.length; i++)
            if (this._groups[i] === group)
                return (true);
        return (false);
    };
    return DrapoStorageItem;
}());

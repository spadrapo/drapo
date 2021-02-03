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
var DrapoStorage = (function () {
    function DrapoStorage(application) {
        this._cacheKeys = [];
        this._cacheItems = [];
        this._isDelayTriggered = false;
        this._cacheLocalDataKeyArray = [];
        this.CONTENT_TYPE_JSON = 'application/json; charset=utf-8';
        this._application = application;
    }
    Object.defineProperty(DrapoStorage.prototype, "Application", {
        get: function () {
            return (this._application);
        },
        enumerable: true,
        configurable: true
    });
    DrapoStorage.prototype.Retrieve = function (elj, dataKey, sector, context, dataKeyParts) {
        if (dataKeyParts === void 0) { dataKeyParts = null; }
        return __awaiter(this, void 0, void 0, function () {
            var item;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (dataKeyParts === null)
                            dataKeyParts = this.Application.Parser.ParseForIterable(dataKey);
                        if (!((dataKeyParts.length == 1) || (this.IsDataKey(dataKeyParts[0], sector)))) return [3, 2];
                        return [4, this.RetrieveDataItem(dataKey, sector)];
                    case 1: return [2, (_a.sent())];
                    case 2:
                        if ((dataKeyParts.length > 1) && (context.Item != null))
                            return [2, (this.RetrieveIterator(dataKey, dataKeyParts, context))];
                        if (!((dataKeyParts.length > 1) && (context.Item === null))) return [3, 4];
                        return [4, this.RetrieveDataItem(dataKey, sector)];
                    case 3:
                        item = _a.sent();
                        if (item === null)
                            return [2, (null)];
                        return [2, (this.RetrieveIteratorChild(dataKey, dataKeyParts, item.Data))];
                    case 4: return [2, (null)];
                }
            });
        });
    };
    DrapoStorage.prototype.RetrieveDataItemContext = function (dataKey, sector, executionContext) {
        if (executionContext === void 0) { executionContext = null; }
        return __awaiter(this, void 0, void 0, function () {
            var dataItemContext, dataItem;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!((executionContext !== null) && (executionContext.HasSectorContainer(sector)))) return [3, 2];
                        return [4, this.Application.SectorContainerHandler.GetStorageItem(sector, executionContext.GetSectorContainer(sector), dataKey)];
                    case 1:
                        dataItemContext = _a.sent();
                        if (dataItemContext !== null)
                            return [2, (dataItemContext)];
                        _a.label = 2;
                    case 2: return [4, this.RetrieveDataItem(dataKey, sector)];
                    case 3:
                        dataItem = _a.sent();
                        return [2, (dataItem)];
                }
            });
        });
    };
    DrapoStorage.prototype.RetrieveData = function (dataKey, sector, executionContext) {
        if (executionContext === void 0) { executionContext = null; }
        return __awaiter(this, void 0, void 0, function () {
            var dataItem, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!((executionContext !== null) && (executionContext.HasSectorContainer(sector)))) return [3, 2];
                        return [4, this.Application.SectorContainerHandler.GetStorageItem(sector, executionContext.GetSectorContainer(sector), dataKey)];
                    case 1:
                        _a = _b.sent();
                        return [3, 4];
                    case 2: return [4, this.RetrieveDataItem(dataKey, sector)];
                    case 3:
                        _a = _b.sent();
                        _b.label = 4;
                    case 4:
                        dataItem = _a;
                        if (dataItem == null)
                            return [2, (null)];
                        return [2, (dataItem.Data)];
                }
            });
        });
    };
    DrapoStorage.prototype.RetrieveStorageItemsCached = function (sector, dataKeyOrDataGroup) {
        var isAllSectors = ((sector === null) || (sector === ''));
        var isAllData = ((dataKeyOrDataGroup === null) || (dataKeyOrDataGroup === ''));
        var list = [];
        for (var i = 0; i < this._cacheItems.length; i++) {
            var item = this._cacheItems[i];
            if ((!isAllSectors) && (item.Sector !== sector))
                continue;
            var dataKey = this._cacheKeys[i];
            if ((!isAllData) && (dataKey !== dataKeyOrDataGroup) && (!item.ContainsGroup(dataKeyOrDataGroup)))
                continue;
            list.push(item);
        }
        return (list);
    };
    DrapoStorage.prototype.RetrieveDataValue = function (sector, mustache) {
        return __awaiter(this, void 0, void 0, function () {
            var mustacheFullParts, dataSector, dataKey, mustacheDataFields, mustacheParts, item, cacheIndex, cacheItem, dataFieldCurrent, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mustacheFullParts = this.Application.Parser.ParseMustache(mustache);
                        dataSector = this.Application.Solver.ResolveSector(mustacheFullParts, sector);
                        dataKey = this.Application.Solver.ResolveDataKey(mustacheFullParts);
                        mustacheDataFields = this.Application.Solver.ResolveDataFields(mustacheFullParts);
                        mustacheParts = this.Application.Solver.CreateDataPath(dataKey, mustacheDataFields);
                        return [4, this.EnsureDataKeyFieldReady(dataKey, dataSector, mustacheParts)];
                    case 1:
                        if (_a.sent())
                            return [2, (this.Application.Storage.GetDataKeyField(dataKey, dataSector, mustacheParts))];
                        return [4, this.RetrieveDataItemInternal(dataKey, dataSector, true, mustacheDataFields)];
                    case 2:
                        item = _a.sent();
                        if ((item == null) || (item.Data == null))
                            return [2, ('')];
                        cacheIndex = this.GetCacheKeyIndex(dataKey, dataSector);
                        if (!(cacheIndex == null)) return [3, 4];
                        return [4, this.AddCacheData(dataKey, dataSector, item)];
                    case 3:
                        _a.sent();
                        return [3, 5];
                    case 4:
                        cacheItem = this.GetCacheDataItem(cacheIndex);
                        for (dataFieldCurrent in item.Data)
                            cacheItem.Data[dataFieldCurrent] = item.Data[dataFieldCurrent];
                        _a.label = 5;
                    case 5:
                        data = this.Application.Solver.ResolveItemStoragePathObject(item, mustacheParts);
                        return [2, (data)];
                }
            });
        });
    };
    DrapoStorage.prototype.CanGrowData = function (dataKey, sector) {
        return __awaiter(this, void 0, void 0, function () {
            var dataItem;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.RetrieveDataItem(dataKey, sector)];
                    case 1:
                        dataItem = _a.sent();
                        if (dataItem == null)
                            return [2, (false)];
                        return [2, ((dataItem.IsIncremental) && (!dataItem.IsFull))];
                }
            });
        });
    };
    DrapoStorage.prototype.GrowData = function (dataKey, sector) {
        return __awaiter(this, void 0, void 0, function () {
            var cacheIndex, dataItem, dataNew, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cacheIndex = this.GetCacheKeyIndex(dataKey, sector);
                        if (cacheIndex == null)
                            return [2, (false)];
                        dataItem = this.GetCacheDataItem(cacheIndex);
                        if (dataItem == null)
                            return [2, (false)];
                        if (dataItem.IsFull)
                            return [2, (false)];
                        if (dataItem.IsGrowing)
                            return [2, (false)];
                        dataItem.IsGrowing = true;
                        return [4, this.RetrieveDataKeyUrl(dataKey, sector, dataItem.UrlGet, dataItem.UrlParameters, dataItem.PostGet, (dataItem.Start + dataItem.Data.length).toString(), dataItem.Increment.toString(), dataItem.Type, dataItem.IsToken)];
                    case 1:
                        dataNew = _a.sent();
                        if (dataNew == null)
                            return [2, (false)];
                        dataItem.IsGrowing = false;
                        if (dataNew.length < dataItem.Increment)
                            dataItem.IsFull = true;
                        for (i = 0; i < dataNew.length; i++)
                            dataItem.Data.push(dataNew[i]);
                        return [2, (true)];
                }
            });
        });
    };
    DrapoStorage.prototype.UpdateData = function (dataKey, sector, data, notify) {
        if (notify === void 0) { notify = true; }
        return __awaiter(this, void 0, void 0, function () {
            var cacheIndex, dataItem;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.EnsureDataKeyReady(dataKey, sector)];
                    case 1:
                        cacheIndex = _a.sent();
                        if (cacheIndex == null)
                            return [2, (false)];
                        dataItem = this.GetCacheDataItem(cacheIndex);
                        if (dataItem == null)
                            return [2, (false)];
                        if (dataItem.Data == data)
                            return [2, (false)];
                        dataItem.Data = data;
                        return [4, this.NotifyChanges(dataItem, notify, dataKey, null, null, false)];
                    case 2:
                        _a.sent();
                        return [2, (true)];
                }
            });
        });
    };
    DrapoStorage.prototype.UpdateDataPath = function (sector, contextItem, dataPath, value, canNotify) {
        if (canNotify === void 0) { canNotify = true; }
        return __awaiter(this, void 0, void 0, function () {
            var dataKey, dataItem, context, item;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dataKey = this.Application.Solver.ResolveDataKey(dataPath);
                        return [4, this.Application.Storage.RetrieveDataItem(dataKey, sector)];
                    case 1:
                        dataItem = _a.sent();
                        if (dataItem == null)
                            return [2, (false)];
                        context = new DrapoContext();
                        item = contextItem == null ? context.Create(dataItem.Data, null, null, dataKey, null, null, null) : contextItem;
                        if (item == null)
                            return [2, (false)];
                        if ((dataPath == null) || (dataPath.length == 1)) {
                            if (dataItem.Data == value)
                                return [2, (false)];
                            dataItem.Data = value;
                        }
                        else {
                            if (!this.Application.Solver.UpdateDataPathObject(item.Data, dataPath, value))
                                return [2, (false)];
                        }
                        if (!canNotify) return [3, 3];
                        return [4, this.Application.Observer.Notify(item.DataKey, item.Index, this.Application.Solver.ResolveDataFields(dataPath))];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [4, this.NotifyChanges(dataItem, false, dataKey, null, this.Application.Solver.ResolveDataFields(dataPath), false)];
                    case 4:
                        _a.sent();
                        return [2, (true)];
                }
            });
        });
    };
    DrapoStorage.prototype.ReloadData = function (dataKey, sector, notify, canUseDifference) {
        if (notify === void 0) { notify = true; }
        if (canUseDifference === void 0) { canUseDifference = false; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!((this.DiscardCacheData(dataKey, sector)) && (notify))) return [3, 2];
                        return [4, this.Application.Observer.Notify(dataKey, null, null, canUseDifference)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2, (true)];
                }
            });
        });
    };
    DrapoStorage.prototype.GetSectors = function (dataKey) {
        var sectors = [];
        for (var i = this._cacheKeys.length - 1; i >= 0; i--)
            if (this._cacheKeys[i] === dataKey)
                sectors.push(this._cacheItems[i].Sector);
        return (sectors);
    };
    DrapoStorage.prototype.GetSectorDataKeys = function (sector) {
        var dataKeys = [];
        for (var i = this._cacheKeys.length - 1; i >= 0; i--)
            if (this._cacheItems[i].Sector === sector)
                dataKeys.push(this._cacheKeys[i]);
        return (dataKeys);
    };
    DrapoStorage.prototype.ReloadPipe = function (dataPipe) {
        return __awaiter(this, void 0, void 0, function () {
            var reloaded, i, storageItem;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        reloaded = false;
                        i = this._cacheItems.length - 1;
                        _a.label = 1;
                    case 1:
                        if (!(i >= 0)) return [3, 4];
                        if (i >= this._cacheItems.length)
                            return [3, 3];
                        storageItem = this._cacheItems[i];
                        if (storageItem.Pipes == null)
                            return [3, 3];
                        if (!this.Application.Solver.Contains(storageItem.Pipes, dataPipe))
                            return [3, 3];
                        return [4, this.ReloadData(this._cacheKeys[i], null)];
                    case 2:
                        if (_a.sent())
                            reloaded = true;
                        _a.label = 3;
                    case 3:
                        i--;
                        return [3, 1];
                    case 4: return [2, (reloaded)];
                }
            });
        });
    };
    DrapoStorage.prototype.IsMustachePartsDataKey = function (sector, mustacheParts) {
        var dataKey = mustacheParts[0];
        if (!this.IsDataKey(dataKey, sector))
            return (false);
        for (var i = 1; i < mustacheParts.length; i++) {
            var mustachePart = mustacheParts[i];
            if (!this.Application.Parser.IsMustache(mustachePart))
                continue;
            var mustachePartParts = this.Application.Parser.ParseMustache(mustachePart);
            if (!this.IsMustachePartsDataKey(sector, mustachePartParts))
                return (false);
        }
        return (true);
    };
    DrapoStorage.prototype.IsDataKey = function (dataKey, sector, renderContext) {
        if (renderContext === void 0) { renderContext = null; }
        if (this.Application.Document.IsSystemKey(dataKey))
            return (true);
        var cacheIndex = this.GetCacheKeyIndex(dataKey, sector);
        if (cacheIndex != null)
            return (true);
        return (this.IsDataKeyElement(dataKey, renderContext));
    };
    DrapoStorage.prototype.IsDataKeyDelay = function (dataKey, sector) {
        var cacheIndex = this.GetCacheKeyIndex(dataKey, sector);
        if (cacheIndex === null)
            return (false);
        var cacheItem = this.GetCacheDataItem(cacheIndex);
        if (cacheItem === null)
            return (false);
        return (cacheItem.IsDelay);
    };
    DrapoStorage.prototype.IsDataKeyElement = function (dataKey, renderContext) {
        if (renderContext === null)
            return (this.IsDataKeyElementInternal(dataKey));
        var hasDataKeyElement = renderContext.HasDataKeyElement(dataKey);
        if (hasDataKeyElement !== null)
            return (hasDataKeyElement);
        var isDataKeyElement = this.IsDataKeyElementInternal(dataKey);
        renderContext.AddDataKeyElement(dataKey, isDataKeyElement);
        return (isDataKeyElement);
    };
    DrapoStorage.prototype.IsDataKeyElementInternal = function (dataKey) {
        var jqueryDataKeys = $("[d-dataKey='" + dataKey + "']");
        return ((jqueryDataKeys != null) && (jqueryDataKeys.length > 0));
    };
    DrapoStorage.prototype.ClearCacheLocal = function () {
        this._cacheLocalDataKeyArray = [];
    };
    DrapoStorage.prototype.IsDataKeyArray = function (dataKey, sector) {
        return __awaiter(this, void 0, void 0, function () {
            var itemSystem, i, dataKeyArray, isDataKeyArray;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.RetrieveDataItemInternalSystem(dataKey)];
                    case 1:
                        itemSystem = _a.sent();
                        if (itemSystem !== null)
                            return [2, (itemSystem.IsTypeArray)];
                        for (i = 0; i < this._cacheLocalDataKeyArray.length; i++) {
                            dataKeyArray = this._cacheLocalDataKeyArray[i];
                            if ((dataKeyArray[0] === dataKey) && (dataKeyArray[1] === sector))
                                return [2, (dataKeyArray[2])];
                        }
                        return [4, this.IsDataKeyArrayInternal(dataKey, sector)];
                    case 2:
                        isDataKeyArray = _a.sent();
                        this._cacheLocalDataKeyArray.push([dataKey, sector, isDataKeyArray]);
                        return [2, (isDataKeyArray)];
                }
            });
        });
    };
    DrapoStorage.prototype.IsDataKeyArrayInternal = function (dataKey, sector) {
        return __awaiter(this, void 0, void 0, function () {
            var cacheIndex, el, storageItem;
            return __generator(this, function (_a) {
                cacheIndex = this.GetCacheKeyIndex(dataKey, sector);
                if (cacheIndex === null) {
                    el = this.GetDataKeyElement(dataKey, sector);
                    return [2, (el == null)];
                }
                storageItem = this.GetCacheDataItem(cacheIndex);
                return [2, (storageItem.IsTypeArray)];
            });
        });
    };
    DrapoStorage.prototype.EnsureDataKeyReady = function (dataKey, sector) {
        return __awaiter(this, void 0, void 0, function () {
            var cacheIndex, item;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cacheIndex = this.GetCacheKeyIndex(dataKey, sector);
                        if (!(cacheIndex == null)) return [3, 3];
                        return [4, this.RetrieveDataItemInternal(dataKey, sector)];
                    case 1:
                        item = _a.sent();
                        if (item == null)
                            return [2, (null)];
                        return [4, this.AddCacheData(dataKey, sector, item)];
                    case 2:
                        cacheIndex = _a.sent();
                        _a.label = 3;
                    case 3: return [2, (cacheIndex)];
                }
            });
        });
    };
    DrapoStorage.prototype.EnsureDataKeyFieldReady = function (dataKey, sector, dataPath) {
        return __awaiter(this, void 0, void 0, function () {
            var cacheIndex, item, storageItem, hasData, isLoaded;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cacheIndex = this.GetCacheKeyIndex(dataKey, sector);
                        if (!(cacheIndex == null)) return [3, 3];
                        return [4, this.RetrieveDataItemInternal(dataKey, sector)];
                    case 1:
                        item = _a.sent();
                        if (item == null)
                            return [2, (false)];
                        return [4, this.AddCacheData(dataKey, sector, item)];
                    case 2:
                        cacheIndex = _a.sent();
                        _a.label = 3;
                    case 3:
                        storageItem = this.GetCacheDataItem(cacheIndex);
                        if (!storageItem.IsDelay)
                            return [2, (true)];
                        hasData = this.Application.Solver.ContainsItemStoragePathObject(storageItem, dataPath);
                        if (hasData)
                            return [2, (true)];
                        isLoaded = this.Application.CacheHandler.EnsureLoaded(storageItem, sector, dataKey, dataPath);
                        if (!isLoaded)
                            return [2, (false)];
                        return [2, (this.Application.Solver.ContainsItemStoragePathObject(storageItem, dataPath))];
                }
            });
        });
    };
    DrapoStorage.prototype.GetData = function (sector, dataPath) {
        if ((dataPath == null) || (dataPath.length == 0))
            return (null);
        var dataKey = this.Application.Solver.ResolveDataKey(dataPath);
        return (this.GetDataKeyField(dataKey, sector, dataPath));
    };
    DrapoStorage.prototype.GetDataKeyField = function (dataKey, sector, dataPath, executionContext) {
        if (executionContext === void 0) { executionContext = null; }
        var storageItem = this.GetCacheStorageItem(dataKey, sector, executionContext);
        if (storageItem === null)
            return (null);
        return (this.Application.Solver.ResolveItemStoragePathObject(storageItem, dataPath));
    };
    DrapoStorage.prototype.SetDataKeyField = function (dataKey, sector, dataFields, value, notify) {
        if (notify === void 0) { notify = true; }
        return __awaiter(this, void 0, void 0, function () {
            var cacheIndex, storageItem, length_1, updated, i, data, path;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.EnsureDataKeyReady(dataKey, sector)];
                    case 1:
                        cacheIndex = _a.sent();
                        if (cacheIndex == null)
                            return [2, (false)];
                        storageItem = this.GetCacheDataItem(cacheIndex);
                        if (!((dataFields !== null) && (storageItem.IsTypeArray))) return [3, 3];
                        length_1 = storageItem.Data.length;
                        updated = false;
                        for (i = 0; i < length_1; i++) {
                            data = storageItem.Data[i];
                            if (this.Application.Solver.UpdateDataPathObject(data, dataFields, value))
                                updated = true;
                        }
                        if (!updated)
                            return [2, (false)];
                        return [4, this.NotifyChanges(storageItem, notify, dataKey, null, dataFields)];
                    case 2:
                        _a.sent();
                        return [3, 7];
                    case 3:
                        path = this.Application.Solver.CreateDataPath(dataKey, dataFields);
                        if (!(path.length === 1)) return [3, 5];
                        if (storageItem.Data === value)
                            return [2, (false)];
                        storageItem.Data = value;
                        return [4, this.NotifyChanges(storageItem, notify, dataKey, null, null)];
                    case 4:
                        _a.sent();
                        return [3, 7];
                    case 5:
                        if (!this.Application.Solver.UpdateDataPathObject(storageItem.Data, path, value))
                            return [2, (false)];
                        return [4, this.NotifyChanges(storageItem, notify, dataKey, null, dataFields)];
                    case 6:
                        _a.sent();
                        _a.label = 7;
                    case 7: return [2, (true)];
                }
            });
        });
    };
    DrapoStorage.prototype.UpdateDataFieldLookup = function (dataKey, sector, dataFieldSeek, valueSeek, dataField, value, notify) {
        if (notify === void 0) { notify = true; }
        return __awaiter(this, void 0, void 0, function () {
            var cacheIndex, dataPath, storageItem, length_2, updated, context, i, data, dataPathSeek, contextItem, dataPathSeekValue;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.EnsureDataKeyReady(dataKey, sector)];
                    case 1:
                        cacheIndex = _a.sent();
                        if (cacheIndex == null)
                            return [2, (false)];
                        dataPath = (typeof dataField === "string") ? [dataField] : dataField;
                        storageItem = this.GetCacheDataItem(cacheIndex);
                        if (!storageItem.IsTypeArray) return [3, 7];
                        length_2 = storageItem.Data.length;
                        updated = false;
                        context = new DrapoContext();
                        i = 0;
                        _a.label = 2;
                    case 2:
                        if (!(i < length_2)) return [3, 5];
                        data = storageItem.Data[i];
                        dataPathSeek = this.CreateDataPath(dataKey, dataFieldSeek);
                        contextItem = context.Create(data, null, null, dataKey, dataKey, null, i);
                        return [4, this.Application.Solver.ResolveItemDataPathObject(sector, contextItem, dataPathSeek)];
                    case 3:
                        dataPathSeekValue = _a.sent();
                        if (!this.Application.Solver.IsEqualString(valueSeek, dataPathSeekValue))
                            return [3, 4];
                        if (!this.Application.Solver.UpdateDataPathObject(data, dataPath, value))
                            return [3, 4];
                        this.FlagAsUpdated(storageItem, i);
                        updated = true;
                        _a.label = 4;
                    case 4:
                        i++;
                        return [3, 2];
                    case 5:
                        if (!updated)
                            return [2, (false)];
                        return [4, this.NotifyChanges(storageItem, notify, dataKey, null, null)];
                    case 6:
                        _a.sent();
                        return [3, 8];
                    case 7: return [2, (false)];
                    case 8: return [2, (true)];
                }
            });
        });
    };
    DrapoStorage.prototype.RemoveDataItemLookup = function (dataKey, sector, dataFieldSeek, valueSeek, notify) {
        if (notify === void 0) { notify = true; }
        return __awaiter(this, void 0, void 0, function () {
            var cacheIndex, dataPath, storageItem, length_3, removedArray, context, i, data, dataPathSeek, contextItem, dataPathSeekValue, i, index;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.EnsureDataKeyReady(dataKey, sector)];
                    case 1:
                        cacheIndex = _a.sent();
                        if (cacheIndex == null)
                            return [2, (false)];
                        dataPath = (typeof dataFieldSeek === "string") ? [dataFieldSeek] : dataFieldSeek;
                        storageItem = this.GetCacheDataItem(cacheIndex);
                        if (!storageItem.IsTypeArray) return [3, 7];
                        length_3 = storageItem.Data.length;
                        removedArray = [];
                        context = new DrapoContext();
                        i = 0;
                        _a.label = 2;
                    case 2:
                        if (!(i < length_3)) return [3, 5];
                        data = storageItem.Data[i];
                        dataPathSeek = this.Application.Solver.CreateDataPath(dataKey, dataPath);
                        contextItem = context.Create(data, null, null, dataKey, dataKey, null, i);
                        return [4, this.Application.Solver.ResolveItemDataPathObject(sector, contextItem, dataPathSeek)];
                    case 3:
                        dataPathSeekValue = _a.sent();
                        if (!this.Application.Solver.IsEqualString(valueSeek, dataPathSeekValue))
                            return [3, 4];
                        removedArray.push(i);
                        _a.label = 4;
                    case 4:
                        i++;
                        return [3, 2];
                    case 5:
                        for (i = removedArray.length - 1; i >= 0; i--) {
                            index = removedArray[i];
                            this.DeleteDataItemIndex(storageItem, index);
                        }
                        return [4, this.NotifyChanges(storageItem, ((notify) && (removedArray.length > 0)), dataKey, null, null)];
                    case 6:
                        _a.sent();
                        return [3, 8];
                    case 7: return [2, (false)];
                    case 8: return [2, (true)];
                }
            });
        });
    };
    DrapoStorage.prototype.CreatePath = function (data) {
        return ([data]);
    };
    DrapoStorage.prototype.CreateDataPath = function (dataKey, dataField) {
        return ([dataKey, dataField]);
    };
    DrapoStorage.prototype.LoadDataDelayedAndNotify = function () {
        return __awaiter(this, void 0, void 0, function () {
            var dataKeys, i, dataKey, dataFields, item, cacheIndex, cacheItem, dataField, _a, _b, _i, dataField;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (this._isDelayTriggered)
                            return [2];
                        if (!this.Application.Observer.HasDelayKeys())
                            return [2];
                        this._isDelayTriggered = true;
                        dataKeys = this.Application.Observer.GetDelayKeys();
                        i = 0;
                        _c.label = 1;
                    case 1:
                        if (!(i < dataKeys.length)) return [3, 10];
                        dataKey = dataKeys[i];
                        dataFields = this.Application.Observer.GetDelayFields(dataKey);
                        if (dataFields.length == 0)
                            return [3, 9];
                        return [4, this.RetrieveDataItemInternal(dataKey, null, true, dataFields)];
                    case 2:
                        item = _c.sent();
                        if ((item == null) || (item.Data == null))
                            return [3, 9];
                        cacheIndex = this.GetCacheKeyIndex(dataKey, null);
                        if (!(cacheIndex == null)) return [3, 4];
                        return [4, this.AddCacheData(dataKey, null, item)];
                    case 3:
                        _c.sent();
                        return [3, 5];
                    case 4:
                        cacheItem = this.GetCacheDataItem(cacheIndex);
                        for (dataField in item.Data)
                            cacheItem.Data[dataField] = item.Data[dataField];
                        _c.label = 5;
                    case 5:
                        _a = [];
                        for (_b in item.Data)
                            _a.push(_b);
                        _i = 0;
                        _c.label = 6;
                    case 6:
                        if (!(_i < _a.length)) return [3, 9];
                        dataField = _a[_i];
                        return [4, this.Application.Observer.NotifyDelay(dataKey, [dataField])];
                    case 7:
                        _c.sent();
                        _c.label = 8;
                    case 8:
                        _i++;
                        return [3, 6];
                    case 9:
                        i++;
                        return [3, 1];
                    case 10:
                        this._isDelayTriggered = false;
                        return [2];
                }
            });
        });
    };
    DrapoStorage.prototype.RetrieveDataItem = function (dataKey, sector, canLoadDelay, dataDelayFields) {
        if (canLoadDelay === void 0) { canLoadDelay = false; }
        if (dataDelayFields === void 0) { dataDelayFields = null; }
        return __awaiter(this, void 0, void 0, function () {
            var cacheIndex, item, executionContext, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        cacheIndex = this.GetCacheKeyIndex(dataKey, sector);
                        if (cacheIndex != null)
                            return [2, (this.GetCacheDataItem(cacheIndex))];
                        return [4, this.RetrieveDataItemInternal(dataKey, sector, canLoadDelay, dataDelayFields)];
                    case 1:
                        item = _b.sent();
                        if (item === null)
                            return [2, (null)];
                        if (!item.OnLoad) return [3, 4];
                        executionContext = this.Application.FunctionHandler.CreateExecutionContext();
                        _a = executionContext;
                        return [4, this.Application.Debugger.HasBreakpoint(sector, dataKey)];
                    case 2:
                        _a.HasBreakpoint = _b.sent();
                        executionContext.Sector = sector;
                        executionContext.DataKey = dataKey;
                        return [4, this.Application.FunctionHandler.ResolveFunctionWithoutContext(sector, item.Element, item.OnLoad, executionContext)];
                    case 3:
                        _b.sent();
                        _b.label = 4;
                    case 4:
                        if (!item.CanCache) return [3, 7];
                        return [4, this.AddCacheData(dataKey, item.Sector, item)];
                    case 5:
                        _b.sent();
                        if (!(item.OnAfterCached != null)) return [3, 7];
                        return [4, this.Application.FunctionHandler.ResolveFunctionWithoutContext(sector, item.Element, item.OnAfterCached)];
                    case 6:
                        _b.sent();
                        _b.label = 7;
                    case 7: return [4, this.Application.Debugger.NotifyStorage(dataKey)];
                    case 8:
                        _b.sent();
                        return [2, (item)];
                }
            });
        });
    };
    DrapoStorage.prototype.Filter = function (sector, jqueryDataKeys) {
        var sectors = this.Application.Document.GetSectorsAllowed(sector);
        for (var i = 0; i < jqueryDataKeys.length; i++) {
            var el = jqueryDataKeys[i];
            var elSector = this.Application.Document.GetSector(el);
            if (elSector !== sector) {
                var elAccess = el.getAttribute('d-dataAccess');
                if (elAccess == 'private')
                    continue;
                var elType = el.getAttribute('d-dataType');
                if ((elAccess == null) && (elType === 'parent'))
                    continue;
            }
            if ((this.Application.Document.IsSectorAllowed(elSector, sectors)) && (!this.Application.Document.IsElementDetached(el)))
                return (el);
        }
        return (null);
    };
    DrapoStorage.prototype.GetDataKeyElement = function (dataKey, sector) {
        var jqueryDataKeys = $("[d-dataKey='" + dataKey + "']");
        var el = this.Filter(sector, jqueryDataKeys);
        return (el);
    };
    DrapoStorage.prototype.RetrieveDataItemInternal = function (dataKey, sector, canLoadDelay, dataDelayFields) {
        if (canLoadDelay === void 0) { canLoadDelay = false; }
        if (dataDelayFields === void 0) { dataDelayFields = null; }
        return __awaiter(this, void 0, void 0, function () {
            var itemSystem, el, dataUrlGet, isDelay, dataUrlParameters, dataUrlSet, dataPostGet, isLazy, dataStart, dataIncrement, isUnitOfWork, cookieName, isCookieChange, userConfig, isToken, type, access, value, dataSector, groupsAttribute, groups, pipes, canCache, cacheKeys, onLoad, onAfterContainerLoad, onBeforeContainerUnload, onAfterCached, onNotify, headersGet, headersSet, headersResponse, data, increment, isFull, item;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.RetrieveDataItemInternalSystem(dataKey)];
                    case 1:
                        itemSystem = _a.sent();
                        if (itemSystem !== null)
                            return [2, (itemSystem)];
                        el = this.GetDataKeyElement(dataKey, sector);
                        if (!(el == null)) return [3, 3];
                        return [4, this.Application.ExceptionHandler.HandleError('Storage - RetrieveDataItemInternal - Invalid DataKey: {0}', dataKey)];
                    case 2:
                        _a.sent();
                        return [2, (null)];
                    case 3:
                        dataUrlGet = el.getAttribute('d-dataUrlGet');
                        isDelay = el.getAttribute('d-dataDelay') === 'true';
                        if ((isDelay) && (!canLoadDelay))
                            return [2, (null)];
                        dataUrlParameters = el.getAttribute('d-dataUrlParameters');
                        if ((dataUrlParameters == null) || (dataUrlParameters == ''))
                            dataUrlParameters = 'optional';
                        dataUrlSet = el.getAttribute('d-dataUrlSet');
                        dataPostGet = el.getAttribute('d-dataPostGet');
                        isLazy = el.getAttribute('d-dataLazy') === 'true';
                        dataStart = el.getAttribute('d-dataLazyStart');
                        dataIncrement = el.getAttribute('d-dataLazyIncrement');
                        isUnitOfWork = el.getAttribute('d-dataUnitOfWork') === 'true';
                        cookieName = el.getAttribute('d-dataCookieGet');
                        isCookieChange = el.getAttribute('d-dataCookieChange') === 'true';
                        userConfig = el.getAttribute('d-dataUserConfig');
                        isToken = el.getAttribute('d-dataToken') === 'true';
                        type = el.getAttribute('d-dataType');
                        access = el.getAttribute('d-dataAccess');
                        value = el.getAttribute('d-dataValue');
                        dataSector = this.Application.Document.GetSector(el);
                        groupsAttribute = el.getAttribute('d-dataGroups');
                        groups = ((groupsAttribute == null) || (groupsAttribute == '')) ? null : this.Application.Parser.ParsePipes(groupsAttribute);
                        pipes = this.Application.Parser.ParsePipes(el.getAttribute('d-dataPipes'));
                        canCache = this.Application.Parser.ParseBoolean(el.getAttribute('d-dataCache'), true);
                        cacheKeys = this.Application.Parser.ParsePipes(el.getAttribute('d-dataCacheKeys'));
                        onLoad = type === 'function' ? value : null;
                        onAfterContainerLoad = el.getAttribute('d-dataOnAfterContainerLoad');
                        onBeforeContainerUnload = el.getAttribute('d-dataOnBeforeContainerUnLoad');
                        onAfterCached = el.getAttribute('d-dataOnAfterCached');
                        onNotify = el.getAttribute('d-dataOnNotify');
                        headersGet = this.ExtractDataHeaderGet(el);
                        headersSet = this.ExtractDataHeaderSet(el);
                        headersResponse = ((isCookieChange) || (type === 'file')) ? [] : null;
                        return [4, this.RetrieveDataKey(dataKey, sector, el, dataUrlGet, dataUrlParameters, dataPostGet, dataStart, dataIncrement, isDelay, dataDelayFields, cookieName, type, isToken, cacheKeys, headersGet, headersResponse)];
                    case 4:
                        data = _a.sent();
                        if (data == null) {
                            return [2, (null)];
                        }
                        if (type == null) {
                            if (data.length)
                                type = 'array';
                            else
                                type = 'object';
                        }
                        increment = this.Application.Parser.GetStringAsNumber(dataIncrement);
                        isFull = ((isLazy) && (data.length < increment)) ? true : false;
                        item = new DrapoStorageItem(type, access, el, data, dataUrlGet, dataUrlSet, dataUrlParameters, dataPostGet, this.Application.Parser.GetStringAsNumber(dataStart), increment, isLazy, isFull, isUnitOfWork, isDelay, cookieName, isCookieChange, userConfig, isToken, dataSector, groups, pipes, canCache, cacheKeys, onLoad, onAfterContainerLoad, onBeforeContainerUnload, onAfterCached, onNotify, headersGet, headersSet);
                        return [2, (item)];
                }
            });
        });
    };
    DrapoStorage.prototype.RetrieveDataKey = function (dataKey, sector, el, dataUrlGet, dataUrlParameters, dataPostGet, dataStart, dataIncrement, isDelay, dataDelayFields, cookieName, type, isToken, cacheKeys, headersGet, headersResponse) {
        return __awaiter(this, void 0, void 0, function () {
            var dataConfig;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(dataUrlGet != null)) return [3, 2];
                        return [4, this.RetrieveDataKeyUrl(dataKey, sector, dataUrlGet, dataUrlParameters, dataPostGet, dataStart, dataIncrement, type, isToken, cacheKeys, isDelay, dataDelayFields, headersGet, headersResponse)];
                    case 1: return [2, (_a.sent())];
                    case 2:
                        if (cookieName != null)
                            return [2, (this.RetrieveDataKeyCookie(cookieName))];
                        if (!(type != null)) return [3, 4];
                        return [4, this.RetrieveDataKeyInitialize(dataKey, sector, type, el)];
                    case 3: return [2, (_a.sent())];
                    case 4:
                        dataConfig = el.getAttribute('d-dataConfigGet');
                        if (!(dataConfig != null)) return [3, 6];
                        return [4, this.RetrieveDataKeyConfig(dataConfig)];
                    case 5: return [2, (_a.sent())];
                    case 6: return [2, (null)];
                }
            });
        });
    };
    DrapoStorage.prototype.RetrieveDataKeyUrl = function (dataKey, sector, dataUrlGet, dataUrlParameters, dataPostGet, dataStart, dataIncrement, type, isToken, cacheKeys, isDelay, dataDelayFields, headersGet, headersResponse) {
        if (cacheKeys === void 0) { cacheKeys = null; }
        if (isDelay === void 0) { isDelay = false; }
        if (dataDelayFields === void 0) { dataDelayFields = null; }
        if (headersGet === void 0) { headersGet = null; }
        if (headersResponse === void 0) { headersResponse = null; }
        return __awaiter(this, void 0, void 0, function () {
            var url, cachedData, changes, verb, data, contentType, headers, dataPostGetKey, _a, item, dataResponse;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        url = dataUrlGet;
                        if (!((false) && (isToken) && (!this.Application.Server.HasToken()))) return [3, 2];
                        return [4, this.Application.Document.RequestAuthorization(dataKey, 'notify')];
                    case 1:
                        _b.sent();
                        return [2, ([])];
                    case 2:
                        if (!isDelay) {
                            cachedData = this.Application.CacheHandler.GetCachedData(cacheKeys, sector, dataKey);
                            if (cachedData != null)
                                return [2, (cachedData)];
                        }
                        if (dataStart != null)
                            url = url.replace('{{start}}', dataStart);
                        if (dataIncrement != null)
                            url = url.replace('{{increment}}', dataIncrement);
                        changes = [];
                        return [4, this.ResolveDataUrlMustaches(dataKey, sector, url, null, changes)];
                    case 3:
                        url = _b.sent();
                        if ((dataUrlParameters === 'required') && (this.HasChangeNullOrEmpty(changes)))
                            return [2, ([])];
                        verb = "GET";
                        data = null;
                        contentType = null;
                        headers = [];
                        if (!isDelay) return [3, 4];
                        if (dataDelayFields === null)
                            return [2, ([])];
                        verb = "POST";
                        data = this.Application.Serializer.Serialize(dataDelayFields);
                        contentType = this.CONTENT_TYPE_JSON;
                        return [3, 11];
                    case 4:
                        if (!(dataPostGet != null)) return [3, 9];
                        verb = "POST";
                        if (!this.Application.Parser.IsMustache(dataPostGet)) return [3, 6];
                        return [4, this.ResolveMustaches(sector, dataPostGet)];
                    case 5:
                        _a = _b.sent();
                        return [3, 7];
                    case 6:
                        _a = dataPostGet;
                        _b.label = 7;
                    case 7:
                        dataPostGetKey = _a;
                        return [4, this.RetrieveDataItem(dataPostGetKey, sector)];
                    case 8:
                        item = _b.sent();
                        if (item !== null)
                            data = this.Application.Serializer.Serialize(item.Data);
                        contentType = this.CONTENT_TYPE_JSON;
                        this.Application.Observer.SubscribeStorage(dataPostGetKey, null, dataKey);
                        return [3, 11];
                    case 9: return [4, this.ResolveDataHeaders(dataKey, sector, headersGet, null)];
                    case 10:
                        headers = _b.sent();
                        _b.label = 11;
                    case 11:
                        dataResponse = null;
                        if (!(type === 'file')) return [3, 13];
                        return [4, this.Application.Server.GetFile(url, dataKey, headers, headersResponse)];
                    case 12:
                        dataResponse = _b.sent();
                        return [3, 15];
                    case 13: return [4, this.Application.Server.GetJSON(url, verb, data, contentType, dataKey, headers, headersResponse)];
                    case 14:
                        dataResponse = _b.sent();
                        _b.label = 15;
                    case 15:
                        this.Application.CacheHandler.AppendCacheData(cacheKeys, sector, dataKey, dataResponse, isDelay);
                        return [2, (dataResponse)];
                }
            });
        });
    };
    DrapoStorage.prototype.HasChangeNullOrEmpty = function (changes) {
        for (var i = 0; i < changes.length; i++) {
            var change = changes[i];
            var value = change[1];
            if ((value === null) || (value === ''))
                return (true);
        }
        return (false);
    };
    DrapoStorage.prototype.ExtractDataHeaderGet = function (el) {
        var attributes = [];
        for (var i = 0; i < el.attributes.length; i++) {
            var attribute = el.attributes[i];
            var attributeProperty = this.ExtractDataHeaderGetProperty(attribute.nodeName);
            if (attributeProperty != null)
                attributes.push([attributeProperty, attribute.nodeValue]);
        }
        return (attributes);
    };
    DrapoStorage.prototype.ExtractDataHeaderGetProperty = function (property) {
        var parse = this.Application.Parser.ParseProperty(property);
        if (parse.length != 3)
            return (null);
        if (parse[0] != 'd')
            return (null);
        if (parse[1].toLowerCase() != 'dataheaderget')
            return (null);
        return (parse[2]);
    };
    DrapoStorage.prototype.ExtractDataHeaderSet = function (el) {
        var attributes = [];
        for (var i = 0; i < el.attributes.length; i++) {
            var attribute = el.attributes[i];
            var attributeProperty = this.ExtractDataHeaderSetProperty(attribute.nodeName);
            if (attributeProperty != null)
                attributes.push([attributeProperty, attribute.nodeValue]);
        }
        return (attributes);
    };
    DrapoStorage.prototype.ExtractDataHeaderSetProperty = function (property) {
        var parse = this.Application.Parser.ParseProperty(property);
        if (parse.length != 3)
            return (null);
        if (parse[0] != 'd')
            return (null);
        if (parse[1].toLowerCase() != 'dataheaderset')
            return (null);
        return (parse[2]);
    };
    DrapoStorage.prototype.ResolveDataUrlMustaches = function (dataKey, sector, url, executionContext, changes) {
        if (changes === void 0) { changes = null; }
        return __awaiter(this, void 0, void 0, function () {
            var mustaches, i, mustache, mustacheParts, mustacheDataKey, change, mustacheDataFields, mustacheData, mustacheDataEncoded;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mustaches = this.Application.Parser.ParseMustaches(url);
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < mustaches.length)) return [3, 4];
                        mustache = mustaches[i];
                        mustacheParts = this.Application.Parser.ParseMustache(mustache);
                        mustacheDataKey = this.Application.Solver.ResolveDataKey(mustacheParts);
                        change = [mustache, null];
                        if (changes != null)
                            changes.push(change);
                        if (!this.IsDataKey(mustacheDataKey, sector))
                            return [3, 3];
                        mustacheDataFields = this.Application.Solver.ResolveDataFields(mustacheParts);
                        return [4, this.Application.Storage.EnsureDataKeyFieldReady(mustacheDataKey, sector, mustacheParts)];
                    case 2:
                        if (!(_a.sent()))
                            return [3, 3];
                        mustacheData = this.Application.Storage.GetDataKeyField(mustacheDataKey, sector, mustacheParts, executionContext);
                        if (mustacheData == null)
                            return [3, 3];
                        mustacheDataEncoded = this.Application.Server.EnsureUrlComponentEncoded(mustacheData);
                        url = url.replace(mustache, mustacheDataEncoded);
                        change[1] = mustacheDataEncoded;
                        if (dataKey !== null)
                            this.Application.Observer.SubscribeStorage(mustacheDataKey, mustacheDataFields, dataKey);
                        _a.label = 3;
                    case 3:
                        i++;
                        return [3, 1];
                    case 4: return [2, (url)];
                }
            });
        });
    };
    DrapoStorage.prototype.ResolveDataHeaders = function (dataKey, sector, headers, executionContext) {
        return __awaiter(this, void 0, void 0, function () {
            var headersData, isSectorActive, i, header, headerValue, headerDataKey, data, headerMustacheParts, headerDataFields, dataItem, dataSerialized, dataEncoded;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        headersData = [];
                        if (headers === null)
                            return [2, (headersData)];
                        isSectorActive = (executionContext === null) || (!executionContext.HasSectorContainer(sector));
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < headers.length)) return [3, 7];
                        header = headers[i];
                        headerValue = header[1];
                        headerDataKey = null;
                        data = null;
                        if (!!this.Application.Parser.IsMustache(headerValue)) return [3, 3];
                        headerDataKey = headerValue;
                        return [4, this.RetrieveData(headerDataKey, sector, executionContext)];
                    case 2:
                        data = _a.sent();
                        if (isSectorActive)
                            this.Application.Observer.SubscribeStorage(headerDataKey, null, dataKey);
                        return [3, 5];
                    case 3:
                        headerMustacheParts = this.Application.Parser.ParseMustache(headerValue);
                        headerDataKey = this.Application.Solver.ResolveDataKey(headerMustacheParts);
                        headerDataFields = this.Application.Solver.ResolveDataFields(headerMustacheParts);
                        return [4, this.RetrieveDataItem(headerDataKey, sector)];
                    case 4:
                        dataItem = _a.sent();
                        data = this.Application.Solver.ResolveItemStoragePathObject(dataItem, headerMustacheParts);
                        if (isSectorActive)
                            this.Application.Observer.SubscribeStorage(headerDataKey, headerDataFields, dataKey);
                        _a.label = 5;
                    case 5:
                        if (data == null)
                            return [3, 6];
                        dataSerialized = this.Application.Serializer.Serialize(data);
                        dataEncoded = this.Application.Serializer.EncodeHeaderFieldValue(dataSerialized);
                        headersData.push([header[0], dataEncoded]);
                        _a.label = 6;
                    case 6:
                        i++;
                        return [3, 1];
                    case 7: return [2, (headersData)];
                }
            });
        });
    };
    DrapoStorage.prototype.ResolveMustachesRecursive = function (sector, data) {
        return __awaiter(this, void 0, void 0, function () {
            var dataResolved;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.ResolveMustaches(sector, data, true)];
                    case 1:
                        dataResolved = _a.sent();
                        if (dataResolved === data)
                            return [2, (dataResolved)];
                        return [4, this.ResolveMustachesRecursive(sector, dataResolved)];
                    case 2: return [2, (_a.sent())];
                }
            });
        });
    };
    DrapoStorage.prototype.ResolveMustaches = function (sector, data, canSubscribe) {
        if (canSubscribe === void 0) { canSubscribe = false; }
        return __awaiter(this, void 0, void 0, function () {
            var mustaches, i, mustache, mustacheParts, mustacheDataKey, mustacheDataFields, mustacheData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mustaches = this.Application.Parser.ParseMustaches(data);
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < mustaches.length)) return [3, 4];
                        mustache = mustaches[i];
                        mustacheParts = this.Application.Parser.ParseMustache(mustache);
                        mustacheDataKey = this.Application.Solver.ResolveDataKey(mustacheParts);
                        if (!this.IsDataKey(mustacheDataKey, sector))
                            return [3, 3];
                        mustacheDataFields = this.Application.Solver.ResolveDataFields(mustacheParts);
                        return [4, this.Application.Storage.EnsureDataKeyFieldReady(mustacheDataKey, sector, mustacheParts)];
                    case 2:
                        if (!(_a.sent())) {
                            if (!canSubscribe)
                                return [3, 3];
                            this.Application.Observer.SubscribeDelay(null, mustacheDataKey, this.Application.Solver.ResolveDataFields(mustacheParts));
                            return [2, (data)];
                        }
                        mustacheData = this.Application.Storage.GetDataKeyField(mustacheDataKey, sector, mustacheParts);
                        if (mustacheData == null)
                            return [3, 3];
                        data = data.replace(mustache, mustacheData);
                        _a.label = 3;
                    case 3:
                        i++;
                        return [3, 1];
                    case 4: return [2, (data)];
                }
            });
        });
    };
    DrapoStorage.prototype.ReactivateDataUrlMustache = function (dataKey, sector, item) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (item.UrlGet == null)
                            return [2];
                        return [4, this.ResolveDataUrlMustaches(dataKey, sector, item.UrlGet, null)];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    DrapoStorage.prototype.RetrieveDataKeyInitialize = function (dataKey, sector, type, el) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (type == 'object')
                            return [2, (this.RetrieveDataKeyInitializeObject(el))];
                        if (type == 'array')
                            return [2, (this.RetrieveDataKeyInitializeArray(el))];
                        if (type == 'value')
                            return [2, (this.RetrieveDataKeyInitializeValue(el))];
                        if (!(type == 'mapping')) return [3, 2];
                        return [4, this.RetrieveDataKeyInitializeMapping(el, sector)];
                    case 1: return [2, (_a.sent())];
                    case 2:
                        if (!(type == 'function')) return [3, 4];
                        return [4, this.RetrieveDataKeyInitializeFunction(dataKey, el)];
                    case 3: return [2, (_a.sent())];
                    case 4:
                        if (type == 'querystring')
                            return [2, (this.RetrieveDataKeyInitializeQueryString(el, sector))];
                        if (type == 'query')
                            return [2, (this.RetrieveDataKeyInitializeQuery(el, sector, dataKey))];
                        if (type == 'parent')
                            return [2, (this.RetrieveDataKeyInitializeParent(el, sector))];
                        return [2, (null)];
                }
            });
        });
    };
    DrapoStorage.prototype.RetrieveDataKeyInitializeValue = function (el) {
        var dataValue = el.getAttribute('d-dataValue');
        if (dataValue != null)
            return (dataValue);
        return ('');
    };
    DrapoStorage.prototype.RetrieveDataKeyInitializeArray = function (el) {
        var dataValue = el.getAttribute('d-dataValue');
        if (dataValue == null)
            return ([]);
        var data = this.Application.Parser.ParseIterator(dataValue);
        if (data.length)
            return (data);
        return ([data]);
    };
    DrapoStorage.prototype.RetrieveDataKeyInitializeMapping = function (el, sector) {
        return __awaiter(this, void 0, void 0, function () {
            var dataValue, isReference, dataValueResolved, dataReference, storageItemMapped, data, dataMappingField, dataMappingFieldResolved, dataPath, dataPathFull, dataMappingSearchField, dataMappingSearchValue, dataMappingSearchHierarchyField, dataPath;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dataValue = el.getAttribute('d-dataValue');
                        if (dataValue == null)
                            return [2, ([])];
                        isReference = el.getAttribute('d-dataLoadType') === 'reference';
                        dataValueResolved = dataValue;
                        if (!this.Application.Parser.IsMustache(dataValue)) return [3, 2];
                        return [4, this.ResolveMustaches(sector, dataValue)];
                    case 1:
                        dataValueResolved = _a.sent();
                        _a.label = 2;
                    case 2:
                        if (!isReference) return [3, 4];
                        el.setAttribute('d-dataValue', dataValueResolved);
                        return [4, this.RetrieveDataValue(sector, dataValueResolved)];
                    case 3:
                        dataReference = _a.sent();
                        return [2, (this.Application.Solver.Clone(dataReference, true))];
                    case 4: return [4, this.RetrieveDataItem(dataValueResolved, sector)];
                    case 5:
                        storageItemMapped = _a.sent();
                        if (storageItemMapped === null)
                            return [2, (null)];
                        data = storageItemMapped.Data;
                        dataMappingField = el.getAttribute('d-dataMappingField');
                        if (!((dataMappingField != null) && (dataMappingField != ''))) return [3, 7];
                        return [4, this.ResolveMustaches(sector, dataMappingField)];
                    case 6:
                        dataMappingFieldResolved = _a.sent();
                        dataPath = this.Application.Parser.ParsePath(dataMappingFieldResolved);
                        dataPathFull = this.Application.Solver.CreateDataPath(dataValueResolved, dataPath);
                        data = this.Application.Solver.ResolveDataObjectPathObject(data, dataPathFull);
                        if (data === null)
                            return [2, (null)];
                        _a.label = 7;
                    case 7:
                        dataMappingSearchField = el.getAttribute('d-dataMappingSearchField');
                        dataMappingSearchValue = el.getAttribute('d-dataMappingSearchValue');
                        dataMappingSearchHierarchyField = el.getAttribute('d-dataMappingSearchHierarchyField');
                        if (!((dataMappingSearchField != null) && (dataMappingSearchField != '') && (dataMappingSearchValue != null) && (dataMappingSearchValue != ''))) return [3, 10];
                        if (!this.Application.Parser.IsMustache(dataMappingSearchValue)) return [3, 9];
                        dataPath = this.Application.Parser.ParseMustache(dataMappingSearchValue);
                        return [4, this.Application.Solver.ResolveItemDataPathObject(sector, null, dataPath)];
                    case 8:
                        dataMappingSearchValue = _a.sent();
                        _a.label = 9;
                    case 9:
                        data = this.Application.Solver.ResolveDataObjectLookupHierarchy(data, dataMappingSearchField, dataMappingSearchValue, dataMappingSearchHierarchyField);
                        _a.label = 10;
                    case 10: return [2, (this.Application.Solver.Clone(data, true))];
                }
            });
        });
    };
    DrapoStorage.prototype.RetrieveDataKeyInitializeFunction = function (dataKey, el) {
        return __awaiter(this, void 0, void 0, function () {
            var dataValue, isToken;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dataValue = el.getAttribute('d-dataValue');
                        if (dataValue == null)
                            return [2, ([])];
                        isToken = el.getAttribute('d-dataToken') === 'true';
                        if (!isToken) return [3, 2];
                        if (!((!this.Application.Server.HasToken()) && (this.Application.Observer.HasPendingAuthorization()))) return [3, 2];
                        return [4, this.Application.Document.RequestAuthorization(dataKey, 'initialize')];
                    case 1:
                        _a.sent();
                        return [2, (null)];
                    case 2: return [2, ([])];
                }
            });
        });
    };
    DrapoStorage.prototype.RetrieveDataKeyInitializeQueryString = function (el, sector) {
        return __awaiter(this, void 0, void 0, function () {
            var object, canUseRouter, dictionary, i, keyValuePair, key, value;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.RetrieveDataKeyInitializeMapping(el, sector)];
                    case 1:
                        object = _a.sent();
                        if ((object !== null) && (((object.length) && (object.length > 0)) || (Object.keys(object).length > 0)))
                            return [2, (object)];
                        object = {};
                        return [4, this.Application.Router.CanUseRouter()];
                    case 2:
                        canUseRouter = _a.sent();
                        return [4, this.Application.Document.ExtractQueryString(canUseRouter)];
                    case 3:
                        dictionary = _a.sent();
                        for (i = 0; i < dictionary.length; i++) {
                            keyValuePair = dictionary[i];
                            key = keyValuePair[0];
                            value = keyValuePair[1];
                            object[key] = value;
                        }
                        return [2, (object)];
                }
            });
        });
    };
    DrapoStorage.prototype.RetrieveDataKeyInitializeQuery = function (el, sector, dataKey) {
        return __awaiter(this, void 0, void 0, function () {
            var dataValue, query;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dataValue = el.getAttribute('d-dataValue');
                        if (!(dataValue == null)) return [3, 2];
                        return [4, this.Application.ExceptionHandler.HandleError('There is no d-datavalue in: {0}', dataKey)];
                    case 1:
                        _a.sent();
                        return [2, ([])];
                    case 2:
                        query = this.Application.Parser.ParseQuery(dataValue);
                        if (!(query === null)) return [3, 4];
                        return [4, this.Application.ExceptionHandler.HandleError('There is an error in query d-datavalue in: {0}', dataKey)];
                    case 3:
                        _a.sent();
                        return [2, ([])];
                    case 4:
                        if (!(query.Error !== null)) return [3, 6];
                        return [4, this.Application.ExceptionHandler.HandleError('Error parsing the query in: {0}. {1}', dataKey, query.Error)];
                    case 5:
                        _a.sent();
                        return [2, ([])];
                    case 6:
                        if (!(query.Sources.length > 2)) return [3, 8];
                        return [4, this.Application.ExceptionHandler.HandleError('Only support for 2 sources in query: {0}', dataKey)];
                    case 7:
                        _a.sent();
                        return [2, ([])];
                    case 8: return [4, this.ExecuteQuery(sector, dataKey, query)];
                    case 9: return [2, (_a.sent())];
                }
            });
        });
    };
    DrapoStorage.prototype.RetrieveDataKeyInitializeParent = function (el, sector) {
        var dataValue = el.getAttribute('d-dataValue');
        var isReference = el.getAttribute('d-dataLoadType') === 'reference';
        var elParent = el.parentElement;
        var elParentAttributes = null;
        while ((elParent !== null) && ((elParentAttributes = this.Application.Document.GetElementAttributesFilteredPrefix(elParent, dataValue)).length == 0))
            elParent = elParent.parentElement;
        return (this.BuildObject(sector, isReference, elParentAttributes));
    };
    DrapoStorage.prototype.BuildObject = function (sector, isReference, attributes) {
        return __awaiter(this, void 0, void 0, function () {
            var object, hasDelay, i, keyValuePair, key, value, valueResolved, _a, i, keyValuePair, key, value, valueResolved;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        object = {};
                        hasDelay = false;
                        i = 0;
                        _b.label = 1;
                    case 1:
                        if (!(i < attributes.length)) return [3, 6];
                        keyValuePair = attributes[i];
                        key = keyValuePair[0];
                        value = keyValuePair[1];
                        if (!isReference) return [3, 3];
                        return [4, this.ResolveMustachesRecursive(sector, value)];
                    case 2:
                        _a = _b.sent();
                        return [3, 4];
                    case 3:
                        _a = value;
                        _b.label = 4;
                    case 4:
                        valueResolved = _a;
                        if ((isReference) && (this.Application.Parser.IsMustache(valueResolved)))
                            hasDelay = true;
                        object[key] = valueResolved;
                        _b.label = 5;
                    case 5:
                        i++;
                        return [3, 1];
                    case 6:
                        if (!hasDelay) return [3, 11];
                        return [4, this.Application.Storage.LoadDataDelayedAndNotify()];
                    case 7:
                        _b.sent();
                        i = 0;
                        _b.label = 8;
                    case 8:
                        if (!(i < attributes.length)) return [3, 11];
                        keyValuePair = attributes[i];
                        key = keyValuePair[0];
                        value = object[key];
                        if (!this.Application.Parser.IsMustache(value))
                            return [3, 10];
                        return [4, this.ResolveMustachesRecursive(sector, value)];
                    case 9:
                        valueResolved = _b.sent();
                        object[key] = valueResolved;
                        _b.label = 10;
                    case 10:
                        i++;
                        return [3, 8];
                    case 11: return [2, (object)];
                }
            });
        });
    };
    DrapoStorage.prototype.RetrieveDataKeyInitializeObject = function (el) {
        var dataValue = el.getAttribute('d-dataValue');
        if ((dataValue != null) && (this.Application.Serializer.IsJson(dataValue))) {
            return (this.Application.Serializer.Deserialize(dataValue));
        }
        var object = {};
        var propertyKeys = [];
        var propertyNames = [];
        var propertyValues = [];
        for (var i = 0; i < el.attributes.length; i++) {
            var attribute = el.attributes[i];
            this.RetrieveDataProperty(object, attribute.nodeName, attribute.nodeValue, propertyKeys, propertyNames, propertyValues);
        }
        return (object);
    };
    DrapoStorage.prototype.RetrieveDataProperty = function (object, property, value, propertyKeys, propertyNames, propertyValues) {
        var parse = this.Application.Parser.ParseProperty(property);
        if (parse.length < 3)
            return (false);
        if (parse[0] != 'd')
            return (false);
        if (parse[1].toLowerCase() != 'dataproperty')
            return (false);
        if (parse.length == 3) {
            object[parse[2]] = value;
            return (true);
        }
        var key = parse[2];
        var nameOrValue = parse[3];
        var index = this.RetrieveDataPropertyKeyIndex(propertyKeys, key);
        if (nameOrValue == 'name') {
            if (index < 0) {
                index = propertyKeys.push(key);
                propertyNames.push(value);
                propertyValues.push(null);
                return (false);
            }
            else {
                propertyNames[index] = value;
                object[value] = propertyValues[index];
                return (true);
            }
        }
        if (nameOrValue == 'value') {
            if (index < 0) {
                index = propertyKeys.push(key);
                propertyNames.push(null);
                propertyValues.push(value);
                return (false);
            }
            else {
                propertyValues[index] = value;
                object[propertyNames[index]] = value;
                return (true);
            }
        }
        return (false);
    };
    DrapoStorage.prototype.RetrieveDataPropertyKeyIndex = function (propertyKeys, key) {
        for (var i = propertyKeys.length - 1; i >= 0; i--)
            if (propertyKeys[i] == key)
                return (i);
        return (-1);
    };
    DrapoStorage.prototype.RetrieveDataKeyConfig = function (sector) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.Application.Config.GetSector(sector)];
                    case 1: return [2, (_a.sent())];
                }
            });
        });
    };
    DrapoStorage.prototype.RetrieveDataKeyCookie = function (name) {
        return (this.Application.CookieHandler.RetrieveData(name));
    };
    DrapoStorage.prototype.RetrieveIterator = function (dataKey, dataKeyParts, context) {
        if (dataKeyParts[0] == context.Item.Key)
            return (this.RetrieveIteratorChild(dataKey, dataKeyParts, context.Item.Data));
        return (null);
    };
    DrapoStorage.prototype.RetrieveIteratorChild = function (dataKey, dataKeyParts, contextData) {
        var current = contextData;
        for (var i = 1; i < dataKeyParts.length; i++) {
            var dataKeyCurrent = dataKeyParts[i];
            if (current[dataKeyCurrent] === 'undefined')
                return (null);
            current = current[dataKeyCurrent];
        }
        return (new DrapoStorageItem('array', null, null, current, null, null, null, null, null, null, false, true, false, false, null, false, null, false, null, null, null, false, null, null, null, null, null, null, null, null));
    };
    DrapoStorage.prototype.AddDataItem = function (dataKey, dataPath, sector, item, notify) {
        if (notify === void 0) { notify = true; }
        return __awaiter(this, void 0, void 0, function () {
            var dataItem, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.RetrieveDataItem(dataKey, sector)];
                    case 1:
                        dataItem = _a.sent();
                        if (dataItem == null)
                            return [2, (false)];
                        data = dataItem.Data;
                        if (dataPath != null)
                            data = this.Application.Solver.ResolveDataObjectPathObject(data, dataPath);
                        data.push(item);
                        if (dataItem.IsUnitOfWork)
                            dataItem.DataInserted.push(item);
                        return [4, this.NotifyChanges(dataItem, notify, dataKey, null, null)];
                    case 2:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    DrapoStorage.prototype.ToggleData = function (dataKey, dataPath, sector, item, notify) {
        if (notify === void 0) { notify = true; }
        return __awaiter(this, void 0, void 0, function () {
            var dataItem, data, found, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.RetrieveDataItem(dataKey, sector)];
                    case 1:
                        dataItem = _a.sent();
                        if (dataItem == null)
                            return [2, (false)];
                        data = dataItem.Data;
                        if (dataPath != null)
                            data = this.Application.Solver.ResolveDataObjectPathObject(data, dataPath);
                        found = false;
                        for (i = 0; i < data.length; i++) {
                            if (data[i] != item)
                                continue;
                            found = true;
                            data.splice(i, 1);
                        }
                        if (!found)
                            data.push(item);
                        return [4, this.NotifyChanges(dataItem, notify, dataKey, null, null)];
                    case 2:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    DrapoStorage.prototype.GetDataItemLast = function (dataKey, sector) {
        return __awaiter(this, void 0, void 0, function () {
            var dataItem;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.RetrieveDataItem(dataKey, sector)];
                    case 1:
                        dataItem = _a.sent();
                        if (dataItem == null)
                            return [2, (null)];
                        if (dataItem.Data.length == 0)
                            return [2, (null)];
                        return [2, (dataItem.Data[dataItem.Data.length - 1])];
                }
            });
        });
    };
    DrapoStorage.prototype.FlagDataItemAsUpdated = function (dataKey, sector, index, notify) {
        if (notify === void 0) { notify = true; }
        return __awaiter(this, void 0, void 0, function () {
            var dataItem;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.RetrieveDataItem(dataKey, sector)];
                    case 1:
                        dataItem = _a.sent();
                        if (dataItem == null)
                            return [2, (false)];
                        this.FlagAsUpdated(dataItem, index);
                        return [4, this.NotifyChanges(dataItem, notify, dataKey, null, null)];
                    case 2:
                        _a.sent();
                        return [2, (true)];
                }
            });
        });
    };
    DrapoStorage.prototype.NotifyChanges = function (dataItem, notify, dataKey, dataIndex, dataFields, canUseDifference) {
        if (canUseDifference === void 0) { canUseDifference = true; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dataItem.HasChanges = true;
                        if (!notify) return [3, 2];
                        return [4, this.Application.Observer.Notify(dataKey, dataIndex, dataFields, canUseDifference)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2];
                }
            });
        });
    };
    DrapoStorage.prototype.NotifyNoChanges = function (dataItem, notify, dataKey) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dataItem.HasChanges = false;
                        if (!notify) return [3, 2];
                        return [4, this.Application.Observer.Notify(dataKey, null, ['_HasChanges'])];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2];
                }
            });
        });
    };
    DrapoStorage.prototype.FlagAsUpdated = function (dataItem, index) {
        if (!dataItem.IsUnitOfWork)
            return (false);
        var dataArray = dataItem.Data;
        if (dataArray.length <= index)
            return (false);
        var data = dataArray[index];
        for (var i = dataItem.DataUpdated.length - 1; i >= 0; i--)
            if (dataItem.DataUpdated[i] === data)
                return (false);
        dataItem.DataUpdated.push(data);
        return (true);
    };
    DrapoStorage.prototype.GetCacheKeys = function () {
        return (this._cacheKeys);
    };
    DrapoStorage.prototype.GetCacheKeyIndex = function (dataKey, sector) {
        var sectors = this.Application.Document.GetSectorsAllowed(sector);
        for (var i = 0; i < this._cacheKeys.length; i++) {
            var storageItem = this._cacheItems[i];
            var isAccessPublic = storageItem.IsAccessPublic;
            if ((this._cacheKeys[i] == dataKey) && ((this.Application.Document.IsSystemKey(dataKey)) || (storageItem.Sector === sector) || ((isAccessPublic) && (this.Application.Document.IsSectorAllowed(storageItem.Sector, sectors)))))
                return (i);
        }
        return (null);
    };
    DrapoStorage.prototype.IsDataReady = function (sector, dataKey) {
        var index = this.GetCacheKeyIndex(dataKey, sector);
        return (index !== null);
    };
    DrapoStorage.prototype.GetCacheStorageItem = function (dataKey, sector, executionContext) {
        if ((executionContext !== null) && (executionContext.HasSectorContainer(sector)))
            return (this.Application.SectorContainerHandler.GetStorageItem(sector, executionContext.GetSectorContainer(sector), dataKey));
        var index = this.GetCacheKeyIndex(dataKey, sector);
        if (index === null)
            return (null);
        return (this.GetCacheDataItem(index));
    };
    DrapoStorage.prototype.GetCacheData = function (dataIndex) {
        return (this._cacheItems[dataIndex].Data);
    };
    DrapoStorage.prototype.GetCacheDataItem = function (dataIndex) {
        return (this._cacheItems[dataIndex]);
    };
    DrapoStorage.prototype.AddCacheData = function (dataKey, sector, dataItem, canFireEventOnAfterCached) {
        if (canFireEventOnAfterCached === void 0) { canFireEventOnAfterCached = true; }
        return __awaiter(this, void 0, void 0, function () {
            var index;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this._cacheKeys.push(dataKey);
                        index = this._cacheItems.push(dataItem) - 1;
                        if (!((canFireEventOnAfterCached) && (dataItem.OnAfterCached != null))) return [3, 2];
                        return [4, this.Application.FunctionHandler.ResolveFunctionWithoutContext(sector, dataItem.Element, dataItem.OnAfterCached)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2, (index)];
                }
            });
        });
    };
    DrapoStorage.prototype.FireEventOnNotify = function (dataKey) {
        return __awaiter(this, void 0, void 0, function () {
            var i, cacheKey, storageItem;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        i = this._cacheKeys.length - 1;
                        _a.label = 1;
                    case 1:
                        if (!(i >= 0)) return [3, 4];
                        cacheKey = this._cacheKeys[i];
                        if (cacheKey != dataKey)
                            return [3, 3];
                        storageItem = this._cacheItems[i];
                        if (storageItem.OnNotify == null)
                            return [3, 3];
                        return [4, this.Application.FunctionHandler.ResolveFunctionWithoutContext(storageItem.Sector, null, storageItem.OnNotify)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        i--;
                        return [3, 1];
                    case 4: return [2];
                }
            });
        });
    };
    DrapoStorage.prototype.RemoveCacheData = function (index, canRemoveObservers) {
        if (canRemoveObservers === void 0) { canRemoveObservers = true; }
        if (canRemoveObservers)
            this.Application.Observer.Unsubscribe(this._cacheKeys[index]);
        this._cacheKeys.splice(index, 1);
        this._cacheItems.splice(index, 1);
    };
    DrapoStorage.prototype.AppendCacheDataItemBySector = function (storageItems, sector) {
        for (var i = this._cacheItems.length - 1; i >= 0; i--) {
            var storageItem = this._cacheItems[i];
            if (storageItem.Sector !== sector)
                continue;
            storageItems.push([this._cacheKeys[i], this._cacheItems[i]]);
        }
    };
    DrapoStorage.prototype.AddCacheDataItems = function (storageItems) {
        for (var i = storageItems.length - 1; i >= 0; i--) {
            var storageItem = storageItems[i];
            this._cacheKeys.push(storageItem[0]);
            this._cacheItems.push(storageItem[1]);
        }
    };
    DrapoStorage.prototype.RemoveBySector = function (sector) {
        for (var i = this._cacheItems.length - 1; i >= 0; i--) {
            var storageItem = this._cacheItems[i];
            if (storageItem.Sector !== sector)
                continue;
            this._cacheKeys.splice(i, 1);
            this._cacheItems.splice(i, 1);
        }
    };
    DrapoStorage.prototype.DiscardCacheData = function (dataKey, sector, canRemoveObservers) {
        if (canRemoveObservers === void 0) { canRemoveObservers = false; }
        var dataKeyIndex = this.GetCacheKeyIndex(dataKey, sector);
        if (dataKeyIndex == null)
            return (false);
        this.RemoveCacheData(dataKeyIndex, canRemoveObservers);
        return (true);
    };
    DrapoStorage.prototype.DiscardCacheDataBySector = function (sector) {
        var removed = false;
        for (var i = this._cacheItems.length - 1; i >= 0; i--) {
            var item = this._cacheItems[i];
            if (item.Sector !== sector)
                continue;
            var dataKey = this._cacheKeys[i];
            if (this.DiscardCacheData(dataKey, item.Sector))
                removed = true;
        }
        return (removed);
    };
    DrapoStorage.prototype.DeleteDataItem = function (dataKey, dataPath, sector, item) {
        return __awaiter(this, void 0, void 0, function () {
            var dataItem, data, index;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.RetrieveDataItem(dataKey, sector)];
                    case 1:
                        dataItem = _a.sent();
                        if (dataItem == null)
                            return [2, (false)];
                        data = dataItem.Data;
                        if (data == null)
                            return [2, (false)];
                        if (dataPath != null)
                            data = this.Application.Solver.ResolveDataObjectPathObject(data, dataPath);
                        index = this.GetDataItemIndex(data, item);
                        if (index == null)
                            return [2, (false)];
                        if (dataItem.IsUnitOfWork)
                            dataItem.DataDeleted.push(item);
                        data.splice(index, 1);
                        return [2, (true)];
                }
            });
        });
    };
    DrapoStorage.prototype.DeleteDataItemIndex = function (dataItem, index) {
        var data = dataItem.Data;
        if (data == null)
            return (false);
        var item = data[index];
        if (item == null)
            return (false);
        if (dataItem.IsUnitOfWork)
            dataItem.DataDeleted.push(item);
        data.splice(index, 1);
        return (true);
    };
    DrapoStorage.prototype.GetDataItemIndex = function (data, item) {
        for (var i = 0; i < data.length; i++)
            if (data[i] == item)
                return (i);
        return (null);
    };
    DrapoStorage.prototype.PostData = function (dataKey, sector, dataKeyResponse, notify, executionContext) {
        return __awaiter(this, void 0, void 0, function () {
            var dataItem, dataItemResponse, _a, _b, headers, url, object, headersResponse, data;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4, this.RetrieveDataItemContext(dataKey, sector, executionContext)];
                    case 1:
                        dataItem = _c.sent();
                        if (dataItem == null)
                            return [2, (false)];
                        if (dataItem.CookieName != null)
                            return [2, (this.Application.CookieHandler.SetCookieValue(dataItem))];
                        if (dataItem.Type === 'mapping')
                            return [2, (this.PostDataMapping(dataKey, sector, dataItem, notify, executionContext))];
                        if (!(dataKeyResponse == '')) return [3, 2];
                        _a = null;
                        return [3, 6];
                    case 2:
                        if (!(dataKey == dataKeyResponse)) return [3, 3];
                        _b = dataItem;
                        return [3, 5];
                    case 3: return [4, this.RetrieveDataItem(dataKeyResponse, sector)];
                    case 4:
                        _b = _c.sent();
                        _c.label = 5;
                    case 5:
                        _a = (_b);
                        _c.label = 6;
                    case 6:
                        dataItemResponse = _a;
                        return [4, this.ResolveDataHeaders(dataKey, sector, dataItem.HeadersSet, executionContext)];
                    case 7:
                        headers = _c.sent();
                        url = dataItem.UrlSet;
                        return [4, this.ResolveDataUrlMustaches(null, sector, url, executionContext)];
                    case 8:
                        url = _c.sent();
                        object = {};
                        if (dataItem.IsUnitOfWork) {
                            if (dataItem.DataInserted.length > 0)
                                object.Inserted = dataItem.DataInserted;
                            if (dataItem.DataUpdated.length > 0)
                                object.Updated = dataItem.DataUpdated;
                            if (dataItem.DataDeleted.length > 0)
                                object.Deleted = dataItem.DataDeleted;
                        }
                        else {
                            object.Entities = dataItem.Data;
                        }
                        headersResponse = dataItem.IsCookieChange ? [] : null;
                        return [4, this.Application.Server.GetJSON(url, "POST", this.Application.Serializer.Serialize(object), this.CONTENT_TYPE_JSON, null, headers)];
                    case 9:
                        data = _c.sent();
                        if (this.Application.Server.HasBadRequest)
                            return [2, (false)];
                        if ((data != null) && (dataItemResponse != null))
                            dataItemResponse.Data = data;
                        dataItem.DataInserted = [];
                        dataItem.DataUpdated = [];
                        dataItem.DataDeleted = [];
                        if (!(dataKey !== dataKeyResponse)) return [3, 11];
                        return [4, this.NotifyNoChanges(dataItem, notify, dataKey)];
                    case 10:
                        _c.sent();
                        _c.label = 11;
                    case 11: return [4, this.NotifyChanges(dataItem, ((notify) && (dataItemResponse != null)), dataKeyResponse, null, null)];
                    case 12:
                        _c.sent();
                        return [2, (true)];
                }
            });
        });
    };
    DrapoStorage.prototype.PostDataItem = function (dataKey, sector, dataKeyResponse, notify, executionContext) {
        return __awaiter(this, void 0, void 0, function () {
            var dataItem, dataItemResponse, _a, _b, headers, url, object, headersResponse, data;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4, this.RetrieveDataItem(dataKey, sector)];
                    case 1:
                        dataItem = _c.sent();
                        if (dataItem == null)
                            return [2, (false)];
                        if (dataItem.CookieName != null)
                            return [2, (this.Application.CookieHandler.SetCookieValue(dataItem))];
                        if (!(dataKeyResponse == '')) return [3, 2];
                        _a = null;
                        return [3, 6];
                    case 2:
                        if (!(dataKey == dataKeyResponse)) return [3, 3];
                        _b = dataItem;
                        return [3, 5];
                    case 3: return [4, this.RetrieveDataItem(dataKeyResponse, sector)];
                    case 4:
                        _b = _c.sent();
                        _c.label = 5;
                    case 5:
                        _a = (_b);
                        _c.label = 6;
                    case 6:
                        dataItemResponse = _a;
                        return [4, this.ResolveDataHeaders(dataKey, sector, dataItem.HeadersSet, executionContext)];
                    case 7:
                        headers = _c.sent();
                        url = dataItem.UrlSet;
                        return [4, this.ResolveDataUrlMustaches(null, sector, url, executionContext)];
                    case 8:
                        url = _c.sent();
                        object = dataItem.Data;
                        headersResponse = dataItem.IsCookieChange ? [] : null;
                        return [4, this.Application.Server.GetJSON(url, "POST", this.Application.Serializer.Serialize(object), this.CONTENT_TYPE_JSON, null, headers, headersResponse)];
                    case 9:
                        data = _c.sent();
                        if (this.Application.Server.HasBadRequest)
                            return [2, (false)];
                        if (dataItemResponse != null)
                            dataItemResponse.Data = data;
                        if (!(dataKey !== dataKeyResponse)) return [3, 11];
                        return [4, this.NotifyNoChanges(dataItem, notify, dataKey)];
                    case 10:
                        _c.sent();
                        _c.label = 11;
                    case 11: return [4, this.NotifyChanges(dataItem, ((notify) && (dataItemResponse != null)), dataKeyResponse, null, null)];
                    case 12:
                        _c.sent();
                        return [2, (true)];
                }
            });
        });
    };
    DrapoStorage.prototype.PostDataMapping = function (dataKey, sector, dataItem, notify, executionContext) {
        return __awaiter(this, void 0, void 0, function () {
            var el, dataValue, updated, isReference, mustacheFullPartsReference, dataSectorReference, dataKeyReference, mustacheDataFieldsReference, mustachePartsReference, dataValueResolved, storageItemMapped, dataMappingField, dataMappingSearchField, dataMappingSearchValue, dataMappingSearchHierarchyField, data, dataPath, dataMappingFieldResolved, dataPathFull, dataPathCurrent, updatedDataObject;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        el = this.GetDataKeyElement(dataKey, sector);
                        if (el === null)
                            return [2, (false)];
                        dataValue = el.getAttribute('d-dataValue');
                        if (dataValue == null)
                            return [2, (false)];
                        updated = false;
                        isReference = el.getAttribute('d-dataLoadType') === 'reference';
                        if (!isReference) return [3, 2];
                        mustacheFullPartsReference = this.Application.Parser.ParseMustache(dataValue);
                        dataSectorReference = this.Application.Solver.ResolveSector(mustacheFullPartsReference, sector);
                        dataKeyReference = this.Application.Solver.ResolveDataKey(mustacheFullPartsReference);
                        mustacheDataFieldsReference = this.Application.Solver.ResolveDataFields(mustacheFullPartsReference);
                        mustachePartsReference = this.Application.Solver.CreateDataPath(dataKeyReference, mustacheDataFieldsReference);
                        return [4, this.UpdateDataPath(dataSectorReference, null, mustachePartsReference, dataItem.Data, notify)];
                    case 1:
                        updated = _a.sent();
                        return [2, (updated)];
                    case 2:
                        dataValueResolved = dataValue;
                        if (!this.Application.Parser.IsMustache(dataValue)) return [3, 4];
                        return [4, this.ResolveMustaches(sector, dataValue)];
                    case 3:
                        dataValueResolved = _a.sent();
                        _a.label = 4;
                    case 4: return [4, this.RetrieveDataItem(dataValueResolved, sector)];
                    case 5:
                        storageItemMapped = _a.sent();
                        if (storageItemMapped === null)
                            return [2, (null)];
                        dataMappingField = el.getAttribute('d-dataMappingField');
                        dataMappingSearchField = el.getAttribute('d-dataMappingSearchField');
                        dataMappingSearchValue = el.getAttribute('d-dataMappingSearchValue');
                        dataMappingSearchHierarchyField = el.getAttribute('d-dataMappingSearchHierarchyField');
                        if (((dataMappingField == null) || (dataMappingField == '')) && ((dataMappingSearchField == null) || (dataMappingSearchField == ''))) {
                            if (storageItemMapped.Data === dataItem.Data)
                                return [2, (false)];
                            updated = true;
                            storageItemMapped.Data = dataItem.Data;
                        }
                        if (!!updated) return [3, 12];
                        data = storageItemMapped.Data;
                        dataPath = null;
                        if (!((dataMappingField != null) && (dataMappingField != ''))) return [3, 7];
                        return [4, this.ResolveMustaches(sector, dataMappingField)];
                    case 6:
                        dataMappingFieldResolved = _a.sent();
                        dataPath = this.Application.Parser.ParsePath(dataMappingFieldResolved);
                        dataPathFull = this.Application.Solver.CreateDataPath(dataValueResolved, dataPath);
                        data = this.Application.Solver.ResolveDataObjectPathObject(data, dataPathFull);
                        if (data === null)
                            return [2, (false)];
                        _a.label = 7;
                    case 7:
                        if (!((dataMappingSearchField != null) && (dataMappingSearchField != '') && (dataMappingSearchValue != null) && (dataMappingSearchValue != ''))) return [3, 10];
                        if (!this.Application.Parser.IsMustache(dataMappingSearchValue)) return [3, 9];
                        dataPathCurrent = this.Application.Parser.ParseMustache(dataMappingSearchValue);
                        return [4, this.Application.Solver.ResolveItemDataPathObject(sector, null, dataPathCurrent)];
                    case 8:
                        dataMappingSearchValue = _a.sent();
                        _a.label = 9;
                    case 9:
                        updatedDataObject = this.Application.Solver.UpdateDataObjectLookupHierarchy(data, dataMappingSearchField, dataMappingSearchValue, dataItem.Data, dataMappingSearchHierarchyField);
                        if (updatedDataObject == null)
                            return [2, (false)];
                        updated = updatedDataObject;
                        return [3, 12];
                    case 10: return [4, this.SetDataKeyField(dataValueResolved, sector, dataPath, dataItem.Data, false)];
                    case 11:
                        updated = _a.sent();
                        _a.label = 12;
                    case 12: return [4, this.NotifyChanges(dataItem, ((updated) && (notify)), dataValue, null, null)];
                    case 13:
                        _a.sent();
                        return [2, (true)];
                }
            });
        });
    };
    DrapoStorage.prototype.ClearData = function (dataKey, sector, notify) {
        return __awaiter(this, void 0, void 0, function () {
            var dataItem, i, item;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.RetrieveDataItem(dataKey, sector)];
                    case 1:
                        dataItem = _a.sent();
                        if (dataItem == null)
                            return [2, (false)];
                        for (i = dataItem.Data.length - 1; i >= 0; i--) {
                            item = dataItem.Data[i];
                            if (dataItem.IsUnitOfWork)
                                dataItem.DataDeleted.push(item);
                            dataItem.Data.splice(i, 1);
                        }
                        return [4, this.NotifyChanges(dataItem, notify, dataKey, null, null)];
                    case 2:
                        _a.sent();
                        return [2, (true)];
                }
            });
        });
    };
    DrapoStorage.prototype.UnloadData = function (dataKey, sector) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, (this.DiscardCacheData(dataKey, sector, true))];
            });
        });
    };
    DrapoStorage.prototype.ClearDataToken = function () {
        return __awaiter(this, void 0, void 0, function () {
            var i, item, dataKey;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < this._cacheItems.length)) return [3, 4];
                        item = this._cacheItems[i];
                        if (!item.IsToken)
                            return [3, 3];
                        item.Data = [];
                        item.DataDeleted = [];
                        item.DataInserted = [];
                        item.DataUpdated = [];
                        dataKey = this._cacheKeys[i];
                        this.Application.Observer.SubscribeAuthorization(dataKey, 'notify');
                        return [4, this.NotifyChanges(item, true, dataKey, null, null)];
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
    DrapoStorage.prototype.FireEventOnBeforeContainerUnload = function (sector) {
        return __awaiter(this, void 0, void 0, function () {
            var i, item;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        i = this._cacheItems.length - 1;
                        _a.label = 1;
                    case 1:
                        if (!(i >= 0)) return [3, 4];
                        item = this._cacheItems[i];
                        if (item.Sector !== sector)
                            return [3, 3];
                        if (item.OnBeforeContainerUnload === null)
                            return [3, 3];
                        return [4, this.Application.FunctionHandler.ResolveFunctionWithoutContext(item.Sector, item.Element, item.OnBeforeContainerUnload)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        i--;
                        return [3, 1];
                    case 4: return [2];
                }
            });
        });
    };
    DrapoStorage.prototype.FireEventOnAfterContainerLoad = function (sector) {
        return __awaiter(this, void 0, void 0, function () {
            var i, item;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        i = this._cacheItems.length - 1;
                        _a.label = 1;
                    case 1:
                        if (!(i >= 0)) return [3, 4];
                        item = this._cacheItems[i];
                        if (item.Sector !== sector)
                            return [3, 3];
                        if (item.OnAfterContainerLoad === null)
                            return [3, 3];
                        return [4, this.Application.FunctionHandler.ResolveFunctionWithoutContext(item.Sector, item.Element, item.OnAfterContainerLoad)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        i--;
                        return [3, 1];
                    case 4: return [2];
                }
            });
        });
    };
    DrapoStorage.prototype.MoveDataItem = function (dataKey, sector, dataMove, dataPosition, notify) {
        return __awaiter(this, void 0, void 0, function () {
            var dataItem, indexBefore, indexAfter, i, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.RetrieveDataItem(dataKey, sector)];
                    case 1:
                        dataItem = _a.sent();
                        if (dataItem == null)
                            return [2, (false)];
                        indexBefore = null;
                        indexAfter = null;
                        for (i = 0; i < dataItem.Data.length; i++) {
                            data = dataItem.Data[i];
                            if (data === dataMove)
                                indexBefore = i;
                            if (data === dataPosition)
                                indexAfter = i;
                        }
                        if ((indexBefore === null) || (indexAfter === null) || (indexBefore === indexAfter))
                            return [2, (false)];
                        return [4, this.FlagDataItemAsUpdated(dataKey, sector, indexBefore, false)];
                    case 2:
                        _a.sent();
                        return [4, this.FlagDataItemAsUpdated(dataKey, sector, indexAfter, false)];
                    case 3:
                        _a.sent();
                        dataItem.Data.splice(indexBefore, 1);
                        dataItem.Data.splice(indexAfter, 0, dataMove);
                        return [4, this.NotifyChanges(dataItem, notify, dataKey, null, null, true)];
                    case 4:
                        _a.sent();
                        return [2, (true)];
                }
            });
        });
    };
    DrapoStorage.prototype.MoveDataIndex = function (dataKey, sector, dataMove, index, notify) {
        return __awaiter(this, void 0, void 0, function () {
            var dataItem, indexBefore, i, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.RetrieveDataItem(dataKey, sector)];
                    case 1:
                        dataItem = _a.sent();
                        if (dataItem == null)
                            return [2, (false)];
                        indexBefore = null;
                        for (i = 0; i < dataItem.Data.length; i++) {
                            data = dataItem.Data[i];
                            if (data === dataMove)
                                indexBefore = i;
                        }
                        if ((indexBefore === null) || (index === null) || (indexBefore === index))
                            return [2, (false)];
                        return [4, this.FlagDataItemAsUpdated(dataKey, sector, indexBefore, false)];
                    case 2:
                        _a.sent();
                        return [4, this.FlagDataItemAsUpdated(dataKey, sector, index, false)];
                    case 3:
                        _a.sent();
                        dataItem.Data.splice(indexBefore, 1);
                        dataItem.Data.splice(index, 0, dataMove);
                        return [4, this.NotifyChanges(dataItem, notify, dataKey, null, null, true)];
                    case 4:
                        _a.sent();
                        return [2, (true)];
                }
            });
        });
    };
    DrapoStorage.prototype.ResolveData = function (executeNoCache, el) {
        if (el === void 0) { el = null; }
        return __awaiter(this, void 0, void 0, function () {
            var children, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (el == null)
                            el = document.documentElement;
                        children = [].slice.call(el.children);
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < children.length)) return [3, 4];
                        return [4, this.ResolveDataElement(executeNoCache, children[i])];
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
    DrapoStorage.prototype.ResolveDataElement = function (executeNoCache, el) {
        return __awaiter(this, void 0, void 0, function () {
            var sector, children, hasChildren, i, child;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sector = el.getAttribute ? el.getAttribute('d-sector') : null;
                        if (sector != null)
                            return [2];
                        children = [].slice.call(el.children);
                        hasChildren = children.length > 0;
                        if (!hasChildren) return [3, 5];
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < children.length)) return [3, 4];
                        child = children[i];
                        return [4, this.ResolveDataElement(executeNoCache, child)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        i++;
                        return [3, 1];
                    case 4: return [3, 7];
                    case 5: return [4, this.ResolveDataLoadInternal(executeNoCache, el)];
                    case 6:
                        _a.sent();
                        _a.label = 7;
                    case 7: return [2];
                }
            });
        });
    };
    DrapoStorage.prototype.ResolveDataLoadInternal = function (executeNoCache, el) {
        return __awaiter(this, void 0, void 0, function () {
            var dataLoadType, dataKey, sector, cacheIndex, canCache;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dataLoadType = el.getAttribute('d-dataLoadType');
                        if (dataLoadType == null)
                            return [2];
                        if (dataLoadType !== 'startup')
                            return [2];
                        dataKey = el.getAttribute('d-dataKey');
                        if (dataKey == null)
                            return [2];
                        sector = this.Application.Document.GetSector(el);
                        if (!this.Application.Document.IsSectorReady(sector))
                            return [2];
                        cacheIndex = this.GetCacheKeyIndex(dataKey, sector);
                        if (cacheIndex !== null)
                            return [2];
                        canCache = this.Application.Parser.ParseBoolean(el.getAttribute('d-dataCache'), true);
                        if ((!executeNoCache) && (!canCache))
                            return [2];
                        return [4, this.RetrieveDataItem(dataKey, sector, true, null)];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    DrapoStorage.prototype.CreateErrorForStorage = function (type, message, content) {
        if (type === void 0) { type = null; }
        if (message === void 0) { message = null; }
        if (content === void 0) { content = null; }
        var object = {};
        object.Type = type;
        object.Message = message;
        object.Content = content;
        object.Date = new Date();
        return (object);
    };
    DrapoStorage.prototype.EnsureDataDelayLoaded = function (dataItem, dataPath) {
        return __awaiter(this, void 0, void 0, function () {
            var data, dataKey, dataField, item, dataFieldCurrent;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = this.Application.Solver.ResolveDataObjectPathObject(dataItem.Data, dataPath);
                        if (data !== '')
                            return [2];
                        dataKey = dataPath[0];
                        dataField = dataPath[1];
                        return [4, this.RetrieveDataItemInternal(dataKey, null, true, [dataField])];
                    case 1:
                        item = _a.sent();
                        for (dataFieldCurrent in item.Data)
                            dataItem.Data[dataFieldCurrent] = item.Data[dataFieldCurrent];
                        return [2];
                }
            });
        });
    };
    DrapoStorage.prototype.HasChanges = function (sector, dataKey) {
        var cacheIndex = this.GetCacheKeyIndex(dataKey, sector);
        if (cacheIndex === null)
            return (false);
        var storageItem = this.GetCacheDataItem(cacheIndex);
        if (storageItem === null)
            return (false);
        return (storageItem.HasChanges);
    };
    DrapoStorage.prototype.RetrieveDataItemInternalSystem = function (dataKey) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (dataKey === '__debugger')
                    return [2, (this.RetrieveDataItemInternalSystemDebugger(dataKey))];
                if (dataKey === '__sectors')
                    return [2, (this.RetrieveDataItemInternalSystemSectors(dataKey))];
                if (dataKey === '__datakeysfunction')
                    return [2, (this.RetrieveDataItemInternalSystemDataKeysFunction(dataKey))];
                if (dataKey === '__breakpoints')
                    return [2, (this.RetrieveDataItemInternalSystemBreakpoints(dataKey))];
                if (dataKey === '__notifys')
                    return [2, (this.RetrieveDataItemInternalSystemNotifys(dataKey))];
                if (dataKey === '__pipes')
                    return [2, (this.RetrieveDataItemInternalSystemPipes(dataKey))];
                if (dataKey === '__errors')
                    return [2, (this.RetrieveDataItemInternalSystemErrors(dataKey))];
                if (dataKey === '__functions')
                    return [2, (this.RetrieveDataItemInternalSystemFunctions(dataKey))];
                if (dataKey === '__components')
                    return [2, (this.RetrieveDataItemInternalSystemComponents(dataKey))];
                if (dataKey === '__requests')
                    return [2, (this.RetrieveDataItemInternalSystemRequests(dataKey))];
                if (dataKey === '__sectorsupdate')
                    return [2, (this.RetrieveDataItemInternalSystemSectorsUpdate(dataKey))];
                if (dataKey === '__runtime')
                    return [2, (this.RetrieveDataItemInternalSystemRuntime(dataKey))];
                if (dataKey === '__objects')
                    return [2, (this.RetrieveDataItemInternalSystemObjects(dataKey))];
                if (dataKey === '__objectsexpanded')
                    return [2, (this.RetrieveDataItemInternalSystemObjectsExpanded(dataKey))];
                if (dataKey === '__objectproperties')
                    return [2, (this.RetrieveDataItemInternalSystemObjectProperties(dataKey))];
                if (dataKey === '__objectdata')
                    return [2, (this.RetrieveDataItemInternalSystemObjectData(dataKey))];
                if (dataKey === '__objectwatch')
                    return [2, (this.RetrieveDataItemInternalSystemObjectWatch(dataKey))];
                if (dataKey === '__objectswatchs')
                    return [2, (this.RetrieveDataItemInternalSystemObjectsWatchs(dataKey))];
                if (dataKey === '__objectswatchsvalues')
                    return [2, (this.RetrieveDataItemInternalSystemObjectsWatchsValues(dataKey))];
                if (dataKey === '__browser')
                    return [2, (this.RetrieveDataItemInternalSystemBrowser(dataKey))];
                if (dataKey === '__debuggerProperties')
                    return [2, (this.RetrieveDataItemInternalSystemDebuggerProperties(dataKey))];
                return [2, (null)];
            });
        });
    };
    DrapoStorage.prototype.CreateDataItemInternal = function (dataKey, data, canCache) {
        if (canCache === void 0) { canCache = true; }
        var item = new DrapoStorageItem(data.length != null ? 'array' : 'object', null, null, data, null, null, null, null, null, null, false, true, false, false, null, false, null, false, '', null, null, canCache, null, null, null, null, null, null, null, null);
        return (item);
    };
    DrapoStorage.prototype.RetrieveDataItemInternalSystemDebugger = function (dataKey) {
        return __awaiter(this, void 0, void 0, function () {
            var data, item;
            return __generator(this, function (_a) {
                data = {};
                data.sector = '';
                data.datakey = '';
                item = this.CreateDataItemInternal(dataKey, data);
                return [2, (item)];
            });
        });
    };
    DrapoStorage.prototype.RetrieveDataItemInternalSystemSectors = function (dataKey) {
        return __awaiter(this, void 0, void 0, function () {
            var data, item;
            return __generator(this, function (_a) {
                data = this.Application.Document.GetSectors();
                item = this.CreateDataItemInternal(dataKey, data);
                return [2, (item)];
            });
        });
    };
    DrapoStorage.prototype.RetrieveDataItemInternalSystemDataKeysFunction = function (dataKey) {
        return __awaiter(this, void 0, void 0, function () {
            var sector, data, i, itemCache, itemDataKey, item;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.Application.Observer.SubscribeStorage('__debugger', ['sector'], dataKey);
                        return [4, this.ResolveMustaches('', '{{__debugger.sector}}')];
                    case 1:
                        sector = _a.sent();
                        data = [];
                        data.push('');
                        for (i = 0; i < this._cacheItems.length; i++) {
                            itemCache = this._cacheItems[i];
                            if (!this.Application.Document.IsEqualSector(itemCache.Sector, sector))
                                continue;
                            itemDataKey = this._cacheKeys[i];
                            if (this.Application.Document.IsSystemKey(itemDataKey))
                                continue;
                            if ((!itemCache.IsTypeFunction) && ((!itemCache.IsTypeValue)))
                                continue;
                            data.push(itemDataKey);
                        }
                        item = this.CreateDataItemInternal(dataKey, data);
                        return [2, (item)];
                }
            });
        });
    };
    DrapoStorage.prototype.RetrieveDataItemInternalSystemBreakpoints = function (dataKey) {
        return __awaiter(this, void 0, void 0, function () {
            var data, item;
            return __generator(this, function (_a) {
                data = [];
                item = this.CreateDataItemInternal(dataKey, data);
                return [2, (item)];
            });
        });
    };
    DrapoStorage.prototype.RetrieveDataItemInternalSystemNotifys = function (dataKey) {
        return __awaiter(this, void 0, void 0, function () {
            var data, item;
            return __generator(this, function (_a) {
                data = [];
                item = this.CreateDataItemInternal(dataKey, data);
                return [2, (item)];
            });
        });
    };
    DrapoStorage.prototype.RetrieveDataItemInternalSystemPipes = function (dataKey) {
        return __awaiter(this, void 0, void 0, function () {
            var data, item;
            return __generator(this, function (_a) {
                data = [];
                item = this.CreateDataItemInternal(dataKey, data);
                return [2, (item)];
            });
        });
    };
    DrapoStorage.prototype.RetrieveDataItemInternalSystemErrors = function (dataKey) {
        return __awaiter(this, void 0, void 0, function () {
            var data, item;
            return __generator(this, function (_a) {
                data = [];
                item = this.CreateDataItemInternal(dataKey, data);
                return [2, (item)];
            });
        });
    };
    DrapoStorage.prototype.RetrieveDataItemInternalSystemFunctions = function (dataKey) {
        return __awaiter(this, void 0, void 0, function () {
            var data, item;
            return __generator(this, function (_a) {
                data = [];
                item = this.CreateDataItemInternal(dataKey, data);
                return [2, (item)];
            });
        });
    };
    DrapoStorage.prototype.RetrieveDataItemInternalSystemComponents = function (dataKey) {
        return __awaiter(this, void 0, void 0, function () {
            var data, item;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.Application.Debugger.GetComponents()];
                    case 1:
                        data = _a.sent();
                        item = this.CreateDataItemInternal(dataKey, data);
                        return [2, (item)];
                }
            });
        });
    };
    DrapoStorage.prototype.RetrieveDataItemInternalSystemRequests = function (dataKey) {
        return __awaiter(this, void 0, void 0, function () {
            var data, item;
            return __generator(this, function (_a) {
                data = [];
                item = this.CreateDataItemInternal(dataKey, data);
                return [2, (item)];
            });
        });
    };
    DrapoStorage.prototype.RetrieveDataItemInternalSystemSectorsUpdate = function (dataKey) {
        return __awaiter(this, void 0, void 0, function () {
            var data, item;
            return __generator(this, function (_a) {
                data = [];
                item = this.CreateDataItemInternal(dataKey, data);
                return [2, (item)];
            });
        });
    };
    DrapoStorage.prototype.RetrieveDataItemInternalSystemRuntime = function (dataKey) {
        return __awaiter(this, void 0, void 0, function () {
            var data, item;
            return __generator(this, function (_a) {
                data = {};
                data.sector = '';
                data.datakey = '';
                data.label = '';
                data.expression = '';
                data.functionValue = '';
                item = this.CreateDataItemInternal(dataKey, data);
                return [2, (item)];
            });
        });
    };
    DrapoStorage.prototype.RetrieveDataItemInternalSystemObjects = function (dataKey) {
        return __awaiter(this, void 0, void 0, function () {
            var data, item;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.Application.Observer.SubscribeStorage('__objectsexpanded', [], dataKey, DrapoStorageLinkType.Reload);
                        return [4, this.Application.Debugger.GetObjects()];
                    case 1:
                        data = _a.sent();
                        item = this.CreateDataItemInternal(dataKey, data);
                        return [2, (item)];
                }
            });
        });
    };
    DrapoStorage.prototype.RetrieveDataItemInternalSystemObjectsExpanded = function (dataKey) {
        return __awaiter(this, void 0, void 0, function () {
            var data, item;
            return __generator(this, function (_a) {
                data = [];
                data.push('sector_null');
                item = this.CreateDataItemInternal(dataKey, data);
                return [2, (item)];
            });
        });
    };
    DrapoStorage.prototype.RetrieveDataItemInternalSystemObjectProperties = function (dataKey) {
        return __awaiter(this, void 0, void 0, function () {
            var data, item;
            return __generator(this, function (_a) {
                data = {};
                data.sector = '';
                data.datakey = '';
                item = this.CreateDataItemInternal(dataKey, data);
                return [2, (item)];
            });
        });
    };
    DrapoStorage.prototype.RetrieveDataItemInternalSystemObjectData = function (dataKey) {
        return __awaiter(this, void 0, void 0, function () {
            var data, item;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.Application.Debugger.GetObjectData()];
                    case 1:
                        data = _a.sent();
                        item = this.CreateDataItemInternal(dataKey, data);
                        return [2, (item)];
                }
            });
        });
    };
    DrapoStorage.prototype.RetrieveDataItemInternalSystemObjectWatch = function (dataKey) {
        return __awaiter(this, void 0, void 0, function () {
            var data, item;
            return __generator(this, function (_a) {
                data = {};
                data.Sector = '';
                data.Mustache = '';
                item = this.CreateDataItemInternal(dataKey, data);
                return [2, (item)];
            });
        });
    };
    DrapoStorage.prototype.RetrieveDataItemInternalSystemObjectsWatchs = function (dataKey) {
        return __awaiter(this, void 0, void 0, function () {
            var data, item;
            return __generator(this, function (_a) {
                data = [];
                item = this.CreateDataItemInternal(dataKey, data);
                return [2, (item)];
            });
        });
    };
    DrapoStorage.prototype.RetrieveDataItemInternalSystemObjectsWatchsValues = function (dataKey) {
        return __awaiter(this, void 0, void 0, function () {
            var data, item;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.Application.Debugger.GetWatchsValues()];
                    case 1:
                        data = _a.sent();
                        item = this.CreateDataItemInternal(dataKey, data);
                        return [2, (item)];
                }
            });
        });
    };
    DrapoStorage.prototype.RetrieveDataItemInternalSystemBrowser = function (dataKey) {
        return __awaiter(this, void 0, void 0, function () {
            var data, width, height, item;
            return __generator(this, function (_a) {
                data = {};
                width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
                height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
                data.Width = width;
                data.Height = height;
                item = this.CreateDataItemInternal(dataKey, data);
                item.CanCache = false;
                return [2, (item)];
            });
        });
    };
    DrapoStorage.prototype.RetrieveDataItemInternalSystemDebuggerProperties = function (dataKey) {
        return __awaiter(this, void 0, void 0, function () {
            var data, item;
            return __generator(this, function (_a) {
                data = {};
                data.left = false;
                data.showobjects = false;
                data.showbreakpoints = false;
                data.shownotifys = false;
                data.showerrors = true;
                data.showpipes = true;
                data.showfunctions = false;
                data.showcomponents = false;
                data.showserver = false;
                data.showsectorsupdate = false;
                data.persist = false;
                item = this.CreateDataItemInternal(dataKey, data);
                return [2, (item)];
            });
        });
    };
    DrapoStorage.prototype.ExecuteQuery = function (sector, dataKey, query) {
        return __awaiter(this, void 0, void 0, function () {
            var objects, objectsId, i, querySource, querySourcePath, isQuerySourceMustache, sourceDataKey, sourceMustache, mustacheParts, mustacheDataKey, querySourceData, querySourceObjects, j, querySourceObject, object, count, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        objects = [];
                        objectsId = [];
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < query.Sources.length)) return [3, 4];
                        querySource = query.Sources[i];
                        querySourcePath = querySource.Source;
                        isQuerySourceMustache = this.Application.Parser.IsMustache(querySourcePath);
                        sourceDataKey = querySourcePath;
                        sourceMustache = sourceDataKey;
                        if (isQuerySourceMustache) {
                            mustacheParts = this.Application.Parser.ParseMustache(querySourcePath);
                            mustacheDataKey = this.Application.Solver.ResolveDataKey(mustacheParts);
                            sourceDataKey = mustacheDataKey;
                        }
                        else {
                            sourceMustache = this.Application.Solver.CreateMustache([sourceDataKey]);
                        }
                        this.Application.Observer.SubscribeStorage(sourceDataKey, null, dataKey);
                        return [4, this.RetrieveDataValue(sector, sourceMustache)];
                    case 2:
                        querySourceData = _a.sent();
                        querySourceObjects = querySourceData.length ? querySourceData : [querySourceData];
                        for (j = 0; j < querySourceObjects.length; j++) {
                            querySourceObject = querySourceObjects[j];
                            object = this.EnsureQueryObject(query, querySource, i, objects, objectsId, querySourceObject);
                            if (object === null)
                                continue;
                            this.InjectQueryObjectProjections(query, querySource, object, querySourceObject);
                        }
                        _a.label = 3;
                    case 3:
                        i++;
                        return [3, 1];
                    case 4:
                        count = query.Sources.length;
                        if ((count > 1) && (query.Sources[1].JoinType == 'INNER')) {
                            for (i = objects.length - 1; i >= 0; i--) {
                                if (objectsId[i].length === count)
                                    continue;
                                objects.splice(i, 1);
                            }
                        }
                        return [2, (objects)];
                }
            });
        });
    };
    DrapoStorage.prototype.EnsureQueryObject = function (query, querySource, indexSource, objects, objectsIds, querySourceObject) {
        var object = null;
        if (query.Sources.length == 1) {
            object = {};
            objects.push(object);
            return (object);
        }
        var joinCondition = query.Sources[1].JoinConditions[0];
        var column = joinCondition.SourceLeft == querySource.Alias ? joinCondition.ColumnLeft : joinCondition.ColumnRight;
        var isObject = typeof querySourceObject === 'object';
        var id = isObject ? querySourceObject[column] : querySourceObject;
        if (indexSource === 0) {
            object = {};
            objects.push(object);
            var ids = [];
            ids.push(id);
            objectsIds.push(ids);
            return (object);
        }
        for (var i = 0; i < objects.length; i++) {
            var objectsId = objectsIds[i];
            if (objectsId.length > 1)
                continue;
            var objectId = objectsId[0];
            if (objectId != id)
                continue;
            objectsId.push(objectId);
            return (objects[i]);
        }
        return (null);
    };
    DrapoStorage.prototype.InjectQueryObjectProjections = function (query, querySource, object, sourceObject) {
        var _a, _b;
        for (var i = 0; i < query.Projections.length; i++) {
            var projection = query.Projections[i];
            var source = projection.Source;
            var isObject = typeof sourceObject === 'object';
            if (source !== null) {
                if ((querySource.Alias !== null) && (source !== querySource.Alias))
                    continue;
                if ((querySource.Alias === null) && (source !== querySource.Source))
                    continue;
            }
            else {
                if ((isObject) && (!sourceObject[projection.Column]))
                    continue;
                if ((!isObject) && ((_a = querySource.Alias, (_a !== null && _a !== void 0 ? _a : querySource.Source)) !== projection.Column))
                    continue;
            }
            var value = isObject ? sourceObject[projection.Column] : sourceObject;
            object[_b = projection.Alias, (_b !== null && _b !== void 0 ? _b : projection.Column)] = value;
        }
    };
    return DrapoStorage;
}());

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
var DrapoObserver = (function () {
    function DrapoObserver(application) {
        this._dataBarberDataKeys = [];
        this._dataBarberFields = [];
        this._dataBarberElements = [];
        this._dataForDataKey = [];
        this._dataForElement = [];
        this._dataIncrementalKey = [];
        this._dataIncrementalElements = [];
        this._IsEnabledNotifyIncremental = true;
        this._dataDelayKey = [];
        this._dataDelayField = [];
        this._dataDelayElements = [];
        this._dataStorageKey = [];
        this._dataStorageKeyFields = [];
        this._dataStorageKeyReferenceKey = [];
        this._dataStorageType = [];
        this._dataAuthorizationKey = [];
        this._dataAuthorizationType = [];
        this._dataLinkDataKey = [];
        this._dataLinkReferenceKey = [];
        this._dataLinkDataFields = [];
        this._dataComponentKey = [];
        this._dataComponentField = [];
        this._dataComponentElements = [];
        this._dataComponentFunction = [];
        this._dataComponentElementsFocus = [];
        this._application = application;
    }
    Object.defineProperty(DrapoObserver.prototype, "Application", {
        get: function () {
            return (this._application);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DrapoObserver.prototype, "IsEnabledNotifyIncremental", {
        get: function () {
            return (this._IsEnabledNotifyIncremental);
        },
        set: function (value) {
            this._IsEnabledNotifyIncremental = value;
        },
        enumerable: true,
        configurable: true
    });
    DrapoObserver.prototype.GetBarberDataKeyIndex = function (dataKey) {
        for (var i = 0; i < this._dataBarberDataKeys.length; i++) {
            if (this._dataBarberDataKeys[i] == dataKey)
                return (i);
        }
        return (null);
    };
    DrapoObserver.prototype.GetForDataKeyIndex = function (dataKey) {
        for (var i = 0; i < this._dataForDataKey.length; i++) {
            if (this._dataForDataKey[i] == dataKey)
                return (i);
        }
        return (null);
    };
    DrapoObserver.prototype.GetDataIncrementalKeyIndex = function (dataKey) {
        for (var i = 0; i < this._dataIncrementalKey.length; i++) {
            if (this._dataIncrementalKey[i] == dataKey)
                return (i);
        }
        return (null);
    };
    DrapoObserver.prototype.CreateBarberDataKeyIndex = function (dataKey) {
        var index = this._dataBarberDataKeys.push(dataKey);
        this._dataBarberFields.push([]);
        this._dataBarberElements.push([]);
        return (index - 1);
    };
    DrapoObserver.prototype.CreateForDataKeyIndex = function (dataKey) {
        var index = this._dataForDataKey.push(dataKey);
        this._dataForElement.push([]);
        return (index - 1);
    };
    DrapoObserver.prototype.CreateDataIncrementalKeyIndex = function (dataKey) {
        var index = this._dataIncrementalKey.push(dataKey);
        this._dataIncrementalElements.push([]);
        return (index - 1);
    };
    DrapoObserver.prototype.SubscribeBarber = function (element, dataKey, dataFields) {
        var dataKeyIndex = this.GetBarberDataKeyIndex(dataKey);
        if (dataKeyIndex == null)
            dataKeyIndex = this.CreateBarberDataKeyIndex(dataKey);
        var dataBarberFields = this._dataBarberFields[dataKeyIndex];
        var elements = this._dataBarberElements[dataKeyIndex];
        for (var i = 0; i < dataBarberFields.length; i++) {
            if (!this.IsEqualDataFields(dataBarberFields[i], dataFields))
                continue;
            if (elements[i] !== element)
                continue;
            return (false);
        }
        dataBarberFields.push(dataFields);
        elements.push(element);
        return (true);
    };
    DrapoObserver.prototype.UnsubscribeBarber = function (dataKey) {
        var dataKeyIndex = this.GetBarberDataKeyIndex(dataKey);
        if (dataKeyIndex === null)
            return;
        this._dataBarberDataKeys.splice(dataKeyIndex, 1);
        this._dataBarberElements.splice(dataKeyIndex, 1);
        this._dataBarberFields.splice(dataKeyIndex, 1);
    };
    DrapoObserver.prototype.SubscribeFor = function (elementForTemplate, dataKey) {
        var dataKeyIndex = this.GetForDataKeyIndex(dataKey);
        if (dataKeyIndex == null)
            dataKeyIndex = this.CreateForDataKeyIndex(dataKey);
        this._dataForElement[dataKeyIndex].push(elementForTemplate);
    };
    DrapoObserver.prototype.SubscribeStorage = function (dataKey, dataFields, dataReferenceKey, type) {
        if (type === void 0) { type = DrapoStorageLinkType.Reload; }
        var dataField = ((dataFields != null) && (dataFields.length > 0)) ? dataFields[0] : null;
        var dataKeyIndex = this.GetStorageKeyIndex(dataKey);
        if (dataKeyIndex == null)
            dataKeyIndex = this.CreateStorageDataKeyIndex(dataKey);
        var dataStorageFields = this._dataStorageKeyFields[dataKeyIndex];
        var dataReferenceKeys = this._dataStorageKeyReferenceKey[dataKeyIndex];
        var dataTypes = this._dataStorageType[dataKeyIndex];
        for (var i = 0; i < dataStorageFields.length; i++) {
            if ((dataStorageFields[i] === dataField) && (dataReferenceKeys[i] === dataReferenceKey))
                return;
        }
        dataStorageFields.push(dataField);
        dataReferenceKeys.push(dataReferenceKey);
        dataTypes.push(type);
    };
    DrapoObserver.prototype.UnsubscribeStorage = function (dataKey) {
        this.UnsubscribeStorageReferenceKey(dataKey);
        var dataKeyIndex = this.GetStorageKeyIndex(dataKey);
        if (dataKeyIndex === null)
            return;
        this._dataStorageKey.splice(dataKeyIndex, 1);
        this._dataStorageKeyFields.splice(dataKeyIndex, 1);
        this._dataStorageKeyReferenceKey.splice(dataKeyIndex, 1);
        this._dataStorageType.splice(dataKeyIndex, 1);
    };
    DrapoObserver.prototype.UnsubscribeStorageReferenceKey = function (dataKey) {
        for (var i = this._dataStorageKey.length - 1; i >= 0; i--) {
            var references = this._dataStorageKeyReferenceKey[i];
            for (var j = references.length - 1; j >= 0; j--) {
                if (references[j] !== dataKey)
                    continue;
                this._dataStorageKeyFields[i].splice(j, 1);
                this._dataStorageKeyReferenceKey[i].splice(j, 1);
                this._dataStorageType[i].splice(j, 1);
            }
            if (references.length !== 0)
                continue;
            this._dataStorageKey.splice(i, 1);
            this._dataStorageKeyFields.splice(i, 1);
            this._dataStorageKeyReferenceKey.splice(i, 1);
            this._dataStorageType.splice(i, 1);
        }
    };
    DrapoObserver.prototype.UnsubscribeFor = function (dataKey, elementForTemplate) {
        if (elementForTemplate === void 0) { elementForTemplate = null; }
        var dataKeyIndex = this.GetForDataKeyIndex(dataKey);
        if (dataKeyIndex == null)
            return;
        if (elementForTemplate === null) {
            this._dataForDataKey.splice(dataKeyIndex, 1);
            this._dataForElement.splice(dataKeyIndex, 1);
            return;
        }
        var dataElements = this._dataForElement[dataKeyIndex];
        for (var i = dataElements.length - 1; i >= 0; i--) {
            var dataElementParent = dataElements[i];
            if (dataElementParent != elementForTemplate)
                continue;
            this._dataForElement[dataKeyIndex].splice(i, 1);
        }
    };
    DrapoObserver.prototype.Notify = function (dataKey, dataIndex, dataFields, canUseDifference, canNotifyStorage) {
        if (canUseDifference === void 0) { canUseDifference = true; }
        if (canNotifyStorage === void 0) { canNotifyStorage = true; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.Application.Debugger.AddNotify(dataKey)];
                    case 1:
                        _a.sent();
                        if (!canNotifyStorage) return [3, 3];
                        return [4, this.NotifyStorage(dataKey, dataFields)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [4, this.NotifyFor(dataKey, dataIndex, dataFields, canUseDifference)];
                    case 4:
                        _a.sent();
                        return [4, this.NotifyBarber(dataKey, dataFields)];
                    case 5:
                        _a.sent();
                        return [4, this.NotifyLink(dataKey, dataFields)];
                    case 6:
                        _a.sent();
                        return [4, this.NotifyComponent(dataKey)];
                    case 7:
                        _a.sent();
                        return [4, this.Application.Storage.FireEventOnNotify(dataKey)];
                    case 8:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    DrapoObserver.prototype.NotifyFor = function (dataKey, dataIndex, dataFields, canUseDifference, type) {
        if (canUseDifference === void 0) { canUseDifference = true; }
        if (type === void 0) { type = DrapoStorageLinkType.Render; }
        return __awaiter(this, void 0, void 0, function () {
            var index, dataElements, i, dataElement, elj, eljParent;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        index = this.GetForDataKeyIndex(dataKey);
                        if (index === null)
                            return [2];
                        dataElements = this._dataForElement[index];
                        i = dataElements.length - 1;
                        _a.label = 1;
                    case 1:
                        if (!(i >= 0)) return [3, 6];
                        dataElement = dataElements[i];
                        if (!(dataElement.parentElement === null)) return [3, 2];
                        dataElements.splice(i, 1);
                        return [3, 5];
                    case 2:
                        if (!!this.Application.SectorContainerHandler.IsElementContainerized(dataElement)) return [3, 5];
                        elj = $(dataElement);
                        eljParent = elj.parent();
                        return [4, this.Application.ControlFlow.ResolveControlFlowFor(elj, false, canUseDifference, type)];
                    case 3:
                        _a.sent();
                        return [4, this.Application.ComponentHandler.ResolveComponents(eljParent)];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5:
                        i--;
                        return [3, 1];
                    case 6: return [2];
                }
            });
        });
    };
    DrapoObserver.prototype.NotifyBarber = function (dataKey, dataFields) {
        return __awaiter(this, void 0, void 0, function () {
            var dataKeyIndex, dataField, dataElements, dataBarberFields, i, element, dataBarberFieldsCurrent, sector;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dataKeyIndex = this.GetBarberDataKeyIndex(dataKey);
                        if (dataKeyIndex === null)
                            return [2];
                        dataField = ((dataFields != null) && (dataFields.length > 0)) ? dataFields[0] : null;
                        dataElements = this._dataBarberElements[dataKeyIndex];
                        dataBarberFields = this._dataBarberFields[dataKeyIndex];
                        i = dataElements.length - 1;
                        _a.label = 1;
                    case 1:
                        if (!(i >= 0)) return [3, 5];
                        element = dataElements[i];
                        if (!this.Application.Document.IsElementAttached(element)) return [3, 3];
                        dataBarberFieldsCurrent = dataBarberFields[i];
                        if (!this.IsCompatibleDataFields(dataFields, dataBarberFieldsCurrent))
                            return [3, 4];
                        sector = this.Application.Document.GetSector(element);
                        return [4, this.Application.Barber.ResolveFilter(element, sector, dataField == null, dataKey, dataField)];
                    case 2:
                        _a.sent();
                        return [3, 4];
                    case 3:
                        if (!this.Application.SectorContainerHandler.IsElementContainerized(element)) {
                            dataElements.splice(i, 1);
                            dataBarberFields.splice(i, 1);
                        }
                        _a.label = 4;
                    case 4:
                        i--;
                        return [3, 1];
                    case 5: return [2];
                }
            });
        });
    };
    DrapoObserver.prototype.NotifyStorage = function (dataKey, dataFields) {
        return __awaiter(this, void 0, void 0, function () {
            var dataKeyIndex, dataField, dataStorageFields, dataReferenceKeys, dataTypes, i, dataReferenceKey, type, sectors, j;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dataKeyIndex = this.GetStorageKeyIndex(dataKey);
                        if (dataKeyIndex == null)
                            return [2];
                        dataField = ((dataFields != null) && (dataFields.length > 0)) ? dataFields[0] : null;
                        dataStorageFields = this._dataStorageKeyFields[dataKeyIndex];
                        dataReferenceKeys = this._dataStorageKeyReferenceKey[dataKeyIndex];
                        dataTypes = this._dataStorageType[dataKeyIndex];
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < dataStorageFields.length)) return [3, 13];
                        if ((dataField != null) && (dataStorageFields[i] != null) && (dataStorageFields[i] !== dataField))
                            return [3, 12];
                        dataReferenceKey = dataReferenceKeys[i];
                        type = dataTypes[i];
                        if (!(type == DrapoStorageLinkType.Reload)) return [3, 6];
                        sectors = this.Application.Storage.GetSectors(dataReferenceKey);
                        j = 0;
                        _a.label = 2;
                    case 2:
                        if (!(j < sectors.length)) return [3, 5];
                        return [4, this.Application.Storage.ReloadData(dataReferenceKey, sectors[j], true, false)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        j++;
                        return [3, 2];
                    case 5: return [3, 12];
                    case 6:
                        if (!(type == DrapoStorageLinkType.RenderClass)) return [3, 8];
                        return [4, this.NotifyStorageRenderClass(dataReferenceKey)];
                    case 7:
                        _a.sent();
                        return [3, 12];
                    case 8:
                        if (!(type == DrapoStorageLinkType.Notify)) return [3, 10];
                        return [4, this.Application.Observer.Notify(dataReferenceKey, null, null, true, false)];
                    case 9:
                        _a.sent();
                        return [3, 12];
                    case 10: return [4, this.Application.Observer.Notify(dataReferenceKey, null, null)];
                    case 11:
                        _a.sent();
                        _a.label = 12;
                    case 12:
                        i++;
                        return [3, 1];
                    case 13: return [2];
                }
            });
        });
    };
    DrapoObserver.prototype.NotifyStorageRenderClass = function (dataKey) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.NotifyFor(dataKey, null, null, true, DrapoStorageLinkType.RenderClass)];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    DrapoObserver.prototype.SubscribeIncremental = function (el, dataKey) {
        var dataKeyIndex = this.GetDataIncrementalKeyIndex(dataKey);
        if (dataKeyIndex == null)
            dataKeyIndex = this.CreateDataIncrementalKeyIndex(dataKey);
        this._dataIncrementalElements[dataKeyIndex].push(el);
    };
    DrapoObserver.prototype.NotifyIncremental = function (dataKey) {
        return __awaiter(this, void 0, void 0, function () {
            var dataKeyIndex, elements, i, element;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.IsEnabledNotifyIncremental)
                            return [2];
                        dataKeyIndex = this.GetDataIncrementalKeyIndex(dataKey);
                        if (dataKeyIndex == null)
                            return [2];
                        elements = this._dataIncrementalElements[dataKeyIndex];
                        i = elements.length - 1;
                        _a.label = 1;
                    case 1:
                        if (!(i >= 0)) return [3, 5];
                        if (i >= elements.length)
                            return [3, 4];
                        element = elements[i];
                        if (!(element.parentElement === null)) return [3, 2];
                        elements.splice(i, 1);
                        return [3, 4];
                    case 2: return [4, this.Application.ControlFlow.ResolveControlFlowFor($(element), true)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        i--;
                        return [3, 1];
                    case 5: return [2];
                }
            });
        });
    };
    DrapoObserver.prototype.SubscribeDelay = function (el, dataKey, dataFields) {
        var dataKeyIndex = this.GetDelayKeyIndex(dataKey);
        if (dataKeyIndex == null) {
            dataKeyIndex = this._dataDelayKey.push(dataKey) - 1;
            this._dataDelayField.push([]);
            this._dataDelayElements.push([]);
        }
        var dataField = ((dataFields != null) && (dataFields.length > 0)) ? dataFields[0] : null;
        var dataFieldIndex = this.GetDelayFieldKeyIndex(dataKeyIndex, dataField);
        if (dataFieldIndex == null) {
            dataFieldIndex = this._dataDelayField[dataKeyIndex].push(dataField) - 1;
            this._dataDelayElements[dataKeyIndex].push([]);
        }
        this._dataDelayElements[dataKeyIndex][dataFieldIndex].push(el);
    };
    DrapoObserver.prototype.NotifyDelay = function (dataKey, dataFields) {
        return __awaiter(this, void 0, void 0, function () {
            var dataKeyIndex, dataField, dataFieldIndex, elements, i, element, sector;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dataKeyIndex = this.GetDelayKeyIndex(dataKey);
                        if (dataKeyIndex == null)
                            return [2];
                        dataField = ((dataFields != null) && (dataFields.length > 0)) ? dataFields[0] : null;
                        dataFieldIndex = this.GetDelayFieldKeyIndex(dataKeyIndex, dataField);
                        if (dataFieldIndex == null)
                            return [2];
                        elements = this._dataDelayElements[dataKeyIndex][dataFieldIndex];
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < elements.length)) return [3, 4];
                        element = elements[i];
                        if (element === null)
                            return [3, 3];
                        this.SubscribeBarber(element, dataKey, dataFields);
                        sector = this.Application.Document.GetSector(element);
                        return [4, this.Application.Barber.ResolveElementDelayed(element, sector, dataKey, dataField)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        i++;
                        return [3, 1];
                    case 4:
                        this._dataDelayField[dataKeyIndex].splice(dataFieldIndex, 1);
                        this._dataDelayElements[dataKeyIndex].splice(dataFieldIndex, 1);
                        return [2];
                }
            });
        });
    };
    DrapoObserver.prototype.SubscribeAuthorization = function (dataKey, type) {
        if (this.HasDataKeyAuthorization(dataKey))
            return;
        this._dataAuthorizationKey.push(dataKey);
        this._dataAuthorizationType.push(type);
    };
    DrapoObserver.prototype.HasDataKeyAuthorization = function (dataKey) {
        return (this.GetDataKeyAuthorizationIndex(dataKey) >= 0);
    };
    DrapoObserver.prototype.GetDataKeyAuthorizationIndex = function (dataKey) {
        for (var i = 0; i < this._dataAuthorizationKey.length; i++)
            if (this._dataAuthorizationKey[i] == dataKey)
                return (i);
        return (-1);
    };
    DrapoObserver.prototype.NotifyAuthorization = function () {
        return __awaiter(this, void 0, void 0, function () {
            var i, dataKey, type;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        i = this._dataAuthorizationKey.length - 1;
                        _a.label = 1;
                    case 1:
                        if (!(i >= 0)) return [3, 6];
                        dataKey = this._dataAuthorizationKey[i];
                        type = this._dataAuthorizationType[i];
                        this._dataAuthorizationKey.splice(i, 1);
                        this._dataAuthorizationType.splice(i, 1);
                        this.Application.Document.ResetPendingAuthorizations(this.GetPendingAuthorization());
                        if (!(type === 'notify')) return [3, 3];
                        return [4, this.Application.Storage.ReloadData(dataKey, null)];
                    case 2:
                        _a.sent();
                        return [3, 5];
                    case 3:
                        if (!(type === 'initialize')) return [3, 5];
                        return [4, this.Application.Storage.RetrieveDataItem(dataKey, null)];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5:
                        i--;
                        return [3, 1];
                    case 6:
                        this.Application.Document.ResetPendingAuthorizations();
                        return [2];
                }
            });
        });
    };
    DrapoObserver.prototype.HasPendingAuthorization = function () {
        return (this.GetPendingAuthorization() > 0);
    };
    DrapoObserver.prototype.GetPendingAuthorization = function () {
        return (this._dataAuthorizationKey.length);
    };
    DrapoObserver.prototype.HasDelayKeys = function () {
        return (this._dataDelayKey.length > 0);
    };
    DrapoObserver.prototype.GetDelayKeys = function () {
        return (this._dataDelayKey);
    };
    DrapoObserver.prototype.GetDelayFields = function (dataKey) {
        var dataKeyIndex = this.GetDelayKeyIndex(dataKey);
        if (dataKeyIndex == null)
            return (null);
        return (this._dataDelayField[dataKeyIndex]);
    };
    DrapoObserver.prototype.GetDelayKeyIndex = function (dataKey) {
        var data = this._dataDelayKey;
        for (var i = 0; i < data.length; i++) {
            if (data[i] == dataKey)
                return (i);
        }
        return (null);
    };
    DrapoObserver.prototype.GetDelayFieldKeyIndex = function (dataKeyIndex, dataField) {
        var data = this._dataDelayField[dataKeyIndex];
        for (var i = 0; i < data.length; i++) {
            if (data[i] == dataField)
                return (i);
        }
        return (null);
    };
    DrapoObserver.prototype.GetStorageKeyIndex = function (dataKey) {
        var data = this._dataStorageKey;
        for (var i = 0; i < data.length; i++) {
            if (data[i] == dataKey)
                return (i);
        }
        return (null);
    };
    DrapoObserver.prototype.CreateStorageDataKeyIndex = function (dataKey) {
        var index = this._dataStorageKey.push(dataKey);
        this._dataStorageKeyFields.push([]);
        this._dataStorageKeyReferenceKey.push([]);
        this._dataStorageType.push([]);
        return (index - 1);
    };
    DrapoObserver.prototype.SubscribeLink = function (dataKey, referenceKey, dataFields) {
        if (dataFields === void 0) { dataFields = null; }
        if (referenceKey === null)
            return (false);
        var index = this.GetLinkIndex(dataKey, referenceKey);
        if (index !== null) {
            var linkDataFields = this._dataLinkDataFields[index];
            if (linkDataFields == null)
                return (false);
            if (this.IsEqualDataFields(linkDataFields, dataFields))
                return (false);
            this._dataLinkDataFields[index] = null;
            return (true);
        }
        if (this.GetLinkIndex(referenceKey, dataKey) !== null)
            return (false);
        this._dataLinkDataKey.push(dataKey);
        this._dataLinkReferenceKey.push(referenceKey);
        this._dataLinkDataFields.push(dataFields);
        return (true);
    };
    DrapoObserver.prototype.SubscribeLinkMustache = function (mustache, referenceKey) {
        var inserted = false;
        var mustaches = this.Application.Parser.ParseMustaches(mustache);
        for (var i = 0; i < mustaches.length; i++) {
            var mustacheCurrent = mustaches[i];
            var mustacheParts = this.Application.Parser.ParseMustache(mustacheCurrent);
            var mustacheDataKey = this.Application.Solver.ResolveDataKey(mustacheParts);
            var mustacheDataFields = this.Application.Solver.ResolveDataFields(mustacheParts);
            if (this.SubscribeLink(mustacheDataKey, referenceKey, mustacheDataFields))
                inserted = true;
        }
        return (inserted);
    };
    DrapoObserver.prototype.UnsubscribeLink = function (dataKey, referenceKey) {
        if (referenceKey === void 0) { referenceKey = null; }
        if (referenceKey === null) {
            var unsubscribed = false;
            for (var i = 0; i < this._dataLinkDataKey.length; i++) {
                var remove = false;
                if (this._dataLinkDataKey[i] === dataKey)
                    remove = true;
                if ((!remove) && (this._dataLinkReferenceKey[i] === dataKey))
                    remove = true;
                if (!remove)
                    continue;
                unsubscribed = true;
                this._dataLinkDataKey.splice(i, 1);
                this._dataLinkReferenceKey.splice(i, 1);
                this._dataLinkDataFields.splice(i, 1);
            }
            return (unsubscribed);
        }
        else {
            var index = this.GetLinkIndex(dataKey, referenceKey);
            if (index === null)
                return (false);
            this._dataLinkDataKey.splice(index, 1);
            this._dataLinkReferenceKey.splice(index, 1);
            this._dataLinkDataFields.splice(index, 1);
            return (true);
        }
    };
    DrapoObserver.prototype.GetLinkIndex = function (dataKey, referenceKey) {
        for (var i = 0; i < this._dataLinkDataKey.length; i++) {
            var dataKeyLink = this._dataLinkDataKey[i];
            if (dataKeyLink !== dataKey)
                continue;
            var referenceKeyLink = this._dataLinkReferenceKey[i];
            if (referenceKeyLink === referenceKey)
                return (i);
        }
        return (null);
    };
    DrapoObserver.prototype.NotifyLink = function (dataKey, dataFields) {
        return __awaiter(this, void 0, void 0, function () {
            var i, dataKeyLink, referenceKeyLink;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < this._dataLinkDataKey.length)) return [3, 4];
                        dataKeyLink = this._dataLinkDataKey[i];
                        if ((dataKeyLink !== dataKey) || (!this.IsCompatibleDataFields(dataFields, this._dataLinkDataFields[i])))
                            return [3, 3];
                        referenceKeyLink = this._dataLinkReferenceKey[i];
                        return [4, this.Notify(referenceKeyLink, null, null)];
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
    DrapoObserver.prototype.Unsubscribe = function (dataKey) {
        this.UnsubscribeStorage(dataKey);
        this.UnsubscribeFor(dataKey);
        this.UnsubscribeBarber(dataKey);
        this.UnsubscribeLink(dataKey);
        this.UnsubscribeComponent(dataKey);
    };
    DrapoObserver.prototype.UnsubscribeDetached = function (sector) {
        this.UnsubscribeComponentDetached(sector);
    };
    DrapoObserver.prototype.GetComponentDataKeyIndex = function (dataKey) {
        var data = this._dataComponentKey;
        for (var i = 0; i < data.length; i++) {
            if (data[i] == dataKey)
                return (i);
        }
        return (null);
    };
    DrapoObserver.prototype.CreateComponentDataKeyIndex = function (dataKey) {
        var index = this._dataComponentKey.push(dataKey);
        this._dataComponentField.push([]);
        this._dataComponentElements.push([]);
        this._dataComponentFunction.push([]);
        this._dataComponentElementsFocus.push([]);
        return (index - 1);
    };
    DrapoObserver.prototype.SubscribeComponent = function (value, el, notifyFunction, elFocus) {
        if (elFocus === void 0) { elFocus = null; }
        var dataKey = null;
        var dataFields = null;
        var elComponentFocus = null;
        if (this.Application.Parser.IsMustache(value)) {
            var mustacheParts = this.Application.Parser.ParseMustache(value);
            dataKey = this.Application.Solver.ResolveDataKey(mustacheParts);
            dataFields = this.Application.Solver.ResolveDataFields(mustacheParts);
            elComponentFocus = elFocus;
        }
        else {
            dataKey = value;
        }
        var dataKeyIndex = this.GetComponentDataKeyIndex(dataKey);
        if (dataKeyIndex == null)
            dataKeyIndex = this.CreateComponentDataKeyIndex(dataKey);
        this._dataComponentField[dataKeyIndex].push(dataFields);
        this._dataComponentElements[dataKeyIndex].push(el);
        this._dataComponentFunction[dataKeyIndex].push(notifyFunction);
        this._dataComponentElementsFocus[dataKeyIndex].push(elComponentFocus);
    };
    DrapoObserver.prototype.UnsubscribeComponent = function (dataKey) {
        var dataKeyIndex = this.GetComponentDataKeyIndex(dataKey);
        if (dataKeyIndex == null)
            return;
        this._dataComponentKey.splice(dataKeyIndex, 1);
        this._dataComponentField.splice(dataKeyIndex, 1);
        this._dataComponentElements.splice(dataKeyIndex, 1);
        this._dataComponentFunction.splice(dataKeyIndex, 1);
        this._dataComponentElementsFocus.splice(dataKeyIndex, 1);
    };
    DrapoObserver.prototype.UnsubscribeComponentDetached = function (sector) {
        for (var i = this._dataComponentKey.length - 1; i >= 0; i--) {
            var dataComponentElements = this._dataComponentElements[i];
            for (var j = dataComponentElements.length - 1; j >= 0; j--) {
                var dataComponentElement = dataComponentElements[j];
                if (this.Application.Document.IsElementAttached(dataComponentElement))
                    continue;
                dataComponentElements.splice(j, 1);
                this._dataComponentField[i].splice(j, 1);
                this._dataComponentFunction[i].splice(j, 1);
                this._dataComponentElementsFocus[i].splice(j, 1);
            }
            if (dataComponentElements.length > 0)
                continue;
            this._dataComponentKey.splice(i, 1);
            this._dataComponentField.splice(i, 1);
            this._dataComponentElements.splice(i, 1);
            this._dataComponentFunction.splice(i, 1);
            this._dataComponentElementsFocus.splice(i, 1);
        }
    };
    DrapoObserver.prototype.NotifyComponent = function (dataKey) {
        return __awaiter(this, void 0, void 0, function () {
            var dataKeyIndex, dataComponentElements, dataComponentFunctions, i, dataComponentElement, dataComponentFunction, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dataKeyIndex = this.GetComponentDataKeyIndex(dataKey);
                        if (dataKeyIndex == null)
                            return [2];
                        dataComponentElements = this._dataComponentElements[dataKeyIndex];
                        dataComponentFunctions = this._dataComponentFunction[dataKeyIndex];
                        i = dataComponentElements.length - 1;
                        _a.label = 1;
                    case 1:
                        if (!(i >= 0)) return [3, 7];
                        dataComponentElement = dataComponentElements[i];
                        if (!((this.Application.Document.IsElementAttached(dataComponentElement)) && (!this.Application.Document.IsElementDetached(dataComponentElement)))) return [3, 5];
                        dataComponentFunction = dataComponentFunctions[i];
                        return [4, dataComponentFunction.apply(null, [dataComponentElement, this.Application])];
                    case 2:
                        result = _a.sent();
                        if (!((result == null) || (result == true))) return [3, 4];
                        return [4, this.Application.Document.ResolveComponentUpdate(dataComponentElement, null)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [3, 6];
                    case 5:
                        if (!this.Application.SectorContainerHandler.IsElementContainerized(dataComponentElement)) {
                            this._dataComponentField[dataKeyIndex].splice(i, 1);
                            this._dataComponentElements[dataKeyIndex].splice(i, 1);
                            this._dataComponentFunction[dataKeyIndex].splice(i, 1);
                            this._dataComponentElementsFocus[dataKeyIndex].splice(i, 1);
                        }
                        _a.label = 6;
                    case 6:
                        i--;
                        return [3, 1];
                    case 7: return [2];
                }
            });
        });
    };
    DrapoObserver.prototype.GetElementByModel = function (sector, model) {
        if (!this.Application.Parser.IsMustacheOnly(model))
            return (null);
        var mustacheParts = this.Application.Parser.ParseMustache(model);
        var dataKey = this.Application.Solver.ResolveDataKey(mustacheParts);
        var dataFields = this.Application.Solver.ResolveDataFields(mustacheParts);
        var el = this.GetElementByModelComponent(sector, model, dataKey, dataFields);
        if (el !== null)
            return (el);
        return (this.GetElementByModelBarber(sector, model, dataKey, dataFields));
    };
    DrapoObserver.prototype.GetElementByModelComponent = function (sector, model, dataKey, dataFields) {
        var dataKeyIndex = this.GetComponentDataKeyIndex(dataKey);
        if (dataKeyIndex === null)
            return (null);
        var componentDataFields = this._dataComponentField[dataKeyIndex];
        var els = this._dataComponentElementsFocus[dataKeyIndex];
        for (var i = els.length - 1; i >= 0; i--) {
            var el = els[i];
            if (el === null)
                continue;
            if (el.parentElement == null)
                continue;
            var componentDataField = componentDataFields[i];
            if (componentDataField == null)
                continue;
            var isEqual = this.Application.Solver.IsEqualStringArray(dataFields, componentDataField);
            if (isEqual)
                return (el);
        }
        return (null);
    };
    DrapoObserver.prototype.GetElementByModelBarber = function (sector, model, dataKey, dataFields) {
        var dataKeyIndex = this.GetBarberDataKeyIndex(dataKey);
        if (dataKeyIndex === null)
            return;
        var dataBarberElements = this._dataBarberElements[dataKeyIndex];
        var dataBarberFields = this._dataBarberFields[dataKeyIndex];
        for (var i = 0; i < dataBarberElements.length; i++) {
            var element = dataBarberElements[i];
            var sectorElement = this.Application.Document.GetSector(element);
            if (sectorElement !== sector)
                continue;
            var barberFields = dataBarberFields[i];
            var isEqual = this.IsEqualDataFields(barberFields, dataFields);
            if (!isEqual)
                continue;
            return (element);
        }
        return (null);
    };
    DrapoObserver.prototype.IsCompatibleDataFields = function (dataFields1, dataFields2) {
        if (dataFields1 == null)
            return (true);
        if (dataFields2 == null)
            return (true);
        for (var i = 0; (i < dataFields1.length) && (i < dataFields2.length); i++)
            if (dataFields1[i] != dataFields2[i])
                return (false);
        return (true);
    };
    DrapoObserver.prototype.IsEqualDataFields = function (dataFields1, dataFields2) {
        var isNull1 = dataFields1 == null;
        var isNull2 = dataFields2 == null;
        if (isNull1 != isNull2)
            return (false);
        if (isNull1)
            return (true);
        var length = dataFields1.length;
        if (length != dataFields2.length)
            return (false);
        for (var i = 0; i < length; i++)
            if (dataFields1[i] != dataFields2[i])
                return (false);
        return (true);
    };
    return DrapoObserver;
}());

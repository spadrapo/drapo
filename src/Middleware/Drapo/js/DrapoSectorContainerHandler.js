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
var DrapoSectorContainerHandler = (function () {
    function DrapoSectorContainerHandler(application) {
        this.CONTAINER_EQUAL = '=';
        this._containers = [];
        this._activeSectorContainers = [];
        this._sectorContexts = [];
        this._sectorContextsExpressions = [];
        this._sectorContextsValues = [];
        this._application = application;
    }
    Object.defineProperty(DrapoSectorContainerHandler.prototype, "Application", {
        get: function () {
            return (this._application);
        },
        enumerable: false,
        configurable: true
    });
    DrapoSectorContainerHandler.prototype.IsElementContainerized = function (element) {
        var elRoot = this.GetElementRoot(element);
        if (elRoot === null)
            return (false);
        for (var i = this._containers.length - 1; i >= 0; i--) {
            var container = this._containers[i];
            if (container.Element === elRoot)
                return (true);
        }
        return (false);
    };
    DrapoSectorContainerHandler.prototype.GetElementRoot = function (el) {
        while (el.parentElement !== null) {
            el = el.parentElement;
            if (el.tagName === 'BODY')
                return (null);
        }
        return (el);
    };
    DrapoSectorContainerHandler.prototype.Switch = function (sector, containerCode) {
        if (containerCode === void 0) { containerCode = null; }
        return __awaiter(this, void 0, void 0, function () {
            var containerCodePrevious, i, activeSectorContainer, containerPrevious, el, loaded, i, container;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        containerCodePrevious = null;
                        for (i = 0; i < this._activeSectorContainers.length; i++) {
                            activeSectorContainer = this._activeSectorContainers[i];
                            if (activeSectorContainer[0] !== sector)
                                continue;
                            containerCodePrevious = activeSectorContainer[1];
                            if (containerCode !== this.CONTAINER_EQUAL)
                                this._activeSectorContainers.splice(i, 1);
                            break;
                        }
                        if ((containerCodePrevious !== null) && (containerCode !== this.CONTAINER_EQUAL)) {
                            containerPrevious = this.CreateContainer(sector, containerCodePrevious);
                            this._containers.push(containerPrevious);
                        }
                        return [4, this.UnloadSector(sector)];
                    case 1:
                        _a.sent();
                        if (containerCode === this.CONTAINER_EQUAL) {
                            el = this.Application.Document.GetSectorElementInner(sector);
                            if ((el !== null) && (el.parentElement !== null))
                                el.parentElement.removeChild(el);
                        }
                        if ((containerCode === null) || (containerCode === this.CONTAINER_EQUAL)) {
                            return [2, (false)];
                        }
                        loaded = false;
                        i = 0;
                        _a.label = 2;
                    case 2:
                        if (!(i < this._containers.length)) return [3, 5];
                        container = this._containers[i];
                        if ((container.Sector !== sector) || (container.ContainerCode !== containerCode))
                            return [3, 4];
                        this._containers.splice(i, 1);
                        return [4, this.LoadContainer(container)];
                    case 3:
                        _a.sent();
                        loaded = true;
                        return [3, 5];
                    case 4:
                        i++;
                        return [3, 2];
                    case 5:
                        this._activeSectorContainers.push([sector, containerCode]);
                        return [2, (loaded)];
                }
            });
        });
    };
    DrapoSectorContainerHandler.prototype.CreateContainer = function (sector, containerCode) {
        var el = this.Application.Document.GetSectorElementInner(sector);
        var canDetachElement = this.Application.Document.CanDetachElement(el);
        var sectorChildren = this.Application.Document.GetSectorAndChildren(sector);
        var storageItems = [];
        var sectorHierarchys = [];
        var sectorFriends = [];
        var componentSectors = [];
        var componentTags = [];
        var componentElements = [];
        var componentInstances = [];
        for (var i = 0; i < sectorChildren.length; i++) {
            var sectorCurrent = sectorChildren[i];
            this.Application.Storage.AppendCacheDataItemBySector(storageItems, sectorCurrent);
            this.Application.Document.AppendSectorHierarchyBySector(sectorHierarchys, sectorCurrent);
            this.Application.Document.AppendSectorFriendsBySector(sectorFriends, sectorCurrent);
            this.Application.ComponentHandler.AppendInstances(sectorCurrent, componentSectors, componentTags, componentElements, componentInstances);
        }
        return (new DrapoSectorContainerItem(sector, containerCode, storageItems, sectorHierarchys, sectorFriends, componentSectors, componentTags, componentElements, componentInstances, el, canDetachElement));
    };
    DrapoSectorContainerHandler.prototype.LoadContainer = function (container) {
        return __awaiter(this, void 0, void 0, function () {
            var sectorChildren, i, sectorCurrent;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.Application.Document.SetSectorElementInner(container.Sector, container.Element, container.CanDetachElement);
                        return [4, this.Application.Storage.AddCacheDataItems(container.StorageItems)];
                    case 1:
                        _a.sent();
                        this.Application.Document.AddSectorHierarchys(container.SectorHierarchys);
                        this.Application.Document.AddSectorFriendsRange(container.SectorFriends);
                        return [4, this.Application.ComponentHandler.AddInstances(container)];
                    case 2:
                        _a.sent();
                        sectorChildren = this.Application.Document.GetSectorAndChildren(container.Sector);
                        i = 0;
                        _a.label = 3;
                    case 3:
                        if (!(i < sectorChildren.length)) return [3, 6];
                        sectorCurrent = sectorChildren[i];
                        return [4, this.Application.Storage.FireEventOnAfterContainerLoad(sectorCurrent)];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5:
                        i++;
                        return [3, 3];
                    case 6: return [2];
                }
            });
        });
    };
    DrapoSectorContainerHandler.prototype.UnloadSector = function (sector) {
        return __awaiter(this, void 0, void 0, function () {
            var sectorChildren, i, sectorCurrent;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sectorChildren = this.Application.Document.GetSectorAndChildren(sector);
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < sectorChildren.length)) return [3, 5];
                        sectorCurrent = sectorChildren[i];
                        return [4, this.Application.Storage.FireEventOnBeforeContainerUnload(sectorCurrent)];
                    case 2:
                        _a.sent();
                        this.Application.Validator.UnloadSector(sectorCurrent);
                        this.Application.ComponentHandler.UnloadComponentInstances(sectorCurrent);
                        return [4, this.Application.Storage.RemoveBySector(sectorCurrent)];
                    case 3:
                        _a.sent();
                        this.RemoveMustacheContextCache(sectorCurrent);
                        _a.label = 4;
                    case 4:
                        i++;
                        return [3, 1];
                    case 5:
                        this.Application.Document.CleanSectorMetadata(sector);
                        this.Application.Document.SetSectorElementInner(sector, null, null);
                        return [2];
                }
            });
        });
    };
    DrapoSectorContainerHandler.prototype.RemoveByContainer = function (containerCode) {
        for (var i = this._activeSectorContainers.length - 1; i >= 0; i--) {
            var sectorContainer = this._activeSectorContainers[i];
            if (sectorContainer[1] !== containerCode)
                continue;
            var el = this.Application.Document.GetSectorElementInner(sectorContainer[0]);
            if ((el !== null) && (el.parentElement !== null))
                el.parentElement.removeChild(el);
            this._activeSectorContainers.splice(i, 1);
            break;
        }
        var removed = false;
        for (var i = this._containers.length - 1; i >= 0; i--) {
            var container = this._containers[i];
            if (container.ContainerCode !== containerCode)
                continue;
            if (container.Element != null && container.Element.parentElement != null)
                container.Element.parentElement.removeChild(container.Element);
            this._containers.splice(i, 1);
            removed = true;
            break;
        }
        return (removed);
    };
    DrapoSectorContainerHandler.prototype.RemoveBySector = function (sector) {
        for (var i = this._activeSectorContainers.length - 1; i >= 0; i--) {
            var sectorContainer = this._activeSectorContainers[i];
            if (sectorContainer[0] !== sector)
                continue;
            this._activeSectorContainers.splice(i, 1);
            break;
        }
        var removed = false;
        for (var i = this._containers.length - 1; i >= 0; i--) {
            var container = this._containers[i];
            if (container.Sector !== sector)
                continue;
            if ((!container.CanDetachElement) && (container.Element.parentElement != null))
                container.Element.parentElement.removeChild(container.Element);
            this._containers.splice(i, 1);
            removed = true;
        }
        return (removed);
    };
    DrapoSectorContainerHandler.prototype.GetStorageItem = function (sector, containerCode, dataKey) {
        for (var i = this._containers.length - 1; i >= 0; i--) {
            var container = this._containers[i];
            if ((container.Sector !== sector) || (container.ContainerCode !== containerCode))
                continue;
            for (var j = 0; j < container.StorageItems.length; j++) {
                var storageItem = container.StorageItems[j];
                if (storageItem.DataKey !== dataKey)
                    continue;
                if (storageItem.Sector !== sector)
                    continue;
                return (storageItem);
            }
            break;
        }
        return (null);
    };
    DrapoSectorContainerHandler.prototype.ReloadStorageItemByPipe = function (dataPipe) {
    };
    DrapoSectorContainerHandler.prototype.HasMustacheContextCache = function (sector, expression) {
        var indexSector = this.GetMustacheContextIndex(sector);
        if (indexSector === null)
            return (null);
        var indexExpression = this.GetMustacheContextExpressionIndex(indexSector, expression);
        if (indexExpression === null)
            return (null);
        return (this._sectorContextsValues[indexSector][indexExpression]);
    };
    DrapoSectorContainerHandler.prototype.RemoveMustacheContextCache = function (sector) {
        var indexSector = this.GetMustacheContextIndex(sector);
        if (indexSector === null)
            return;
        this._sectorContexts.splice(indexSector, 1);
        this._sectorContextsExpressions.splice(indexSector, 1);
        this._sectorContextsValues.splice(indexSector, 1);
    };
    DrapoSectorContainerHandler.prototype.AddMustacheContextCache = function (sector, expression, value) {
        var indexSector = this.GetMustacheContextIndex(sector);
        if (indexSector === null) {
            indexSector = this._sectorContexts.push(sector) - 1;
            this._sectorContextsExpressions.push([]);
            this._sectorContextsValues.push([]);
        }
        this._sectorContextsExpressions[indexSector].push(expression);
        this._sectorContextsValues[indexSector].push(value);
    };
    DrapoSectorContainerHandler.prototype.GetMustacheContextIndex = function (sector) {
        for (var i = 0; i < this._sectorContexts.length; i++)
            if (this._sectorContexts[i] === sector)
                return (i);
        return (null);
    };
    DrapoSectorContainerHandler.prototype.GetMustacheContextExpressionIndex = function (indexSector, expression) {
        var expressions = this._sectorContextsExpressions[indexSector];
        for (var i = 0; i < expressions.length; i++)
            if (expressions[i] === expression)
                return (i);
        return (null);
    };
    return DrapoSectorContainerHandler;
}());

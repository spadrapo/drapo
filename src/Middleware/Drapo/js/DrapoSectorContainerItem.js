"use strict";
var DrapoSectorContainerItem = (function () {
    function DrapoSectorContainerItem(sector, containerCode, storageItems, sectorHierarchys, sectorFriends, componentSectors, componentTags, componentElements, componentInstances, element, canDetachElement) {
        this._sector = null;
        this._containerCode = null;
        this._storageItems = [];
        this._sectorHierarchys = [];
        this._sectorFriends = [];
        this._componentSectors = [];
        this._componentTags = [];
        this._componentElements = [];
        this._componentInstances = [];
        this._element = null;
        this._canDetachElement = true;
        this._sector = sector;
        this._containerCode = containerCode;
        this._storageItems = storageItems;
        this._sectorHierarchys = sectorHierarchys;
        this._sectorFriends = sectorFriends;
        this._componentSectors = componentSectors;
        this._componentTags = componentTags;
        this._componentElements = componentElements;
        this._componentInstances = componentInstances;
        this._element = element;
        this._canDetachElement = canDetachElement;
    }
    Object.defineProperty(DrapoSectorContainerItem.prototype, "Sector", {
        get: function () {
            return (this._sector);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoSectorContainerItem.prototype, "ContainerCode", {
        get: function () {
            return (this._containerCode);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoSectorContainerItem.prototype, "StorageItems", {
        get: function () {
            return (this._storageItems);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoSectorContainerItem.prototype, "SectorHierarchys", {
        get: function () {
            return this._sectorHierarchys;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoSectorContainerItem.prototype, "SectorFriends", {
        get: function () {
            return this._sectorFriends;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoSectorContainerItem.prototype, "ComponentSectors", {
        get: function () {
            return (this._componentSectors);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoSectorContainerItem.prototype, "ComponentTags", {
        get: function () {
            return (this._componentTags);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoSectorContainerItem.prototype, "ComponentElements", {
        get: function () {
            return (this._componentElements);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoSectorContainerItem.prototype, "ComponentInstances", {
        get: function () {
            return (this._componentInstances);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoSectorContainerItem.prototype, "Element", {
        get: function () {
            return this._element;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoSectorContainerItem.prototype, "CanDetachElement", {
        get: function () {
            return this._canDetachElement;
        },
        enumerable: false,
        configurable: true
    });
    return DrapoSectorContainerItem;
}());

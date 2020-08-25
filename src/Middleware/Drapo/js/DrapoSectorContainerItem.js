"use strict";
var DrapoSectorContainerItem = (function () {
    function DrapoSectorContainerItem(sector, containerCode, storageItems, sectorHierarchys, sectorFriends, element, canDetachElement) {
        this._sector = null;
        this._containerCode = null;
        this._storageItems = [];
        this._sectorHierarchys = [];
        this._sectorFriends = [];
        this._element = null;
        this._canDetachElement = true;
        this._sector = sector;
        this._containerCode = containerCode;
        this._storageItems = storageItems;
        this._sectorHierarchys = sectorHierarchys;
        this._sectorFriends = sectorFriends;
        this._element = element;
        this._canDetachElement = canDetachElement;
    }
    Object.defineProperty(DrapoSectorContainerItem.prototype, "Sector", {
        get: function () {
            return (this._sector);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DrapoSectorContainerItem.prototype, "ContainerCode", {
        get: function () {
            return (this._containerCode);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DrapoSectorContainerItem.prototype, "StorageItems", {
        get: function () {
            return (this._storageItems);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DrapoSectorContainerItem.prototype, "SectorHierarchys", {
        get: function () {
            return this._sectorHierarchys;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DrapoSectorContainerItem.prototype, "SectorFriends", {
        get: function () {
            return this._sectorFriends;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DrapoSectorContainerItem.prototype, "Element", {
        get: function () {
            return this._element;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DrapoSectorContainerItem.prototype, "CanDetachElement", {
        get: function () {
            return this._canDetachElement;
        },
        enumerable: true,
        configurable: true
    });
    return DrapoSectorContainerItem;
}());

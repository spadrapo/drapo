"use strict";
var DrapoRouteItem = (function () {
    function DrapoRouteItem() {
        this._url = null;
        this._sector = null;
        this._title = null;
        this._state = null;
    }
    Object.defineProperty(DrapoRouteItem.prototype, "Url", {
        get: function () {
            return (this._url);
        },
        set: function (value) {
            this._url = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoRouteItem.prototype, "Sector", {
        get: function () {
            return (this._sector);
        },
        set: function (value) {
            this._sector = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoRouteItem.prototype, "Title", {
        get: function () {
            return (this._title);
        },
        set: function (value) {
            this._title = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoRouteItem.prototype, "State", {
        get: function () {
            return (this._state);
        },
        set: function (value) {
            this._state = value;
        },
        enumerable: false,
        configurable: true
    });
    return DrapoRouteItem;
}());

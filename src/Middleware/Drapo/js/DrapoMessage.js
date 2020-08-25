"use strict";
var DrapoMessage = (function () {
    function DrapoMessage() {
        this._action = null;
        this._dataKey = null;
        this._sector = null;
        this._tag = null;
        this._data = null;
    }
    Object.defineProperty(DrapoMessage.prototype, "Action", {
        get: function () {
            return (this._action);
        },
        set: function (value) {
            this._action = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DrapoMessage.prototype, "DataKey", {
        get: function () {
            return (this._dataKey);
        },
        set: function (value) {
            this._dataKey = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DrapoMessage.prototype, "Sector", {
        get: function () {
            return (this._sector);
        },
        set: function (value) {
            this._sector = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DrapoMessage.prototype, "Tag", {
        get: function () {
            return (this._tag);
        },
        set: function (value) {
            this._tag = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DrapoMessage.prototype, "Data", {
        get: function () {
            return (this._data);
        },
        set: function (value) {
            this._data = value;
        },
        enumerable: true,
        configurable: true
    });
    return DrapoMessage;
}());

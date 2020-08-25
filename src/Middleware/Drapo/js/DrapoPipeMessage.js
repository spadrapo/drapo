"use strict";
var DrapoPipeMessage = (function () {
    function DrapoPipeMessage() {
        this._type = null;
        this._data = null;
    }
    Object.defineProperty(DrapoPipeMessage.prototype, "Type", {
        get: function () {
            return (this._type);
        },
        set: function (value) {
            this._type = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DrapoPipeMessage.prototype, "Data", {
        get: function () {
            return (this._data);
        },
        set: function (value) {
            this._data = value;
        },
        enumerable: true,
        configurable: true
    });
    return DrapoPipeMessage;
}());

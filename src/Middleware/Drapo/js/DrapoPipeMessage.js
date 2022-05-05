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
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoPipeMessage.prototype, "Data", {
        get: function () {
            return (this._data);
        },
        set: function (value) {
            this._data = value;
        },
        enumerable: false,
        configurable: true
    });
    return DrapoPipeMessage;
}());

"use strict";
var DrapoQuerySort = (function () {
    function DrapoQuerySort() {
        this._column = null;
        this._type = null;
    }
    Object.defineProperty(DrapoQuerySort.prototype, "Column", {
        get: function () {
            return (this._column);
        },
        set: function (value) {
            this._column = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoQuerySort.prototype, "Type", {
        get: function () {
            return (this._type);
        },
        set: function (value) {
            this._type = value;
        },
        enumerable: false,
        configurable: true
    });
    return DrapoQuerySort;
}());

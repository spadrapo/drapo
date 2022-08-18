"use strict";
var DrapoQueryOptions = (function () {
    function DrapoQueryOptions() {
        this._list = null;
    }
    Object.defineProperty(DrapoQueryOptions.prototype, "List", {
        get: function () {
            return (this._list);
        },
        set: function (value) {
            this._list = value;
        },
        enumerable: false,
        configurable: true
    });
    return DrapoQueryOptions;
}());

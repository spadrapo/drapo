"use strict";
var DrapoFunction = (function () {
    function DrapoFunction() {
        this._name = null;
        this._parameters = [];
    }
    Object.defineProperty(DrapoFunction.prototype, "Name", {
        get: function () {
            return (this._name);
        },
        set: function (value) {
            this._name = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DrapoFunction.prototype, "Parameters", {
        get: function () {
            return (this._parameters);
        },
        set: function (value) {
            this._parameters = value;
        },
        enumerable: true,
        configurable: true
    });
    return DrapoFunction;
}());

"use strict";
var DrapoQueryProjection = (function () {
    function DrapoQueryProjection() {
        this._source = null;
        this._column = null;
        this._alias = null;
        this._functionName = null;
        this._functionParameters = null;
    }
    Object.defineProperty(DrapoQueryProjection.prototype, "Source", {
        get: function () {
            return (this._source);
        },
        set: function (value) {
            this._source = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DrapoQueryProjection.prototype, "Column", {
        get: function () {
            return (this._column);
        },
        set: function (value) {
            this._column = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DrapoQueryProjection.prototype, "Alias", {
        get: function () {
            return (this._alias);
        },
        set: function (value) {
            this._alias = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DrapoQueryProjection.prototype, "FunctionName", {
        get: function () {
            return (this._functionName);
        },
        set: function (value) {
            this._functionName = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DrapoQueryProjection.prototype, "FunctionParameters", {
        get: function () {
            return (this._functionParameters);
        },
        set: function (value) {
            this._functionParameters = value;
        },
        enumerable: true,
        configurable: true
    });
    return DrapoQueryProjection;
}());

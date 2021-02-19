"use strict";
var DrapoQueryProjection = (function () {
    function DrapoQueryProjection() {
        this._source = null;
        this._column = null;
        this._alias = null;
        this._aggregation = null;
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
    Object.defineProperty(DrapoQueryProjection.prototype, "Aggregation", {
        get: function () {
            return (this._aggregation);
        },
        set: function (value) {
            this._aggregation = value;
        },
        enumerable: true,
        configurable: true
    });
    return DrapoQueryProjection;
}());

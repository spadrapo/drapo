"use strict";
var DrapoQuery = (function () {
    function DrapoQuery() {
        this._error = null;
        this._projections = [];
        this._sources = [];
    }
    Object.defineProperty(DrapoQuery.prototype, "Error", {
        get: function () {
            return (this._error);
        },
        set: function (value) {
            this._error = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DrapoQuery.prototype, "Projections", {
        get: function () {
            return (this._projections);
        },
        set: function (value) {
            this._projections = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DrapoQuery.prototype, "Sources", {
        get: function () {
            return (this._sources);
        },
        set: function (value) {
            this._sources = value;
        },
        enumerable: true,
        configurable: true
    });
    return DrapoQuery;
}());

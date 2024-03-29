"use strict";
var DrapoQuery = (function () {
    function DrapoQuery() {
        this._error = null;
        this._projections = [];
        this._sources = [];
        this._filter = null;
        this._sorts = null;
        this._outputArray = null;
        this._options = null;
    }
    Object.defineProperty(DrapoQuery.prototype, "Error", {
        get: function () {
            return (this._error);
        },
        set: function (value) {
            this._error = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoQuery.prototype, "Projections", {
        get: function () {
            return (this._projections);
        },
        set: function (value) {
            this._projections = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoQuery.prototype, "Sources", {
        get: function () {
            return (this._sources);
        },
        set: function (value) {
            this._sources = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoQuery.prototype, "Filter", {
        get: function () {
            return (this._filter);
        },
        set: function (value) {
            this._filter = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoQuery.prototype, "Sorts", {
        get: function () {
            return (this._sorts);
        },
        set: function (value) {
            this._sorts = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoQuery.prototype, "OutputArray", {
        get: function () {
            return (this._outputArray);
        },
        set: function (value) {
            this._outputArray = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoQuery.prototype, "Options", {
        get: function () {
            return (this._options);
        },
        set: function (value) {
            this._options = value;
        },
        enumerable: false,
        configurable: true
    });
    return DrapoQuery;
}());

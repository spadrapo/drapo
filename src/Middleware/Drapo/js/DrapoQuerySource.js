"use strict";
var DrapoQuerySource = (function () {
    function DrapoQuerySource() {
        this._joinType = null;
        this._source = null;
        this._alias = null;
        this._joinConditions = [];
    }
    Object.defineProperty(DrapoQuerySource.prototype, "JoinType", {
        get: function () {
            return (this._joinType);
        },
        set: function (value) {
            this._joinType = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoQuerySource.prototype, "Source", {
        get: function () {
            return (this._source);
        },
        set: function (value) {
            this._source = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoQuerySource.prototype, "Alias", {
        get: function () {
            return (this._alias);
        },
        set: function (value) {
            this._alias = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoQuerySource.prototype, "JoinConditions", {
        get: function () {
            return (this._joinConditions);
        },
        set: function (value) {
            this._joinConditions = value;
        },
        enumerable: false,
        configurable: true
    });
    return DrapoQuerySource;
}());

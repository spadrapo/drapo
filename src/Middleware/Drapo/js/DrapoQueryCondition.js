"use strict";
var DrapoQueryCondition = (function () {
    function DrapoQueryCondition() {
        this._sourceLeft = null;
        this._columnLeft = null;
        this._valueLeft = null;
        this._comparator = null;
        this._sourceRight = null;
        this._columnRight = null;
        this._valueRight = null;
        this._isNullRight = false;
    }
    Object.defineProperty(DrapoQueryCondition.prototype, "SourceLeft", {
        get: function () {
            return (this._sourceLeft);
        },
        set: function (value) {
            this._sourceLeft = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DrapoQueryCondition.prototype, "ColumnLeft", {
        get: function () {
            return (this._columnLeft);
        },
        set: function (value) {
            this._columnLeft = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DrapoQueryCondition.prototype, "ValueLeft", {
        get: function () {
            return (this._valueLeft);
        },
        set: function (value) {
            this._valueLeft = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DrapoQueryCondition.prototype, "Comparator", {
        get: function () {
            return (this._comparator);
        },
        set: function (value) {
            this._comparator = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DrapoQueryCondition.prototype, "SourceRight", {
        get: function () {
            return (this._sourceRight);
        },
        set: function (value) {
            this._sourceRight = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DrapoQueryCondition.prototype, "ColumnRight", {
        get: function () {
            return (this._columnRight);
        },
        set: function (value) {
            this._columnRight = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DrapoQueryCondition.prototype, "ValueRight", {
        get: function () {
            return (this._valueRight);
        },
        set: function (value) {
            this._valueRight = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DrapoQueryCondition.prototype, "IsNullRight", {
        get: function () {
            return (this._isNullRight);
        },
        set: function (value) {
            this._isNullRight = value;
        },
        enumerable: true,
        configurable: true
    });
    DrapoQueryCondition.prototype.Clone = function () {
        var clone = new DrapoQueryCondition();
        clone.SourceLeft = this.SourceLeft;
        clone.ColumnLeft = this.ColumnLeft;
        clone.ValueLeft = this.ValueLeft;
        clone.Comparator = this.Comparator;
        clone.SourceRight = this.SourceRight;
        clone.ColumnRight = this.ColumnRight;
        clone.ValueRight = this.ValueRight;
        clone.IsNullRight = this.IsNullRight;
        return (clone);
    };
    return DrapoQueryCondition;
}());

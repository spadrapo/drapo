"use strict";
var DrapoRegularExpressionItem = (function () {
    function DrapoRegularExpressionItem() {
    }
    Object.defineProperty(DrapoRegularExpressionItem.prototype, "Expression", {
        get: function () {
            return (this._expression);
        },
        set: function (value) {
            this._expression = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoRegularExpressionItem.prototype, "Name", {
        get: function () {
            return (this._name);
        },
        set: function (value) {
            this._name = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoRegularExpressionItem.prototype, "Value", {
        get: function () {
            return (this._value);
        },
        set: function (value) {
            this._value = value;
        },
        enumerable: false,
        configurable: true
    });
    return DrapoRegularExpressionItem;
}());

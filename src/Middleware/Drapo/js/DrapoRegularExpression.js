"use strict";
var DrapoRegularExpression = (function () {
    function DrapoRegularExpression() {
        this._items = [];
    }
    Object.defineProperty(DrapoRegularExpression.prototype, "Expression", {
        get: function () {
            return (this._expression);
        },
        set: function (value) {
            this._expression = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoRegularExpression.prototype, "Items", {
        get: function () {
            return (this._items);
        },
        enumerable: false,
        configurable: true
    });
    DrapoRegularExpression.prototype.CreateItem = function (expression, name) {
        if (name === void 0) { name = null; }
        var item = new DrapoRegularExpressionItem();
        item.Expression = expression;
        item.Name = name;
        this._items.push(item);
        return (item);
    };
    DrapoRegularExpression.prototype.IsValid = function (value) {
        var regex = new RegExp(this.Expression);
        if (!regex.test(value))
            return (false);
        var valueCurrent = value;
        for (var i = 0; i < this._items.length; i++) {
            var item = this._items[i];
            var match = valueCurrent.match(item.Expression);
            if (match == null)
                return (null);
            var matchValue = match[0];
            if (valueCurrent.indexOf(matchValue) != 0)
                return (null);
            item.Value = matchValue;
            valueCurrent = valueCurrent.substring(matchValue.length);
        }
        return (true);
    };
    DrapoRegularExpression.prototype.GetValue = function (name) {
        for (var i = 0; i < this._items.length; i++) {
            var item = this._items[i];
            if (item.Name === name)
                return (item.Value);
        }
        return (null);
    };
    return DrapoRegularExpression;
}());

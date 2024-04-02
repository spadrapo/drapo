"use strict";
var DrapoExpressionItem = (function () {
    function DrapoExpressionItem(type, value) {
        if (value === void 0) { value = ''; }
        this._value = '';
        this._items = [];
        this._type = type;
        this.Value = value;
    }
    Object.defineProperty(DrapoExpressionItem.prototype, "Type", {
        get: function () {
            return (this._type);
        },
        set: function (value) {
            this._type = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoExpressionItem.prototype, "Value", {
        get: function () {
            return (this._value);
        },
        set: function (value) {
            if ((value != null) && (value.length > 1) && (value[0] === "'") && (value[value.length - 1] === "'"))
                this._value = value.substring(1, value.length - 1);
            else if ((value != null) && (value.length > 1) && (value[0] === '"') && (value[value.length - 1] === '"'))
                this._value = value.substring(1, value.length - 1);
            else
                this._value = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoExpressionItem.prototype, "Items", {
        get: function () {
            return (this._items);
        },
        set: function (value) {
            this._items = value;
        },
        enumerable: false,
        configurable: true
    });
    DrapoExpressionItem.prototype.GetItemIndex = function (value) {
        for (var i = 0; i < this._items.length; i++)
            if (this._items[i].Value === value)
                return (i);
        return (null);
    };
    DrapoExpressionItem.prototype.CreateBlock = function (startingIndex, endingIndex) {
        var block = new DrapoExpressionItem(DrapoExpressionItemType.Block);
        for (var i = startingIndex; i <= endingIndex; i++)
            block.Items.push(this.Items[i]);
        return (block);
    };
    return DrapoExpressionItem;
}());

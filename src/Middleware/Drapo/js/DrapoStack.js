"use strict";
var DrapoStack = (function () {
    function DrapoStack() {
        this._data = [];
    }
    DrapoStack.prototype.Peek = function () {
        if (this._data.length == 0)
            return (null);
        return (this._data[this._data.length - 1]);
    };
    DrapoStack.prototype.Push = function (item) {
        this._data.push(item);
    };
    DrapoStack.prototype.Pop = function () {
        var item = this._data.pop();
        return (item !== null && item !== void 0 ? item : null);
    };
    return DrapoStack;
}());

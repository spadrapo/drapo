"use strict";
var DrapoView = (function () {
    function DrapoView() {
        this._name = null;
        this._tag = null;
        this._condition = null;
    }
    Object.defineProperty(DrapoView.prototype, "Name", {
        get: function () {
            return (this._name);
        },
        set: function (value) {
            this._name = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoView.prototype, "Tag", {
        get: function () {
            return (this._tag);
        },
        set: function (value) {
            this._tag = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoView.prototype, "Condition", {
        get: function () {
            return (this._condition);
        },
        set: function (value) {
            this._condition = value;
        },
        enumerable: false,
        configurable: true
    });
    return DrapoView;
}());

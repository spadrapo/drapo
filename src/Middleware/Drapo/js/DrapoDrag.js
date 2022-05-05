"use strict";
var DrapoDrag = (function () {
    function DrapoDrag() {
        this._action = 'move';
        this._tags = [];
    }
    Object.defineProperty(DrapoDrag.prototype, "Code", {
        get: function () {
            return (this._code);
        },
        set: function (value) {
            this._code = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoDrag.prototype, "Action", {
        get: function () {
            return (this._action);
        },
        set: function (value) {
            this._action = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoDrag.prototype, "Item", {
        get: function () {
            return (this._contextItem);
        },
        set: function (value) {
            this._contextItem = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoDrag.prototype, "Tags", {
        get: function () {
            return (this._tags);
        },
        set: function (value) {
            this._tags = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoDrag.prototype, "Notify", {
        get: function () {
            return (this._notify);
        },
        set: function (value) {
            this._notify = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoDrag.prototype, "OnBefore", {
        get: function () {
            return (this._onBefore);
        },
        set: function (value) {
            this._onBefore = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoDrag.prototype, "OnAfter", {
        get: function () {
            return (this._onAfter);
        },
        set: function (value) {
            this._onAfter = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoDrag.prototype, "DataKey", {
        get: function () {
            return (this._dataKey);
        },
        set: function (value) {
            this._dataKey = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoDrag.prototype, "Sector", {
        get: function () {
            return (this._sector);
        },
        set: function (value) {
            this._sector = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoDrag.prototype, "Custom", {
        get: function () {
            return (this._custom);
        },
        set: function (value) {
            this._custom = value;
        },
        enumerable: false,
        configurable: true
    });
    DrapoDrag.prototype.IsMatch = function (tags) {
        for (var i = 0; i < tags.length; i++) {
            var tag = tags[i];
            for (var j = 0; j < this._tags.length; j++) {
                if (this._tags[j] === tag)
                    return (true);
            }
        }
        return (false);
    };
    return DrapoDrag;
}());

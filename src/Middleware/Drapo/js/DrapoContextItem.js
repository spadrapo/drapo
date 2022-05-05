"use strict";
var DrapoContextItem = (function () {
    function DrapoContextItem(context, parent) {
        if (parent === void 0) { parent = null; }
        this._context = null;
        this._parent = null;
        this._children = [];
        this._data = null;
        this._dataKey = null;
        this._key = null;
        this._iterator = null;
        this._index = null;
        this._element = null;
        this._elementForTemplate = null;
        this._elementOld = null;
        this._context = context;
        this._parent = parent;
    }
    Object.defineProperty(DrapoContextItem.prototype, "Context", {
        get: function () {
            return (this._context);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoContextItem.prototype, "Parent", {
        get: function () {
            return (this._parent);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoContextItem.prototype, "Children", {
        get: function () {
            return (this._children);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoContextItem.prototype, "Data", {
        get: function () {
            return (this._data);
        },
        set: function (value) {
            this._data = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoContextItem.prototype, "DataKey", {
        get: function () {
            return (this._dataKey);
        },
        set: function (value) {
            this._dataKey = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoContextItem.prototype, "Key", {
        get: function () {
            return (this._key);
        },
        set: function (value) {
            this._key = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoContextItem.prototype, "Iterator", {
        get: function () {
            return (this._iterator);
        },
        set: function (value) {
            this._iterator = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoContextItem.prototype, "Index", {
        get: function () {
            return (this._index);
        },
        set: function (value) {
            this._index = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoContextItem.prototype, "Element", {
        get: function () {
            return (this._element);
        },
        set: function (value) {
            this._element = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoContextItem.prototype, "ElementForTemplate", {
        get: function () {
            return (this._elementForTemplate);
        },
        set: function (value) {
            this._elementForTemplate = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoContextItem.prototype, "ElementOld", {
        get: function () {
            return (this._elementOld);
        },
        set: function (value) {
            this._elementOld = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoContextItem.prototype, "RootItem", {
        get: function () {
            if (this.Parent != null)
                return (this.Parent.RootItem);
            return (this);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoContextItem.prototype, "RootElement", {
        get: function () {
            return (this.RootItem.Element);
        },
        enumerable: false,
        configurable: true
    });
    return DrapoContextItem;
}());

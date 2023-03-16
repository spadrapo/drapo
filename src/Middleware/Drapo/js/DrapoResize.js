"use strict";
var DrapoResize = (function () {
    function DrapoResize() {
        this.Unit = 'px';
    }
    Object.defineProperty(DrapoResize.prototype, "Code", {
        get: function () {
            return (this._code);
        },
        set: function (value) {
            this._code = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoResize.prototype, "Item", {
        get: function () {
            return (this._contextItem);
        },
        set: function (value) {
            this._contextItem = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoResize.prototype, "Element", {
        get: function () {
            return (this._element);
        },
        set: function (value) {
            this._element = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoResize.prototype, "ParentJQuery", {
        get: function () {
            return (this._parentJQuery);
        },
        set: function (value) {
            this._parentJQuery = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoResize.prototype, "Container", {
        get: function () {
            return (this._container);
        },
        set: function (value) {
            this._container = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoResize.prototype, "Model", {
        get: function () {
            return (this._model);
        },
        set: function (value) {
            this._model = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoResize.prototype, "Location", {
        get: function () {
            return (this._location);
        },
        set: function (value) {
            this._location = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoResize.prototype, "Type", {
        get: function () {
            return (this._type);
        },
        set: function (value) {
            this._type = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoResize.prototype, "Unit", {
        get: function () {
            return (this._unit);
        },
        set: function (value) {
            this._unit = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoResize.prototype, "Class", {
        get: function () {
            return (this._class);
        },
        set: function (value) {
            this._class = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoResize.prototype, "Preview", {
        get: function () {
            return (this._preview);
        },
        set: function (value) {
            this._preview = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoResize.prototype, "SizeStart", {
        get: function () {
            return (this._sizeStart);
        },
        set: function (value) {
            this._sizeStart = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoResize.prototype, "UnitStart", {
        get: function () {
            return (this._unitStart);
        },
        set: function (value) {
            this._unitStart = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoResize.prototype, "EventStartValue", {
        get: function () {
            return (this._eventStartValue);
        },
        set: function (value) {
            this._eventStartValue = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoResize.prototype, "EventCurrentValue", {
        get: function () {
            return (this._eventCurrentValue);
        },
        set: function (value) {
            this._eventCurrentValue = value;
        },
        enumerable: false,
        configurable: true
    });
    return DrapoResize;
}());

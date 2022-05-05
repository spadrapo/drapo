"use strict";
var DrapoWindow = (function () {
    function DrapoWindow() {
        this._did = null;
        this._uri = null;
        this._element = null;
        this._visible = true;
        this._code = null;
    }
    Object.defineProperty(DrapoWindow.prototype, "Did", {
        get: function () {
            return (this._did);
        },
        set: function (value) {
            this._did = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoWindow.prototype, "Uri", {
        get: function () {
            return (this._uri);
        },
        set: function (value) {
            this._uri = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoWindow.prototype, "Element", {
        get: function () {
            return (this._element);
        },
        set: function (value) {
            this._element = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoWindow.prototype, "Visible", {
        get: function () {
            return (this._visible);
        },
        set: function (value) {
            this._visible = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoWindow.prototype, "Code", {
        get: function () {
            return (this._code);
        },
        set: function (value) {
            this._code = value;
        },
        enumerable: false,
        configurable: true
    });
    return DrapoWindow;
}());

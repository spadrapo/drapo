"use strict";
var DrapoEventListener = (function () {
    function DrapoEventListener() {
        this._eventType = null;
        this._eventNamespace = null;
        this._function = null;
    }
    Object.defineProperty(DrapoEventListener.prototype, "EventType", {
        get: function () {
            return (this._eventType);
        },
        set: function (value) {
            this._eventType = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoEventListener.prototype, "EventNamespace", {
        get: function () {
            return (this._eventNamespace);
        },
        set: function (value) {
            this._eventNamespace = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoEventListener.prototype, "Function", {
        get: function () {
            return (this._function);
        },
        set: function (value) {
            this._function = value;
        },
        enumerable: false,
        configurable: true
    });
    return DrapoEventListener;
}());

"use strict";
var DrapoViewport = (function () {
    function DrapoViewport() {
        this._busy = false;
        this._sector = null;
        this._dataKey = null;
        this._key = null;
        this._dataKeyIteratorRange = null;
        this._data = null;
        this._el = null;
        this._elScroll = null;
        this._elTemplate = null;
        this._elBallonBefore = null;
        this._elBallonAfter = null;
        this._heightScroll = null;
        this._heightScrollScroll = null;
        this._heightBefore = null;
        this._heightAfter = null;
        this._heightItem = null;
        this._heightBallonBefore = null;
        this._heightBallonAfter = null;
        this._dataStart = null;
        this._dataEnd = null;
        this._dataLength = null;
        this._factor = 4;
        this._eventScrollTimeout = null;
        this._scrollTop = null;
        this._isActive = false;
    }
    Object.defineProperty(DrapoViewport.prototype, "Busy", {
        get: function () {
            return (this._busy);
        },
        set: function (value) {
            this._busy = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DrapoViewport.prototype, "Sector", {
        get: function () {
            return (this._sector);
        },
        set: function (value) {
            this._sector = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DrapoViewport.prototype, "DataKey", {
        get: function () {
            return (this._dataKey);
        },
        set: function (value) {
            this._dataKey = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DrapoViewport.prototype, "Key", {
        get: function () {
            return (this._key);
        },
        set: function (value) {
            this._key = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DrapoViewport.prototype, "DataKeyIteratorRange", {
        get: function () {
            return (this._dataKeyIteratorRange);
        },
        set: function (value) {
            this._dataKeyIteratorRange = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DrapoViewport.prototype, "Data", {
        get: function () {
            return (this._data);
        },
        set: function (value) {
            this._data = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DrapoViewport.prototype, "Element", {
        get: function () {
            return (this._el);
        },
        set: function (value) {
            this._el = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DrapoViewport.prototype, "ElementTemplate", {
        get: function () {
            return (this._elTemplate);
        },
        set: function (value) {
            this._elTemplate = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DrapoViewport.prototype, "ElementBallonBefore", {
        get: function () {
            return (this._elBallonBefore);
        },
        set: function (value) {
            this._elBallonBefore = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DrapoViewport.prototype, "ElementBallonAfter", {
        get: function () {
            return (this._elBallonAfter);
        },
        set: function (value) {
            this._elBallonAfter = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DrapoViewport.prototype, "ElementScroll", {
        get: function () {
            return (this._elScroll);
        },
        set: function (value) {
            this._elScroll = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DrapoViewport.prototype, "HeightScroll", {
        get: function () {
            return (this._heightScroll);
        },
        set: function (value) {
            this._heightScroll = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DrapoViewport.prototype, "HeightScrollScroll", {
        get: function () {
            return (this._heightScrollScroll);
        },
        set: function (value) {
            this._heightScrollScroll = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DrapoViewport.prototype, "HeightBefore", {
        get: function () {
            return (this._heightBefore);
        },
        set: function (value) {
            this._heightBefore = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DrapoViewport.prototype, "HeightAfter", {
        get: function () {
            return (this._heightAfter);
        },
        set: function (value) {
            this._heightAfter = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DrapoViewport.prototype, "HeightItem", {
        get: function () {
            return (this._heightItem);
        },
        set: function (value) {
            this._heightItem = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DrapoViewport.prototype, "HeightBallonBefore", {
        get: function () {
            return (this._heightBallonBefore);
        },
        set: function (value) {
            this._heightBallonBefore = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DrapoViewport.prototype, "HeightBallonAfter", {
        get: function () {
            return (this._heightBallonAfter);
        },
        set: function (value) {
            this._heightBallonAfter = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DrapoViewport.prototype, "DataStart", {
        get: function () {
            return (this._dataStart);
        },
        set: function (value) {
            this._dataStart = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DrapoViewport.prototype, "DataEnd", {
        get: function () {
            return (this._dataEnd);
        },
        set: function (value) {
            this._dataEnd = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DrapoViewport.prototype, "DataLength", {
        get: function () {
            return (this._dataLength);
        },
        set: function (value) {
            this._dataLength = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DrapoViewport.prototype, "Factor", {
        get: function () {
            return (this._factor);
        },
        set: function (value) {
            this._factor = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DrapoViewport.prototype, "EventScrollTimeout", {
        get: function () {
            return (this._eventScrollTimeout);
        },
        set: function (value) {
            this._eventScrollTimeout = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DrapoViewport.prototype, "ScrollTop", {
        get: function () {
            return (this._scrollTop);
        },
        set: function (value) {
            this._scrollTop = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DrapoViewport.prototype, "IsActive", {
        get: function () {
            return (this._isActive);
        },
        set: function (value) {
            this._isActive = value;
        },
        enumerable: true,
        configurable: true
    });
    return DrapoViewport;
}());

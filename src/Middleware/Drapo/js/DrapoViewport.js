"use strict";
var DrapoViewport = (function () {
    function DrapoViewport() {
        this._el = null;
        this._elScroll = null;
        this._heightScroll = null;
        this._heightBefore = null;
        this._heightAfter = null;
        this._heightItem = null;
        this._heightBallonBefore = null;
        this._heightBallonAfter = null;
    }
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
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DrapoViewport.prototype, "Height", {
        set: function (value) {
            this._heightScroll = value;
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
    return DrapoViewport;
}());

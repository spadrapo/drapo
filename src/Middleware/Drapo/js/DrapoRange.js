"use strict";
var DrapoRange = (function () {
    function DrapoRange(start, end) {
        if (start === void 0) { start = null; }
        if (end === void 0) { end = null; }
        this._start = null;
        this._end = null;
        this._start = start;
        this._end = end;
    }
    Object.defineProperty(DrapoRange.prototype, "Start", {
        get: function () {
            return (this._start);
        },
        set: function (value) {
            this._start = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DrapoRange.prototype, "End", {
        get: function () {
            return (this._end);
        },
        set: function (value) {
            this._end = value;
        },
        enumerable: true,
        configurable: true
    });
    return DrapoRange;
}());

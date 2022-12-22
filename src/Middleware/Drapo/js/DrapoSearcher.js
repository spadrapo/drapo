"use strict";
var DrapoSearcher = (function () {
    function DrapoSearcher(application) {
        this._application = application;
    }
    Object.defineProperty(DrapoSearcher.prototype, "Application", {
        get: function () {
            return (this._application);
        },
        enumerable: false,
        configurable: true
    });
    return DrapoSearcher;
}());

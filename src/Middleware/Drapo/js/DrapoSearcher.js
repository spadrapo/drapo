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
    DrapoSearcher.prototype.FindType = function (type) {
        var first = $(type).first();
        if ((first == null) || (first.length === 0))
            return (null);
        return (first[0]);
    };
    DrapoSearcher.prototype.FindAllTypeWithAttribute = function (type, attributeName, parent) {
        if (parent === void 0) { parent = null; }
        var elj = parent == null ? $(type + '[' + attributeName + ']') : $(parent).find(type + '[' + attributeName + ']');
        var els = [];
        for (var i = 0; i < elj.length; i++)
            els.push(elj[i]);
        return (els);
    };
    DrapoSearcher.prototype.FindAllTypeWithAttributeValue = function (type, attributeName, attributeValue, parent) {
        if (parent === void 0) { parent = null; }
        var elj = parent == null ? $(type + "[" + attributeName + "='" + attributeValue + "']") : $(parent).find(type + "[" + attributeName + "='" + attributeValue + "']");
        var els = [];
        for (var i = 0; i < elj.length; i++)
            els.push(elj[i]);
        return (els);
    };
    DrapoSearcher.prototype.FindTypeWithAttribute = function (type, attributeName, parent) {
        if (parent === void 0) { parent = null; }
        var elj = parent == null ? $(type + '[' + attributeName + ']') : $(parent).find(type + '[' + attributeName + ']');
        if ((elj == null) || (elj.length === 0))
            return (null);
        return (elj[0]);
    };
    DrapoSearcher.prototype.FindTypeWithAttributeValue = function (type, attributeName, attributeValue) {
        var elj = $(type + "[" + attributeName + "='" + attributeValue + "']");
        if ((elj == null) || (elj.length === 0))
            return (null);
        return (elj[0]);
    };
    DrapoSearcher.prototype.FindAttributeValue = function (attributeName, attributeValue) {
        var elj = $("[" + attributeName + "='" + attributeValue + "']");
        if ((elj == null) || (elj.length === 0))
            return (null);
        return (elj[0]);
    };
    return DrapoSearcher;
}());

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
    DrapoSearcher.prototype.FindDataKey = function (dataKey, sector) {
        var els = this.FindAllByAttributeAndValue('d-datakey', dataKey);
        var el = this.Filter(sector, els);
        return (el);
    };
    DrapoSearcher.prototype.HasDataKeyElement = function (dataKey) {
        var el = this.FindByAttributeAndValue('d-datakey', dataKey);
        return (el != null);
    };
    DrapoSearcher.prototype.Filter = function (sector, els) {
        var sectors = this.Application.Document.GetSectorsAllowed(sector);
        for (var i = 0; i < els.length; i++) {
            var el = els[i];
            var elSector = this.Application.Document.GetSector(el);
            if (elSector !== sector) {
                var elAccess = el.getAttribute('d-dataAccess');
                if (elAccess == 'private')
                    continue;
                var elType = el.getAttribute('d-dataType');
                if ((elAccess == null) && (elType === 'parent'))
                    continue;
            }
            if ((this.Application.Document.IsSectorAllowed(elSector, sectors)) && (!this.Application.Document.IsElementDetached(el)))
                return (el);
        }
        return (null);
    };
    DrapoSearcher.prototype.CreateElementsList = function (nodes) {
        var els = [];
        for (var i = 0; i < nodes.length; i++)
            els.push(nodes[i]);
        return (els);
    };
    DrapoSearcher.prototype.FindByAttributeAndValue = function (name, value) {
        var el = document.querySelector("[" + name + "='" + value + "']");
        return (el);
    };
    DrapoSearcher.prototype.FindLastByAttributeAndValue = function (name, value) {
        var els = this.FindAllByAttributeAndValue(name, value);
        if ((els != null) && (els.length > 0))
            return (els[els.length - 1]);
        return (null);
    };
    DrapoSearcher.prototype.FindAllByAttributeAndValue = function (name, value) {
        var nodes = document.querySelectorAll("[" + name + "='" + value + "']");
        return (this.CreateElementsList(nodes));
    };
    DrapoSearcher.prototype.FindByAttributeAndValueFromParent = function (name, value, parent) {
        var el = parent.querySelector("[" + name + "='" + value + "']");
        return (el);
    };
    DrapoSearcher.prototype.FindAllByAttribute = function (name) {
        var nodes = document.querySelectorAll("[" + name + "]");
        return (this.CreateElementsList(nodes));
    };
    DrapoSearcher.prototype.FindAllByAttributeFromParent = function (name, parent) {
        var nodes = parent.querySelectorAll("[" + name + "]");
        return (this.CreateElementsList(nodes));
    };
    DrapoSearcher.prototype.FindByTagName = function (tagName) {
        var el = document.querySelector(tagName);
        return (el);
    };
    return DrapoSearcher;
}());

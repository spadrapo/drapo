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
        var jqueryDataKeys = $("[d-dataKey='" + dataKey + "']");
        var el = this.Filter(sector, jqueryDataKeys);
        return (el);
    };
    DrapoSearcher.prototype.HasDataKeyElement = function (dataKey) {
        var jqueryDataKeys = $("[d-dataKey='" + dataKey + "']");
        return ((jqueryDataKeys != null) && (jqueryDataKeys.length > 0));
    };
    DrapoSearcher.prototype.Filter = function (sector, jqueryDataKeys) {
        var sectors = this.Application.Document.GetSectorsAllowed(sector);
        for (var i = 0; i < jqueryDataKeys.length; i++) {
            var el = jqueryDataKeys[i];
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
    DrapoSearcher.prototype.FindByAttributeAndValue = function (name, value) {
        var elementsJQuery = $("[" + name + "='" + value + "']");
        if ((elementsJQuery === null) || (elementsJQuery.windowContainer === 0))
            return (null);
        return (elementsJQuery[0]);
    };
    DrapoSearcher.prototype.FindByAttributeAndValueFromParent = function (name, value, parent) {
        var elementsJQuery = $(parent).find("[" + name + "='" + value + "']");
        if ((elementsJQuery === null) || (elementsJQuery.windowContainer === 0))
            return (null);
        return (elementsJQuery[0]);
    };
    DrapoSearcher.prototype.FindByAttribute = function (name) {
        var elj = $('[' + name + ']');
        var els = [];
        for (var i = 0; i < elj.length; i++)
            els.push(elj[i]);
        return (els);
    };
    DrapoSearcher.prototype.FindByAttributeFromParent = function (name, el) {
        var elj = $(el).find('[' + name + ']');
        var els = [];
        for (var i = 0; i < elj.length; i++)
            els.push(elj[i]);
        return (els);
    };
    return DrapoSearcher;
}());

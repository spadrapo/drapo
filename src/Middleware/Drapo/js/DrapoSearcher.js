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
    return DrapoSearcher;
}());
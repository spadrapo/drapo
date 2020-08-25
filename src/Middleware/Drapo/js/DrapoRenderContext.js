"use strict";
var DrapoRenderContext = (function () {
    function DrapoRenderContext() {
        this._sectorExpressionContexts = {};
        this._dataKeyElements = {};
    }
    DrapoRenderContext.prototype.GetKey = function (sector, expression) {
        return (sector + '_' + expression);
    };
    DrapoRenderContext.prototype.HasExpressionContext = function (sector, expression) {
        var key = this.GetKey(sector, expression);
        var value = this._sectorExpressionContexts[key];
        if (value == null)
            return (null);
        return value;
    };
    DrapoRenderContext.prototype.AddExpressionContext = function (sector, expression, hasContext) {
        var key = this.GetKey(sector, expression);
        this._sectorExpressionContexts[key] = hasContext;
    };
    DrapoRenderContext.prototype.HasDataKeyElement = function (dataKey) {
        var value = this._dataKeyElements[dataKey];
        if (value == null)
            return (null);
        return value;
    };
    DrapoRenderContext.prototype.AddDataKeyElement = function (dataKey, hasElement) {
        this._dataKeyElements[dataKey] = hasElement;
    };
    return DrapoRenderContext;
}());

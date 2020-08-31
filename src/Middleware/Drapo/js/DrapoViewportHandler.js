"use strict";
var DrapoViewportHandler = (function () {
    function DrapoViewportHandler(application) {
        this._application = application;
    }
    Object.defineProperty(DrapoViewportHandler.prototype, "Application", {
        get: function () {
            return (this._application);
        },
        enumerable: false,
        configurable: true
    });
    DrapoViewportHandler.prototype.CreateViewportControlFlow = function (el, isContextRootFullExclusive, hasIf, hasRange) {
        if (!isContextRootFullExclusive)
            return (null);
        if (hasIf)
            return (null);
        if (hasRange)
            return (null);
        if (el.getAttribute('d-for-render') !== 'viewport')
            return (null);
        var elScroll = this.GetElementScrollViewport(el);
        if (elScroll == null)
            return (null);
        var height = this.GetElementStyleHeight(elScroll);
        if (height == null)
            return (null);
        var viewPort = new DrapoViewport();
        viewPort.Element = el;
        viewPort.ElementScroll = elScroll;
        viewPort.Height = height;
        viewPort.HeightBefore = 0;
        viewPort.HeightAfter = 0;
        viewPort.HeightBallonBefore = 0;
        viewPort.HeightBallonAfter = 0;
        return (viewPort);
    };
    DrapoViewportHandler.prototype.CreateViewportControlFlowBallonBefore = function (viewport, lastInserted) {
        if (viewport == null)
            return (lastInserted);
        var elBallonBefore = document.createElement('div');
        elBallonBefore.style.width = '100%';
        elBallonBefore.style.height = viewport.HeightBallonBefore + 'px';
        lastInserted.after(elBallonBefore);
        return ($(elBallonBefore));
    };
    DrapoViewportHandler.prototype.AppendViewportControlFlowBallonAfter = function (viewport, fragment) {
        if (viewport == null)
            return;
        var elBallonBefore = document.createElement('div');
        elBallonBefore.style.width = '100%';
        elBallonBefore.style.height = viewport.HeightBallonAfter + 'px';
        fragment.appendChild(elBallonBefore);
    };
    DrapoViewportHandler.prototype.GetViewportControlFlowLength = function (viewport, length) {
        return (length);
    };
    DrapoViewportHandler.prototype.UpdateHeightItem = function (viewport, elItem) {
        if (viewport === null)
            return (false);
        if (viewport.HeightItem !== null)
            return (false);
        if (elItem === null)
            return (false);
        var height = this.GetElementClientHeight(elItem);
        if (height === null)
            return (false);
        viewport.HeightItem = height;
        return (true);
    };
    DrapoViewportHandler.prototype.GetElementStyleHeight = function (el) {
        var elStyle = window.getComputedStyle(el);
        var heightString = elStyle.getPropertyValue('height');
        var height = this.Application.Parser.ParsePixels(heightString);
        return (height);
    };
    DrapoViewportHandler.prototype.GetElementClientHeight = function (el) {
        var rect = el.getBoundingClientRect();
        return (rect.height);
    };
    DrapoViewportHandler.prototype.GetElementScrollViewport = function (el) {
        var elCurrent = el;
        while (elCurrent != null) {
            if (this.HasOverflowY(elCurrent))
                return (elCurrent);
            elCurrent = elCurrent.parentElement;
        }
        return (null);
    };
    DrapoViewportHandler.prototype.HasOverflowY = function (el) {
        var style = window.getComputedStyle(el);
        var overflow = style.getPropertyValue('overflow');
        if (this.IsOverflowEnabled(overflow))
            return (true);
        var overflowY = style.getPropertyValue('overflow-y');
        if (this.IsOverflowEnabled(overflowY))
            return (true);
        return (false);
    };
    DrapoViewportHandler.prototype.IsOverflowEnabled = function (value) {
        if (value === 'auto')
            return (true);
        if (value === 'scroll')
            return (true);
        if (value === 'hidden')
            return (true);
        return (false);
    };
    return DrapoViewportHandler;
}());

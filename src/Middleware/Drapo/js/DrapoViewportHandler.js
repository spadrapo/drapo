"use strict";
var DrapoViewportHandler = (function () {
    function DrapoViewportHandler(application) {
        this._application = application;
    }
    Object.defineProperty(DrapoViewportHandler.prototype, "Application", {
        get: function () {
            return (this._application);
        },
        enumerable: true,
        configurable: true
    });
    DrapoViewportHandler.prototype.IsElementControlFlowRenderViewport = function (el) {
        return ((el.getAttribute('d-for-render') === 'viewport'));
    };
    DrapoViewportHandler.prototype.CreateViewportControlFlow = function (sector, el, elTemplate, dataKey, key, dataKeyIteratorRange, data, canCreateViewport) {
        if (!canCreateViewport)
            return (null);
        if (!this.IsElementControlFlowRenderViewport(el))
            return (null);
        var scroll = this.GetScrollViewport(el);
        if (scroll == null)
            return (null);
        var elScroll = scroll[0];
        var height = this.GetElementStyleHeight(elScroll);
        if (height == null)
            return (null);
        var viewport = new DrapoViewport();
        viewport.Sector = sector;
        viewport.Element = el;
        viewport.ElementTemplate = elTemplate;
        viewport.ElementScroll = elScroll;
        viewport.DataKey = dataKey;
        viewport.Key = key;
        viewport.DataKeyIteratorRange = dataKeyIteratorRange;
        viewport.Data = data;
        viewport.HeightScroll = height;
        viewport.HeightBefore = scroll[1];
        viewport.HeightAfter = scroll[2];
        viewport.HeightBallonBefore = 0;
        viewport.HeightBallonAfter = 0;
        viewport.DataStart = 0;
        viewport.DataEnd = data.length;
        viewport.DataLength = data.length;
        if ((elScroll.scrollTop) && elScroll.scrollTop > 0) {
            this.Application.Binder.UnbindControlFlowViewport(viewport);
            viewport.ScrollTop = viewport.ElementScroll.scrollTop;
            viewport.HeightItem = this.GetElementItemHeight(el);
            if (viewport.HeightItem != null) {
                var view = this.GetViewFactorCurrent(viewport);
                viewport.DataStart = view[0];
                viewport.DataEnd = view[1];
            }
        }
        return (viewport);
    };
    DrapoViewportHandler.prototype.CreateViewportControlFlowBallonBefore = function (viewport, lastInserted) {
        if (viewport === null)
            return (lastInserted);
        var elBallonBeforeInDOM = this.GetBallonBefore(lastInserted);
        if (elBallonBeforeInDOM == null) {
            var elBallonBefore = document.createElement('div');
            elBallonBefore.setAttribute('d-ballon', 'before');
            elBallonBefore.style.width = '100%';
            elBallonBefore.style.height = viewport.HeightBallonBefore + 'px';
            viewport.ElementBallonBefore = elBallonBefore;
            lastInserted.after(elBallonBefore);
            return ($(elBallonBefore));
        }
        else {
            elBallonBeforeInDOM.style.height = viewport.HeightBallonBefore + 'px';
            viewport.ElementBallonBefore = elBallonBeforeInDOM;
            var elParent = elBallonBeforeInDOM.parentElement;
            while (elParent.children.length > 2)
                elParent.lastElementChild.remove();
            return ($(elBallonBeforeInDOM));
        }
    };
    DrapoViewportHandler.prototype.GetBallonBefore = function (eljTemplate) {
        var elTemplate = eljTemplate[0];
        var elTemplateNext = elTemplate.nextElementSibling;
        if (elTemplateNext == null)
            return (null);
        var isBallonBefore = elTemplateNext.getAttribute('d-ballon') === 'before';
        if (!isBallonBefore)
            return (null);
        return (elTemplateNext);
    };
    DrapoViewportHandler.prototype.GetElementItemHeight = function (elTemplate) {
        var elParent = elTemplate.parentElement;
        if (elParent == null)
            return (null);
        if (elParent.children.length < 4)
            return (null);
        var elBallonBefore = elTemplate.nextElementSibling;
        var elItem = elBallonBefore.nextElementSibling;
        var height = this.GetElementClientHeight(elItem);
        return (height);
    };
    DrapoViewportHandler.prototype.AppendViewportControlFlowBallonAfter = function (viewport, fragment) {
        if (viewport === null)
            return;
        var elBallonAfter = document.createElement('div');
        elBallonAfter.style.width = '100%';
        elBallonAfter.style.height = viewport.HeightBallonAfter + 'px';
        viewport.ElementBallonAfter = elBallonAfter;
        fragment.appendChild(elBallonAfter);
    };
    DrapoViewportHandler.prototype.ActivateViewportControlFlow = function (viewport) {
        if (viewport == null)
            return;
        if (viewport.ScrollTop != null) {
            this.UpdateValuesBallon(viewport);
            this.UpdateElementsBallon(viewport);
            viewport.ElementScroll.scrollTop = viewport.ScrollTop;
        }
        this.Application.Binder.BindControlFlowViewport(viewport);
    };
    DrapoViewportHandler.prototype.GetViewportControlFlowStart = function (viewport, start) {
        if (viewport === null)
            return (start);
        return (viewport.DataStart);
    };
    DrapoViewportHandler.prototype.GetViewportControlFlowEnd = function (viewport, length) {
        if (viewport === null)
            return (length);
        return (viewport.DataEnd);
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
        this.UpdateValues(viewport);
        return (true);
    };
    DrapoViewportHandler.prototype.UpdateValues = function (viewport) {
        var heightData = viewport.HeightScroll;
        if (heightData < 0)
            return;
        var heightDataFactor = heightData * viewport.Factor;
        var dataItems = Math.floor(heightDataFactor / viewport.HeightItem);
        viewport.DataEnd = dataItems < viewport.DataEnd ? dataItems : viewport.DataEnd;
        this.UpdateValuesBallon(viewport);
    };
    DrapoViewportHandler.prototype.UpdateValuesBallon = function (viewport) {
        viewport.HeightBallonBefore = viewport.DataStart * viewport.HeightItem;
        viewport.HeightBallonAfter = (viewport.DataLength - viewport.DataEnd) * viewport.HeightItem;
    };
    DrapoViewportHandler.prototype.UpdateElementsBallon = function (viewport) {
        viewport.ElementBallonBefore.style.height = viewport.HeightBallonBefore + 'px';
        viewport.ElementBallonAfter.style.height = viewport.HeightBallonAfter + 'px';
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
    DrapoViewportHandler.prototype.GetScrollViewport = function (el) {
        var elCurrent = el;
        var isFirst = true;
        var heightBefore = 0;
        var heightAfter = 0;
        while (elCurrent != null) {
            if (this.HasOverflowY(elCurrent))
                return ([elCurrent, heightBefore, heightAfter]);
            var elParent = elCurrent.parentElement;
            if (elParent != null) {
                if (isFirst) {
                    isFirst = false;
                }
                else {
                    var isBefore = true;
                    for (var i = 0; i < elParent.children.length; i++) {
                        var elChild = elParent.children[i];
                        if (elChild === elCurrent) {
                            isBefore = false;
                        }
                        else {
                            var height = this.GetElementClientHeight(elChild);
                            if (isBefore)
                                heightBefore = heightBefore + height;
                            else
                                heightAfter = heightAfter + height;
                        }
                    }
                }
            }
            elCurrent = elParent;
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
    DrapoViewportHandler.prototype.GetView = function (viewport) {
        var rowsBeforeRemove = null;
        var rowsBeforeInsertStart = null;
        var rowsBeforeInsertEnd = null;
        var rowsAfterRemove = null;
        var rowsAfterInsertStart = null;
        var rowsAfterInsertEnd = null;
        var view = this.GetViewFactorCurrent(viewport);
        var viewStart = view[0];
        var viewEnd = view[1];
        if ((viewStart >= viewport.DataStart) && (viewEnd <= viewport.DataEnd))
            return (null);
        if ((viewport.DataStart === viewStart) && (viewport.DataEnd === viewEnd))
            return (null);
        if ((viewStart > viewport.DataEnd) || (viewEnd < viewport.DataStart)) {
            rowsBeforeRemove = -1;
            rowsAfterInsertStart = viewStart;
            rowsAfterInsertEnd = viewEnd;
        }
        else {
            if (viewport.DataStart < viewStart) {
                rowsBeforeRemove = viewStart - viewport.DataStart;
            }
            else if (viewStart < viewport.DataStart) {
                rowsBeforeInsertStart = viewStart;
                rowsBeforeInsertEnd = viewport.DataStart;
            }
            if (viewport.DataEnd > viewEnd) {
                rowsAfterRemove = viewport.DataEnd - viewEnd;
            }
            else if (viewEnd > viewport.DataEnd) {
                rowsAfterInsertStart = viewport.DataEnd;
                rowsAfterInsertEnd = viewEnd;
            }
        }
        viewport.DataStart = viewStart;
        viewport.DataEnd = viewEnd;
        this.UpdateValuesBallon(viewport);
        return ([rowsBeforeRemove, rowsBeforeInsertStart, rowsBeforeInsertEnd, rowsAfterRemove, rowsAfterInsertStart, rowsAfterInsertEnd]);
    };
    DrapoViewportHandler.prototype.GetViewFactorCurrent = function (viewport) {
        var viewHeight = viewport.HeightScroll;
        var viewItems = Math.floor(viewHeight / viewport.HeightItem);
        var scrollTop = viewport.ElementScroll.scrollTop;
        var scrollTopLessBefore = scrollTop - viewport.HeightBefore;
        var scrollTopLessBeforeValid = scrollTopLessBefore > 0 ? scrollTopLessBefore : 0;
        var views = Math.round(scrollTopLessBeforeValid / viewHeight);
        var viewsStart = views - viewport.Factor;
        if (viewsStart < 0)
            viewsStart = 0;
        var viewsEnd = views + viewport.Factor;
        var rowStart = viewsStart * viewItems;
        var rowEnd = viewsEnd * viewItems;
        if (rowEnd > viewport.DataLength)
            rowEnd = viewport.DataLength;
        return ([rowStart, rowEnd]);
    };
    return DrapoViewportHandler;
}());

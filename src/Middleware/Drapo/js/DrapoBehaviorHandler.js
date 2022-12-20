"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var DrapoBehaviorHandler = (function () {
    function DrapoBehaviorHandler(application) {
        this._application = application;
    }
    Object.defineProperty(DrapoBehaviorHandler.prototype, "Application", {
        get: function () {
            return (this._application);
        },
        enumerable: false,
        configurable: true
    });
    DrapoBehaviorHandler.prototype.HasContentBehaviorContext = function (content) {
        return ((content.indexOf('d-dragstart') > -1) || (content.indexOf('d-dragend') > -1) || (content.indexOf('d-resize-location') > -1));
    };
    DrapoBehaviorHandler.prototype.ResolveBehavior = function (el, canBind, canSubscribeDelay, dataKeyFilter, dataFieldFilter) {
        if (canBind === void 0) { canBind = true; }
        if (canSubscribeDelay === void 0) { canSubscribeDelay = true; }
        if (dataKeyFilter === void 0) { dataKeyFilter = null; }
        if (dataFieldFilter === void 0) { dataFieldFilter = null; }
        return __awaiter(this, void 0, void 0, function () {
            var elj;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        elj = $(el);
                        this.ResolveBehaviorDragStart(el);
                        return [4, this.ResolveBehaviorDragEnd(el)];
                    case 1:
                        _a.sent();
                        return [4, this.ResolveBehaviorResize(el, canBind, canSubscribeDelay, dataKeyFilter, dataFieldFilter)];
                    case 2:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    DrapoBehaviorHandler.prototype.ResolveBehaviorContext = function (context, element, canBind) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.ResolveBehaviorDragStartContext(context, element, canBind)];
                    case 1:
                        _a.sent();
                        return [4, this.ResolveBehaviorDragEndContext(context, element, canBind)];
                    case 2:
                        _a.sent();
                        return [4, this.ResolveBehaviorResizeContext(context, element, canBind)];
                    case 3:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    DrapoBehaviorHandler.prototype.ResolveBehaviorDragStart = function (el) {
        var dragStartAttribute = el.getAttribute('d-dragStart');
        if ((dragStartAttribute === null) || (dragStartAttribute === undefined))
            return;
        var dragActionAttribute = el.getAttribute('d-dragAction');
        if (dragActionAttribute !== 'barber')
            return;
        var sector = this.Application.Document.GetSector(el);
        var onBefore = el.getAttribute('d-dragOnBeforeStart');
        var onAfter = el.getAttribute('d-dragOnAfterEnd');
        var application = this.Application;
        var drag = this.CreateDrag(dragActionAttribute, null, null, this.Application.Parser.ParseTags(dragStartAttribute), false, null, sector, onBefore, onAfter);
        el.setAttribute('draggable', 'true');
        $(el).unbind('dragstart');
        $(el).bind('dragstart', function (e) {
            application.BehaviorHandler.SetDrag(drag);
            e.originalEvent.dataTransfer.effectAllowed = 'move';
            e.originalEvent.dataTransfer.setData('text', drag.Code);
        });
    };
    DrapoBehaviorHandler.prototype.ResolveBehaviorDragEnd = function (el) {
        return __awaiter(this, void 0, void 0, function () {
            var dragEndAttribute, dragActionAttribute, notifyText, notify, _a, onBefore, onAfter, application, tags, sector;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        dragEndAttribute = el.getAttribute('d-dragEnd');
                        if ((dragEndAttribute === null) || (dragEndAttribute === undefined))
                            return [2];
                        dragActionAttribute = el.getAttribute('d-dragAction');
                        if (dragActionAttribute !== 'barber')
                            return [2];
                        notifyText = el.getAttribute('d-dragNotify');
                        if (!((notifyText == null) || (notifyText == ''))) return [3, 1];
                        _a = true;
                        return [3, 3];
                    case 1: return [4, this.Application.Solver.ResolveConditional(notifyText)];
                    case 2:
                        _a = _b.sent();
                        _b.label = 3;
                    case 3:
                        notify = _a;
                        onBefore = el.getAttribute('d-dragOnBeforeStart');
                        onAfter = el.getAttribute('d-dragOnAfterEnd');
                        application = this.Application;
                        tags = this.Application.Parser.ParseTags(dragEndAttribute);
                        sector = this.Application.Document.GetSector(el);
                        $(el).unbind('dragover');
                        $(el).bind('dragover', function (e) {
                            e.preventDefault();
                            var drag = application.BehaviorHandler.GetDrag();
                            if (!application.BehaviorHandler.IsDragMatch(drag, e.originalEvent.dataTransfer.getData('Text'), tags))
                                return;
                            e.originalEvent.dataTransfer.dropEffect = 'move';
                        });
                        $(el).unbind('drop');
                        $(el).bind('drop', function (e) {
                            application.BehaviorHandler.ResolveBehaviorDragEndDrop(e, null, tags, notify, null, sector, onBefore, onAfter);
                        });
                        return [2];
                }
            });
        });
    };
    DrapoBehaviorHandler.prototype.ResolveBehaviorDragStartContext = function (context, el, canBind) {
        return __awaiter(this, void 0, void 0, function () {
            var dragStartAttribute, dragActionAttribute, custom, notifyText, notify, _a, dataKey, sector, onBefore, onAfter, application, drag;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        dragStartAttribute = el.getAttribute('d-dragStart');
                        if ((dragStartAttribute === null) || (dragStartAttribute === undefined))
                            return [2];
                        dragActionAttribute = el.getAttribute('d-dragAction');
                        if ((dragActionAttribute === null) || (dragActionAttribute === undefined))
                            dragActionAttribute = 'move';
                        if (dragActionAttribute === 'barber')
                            return [2];
                        custom = null;
                        if (dragActionAttribute === 'custom')
                            custom = el.getAttribute('d-dragActionCustom');
                        notifyText = el.getAttribute('d-dragNotify');
                        if (!((notifyText == null) || (notifyText == ''))) return [3, 1];
                        _a = true;
                        return [3, 3];
                    case 1: return [4, this.Application.Solver.ResolveConditional(notifyText)];
                    case 2:
                        _a = _b.sent();
                        _b.label = 3;
                    case 3:
                        notify = _a;
                        dataKey = el.getAttribute('d-dragStartDataKey');
                        sector = this.Application.Document.GetSector(el);
                        onBefore = el.getAttribute('d-dragOnBeforeStart');
                        onAfter = el.getAttribute('d-dragOnAfterEnd');
                        application = this.Application;
                        drag = this.CreateDrag(dragActionAttribute, custom, context.Item, this.Application.Parser.ParseTags(dragStartAttribute), notify, dataKey, sector, onBefore, onAfter);
                        el.setAttribute('draggable', 'true');
                        $(el).unbind('dragstart');
                        $(el).bind('dragstart', function (e) {
                            application.BehaviorHandler.SetDrag(drag);
                            e.originalEvent.dataTransfer.effectAllowed = 'move';
                            e.originalEvent.dataTransfer.setData('text', drag.Code);
                        });
                        return [2];
                }
            });
        });
    };
    DrapoBehaviorHandler.prototype.ResolveBehaviorDragEndContext = function (context, el, canBind) {
        return __awaiter(this, void 0, void 0, function () {
            var dragEndAttribute, dragActionAttribute, notifyText, notify, _a, dataKey, onBefore, onAfter, application, item, tags, sector;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        dragEndAttribute = el.getAttribute('d-dragEnd');
                        if ((dragEndAttribute === null) || (dragEndAttribute === undefined))
                            return [2];
                        dragActionAttribute = el.getAttribute('d-dragAction');
                        if (dragActionAttribute === 'barber')
                            return [2];
                        notifyText = el.getAttribute('d-dragNotify');
                        if (!((notifyText == null) || (notifyText == ''))) return [3, 1];
                        _a = true;
                        return [3, 3];
                    case 1: return [4, this.Application.Solver.ResolveConditional(notifyText)];
                    case 2:
                        _a = _b.sent();
                        _b.label = 3;
                    case 3:
                        notify = _a;
                        dataKey = el.getAttribute('d-dragEndDataKey');
                        onBefore = el.getAttribute('d-dragOnBeforeStart');
                        onAfter = el.getAttribute('d-dragOnAfterEnd');
                        application = this.Application;
                        item = context.Item;
                        tags = this.Application.Parser.ParseTags(dragEndAttribute);
                        sector = this.Application.Document.GetSector(el);
                        $(el).unbind('dragover');
                        $(el).bind('dragover', function (e) {
                            e.preventDefault();
                            var drag = application.BehaviorHandler.GetDrag();
                            if (!application.BehaviorHandler.IsDragMatch(drag, e.originalEvent.dataTransfer.getData('Text'), tags))
                                return;
                            e.originalEvent.dataTransfer.dropEffect = 'move';
                        });
                        $(el).unbind('drop');
                        $(el).bind('drop', function (e) {
                            application.BehaviorHandler.ResolveBehaviorDragEndDrop(e, item, tags, notify, dataKey, sector, onBefore, onAfter);
                        });
                        return [2];
                }
            });
        });
    };
    DrapoBehaviorHandler.prototype.ResolveBehaviorDragEndDrop = function (e, item, tags, notify, dataKey, sector, onBefore, onAfter) {
        return __awaiter(this, void 0, void 0, function () {
            var dragBefore, dragAfter;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        e.preventDefault();
                        dragBefore = this.GetDrag();
                        if (!this.IsDragMatch(dragBefore, e.originalEvent.dataTransfer.getData('Text'), tags))
                            return [2];
                        this.SetDrag(null);
                        dragAfter = this.CreateDrag(null, null, item, tags, notify, dataKey, sector, onBefore, onAfter);
                        if (!(dragBefore.DataKey !== null)) return [3, 2];
                        return [4, this.Application.Storage.UpdateData(dragBefore.DataKey, sector, dragBefore.Item.Data)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        if (!(dragAfter.DataKey !== null)) return [3, 4];
                        return [4, this.Application.Storage.UpdateData(dragAfter.DataKey, sector, dragAfter.Item.Data)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [4, this.ResolveBehaviorDragStartOnBefore(dragBefore, dragAfter)];
                    case 5:
                        _a.sent();
                        if (!this.IsMoveDrag(dragBefore, dragAfter)) return [3, 7];
                        return [4, this.MoveDrag(dragBefore, dragAfter)];
                    case 6:
                        _a.sent();
                        return [3, 10];
                    case 7:
                        if (!this.IsSwapDrag(dragBefore, dragAfter)) return [3, 8];
                        this.SwapDrag(dragBefore, dragAfter);
                        return [3, 10];
                    case 8:
                        if (!this.IsCustomDrag(dragBefore, dragAfter)) return [3, 10];
                        return [4, this.CustomDrag(dragBefore, dragAfter)];
                    case 9:
                        _a.sent();
                        _a.label = 10;
                    case 10: return [4, this.ResolveBehaviorDragEndOnAfter(dragBefore, dragAfter)];
                    case 11:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    DrapoBehaviorHandler.prototype.ResolveBehaviorDragStartOnBefore = function (dragBefore, dragAfter) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(dragBefore.OnBefore != null)) return [3, 2];
                        return [4, this.Application.FunctionHandler.ResolveFunctionWithoutContext(dragBefore.Sector, dragBefore.Item.Element, dragBefore.OnBefore)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        if (!((dragAfter.OnBefore != null) && (dragAfter.OnBefore != dragBefore.OnBefore))) return [3, 4];
                        return [4, this.Application.FunctionHandler.ResolveFunctionWithoutContext(dragAfter.Sector, dragAfter.Item.Element, dragAfter.OnBefore)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2];
                }
            });
        });
    };
    DrapoBehaviorHandler.prototype.ResolveBehaviorDragEndOnAfter = function (dragBefore, dragAfter) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(dragBefore.OnAfter != null)) return [3, 2];
                        return [4, this.Application.FunctionHandler.ResolveFunctionWithoutContext(dragBefore.Sector, dragBefore.Item.Element, dragBefore.OnAfter)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        if (!((dragAfter.OnAfter != null) && (dragAfter.OnAfter != dragBefore.OnAfter))) return [3, 4];
                        return [4, this.Application.FunctionHandler.ResolveFunctionWithoutContext(dragAfter.Sector, dragAfter.Item.Element, dragAfter.OnAfter)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2];
                }
            });
        });
    };
    DrapoBehaviorHandler.prototype.GetDrag = function () {
        return (this._drag);
    };
    DrapoBehaviorHandler.prototype.SetDrag = function (drag) {
        this._drag = drag;
    };
    DrapoBehaviorHandler.prototype.IsDragMatch = function (drag, code, tags) {
        if (drag === null)
            return (false);
        if (drag.Code !== code)
            return (false);
        if (!drag.IsMatch(tags))
            return (false);
        return (true);
    };
    DrapoBehaviorHandler.prototype.CreateDrag = function (action, custom, item, tags, notify, dataKey, sector, onBefore, onAfter) {
        var drag = new DrapoDrag();
        drag.Code = this.Application.Document.CreateGuid();
        drag.Action = action;
        drag.Custom = custom;
        drag.Item = item;
        drag.Tags = tags;
        drag.Notify = notify;
        drag.DataKey = dataKey;
        drag.Sector = sector;
        drag.OnBefore = onBefore;
        drag.OnAfter = onAfter;
        return (drag);
    };
    DrapoBehaviorHandler.prototype.IsMoveDrag = function (dragBefore, dragAfter) {
        return (dragBefore.Action === 'move');
    };
    DrapoBehaviorHandler.prototype.MoveDrag = function (dragBefore, dragAfter) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.IsInternalDrag(dragBefore, dragAfter))
                    return [2, (this.Application.Storage.MoveDataItem(dragAfter.Item.DataKey, dragAfter.Sector, dragBefore.Item.Data, dragAfter.Item.Data, dragAfter.Notify))];
                return [2, (false)];
            });
        });
    };
    DrapoBehaviorHandler.prototype.IsInternalDrag = function (dragBefore, dragAfter) {
        return (dragBefore.Item.DataKey === dragAfter.Item.DataKey);
    };
    DrapoBehaviorHandler.prototype.IsSwapDrag = function (dragBefore, dragAfter) {
        return (dragBefore.Action === 'swap');
    };
    DrapoBehaviorHandler.prototype.SwapDrag = function (dragBefore, dragAfter) {
        return (false);
    };
    DrapoBehaviorHandler.prototype.IsCustomDrag = function (dragBefore, dragAfter) {
        return (dragBefore.Action === 'custom');
    };
    DrapoBehaviorHandler.prototype.CustomDrag = function (dragBefore, dragAfter) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.Application.FunctionHandler.ResolveFunctionWithoutContext(dragBefore.Sector, dragBefore.Item.Element, dragBefore.Custom)];
                    case 1:
                        _a.sent();
                        return [2, (true)];
                }
            });
        });
    };
    DrapoBehaviorHandler.prototype.ResolveBehaviorResizeContext = function (context, el, canBind) {
        return __awaiter(this, void 0, void 0, function () {
            var resizeLocation;
            return __generator(this, function (_a) {
                resizeLocation = el.getAttribute('d-resize-location');
                if (resizeLocation == null)
                    return [2];
                return [2, (this.ResolveBehaviorResizeInternal(context, el, canBind, resizeLocation))];
            });
        });
    };
    DrapoBehaviorHandler.prototype.ResolveBehaviorResize = function (el, canBind, canSubscribeDelay, dataKeyFilter, dataFieldFilter) {
        if (canBind === void 0) { canBind = true; }
        if (canSubscribeDelay === void 0) { canSubscribeDelay = true; }
        if (dataKeyFilter === void 0) { dataKeyFilter = null; }
        if (dataFieldFilter === void 0) { dataFieldFilter = null; }
        return __awaiter(this, void 0, void 0, function () {
            var resizeLocation, context;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        resizeLocation = el.getAttribute('d-resize-location');
                        if (resizeLocation == null)
                            return [2];
                        context = new DrapoContext();
                        return [4, this.ResolveBehaviorResizeInternal(context, el, canBind, resizeLocation)];
                    case 1: return [2, (_a.sent())];
                }
            });
        });
    };
    DrapoBehaviorHandler.prototype.ResolveBehaviorResizeInternal = function (context, el, canBind, resizeLocation) {
        return __awaiter(this, void 0, void 0, function () {
            var resizeModel, resizeClass, resizeType, resizeContainer, resizePreview, resizer, application, eventMouseMove, eventMouseUp;
            return __generator(this, function (_a) {
                resizeModel = el.getAttribute('d-resize-model');
                resizeClass = el.getAttribute('d-resize-class');
                resizeType = el.getAttribute('d-resize-type');
                if (resizeType == null)
                    resizeType = 'normal';
                resizeContainer = this.Application.Parser.ParseNumber(el.getAttribute('d-resize-container'), 2);
                resizePreview = this.Application.Parser.ParseBoolean(el.getAttribute('d-resize-preview'), false);
                resizer = this.CreateResize(context.Item, el, resizeModel, resizeLocation, resizeType, resizeClass, resizePreview, resizeContainer);
                application = this.Application;
                eventMouseMove = this.Application.EventHandler.CreateEventNamespace(null, null, 'mousemove', resizer.Code);
                eventMouseUp = this.Application.EventHandler.CreateEventNamespace(null, null, 'mouseup', resizer.Code);
                $(el).unbind('mousedown');
                $(el).bind('mousedown', function (e) {
                    var container = resizer.ContainerJQuery;
                    if (resizer.Preview) {
                        container.bind(eventMouseMove, function (emv) {
                            application.BehaviorHandler.ResolveBehaviorResizeContinue(resizer, emv);
                        });
                    }
                    container.bind(eventMouseUp, function (emu) {
                        application.BehaviorHandler.ResolveBehaviorResizeFinish(resizer, emu);
                        if (resizer.Preview)
                            container.unbind(eventMouseMove);
                        container.unbind(eventMouseUp);
                    });
                    application.BehaviorHandler.ResolveBehaviorResizeStart(resizer, e);
                });
                return [2];
            });
        });
    };
    DrapoBehaviorHandler.prototype.CreateResize = function (item, element, model, location, type, resizeClass, preview, container) {
        var resizer = new DrapoResize();
        resizer.Code = this.Application.Document.CreateGuid();
        resizer.Item = item;
        resizer.Element = element;
        resizer.Model = model;
        resizer.Location = location;
        resizer.Type = type;
        resizer.Class = resizeClass;
        resizer.Preview = preview;
        resizer.ParentJQuery = $(resizer.Element.parentElement);
        resizer.ContainerJQuery = this.Application.EventHandler.GetElementParent(resizer.Element, container);
        return (resizer);
    };
    DrapoBehaviorHandler.prototype.ResolveBehaviorResizeStart = function (resizer, e) {
        return __awaiter(this, void 0, void 0, function () {
            var sizeUnit;
            return __generator(this, function (_a) {
                sizeUnit = this.GetSize(resizer);
                resizer.UnitStart = this.GetSizeUnit(sizeUnit);
                resizer.SizeStart = this.GetSizeValue(resizer.UnitStart, sizeUnit);
                resizer.EventStartValue = this.GetResizerEventValue(resizer, e);
                resizer.EventCurrentValue = null;
                if (resizer.Class !== null)
                    resizer.ContainerJQuery.addClass(resizer.Class);
                return [2];
            });
        });
    };
    DrapoBehaviorHandler.prototype.ResolveBehaviorResizeContinue = function (resizer, e) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (resizer.EventStartValue == null)
                    return [2];
                resizer.EventCurrentValue = this.GetResizerEventValue(resizer, e);
                this.ApplySizeNew(resizer);
                return [2];
            });
        });
    };
    DrapoBehaviorHandler.prototype.ResolveBehaviorResizeFinish = function (resizer, e) {
        return __awaiter(this, void 0, void 0, function () {
            var sizeNew, dataPath;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (resizer.EventStartValue == null)
                            return [2];
                        resizer.EventCurrentValue = this.GetResizerEventValue(resizer, e);
                        sizeNew = this.ApplySizeNew(resizer);
                        resizer.EventStartValue = null;
                        if (resizer.Class !== null)
                            resizer.ContainerJQuery.removeClass(resizer.Class);
                        if (resizer.Model === null)
                            return [2];
                        dataPath = this.Application.Parser.ParseMustache(resizer.Model);
                        return [4, this.Application.Solver.UpdateItemDataPathObject(this.Application.Document.GetSector(resizer.Element), resizer.Item, dataPath, sizeNew, true)];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    DrapoBehaviorHandler.prototype.GetSize = function (resizer) {
        if (resizer.Location == 'bootstrap') {
            var classAttribute = resizer.ParentJQuery.attr('class');
            var classesAttribute = this.Application.Parser.Tokenize(classAttribute);
            for (var i = 0; i < classesAttribute.length; i++) {
                var classCurrent = classesAttribute[i];
                if (this.IsClassBootstrap(classCurrent))
                    return (classCurrent);
            }
            return (null);
        }
        else {
            return (resizer.ParentJQuery.css('width'));
        }
    };
    DrapoBehaviorHandler.prototype.GetSizeUnit = function (size) {
        if (this.EndsWith(size, '%'))
            return ('%');
        if (this.EndsWith(size, 'px'))
            return ('px');
        if (this.IsClassBootstrap(size)) {
            var parts = this.Application.Parser.Tokenize(size, '-');
            if (parts.length < 3)
                return ('');
            return (parts[parts.length - 2]);
        }
        throw new Error('Size unit not supported: ' + size);
    };
    DrapoBehaviorHandler.prototype.IsClassBootstrap = function (data) {
        return (data.indexOf('col-') === 0);
    };
    DrapoBehaviorHandler.prototype.CreateClassBootstrap = function (type, size) {
        var className = 'col-';
        if (type != '')
            className = className + type + '-';
        className = className + size;
        return (className);
    };
    DrapoBehaviorHandler.prototype.EndsWith = function (data, endsWith) {
        var size = endsWith.length;
        var diff = data.length - size;
        for (var i = 0; i < size; i++)
            if (endsWith[i] !== data[i + diff])
                return (false);
        return (true);
    };
    DrapoBehaviorHandler.prototype.GetSizeValue = function (unit, sizeUnit) {
        if (this.IsClassBootstrap(sizeUnit)) {
            var parts = this.Application.Parser.Tokenize(sizeUnit, '-');
            return (Number(parts[parts.length - 1]));
        }
        var valueString = sizeUnit.substr(0, sizeUnit.length - (unit.length));
        return (Number(valueString));
    };
    DrapoBehaviorHandler.prototype.GetSizeStartWithOffset = function (resizer) {
        var offset = this.GetResizerOffset(resizer);
        return (resizer.SizeStart + offset);
    };
    DrapoBehaviorHandler.prototype.GetResizerOffset = function (resizer) {
        var start = resizer.EventStartValue;
        var end = resizer.EventCurrentValue;
        if (resizer.Type === 'reverse')
            return (start - end);
        return (end - start);
    };
    DrapoBehaviorHandler.prototype.GetResizerEventValue = function (resizer, event) {
        if (resizer.Location === 'height')
            return (event.originalEvent.pageY);
        return (event.originalEvent.pageX);
    };
    DrapoBehaviorHandler.prototype.ApplySizeNew = function (resizer) {
        if (resizer.Location === 'bootstrap') {
            var sizeBase = resizer.ParentJQuery.css('width');
            var sizeBaseUnit = this.GetSizeUnit(sizeBase);
            var sizeBaseValue = this.GetSizeValue(sizeBaseUnit, sizeBase);
            var sizeBaseValueOne = sizeBaseValue / resizer.SizeStart;
            var sizeOffset = this.GetResizerOffset(resizer);
            var valueOffset = Math.round(sizeOffset / sizeBaseValueOne);
            if (valueOffset === 0)
                return (0);
            var valueNew = resizer.SizeStart + valueOffset;
            var classRemove = this.CreateClassBootstrap(resizer.UnitStart, resizer.SizeStart);
            var classInsert = this.CreateClassBootstrap(resizer.UnitStart, valueNew);
            resizer.ParentJQuery.removeClass(classRemove);
            resizer.ParentJQuery.addClass(classInsert);
            return (valueNew);
        }
        else {
            var sizeNew = this.GetSizeStartWithOffset(resizer);
            if (sizeNew === null)
                return (null);
            resizer.ParentJQuery.css(resizer.Location, sizeNew + resizer.Unit);
            return (sizeNew);
        }
    };
    return DrapoBehaviorHandler;
}());

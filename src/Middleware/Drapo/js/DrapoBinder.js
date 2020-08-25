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
        while (_) try {
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
var DrapoBinder = (function () {
    function DrapoBinder(application) {
        this._application = application;
    }
    Object.defineProperty(DrapoBinder.prototype, "Application", {
        get: function () {
            return (this._application);
        },
        enumerable: true,
        configurable: true
    });
    DrapoBinder.prototype.BindReaderWriter = function (contextItem, el, dataFields, eventTypes, eventTypesCancel) {
        if (eventTypesCancel === void 0) { eventTypesCancel = null; }
        if (contextItem === null)
            return;
        if (el === null)
            return;
        this.BindReader(contextItem, el, dataFields);
        this.BindWriter(contextItem, el, dataFields, eventTypes, eventTypesCancel);
    };
    DrapoBinder.prototype.BindReader = function (contextItem, el, dataFields) {
        if ((contextItem === null) || (contextItem.ElementForTemplate !== null))
            return;
        if (el === null)
            return;
        this.Application.Observer.SubscribeBarber(el, contextItem.DataKey, dataFields);
    };
    DrapoBinder.prototype.BindWriter = function (contextItem, el, dataFields, eventTypes, eventTypesCancel) {
        var _this = this;
        var application = this.Application;
        var contextItemLocal = contextItem;
        var data = contextItem.Data;
        var dataKey = contextItem.DataKey;
        var index = contextItem.Index;
        var _loop_1 = function (i) {
            var event_1 = application.Parser.ParseEvent(eventTypes[i]);
            var eventType = event_1[0];
            var eventFilter = event_1[1];
            var eventNamespace = this_1.Application.EventHandler.CreateEventNamespace(null, null, eventType, 'model');
            $(el).unbind(eventNamespace);
            $(el).bind(eventNamespace, function (e) {
                application.Binder.BindWriterEvent(e, eventType, eventFilter, contextItem, el, dataFields, data, dataKey, index);
            });
        };
        var this_1 = this;
        for (var i = 0; i < eventTypes.length; i++) {
            _loop_1(i);
        }
        if ((eventTypesCancel) != null) {
            var _loop_2 = function (i) {
                var event_2 = application.Parser.ParseEvent(eventTypesCancel[i]);
                var eventType = event_2[0];
                var eventFilter = event_2[1];
                var eventNamespace = this_2.Application.EventHandler.CreateEventNamespace(null, null, eventType, 'modelCancel');
                $(el).unbind(eventNamespace);
                $(el).bind(eventNamespace, function (e) {
                    if (!_this.Application.EventHandler.IsValidEventFilter(e, eventFilter))
                        return (true);
                    var dataPath = _this.Application.Solver.CreateDataPath(dataKey, dataFields);
                    var valueCurrent = _this.Application.Solver.ResolveDataObjectPathObject(data, dataPath);
                    var elj = $(el);
                    var valueBefore = elj.val();
                    if (valueCurrent == valueBefore)
                        return (true);
                    elj.val(valueCurrent);
                    return (false);
                });
            };
            var this_2 = this;
            for (var i = 0; i < eventTypesCancel.length; i++) {
                _loop_2(i);
            }
        }
    };
    DrapoBinder.prototype.BindWriterEvent = function (e, eventType, eventFilter, contextItem, el, dataFields, data, dataKey, index) {
        return __awaiter(this, void 0, void 0, function () {
            var value, dataPath, valueCurrent, sector;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.Application.EventHandler.IsValidEventFilter(e, eventFilter))
                            return [2, (true)];
                        value = this.Application.Binder.GetEventValue(eventType, e);
                        dataPath = this.Application.Solver.CreateDataPath(dataKey, dataFields);
                        valueCurrent = this.Application.Solver.ResolveDataObjectPathObject(data, dataPath);
                        if (!(valueCurrent != value)) return [3, 7];
                        sector = this.Application.Document.GetSector(el);
                        if (!((dataPath.length === 1) && (contextItem !== null) && (dataPath[0] === dataKey))) return [3, 2];
                        return [4, this.Application.Storage.SetDataKeyField(dataKey, sector, dataFields, value, false)];
                    case 1:
                        _a.sent();
                        return [3, 3];
                    case 2:
                        this.Application.Solver.UpdateDataPathObject(data, dataPath, value);
                        _a.label = 3;
                    case 3: return [4, this.Application.Storage.FlagDataItemAsUpdated(dataKey, sector, index, false)];
                    case 4:
                        _a.sent();
                        return [4, this.Application.ModelHandler.ResolveOnModelChange(contextItem, el)];
                    case 5:
                        _a.sent();
                        return [4, this.Application.Observer.Notify(dataKey, index, dataFields)];
                    case 6:
                        _a.sent();
                        _a.label = 7;
                    case 7: return [4, this.Application.ModelHandler.ResolveOnModelComplete(contextItem, el)];
                    case 8:
                        _a.sent();
                        return [2, (true)];
                }
            });
        });
    };
    DrapoBinder.prototype.BindIncremental = function (elj, dataKey, sector, isIncremental) {
        return __awaiter(this, void 0, void 0, function () {
            var el, application, elParent, isRoot, eljParent, binder, dataKeyLocal, sectorLocal, eventNamespace;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if ((elj == null) || (elj.length == 0))
                            return [2, (null)];
                        el = elj[0];
                        application = this.Application;
                        if (!isIncremental)
                            application.Observer.SubscribeIncremental(el, dataKey);
                        elParent = this.GetParentElementWithScrollVertical(el);
                        if (!((elParent === null) || (!this.IsElementScrollVisible(elParent)))) return [3, 4];
                        return [4, this.Application.Storage.CanGrowData(dataKey, sector)];
                    case 1:
                        if (!(_a.sent()))
                            return [2];
                        return [4, this.Application.Storage.GrowData(dataKey, sector)];
                    case 2:
                        if (!(_a.sent()))
                            return [2];
                        return [4, this.Application.Observer.NotifyIncremental(dataKey)];
                    case 3:
                        _a.sent();
                        return [2];
                    case 4:
                        isRoot = (elParent.tagName === 'HTML') || (elParent.tagName === 'BODY');
                        eljParent = $(elParent);
                        binder = isRoot ? $(window) : eljParent;
                        dataKeyLocal = dataKey;
                        sectorLocal = sector;
                        eventNamespace = this.Application.EventHandler.CreateEventNamespace(el, null, 'scroll', 'incremental');
                        binder.unbind(eventNamespace);
                        binder.bind(eventNamespace, function (e) {
                            application.Binder.BindIncrementalScroll(binder, eventNamespace, eljParent, dataKeyLocal, sector);
                        });
                        return [2];
                }
            });
        });
    };
    DrapoBinder.prototype.BindIncrementalScroll = function (binder, eventNamespace, eljParent, dataKey, sector) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if ((!this.Application.Observer.IsEnabledNotifyIncremental) || (!this.IsElementScrollVerticalAlmostEnd(eljParent)))
                            return [2, (true)];
                        return [4, this.Application.Storage.CanGrowData(dataKey, sector)];
                    case 1:
                        if (!(_a.sent())) {
                            binder.unbind(eventNamespace);
                            return [2, (false)];
                        }
                        return [4, this.Application.Storage.GrowData(dataKey, sector)];
                    case 2:
                        if (!(_a.sent()))
                            return [2, (true)];
                        return [4, this.Application.Observer.NotifyIncremental(dataKey)];
                    case 3:
                        _a.sent();
                        return [2, (true)];
                }
            });
        });
    };
    DrapoBinder.prototype.GetEventValue = function (eventType, e) {
        var tag = e.target.tagName.toLowerCase();
        if (tag == 'input')
            return (this.GetEventValueInput(eventType, e));
        if (tag == 'select')
            return (e.target.value);
        if (tag == 'textarea')
            return ($(e.target).val());
        return (null);
    };
    DrapoBinder.prototype.GetEventValueInput = function (eventType, e) {
        var el = e.target;
        var elementJQuery = $(el);
        var type = el.getAttribute('type');
        if (type == 'checkbox')
            return (elementJQuery.prop('checked'));
        return (elementJQuery.val());
    };
    DrapoBinder.prototype.GetParentElementWithScrollVertical = function (el) {
        var elParent = null;
        while ((elParent = el.parentElement) != null) {
            if (this.HasElementVerticalScroll(elParent))
                return (elParent);
            el = elParent;
        }
        return (null);
    };
    DrapoBinder.prototype.IsElementScrollVisible = function (el) {
        return (el.scrollHeight !== el.clientHeight);
    };
    DrapoBinder.prototype.HasElementVerticalScroll = function (el) {
        var style = window.getComputedStyle(el);
        var overflow = style.getPropertyValue('overflow');
        if (overflow === 'auto')
            return (true);
        var elj = $(el);
        if (elj.scrollTop())
            return (true);
        elj.scrollTop(1);
        if (!elj.scrollTop())
            return (false);
        elj.scrollTop(0);
        return (true);
    };
    DrapoBinder.prototype.IsElementScrollVerticalAlmostEnd = function (el) {
        var scrollTop = el.scrollTop();
        if (scrollTop == null)
            return (false);
        var clientHeight = el[0].clientHeight;
        var scrollHeight = el[0].scrollHeight;
        var remaining = scrollHeight - (scrollTop + clientHeight);
        return (remaining < 50);
    };
    return DrapoBinder;
}());

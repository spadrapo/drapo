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
var DrapoEventHandler = (function () {
    function DrapoEventHandler(application) {
        this._debounceDefault = 500;
        this._debounceDefaultClick = 200;
        this._debounce = 'debounce';
        this._detach = 'detach';
        this._eventsRunning = [];
        this._application = application;
    }
    Object.defineProperty(DrapoEventHandler.prototype, "Application", {
        get: function () {
            return (this._application);
        },
        enumerable: false,
        configurable: true
    });
    DrapoEventHandler.prototype.HasContentEventContext = function (content) {
        return (content.indexOf('d-on-') > -1);
    };
    DrapoEventHandler.prototype.CreateEventNamespace = function (el, location, eventType, namespace) {
        if (namespace === void 0) { namespace = 'default'; }
        if (eventType === 'load')
            return (eventType);
        if (location === null)
            return (eventType + '.' + namespace);
        var did = this.Application.Document.EnsureElementHasID(el);
        return (eventType + '.' + did);
    };
    DrapoEventHandler.prototype.GetEventPropagation = function (el, eventType) {
        var propagationValue = el.getAttribute('d-propagation-' + eventType);
        if (propagationValue == null)
            return (true);
        return (this.Application.Solver.ResolveConditionalBoolean(propagationValue));
    };
    DrapoEventHandler.prototype.RetrieveEventBinder = function (element, location) {
        if (location == null)
            return (element);
        if (this.IsLocationBody(location))
            return (document.documentElement);
        return (null);
    };
    DrapoEventHandler.prototype.IsLocationBody = function (location) {
        return (location === 'body');
    };
    DrapoEventHandler.prototype.GetElementParent = function (element, levels) {
        if (levels === void 0) { levels = 0; }
        var current = element;
        for (var i = 0; (i < levels) && (current != null); i++)
            current = current.parentElement;
        if (current == null)
            return (null);
        if (current.tagName.toLowerCase() === 'body')
            return (document.body);
        return (current);
    };
    DrapoEventHandler.prototype.Attach = function (el, renderContext) {
        return __awaiter(this, void 0, void 0, function () {
            var events, application, sector, isSectorDynamic, _loop_1, this_1, i;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        events = this.RetrieveElementEvents(el);
                        if (events.length == 0)
                            return [2];
                        application = this.Application;
                        return [4, this.Application.Document.GetSectorResolved(el)];
                    case 1:
                        sector = _a.sent();
                        return [4, this.Application.Document.IsSectorDynamic(el)];
                    case 2:
                        isSectorDynamic = _a.sent();
                        _loop_1 = function (i) {
                            var event_1, eventType, functionsValue, _b, eventFilter, location_1, isLocationBody, eventNamespace, binder, propagation, isDelay, debounceTimeout, elDebounceTimeout, delayTimeout, eventsDetach, eventsDetachActivated, eventAttribute;
                            return __generator(this, function (_c) {
                                switch (_c.label) {
                                    case 0:
                                        event_1 = events[i];
                                        eventType = event_1[2];
                                        if (!this_1.IsEventTypeValid(eventType))
                                            return [2, "continue"];
                                        functionsValue = event_1[3];
                                        _b = (!isSectorDynamic);
                                        if (!_b) return [3, 2];
                                        return [4, this_1.HasEventContext(sector, renderContext, functionsValue, event_1[5])];
                                    case 1:
                                        _b = (_c.sent());
                                        _c.label = 2;
                                    case 2:
                                        if (_b)
                                            return [2, "continue"];
                                        eventFilter = event_1[4];
                                        location_1 = event_1[1];
                                        isLocationBody = this_1.IsLocationBody(location_1);
                                        eventNamespace = this_1.CreateEventNamespace(el, location_1, eventType, 'noContext');
                                        binder = this_1.RetrieveEventBinder(el, location_1);
                                        if (binder === null)
                                            return [2, "continue"];
                                        propagation = this_1.GetEventPropagation(el, eventType);
                                        isDelay = this_1.IsEventDelay(el, eventType);
                                        debounceTimeout = this_1._debounceDefaultClick;
                                        elDebounceTimeout = isDelay ? null : this_1.GetEventDebounce(el, eventType);
                                        if (elDebounceTimeout !== null) {
                                            isDelay = true;
                                            debounceTimeout = elDebounceTimeout;
                                        }
                                        delayTimeout = null;
                                        eventsDetach = this_1.GetEventDetach(el, eventType);
                                        eventsDetachActivated = false;
                                        eventAttribute = event_1[0];
                                        this_1.DetachEventListener(binder, eventNamespace);
                                        this_1.AttachEventListener(binder, eventType, eventNamespace, function (e) { return __awaiter(_this, void 0, void 0, function () {
                                            var sectorEvent, _a, j, eventDetach, eventDetachNamespace, functionsValueCurrent;
                                            return __generator(this, function (_b) {
                                                switch (_b.label) {
                                                    case 0:
                                                        if ((isLocationBody) && (!application.Document.Contains(el))) {
                                                            application.EventHandler.DetachEventListener(binder, eventNamespace);
                                                            return [2, (true)];
                                                        }
                                                        if (!application.EventHandler.IsValidEventFilter(e, eventFilter))
                                                            return [2, (true)];
                                                        if (!isSectorDynamic) return [3, 2];
                                                        return [4, this.Application.Document.GetSectorResolved(el)];
                                                    case 1:
                                                        _a = _b.sent();
                                                        return [3, 3];
                                                    case 2:
                                                        _a = sector;
                                                        _b.label = 3;
                                                    case 3:
                                                        sectorEvent = _a;
                                                        return [4, this.Application.Validator.IsValidationEventValid(el, sectorEvent, eventType, location_1, e, null)];
                                                    case 4:
                                                        if (!(_b.sent()))
                                                            return [2, (true)];
                                                        if (eventsDetachActivated)
                                                            return [2, (true)];
                                                        if (eventsDetach != null) {
                                                            for (j = 0; j < eventsDetach.length; j++) {
                                                                eventDetach = eventsDetach[j];
                                                                eventDetachNamespace = this.CreateEventNamespace(el, null, eventDetach, 'noContext');
                                                                application.EventHandler.DetachEventListener(binder, eventNamespace);
                                                                if (eventDetach === eventType)
                                                                    eventsDetachActivated = true;
                                                            }
                                                        }
                                                        functionsValueCurrent = el.getAttribute(eventAttribute);
                                                        if (!isDelay) {
                                                            application.EventHandler.ExecuteEvent(sector, null, el, e, functionsValueCurrent, isSectorDynamic);
                                                        }
                                                        else {
                                                            if (delayTimeout != null)
                                                                clearTimeout(delayTimeout);
                                                            delayTimeout = setTimeout(function () {
                                                                clearTimeout(delayTimeout);
                                                                delayTimeout = null;
                                                                application.EventHandler.ExecuteEvent(sector, null, el, e, functionsValueCurrent, isSectorDynamic);
                                                            }, debounceTimeout);
                                                        }
                                                        return [2, (propagation)];
                                                }
                                            });
                                        }); });
                                        return [2];
                                }
                            });
                        };
                        this_1 = this;
                        i = 0;
                        _a.label = 3;
                    case 3:
                        if (!(i < events.length)) return [3, 6];
                        return [5, _loop_1(i)];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5:
                        i++;
                        return [3, 3];
                    case 6: return [2];
                }
            });
        });
    };
    DrapoEventHandler.prototype.AttachContext = function (context, el, sector, renderContext) {
        return __awaiter(this, void 0, void 0, function () {
            var events, application, contextItem, _loop_2, this_2, i;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        events = this.RetrieveElementEvents(el);
                        if (events.length == 0)
                            return [2];
                        application = this.Application;
                        contextItem = context.Item;
                        _loop_2 = function (i) {
                            var event_2, eventType, functionsValueOriginal, eventFilter, location_2, isLocationBody, functionsValue, eventNamespace, binder, propagation, isDelay, debounceTimeout, elDebounceTimeout, delayTimeout, eventsDetach, eventsDetachActivated;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        event_2 = events[i];
                                        eventType = event_2[2];
                                        if (!this_2.IsEventTypeValid(eventType))
                                            return [2, "continue"];
                                        functionsValueOriginal = event_2[3];
                                        return [4, this_2.HasEventContext(sector, renderContext, functionsValueOriginal, event_2[5])];
                                    case 1:
                                        if (!(_b.sent()))
                                            return [2, "continue"];
                                        eventFilter = event_2[4];
                                        location_2 = event_2[1];
                                        isLocationBody = this_2.IsLocationBody(location_2);
                                        functionsValue = this_2.Application.Solver.ResolveSystemContextPath(sector, context, functionsValueOriginal);
                                        eventNamespace = this_2.CreateEventNamespace(el, location_2, eventType, 'context');
                                        binder = this_2.RetrieveEventBinder(el, location_2);
                                        if (binder === null)
                                            return [2, "continue"];
                                        propagation = this_2.GetEventPropagation(el, eventType);
                                        isDelay = this_2.IsEventDelay(el, eventType);
                                        debounceTimeout = this_2._debounceDefaultClick;
                                        elDebounceTimeout = isDelay ? null : this_2.GetEventDebounce(el, eventType);
                                        if (elDebounceTimeout !== null) {
                                            isDelay = true;
                                            debounceTimeout = elDebounceTimeout;
                                        }
                                        delayTimeout = null;
                                        eventsDetach = this_2.GetEventDetach(el, eventType);
                                        eventsDetachActivated = false;
                                        this_2.DetachEventListener(binder, eventNamespace);
                                        this_2.AttachEventListener(binder, eventType, eventNamespace, function (e) { return __awaiter(_this, void 0, void 0, function () {
                                            var sectorLocal, j, eventDetach, eventDetachNamespace;
                                            return __generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0:
                                                        if ((isLocationBody) && (!application.Document.Contains(el))) {
                                                            application.EventHandler.DetachEventListener(binder, eventNamespace);
                                                            return [2, (true)];
                                                        }
                                                        if (!application.EventHandler.IsValidEventFilter(e, eventFilter))
                                                            return [2, (true)];
                                                        sectorLocal = application.Document.GetSector(e.target);
                                                        return [4, this.Application.Validator.IsValidationEventValid(el, sectorLocal, eventType, location_2, e, contextItem)];
                                                    case 1:
                                                        if (!(_a.sent()))
                                                            return [2, (true)];
                                                        if (eventsDetachActivated)
                                                            return [2, (true)];
                                                        if (eventsDetach != null) {
                                                            for (j = 0; j < eventsDetach.length; j++) {
                                                                eventDetach = eventsDetach[j];
                                                                eventDetachNamespace = this.CreateEventNamespace(el, null, eventDetach, 'noContext');
                                                                application.EventHandler.DetachEventListener(binder, eventNamespace);
                                                                if (eventDetach === eventType)
                                                                    eventsDetachActivated = true;
                                                            }
                                                        }
                                                        if (!isDelay) {
                                                            application.EventHandler.ExecuteEvent(sectorLocal, contextItem, el, e, functionsValue);
                                                        }
                                                        else {
                                                            if (delayTimeout != null)
                                                                clearTimeout(delayTimeout);
                                                            delayTimeout = setTimeout(function () {
                                                                clearTimeout(delayTimeout);
                                                                delayTimeout = null;
                                                                application.EventHandler.ExecuteEvent(sectorLocal, contextItem, el, e, functionsValue);
                                                            }, debounceTimeout);
                                                        }
                                                        return [2, (propagation)];
                                                }
                                            });
                                        }); });
                                        return [2];
                                }
                            });
                        };
                        this_2 = this;
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < events.length)) return [3, 4];
                        return [5, _loop_2(i)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        i++;
                        return [3, 1];
                    case 4: return [2];
                }
            });
        });
    };
    DrapoEventHandler.prototype.HasEventContext = function (sector, renderContext, functionsValue, validation) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4, this.Application.FunctionHandler.HasFunctionMustacheContext(functionsValue, sector, renderContext)];
                    case 1:
                        if (_b.sent())
                            return [2, (true)];
                        _a = (validation != null);
                        if (!_a) return [3, 3];
                        return [4, this.Application.FunctionHandler.HasFunctionMustacheContext(validation, sector, renderContext)];
                    case 2:
                        _a = (_b.sent());
                        _b.label = 3;
                    case 3:
                        if (_a)
                            return [2, (true)];
                        return [2, (false)];
                }
            });
        });
    };
    DrapoEventHandler.prototype.AttachEventListener = function (el, eventType, eventNamespace, callback) {
        var elEventListeners = this.GetElementEventListenerContainer(el);
        var elEventListener = new DrapoEventListener();
        elEventListener.EventType = eventType;
        elEventListener.EventNamespace = eventNamespace;
        elEventListener.Function = callback;
        elEventListeners.push(elEventListener);
        el.addEventListener(eventType, callback);
        this.SetElementEventListenerContainer(el, elEventListeners);
    };
    DrapoEventHandler.prototype.DetachEventListener = function (el, eventNamespace) {
        var elEventListeners = this.GetElementEventListenerContainer(el);
        for (var i = elEventListeners.length - 1; i >= 0; i--) {
            var elEventListener = elEventListeners[i];
            if (elEventListener.EventNamespace !== eventNamespace)
                continue;
            elEventListeners.splice(i, 1);
            el.removeEventListener(elEventListener.EventType, elEventListener.Function);
            this.SetElementEventListenerContainer(el, elEventListeners);
            return (true);
        }
        return (false);
    };
    DrapoEventHandler.prototype.SetElementEventListenerContainer = function (el, elEventListeners) {
        var elAny = el;
        elAny._events = elEventListeners;
    };
    DrapoEventHandler.prototype.GetElementEventListenerContainer = function (el) {
        var elAny = el;
        if (elAny._events == null) {
            var elEventListeners = [];
            elAny._events = elEventListeners;
            return (elEventListeners);
        }
        return elAny._events;
    };
    DrapoEventHandler.prototype.ExecuteEvent = function (sector, contextItem, element, event, functionsValue, isSectorDynamic) {
        if (isSectorDynamic === void 0) { isSectorDynamic = false; }
        return __awaiter(this, void 0, void 0, function () {
            var isEventSingle, eventSingleClass, sectorEvent, _a, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 5, , 7]);
                        isEventSingle = element.getAttribute('d-event-single') === 'true';
                        if ((isEventSingle) && (this.IsEventRunning(element)))
                            return [2];
                        eventSingleClass = null;
                        if (isEventSingle) {
                            this.AddEventRunning(element);
                            eventSingleClass = element.getAttribute('d-event-single-class');
                            if (eventSingleClass != null)
                                element.classList.add(eventSingleClass);
                        }
                        if (!isSectorDynamic) return [3, 2];
                        return [4, this.Application.Document.GetSectorResolved(element)];
                    case 1:
                        _a = _b.sent();
                        return [3, 3];
                    case 2:
                        _a = sector;
                        _b.label = 3;
                    case 3:
                        sectorEvent = _a;
                        return [4, this.Application.FunctionHandler.ResolveFunction(sectorEvent, contextItem, element, event, functionsValue)];
                    case 4:
                        _b.sent();
                        if (isEventSingle) {
                            this.RemoveEventRunning(element);
                            if (eventSingleClass != null)
                                element.classList.remove(eventSingleClass);
                        }
                        return [3, 7];
                    case 5:
                        e_1 = _b.sent();
                        return [4, this.Application.ExceptionHandler.Handle(e_1, 'DrapoEventHandler - ExecuteEvent')];
                    case 6:
                        _b.sent();
                        return [3, 7];
                    case 7: return [2];
                }
            });
        });
    };
    DrapoEventHandler.prototype.IsEventRunning = function (element) {
        for (var i = this._eventsRunning.length - 1; i >= 0; i--) {
            var elementCurrent = this._eventsRunning[i];
            if (elementCurrent === element)
                return (true);
        }
        return (false);
    };
    DrapoEventHandler.prototype.AddEventRunning = function (element) {
        this._eventsRunning.push(element);
    };
    DrapoEventHandler.prototype.RemoveEventRunning = function (element) {
        for (var i = this._eventsRunning.length - 1; i >= 0; i--) {
            var elementCurrent = this._eventsRunning[i];
            if (elementCurrent === element)
                this._eventsRunning.splice(i, 1);
        }
    };
    DrapoEventHandler.prototype.IsEventTypeValid = function (eventType) {
        if (eventType == 'click')
            return (true);
        if (eventType == 'change')
            return (true);
        if (eventType == 'keyup')
            return (true);
        if (eventType == 'blur')
            return (true);
        if (eventType == 'dblclick')
            return (true);
        if (eventType == 'input')
            return (true);
        if (eventType == 'load')
            return (true);
        if (eventType == 'mousedown')
            return (true);
        if (eventType == 'mouseover')
            return (true);
        if (eventType == 'mouseup')
            return (true);
        if (eventType === 'model')
            return (false);
        this.Application.ExceptionHandler.HandleError('DrapoEventHandler - EventType Unknown - {0}', eventType);
        return (false);
    };
    DrapoEventHandler.prototype.IsEventDelay = function (el, eventType) {
        if (eventType !== 'click')
            return (false);
        return (this.HasEventDoubleClickInParent(el));
    };
    DrapoEventHandler.prototype.GetEventDebounce = function (el, eventType) {
        var elEventTypeDebounce = el.getAttribute('d-on-' + eventType + '-' + this._debounce);
        if ((elEventTypeDebounce == null) || (elEventTypeDebounce == ''))
            return (null);
        if (elEventTypeDebounce === 'true')
            return (this._debounceDefault);
        return (this.Application.Parser.ParseNumber(elEventTypeDebounce, this._debounceDefault));
    };
    DrapoEventHandler.prototype.GetEventDetach = function (el, eventType) {
        var elEventTypeDetach = el.getAttribute('d-on-' + eventType + '-' + this._detach);
        if ((elEventTypeDetach == null) || (elEventTypeDetach == ''))
            return (null);
        if (elEventTypeDetach === 'true')
            return ([eventType]);
        return (this.Application.Parser.ParsePipes(elEventTypeDetach));
    };
    DrapoEventHandler.prototype.HasEventDoubleClickInParent = function (el) {
        if (el == null)
            return (false);
        var doubleClickEvent = el.getAttribute('d-on-dblclick');
        if ((doubleClickEvent != null) && (doubleClickEvent != ''))
            return (true);
        return (this.HasEventDoubleClickInParent(el.parentElement));
    };
    DrapoEventHandler.prototype.IsEventTypeKeyboard = function (eventType) {
        return (eventType == 'keyup');
    };
    DrapoEventHandler.prototype.IsValidEventFilter = function (e, eventFilter) {
        if (eventFilter == null)
            return (true);
        if (this.IsEventTypeKeyboard(e.type))
            return (this.IsValidEventFilterKeyboard(e, eventFilter));
        return (true);
    };
    DrapoEventHandler.prototype.IsValidEventFilterKeyboard = function (e, eventFilter) {
        return (this.GetKeyboardMapping(e.key) == this.GetKeyboardMapping(eventFilter));
    };
    DrapoEventHandler.prototype.GetKeyboardMapping = function (key) {
        if (key == null)
            return (null);
        key = key.toLowerCase();
        if (key === 'esc')
            key = 'escape';
        if (key === 'del')
            key = 'delete';
        return (key);
    };
    DrapoEventHandler.prototype.RetrieveElementEvents = function (el) {
        var events = [];
        for (var i = 0; i < el.attributes.length; i++) {
            var attribute = el.attributes[i];
            var event_3 = this.Application.Parser.ParseEventProperty(el, attribute.nodeName, attribute.nodeValue);
            if ((event_3 != null) && (event_3[4] !== this._debounce) && (event_3[4] !== this._detach))
                events.push(event_3);
        }
        return (events);
    };
    DrapoEventHandler.prototype.TriggerClick = function (el) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.Trigger(el, 'click')];
                    case 1: return [2, (_a.sent())];
                }
            });
        });
    };
    DrapoEventHandler.prototype.Trigger = function (el, type) {
        return __awaiter(this, void 0, void 0, function () {
            var event;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        event = new Event(type);
                        return [4, this.TriggerEvent(el, event)];
                    case 1: return [2, (_a.sent())];
                }
            });
        });
    };
    DrapoEventHandler.prototype.TriggerEvent = function (el, event) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, (el.dispatchEvent(event))];
            });
        });
    };
    DrapoEventHandler.prototype.SyncNodeEventsDifferences = function (nodeOld, nodeNew) {
        var eventsOld = this.GetElementEventListenerContainer(nodeOld);
        var eventsNew = this.GetElementEventListenerContainer(nodeNew);
        for (var i = 0; i < eventsNew.length; i++) {
            var eventNew = eventsNew[i];
            var eventOld = this.GetEventListener(eventNew.EventNamespace, eventsOld);
            if (eventOld == null) {
                var elEventListener = new DrapoEventListener();
                elEventListener.EventType = eventNew.EventType;
                elEventListener.EventNamespace = eventNew.EventNamespace;
                elEventListener.Function = eventNew.Function;
                eventsOld.push(elEventListener);
                this.AttachEventListener(nodeOld, elEventListener.EventType, elEventListener.EventNamespace, elEventListener.Function);
            }
            else {
                this.DetachEventListener(nodeOld, eventOld.EventNamespace);
                eventOld.Function = eventNew.Function;
                this.AttachEventListener(nodeOld, eventOld.EventType, eventOld.EventNamespace, eventOld.Function);
            }
        }
        for (var i = eventsOld.length - 1; i >= 0; i--) {
            var eventOld = eventsOld[i];
            var eventNew = this.GetEventListener(eventOld.EventNamespace, eventsNew);
            if (eventNew !== null)
                continue;
            this.DetachEventListener(nodeOld, eventOld.EventNamespace);
        }
        if ((eventsOld.length > 0) || (eventsNew.length > 0))
            this.SetElementEventListenerContainer(nodeOld, eventsOld);
    };
    DrapoEventHandler.prototype.GetEventListener = function (eventNamespace, events) {
        for (var i = 0; i < events.length; i++) {
            var event_4 = events[i];
            if (event_4.EventNamespace === eventNamespace)
                return (event_4);
        }
        return (null);
    };
    return DrapoEventHandler;
}());

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
var DrapoModelHandler = (function () {
    function DrapoModelHandler(application) {
        this._application = application;
    }
    Object.defineProperty(DrapoModelHandler.prototype, "Application", {
        get: function () {
            return (this._application);
        },
        enumerable: true,
        configurable: true
    });
    DrapoModelHandler.prototype.HasContentModelContext = function (content) {
        return (content.indexOf('d-model') > -1);
    };
    DrapoModelHandler.prototype.ResolveOnModelChange = function (contextItem, el) {
        return __awaiter(this, void 0, void 0, function () {
            var onModel, sector;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        onModel = el.getAttribute('d-on-model-change');
                        if ((onModel === null) || (onModel === undefined))
                            return [2];
                        sector = this.Application.Document.GetSector(el);
                        return [4, this.Application.FunctionHandler.ResolveFunction(sector, contextItem, null, null, onModel)];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    DrapoModelHandler.prototype.ResolveOnModelComplete = function (contextItem, el) {
        return __awaiter(this, void 0, void 0, function () {
            var onModel, sector;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        onModel = el.getAttribute('d-on-model-complete');
                        if ((onModel === null) || (onModel === undefined))
                            return [2];
                        sector = this.Application.Document.GetSector(el);
                        return [4, this.Application.FunctionHandler.ResolveFunction(sector, contextItem, null, null, onModel)];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    DrapoModelHandler.prototype.ResolveModel = function (context, renderContext, el, elj, sector, canBind, isContext) {
        if (isContext === void 0) { isContext = true; }
        return __awaiter(this, void 0, void 0, function () {
            var model, isMustacheContext, isMustacheOnly, mustache, mustacheParts, dataFields, onModelInitialize, _a, modelEvents, mustacheResolved, modelOrValue, _b, updated, tag, canRemoveModel, dataKey;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        model = el.getAttribute('d-model');
                        if (model == null)
                            return [2, (false)];
                        return [4, this.Application.Barber.HasMustacheContext(model, sector, renderContext)];
                    case 1:
                        isMustacheContext = _c.sent();
                        if (isContext !== isMustacheContext)
                            return [2];
                        isMustacheOnly = this.Application.Parser.IsMustacheOnly(model, true);
                        mustache = isMustacheOnly ? model : null;
                        mustacheParts = isMustacheOnly ? this.Application.Parser.ParseMustache(model) : null;
                        dataFields = isMustacheOnly ? this.Application.Solver.ResolveDataFields(mustacheParts) : null;
                        onModelInitialize = el.getAttribute('d-on-model-initialize');
                        _a = (onModelInitialize !== null) && (onModelInitialize !== undefined);
                        if (!_a) return [3, 3];
                        return [4, this.Application.Solver.ExistDataPath(context, sector, mustacheParts)];
                    case 2:
                        _a = (!(_c.sent()));
                        _c.label = 3;
                    case 3:
                        if (!_a) return [3, 5];
                        return [4, this.Application.FunctionHandler.ResolveFunction(sector, context.Item, null, null, onModelInitialize)];
                    case 4:
                        _c.sent();
                        if ((!isContext) || (!context.CanUpdateTemplate))
                            el.removeAttribute('d-on-model-initialize');
                        _c.label = 5;
                    case 5:
                        modelEvents = this.Application.Parser.ParseEvents(el.getAttribute('d-model-event'));
                        if (modelEvents.length === 0)
                            modelEvents.push('change');
                        if (!((isMustacheOnly) && (context.CanUpdateTemplate))) return [3, 7];
                        return [4, this.Application.Solver.ResolveDataPathMustache(context, elj, sector, mustacheParts)];
                    case 6:
                        mustacheResolved = _c.sent();
                        if (mustacheResolved !== null)
                            el.setAttribute('d-model', mustacheResolved);
                        _c.label = 7;
                    case 7:
                        if (!isMustacheOnly) return [3, 8];
                        _b = model;
                        return [3, 10];
                    case 8: return [4, this.ResolveValueExpression(context, el, sector, model, canBind)];
                    case 9:
                        _b = _c.sent();
                        _c.label = 10;
                    case 10:
                        modelOrValue = _b;
                        updated = false;
                        tag = el.tagName.toLowerCase();
                        if (!(tag === 'input')) return [3, 12];
                        return [4, this.ResolveModelInput(context, el, elj, sector, model, mustache, mustacheParts, dataFields, canBind, modelEvents, this.Application.Parser.ParseEvents(el.getAttribute('d-model-event-cancel')))];
                    case 11:
                        updated = _c.sent();
                        return [3, 27];
                    case 12:
                        if (!(tag === 'select')) return [3, 14];
                        return [4, this.ResolveModelSelect(context, el, elj, sector, model, mustache, mustacheParts, dataFields, canBind, modelEvents)];
                    case 13:
                        updated = _c.sent();
                        return [3, 27];
                    case 14:
                        if (!(tag === 'textarea')) return [3, 16];
                        return [4, this.ResolveModelTextArea(context, el, sector, modelOrValue, mustache, mustacheParts, dataFields, canBind, modelEvents, this.Application.Parser.ParseEvents(el.getAttribute('d-model-event-cancel')))];
                    case 15:
                        updated = _c.sent();
                        return [3, 27];
                    case 16:
                        if (!(tag === 'span')) return [3, 18];
                        return [4, this.ResolveModelSpan(context, el, elj, sector, modelOrValue, mustache, mustacheParts, dataFields, canBind, ((isContext) && (!context.CanUpdateTemplate)))];
                    case 17:
                        updated = _c.sent();
                        return [3, 27];
                    case 18:
                        if (!(tag === 'li')) return [3, 20];
                        return [4, this.ResolveModelLI(context, el, elj, sector, model, mustache, mustacheParts, dataFields, canBind)];
                    case 19:
                        updated = _c.sent();
                        return [3, 27];
                    case 20:
                        if (!(tag === 'div')) return [3, 21];
                        updated = true;
                        return [3, 27];
                    case 21:
                        if (!(tag === 'label')) return [3, 23];
                        return [4, this.ResolveModelSpan(context, el, elj, sector, modelOrValue, mustache, mustacheParts, dataFields, canBind, ((isContext) && (!context.CanUpdateTemplate)))];
                    case 22:
                        updated = _c.sent();
                        return [3, 27];
                    case 23:
                        if (!(tag === 'button')) return [3, 25];
                        return [4, this.ResolveModelSpan(context, el, elj, sector, modelOrValue, mustache, mustacheParts, dataFields, canBind, ((isContext) && (!context.CanUpdateTemplate)))];
                    case 24:
                        updated = _c.sent();
                        return [3, 27];
                    case 25: return [4, this.Application.ExceptionHandler.HandleError('DrapoModelHandler - ResolveModel - model not supported in tag: {0}', tag)];
                    case 26:
                        _c.sent();
                        _c.label = 27;
                    case 27:
                        if ((updated) && (isContext)) {
                            canRemoveModel = ((!context.CanUpdateTemplate) || (context.IsInsideRecursion));
                            dataKey = isMustacheOnly ? this.Application.Solver.ResolveDataKey(mustacheParts) : null;
                            if ((canRemoveModel) && ((!isMustacheOnly) || (dataKey === context.Item.Key)))
                                el.removeAttribute('d-model');
                        }
                        return [2, (updated)];
                }
            });
        });
    };
    DrapoModelHandler.prototype.ResolveValueExpression = function (context, el, sector, model, canBind) {
        return __awaiter(this, void 0, void 0, function () {
            var mustaches, i, mustache, mustacheParts, dataKey, dataFields, _a, _b, executionContext, value, valueString;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!canBind) return [3, 4];
                        mustaches = this.Application.Parser.ParseMustaches(model, true);
                        i = 0;
                        _c.label = 1;
                    case 1:
                        if (!(i < mustaches.length)) return [3, 4];
                        mustache = mustaches[i];
                        mustacheParts = this.Application.Parser.ParseMustache(mustache);
                        dataKey = this.Application.Solver.ResolveDataKey(mustacheParts);
                        dataFields = this.Application.Solver.ResolveDataFields(mustacheParts);
                        _b = (_a = this.Application.Binder).BindReader;
                        return [4, this.Application.Solver.ResolveDataPathObjectItem(context.Item, dataKey, sector)];
                    case 2:
                        _b.apply(_a, [_c.sent(), el, dataFields]);
                        _c.label = 3;
                    case 3:
                        i++;
                        return [3, 1];
                    case 4:
                        executionContext = new DrapoExecutionContext(this.Application);
                        return [4, this.Application.FunctionHandler.ResolveFunctions(sector, context.Item, el, executionContext, model)];
                    case 5:
                        value = _c.sent();
                        valueString = this.Application.Solver.EnsureString(value);
                        if (!(valueString != model)) return [3, 7];
                        return [4, this.ResolveValueExpression(context, el, sector, valueString, canBind)];
                    case 6: return [2, (_c.sent())];
                    case 7: return [2, (valueString)];
                }
            });
        });
    };
    DrapoModelHandler.prototype.ResolveModelInput = function (context, el, elementJQuery, sector, model, mustache, mustacheParts, dataFields, canBind, modelEvents, modelEventsCancel) {
        return __awaiter(this, void 0, void 0, function () {
            var type;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        type = el.getAttribute('type');
                        if (type == 'checkbox')
                            return [2, (this.ResolveModelInputCheckbox(context, el, elementJQuery, sector, model, mustache, mustacheParts, dataFields, canBind, modelEvents))];
                        if (type == 'text')
                            return [2, (this.ResolveModelInputText(context, el, elementJQuery, sector, model, mustache, mustacheParts, dataFields, canBind, modelEvents, modelEventsCancel))];
                        if (type == 'number')
                            return [2, (this.ResolveModelInputNumber(context, el, elementJQuery, sector, model, mustache, mustacheParts, dataFields, canBind, modelEvents, modelEventsCancel))];
                        if (type == 'password')
                            return [2, (this.ResolveModelInputPassword(context, el, elementJQuery, sector, model, mustache, mustacheParts, dataFields, canBind, modelEvents, modelEventsCancel))];
                        if (type == 'hidden')
                            return [2, (this.ResolveModelInputHidden(context, el, elementJQuery, sector, model, mustache, mustacheParts, dataFields, canBind, modelEvents))];
                        if (type == 'range')
                            return [2, (this.ResolveModelInputRange(context, el, elementJQuery, sector, model, mustache, mustacheParts, dataFields, canBind, modelEvents))];
                        return [4, this.Application.ExceptionHandler.HandleError('DrapoModelHandler - ResolveModelInput - model not supported in input type: {0}', type)];
                    case 1:
                        _a.sent();
                        return [2, (false)];
                }
            });
        });
    };
    DrapoModelHandler.prototype.ResolveModelInputCheckbox = function (context, element, elementJQuery, sector, model, mustache, mustacheParts, dataFields, canBind, modelEvents) {
        return __awaiter(this, void 0, void 0, function () {
            var value, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = (_a = this.Application.Solver).ResolveConditional;
                        return [4, this.Application.Solver.ResolveDataPath(context, elementJQuery, sector, mustacheParts, canBind, canBind, modelEvents)];
                    case 1: return [4, _b.apply(_a, [_c.sent()])];
                    case 2:
                        value = _c.sent();
                        elementJQuery.prop('checked', value);
                        return [2, (true)];
                }
            });
        });
    };
    DrapoModelHandler.prototype.ResolveModelTextArea = function (context, el, sector, model, mustache, mustacheParts, dataFields, canBind, modelEvents, modelEventsCancel) {
        return __awaiter(this, void 0, void 0, function () {
            var elj, value, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        elj = $(el);
                        if (!(mustacheParts != null)) return [3, 2];
                        return [4, this.Application.Solver.ResolveDataPath(context, elj, sector, mustacheParts, canBind, canBind, modelEvents, modelEventsCancel)];
                    case 1:
                        _a = _b.sent();
                        return [3, 3];
                    case 2:
                        _a = model;
                        _b.label = 3;
                    case 3:
                        value = _a;
                        elj.val(value);
                        return [2, (true)];
                }
            });
        });
    };
    DrapoModelHandler.prototype.ResolveModelInputText = function (context, element, elj, sector, model, mustache, mustacheParts, dataFields, canBind, modelEvents, modelEventsCancel) {
        return __awaiter(this, void 0, void 0, function () {
            var value, _a, elementInput;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(mustacheParts != null)) return [3, 2];
                        return [4, this.Application.Solver.ResolveDataPath(context, elj, sector, mustacheParts, canBind, canBind, modelEvents, modelEventsCancel)];
                    case 1:
                        _a = _b.sent();
                        return [3, 3];
                    case 2:
                        _a = model;
                        _b.label = 3;
                    case 3:
                        value = _a;
                        elementInput = element;
                        if (elementInput.value !== value)
                            elementInput.value = value;
                        return [2, (true)];
                }
            });
        });
    };
    DrapoModelHandler.prototype.ResolveModelInputNumber = function (context, element, elementJQuery, sector, model, mustache, mustacheParts, dataFields, canBind, modelEvents, modelEventsCancel) {
        return __awaiter(this, void 0, void 0, function () {
            var value, elementInput;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.Application.Solver.ResolveDataPath(context, elementJQuery, sector, mustacheParts, canBind, canBind, modelEvents, modelEventsCancel)];
                    case 1:
                        value = _a.sent();
                        elementInput = element;
                        if (elementInput.value !== value)
                            elementInput.value = value;
                        return [2, (true)];
                }
            });
        });
    };
    DrapoModelHandler.prototype.ResolveModelInputPassword = function (context, element, elementJQuery, sector, model, mustache, mustacheParts, dataFields, canBind, modelEvents, modelEventsCancel) {
        return __awaiter(this, void 0, void 0, function () {
            var value, elementInput;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.Application.Solver.ResolveDataPath(context, elementJQuery, sector, mustacheParts, canBind, canBind, modelEvents, modelEventsCancel)];
                    case 1:
                        value = _a.sent();
                        elementInput = element;
                        elementInput.value = value;
                        return [2, (true)];
                }
            });
        });
    };
    DrapoModelHandler.prototype.ResolveModelInputHidden = function (context, element, elementJQuery, sector, model, mustache, mustacheParts, dataFields, canBind, modelEvents) {
        return __awaiter(this, void 0, void 0, function () {
            var value, elementInput;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.Application.Solver.ResolveDataPath(context, elementJQuery, sector, mustacheParts, canBind, canBind, modelEvents)];
                    case 1:
                        value = _a.sent();
                        elementInput = element;
                        if (elementInput.value !== value)
                            elementInput.value = value;
                        return [2, (true)];
                }
            });
        });
    };
    DrapoModelHandler.prototype.ResolveModelInputRange = function (context, element, elementJQuery, sector, model, mustache, mustacheParts, dataFields, canBind, modelEvents) {
        return __awaiter(this, void 0, void 0, function () {
            var value, elementInput;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.Application.Solver.ResolveDataPath(context, elementJQuery, sector, mustacheParts, canBind, canBind, modelEvents)];
                    case 1:
                        value = _a.sent();
                        elementInput = element;
                        if (elementInput.value !== value)
                            elementInput.value = value;
                        return [2, (true)];
                }
            });
        });
    };
    DrapoModelHandler.prototype.ResolveModelSelect = function (context, element, elementJQuery, sector, model, mustache, mustacheParts, dataFields, canBind, modelEvents) {
        return __awaiter(this, void 0, void 0, function () {
            var value, elementSelect;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.Application.Solver.ResolveDataPath(context, elementJQuery, sector, mustacheParts, canBind, canBind, modelEvents)];
                    case 1:
                        value = _a.sent();
                        elementSelect = element;
                        if (elementSelect.value !== value)
                            elementSelect.value = value;
                        return [2, (true)];
                }
            });
        });
    };
    DrapoModelHandler.prototype.ResolveModelSpan = function (context, el, elj, sector, model, mustache, mustacheParts, dataFields, canBind, canClean) {
        return __awaiter(this, void 0, void 0, function () {
            var updated, format, value, _a, valueFormatted, formatResolved, culture, cultureResolved, elementSpan;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        updated = true;
                        format = el.getAttribute("d-format");
                        if (!(mustacheParts != null)) return [3, 2];
                        return [4, this.Application.Solver.ResolveDataPath(context, elj, sector, mustacheParts, canBind, false)];
                    case 1:
                        _a = _b.sent();
                        return [3, 3];
                    case 2:
                        _a = model;
                        _b.label = 3;
                    case 3:
                        value = _a;
                        if (this.Application.Parser.IsMustache(value)) {
                            el.setAttribute('d-model', value);
                            value = '';
                            updated = false;
                        }
                        else if ((canClean) && (format != null)) {
                            el.removeAttribute('d-model');
                        }
                        valueFormatted = value;
                        if (!(format != null)) return [3, 10];
                        if (canClean)
                            el.removeAttribute('d-format');
                        formatResolved = format;
                        _b.label = 4;
                    case 4:
                        if (!this.Application.Parser.HasMustache(formatResolved)) return [3, 6];
                        return [4, this.Application.Barber.ResolveControlFlowMustacheString(context, null, formatResolved, elj, sector, false)];
                    case 5:
                        formatResolved = _b.sent();
                        return [3, 4];
                    case 6:
                        culture = el.getAttribute("d-culture");
                        cultureResolved = culture;
                        if (!(cultureResolved != null)) return [3, 9];
                        if (canClean)
                            el.removeAttribute('d-culture');
                        _b.label = 7;
                    case 7:
                        if (!this.Application.Parser.HasMustache(cultureResolved)) return [3, 9];
                        return [4, this.Application.Barber.ResolveControlFlowMustacheString(context, null, cultureResolved, elj, sector, false)];
                    case 8:
                        cultureResolved = _b.sent();
                        return [3, 7];
                    case 9:
                        valueFormatted = this.Application.Formatter.Format(value, formatResolved, cultureResolved);
                        _b.label = 10;
                    case 10:
                        elementSpan = el;
                        if (elementSpan.textContent !== valueFormatted)
                            elementSpan.textContent = valueFormatted;
                        return [2, (updated)];
                }
            });
        });
    };
    DrapoModelHandler.prototype.ResolveModelLI = function (context, el, elj, sector, model, mustache, mustacheParts, dataFields, canBind) {
        return __awaiter(this, void 0, void 0, function () {
            var updated, value, elementLI;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        updated = true;
                        return [4, this.Application.Solver.ResolveDataPath(context, elj, sector, mustacheParts, canBind, false)];
                    case 1:
                        value = _a.sent();
                        if (this.Application.Parser.IsMustache(value)) {
                            el.setAttribute('d-model', value);
                            value = '';
                            updated = false;
                        }
                        elementLI = el;
                        if (elementLI.textContent !== value)
                            elementLI.textContent = value;
                        return [2, (updated)];
                }
            });
        });
    };
    return DrapoModelHandler;
}());

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
var DrapoBarber = (function () {
    function DrapoBarber(application) {
        this._application = application;
    }
    Object.defineProperty(DrapoBarber.prototype, "Application", {
        get: function () {
            return (this._application);
        },
        enumerable: false,
        configurable: true
    });
    DrapoBarber.prototype.HasContentMustacheNodesContext = function (content) {
        var isInsideTag = false;
        var length = content.length - 1;
        for (var i = 0; i < length; i++) {
            var chr = content[i];
            if (chr == '>') {
                isInsideTag = false;
            }
            else if (chr == '<') {
                isInsideTag = true;
            }
            else if ((!isInsideTag) && (chr === '{')) {
                if (content[i + 1] === '{')
                    return (true);
            }
        }
        return (false);
    };
    DrapoBarber.prototype.HasContentMustacheAttributeContext = function (content) {
        var attributes = this.Application.Parser.ParseHTMLAttributes(content);
        for (var i = 0; i < attributes.length; i++) {
            var attribute = attributes[i];
            var attributeKey = attribute[0];
            if ((attributeKey !== 'value') && (attributeKey !== 'class'))
                continue;
            var attributeValue = attribute[1];
            if (attributeValue.indexOf('{{') >= 0)
                return (true);
        }
        return (false);
    };
    DrapoBarber.prototype.HasContentMustacheAttributeContextMustache = function (content, attribute) {
        return ((content.indexOf(attribute + '="{{') > -1) || (content.indexOf(attribute + "='{{") > -1));
    };
    DrapoBarber.prototype.ResolveMustaches = function (jQueryStart, sector, stopAtSectors) {
        if (jQueryStart === void 0) { jQueryStart = null; }
        if (sector === void 0) { sector = null; }
        if (stopAtSectors === void 0) { stopAtSectors = true; }
        return __awaiter(this, void 0, void 0, function () {
            var renderContext, i, el, context;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (jQueryStart == null)
                            jQueryStart = $(document.documentElement);
                        if (sector === null)
                            sector = this.Application.Document.GetSector(jQueryStart.get(0));
                        renderContext = new DrapoRenderContext();
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < jQueryStart.length)) return [3, 4];
                        el = jQueryStart[i];
                        context = new DrapoContext();
                        this.Application.ControlFlow.InitializeContext(context, el.outerHTML);
                        return [4, this.ResolveMustachesInternal(el, sector, context, renderContext, stopAtSectors)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        i++;
                        return [3, 1];
                    case 4: return [4, this.Application.Storage.LoadDataDelayedAndNotify()];
                    case 5:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    DrapoBarber.prototype.ResolveMustachesInternal = function (el, sector, context, renderContext, stopAtSectors) {
        return __awaiter(this, void 0, void 0, function () {
            var pre, children, hasChildren, i, child, childSector, canRender;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        pre = el.getAttribute != null ? el.getAttribute('d-pre') : null;
                        if (pre === 'true')
                            return [2];
                        children = [].slice.call(el.children);
                        hasChildren = children.length > 0;
                        if (!hasChildren) return [3, 7];
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < children.length)) return [3, 6];
                        child = children[i];
                        childSector = child.getAttribute('d-sector');
                        if (childSector != null) {
                            if (stopAtSectors)
                                return [3, 5];
                            sector = childSector;
                        }
                        return [4, this.CanRender(child, sector)];
                    case 2:
                        canRender = _a.sent();
                        if (!canRender) return [3, 4];
                        return [4, this.ResolveMustachesInternal(child, sector, context, renderContext, stopAtSectors)];
                    case 3:
                        _a.sent();
                        return [3, 5];
                    case 4:
                        $(child).remove();
                        _a.label = 5;
                    case 5:
                        i++;
                        return [3, 1];
                    case 6: return [3, 9];
                    case 7: return [4, this.ResolveMustacheElementLeaf(el)];
                    case 8:
                        _a.sent();
                        _a.label = 9;
                    case 9:
                        if (!context.CheckID) return [3, 11];
                        return [4, this.Application.AttributeHandler.ResolveID(el, sector)];
                    case 10:
                        _a.sent();
                        _a.label = 11;
                    case 11:
                        if (!context.CheckAttribute) return [3, 13];
                        return [4, this.Application.AttributeHandler.ResolveAttr(el)];
                    case 12:
                        _a.sent();
                        _a.label = 13;
                    case 13:
                        if (!context.CheckModel) return [3, 15];
                        return [4, this.ResolveModel(el)];
                    case 14:
                        _a.sent();
                        _a.label = 15;
                    case 15:
                        if (!context.CheckClass) return [3, 17];
                        return [4, this.Application.ClassHandler.ResolveClass(el, sector)];
                    case 16:
                        _a.sent();
                        _a.label = 17;
                    case 17:
                        if (!context.CheckValidation) return [3, 19];
                        return [4, this.Application.Validator.RegisterValidation(el, sector)];
                    case 18:
                        _a.sent();
                        _a.label = 19;
                    case 19:
                        if (!context.CheckEvent) return [3, 21];
                        return [4, this.Application.EventHandler.Attach(el, renderContext)];
                    case 20:
                        _a.sent();
                        _a.label = 21;
                    case 21:
                        if (!context.CheckBehavior) return [3, 23];
                        return [4, this.Application.BehaviorHandler.ResolveBehavior(el)];
                    case 22:
                        _a.sent();
                        _a.label = 23;
                    case 23: return [4, this.ResolveMustacheElementVisibility(el)];
                    case 24:
                        _a.sent();
                        return [4, this.ResolveCloak(el)];
                    case 25:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    DrapoBarber.prototype.CanRender = function (el, sector) {
        return __awaiter(this, void 0, void 0, function () {
            var dRender, context, expression, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dRender = el.getAttribute('d-render');
                        if (dRender == null)
                            return [2, (true)];
                        if (this.Application.Barber.HasMustacheContext(dRender, sector))
                            return [2, (true)];
                        context = new DrapoContext();
                        return [4, this.Application.Barber.ResolveControlFlowMustacheStringFunction(sector, context, null, dRender, null, false)];
                    case 1:
                        expression = _a.sent();
                        return [4, this.Application.Solver.ResolveConditional(expression)];
                    case 2:
                        result = _a.sent();
                        el.removeAttribute('d-render');
                        return [2, (result)];
                }
            });
        });
    };
    DrapoBarber.prototype.ResolveFilter = function (el, sector, canBind, dataKeyFilter, dataFieldFilter) {
        return __awaiter(this, void 0, void 0, function () {
            var children, hasChildren;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.Application.Document.IsElementPreprocessed(el))
                            return [2];
                        children = [].slice.call(el.children);
                        hasChildren = children.length > 0;
                        if (!!hasChildren) return [3, 2];
                        return [4, this.ResolveMustacheElementLeaf(el, false, true, dataKeyFilter, dataFieldFilter)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [4, this.Application.AttributeHandler.ResolveID(el, sector, canBind, true, dataKeyFilter, dataFieldFilter)];
                    case 3:
                        _a.sent();
                        return [4, this.Application.AttributeHandler.ResolveAttr(el, canBind, true, dataKeyFilter, dataFieldFilter)];
                    case 4:
                        _a.sent();
                        return [4, this.ResolveModel(el, canBind, true, dataKeyFilter, dataFieldFilter)];
                    case 5:
                        _a.sent();
                        return [4, this.Application.ClassHandler.ResolveClass(el, sector, canBind, true, dataKeyFilter, dataFieldFilter)];
                    case 6:
                        _a.sent();
                        return [4, this.ResolveMustacheElementVisibility(el, canBind)];
                    case 7:
                        _a.sent();
                        return [4, this.Application.Storage.LoadDataDelayedAndNotify()];
                    case 8:
                        _a.sent();
                        return [4, this.ResolveCloak(el, canBind)];
                    case 9:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    DrapoBarber.prototype.ResolveElementDelayed = function (el, sector, dataKeyFilter, dataFieldFilter) {
        if (dataKeyFilter === void 0) { dataKeyFilter = null; }
        if (dataFieldFilter === void 0) { dataFieldFilter = null; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.ResolveMustacheElementLeaf(el, true, false, dataKeyFilter, dataFieldFilter)];
                    case 1:
                        _a.sent();
                        return [4, this.Application.AttributeHandler.ResolveAttr(el, false, false, dataKeyFilter, dataFieldFilter)];
                    case 2:
                        _a.sent();
                        return [4, this.Application.ClassHandler.ResolveClass(el, sector, false, false, dataKeyFilter, dataFieldFilter)];
                    case 3:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    DrapoBarber.prototype.ResolveMustacheElementLeaf = function (el, canUseModel, canSubscribeDelay, dataKeyFilter, dataFieldFilter) {
        if (canUseModel === void 0) { canUseModel = false; }
        if (canSubscribeDelay === void 0) { canSubscribeDelay = true; }
        if (dataKeyFilter === void 0) { dataKeyFilter = null; }
        if (dataFieldFilter === void 0) { dataFieldFilter = null; }
        return __awaiter(this, void 0, void 0, function () {
            var sector, model, elj, text, updated, mustaches, i, mustache, mustacheParts, dataKey, dataFields, dataField, mustacheData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sector = this.Application.Document.GetSector(el);
                        model = canUseModel ? el.getAttribute('d-model') : null;
                        elj = $(el);
                        text = model != null ? model : elj.text();
                        updated = false;
                        mustaches = this.Application.Parser.ParseMustaches(text);
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < mustaches.length)) return [3, 4];
                        mustache = mustaches[i];
                        mustacheParts = this.Application.Parser.ParseMustache(mustache);
                        dataKey = this.Application.Solver.ResolveDataKey(mustacheParts);
                        if ((dataKeyFilter != null) && (dataKey != dataKeyFilter))
                            return [3, 3];
                        if (!this.Application.Storage.IsMustachePartsDataKey(sector, mustacheParts))
                            return [3, 3];
                        dataFields = this.Application.Solver.ResolveDataFields(mustacheParts);
                        dataField = dataFields[0];
                        if ((dataFieldFilter != null) && (dataField != dataFieldFilter))
                            return [3, 3];
                        return [4, this.Application.Storage.EnsureDataKeyFieldReady(dataKey, sector, mustacheParts)];
                    case 2:
                        if (_a.sent()) {
                            mustacheData = this.Application.Storage.GetDataKeyField(dataKey, sector, mustacheParts);
                            if (mustacheData == null)
                                return [3, 3];
                            text = text.replace(mustache, mustacheData);
                            updated = true;
                        }
                        else if (canSubscribeDelay) {
                            this.Application.Observer.SubscribeDelay(el, dataKey, dataFields);
                        }
                        _a.label = 3;
                    case 3:
                        i++;
                        return [3, 1];
                    case 4:
                        if (updated)
                            elj.text(text);
                        return [2];
                }
            });
        });
    };
    DrapoBarber.prototype.ResolveModel = function (el, canBind, canSubscribeDelay, dataKeyFilter, dataFieldFilter) {
        if (canBind === void 0) { canBind = true; }
        if (canSubscribeDelay === void 0) { canSubscribeDelay = true; }
        if (dataKeyFilter === void 0) { dataKeyFilter = null; }
        if (dataFieldFilter === void 0) { dataFieldFilter = null; }
        return __awaiter(this, void 0, void 0, function () {
            var model, sector, isMustacheOnly, context, mustaches, mustache, mustacheParts, dataKey, dataFields, dataField, context, data, elj;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        model = el.getAttribute('d-model');
                        if (model == null)
                            return [2];
                        sector = this.Application.Document.GetSector(el);
                        if (this.Application.Barber.HasMustacheContext(model, sector))
                            return [2];
                        isMustacheOnly = this.Application.Parser.IsMustacheOnly(model, true);
                        if (!!isMustacheOnly) return [3, 2];
                        context = new DrapoContext();
                        return [4, this.Application.ModelHandler.ResolveModel(context, null, el, null, sector, canBind, false)];
                    case 1:
                        _a.sent();
                        return [2];
                    case 2:
                        mustaches = this.Application.Parser.ParseMustaches(model);
                        if (mustaches.length != 1)
                            return [2];
                        mustache = mustaches[0];
                        mustacheParts = this.Application.Parser.ParseMustache(mustache);
                        dataKey = this.Application.Solver.ResolveDataKey(mustacheParts);
                        if ((dataKeyFilter != null) && (dataKey != dataKeyFilter))
                            return [2];
                        if (!this.Application.Storage.IsDataKey(dataKey, sector))
                            return [2];
                        dataFields = this.Application.Solver.ResolveDataFields(mustacheParts);
                        dataField = dataFields[0];
                        if ((dataFieldFilter != null) && (dataField != dataFieldFilter))
                            return [2];
                        return [4, this.Application.Storage.EnsureDataKeyFieldReady(dataKey, sector, mustacheParts)];
                    case 3:
                        if (!_a.sent()) return [3, 6];
                        context = new DrapoContext();
                        return [4, this.Application.Storage.RetrieveData(dataKey, sector)];
                    case 4:
                        data = _a.sent();
                        context.Create(data, el, null, dataKey, dataKey, null, null);
                        elj = $(el);
                        return [4, this.Application.ModelHandler.ResolveModel(context, null, el, elj, sector, canBind, false)];
                    case 5:
                        _a.sent();
                        return [3, 7];
                    case 6:
                        if (canSubscribeDelay) {
                            this.Application.Observer.SubscribeDelay(el, dataKey, dataFields);
                        }
                        _a.label = 7;
                    case 7: return [2];
                }
            });
        });
    };
    DrapoBarber.prototype.ResolveControlFlowMustacheAttributes = function (context, elementJQuery, sector) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.ResolveControlFlowMustacheAttribute(context, "value", elementJQuery, sector)];
                    case 1:
                        _a.sent();
                        return [4, this.ResolveControlFlowMustacheAttribute(context, "class", elementJQuery, sector)];
                    case 2:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    DrapoBarber.prototype.ResolveControlFlowMustacheNodes = function (context, element, elementJQuery, sector) {
        return __awaiter(this, void 0, void 0, function () {
            var childNodes, i, childNode, text, textOriginal, mustaches, j, mustache, mustacheParts, mustacheData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        childNodes = [].slice.call(element.childNodes);
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < childNodes.length)) return [3, 7];
                        childNode = childNodes[i];
                        if (childNode.nodeType != Node.TEXT_NODE)
                            return [3, 6];
                        text = childNode.nodeValue;
                        textOriginal = text;
                        mustaches = this.Application.Parser.ParseMustaches(text);
                        if (mustaches.length == 0)
                            return [3, 6];
                        j = 0;
                        _a.label = 2;
                    case 2:
                        if (!(j < mustaches.length)) return [3, 5];
                        mustache = mustaches[j];
                        mustacheParts = this.Application.Parser.ParseMustache(mustache);
                        if ((context !== null) && (!context.CanResolve(mustacheParts[0])))
                            return [3, 4];
                        return [4, this.Application.Solver.ResolveDataPath(context, elementJQuery, sector, mustacheParts, true)];
                    case 3:
                        mustacheData = _a.sent();
                        text = text.replace(mustache, mustacheData);
                        _a.label = 4;
                    case 4:
                        j++;
                        return [3, 2];
                    case 5:
                        if (textOriginal !== text)
                            childNode.nodeValue = text;
                        _a.label = 6;
                    case 6:
                        i++;
                        return [3, 1];
                    case 7: return [2];
                }
            });
        });
    };
    DrapoBarber.prototype.ResolveControlFlowMustacheAttribute = function (context, attribute, elementJQuery, sector) {
        return __awaiter(this, void 0, void 0, function () {
            var jQueryResults, i, el, text, mustaches, j, mustache, mustacheParts, mustacheData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        jQueryResults = elementJQuery.filter("[" + attribute + "*='{{']");
                        if ((jQueryResults == null) || (jQueryResults.length == 0))
                            return [2];
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < jQueryResults.length)) return [3, 7];
                        el = jQueryResults[i];
                        text = el.getAttribute(attribute);
                        mustaches = this.Application.Parser.ParseMustaches(text);
                        j = 0;
                        _a.label = 2;
                    case 2:
                        if (!(j < mustaches.length)) return [3, 5];
                        mustache = mustaches[j];
                        mustacheParts = this.Application.Parser.ParseMustache(mustache);
                        if (!context.CanResolve(mustacheParts[0]))
                            return [3, 4];
                        return [4, this.Application.Solver.ResolveDataPath(context, elementJQuery, sector, mustacheParts, true)];
                    case 3:
                        mustacheData = _a.sent();
                        text = text.replace(mustache, mustacheData);
                        _a.label = 4;
                    case 4:
                        j++;
                        return [3, 2];
                    case 5:
                        if (context.CanUpdateTemplate) {
                            if (this.Application.Parser.HasMustache(text)) {
                                elementJQuery.attr(attribute, text);
                                return [3, 6];
                            }
                        }
                        el.setAttribute(attribute, text);
                        _a.label = 6;
                    case 6:
                        i++;
                        return [3, 1];
                    case 7: return [2];
                }
            });
        });
    };
    DrapoBarber.prototype.ResolveControlFlowMustacheStringFunction = function (sector, context, renderContext, expression, elementJQuery, canBind, type) {
        if (canBind === void 0) { canBind = true; }
        if (type === void 0) { type = DrapoStorageLinkType.Render; }
        return __awaiter(this, void 0, void 0, function () {
            var expressionWithoutFunctions;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.Application.FunctionHandler.ReplaceFunctionExpressions(sector, context, expression, canBind)];
                    case 1:
                        expressionWithoutFunctions = _a.sent();
                        return [2, (this.ResolveControlFlowMustacheString(context, renderContext, expressionWithoutFunctions, elementJQuery, sector, canBind, type))];
                }
            });
        });
    };
    DrapoBarber.prototype.ResolveControlFlowMustacheString = function (context, renderContext, expression, elementJQuery, sector, canBind, type, isForIterator, elementForTemplate) {
        if (canBind === void 0) { canBind = true; }
        if (type === void 0) { type = DrapoStorageLinkType.Render; }
        if (isForIterator === void 0) { isForIterator = false; }
        if (elementForTemplate === void 0) { elementForTemplate = null; }
        return __awaiter(this, void 0, void 0, function () {
            var mustaches, j, mustache, mustacheParts, dataKey, dataFields, mustacheData, contextDataKey, data, el, mustacheData, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        mustaches = this.Application.Parser.ParseMustaches(expression);
                        j = 0;
                        _b.label = 1;
                    case 1:
                        if (!(j < mustaches.length)) return [3, 11];
                        mustache = mustaches[j];
                        mustacheParts = this.Application.Parser.ParseMustache(mustache);
                        dataKey = this.Application.Solver.ResolveDataKey(mustacheParts);
                        dataFields = this.Application.Solver.ResolveDataFields(mustacheParts);
                        if (!this.Application.Storage.IsDataKey(dataKey, sector, renderContext)) return [3, 6];
                        return [4, this.Application.Storage.EnsureDataKeyFieldReady(dataKey, sector, mustacheParts)];
                    case 2:
                        _b.sent();
                        mustacheData = this.Application.Storage.GetDataKeyField(dataKey, sector, mustacheParts);
                        mustacheData = this.Application.Solver.EnsureString(mustacheData);
                        if (!canBind) return [3, 5];
                        if (!isForIterator) return [3, 3];
                        this.Application.Observer.SubscribeLink(dataKey, context.GetDataKeyRoot(), dataFields);
                        return [3, 5];
                    case 3:
                        contextDataKey = new DrapoContext();
                        return [4, this.Application.Storage.RetrieveData(dataKey, sector)];
                    case 4:
                        data = _b.sent();
                        el = elementJQuery != null ? elementJQuery[0] : null;
                        contextDataKey.Create(data, el, null, dataKey, dataKey, null, null);
                        this.Application.Binder.BindReader(contextDataKey.Item, el, dataFields);
                        if ((context != null) && (context.Item != null) && (dataKey !== context.Item.DataKey))
                            this.Application.Observer.SubscribeStorage(dataKey, dataFields, context.Item.DataKey, type);
                        _b.label = 5;
                    case 5:
                        expression = expression.replace(mustache, mustacheData);
                        return [3, 10];
                    case 6:
                        if (!(context.Item === null)) return [3, 7];
                        _a = '';
                        return [3, 9];
                    case 7: return [4, this.Application.Solver.ResolveDataPath(context, elementJQuery, sector, mustacheParts, canBind)];
                    case 8:
                        _a = _b.sent();
                        _b.label = 9;
                    case 9:
                        mustacheData = _a;
                        mustacheData = this.Application.Solver.EnsureString(mustacheData);
                        expression = expression.replace(mustache, mustacheData);
                        _b.label = 10;
                    case 10:
                        j++;
                        return [3, 1];
                    case 11: return [2, (expression)];
                }
            });
        });
    };
    DrapoBarber.prototype.ResolveMustacheElementVisibility = function (el, canBind) {
        if (canBind === void 0) { canBind = true; }
        return __awaiter(this, void 0, void 0, function () {
            var elFor, elIF, sector, context, elj, visibility;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        elFor = el.getAttribute('d-for');
                        if (elFor != null)
                            return [2];
                        elIF = el.getAttribute('d-if');
                        if (elIF == null)
                            return [2];
                        sector = this.Application.Document.GetSector(el);
                        if (this.Application.Barber.HasMustacheContext(elIF, sector))
                            return [2];
                        context = new DrapoContext();
                        elj = $(el);
                        return [4, this.Application.Solver.ResolveConditional(elIF, elj, sector, context)];
                    case 1:
                        visibility = _a.sent();
                        if (visibility)
                            this.Application.Document.Show(elj);
                        else
                            this.Application.Document.Hide(elj);
                        return [2];
                }
            });
        });
    };
    DrapoBarber.prototype.HasMustacheContext = function (expression, sector, renderContext) {
        if (renderContext === void 0) { renderContext = null; }
        var valueCache = this.HasMustacheContextInternal(expression, sector, renderContext);
        return (valueCache);
    };
    DrapoBarber.prototype.HasMustacheContextInternal = function (expression, sector, renderContext) {
        if (renderContext === void 0) { renderContext = null; }
        var mustaches = this.Application.Parser.ParseMustaches(expression, true);
        for (var j = 0; j < mustaches.length; j++) {
            var mustache = mustaches[j];
            var mustacheParts = this.Application.Parser.ParseMustache(mustache);
            var dataKey = this.Application.Solver.ResolveDataKey(mustacheParts);
            var isDataKey = this.Application.Storage.IsDataKey(dataKey, sector, renderContext);
            if (!isDataKey)
                return (true);
        }
        return (false);
    };
    DrapoBarber.prototype.ResolveCloak = function (el, canBind) {
        if (canBind === void 0) { canBind = true; }
        return __awaiter(this, void 0, void 0, function () {
            var elj, elCloak;
            return __generator(this, function (_a) {
                elj = $(el);
                elCloak = el.getAttribute('d-cloak');
                if (elCloak == null)
                    return [2];
                elj.removeClass(elCloak);
                return [2];
            });
        });
    };
    return DrapoBarber;
}());

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
var DrapoAttributeHandler = (function () {
    function DrapoAttributeHandler(application) {
        this._application = application;
    }
    Object.defineProperty(DrapoAttributeHandler.prototype, "Application", {
        get: function () {
            return (this._application);
        },
        enumerable: true,
        configurable: true
    });
    DrapoAttributeHandler.prototype.HasContentIDContext = function (content) {
        return (content.indexOf('d-id') > -1);
    };
    DrapoAttributeHandler.prototype.HasContentAttributeContext = function (content) {
        return (content.indexOf('d-attr') > -1);
    };
    DrapoAttributeHandler.prototype.ResolveAttr = function (el, canBind, canSubscribeDelay, dataKeyFilter, dataFieldFilter) {
        if (canBind === void 0) { canBind = true; }
        if (canSubscribeDelay === void 0) { canSubscribeDelay = true; }
        if (dataKeyFilter === void 0) { dataKeyFilter = null; }
        if (dataFieldFilter === void 0) { dataFieldFilter = null; }
        return __awaiter(this, void 0, void 0, function () {
            var attributes, sector, context, i, attribute, attributeName, attributeValue, attributeType, attributeValueOriginal, isValid;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        attributes = this.ExtractAttr(el);
                        if (attributes.length == 0)
                            return [2];
                        sector = this.Application.Document.GetSector(el);
                        context = new DrapoContext();
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < attributes.length)) return [3, 7];
                        attribute = attributes[i];
                        attributeName = attribute[0];
                        attributeValue = attribute[1];
                        return [4, this.Application.Barber.HasMustacheContext(attributeValue, sector)];
                    case 2:
                        if (_a.sent())
                            return [3, 6];
                        attributeType = attribute[2];
                        attributeValueOriginal = attributeValue;
                        return [4, this.Application.ModelHandler.ResolveValueExpression(context, el, sector, attributeValue, canBind)];
                    case 3:
                        attributeValue = _a.sent();
                        attributeValue = this.ResolveConversionAttributeValue(attributeName, attributeValue);
                        if (attributeValue === attributeValueOriginal)
                            return [3, 6];
                        if (!(attributeType == null)) return [3, 4];
                        el.setAttribute(attributeName, attributeValue);
                        return [3, 6];
                    case 4:
                        if (!(attributeType === 'min')) return [3, 6];
                        return [4, this.Application.Solver.ResolveConditional(attributeValue)];
                    case 5:
                        isValid = _a.sent();
                        if (isValid)
                            el.setAttribute(attributeName, '');
                        else
                            el.removeAttribute(attributeName);
                        _a.label = 6;
                    case 6:
                        i++;
                        return [3, 1];
                    case 7: return [2];
                }
            });
        });
    };
    DrapoAttributeHandler.prototype.ResolveAttrContext = function (context, el, elj, canBind) {
        return __awaiter(this, void 0, void 0, function () {
            var attributes, sector, i, attribute, attributeName, attributeValue, attributeType, attributeValueOriginal, attributeNameFull, isValid;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        attributes = this.ExtractAttr(el);
                        if (attributes.length == 0)
                            return [2];
                        sector = this.Application.Document.GetSector(el);
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < attributes.length)) return [3, 6];
                        attribute = attributes[i];
                        attributeName = attribute[0];
                        attributeValue = attribute[1];
                        attributeType = attribute[2];
                        attributeValueOriginal = attributeValue;
                        return [4, this.Application.ModelHandler.ResolveValueExpression(context, el, sector, attributeValue, canBind)];
                    case 2:
                        attributeValue = _a.sent();
                        attributeValue = this.ResolveConversionAttributeValue(attributeName, attributeValue);
                        if (context.CanUpdateTemplate) {
                            attributeNameFull = 'd-attr-' + attributeName + (attributeType != null ? ('-' + attributeType) : '');
                            if (this.Application.Parser.HasMustache(attributeValue)) {
                                el.setAttribute(attributeNameFull, attributeValue);
                                return [3, 5];
                            }
                            elj.removeAttr(attributeNameFull);
                        }
                        if (attributeValue === attributeValueOriginal)
                            return [3, 5];
                        if (!(attributeType == null)) return [3, 3];
                        el.setAttribute(attributeName, attributeValue);
                        return [3, 5];
                    case 3:
                        if (!(attributeType === 'min')) return [3, 5];
                        return [4, this.Application.Solver.ResolveConditional(attributeValue)];
                    case 4:
                        isValid = _a.sent();
                        if (isValid)
                            el.setAttribute(attributeName, '');
                        else
                            el.removeAttribute(attributeName);
                        _a.label = 5;
                    case 5:
                        i++;
                        return [3, 1];
                    case 6: return [2];
                }
            });
        });
    };
    DrapoAttributeHandler.prototype.ResolveContextValue = function (context, el, elj, sector, isContext, value, canBind, canSubscribeDelay, dataKeyFilter, dataFieldFilter) {
        if (canSubscribeDelay === void 0) { canSubscribeDelay = false; }
        if (dataKeyFilter === void 0) { dataKeyFilter = null; }
        if (dataFieldFilter === void 0) { dataFieldFilter = null; }
        return __awaiter(this, void 0, void 0, function () {
            var valueOriginal, mustaches, j, mustache, mustacheParts, dataKey, isDataKeyContext, dataFields, _a, contextCurrent, data, valueNew;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        valueOriginal = value;
                        mustaches = this.Application.Parser.ParseMustaches(value);
                        j = 0;
                        _b.label = 1;
                    case 1:
                        if (!(j < mustaches.length)) return [3, 9];
                        mustache = mustaches[j];
                        mustacheParts = this.Application.Parser.ParseMustache(mustache);
                        dataKey = this.Application.Solver.ResolveDataKey(mustacheParts);
                        if ((dataKeyFilter != null) && (dataKey != dataKeyFilter))
                            return [3, 8];
                        isDataKeyContext = !this.Application.Storage.IsDataKey(dataKey, sector);
                        if (isDataKeyContext !== isContext)
                            return [3, 8];
                        if ((context !== null) && (!context.CanResolve(dataKey)))
                            return [3, 8];
                        dataFields = this.Application.Solver.ResolveDataFields(mustacheParts);
                        if ((dataFieldFilter != null) && (dataFields[0] != dataFieldFilter))
                            return [3, 8];
                        _a = (isContext);
                        if (_a) return [3, 3];
                        return [4, this.Application.Storage.EnsureDataKeyFieldReady(dataKey, sector, mustacheParts)];
                    case 2:
                        _a = (_b.sent());
                        _b.label = 3;
                    case 3:
                        if (!_a) return [3, 7];
                        contextCurrent = context;
                        if (!(contextCurrent === null)) return [3, 5];
                        contextCurrent = new DrapoContext();
                        return [4, this.Application.Storage.RetrieveData(dataKey, sector)];
                    case 4:
                        data = _b.sent();
                        contextCurrent.Create(data, el, null, dataKey, dataKey, null, null);
                        _b.label = 5;
                    case 5: return [4, this.Application.Solver.ResolveDataPath(contextCurrent, elj, sector, mustacheParts, canBind)];
                    case 6:
                        valueNew = _b.sent();
                        value = value.replace(mustache, valueNew);
                        return [3, 8];
                    case 7:
                        if (canSubscribeDelay) {
                            this.Application.Observer.SubscribeDelay(el, dataKey, dataFields);
                        }
                        _b.label = 8;
                    case 8:
                        j++;
                        return [3, 1];
                    case 9:
                        if (!(valueOriginal !== value)) return [3, 11];
                        return [4, this.ResolveContextValue(context, el, elj, sector, isContext, value, canBind, canSubscribeDelay, null, null)];
                    case 10: return [2, (_b.sent())];
                    case 11: return [2, (value)];
                }
            });
        });
    };
    DrapoAttributeHandler.prototype.ExtractAttr = function (el) {
        var attributes = [];
        for (var i = 0; i < el.attributes.length; i++) {
            var attribute = el.attributes[i];
            var attributeProperty = this.Application.AttributeHandler.ExtractAttrProperty(attribute.nodeName);
            if (attributeProperty != null)
                attributes.push([attributeProperty[0], attribute.nodeValue, attributeProperty[1]]);
        }
        return (attributes);
    };
    DrapoAttributeHandler.prototype.ExtractAttrProperty = function (property) {
        var parse = this.Application.Parser.ParseProperty(property);
        if (parse.length < 3)
            return (null);
        if (parse[0] != 'd')
            return (null);
        if (parse[1].toLowerCase() != 'attr')
            return (null);
        var name = parse[2];
        var type = parse.length > 3 ? parse[3] : null;
        return ([name, type]);
    };
    DrapoAttributeHandler.prototype.ResolveID = function (el, sector, canBind, canSubscribeDelay, dataKeyFilter, dataFieldFilter) {
        if (canBind === void 0) { canBind = true; }
        if (canSubscribeDelay === void 0) { canSubscribeDelay = true; }
        if (dataKeyFilter === void 0) { dataKeyFilter = null; }
        if (dataFieldFilter === void 0) { dataFieldFilter = null; }
        return __awaiter(this, void 0, void 0, function () {
            var elj, did, context, expressionCurrent;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        elj = $(el);
                        did = el.getAttribute('d-id');
                        if (did == null)
                            return [2];
                        return [4, this.Application.Barber.HasMustacheContext(did, sector)];
                    case 1:
                        if (_a.sent())
                            return [2];
                        context = new DrapoContext();
                        return [4, this.Application.Barber.ResolveControlFlowMustacheString(context, null, did, elj, sector, canBind)];
                    case 2:
                        expressionCurrent = _a.sent();
                        if (did !== expressionCurrent)
                            el.setAttribute('d-id', expressionCurrent);
                        return [2];
                }
            });
        });
    };
    DrapoAttributeHandler.prototype.ResolveIDContext = function (context, el, elj, sector, canBind) {
        return __awaiter(this, void 0, void 0, function () {
            var did, expressionCurrent;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        did = el.getAttribute('d-id');
                        if (did == null)
                            return [2];
                        return [4, this.Application.Barber.ResolveControlFlowMustacheString(context, null, did, elj, sector, canBind)];
                    case 1:
                        expressionCurrent = _a.sent();
                        if (did !== expressionCurrent)
                            el.setAttribute('d-id', expressionCurrent);
                        return [2];
                }
            });
        });
    };
    DrapoAttributeHandler.prototype.ResolveConversionAttributeValue = function (name, value) {
        if (name === 'src')
            return (this.ResolveConversionAttributeSourceValue(value));
        return (value);
    };
    DrapoAttributeHandler.prototype.ResolveConversionAttributeSourceValue = function (value) {
        var url = this.Application.Server.ResolveUrl(value);
        var urlEncoded = this.Application.Server.EnsureUrlEncoded(url);
        return (urlEncoded);
    };
    return DrapoAttributeHandler;
}());

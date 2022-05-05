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
var DrapoClassHandler = (function () {
    function DrapoClassHandler(application) {
        this._application = application;
    }
    Object.defineProperty(DrapoClassHandler.prototype, "Application", {
        get: function () {
            return (this._application);
        },
        enumerable: false,
        configurable: true
    });
    DrapoClassHandler.prototype.HasContentClassContext = function (content) {
        return (content.indexOf('d-class') > -1);
    };
    DrapoClassHandler.prototype.ResolveClass = function (el, sector, canBind, canSubscribeDelay, dataKeyFilter, dataFieldFilter, type) {
        if (canBind === void 0) { canBind = true; }
        if (canSubscribeDelay === void 0) { canSubscribeDelay = true; }
        if (dataKeyFilter === void 0) { dataKeyFilter = null; }
        if (dataFieldFilter === void 0) { dataFieldFilter = null; }
        if (type === void 0) { type = DrapoStorageLinkType.Render; }
        return __awaiter(this, void 0, void 0, function () {
            var dClassMustache, elj, context, dClass, _a, classesExpressions, i, classExpression, classMustachesTrue, classTrue, classFalse, _b, expressionMustaches, expressionCurrent, addClass;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        dClassMustache = el.getAttribute('d-class');
                        if (dClassMustache == null)
                            return [2];
                        if (this.Application.Barber.HasMustacheContext(dClassMustache, sector))
                            return [2];
                        elj = $(el);
                        context = new DrapoContext();
                        if (!this.Application.Parser.IsMustacheOnly(dClassMustache)) return [3, 2];
                        return [4, this.Application.Barber.ResolveControlFlowMustacheString(context, null, dClassMustache, elj, sector, canBind)];
                    case 1:
                        _a = _c.sent();
                        return [3, 3];
                    case 2:
                        _a = dClassMustache;
                        _c.label = 3;
                    case 3:
                        dClass = _a;
                        if (this.Application.Barber.HasMustacheContext(dClass, sector))
                            return [2];
                        classesExpressions = this.ExtractClasses(dClass);
                        i = 0;
                        _c.label = 4;
                    case 4:
                        if (!(i < classesExpressions.length)) return [3, 12];
                        classExpression = classesExpressions[i];
                        classMustachesTrue = classExpression[0];
                        return [4, this.Application.Barber.ResolveControlFlowMustacheStringFunction(sector, context, null, classMustachesTrue, elj, canBind, type)];
                    case 5:
                        classTrue = _c.sent();
                        if (!(classExpression[2] != null)) return [3, 7];
                        return [4, this.Application.Barber.ResolveControlFlowMustacheStringFunction(sector, context, null, classExpression[2], elj, canBind, type)];
                    case 6:
                        _b = _c.sent();
                        return [3, 8];
                    case 7:
                        _b = null;
                        _c.label = 8;
                    case 8:
                        classFalse = _b;
                        expressionMustaches = classExpression[1];
                        return [4, this.Application.Barber.ResolveControlFlowMustacheStringFunction(sector, context, null, expressionMustaches, elj, canBind, type)];
                    case 9:
                        expressionCurrent = _c.sent();
                        return [4, this.Application.Solver.ResolveConditional(expressionCurrent)];
                    case 10:
                        addClass = _c.sent();
                        if (addClass) {
                            elj.addClass(classTrue);
                            if (classFalse != null)
                                elj.removeClass(classFalse);
                        }
                        else {
                            elj.removeClass(classTrue);
                            if (classFalse != null)
                                elj.addClass(classFalse);
                        }
                        _c.label = 11;
                    case 11:
                        i++;
                        return [3, 4];
                    case 12: return [2];
                }
            });
        });
    };
    DrapoClassHandler.prototype.ResolveClassContext = function (context, renderContext, el, elj, sector, canBind, type) {
        if (type === void 0) { type = DrapoStorageLinkType.Render; }
        return __awaiter(this, void 0, void 0, function () {
            var dClassMustache, dClass, _a, classesExpressions, i, classExpression, classMustachesTrue, classTrue, classFalse, _b, expressionMustaches, expressionCurrent, addClass;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        dClassMustache = el.getAttribute('d-class');
                        if (dClassMustache == null)
                            return [2];
                        if (!this.Application.Parser.IsMustacheOnly(dClassMustache)) return [3, 2];
                        return [4, this.Application.Barber.ResolveControlFlowMustacheString(context, renderContext, dClassMustache, elj, sector, canBind)];
                    case 1:
                        _a = _c.sent();
                        return [3, 3];
                    case 2:
                        _a = dClassMustache;
                        _c.label = 3;
                    case 3:
                        dClass = _a;
                        classesExpressions = this.ExtractClasses(dClass);
                        i = 0;
                        _c.label = 4;
                    case 4:
                        if (!(i < classesExpressions.length)) return [3, 12];
                        classExpression = classesExpressions[i];
                        classMustachesTrue = classExpression[0];
                        return [4, this.Application.Barber.ResolveControlFlowMustacheStringFunction(sector, context, renderContext, classMustachesTrue, elj, canBind, type)];
                    case 5:
                        classTrue = _c.sent();
                        if (!(classExpression[2] != null)) return [3, 7];
                        return [4, this.Application.Barber.ResolveControlFlowMustacheStringFunction(sector, context, renderContext, classExpression[2], elj, canBind, type)];
                    case 6:
                        _b = _c.sent();
                        return [3, 8];
                    case 7:
                        _b = null;
                        _c.label = 8;
                    case 8:
                        classFalse = _b;
                        expressionMustaches = classExpression[1];
                        return [4, this.Application.Barber.ResolveControlFlowMustacheStringFunction(sector, context, renderContext, expressionMustaches, elj, canBind, type)];
                    case 9:
                        expressionCurrent = _c.sent();
                        return [4, this.Application.Solver.ResolveConditional(expressionCurrent)];
                    case 10:
                        addClass = _c.sent();
                        if (addClass) {
                            elj.addClass(classTrue);
                            if (classFalse != null)
                                elj.removeClass(classFalse);
                        }
                        else {
                            elj.removeClass(classTrue);
                            if (classFalse != null)
                                elj.addClass(classFalse);
                        }
                        _c.label = 11;
                    case 11:
                        i++;
                        return [3, 4];
                    case 12: return [2];
                }
            });
        });
    };
    DrapoClassHandler.prototype.ExtractClasses = function (dClass) {
        var classes = [];
        if (!this.Application.Parser.IsClassArray(dClass))
            return (classes);
        var parsedClasses = this.Application.Parser.ParseClassArray(dClass);
        for (var i = 0; i < parsedClasses.length; i++) {
            var parsedClass = parsedClasses[i];
            var parseClass = this.Application.Parser.ParseClass(parsedClass);
            if (parseClass != null)
                classes.push(parseClass);
        }
        return (classes);
    };
    return DrapoClassHandler;
}());

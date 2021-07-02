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
var DrapoFunctionHandler = (function () {
    function DrapoFunctionHandler(application) {
        this._application = application;
    }
    Object.defineProperty(DrapoFunctionHandler.prototype, "Application", {
        get: function () {
            return (this._application);
        },
        enumerable: true,
        configurable: true
    });
    DrapoFunctionHandler.prototype.ResolveFunctionWithoutContext = function (sector, element, functionsValue, executionContext) {
        if (executionContext === void 0) { executionContext = null; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.ResolveFunction(sector, null, element, null, functionsValue, executionContext, true)];
                    case 1: return [2, (_a.sent())];
                }
            });
        });
    };
    DrapoFunctionHandler.prototype.CreateExecutionContext = function (canReset) {
        if (canReset === void 0) { canReset = true; }
        var executionContext = new DrapoExecutionContext(this.Application);
        executionContext.CanReset = canReset;
        if (canReset)
            this.Application.Server.HasBadRequest = false;
        return (executionContext);
    };
    DrapoFunctionHandler.prototype.FinalizeExecutionContext = function (executionContext) {
        return __awaiter(this, void 0, void 0, function () {
            var windowsAutoClose, i, windowAutoClose;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        windowsAutoClose = executionContext.GetWindowsAutoClose();
                        i = windowsAutoClose.length - 1;
                        _a.label = 1;
                    case 1:
                        if (!(i >= 0)) return [3, 4];
                        windowAutoClose = windowsAutoClose[i];
                        return [4, this.Application.WindowHandler.TryClose(windowAutoClose)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        i--;
                        return [3, 1];
                    case 4: return [2];
                }
            });
        });
    };
    DrapoFunctionHandler.prototype.IsExecutionBroked = function (executionContext) {
        if (executionContext.HasError)
            return (true);
        if (!executionContext.CanReset)
            return (false);
        if (this.Application.Server.HasBadRequest) {
            this.Application.Server.HasBadRequest = false;
            executionContext.HasError = true;
            return (true);
        }
        return (false);
    };
    DrapoFunctionHandler.prototype.ReplaceFunctionExpressions = function (sector, context, expression, canBind) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.ReplaceFunctionExpressionsContext(sector, context, expression, canBind, this.CreateExecutionContext(false))];
                    case 1: return [2, (_a.sent())];
                }
            });
        });
    };
    DrapoFunctionHandler.prototype.ReplaceFunctionExpressionsContext = function (sector, context, expression, canBind, executionContext) {
        return __awaiter(this, void 0, void 0, function () {
            var functionsParsed, i, functionParse, functionParsed, dataPath, data, functionInnerParsed, _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        functionsParsed = this.Application.Parser.ParseFunctions(expression);
                        i = 0;
                        _d.label = 1;
                    case 1:
                        if (!(i < functionsParsed.length)) return [3, 9];
                        functionParse = functionsParsed[i];
                        functionParsed = this.Application.Parser.ParseFunction(functionParse);
                        if (functionParsed === null)
                            return [3, 8];
                        if (!this.Application.Parser.IsMustache(functionParse)) return [3, 4];
                        dataPath = this.Application.Parser.ParseMustache(functionParse);
                        return [4, this.Application.Solver.ResolveItemDataPathObject(sector, context.Item, dataPath)];
                    case 2:
                        data = _d.sent();
                        if ((data == null) || (data == ''))
                            return [3, 8];
                        functionParse = data;
                        return [4, this.ReplaceFunctionExpressionsContext(sector, context, functionParse, canBind, executionContext)];
                    case 3:
                        functionInnerParsed = _d.sent();
                        if (functionInnerParsed === functionParse)
                            return [3, 8];
                        functionParse = functionInnerParsed;
                        expression = expression.replace(functionParse, functionInnerParsed);
                        _d.label = 4;
                    case 4:
                        functionParsed = this.Application.Parser.ParseFunction(functionParse);
                        if (!(functionParsed == null)) return [3, 6];
                        return [4, this.Application.ExceptionHandler.HandleError('DrapoFunctionHandler - ResolveFunction - Invalid Parse - {0}', functionParse)];
                    case 5:
                        _d.sent();
                        return [3, 8];
                    case 6:
                        _b = (_a = expression).replace;
                        _c = [functionParse];
                        return [4, this.ExecuteFunctionContextSwitch(sector, context.Item, null, null, functionParsed, executionContext)];
                    case 7:
                        expression = _b.apply(_a, _c.concat([_d.sent()]));
                        _d.label = 8;
                    case 8:
                        i++;
                        return [3, 1];
                    case 9: return [2, (expression)];
                }
            });
        });
    };
    DrapoFunctionHandler.prototype.ResolveFunction = function (sector, contextItem, element, event, functionsValue, executionContext, forceFinalizeExecutionContext) {
        if (executionContext === void 0) { executionContext = null; }
        if (forceFinalizeExecutionContext === void 0) { forceFinalizeExecutionContext = false; }
        return __awaiter(this, void 0, void 0, function () {
            var created, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        created = false;
                        if (created = executionContext === null) {
                            executionContext = this.CreateExecutionContext();
                        }
                        return [4, this.ResolveFunctionContext(sector, contextItem, element, event, functionsValue, executionContext)];
                    case 1:
                        result = _a.sent();
                        if (!((created) || (forceFinalizeExecutionContext))) return [3, 3];
                        return [4, this.FinalizeExecutionContext(executionContext)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2, (result)];
                }
            });
        });
    };
    DrapoFunctionHandler.prototype.ResolveFunctionContext = function (sector, contextItem, element, event, functionsValue, executionContext) {
        return __awaiter(this, void 0, void 0, function () {
            var result, functionsParsed, i, functionParse, dataPath, data, dataKey, _a, _b, functionParsed, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        result = '';
                        if (this.IsExecutionBroked(executionContext))
                            return [2, (result)];
                        functionsParsed = this.Application.Parser.ParseFunctions(functionsValue);
                        i = 0;
                        _d.label = 1;
                    case 1:
                        if (!(i < functionsParsed.length)) return [3, 14];
                        functionParse = functionsParsed[i];
                        if (functionParse == '')
                            return [3, 13];
                        if (!this.Application.Parser.IsMustache(functionParse)) return [3, 5];
                        dataPath = this.Application.Parser.ParseMustache(functionParse);
                        return [4, this.Application.Solver.ResolveItemDataPathObject(sector, contextItem, dataPath)];
                    case 2:
                        data = _d.sent();
                        if ((data == null) || (data == ''))
                            return [3, 13];
                        dataKey = this.Application.Solver.ResolveDataKey(dataPath);
                        _a = executionContext;
                        return [4, this.Application.Debugger.HasBreakpoint(sector, dataKey)];
                    case 3:
                        _a.HasBreakpoint = _d.sent();
                        executionContext.Sector = sector;
                        executionContext.DataKey = dataKey;
                        _b = result;
                        return [4, this.ResolveFunctionContext(sector, contextItem, element, event, data, executionContext)];
                    case 4:
                        result = _b + (_d.sent());
                        if (this.IsExecutionBroked(executionContext))
                            return [2, (result)];
                        return [3, 13];
                    case 5:
                        functionParsed = this.Application.Parser.ParseFunction(functionParse);
                        if (!(functionParsed == null)) return [3, 7];
                        return [4, this.Application.ExceptionHandler.HandleError('DrapoFunctionHandler - ResolveFunction - Invalid Parse - {0}', functionParse)];
                    case 6:
                        _d.sent();
                        return [3, 13];
                    case 7:
                        if (!executionContext.HasBreakpoint) return [3, 9];
                        return [4, this.Application.Debugger.ActivateBreakpoint(executionContext.Sector, executionContext.DataKey, functionsValue, functionParse, 'before')];
                    case 8:
                        _d.sent();
                        _d.label = 9;
                    case 9:
                        _c = result;
                        return [4, this.ExecuteFunctionContextSwitch(sector, contextItem, element, event, functionParsed, executionContext)];
                    case 10:
                        result = _c + (_d.sent());
                        if (!((executionContext.HasBreakpoint) && (i == (functionsParsed.length - 1)))) return [3, 12];
                        return [4, this.Application.Debugger.ActivateBreakpoint(executionContext.Sector, executionContext.DataKey, functionsValue, functionParse, 'after')];
                    case 11:
                        _d.sent();
                        _d.label = 12;
                    case 12:
                        if (this.IsExecutionBroked(executionContext))
                            return [2, (result)];
                        _d.label = 13;
                    case 13:
                        i++;
                        return [3, 1];
                    case 14: return [4, this.Application.Debugger.CleanRuntime()];
                    case 15:
                        _d.sent();
                        return [2, (result)];
                }
            });
        });
    };
    DrapoFunctionHandler.prototype.ResolveFunctionParameter = function (sector, contextItem, element, executionContext, parameter, canForceLoadDataDelay, canUseReturnFunction, isRecursive) {
        if (canForceLoadDataDelay === void 0) { canForceLoadDataDelay = false; }
        if (canUseReturnFunction === void 0) { canUseReturnFunction = false; }
        if (isRecursive === void 0) { isRecursive = false; }
        return __awaiter(this, void 0, void 0, function () {
            var functionParsed, valueFunction, mustaches, mustache, value, valueReplaceMustache;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!canUseReturnFunction) return [3, 4];
                        functionParsed = this.Application.Parser.ParseFunction(parameter);
                        if (!(functionParsed != null)) return [3, 4];
                        return [4, this.ExecuteFunctionContextSwitch(sector, contextItem, element, null, functionParsed, executionContext)];
                    case 1:
                        valueFunction = _a.sent();
                        if (!isRecursive) return [3, 3];
                        return [4, this.ResolveFunctionParameter(sector, contextItem, element, executionContext, valueFunction)];
                    case 2: return [2, (_a.sent())];
                    case 3: return [2, (valueFunction)];
                    case 4:
                        if (!this.Application.Parser.HasMustache(parameter))
                            return [2, (parameter)];
                        if (this.Application.Parser.HasFunction(parameter))
                            return [2, (parameter)];
                        mustaches = this.Application.Parser.ParseMustaches(parameter);
                        if (mustaches.length == 0)
                            return [2, (parameter)];
                        mustache = this.Application.Parser.ParseMustache(mustaches[0]);
                        return [4, this.Application.Solver.ResolveItemDataPathObject(sector, contextItem, mustache, canForceLoadDataDelay)];
                    case 5:
                        value = _a.sent();
                        if ((!isRecursive) && (parameter === mustaches[0]))
                            return [2, (value)];
                        valueReplaceMustache = parameter.replace(mustaches[0], value);
                        return [4, this.ResolveFunctionParameter(sector, contextItem, element, executionContext, valueReplaceMustache)];
                    case 6: return [2, (_a.sent())];
                }
            });
        });
    };
    DrapoFunctionHandler.prototype.ResolveFunctions = function (sector, contextItem, element, executionContext, value) {
        return __awaiter(this, void 0, void 0, function () {
            var functionsParsed, i, functionText, functionParsed, valueFunction, valueReplaceFunction, mustaches, mustache, mustacheValue, valueReplaceMustache;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        functionsParsed = this.Application.Parser.ParseFunctionsPartial(value);
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < functionsParsed.length)) return [3, 5];
                        functionText = functionsParsed[i];
                        functionParsed = this.Application.Parser.ParseFunction(functionText);
                        if (functionParsed === null)
                            return [3, 4];
                        return [4, this.ExecuteFunctionContextSwitch(sector, contextItem, element, null, functionParsed, executionContext)];
                    case 2:
                        valueFunction = _a.sent();
                        valueReplaceFunction = value.replace(functionText, valueFunction);
                        return [4, this.ResolveFunctions(sector, contextItem, element, executionContext, valueReplaceFunction)];
                    case 3: return [2, (_a.sent())];
                    case 4:
                        i++;
                        return [3, 1];
                    case 5:
                        if (!this.Application.Parser.HasMustache(value))
                            return [2, (value)];
                        mustaches = this.Application.Parser.ParseMustaches(value);
                        if (mustaches.length == 0)
                            return [2, (value)];
                        mustache = this.Application.Parser.ParseMustache(mustaches[0]);
                        return [4, this.Application.Solver.ResolveItemDataPathObject(sector, contextItem, mustache, true)];
                    case 6:
                        mustacheValue = _a.sent();
                        valueReplaceMustache = value.replace(mustaches[0], mustacheValue);
                        return [4, this.ResolveFunctions(sector, contextItem, element, executionContext, valueReplaceMustache)];
                    case 7: return [2, (_a.sent())];
                }
            });
        });
    };
    DrapoFunctionHandler.prototype.ResolveFunctionParameterDataFields = function (sector, contextItem, element, parameter, executionContext) {
        return __awaiter(this, void 0, void 0, function () {
            var value, mustache, dataFields;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.ResolveFunctionParameter(sector, contextItem, element, executionContext, parameter)];
                    case 1:
                        value = _a.sent();
                        if ((value == null) || (value == ''))
                            return [2, (null)];
                        mustache = '{{' + value + '}}';
                        dataFields = this.Application.Parser.ParseMustache(mustache);
                        return [2, (dataFields)];
                }
            });
        });
    };
    DrapoFunctionHandler.prototype.ExecuteFunctionContextSwitch = function (sector, contextItem, element, event, functionParsed, executionContext) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.Application.Debugger.AddFunction(functionParsed);
                        if (functionParsed.Name === 'external')
                            return [2, (this.ExecuteFunctionExternal(contextItem, element, event, functionParsed))];
                        if (!(functionParsed.Name === 'toggleitemfield')) return [3, 2];
                        return [4, this.ExecuteFunctionToggleItemField(sector, contextItem, element, event, functionParsed, executionContext)];
                    case 1: return [2, (_a.sent())];
                    case 2:
                        if (!(functionParsed.Name === 'toggledata')) return [3, 4];
                        return [4, this.ExecuteFunctionToggleData(sector, contextItem, element, event, functionParsed, executionContext)];
                    case 3: return [2, (_a.sent())];
                    case 4:
                        if (!(functionParsed.Name === 'uncheckitemfield')) return [3, 6];
                        return [4, this.ExecuteFunctionUncheckItemField(sector, contextItem, element, event, functionParsed, executionContext)];
                    case 5: return [2, (_a.sent())];
                    case 6:
                        if (!(functionParsed.Name === 'clearitemfield')) return [3, 8];
                        return [4, this.ExecuteFunctionClearItemField(sector, contextItem, element, event, functionParsed, executionContext)];
                    case 7: return [2, (_a.sent())];
                    case 8:
                        if (!(functionParsed.Name === 'updateitemfield')) return [3, 10];
                        return [4, this.ExecuteFunctionUpdateItemField(sector, contextItem, element, event, functionParsed, executionContext)];
                    case 9: return [2, (_a.sent())];
                    case 10:
                        if (!(functionParsed.Name === 'checkdatafield')) return [3, 12];
                        return [4, this.ExecuteFunctionCheckDataField(sector, contextItem, element, event, functionParsed, executionContext)];
                    case 11: return [2, (_a.sent())];
                    case 12:
                        if (!(functionParsed.Name === 'uncheckdatafield')) return [3, 14];
                        return [4, this.ExecuteFunctionUncheckDataField(sector, contextItem, element, event, functionParsed, executionContext)];
                    case 13: return [2, (_a.sent())];
                    case 14:
                        if (!(functionParsed.Name === 'cleardatafield')) return [3, 16];
                        return [4, this.ExecuteFunctionClearDataField(sector, contextItem, element, event, functionParsed, executionContext)];
                    case 15: return [2, (_a.sent())];
                    case 16:
                        if (!(functionParsed.Name === 'updatedatafield')) return [3, 18];
                        return [4, this.ExecuteFunctionUpdateDataField(sector, contextItem, element, event, functionParsed, executionContext)];
                    case 17: return [2, (_a.sent())];
                    case 18:
                        if (!(functionParsed.Name === 'updatedatafieldlookup')) return [3, 20];
                        return [4, this.ExecuteFunctionUpdateDataFieldLookup(sector, contextItem, element, event, functionParsed, executionContext)];
                    case 19: return [2, (_a.sent())];
                    case 20:
                        if (!(functionParsed.Name === 'checkitemfield')) return [3, 22];
                        return [4, this.ExecuteFunctionCheckItemField(sector, contextItem, element, event, functionParsed, executionContext)];
                    case 21: return [2, (_a.sent())];
                    case 22:
                        if (!(functionParsed.Name === 'moveitem')) return [3, 24];
                        return [4, this.ExecuteFunctionMoveItem(sector, contextItem, element, event, functionParsed, executionContext)];
                    case 23: return [2, (_a.sent())];
                    case 24:
                        if (!(functionParsed.Name === 'updatedataurl')) return [3, 26];
                        return [4, this.ExecuteFunctionUpdateDataUrl(sector, contextItem, element, event, functionParsed, executionContext)];
                    case 25: return [2, (_a.sent())];
                    case 26:
                        if (!(functionParsed.Name === 'updatedataurlset')) return [3, 28];
                        return [4, this.ExecuteFunctionUpdateDataUrlSet(sector, contextItem, element, event, functionParsed, executionContext)];
                    case 27: return [2, (_a.sent())];
                    case 28:
                        if (!(functionParsed.Name === 'adddataitem')) return [3, 30];
                        return [4, this.ExecuteFunctionAddDataItem(sector, contextItem, element, event, functionParsed, executionContext)];
                    case 29: return [2, (_a.sent())];
                    case 30:
                        if (!(functionParsed.Name === 'removedataitem')) return [3, 32];
                        return [4, this.ExecuteFunctionRemoveDataItem(sector, contextItem, element, event, functionParsed, executionContext)];
                    case 31: return [2, (_a.sent())];
                    case 32:
                        if (!(functionParsed.Name === 'removedataitemlookup')) return [3, 34];
                        return [4, this.ExecuteFunctionRemoveDataItemLookup(sector, contextItem, element, event, functionParsed, executionContext)];
                    case 33: return [2, (_a.sent())];
                    case 34:
                        if (!(functionParsed.Name === 'containsdataitem')) return [3, 36];
                        return [4, this.ExecuteFunctionContainsDataItem(sector, contextItem, element, event, functionParsed, executionContext)];
                    case 35: return [2, (_a.sent())];
                    case 36:
                        if (!(functionParsed.Name === 'updatesector')) return [3, 38];
                        return [4, this.ExecuteFunctionUpdateSector(sector, contextItem, element, event, functionParsed, executionContext)];
                    case 37: return [2, (_a.sent())];
                    case 38:
                        if (!(functionParsed.Name === 'switchsector')) return [3, 40];
                        return [4, this.ExecuteFunctionSwitchSector(sector, contextItem, element, event, functionParsed, executionContext)];
                    case 39: return [2, (_a.sent())];
                    case 40:
                        if (!(functionParsed.Name === 'reloadsector')) return [3, 42];
                        return [4, this.ExecuteFunctionReloadSector(sector, contextItem, element, event, functionParsed, executionContext)];
                    case 41: return [2, (_a.sent())];
                    case 42:
                        if (!(functionParsed.Name === 'clearsector')) return [3, 44];
                        return [4, this.ExecuteFunctionClearSector(sector, contextItem, element, event, functionParsed, executionContext)];
                    case 43: return [2, (_a.sent())];
                    case 44:
                        if (!(functionParsed.Name === 'loadsectorcontent')) return [3, 46];
                        return [4, this.ExecuteFunctionLoadSectorContent(sector, contextItem, element, event, functionParsed, executionContext)];
                    case 45: return [2, (_a.sent())];
                    case 46:
                        if (!(functionParsed.Name === 'postdata')) return [3, 48];
                        return [4, this.ExecuteFunctionPostData(sector, contextItem, element, event, functionParsed, executionContext)];
                    case 47: return [2, (_a.sent())];
                    case 48:
                        if (!(functionParsed.Name === 'postdataitem')) return [3, 50];
                        return [4, this.ExecuteFunctionPostDataItem(sector, contextItem, element, event, functionParsed, executionContext)];
                    case 49: return [2, (_a.sent())];
                    case 50:
                        if (!(functionParsed.Name === 'cleardata')) return [3, 52];
                        return [4, this.ExecuteFunctionClearData(sector, contextItem, element, event, functionParsed, executionContext)];
                    case 51: return [2, (_a.sent())];
                    case 52:
                        if (!(functionParsed.Name === 'unloaddata')) return [3, 54];
                        return [4, this.ExecuteFunctionUnloadData(sector, contextItem, element, event, functionParsed, executionContext)];
                    case 53: return [2, (_a.sent())];
                    case 54:
                        if (!(functionParsed.Name === 'createdata')) return [3, 56];
                        return [4, this.ExecuteFunctionCreateData(sector, contextItem, element, event, functionParsed, executionContext)];
                    case 55: return [2, (_a.sent())];
                    case 56:
                        if (!(functionParsed.Name === 'updatedata')) return [3, 58];
                        return [4, this.ExecuteFunctionUpdateData(sector, contextItem, element, event, functionParsed, executionContext)];
                    case 57: return [2, (_a.sent())];
                    case 58:
                        if (!(functionParsed.Name === 'reloaddata')) return [3, 60];
                        return [4, this.ExecuteFunctionReloadData(sector, contextItem, element, event, functionParsed, executionContext)];
                    case 59: return [2, (_a.sent())];
                    case 60:
                        if (!(functionParsed.Name === 'filterdata')) return [3, 62];
                        return [4, this.ExecuteFunctionFilterData(sector, contextItem, element, event, functionParsed, executionContext)];
                    case 61: return [2, (_a.sent())];
                    case 62:
                        if (!(functionParsed.Name === 'hasdatachanges')) return [3, 64];
                        return [4, this.ExecuteFunctionHasDataChanges(sector, contextItem, element, event, functionParsed, executionContext)];
                    case 63: return [2, (_a.sent())];
                    case 64:
                        if (!(functionParsed.Name === 'acceptdatachanges')) return [3, 66];
                        return [4, this.ExecuteFunctionAcceptDataChanges(sector, contextItem, element, event, functionParsed, executionContext)];
                    case 65: return [2, (_a.sent())];
                    case 66:
                        if (!(functionParsed.Name === 'reloadpage')) return [3, 68];
                        return [4, this.ExecuteFunctionReloadPage(sector, contextItem, element, event, functionParsed)];
                    case 67: return [2, (_a.sent())];
                    case 68:
                        if (!(functionParsed.Name === 'closepage')) return [3, 70];
                        return [4, this.ExecuteFunctionClosePage(sector, contextItem, element, event, functionParsed)];
                    case 69: return [2, (_a.sent())];
                    case 70:
                        if (!(functionParsed.Name === 'redirectpage')) return [3, 72];
                        return [4, this.ExecuteFunctionRedirectPage(sector, contextItem, element, event, functionParsed, executionContext)];
                    case 71: return [2, (_a.sent())];
                    case 72:
                        if (!(functionParsed.Name === 'updateurl')) return [3, 74];
                        return [4, this.ExecuteFunctionUpdateURL(sector, contextItem, element, event, functionParsed, executionContext)];
                    case 73: return [2, (_a.sent())];
                    case 74:
                        if (!(functionParsed.Name === 'updatetoken')) return [3, 76];
                        return [4, this.ExecuteFunctionUpdateToken(sector, contextItem, element, event, functionParsed, executionContext)];
                    case 75: return [2, (_a.sent())];
                    case 76:
                        if (!(functionParsed.Name === 'cleartoken')) return [3, 78];
                        return [4, this.ExecuteFunctionClearToken(sector, contextItem, element, event, functionParsed, executionContext)];
                    case 77: return [2, (_a.sent())];
                    case 78:
                        if (functionParsed.Name === 'hastoken')
                            return [2, (this.ExecuteFunctionHasToken(sector, contextItem, element, event, functionParsed, executionContext))];
                        if (!(functionParsed.Name === 'destroycontainer')) return [3, 80];
                        return [4, this.ExecuteFunctionDestroyContainer(sector, contextItem, element, event, functionParsed, executionContext)];
                    case 79: return [2, (_a.sent())];
                    case 80:
                        if (!(functionParsed.Name === 'if')) return [3, 82];
                        return [4, this.ExecuteFunctionIf(sector, contextItem, element, event, functionParsed, executionContext)];
                    case 81: return [2, (_a.sent())];
                    case 82:
                        if (!(functionParsed.Name === 'async')) return [3, 84];
                        return [4, this.ExecuteFunctionAsync(sector, contextItem, element, event, functionParsed, executionContext)];
                    case 83: return [2, (_a.sent())];
                    case 84:
                        if (!(functionParsed.Name === 'notify')) return [3, 86];
                        return [4, this.ExecuteFunctionNotify(sector, contextItem, element, event, functionParsed, executionContext)];
                    case 85: return [2, (_a.sent())];
                    case 86:
                        if (!(functionParsed.Name === 'focus')) return [3, 88];
                        return [4, this.ExecuteFunctionFocus(sector, contextItem, element, event, functionParsed, executionContext)];
                    case 87: return [2, (_a.sent())];
                    case 88:
                        if (!(functionParsed.Name === 'showwindow')) return [3, 90];
                        return [4, this.ExecuteFunctionShowWindow(sector, contextItem, element, event, functionParsed, executionContext)];
                    case 89: return [2, (_a.sent())];
                    case 90:
                        if (!(functionParsed.Name === 'closewindow')) return [3, 92];
                        return [4, this.ExecuteFunctionCloseWindow(sector, contextItem, element, event, functionParsed, executionContext)];
                    case 91: return [2, (_a.sent())];
                    case 92:
                        if (!(functionParsed.Name === 'hidewindow')) return [3, 94];
                        return [4, this.ExecuteFunctionHideWindow(sector, contextItem, element, event, functionParsed, executionContext)];
                    case 93: return [2, (_a.sent())];
                    case 94:
                        if (!(functionParsed.Name === 'getwindow')) return [3, 96];
                        return [4, this.ExecuteFunctionGetWindow(sector, contextItem, element, event, functionParsed, executionContext)];
                    case 95: return [2, (_a.sent())];
                    case 96:
                        if (!(functionParsed.Name === 'setexternal')) return [3, 98];
                        return [4, this.ExecuteFunctionSetExternal(sector, contextItem, element, event, functionParsed, executionContext)];
                    case 97: return [2, (_a.sent())];
                    case 98:
                        if (!(functionParsed.Name === 'getexternal')) return [3, 100];
                        return [4, this.ExecuteFunctionGetExternal(sector, contextItem, element, event, functionParsed, executionContext)];
                    case 99: return [2, (_a.sent())];
                    case 100:
                        if (!(functionParsed.Name === 'setexternalframe')) return [3, 102];
                        return [4, this.ExecuteFunctionSetExternalFrame(sector, contextItem, element, event, functionParsed, executionContext)];
                    case 101: return [2, (_a.sent())];
                    case 102:
                        if (!(functionParsed.Name === 'getexternalframe')) return [3, 104];
                        return [4, this.ExecuteFunctionGetExternalFrame(sector, contextItem, element, event, functionParsed, executionContext)];
                    case 103: return [2, (_a.sent())];
                    case 104:
                        if (!(functionParsed.Name === 'setexternalframemessage')) return [3, 106];
                        return [4, this.ExecuteFunctionSetExternalFrameMessage(sector, contextItem, element, event, functionParsed, executionContext)];
                    case 105: return [2, (_a.sent())];
                    case 106:
                        if (!(functionParsed.Name === 'getexternalframemessage')) return [3, 108];
                        return [4, this.ExecuteFunctionGetExternalFrameMessage(sector, contextItem, element, event, functionParsed, executionContext)];
                    case 107: return [2, (_a.sent())];
                    case 108:
                        if (!(functionParsed.Name === 'createguid')) return [3, 110];
                        return [4, this.ExecuteFunctionCreateGuid(sector, contextItem, element, event, functionParsed, executionContext)];
                    case 109: return [2, (_a.sent())];
                    case 110:
                        if (!(functionParsed.Name === 'execute')) return [3, 112];
                        return [4, this.ExecuteFunctionExecute(sector, contextItem, element, event, functionParsed, executionContext)];
                    case 111: return [2, (_a.sent())];
                    case 112:
                        if (!(functionParsed.Name === 'executedataitem')) return [3, 114];
                        return [4, this.ExecuteFunctionExecuteDataItem(sector, contextItem, element, event, functionParsed, executionContext)];
                    case 113: return [2, (_a.sent())];
                    case 114:
                        if (!(functionParsed.Name === 'executecomponentfunction')) return [3, 116];
                        return [4, this.ExecuteFunctionExecuteComponentFunction(sector, contextItem, element, event, functionParsed, executionContext)];
                    case 115: return [2, (_a.sent())];
                    case 116:
                        if (!(functionParsed.Name === 'executeinstancefunction')) return [3, 118];
                        return [4, this.ExecuteFunctionExecuteInstanceFunction(sector, contextItem, element, event, functionParsed, executionContext)];
                    case 117: return [2, (_a.sent())];
                    case 118:
                        if (!(functionParsed.Name === 'cast')) return [3, 120];
                        return [4, this.ExecuteFunctionCast(sector, contextItem, element, event, functionParsed, executionContext)];
                    case 119: return [2, (_a.sent())];
                    case 120:
                        if (!(functionParsed.Name === 'addrequestheader')) return [3, 122];
                        return [4, this.ExecuteFunctionAddRequestHeader(sector, contextItem, element, event, functionParsed, executionContext)];
                    case 121: return [2, (_a.sent())];
                    case 122:
                        if (!(functionParsed.Name === 'getsector')) return [3, 124];
                        return [4, this.ExecuteFunctionGetSector(sector, contextItem, element, event, functionParsed, executionContext)];
                    case 123: return [2, (_a.sent())];
                    case 124:
                        if (!(functionParsed.Name === 'getclipboard')) return [3, 126];
                        return [4, this.ExecuteFunctionGetClipboard(sector, contextItem, element, event, functionParsed, executionContext)];
                    case 125: return [2, (_a.sent())];
                    case 126:
                        if (!(functionParsed.Name === 'setclipboard')) return [3, 128];
                        return [4, this.ExecuteFunctionSetClipboard(sector, contextItem, element, event, functionParsed, executionContext)];
                    case 127: return [2, (_a.sent())];
                    case 128:
                        if (!(functionParsed.Name === 'createtimer')) return [3, 130];
                        return [4, this.ExecuteFunctionCreateTimer(sector, contextItem, element, event, functionParsed, executionContext)];
                    case 129: return [2, (_a.sent())];
                    case 130:
                        if (!(functionParsed.Name === 'createreference')) return [3, 132];
                        return [4, this.ExecuteFunctionCreateReference(sector, contextItem, element, event, functionParsed, executionContext)];
                    case 131: return [2, (_a.sent())];
                    case 132:
                        if (!(functionParsed.Name === 'wait')) return [3, 134];
                        return [4, this.ExecuteFunctionWait(sector, contextItem, element, event, functionParsed, executionContext)];
                    case 133: return [2, (_a.sent())];
                    case 134:
                        if (!(functionParsed.Name === 'executevalidation')) return [3, 136];
                        return [4, this.ExecuteFunctionExecuteValidation(sector, contextItem, element, event, functionParsed, executionContext)];
                    case 135: return [2, (_a.sent())];
                    case 136:
                        if (!(functionParsed.Name === 'clearvalidation')) return [3, 138];
                        return [4, this.ExecuteFunctionClearValidation(sector, contextItem, element, event, functionParsed, executionContext)];
                    case 137: return [2, (_a.sent())];
                    case 138:
                        if (!(functionParsed.Name === 'downloaddata')) return [3, 140];
                        return [4, this.ExecuteFunctionDownloadData(sector, contextItem, element, event, functionParsed, executionContext)];
                    case 139: return [2, (_a.sent())];
                    case 140:
                        if (!(functionParsed.Name === 'detectview')) return [3, 142];
                        return [4, this.ExecuteFunctionDetectView(sector, contextItem, element, event, functionParsed, executionContext)];
                    case 141: return [2, (_a.sent())];
                    case 142:
                        if (!(functionParsed.Name === 'debugger')) return [3, 144];
                        return [4, this.ExecuteFunctionDebugger(sector, contextItem, element, event, functionParsed, executionContext)];
                    case 143: return [2, (_a.sent())];
                    case 144: return [4, this.Application.ExceptionHandler.HandleError('DrapoFunctionHandler - ExecuteFunction - Invalid Function - {0}', functionParsed.Name)];
                    case 145:
                        _a.sent();
                        return [2, ('')];
                }
            });
        });
    };
    DrapoFunctionHandler.prototype.ExecuteFunctionExternal = function (contextItem, element, event, functionParsed) {
        return ('');
    };
    DrapoFunctionHandler.prototype.ExecuteFunctionSetExternal = function (sector, contextItem, element, event, functionParsed, executionContext) {
        return __awaiter(this, void 0, void 0, function () {
            var externalFunction, dataKey, isCloneText, isClone, _a, data, windowFunction;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4, this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[0])];
                    case 1:
                        externalFunction = _b.sent();
                        return [4, this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[1])];
                    case 2:
                        dataKey = _b.sent();
                        return [4, this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[2])];
                    case 3:
                        isCloneText = _b.sent();
                        if (!((isCloneText == null) || (isCloneText == ''))) return [3, 4];
                        _a = false;
                        return [3, 6];
                    case 4: return [4, this.Application.Solver.ResolveConditional(isCloneText)];
                    case 5:
                        _a = _b.sent();
                        _b.label = 6;
                    case 6:
                        isClone = _a;
                        return [4, this.Application.Storage.RetrieveData(dataKey, sector)];
                    case 7:
                        data = _b.sent();
                        windowFunction = window[externalFunction];
                        if (typeof windowFunction !== 'function')
                            return [2, ('')];
                        windowFunction(isClone ? this.Application.Solver.Clone(data, true) : data);
                        return [2];
                }
            });
        });
    };
    DrapoFunctionHandler.prototype.ExecuteFunctionGetExternal = function (sector, contextItem, element, event, functionParsed, executionContext) {
        return __awaiter(this, void 0, void 0, function () {
            var externalFunction, dataKey, isCloneText, isClone, _a, windowFunction, data;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4, this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[0])];
                    case 1:
                        externalFunction = _b.sent();
                        return [4, this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[1])];
                    case 2:
                        dataKey = _b.sent();
                        return [4, this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[2])];
                    case 3:
                        isCloneText = _b.sent();
                        if (!((isCloneText == null) || (isCloneText == ''))) return [3, 4];
                        _a = false;
                        return [3, 6];
                    case 4: return [4, this.Application.Solver.ResolveConditional(isCloneText)];
                    case 5:
                        _a = _b.sent();
                        _b.label = 6;
                    case 6:
                        isClone = _a;
                        windowFunction = window[externalFunction];
                        if (typeof windowFunction !== 'function')
                            return [2, ('')];
                        data = windowFunction();
                        return [4, this.Application.Storage.UpdateData(dataKey, sector, isClone ? this.Application.Solver.Clone(data, true) : data)];
                    case 7:
                        _b.sent();
                        return [2, ('')];
                }
            });
        });
    };
    DrapoFunctionHandler.prototype.ExecuteFunctionSetExternalFrame = function (sector, contextItem, element, event, functionParsed, executionContext) {
        return __awaiter(this, void 0, void 0, function () {
            var frameID, externalFunction, dataKey, isCloneText, isClone, _a, data, frame, frameContent, application, windowFunction;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4, this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[0])];
                    case 1:
                        frameID = _b.sent();
                        return [4, this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[1])];
                    case 2:
                        externalFunction = _b.sent();
                        return [4, this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[2])];
                    case 3:
                        dataKey = _b.sent();
                        return [4, this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[3])];
                    case 4:
                        isCloneText = _b.sent();
                        if (!((isCloneText == null) || (isCloneText == ''))) return [3, 5];
                        _a = false;
                        return [3, 7];
                    case 5: return [4, this.Application.Solver.ResolveConditional(isCloneText)];
                    case 6:
                        _a = _b.sent();
                        _b.label = 7;
                    case 7:
                        isClone = _a;
                        return [4, this.Application.Storage.RetrieveData(dataKey, sector)];
                    case 8:
                        data = _b.sent();
                        frame = document.getElementById(frameID);
                        if (frame == null)
                            return [2, ('')];
                        frameContent = (frame.contentWindow || frame.contentDocument);
                        application = this.Application;
                        windowFunction = frameContent[externalFunction];
                        if (typeof windowFunction !== 'function') {
                            $(frame).on('load', function () {
                                windowFunction = frameContent[externalFunction];
                                if (typeof windowFunction !== 'function')
                                    return ('');
                                $(frame).off('load');
                                windowFunction(isClone ? application.Solver.Clone(data, true) : data);
                            });
                        }
                        else {
                            windowFunction(isClone ? this.Application.Solver.Clone(data, true) : data);
                        }
                        return [2];
                }
            });
        });
    };
    DrapoFunctionHandler.prototype.ExecuteFunctionGetExternalFrame = function (sector, contextItem, element, event, functionParsed, executionContext) {
        return __awaiter(this, void 0, void 0, function () {
            var frameID, externalFunction, dataKey, isCloneText, isClone, _a, frame, frameContent, windowFunction, data;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4, this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[0])];
                    case 1:
                        frameID = _b.sent();
                        return [4, this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[1])];
                    case 2:
                        externalFunction = _b.sent();
                        return [4, this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[2])];
                    case 3:
                        dataKey = _b.sent();
                        return [4, this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[3])];
                    case 4:
                        isCloneText = _b.sent();
                        if (!((isCloneText == null) || (isCloneText == ''))) return [3, 5];
                        _a = false;
                        return [3, 7];
                    case 5: return [4, this.Application.Solver.ResolveConditional(isCloneText)];
                    case 6:
                        _a = _b.sent();
                        _b.label = 7;
                    case 7:
                        isClone = _a;
                        frame = document.getElementById(frameID);
                        if (frame == null)
                            return [2, ('')];
                        frameContent = (frame.contentWindow || frame.contentDocument);
                        windowFunction = frameContent[externalFunction];
                        if (typeof windowFunction !== 'function')
                            return [2, ('')];
                        data = windowFunction();
                        return [4, this.Application.Storage.UpdateData(dataKey, sector, isClone ? this.Application.Solver.Clone(data, true) : data)];
                    case 8:
                        _b.sent();
                        return [2, ('')];
                }
            });
        });
    };
    DrapoFunctionHandler.prototype.ExecuteFunctionSetExternalFrameMessage = function (sector, contextItem, element, event, functionParsed, executionContext) {
        return __awaiter(this, void 0, void 0, function () {
            var frameID, externalFunction, dataKey, isCloneText, isClone, _a, data, frame, frameContent, message;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4, this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[0])];
                    case 1:
                        frameID = _b.sent();
                        return [4, this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[1])];
                    case 2:
                        externalFunction = _b.sent();
                        return [4, this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[2])];
                    case 3:
                        dataKey = _b.sent();
                        return [4, this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[3])];
                    case 4:
                        isCloneText = _b.sent();
                        if (!((isCloneText == null) || (isCloneText == ''))) return [3, 5];
                        _a = false;
                        return [3, 7];
                    case 5: return [4, this.Application.Solver.ResolveConditional(isCloneText)];
                    case 6:
                        _a = _b.sent();
                        _b.label = 7;
                    case 7:
                        isClone = _a;
                        return [4, this.Application.Storage.RetrieveData(dataKey, sector)];
                    case 8:
                        data = _b.sent();
                        frame = document.getElementById(frameID);
                        if (frame == null)
                            return [2, ('')];
                        frameContent = (frame.contentWindow || frame.contentDocument);
                        message = new DrapoMessage();
                        message.Action = 'set';
                        message.DataKey = dataKey;
                        message.Tag = externalFunction;
                        message.Data = isClone ? this.Application.Solver.Clone(data, true) : data;
                        $(frame).on('load', function () {
                            $(frame).off('load');
                            frameContent.postMessage(message, "*");
                        });
                        return [2];
                }
            });
        });
    };
    DrapoFunctionHandler.prototype.ExecuteFunctionGetExternalFrameMessage = function (sector, contextItem, element, event, functionParsed, executionContext) {
        return __awaiter(this, void 0, void 0, function () {
            var frameID, externalFunction, dataKey, isCloneText, isClone, _a, frame, frameContent, message, messagePost, data;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4, this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[0])];
                    case 1:
                        frameID = _b.sent();
                        return [4, this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[1])];
                    case 2:
                        externalFunction = _b.sent();
                        return [4, this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[2])];
                    case 3:
                        dataKey = _b.sent();
                        return [4, this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[3])];
                    case 4:
                        isCloneText = _b.sent();
                        if (!((isCloneText == null) || (isCloneText == ''))) return [3, 5];
                        _a = false;
                        return [3, 7];
                    case 5: return [4, this.Application.Solver.ResolveConditional(isCloneText)];
                    case 6:
                        _a = _b.sent();
                        _b.label = 7;
                    case 7:
                        isClone = _a;
                        frame = document.getElementById(frameID);
                        if (frame == null)
                            return [2, ('')];
                        frameContent = (frame.contentWindow || frame.contentDocument);
                        message = new DrapoMessage();
                        message.Action = 'get';
                        message.DataKey = dataKey;
                        message.Tag = externalFunction;
                        message.Data = null;
                        this.Application.Document.Message = null;
                        frameContent.postMessage(message, "*");
                        return [4, this.Application.Document.WaitForMessage()];
                    case 8:
                        messagePost = _b.sent();
                        data = messagePost != null ? messagePost._data : [];
                        return [4, this.Application.Storage.UpdateData(dataKey, sector, isClone ? this.Application.Solver.Clone(data, true) : data)];
                    case 9:
                        _b.sent();
                        return [2, ('')];
                }
            });
        });
    };
    DrapoFunctionHandler.prototype.ExecuteFunctionToggleItemField = function (sector, contextItem, element, event, functionParsed, executionContext) {
        return __awaiter(this, void 0, void 0, function () {
            var dataPath, notifyText, notify, _a, stateAny, state, stateUpdated;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        dataPath = this.Application.Parser.ParseMustache(functionParsed.Parameters[0]);
                        notifyText = functionParsed.Parameters[1];
                        if (!((notifyText == null) || (notifyText == ''))) return [3, 1];
                        _a = true;
                        return [3, 3];
                    case 1: return [4, this.Application.Solver.ResolveConditional(notifyText)];
                    case 2:
                        _a = _b.sent();
                        _b.label = 3;
                    case 3:
                        notify = _a;
                        return [4, this.Application.Solver.ResolveItemDataPathObject(sector, contextItem, dataPath)];
                    case 4:
                        stateAny = _b.sent();
                        state = this.Application.Solver.ResolveConditionalBoolean(((stateAny == null) || ((typeof stateAny) === 'string')) ? stateAny : stateAny.toString());
                        stateUpdated = !state;
                        return [4, this.Application.Solver.UpdateItemDataPathObject(sector, contextItem, dataPath, stateUpdated, notify)];
                    case 5:
                        _b.sent();
                        return [2, ('')];
                }
            });
        });
    };
    DrapoFunctionHandler.prototype.ExecuteFunctionToggleData = function (sector, contextItem, element, event, functionParsed, executionContext) {
        return __awaiter(this, void 0, void 0, function () {
            var source, isSourceMustache, mustacheParts, dataKey, itemText, item, dataPath, dataItem, itemPath, notifyText, notify, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        source = functionParsed.Parameters[0];
                        isSourceMustache = this.Application.Parser.IsMustache(source);
                        mustacheParts = isSourceMustache ? this.Application.Parser.ParseMustache(source) : null;
                        dataKey = mustacheParts != null ? this.Application.Solver.ResolveDataKey(mustacheParts) : source;
                        itemText = functionParsed.Parameters[1];
                        item = null;
                        if (!this.Application.Parser.IsMustache(itemText)) return [3, 2];
                        dataPath = this.Application.Parser.ParseMustache(itemText);
                        return [4, this.Application.Solver.ResolveItemDataPathObject(sector, contextItem, dataPath)];
                    case 1:
                        item = _b.sent();
                        return [3, 7];
                    case 2:
                        if (!this.Application.Storage.IsDataKey(itemText, sector)) return [3, 4];
                        return [4, this.Application.Storage.RetrieveDataItem(itemText, sector)];
                    case 3:
                        dataItem = _b.sent();
                        if (dataItem != null)
                            item = dataItem.Data;
                        return [3, 7];
                    case 4:
                        if (!(contextItem == null)) return [3, 5];
                        item = itemText;
                        return [3, 7];
                    case 5:
                        itemPath = [];
                        itemPath.push(itemText);
                        return [4, this.Application.Solver.ResolveItemDataPathObject(sector, contextItem, itemPath)];
                    case 6:
                        item = _b.sent();
                        _b.label = 7;
                    case 7:
                        if (item == null)
                            return [2, (null)];
                        notifyText = functionParsed.Parameters[2];
                        if (!((notifyText == null) || (notifyText == ''))) return [3, 8];
                        _a = true;
                        return [3, 10];
                    case 8: return [4, this.Application.Solver.ResolveConditional(notifyText)];
                    case 9:
                        _a = _b.sent();
                        _b.label = 10;
                    case 10:
                        notify = _a;
                        return [4, this.Application.Storage.ToggleData(dataKey, mustacheParts, sector, item, notify)];
                    case 11:
                        _b.sent();
                        return [2, ('')];
                }
            });
        });
    };
    DrapoFunctionHandler.prototype.ExecuteFunctionUncheckItemField = function (sector, contextItem, element, event, functionParsed, executionContext) {
        return __awaiter(this, void 0, void 0, function () {
            var dataPath;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dataPath = this.Application.Parser.ParseMustache(functionParsed.Parameters[0]);
                        return [4, this.Application.Solver.UpdateItemDataPathObject(sector, contextItem, dataPath, false)];
                    case 1:
                        _a.sent();
                        return [2, ('')];
                }
            });
        });
    };
    DrapoFunctionHandler.prototype.ExecuteFunctionClearItemField = function (sector, contextItem, element, event, functionParsed, executionContext) {
        return __awaiter(this, void 0, void 0, function () {
            var dataPath, notifyText, notify, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        dataPath = this.Application.Parser.ParseMustache(functionParsed.Parameters[0]);
                        notifyText = functionParsed.Parameters[1];
                        if (!((notifyText == null) || (notifyText == ''))) return [3, 1];
                        _a = true;
                        return [3, 3];
                    case 1: return [4, this.Application.Solver.ResolveConditional(notifyText)];
                    case 2:
                        _a = _b.sent();
                        _b.label = 3;
                    case 3:
                        notify = _a;
                        return [4, this.Application.Solver.UpdateItemDataPathObject(sector, contextItem, dataPath, null, notify)];
                    case 4:
                        _b.sent();
                        return [2, ('')];
                }
            });
        });
    };
    DrapoFunctionHandler.prototype.ExecuteFunctionUpdateItemField = function (sector, contextItem, element, event, functionParsed, executionContext) {
        return __awaiter(this, void 0, void 0, function () {
            var dataPath, recursiveText, _a, recursive, _b, resolveText, _c, resolve, _d, item, _e, notifyText, notify, _f;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        dataPath = this.Application.Parser.ParseMustache(functionParsed.Parameters[0]);
                        if (!(functionParsed.Parameters.length > 3)) return [3, 2];
                        return [4, this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[3])];
                    case 1:
                        _a = _g.sent();
                        return [3, 3];
                    case 2:
                        _a = null;
                        _g.label = 3;
                    case 3:
                        recursiveText = _a;
                        if (!((recursiveText == null) || (recursiveText == ''))) return [3, 4];
                        _b = false;
                        return [3, 6];
                    case 4: return [4, this.Application.Solver.ResolveConditional(recursiveText)];
                    case 5:
                        _b = _g.sent();
                        _g.label = 6;
                    case 6:
                        recursive = _b;
                        if (!(functionParsed.Parameters.length > 4)) return [3, 8];
                        return [4, this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[4])];
                    case 7:
                        _c = _g.sent();
                        return [3, 9];
                    case 8:
                        _c = null;
                        _g.label = 9;
                    case 9:
                        resolveText = _c;
                        if (!((resolveText == null) || (resolveText == ''))) return [3, 10];
                        _d = true;
                        return [3, 12];
                    case 10: return [4, this.Application.Solver.ResolveConditional(resolveText)];
                    case 11:
                        _d = _g.sent();
                        _g.label = 12;
                    case 12:
                        resolve = _d;
                        if (!resolve) return [3, 14];
                        return [4, this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[1], true, true, recursive)];
                    case 13:
                        _e = _g.sent();
                        return [3, 15];
                    case 14:
                        _e = functionParsed.Parameters[1];
                        _g.label = 15;
                    case 15:
                        item = _e;
                        notifyText = functionParsed.Parameters[2];
                        if (!((notifyText == null) || (notifyText == ''))) return [3, 16];
                        _f = true;
                        return [3, 18];
                    case 16: return [4, this.Application.Solver.ResolveConditional(notifyText)];
                    case 17:
                        _f = _g.sent();
                        _g.label = 18;
                    case 18:
                        notify = _f;
                        return [4, this.Application.Solver.UpdateItemDataPathObject(sector, contextItem, dataPath, item, notify)];
                    case 19:
                        _g.sent();
                        return [2, ('')];
                }
            });
        });
    };
    DrapoFunctionHandler.prototype.ExecuteFunctionCheckDataField = function (sector, contextItem, element, event, functionParsed, executionContext) {
        return __awaiter(this, void 0, void 0, function () {
            var dataKey, dataFields, notifyText, notify, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        dataKey = functionParsed.Parameters[0];
                        return [4, this.ResolveFunctionParameterDataFields(sector, contextItem, element, functionParsed.Parameters[1], executionContext)];
                    case 1:
                        dataFields = _b.sent();
                        notifyText = functionParsed.Parameters[2];
                        if (!((notifyText == null) || (notifyText == ''))) return [3, 2];
                        _a = true;
                        return [3, 4];
                    case 2: return [4, this.Application.Solver.ResolveConditional(notifyText)];
                    case 3:
                        _a = _b.sent();
                        _b.label = 4;
                    case 4:
                        notify = _a;
                        return [4, this.Application.Storage.SetDataKeyField(dataKey, sector, dataFields, true, notify)];
                    case 5:
                        _b.sent();
                        return [2, ('')];
                }
            });
        });
    };
    DrapoFunctionHandler.prototype.ExecuteFunctionUncheckDataField = function (sector, contextItem, element, event, functionParsed, executionContext) {
        return __awaiter(this, void 0, void 0, function () {
            var dataKey, dataFields, notifyText, notify, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        dataKey = functionParsed.Parameters[0];
                        return [4, this.ResolveFunctionParameterDataFields(sector, contextItem, element, functionParsed.Parameters[1], executionContext)];
                    case 1:
                        dataFields = _b.sent();
                        notifyText = functionParsed.Parameters[2];
                        if (!((notifyText == null) || (notifyText == ''))) return [3, 2];
                        _a = true;
                        return [3, 4];
                    case 2: return [4, this.Application.Solver.ResolveConditional(notifyText)];
                    case 3:
                        _a = _b.sent();
                        _b.label = 4;
                    case 4:
                        notify = _a;
                        return [4, this.Application.Storage.SetDataKeyField(dataKey, sector, dataFields, false, notify)];
                    case 5:
                        _b.sent();
                        return [2, ('')];
                }
            });
        });
    };
    DrapoFunctionHandler.prototype.ExecuteFunctionClearDataField = function (sector, contextItem, element, event, functionParsed, executionContext) {
        return __awaiter(this, void 0, void 0, function () {
            var dataKey, dataFields, notifyText, notify, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        dataKey = functionParsed.Parameters[0];
                        return [4, this.ResolveFunctionParameterDataFields(sector, contextItem, element, functionParsed.Parameters[1], executionContext)];
                    case 1:
                        dataFields = _b.sent();
                        notifyText = functionParsed.Parameters[2];
                        if (!((notifyText == null) || (notifyText == ''))) return [3, 2];
                        _a = true;
                        return [3, 4];
                    case 2: return [4, this.Application.Solver.ResolveConditional(notifyText)];
                    case 3:
                        _a = _b.sent();
                        _b.label = 4;
                    case 4:
                        notify = _a;
                        return [4, this.Application.Storage.SetDataKeyField(dataKey, sector, dataFields, null, notify)];
                    case 5:
                        _b.sent();
                        return [2, ('')];
                }
            });
        });
    };
    DrapoFunctionHandler.prototype.ExecuteFunctionUpdateDataField = function (sector, contextItem, element, event, functionParsed, executionContext) {
        return __awaiter(this, void 0, void 0, function () {
            var dataKey, dataFields, recursiveText, _a, recursive, _b, resolveText, _c, resolve, _d, value, _e, notifyText, _f, notify, _g;
            return __generator(this, function (_h) {
                switch (_h.label) {
                    case 0: return [4, this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[0])];
                    case 1:
                        dataKey = _h.sent();
                        return [4, this.ResolveFunctionParameterDataFields(sector, contextItem, element, functionParsed.Parameters[1], executionContext)];
                    case 2:
                        dataFields = _h.sent();
                        if (!(functionParsed.Parameters.length > 4)) return [3, 4];
                        return [4, this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[4])];
                    case 3:
                        _a = _h.sent();
                        return [3, 5];
                    case 4:
                        _a = null;
                        _h.label = 5;
                    case 5:
                        recursiveText = _a;
                        if (!((recursiveText == null) || (recursiveText == ''))) return [3, 6];
                        _b = false;
                        return [3, 8];
                    case 6: return [4, this.Application.Solver.ResolveConditional(recursiveText)];
                    case 7:
                        _b = _h.sent();
                        _h.label = 8;
                    case 8:
                        recursive = _b;
                        if (!(functionParsed.Parameters.length > 5)) return [3, 10];
                        return [4, this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[5])];
                    case 9:
                        _c = _h.sent();
                        return [3, 11];
                    case 10:
                        _c = null;
                        _h.label = 11;
                    case 11:
                        resolveText = _c;
                        if (!((resolveText == null) || (resolveText == ''))) return [3, 12];
                        _d = true;
                        return [3, 14];
                    case 12: return [4, this.Application.Solver.ResolveConditional(resolveText)];
                    case 13:
                        _d = _h.sent();
                        _h.label = 14;
                    case 14:
                        resolve = _d;
                        if (!resolve) return [3, 16];
                        return [4, this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[2], true, true, recursive)];
                    case 15:
                        _e = _h.sent();
                        return [3, 17];
                    case 16:
                        _e = functionParsed.Parameters[2];
                        _h.label = 17;
                    case 17:
                        value = _e;
                        if (!(functionParsed.Parameters.length > 3)) return [3, 19];
                        return [4, this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[3])];
                    case 18:
                        _f = _h.sent();
                        return [3, 20];
                    case 19:
                        _f = null;
                        _h.label = 20;
                    case 20:
                        notifyText = _f;
                        if (!((notifyText == null) || (notifyText == ''))) return [3, 21];
                        _g = true;
                        return [3, 23];
                    case 21: return [4, this.Application.Solver.ResolveConditional(notifyText)];
                    case 22:
                        _g = _h.sent();
                        _h.label = 23;
                    case 23:
                        notify = _g;
                        return [4, this.Application.Storage.SetDataKeyField(dataKey, sector, dataFields, value, notify)];
                    case 24:
                        _h.sent();
                        return [2, ('')];
                }
            });
        });
    };
    DrapoFunctionHandler.prototype.ExecuteFunctionUpdateDataFieldLookup = function (sector, contextItem, element, event, functionParsed, executionContext) {
        return __awaiter(this, void 0, void 0, function () {
            var dataKey, dataFieldSeek, valueSeek, dataField, valueText, value, dataPath, notifyText, _a, notify, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4, this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[0])];
                    case 1:
                        dataKey = _c.sent();
                        return [4, this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[1])];
                    case 2:
                        dataFieldSeek = _c.sent();
                        return [4, this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[2])];
                    case 3:
                        valueSeek = _c.sent();
                        return [4, this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[3])];
                    case 4:
                        dataField = _c.sent();
                        valueText = functionParsed.Parameters[4];
                        value = null;
                        if (!this.Application.Parser.IsMustache(valueText)) return [3, 6];
                        dataPath = this.Application.Parser.ParseMustache(valueText);
                        return [4, this.Application.Solver.ResolveItemDataPathObject(sector, contextItem, dataPath)];
                    case 5:
                        value = _c.sent();
                        return [3, 7];
                    case 6:
                        value = valueText;
                        _c.label = 7;
                    case 7:
                        if (!(functionParsed.Parameters.length > 3)) return [3, 9];
                        return [4, this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[5])];
                    case 8:
                        _a = _c.sent();
                        return [3, 10];
                    case 9:
                        _a = null;
                        _c.label = 10;
                    case 10:
                        notifyText = _a;
                        if (!((notifyText == null) || (notifyText == ''))) return [3, 11];
                        _b = true;
                        return [3, 13];
                    case 11: return [4, this.Application.Solver.ResolveConditional(notifyText)];
                    case 12:
                        _b = _c.sent();
                        _c.label = 13;
                    case 13:
                        notify = _b;
                        return [4, this.Application.Storage.UpdateDataFieldLookup(dataKey, sector, dataFieldSeek, valueSeek, dataField, value, notify)];
                    case 14:
                        _c.sent();
                        return [2, ('')];
                }
            });
        });
    };
    DrapoFunctionHandler.prototype.ExecuteFunctionCheckItemField = function (sector, contextItem, element, event, functionParsed, executionContext) {
        return __awaiter(this, void 0, void 0, function () {
            var dataPath, notifyText, nofity, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        dataPath = this.Application.Parser.ParseMustache(functionParsed.Parameters[0]);
                        notifyText = functionParsed.Parameters[1];
                        if (!((notifyText == null) || (notifyText == ''))) return [3, 1];
                        _a = true;
                        return [3, 3];
                    case 1: return [4, this.Application.Solver.ResolveConditional(notifyText)];
                    case 2:
                        _a = _b.sent();
                        _b.label = 3;
                    case 3:
                        nofity = _a;
                        return [4, this.Application.Solver.UpdateItemDataPathObject(sector, contextItem, dataPath, true, nofity)];
                    case 4:
                        _b.sent();
                        return [2, ('')];
                }
            });
        });
    };
    DrapoFunctionHandler.prototype.ExecuteFunctionMoveItem = function (sector, contextItem, element, event, functionParsed, executionContext) {
        return __awaiter(this, void 0, void 0, function () {
            var key, rangeIndex, notifyText, notify, _a, dataItem, index;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4, this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[0])];
                    case 1:
                        key = _b.sent();
                        return [4, this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[1])];
                    case 2:
                        rangeIndex = _b.sent();
                        notifyText = functionParsed.Parameters[2];
                        if (!((notifyText == null) || (notifyText == ''))) return [3, 3];
                        _a = true;
                        return [3, 5];
                    case 3: return [4, this.Application.Solver.ResolveConditional(notifyText)];
                    case 4:
                        _a = _b.sent();
                        _b.label = 5;
                    case 5:
                        notify = _a;
                        return [4, this.Application.Storage.RetrieveDataItem(contextItem.DataKey, sector)];
                    case 6:
                        dataItem = _b.sent();
                        if (dataItem == null)
                            return [2, ('')];
                        index = this.Application.ControlFlow.GetRangeIndex(dataItem.Data, rangeIndex);
                        return [4, this.Application.Storage.MoveDataIndex(contextItem.DataKey, sector, contextItem.Data, index, notify)];
                    case 7:
                        _b.sent();
                        return [2, ('')];
                }
            });
        });
    };
    DrapoFunctionHandler.prototype.ExecuteFunctionUpdateDataUrl = function (sector, contextItem, element, event, functionParsed, executionContext) {
        return __awaiter(this, void 0, void 0, function () {
            var dataKey, dataUrl, jqueryDataKeys, dataUrlCurrent;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dataKey = functionParsed.Parameters[0];
                        dataUrl = functionParsed.Parameters[1];
                        jqueryDataKeys = $("[d-dataKey='" + dataKey + "']");
                        if ((jqueryDataKeys == null) || (jqueryDataKeys.length == 0))
                            return [2, ('')];
                        dataUrlCurrent = jqueryDataKeys.attr('d-dataUrlGet');
                        if (dataUrl === dataUrlCurrent)
                            return [2, ('')];
                        jqueryDataKeys.attr('d-dataUrlGet', dataUrl);
                        this.Application.Storage.DiscardCacheData(dataKey, sector);
                        return [4, this.Application.Observer.Notify(dataKey, null, null)];
                    case 1:
                        _a.sent();
                        return [2, ('')];
                }
            });
        });
    };
    DrapoFunctionHandler.prototype.ExecuteFunctionUpdateDataUrlSet = function (sector, contextItem, element, event, functionParsed, executionContext) {
        return __awaiter(this, void 0, void 0, function () {
            var dataKey, dataUrl, jqueryDataKeys, dataUrlCurrent;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dataKey = functionParsed.Parameters[0];
                        return [4, this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[1])];
                    case 1:
                        dataUrl = _a.sent();
                        jqueryDataKeys = $("[d-dataKey='" + dataKey + "']");
                        if ((jqueryDataKeys == null) || (jqueryDataKeys.length == 0))
                            return [2, ('')];
                        dataUrlCurrent = jqueryDataKeys.attr('d-dataUrlSet');
                        if (dataUrl === dataUrlCurrent)
                            return [2, ('')];
                        jqueryDataKeys.attr('d-dataUrlSet', dataUrl);
                        this.Application.Storage.DiscardCacheData(dataKey, sector);
                        return [2, ('')];
                }
            });
        });
    };
    DrapoFunctionHandler.prototype.ExecuteFunctionAddDataItem = function (sector, contextItem, element, event, functionParsed, executionContext) {
        return __awaiter(this, void 0, void 0, function () {
            var source, isSourceMustache, mustacheParts, dataKey, itemText, item, dataPath, dataItem, itemPath, notifyText, notify, _a, isCloneText, isClone, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        source = functionParsed.Parameters[0];
                        isSourceMustache = this.Application.Parser.IsMustache(source);
                        mustacheParts = isSourceMustache ? this.Application.Parser.ParseMustache(source) : null;
                        dataKey = mustacheParts != null ? this.Application.Solver.ResolveDataKey(mustacheParts) : source;
                        itemText = functionParsed.Parameters[1];
                        item = null;
                        if (!this.Application.Parser.IsMustache(itemText)) return [3, 2];
                        dataPath = this.Application.Parser.ParseMustache(itemText);
                        return [4, this.Application.Solver.ResolveItemDataPathObject(sector, contextItem, dataPath)];
                    case 1:
                        item = _c.sent();
                        return [3, 7];
                    case 2:
                        if (!this.Application.Storage.IsDataKey(itemText, sector)) return [3, 4];
                        return [4, this.Application.Storage.RetrieveDataItem(itemText, sector)];
                    case 3:
                        dataItem = _c.sent();
                        if (dataItem != null)
                            item = dataItem.Data;
                        return [3, 7];
                    case 4:
                        if (!(contextItem == null)) return [3, 5];
                        item = itemText;
                        return [3, 7];
                    case 5:
                        itemPath = [];
                        itemPath.push(itemText);
                        return [4, this.Application.Solver.ResolveItemDataPathObject(sector, contextItem, itemPath)];
                    case 6:
                        item = _c.sent();
                        _c.label = 7;
                    case 7:
                        if (item == null)
                            return [2, (null)];
                        notifyText = functionParsed.Parameters[2];
                        if (!((notifyText == null) || (notifyText == ''))) return [3, 8];
                        _a = true;
                        return [3, 10];
                    case 8: return [4, this.Application.Solver.ResolveConditional(notifyText)];
                    case 9:
                        _a = _c.sent();
                        _c.label = 10;
                    case 10:
                        notify = _a;
                        isCloneText = functionParsed.Parameters[3];
                        if (!((isCloneText == null) || (isCloneText == ''))) return [3, 11];
                        _b = true;
                        return [3, 13];
                    case 11: return [4, this.Application.Solver.ResolveConditional(isCloneText)];
                    case 12:
                        _b = _c.sent();
                        _c.label = 13;
                    case 13:
                        isClone = _b;
                        return [4, this.Application.Storage.AddDataItem(dataKey, mustacheParts, sector, isClone ? this.Application.Solver.Clone(item) : item, notify)];
                    case 14:
                        _c.sent();
                        return [2];
                }
            });
        });
    };
    DrapoFunctionHandler.prototype.ExecuteFunctionRemoveDataItem = function (sector, contextItem, element, event, functionParsed, executionContext) {
        return __awaiter(this, void 0, void 0, function () {
            var source, isSourceMustache, mustacheParts, dataKey, itemText, itemPath, item, notifyText, nofity, _a, deleted;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        source = functionParsed.Parameters[0];
                        isSourceMustache = this.Application.Parser.IsMustache(source);
                        mustacheParts = isSourceMustache ? this.Application.Parser.ParseMustache(source) : null;
                        dataKey = mustacheParts != null ? this.Application.Solver.ResolveDataKey(mustacheParts) : source;
                        itemText = functionParsed.Parameters[1];
                        itemPath = [];
                        if (this.Application.Parser.IsMustache(itemText)) {
                            itemPath = this.Application.Parser.ParseMustache(itemText);
                        }
                        else {
                            itemPath.push(itemText);
                        }
                        return [4, this.Application.Solver.ResolveItemDataPathObject(sector, contextItem, itemPath)];
                    case 1:
                        item = _b.sent();
                        if (item == null)
                            return [2, (null)];
                        notifyText = functionParsed.Parameters[2];
                        if (!((notifyText == null) || (notifyText == ''))) return [3, 2];
                        _a = true;
                        return [3, 4];
                    case 2: return [4, this.Application.Solver.ResolveConditional(notifyText)];
                    case 3:
                        _a = _b.sent();
                        _b.label = 4;
                    case 4:
                        nofity = _a;
                        return [4, this.Application.Storage.DeleteDataItem(dataKey, mustacheParts, sector, item)];
                    case 5:
                        deleted = _b.sent();
                        if (!deleted)
                            return [2, (null)];
                        if (!nofity) return [3, 7];
                        return [4, this.Application.Observer.Notify(dataKey, null, null)];
                    case 6:
                        _b.sent();
                        _b.label = 7;
                    case 7: return [2];
                }
            });
        });
    };
    DrapoFunctionHandler.prototype.ExecuteFunctionRemoveDataItemLookup = function (sector, contextItem, element, event, functionParsed, executionContext) {
        return __awaiter(this, void 0, void 0, function () {
            var dataKey, dataFieldSeek, valueSeek, notifyText, _a, notify, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4, this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[0])];
                    case 1:
                        dataKey = _c.sent();
                        return [4, this.ResolveFunctionParameterDataFields(sector, contextItem, element, functionParsed.Parameters[1], executionContext)];
                    case 2:
                        dataFieldSeek = _c.sent();
                        return [4, this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[2])];
                    case 3:
                        valueSeek = _c.sent();
                        if (!(functionParsed.Parameters.length > 3)) return [3, 5];
                        return [4, this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[3])];
                    case 4:
                        _a = _c.sent();
                        return [3, 6];
                    case 5:
                        _a = null;
                        _c.label = 6;
                    case 6:
                        notifyText = _a;
                        if (!((notifyText == null) || (notifyText == ''))) return [3, 7];
                        _b = true;
                        return [3, 9];
                    case 7: return [4, this.Application.Solver.ResolveConditional(notifyText)];
                    case 8:
                        _b = _c.sent();
                        _c.label = 9;
                    case 9:
                        notify = _b;
                        return [4, this.Application.Storage.RemoveDataItemLookup(dataKey, sector, dataFieldSeek, valueSeek, notify)];
                    case 10:
                        _c.sent();
                        return [2, ('')];
                }
            });
        });
    };
    DrapoFunctionHandler.prototype.ExecuteFunctionContainsDataItem = function (sector, contextItem, element, event, functionParsed, executionContext) {
        return __awaiter(this, void 0, void 0, function () {
            var dataItemText, dataItemPath, item, dataContainerText, dataContainerPath, dataKeyContainer, storageItem, contextContainer, i, dataContainer, containerItem, itemContainer;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dataItemText = functionParsed.Parameters[1];
                        dataItemPath = [];
                        if (this.Application.Parser.IsMustache(dataItemText)) {
                            dataItemPath = this.Application.Parser.ParseMustache(dataItemText);
                        }
                        else {
                            dataItemPath.push(dataItemText);
                        }
                        return [4, this.Application.Solver.ResolveItemDataPathObject(sector, contextItem, dataItemPath)];
                    case 1:
                        item = _a.sent();
                        dataContainerText = functionParsed.Parameters[0];
                        dataContainerPath = [];
                        if (this.Application.Parser.IsMustache(dataContainerText)) {
                            dataContainerPath = this.Application.Parser.ParseMustache(dataContainerText);
                        }
                        else {
                            dataContainerPath.push(dataContainerText);
                        }
                        dataKeyContainer = dataContainerPath[0];
                        return [4, this.Application.Storage.RetrieveDataItem(dataKeyContainer, sector)];
                    case 2:
                        storageItem = _a.sent();
                        if (storageItem == null)
                            return [2, ('false')];
                        contextContainer = new DrapoContext();
                        i = 0;
                        _a.label = 3;
                    case 3:
                        if (!(i < storageItem.Data.length)) return [3, 6];
                        dataContainer = storageItem.Data[i];
                        containerItem = contextContainer.Create(dataContainer, null, null, dataKeyContainer, dataKeyContainer, null, i);
                        return [4, this.Application.Solver.ResolveItemDataPathObject(sector, containerItem, dataContainerPath)];
                    case 4:
                        itemContainer = _a.sent();
                        if (item == itemContainer)
                            return [2, ('true')];
                        _a.label = 5;
                    case 5:
                        i++;
                        return [3, 3];
                    case 6: return [2, ('false')];
                }
            });
        });
    };
    DrapoFunctionHandler.prototype.ExecuteFunctionUpdateSector = function (sector, contextItem, element, event, functionParsed, executionContext) {
        return __awaiter(this, void 0, void 0, function () {
            var title, canRouteText, canRoute, _a, canLoadDefaultSectorsText, canLoadDefaultSectors, _b, containerText, container, dataPath, item, sectorName, url;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        title = null;
                        if (!(functionParsed.Parameters.length >= 3)) return [3, 2];
                        return [4, this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[2])];
                    case 1:
                        title = _c.sent();
                        _c.label = 2;
                    case 2:
                        canRouteText = functionParsed.Parameters[3];
                        if (!((canRouteText == null) || (canRouteText == ''))) return [3, 3];
                        _a = true;
                        return [3, 5];
                    case 3: return [4, this.Application.Solver.ResolveConditional(canRouteText)];
                    case 4:
                        _a = _c.sent();
                        _c.label = 5;
                    case 5:
                        canRoute = _a;
                        canLoadDefaultSectorsText = functionParsed.Parameters.length >= 4 ? functionParsed.Parameters[4] : null;
                        if (!((canLoadDefaultSectorsText == null) || (canLoadDefaultSectorsText == ''))) return [3, 6];
                        _b = false;
                        return [3, 8];
                    case 6: return [4, this.Application.Solver.ResolveConditional(canLoadDefaultSectorsText)];
                    case 7:
                        _b = _c.sent();
                        _c.label = 8;
                    case 8:
                        canLoadDefaultSectors = _b;
                        containerText = functionParsed.Parameters.length >= 5 ? functionParsed.Parameters[5] : null;
                        container = null;
                        if (!(containerText !== null)) return [3, 13];
                        if (!this.Application.Parser.IsMustache(containerText)) return [3, 12];
                        dataPath = this.Application.Parser.ParseMustache(containerText);
                        return [4, this.Application.Solver.ResolveItemDataPathObject(sector, contextItem, dataPath)];
                    case 9:
                        item = _c.sent();
                        if (!((item === null) || (item === ''))) return [3, 11];
                        item = this.Application.Document.CreateGuid();
                        return [4, this.Application.Solver.UpdateItemDataPathObject(sector, contextItem, dataPath, item)];
                    case 10:
                        _c.sent();
                        _c.label = 11;
                    case 11:
                        container = item.toString();
                        return [3, 13];
                    case 12:
                        container = containerText;
                        _c.label = 13;
                    case 13: return [4, this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[0])];
                    case 14:
                        sectorName = _c.sent();
                        return [4, this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[1])];
                    case 15:
                        url = _c.sent();
                        this.Application.Document.StartUpdate(sectorName);
                        return [4, this.Application.Document.LoadChildSector(sectorName, url, title, canRoute, canLoadDefaultSectors, container)];
                    case 16:
                        _c.sent();
                        return [2, ('')];
                }
            });
        });
    };
    DrapoFunctionHandler.prototype.ExecuteFunctionSwitchSector = function (sector, contextItem, element, event, functionParsed, executionContext) {
        return __awaiter(this, void 0, void 0, function () {
            var sectorName, container;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[0])];
                    case 1:
                        sectorName = _a.sent();
                        return [4, this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[1])];
                    case 2:
                        container = _a.sent();
                        return [4, this.Application.SectorContainerHandler.Switch(sectorName, container)];
                    case 3:
                        _a.sent();
                        return [2, ('')];
                }
            });
        });
    };
    DrapoFunctionHandler.prototype.ExecuteFunctionReloadSector = function (sector, contextItem, element, event, functionParsed, executionContext) {
        return __awaiter(this, void 0, void 0, function () {
            var sectorName, url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[0])];
                    case 1:
                        sectorName = _a.sent();
                        url = this.Application.Router.GetLastRouteUrlBySector(sectorName);
                        if (url == null)
                            return [2, ('')];
                        this.Application.Document.StartUpdate(sectorName);
                        return [4, this.Application.Document.LoadChildSector(sectorName, url)];
                    case 2:
                        _a.sent();
                        return [2, ('')];
                }
            });
        });
    };
    DrapoFunctionHandler.prototype.ExecuteFunctionClearSector = function (sector, contextItem, element, event, functionParsed, executionContext) {
        return __awaiter(this, void 0, void 0, function () {
            var sectorName;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[0])];
                    case 1:
                        sectorName = _a.sent();
                        this.Application.Document.StartUpdate(sectorName);
                        return [4, this.Application.SectorContainerHandler.Switch(sectorName, null)];
                    case 2:
                        _a.sent();
                        return [2, ('')];
                }
            });
        });
    };
    DrapoFunctionHandler.prototype.ExecuteFunctionLoadSectorContent = function (sector, contextItem, element, event, functionParsed, executionContext) {
        return __awaiter(this, void 0, void 0, function () {
            var sectorName, content, contentText;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[0])];
                    case 1:
                        sectorName = _a.sent();
                        return [4, this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[1])];
                    case 2:
                        content = _a.sent();
                        contentText = this.Application.Serializer.SerializeObject(content);
                        this.Application.Document.StartUpdate(sectorName);
                        return [4, this.Application.Document.LoadChildSectorContent(sectorName, contentText)];
                    case 3:
                        _a.sent();
                        return [2, ('')];
                }
            });
        });
    };
    DrapoFunctionHandler.prototype.ExecuteFunctionClearData = function (sector, contextItem, element, event, functionParsed, executionContext) {
        return __awaiter(this, void 0, void 0, function () {
            var dataKey, notifyText, notify, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        dataKey = functionParsed.Parameters[0];
                        notifyText = functionParsed.Parameters[1];
                        if (!((notifyText == null) || (notifyText == ''))) return [3, 1];
                        _a = true;
                        return [3, 3];
                    case 1: return [4, this.Application.Solver.ResolveConditional(notifyText)];
                    case 2:
                        _a = _b.sent();
                        _b.label = 3;
                    case 3:
                        notify = _a;
                        return [4, this.Application.Storage.ClearData(dataKey, sector, notify)];
                    case 4:
                        _b.sent();
                        return [2, ('')];
                }
            });
        });
    };
    DrapoFunctionHandler.prototype.ExecuteFunctionUnloadData = function (sector, contextItem, element, event, functionParsed, executionContext) {
        return __awaiter(this, void 0, void 0, function () {
            var dataKey, notifyText, notify, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        dataKey = functionParsed.Parameters[0];
                        notifyText = functionParsed.Parameters[1];
                        if (!((notifyText == null) || (notifyText == ''))) return [3, 1];
                        _a = true;
                        return [3, 3];
                    case 1: return [4, this.Application.Solver.ResolveConditional(notifyText)];
                    case 2:
                        _a = _b.sent();
                        _b.label = 3;
                    case 3:
                        notify = _a;
                        return [4, this.Application.Storage.UnloadData(dataKey, sector)];
                    case 4:
                        _b.sent();
                        return [2, ('')];
                }
            });
        });
    };
    DrapoFunctionHandler.prototype.ExecuteFunctionCreateData = function (sector, contextItem, element, event, functionParsed, executionContext) {
        return __awaiter(this, void 0, void 0, function () {
            var dataKey, notifyText, notify, _a, object, i, windowParameter, key, _b, value, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        dataKey = functionParsed.Parameters[0];
                        notifyText = functionParsed.Parameters[1];
                        if (!((notifyText == null) || (notifyText == ''))) return [3, 1];
                        _a = true;
                        return [3, 3];
                    case 1: return [4, this.Application.Solver.ResolveConditional(notifyText)];
                    case 2:
                        _a = _d.sent();
                        _d.label = 3;
                    case 3:
                        notify = _a;
                        object = {};
                        i = 2;
                        _d.label = 4;
                    case 4:
                        if (!(i < functionParsed.Parameters.length - 1)) return [3, 12];
                        windowParameter = [null, null];
                        if (!(contextItem != null)) return [3, 6];
                        return [4, this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[i])];
                    case 5:
                        _b = _d.sent();
                        return [3, 7];
                    case 6:
                        _b = functionParsed.Parameters[i];
                        _d.label = 7;
                    case 7:
                        key = _b;
                        if (!(contextItem != null)) return [3, 9];
                        return [4, this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[i + 1])];
                    case 8:
                        _c = _d.sent();
                        return [3, 10];
                    case 9:
                        _c = functionParsed.Parameters[i + 1];
                        _d.label = 10;
                    case 10:
                        value = _c;
                        object[key] = value;
                        _d.label = 11;
                    case 11:
                        i = i + 2;
                        return [3, 4];
                    case 12: return [4, this.Application.Storage.UpdateData(dataKey, sector, object, notify)];
                    case 13:
                        _d.sent();
                        return [2, ('')];
                }
            });
        });
    };
    DrapoFunctionHandler.prototype.ExecuteFunctionUpdateData = function (sector, contextItem, element, event, functionParsed, executionContext) {
        return __awaiter(this, void 0, void 0, function () {
            var dataKey, recursiveText, _a, recursive, _b, resolveText, _c, resolve, _d, value, dataSource, _e, data, notifyText, notify, _f;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        dataKey = functionParsed.Parameters[0];
                        if (!(functionParsed.Parameters.length > 3)) return [3, 2];
                        return [4, this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[3])];
                    case 1:
                        _a = _g.sent();
                        return [3, 3];
                    case 2:
                        _a = null;
                        _g.label = 3;
                    case 3:
                        recursiveText = _a;
                        if (!((recursiveText == null) || (recursiveText == ''))) return [3, 4];
                        _b = true;
                        return [3, 6];
                    case 4: return [4, this.Application.Solver.ResolveConditional(recursiveText)];
                    case 5:
                        _b = _g.sent();
                        _g.label = 6;
                    case 6:
                        recursive = _b;
                        if (!(functionParsed.Parameters.length > 4)) return [3, 8];
                        return [4, this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[4])];
                    case 7:
                        _c = _g.sent();
                        return [3, 9];
                    case 8:
                        _c = null;
                        _g.label = 9;
                    case 9:
                        resolveText = _c;
                        if (!((resolveText == null) || (resolveText == ''))) return [3, 10];
                        _d = true;
                        return [3, 12];
                    case 10: return [4, this.Application.Solver.ResolveConditional(resolveText)];
                    case 11:
                        _d = _g.sent();
                        _g.label = 12;
                    case 12:
                        resolve = _d;
                        value = functionParsed.Parameters[1];
                        if (!resolve) return [3, 14];
                        return [4, this.ResolveFunctionParameter(sector, contextItem, element, executionContext, value, true, recursive)];
                    case 13:
                        _e = _g.sent();
                        return [3, 15];
                    case 14:
                        _e = value;
                        _g.label = 15;
                    case 15:
                        dataSource = _e;
                        data = this.Application.Solver.Clone(dataSource, true);
                        notifyText = functionParsed.Parameters[2];
                        if (!((notifyText == null) || (notifyText == ''))) return [3, 16];
                        _f = true;
                        return [3, 18];
                    case 16: return [4, this.Application.Solver.ResolveConditional(notifyText)];
                    case 17:
                        _f = _g.sent();
                        _g.label = 18;
                    case 18:
                        notify = _f;
                        return [4, this.Application.Storage.UpdateData(dataKey, sector, data, notify)];
                    case 19:
                        _g.sent();
                        return [2, ('')];
                }
            });
        });
    };
    DrapoFunctionHandler.prototype.ExecuteFunctionReloadData = function (sector, contextItem, element, event, functionParsed, executionContext) {
        return __awaiter(this, void 0, void 0, function () {
            var dataKey, notifyText, notify, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        dataKey = functionParsed.Parameters[0];
                        notifyText = functionParsed.Parameters[1];
                        if (!((notifyText == null) || (notifyText == ''))) return [3, 1];
                        _a = true;
                        return [3, 3];
                    case 1: return [4, this.Application.Solver.ResolveConditional(notifyText)];
                    case 2:
                        _a = _b.sent();
                        _b.label = 3;
                    case 3:
                        notify = _a;
                        return [4, this.Application.Storage.ReloadData(dataKey, sector, notify)];
                    case 4:
                        _b.sent();
                        return [2, ('')];
                }
            });
        });
    };
    DrapoFunctionHandler.prototype.ExecuteFunctionFilterData = function (sector, contextItem, element, event, functionParsed, executionContext) {
        return __awaiter(this, void 0, void 0, function () {
            var forText, ifText, dataKeyDestination, notifyText, notify, _a, hasIfText, parsedFor, context, key, dataKeyIteratorRange, range, dataKeyIterator, dataKey, dataKeyIteratorParts, dataItem, datasFiltered, datas, j, data, item, conditional;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (functionParsed.Parameters.length < 3)
                            return [2, ('')];
                        return [4, this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[0])];
                    case 1:
                        forText = _b.sent();
                        ifText = functionParsed.Parameters[1];
                        return [4, this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[2])];
                    case 2:
                        dataKeyDestination = _b.sent();
                        notifyText = functionParsed.Parameters[3];
                        if (!((notifyText == null) || (notifyText == ''))) return [3, 3];
                        _a = true;
                        return [3, 5];
                    case 3: return [4, this.Application.Solver.ResolveConditional(notifyText)];
                    case 4:
                        _a = _b.sent();
                        _b.label = 5;
                    case 5:
                        notify = _a;
                        hasIfText = (ifText != null);
                        parsedFor = this.Application.Parser.ParseFor(forText);
                        if (parsedFor == null)
                            return [2, ('')];
                        context = new DrapoContext();
                        key = parsedFor[0];
                        dataKeyIteratorRange = parsedFor[2];
                        range = this.Application.ControlFlow.GetIteratorRange(dataKeyIteratorRange);
                        dataKeyIterator = range == null ? dataKeyIteratorRange : this.Application.ControlFlow.CleanIteratorRange(dataKeyIteratorRange);
                        dataKey = dataKeyIterator;
                        dataKeyIteratorParts = this.Application.Parser.ParseForIterable(dataKeyIterator);
                        return [4, this.Application.Storage.Retrieve(null, dataKey, sector, context, dataKeyIteratorParts)];
                    case 6:
                        dataItem = _b.sent();
                        if (dataItem == null)
                            return [2, ('')];
                        datasFiltered = [];
                        datas = dataItem.Data;
                        if (datas == null)
                            return [2, ('')];
                        if (!datas.length)
                            datas = this.Application.Solver.TransformObjectIntoArray(datas);
                        if (range !== null)
                            datas = this.Application.ControlFlow.ApplyRange(datas, range);
                        if ((datas.length !== null) && (datas.length === 0))
                            return [2, ('')];
                        j = 0;
                        _b.label = 7;
                    case 7:
                        if (!(j < datas.length)) return [3, 11];
                        data = datas[j];
                        item = context.Create(data, null, null, dataKey, key, null, j);
                        if (!hasIfText) return [3, 9];
                        return [4, this.Application.Solver.ResolveConditional(ifText, null, sector, context)];
                    case 8:
                        conditional = _b.sent();
                        if (!conditional) {
                            context.Pop();
                            return [3, 10];
                        }
                        _b.label = 9;
                    case 9:
                        datasFiltered.push(data);
                        _b.label = 10;
                    case 10:
                        j++;
                        return [3, 7];
                    case 11: return [4, this.Application.Storage.UpdateData(dataKeyDestination, sector, datasFiltered, notify)];
                    case 12:
                        _b.sent();
                        return [2, ('')];
                }
            });
        });
    };
    DrapoFunctionHandler.prototype.ExecuteFunctionHasDataChanges = function (sector, contextItem, element, event, functionParsed, executionContext) {
        return __awaiter(this, void 0, void 0, function () {
            var parameterSector, _a, parameterDataKeyOrDataGroup, _b, storageItems, i, storageItem;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!(functionParsed.Parameters.length <= 0)) return [3, 1];
                        _a = null;
                        return [3, 3];
                    case 1: return [4, this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[0])];
                    case 2:
                        _a = _c.sent();
                        _c.label = 3;
                    case 3:
                        parameterSector = _a;
                        if (parameterSector === '=')
                            parameterSector = sector;
                        if (!(functionParsed.Parameters.length <= 1)) return [3, 4];
                        _b = null;
                        return [3, 6];
                    case 4: return [4, this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[1])];
                    case 5:
                        _b = _c.sent();
                        _c.label = 6;
                    case 6:
                        parameterDataKeyOrDataGroup = _b;
                        storageItems = this.Application.Storage.RetrieveStorageItemsCached(parameterSector, parameterDataKeyOrDataGroup);
                        for (i = 0; i < storageItems.length; i++) {
                            storageItem = storageItems[i];
                            if (storageItem.HasChanges)
                                return [2, ('true')];
                        }
                        return [2, ('false')];
                }
            });
        });
    };
    DrapoFunctionHandler.prototype.ExecuteFunctionAcceptDataChanges = function (sector, contextItem, element, event, functionParsed, executionContext) {
        return __awaiter(this, void 0, void 0, function () {
            var parameterSector, _a, parameterDataKeyOrDataGroup, _b, storageItems, i, storageItem;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!(functionParsed.Parameters.length <= 0)) return [3, 1];
                        _a = null;
                        return [3, 3];
                    case 1: return [4, this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[0])];
                    case 2:
                        _a = _c.sent();
                        _c.label = 3;
                    case 3:
                        parameterSector = _a;
                        if (parameterSector === '=')
                            parameterSector = sector;
                        if (!(functionParsed.Parameters.length <= 1)) return [3, 4];
                        _b = null;
                        return [3, 6];
                    case 4: return [4, this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[1])];
                    case 5:
                        _b = _c.sent();
                        _c.label = 6;
                    case 6:
                        parameterDataKeyOrDataGroup = _b;
                        storageItems = this.Application.Storage.RetrieveStorageItemsCached(parameterSector, parameterDataKeyOrDataGroup);
                        for (i = 0; i < storageItems.length; i++) {
                            storageItem = storageItems[i];
                            if (storageItem.HasChanges)
                                storageItem.HasChanges = false;
                        }
                        return [2, ('')];
                }
            });
        });
    };
    DrapoFunctionHandler.prototype.ExecuteFunctionPostData = function (sector, contextItem, element, event, functionParsed, executionContext) {
        return __awaiter(this, void 0, void 0, function () {
            var dataKey, dataKeyResponse, notifyText, notify, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        dataKey = functionParsed.Parameters[0];
                        dataKeyResponse = functionParsed.Parameters[1];
                        if (dataKeyResponse == null)
                            dataKeyResponse = dataKey;
                        notifyText = functionParsed.Parameters[2];
                        if (!((notifyText == null) || (notifyText == ''))) return [3, 1];
                        _a = true;
                        return [3, 3];
                    case 1: return [4, this.Application.Solver.ResolveConditional(notifyText)];
                    case 2:
                        _a = _b.sent();
                        _b.label = 3;
                    case 3:
                        notify = _a;
                        return [4, this.Application.Storage.PostData(dataKey, sector, dataKeyResponse, notify, executionContext)];
                    case 4:
                        _b.sent();
                        return [2, ('')];
                }
            });
        });
    };
    DrapoFunctionHandler.prototype.ExecuteFunctionPostDataItem = function (sector, contextItem, element, event, functionParsed, executionContext) {
        return __awaiter(this, void 0, void 0, function () {
            var dataKey, dataKeyResponse, notifyText, notify, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        dataKey = functionParsed.Parameters[0];
                        dataKeyResponse = functionParsed.Parameters[1];
                        if (dataKeyResponse == null)
                            dataKeyResponse = dataKey;
                        notifyText = functionParsed.Parameters[2];
                        if (!((notifyText == null) || (notifyText == ''))) return [3, 1];
                        _a = true;
                        return [3, 3];
                    case 1: return [4, this.Application.Solver.ResolveConditional(notifyText)];
                    case 2:
                        _a = _b.sent();
                        _b.label = 3;
                    case 3:
                        notify = _a;
                        return [4, this.Application.Storage.PostDataItem(dataKey, sector, dataKeyResponse, notify, executionContext)];
                    case 4:
                        _b.sent();
                        return [2, ('')];
                }
            });
        });
    };
    DrapoFunctionHandler.prototype.ExecuteFunctionReloadPage = function (sector, contextItem, element, event, functionParsed) {
        window.location.reload();
        return ('');
    };
    DrapoFunctionHandler.prototype.ExecuteFunctionClosePage = function (sector, contextItem, element, event, functionParsed) {
        window.location.href = "about:blank";
        return ('');
    };
    DrapoFunctionHandler.prototype.ExecuteFunctionRedirectPage = function (sector, contextItem, element, event, functionParsed, executionContext) {
        return __awaiter(this, void 0, void 0, function () {
            var url, urlResolved;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[0])];
                    case 1:
                        url = _a.sent();
                        urlResolved = this.Application.Server.ResolveUrl(url);
                        window.location.href = urlResolved;
                        return [2, ('')];
                }
            });
        });
    };
    DrapoFunctionHandler.prototype.ExecuteFunctionUpdateURL = function (sector, contextItem, element, event, functionParsed, executionContext) {
        return __awaiter(this, void 0, void 0, function () {
            var url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[0])];
                    case 1:
                        url = _a.sent();
                        return [4, this.Application.Router.UpdateURL(url)];
                    case 2:
                        _a.sent();
                        return [2, ('')];
                }
            });
        });
    };
    DrapoFunctionHandler.prototype.ExecuteFunctionUpdateToken = function (sector, contextItem, element, event, functionParsed, executionContext) {
        return __awaiter(this, void 0, void 0, function () {
            var token;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[0])];
                    case 1:
                        token = _a.sent();
                        return [4, this.Application.Server.SetToken(token)];
                    case 2:
                        _a.sent();
                        return [2, ('')];
                }
            });
        });
    };
    DrapoFunctionHandler.prototype.ExecuteFunctionClearToken = function (sector, contextItem, element, event, functionParsed, executionContext) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.Application.Server.SetToken(null)];
                    case 1:
                        _a.sent();
                        return [2, ('')];
                }
            });
        });
    };
    DrapoFunctionHandler.prototype.ExecuteFunctionHasToken = function (sector, contextItem, element, event, functionParsed, executionContext) {
        return (this.Application.Server.HasToken().toString());
    };
    DrapoFunctionHandler.prototype.ExecuteFunctionDestroyContainer = function (sector, contextItem, element, event, functionParsed, executionContext) {
        return __awaiter(this, void 0, void 0, function () {
            var itemText, containerCode, dataPath;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        itemText = functionParsed.Parameters[0];
                        containerCode = null;
                        if (!this.Application.Parser.IsMustache(itemText)) return [3, 2];
                        dataPath = this.Application.Parser.ParseMustache(itemText);
                        return [4, this.Application.Solver.ResolveItemDataPathObject(sector, contextItem, dataPath)];
                    case 1:
                        containerCode = _a.sent();
                        return [3, 3];
                    case 2:
                        containerCode = itemText;
                        _a.label = 3;
                    case 3:
                        this.Application.SectorContainerHandler.RemoveByContainer(containerCode);
                        return [2, ('')];
                }
            });
        });
    };
    DrapoFunctionHandler.prototype.ExecuteFunctionIf = function (sector, contextItem, element, event, functionParsed, executionContext) {
        return __awaiter(this, void 0, void 0, function () {
            var conditional, conditionalEvaluated, conditionalResult, statementTrue, statementFalse;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        conditional = functionParsed.Parameters[0];
                        return [4, this.Application.Barber.ResolveControlFlowMustacheStringFunction(sector, new DrapoContext(contextItem), null, conditional, $(element), false)];
                    case 1:
                        conditionalEvaluated = _a.sent();
                        return [4, this.Application.Solver.ResolveConditional(conditionalEvaluated)];
                    case 2:
                        conditionalResult = _a.sent();
                        if (!conditionalResult) return [3, 4];
                        statementTrue = functionParsed.Parameters[1];
                        return [4, this.ResolveFunctionContext(sector, contextItem, element, event, statementTrue, executionContext)];
                    case 3:
                        _a.sent();
                        return [3, 6];
                    case 4:
                        if (!(functionParsed.Parameters.length > 2)) return [3, 6];
                        statementFalse = functionParsed.Parameters[2];
                        return [4, this.ResolveFunctionContext(sector, contextItem, element, event, statementFalse, executionContext)];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6: return [2, ('')];
                }
            });
        });
    };
    DrapoFunctionHandler.prototype.ExecuteFunctionAsync = function (sector, contextItem, element, event, functionParsed, executionContext) {
        return __awaiter(this, void 0, void 0, function () {
            var content, executionContextContent;
            return __generator(this, function (_a) {
                content = functionParsed.Parameters[0];
                executionContextContent = this.CreateExecutionContext(false);
                this.ResolveFunctionContext(sector, contextItem, element, event, content, executionContextContent);
                return [2, ('')];
            });
        });
    };
    DrapoFunctionHandler.prototype.ExecuteFunctionNotify = function (sector, contextItem, element, event, functionParsed, executionContext) {
        return __awaiter(this, void 0, void 0, function () {
            var dataKey, dataIndex, _a, _b, dataFields, canUseDifferenceText, _c, canUseDifference, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0: return [4, this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[0])];
                    case 1:
                        dataKey = _e.sent();
                        _b = (_a = this.Application.Parser).GetStringAsNumber;
                        return [4, this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[1])];
                    case 2:
                        dataIndex = _b.apply(_a, [_e.sent()]);
                        return [4, this.ResolveFunctionParameterDataFields(sector, contextItem, element, functionParsed.Parameters[2], executionContext)];
                    case 3:
                        dataFields = _e.sent();
                        if (!(functionParsed.Parameters.length > 3)) return [3, 5];
                        return [4, this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[3])];
                    case 4:
                        _c = _e.sent();
                        return [3, 6];
                    case 5:
                        _c = null;
                        _e.label = 6;
                    case 6:
                        canUseDifferenceText = _c;
                        if (!((canUseDifferenceText == null) || (canUseDifferenceText == ''))) return [3, 7];
                        _d = true;
                        return [3, 9];
                    case 7: return [4, this.Application.Solver.ResolveConditional(canUseDifferenceText)];
                    case 8:
                        _d = _e.sent();
                        _e.label = 9;
                    case 9:
                        canUseDifference = _d;
                        return [4, this.Application.Observer.Notify(dataKey, dataIndex, dataFields, canUseDifference)];
                    case 10:
                        _e.sent();
                        return [2, ('')];
                }
            });
        });
    };
    DrapoFunctionHandler.prototype.ExecuteFunctionFocus = function (sector, contextItem, element, event, functionParsed, executionContext) {
        return __awaiter(this, void 0, void 0, function () {
            var did, elementFocused, didJ, isSelectText, isSelect, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4, this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[0])];
                    case 1:
                        did = _b.sent();
                        if ((did === null) || (did === '') || (did === undefined)) {
                            elementFocused = $(document.activeElement);
                            elementFocused.blur();
                            return [2, ('')];
                        }
                        didJ = $("[d-id='" + did + "']");
                        if ((didJ === null) || (didJ.length === 0))
                            return [2, ('')];
                        isSelectText = functionParsed.Parameters[1];
                        if (!((isSelectText == null) || (isSelectText == ''))) return [3, 2];
                        _a = true;
                        return [3, 4];
                    case 2: return [4, this.Application.Solver.ResolveConditional(isSelectText)];
                    case 3:
                        _a = _b.sent();
                        _b.label = 4;
                    case 4:
                        isSelect = _a;
                        didJ.focus();
                        if (isSelect)
                            didJ.select();
                        return [2, ('')];
                }
            });
        });
    };
    DrapoFunctionHandler.prototype.ExecuteFunctionShowWindow = function (sector, contextItem, element, event, functionParsed, executionContext) {
        return __awaiter(this, void 0, void 0, function () {
            var windowParameters, windowNameOrUri, isUri, did, _a, i, windowParameter, _b, _c, _d, _e, _f, _g;
            return __generator(this, function (_h) {
                switch (_h.label) {
                    case 0:
                        windowParameters = [];
                        return [4, this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[0])];
                    case 1:
                        windowNameOrUri = _h.sent();
                        isUri = this.Application.Parser.IsUri(windowNameOrUri);
                        if (!isUri) return [3, 3];
                        return [4, this.Application.Storage.ResolveDataUrlMustaches(null, sector, windowNameOrUri, executionContext)];
                    case 2:
                        windowNameOrUri = _h.sent();
                        _h.label = 3;
                    case 3:
                        if (!isUri) return [3, 5];
                        return [4, this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[1])];
                    case 4:
                        _a = _h.sent();
                        return [3, 6];
                    case 5:
                        _a = null;
                        _h.label = 6;
                    case 6:
                        did = _a;
                        i = isUri ? 2 : 1;
                        _h.label = 7;
                    case 7:
                        if (!(i < functionParsed.Parameters.length - 1)) return [3, 15];
                        windowParameter = [null, null];
                        _b = windowParameter;
                        _c = 0;
                        if (!(contextItem != null)) return [3, 9];
                        return [4, this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[i])];
                    case 8:
                        _d = _h.sent();
                        return [3, 10];
                    case 9:
                        _d = functionParsed.Parameters[i];
                        _h.label = 10;
                    case 10:
                        _b[_c] = _d;
                        _e = windowParameter;
                        _f = 1;
                        if (!(contextItem != null)) return [3, 12];
                        return [4, this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[i + 1])];
                    case 11:
                        _g = _h.sent();
                        return [3, 13];
                    case 12:
                        _g = functionParsed.Parameters[i + 1];
                        _h.label = 13;
                    case 13:
                        _e[_f] = _g;
                        windowParameters.push(windowParameter);
                        _h.label = 14;
                    case 14:
                        i = i + 2;
                        return [3, 7];
                    case 15:
                        if (!isUri) return [3, 17];
                        return [4, this.Application.WindowHandler.CreateAndShowWindow(windowNameOrUri, did, windowParameters)];
                    case 16:
                        _h.sent();
                        return [3, 19];
                    case 17: return [4, this.Application.WindowHandler.CreateAndShowWindowDefinition(windowNameOrUri, windowParameters)];
                    case 18:
                        _h.sent();
                        _h.label = 19;
                    case 19: return [2, ('')];
                }
            });
        });
    };
    DrapoFunctionHandler.prototype.ExecuteFunctionCloseWindow = function (sector, contextItem, element, event, functionParsed, executionContext) {
        return __awaiter(this, void 0, void 0, function () {
            var did, _a, allText, all, type;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(functionParsed.Parameters.length > 0)) return [3, 2];
                        return [4, this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[0], false, true)];
                    case 1:
                        _a = _b.sent();
                        return [3, 3];
                    case 2:
                        _a = null;
                        _b.label = 3;
                    case 3:
                        did = _a;
                        if ((did === '') && (functionParsed.Parameters.length > 0) && (this.Application.Parser.HasFunction(functionParsed.Parameters[0])))
                            return [2, ('')];
                        allText = functionParsed.Parameters.length > 1 ? functionParsed.Parameters[1] : 'false';
                        return [4, this.Application.Solver.ResolveConditional(allText)];
                    case 4:
                        all = _b.sent();
                        type = functionParsed.Parameters.length > 2 ? functionParsed.Parameters[2] : null;
                        return [4, this.Application.WindowHandler.CloseWindow(did, all, type)];
                    case 5:
                        _b.sent();
                        return [2, ('')];
                }
            });
        });
    };
    DrapoFunctionHandler.prototype.ExecuteFunctionHideWindow = function (sector, contextItem, element, event, functionParsed, executionContext) {
        return __awaiter(this, void 0, void 0, function () {
            var did, allText, all, type, window;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        did = functionParsed.Parameters.length > 0 ? functionParsed.Parameters[0] : null;
                        allText = functionParsed.Parameters.length > 1 ? functionParsed.Parameters[1] : 'false';
                        return [4, this.Application.Solver.ResolveConditional(allText)];
                    case 1:
                        all = _a.sent();
                        type = functionParsed.Parameters.length > 2 ? functionParsed.Parameters[2] : null;
                        return [4, this.Application.WindowHandler.HideWindow(did, all)];
                    case 2:
                        window = _a.sent();
                        if (window !== null) {
                            if (type !== 'noclose')
                                executionContext.AddWindowAutoClose(window);
                        }
                        return [2, ('')];
                }
            });
        });
    };
    DrapoFunctionHandler.prototype.ExecuteFunctionGetWindow = function (sector, contextItem, element, event, functionParsed, executionContext) {
        return __awaiter(this, void 0, void 0, function () {
            var window;
            return __generator(this, function (_a) {
                window = this.Application.WindowHandler.GetWindowByElement(element);
                if (window !== null)
                    return [2, (window.Code)];
                return [2, ('')];
            });
        });
    };
    DrapoFunctionHandler.prototype.ExecuteFunctionCreateGuid = function (sector, contextItem, element, event, functionParsed, executionContext) {
        return __awaiter(this, void 0, void 0, function () {
            var value, dataKey, dataField, notifyText, _a, notify, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        value = this.Application.Document.CreateGuid();
                        if (functionParsed.Parameters.length == 0)
                            return [2, (value)];
                        return [4, this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[0])];
                    case 1:
                        dataKey = _c.sent();
                        return [4, this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[1])];
                    case 2:
                        dataField = _c.sent();
                        if (!(functionParsed.Parameters.length > 2)) return [3, 4];
                        return [4, this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[2])];
                    case 3:
                        _a = _c.sent();
                        return [3, 5];
                    case 4:
                        _a = null;
                        _c.label = 5;
                    case 5:
                        notifyText = _a;
                        if (!((notifyText == null) || (notifyText == ''))) return [3, 6];
                        _b = true;
                        return [3, 8];
                    case 6: return [4, this.Application.Solver.ResolveConditional(notifyText)];
                    case 7:
                        _b = _c.sent();
                        _c.label = 8;
                    case 8:
                        notify = _b;
                        return [4, this.Application.Storage.SetDataKeyField(dataKey, sector, [dataField], value, notify)];
                    case 9:
                        _c.sent();
                        return [2, ('')];
                }
            });
        });
    };
    DrapoFunctionHandler.prototype.ExecuteFunctionExecute = function (sector, contextItem, element, event, functionParsed, executionContext) {
        return __awaiter(this, void 0, void 0, function () {
            var sectorFunction, _a, valueFunction;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(functionParsed.Parameters.length > 1)) return [3, 2];
                        return [4, this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[1])];
                    case 1:
                        _a = _b.sent();
                        return [3, 3];
                    case 2:
                        _a = sector;
                        _b.label = 3;
                    case 3:
                        sectorFunction = _a;
                        return [4, this.ResolveFunctionParameter(sectorFunction, contextItem, element, executionContext, functionParsed.Parameters[0])];
                    case 4:
                        valueFunction = _b.sent();
                        return [4, this.ResolveFunctionContext(sectorFunction, contextItem, element, event, valueFunction, executionContext)];
                    case 5:
                        _b.sent();
                        return [2, ('')];
                }
            });
        });
    };
    DrapoFunctionHandler.prototype.ExecuteFunctionExecuteDataItem = function (sector, contextItem, element, event, functionParsed, executionContext) {
        return __awaiter(this, void 0, void 0, function () {
            var expression, forText, ifText, hasIfText, allText, _a, all, _b, parsedFor, forHierarchyText, context, key, dataKeyIteratorRange, range, dataKeyIterator, dataKeyIteratorParts, dataKey, dataItem, datas;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        expression = functionParsed.Parameters[0];
                        return [4, functionParsed.Parameters[1]];
                    case 1:
                        forText = _c.sent();
                        ifText = functionParsed.Parameters.length > 2 ? functionParsed.Parameters[2] : null;
                        hasIfText = (ifText != null);
                        if (!(functionParsed.Parameters.length > 3)) return [3, 3];
                        return [4, this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[3])];
                    case 2:
                        _a = _c.sent();
                        return [3, 4];
                    case 3:
                        _a = null;
                        _c.label = 4;
                    case 4:
                        allText = _a;
                        if (!((allText == null) || (allText == ''))) return [3, 5];
                        _b = !hasIfText;
                        return [3, 7];
                    case 5: return [4, this.Application.Solver.ResolveConditional(allText)];
                    case 6:
                        _b = _c.sent();
                        _c.label = 7;
                    case 7:
                        all = _b;
                        parsedFor = this.Application.Parser.ParseFor(forText);
                        if (parsedFor == null)
                            return [2, ('')];
                        return [4, functionParsed.Parameters[4]];
                    case 8:
                        forHierarchyText = _c.sent();
                        context = new DrapoContext();
                        key = parsedFor[0];
                        dataKeyIteratorRange = parsedFor[2];
                        range = this.Application.ControlFlow.GetIteratorRange(dataKeyIteratorRange);
                        dataKeyIterator = range == null ? dataKeyIteratorRange : this.Application.ControlFlow.CleanIteratorRange(dataKeyIteratorRange);
                        dataKeyIteratorParts = this.Application.Parser.ParseForIterable(dataKeyIterator);
                        dataKey = dataKeyIteratorParts[0];
                        return [4, this.Application.Storage.Retrieve(null, dataKey, sector, context, dataKeyIteratorParts)];
                    case 9:
                        dataItem = _c.sent();
                        if (dataItem == null)
                            return [2, ('')];
                        datas = (dataKeyIteratorParts.length > 1) ? this.Application.Solver.ResolveDataObjectPathObject(dataItem.Data, dataKeyIteratorParts) : dataItem.Data;
                        if (datas == null)
                            return [2, ('')];
                        if (!datas.length)
                            datas = this.Application.Solver.TransformObjectIntoArray(datas);
                        if (range !== null)
                            datas = this.Application.ControlFlow.ApplyRange(datas, range);
                        if ((datas.length !== null) && (datas.length === 0))
                            return [2, ('')];
                        return [4, this.Application.ControlFlow.ExecuteDataItem(sector, context, expression, dataKeyIterator, forHierarchyText, ifText, all, datas, dataKey, key)];
                    case 10:
                        _c.sent();
                        return [2, ('')];
                }
            });
        });
    };
    DrapoFunctionHandler.prototype.ExecuteFunctionExecuteComponentFunction = function (sector, contextItem, element, event, functionParsed, executionContext) {
        return __awaiter(this, void 0, void 0, function () {
            var did, instance, functionName, instanceFunction, parameters, i, _a, _b, result, resultPromise;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4, this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[0])];
                    case 1:
                        did = _c.sent();
                        if (did == null)
                            return [2, ('')];
                        instance = this.Application.ComponentHandler.GetComponentInstance(sector, did);
                        if (instance == null)
                            return [2, ('')];
                        return [4, this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[1])];
                    case 2:
                        functionName = _c.sent();
                        instanceFunction = instance[functionName];
                        if (instanceFunction == null)
                            return [2, ('')];
                        parameters = [];
                        i = 2;
                        _c.label = 3;
                    case 3:
                        if (!(i < functionParsed.Parameters.length)) return [3, 6];
                        _b = (_a = parameters).push;
                        return [4, this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[i])];
                    case 4:
                        _b.apply(_a, [_c.sent()]);
                        _c.label = 5;
                    case 5:
                        i++;
                        return [3, 3];
                    case 6:
                        result = instanceFunction.apply(instance, parameters);
                        if (!(Promise.resolve(result) == result)) return [3, 8];
                        resultPromise = result;
                        return [4, resultPromise];
                    case 7:
                        _c.sent();
                        return [2, ('')];
                    case 8: return [2, ('')];
                }
            });
        });
    };
    DrapoFunctionHandler.prototype.ExecuteFunctionExecuteInstanceFunction = function (sector, contextItem, element, event, functionParsed, executionContext) {
        return __awaiter(this, void 0, void 0, function () {
            var instanceSectorParameter, instanceSector, instance, functionName, instanceFunction, parameters, i, _a, _b, result, value, resultPromise, mustacheReturn, dataPath;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4, this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[0])];
                    case 1:
                        instanceSectorParameter = _c.sent();
                        instanceSector = ((instanceSectorParameter == null) || (instanceSectorParameter == '')) ? sector : instanceSectorParameter;
                        instance = this.Application.ComponentHandler.GetComponentInstance(sector);
                        if (instance == null)
                            return [2, ('')];
                        return [4, this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[1])];
                    case 2:
                        functionName = _c.sent();
                        instanceFunction = instance[functionName];
                        if (instanceFunction == null)
                            return [2, ('')];
                        parameters = [];
                        i = 3;
                        _c.label = 3;
                    case 3:
                        if (!(i < functionParsed.Parameters.length)) return [3, 6];
                        _b = (_a = parameters).push;
                        return [4, this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[i])];
                    case 4:
                        _b.apply(_a, [_c.sent()]);
                        _c.label = 5;
                    case 5:
                        i++;
                        return [3, 3];
                    case 6:
                        result = instanceFunction.apply(instance, parameters);
                        value = result;
                        if (!(Promise.resolve(result) == result)) return [3, 8];
                        resultPromise = result;
                        return [4, resultPromise];
                    case 7:
                        value = _c.sent();
                        _c.label = 8;
                    case 8:
                        mustacheReturn = functionParsed.Parameters[2];
                        if (!((mustacheReturn !== null) && (mustacheReturn !== ''))) return [3, 12];
                        dataPath = this.Application.Parser.ParseMustache(mustacheReturn);
                        if (!(dataPath.length === 1)) return [3, 10];
                        return [4, this.Application.Storage.UpdateData(dataPath[0], sector, value, true)];
                    case 9:
                        _c.sent();
                        return [3, 12];
                    case 10: return [4, this.Application.Solver.UpdateItemDataPathObject(sector, contextItem, dataPath, value, true)];
                    case 11:
                        _c.sent();
                        _c.label = 12;
                    case 12: return [2, ('')];
                }
            });
        });
    };
    DrapoFunctionHandler.prototype.ExecuteFunctionCast = function (sector, contextItem, element, event, functionParsed, executionContext) {
        return __awaiter(this, void 0, void 0, function () {
            var context, value, type;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        context = contextItem != null ? contextItem.Context : new DrapoContext();
                        return [4, this.Application.Barber.ResolveControlFlowMustacheStringFunction(sector, context, null, functionParsed.Parameters[0], null, false)];
                    case 1:
                        value = _a.sent();
                        return [4, this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[1])];
                    case 2:
                        type = _a.sent();
                        if (type === 'number')
                            return [2, (this.Application.Parser.ParseNumberBlock(value))];
                        return [2, (value)];
                }
            });
        });
    };
    DrapoFunctionHandler.prototype.ExecuteFunctionAddRequestHeader = function (sector, contextItem, element, event, functionParsed, executionContext) {
        return __awaiter(this, void 0, void 0, function () {
            var context, name, value;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        context = new DrapoContext();
                        return [4, this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[0])];
                    case 1:
                        name = _a.sent();
                        return [4, this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[1])];
                    case 2:
                        value = _a.sent();
                        this.Application.Server.AddNextRequestHeader(name, value);
                        return [2, ('')];
                }
            });
        });
    };
    DrapoFunctionHandler.prototype.ExecuteFunctionSetClipboard = function (sector, contextItem, element, event, functionParsed, executionContext) {
        return __awaiter(this, void 0, void 0, function () {
            var value;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[0])];
                    case 1:
                        value = _a.sent();
                        return [4, this.Application.Document.SetClipboard(value)];
                    case 2:
                        _a.sent();
                        return [2, ('')];
                }
            });
        });
    };
    DrapoFunctionHandler.prototype.ExecuteFunctionCreateTimer = function (sector, contextItem, element, event, functionParsed, executionContext) {
        return __awaiter(this, void 0, void 0, function () {
            var content, time, loopText, loop, _a, timeAsNumber, executionContextContent, timerFunction;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        content = functionParsed.Parameters[0];
                        return [4, this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[1])];
                    case 1:
                        time = _b.sent();
                        loopText = functionParsed.Parameters[2];
                        if (!((loopText == null) || (loopText == ''))) return [3, 2];
                        _a = false;
                        return [3, 4];
                    case 2: return [4, this.Application.Solver.ResolveConditional(loopText)];
                    case 3:
                        _a = _b.sent();
                        _b.label = 4;
                    case 4:
                        loop = _a;
                        timeAsNumber = this.Application.Parser.ParseNumber(time, 0);
                        executionContextContent = this.CreateExecutionContext(false);
                        timerFunction = function () {
                            _this.ResolveFunctionContext(sector, contextItem, element, event, content, executionContextContent);
                            if (loop)
                                setTimeout(timerFunction, timeAsNumber);
                        };
                        setTimeout(timerFunction, timeAsNumber);
                        return [2, ('')];
                }
            });
        });
    };
    DrapoFunctionHandler.prototype.ExecuteFunctionCreateReference = function (sector, contextItem, element, event, functionParsed, executionContext) {
        return __awaiter(this, void 0, void 0, function () {
            var value, mustacheReference;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        value = functionParsed.Parameters[0];
                        return [4, this.Application.Solver.CreateMustacheReference(sector, contextItem, value)];
                    case 1:
                        mustacheReference = _a.sent();
                        return [2, (mustacheReference)];
                }
            });
        });
    };
    DrapoFunctionHandler.prototype.ExecuteFunctionWait = function (sector, contextItem, element, event, functionParsed, executionContext) {
        return __awaiter(this, void 0, void 0, function () {
            var time, timeAsNumber;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[0])];
                    case 1:
                        time = _a.sent();
                        timeAsNumber = this.Application.Parser.ParseNumber(time, 0);
                        return [4, this.Application.Document.Sleep(timeAsNumber)];
                    case 2:
                        _a.sent();
                        return [2, ('')];
                }
            });
        });
    };
    DrapoFunctionHandler.prototype.ExecuteFunctionDownloadData = function (sector, contextItem, element, event, functionParsed, executionContext) {
        return __awaiter(this, void 0, void 0, function () {
            var dataKeyFile, storageItem, namePath, name, dataPath, data, contentTypePath, contentType;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dataKeyFile = functionParsed.Parameters[0];
                        return [4, this.Application.Storage.RetrieveDataItemContext(dataKeyFile, sector, executionContext)];
                    case 1:
                        storageItem = _a.sent();
                        if (storageItem === null)
                            return [2, ('')];
                        namePath = this.Application.Solver.CreateDataPath(dataKeyFile, ['filename']);
                        return [4, this.Application.Solver.ResolveItemDataPathObject(sector, contextItem, namePath, true)];
                    case 2:
                        name = _a.sent();
                        dataPath = this.Application.Solver.CreateDataPath(dataKeyFile, ['body']);
                        return [4, this.Application.Solver.ResolveItemDataPathObject(sector, contextItem, dataPath, true)];
                    case 3:
                        data = _a.sent();
                        contentTypePath = this.Application.Solver.CreateDataPath(dataKeyFile, ['contenttype']);
                        return [4, this.Application.Solver.ResolveItemDataPathObject(sector, contextItem, contentTypePath, true)];
                    case 4:
                        contentType = _a.sent();
                        this.DownloadData(name, data, contentType);
                        return [2, ('')];
                }
            });
        });
    };
    DrapoFunctionHandler.prototype.DownloadData = function (name, data, contentType) {
        var blob = this.CreateBlob(data, contentType);
        if (window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveBlob(blob, name);
        }
        else {
            var elDownloader = document.createElement('a');
            elDownloader.href = window.URL.createObjectURL(blob);
            elDownloader.download = name;
            elDownloader.style.display = 'none';
            document.body.appendChild(elDownloader);
            elDownloader.click();
            document.body.removeChild(elDownloader);
        }
    };
    DrapoFunctionHandler.prototype.CreateBlob = function (data, contentType) {
        if (data instanceof Blob)
            return (data);
        var dataCharacters = atob(data);
        var dataBytes = new Array(dataCharacters.length);
        for (var i = 0; i < dataCharacters.length; i++) {
            dataBytes[i] = dataCharacters.charCodeAt(i);
        }
        var bytes = new Uint8Array(dataBytes);
        var blob = new Blob([bytes], { type: contentType });
        return (blob);
    };
    DrapoFunctionHandler.prototype.ExecuteFunctionDetectView = function (sector, contextItem, element, event, functionParsed, executionContext) {
        return __awaiter(this, void 0, void 0, function () {
            var views, context, i, view;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.Application.Config.GetViews()];
                    case 1:
                        views = _a.sent();
                        if (views == null)
                            return [2, ('')];
                        context = new DrapoContext();
                        i = 0;
                        _a.label = 2;
                    case 2:
                        if (!(i < views.length)) return [3, 5];
                        view = views[i];
                        if (view.Condition == null)
                            return [2, (view.Tag)];
                        return [4, this.Application.Solver.ResolveConditional(view.Condition, null, sector, context)];
                    case 3:
                        if (_a.sent())
                            return [2, (view.Tag)];
                        _a.label = 4;
                    case 4:
                        i++;
                        return [3, 2];
                    case 5: return [2, ('')];
                }
            });
        });
    };
    DrapoFunctionHandler.prototype.ExecuteFunctionDebugger = function (sector, contextItem, element, event, functionParsed, executionContext) {
        return __awaiter(this, void 0, void 0, function () {
            var parameters, i, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        parameters = [];
                        i = 0;
                        _c.label = 1;
                    case 1:
                        if (!(i < functionParsed.Parameters.length)) return [3, 4];
                        _b = (_a = parameters).push;
                        return [4, this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[i], true, true, true)];
                    case 2:
                        _b.apply(_a, [_c.sent()]);
                        _c.label = 3;
                    case 3:
                        i++;
                        return [3, 1];
                    case 4: return [4, this.Application.Debugger.ExecuteFunctionDebugger(parameters)];
                    case 5:
                        _c.sent();
                        return [2, ('')];
                }
            });
        });
    };
    DrapoFunctionHandler.prototype.ExecuteFunctionGetSector = function (sector, contextItem, element, event, functionParsed, executionContext) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, (this.Application.Document.GetSector(element))];
            });
        });
    };
    DrapoFunctionHandler.prototype.ExecuteFunctionGetClipboard = function (sector, contextItem, element, event, functionParsed, executionContext) {
        return __awaiter(this, void 0, void 0, function () {
            var dataPath, notifyText, notify, _a, value;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        dataPath = this.Application.Parser.ParseMustache(functionParsed.Parameters[0]);
                        notifyText = functionParsed.Parameters[1];
                        if (!((notifyText == null) || (notifyText == ''))) return [3, 1];
                        _a = true;
                        return [3, 3];
                    case 1: return [4, this.Application.Solver.ResolveConditional(notifyText)];
                    case 2:
                        _a = _b.sent();
                        _b.label = 3;
                    case 3:
                        notify = _a;
                        return [4, this.Application.Document.GetClipboard()];
                    case 4:
                        value = _b.sent();
                        return [4, this.Application.Solver.UpdateItemDataPathObject(sector, contextItem, dataPath, value, notify)];
                    case 5:
                        _b.sent();
                        return [2, ('')];
                }
            });
        });
    };
    DrapoFunctionHandler.prototype.ExecuteFunctionExecuteValidation = function (sector, contextItem, element, event, functionParsed, executionContext) {
        return __awaiter(this, void 0, void 0, function () {
            var validation, isValid;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        validation = functionParsed.Parameters[0];
                        return [4, this.Application.Validator.IsValidationExpressionValid(element, sector, validation)];
                    case 1:
                        isValid = _a.sent();
                        return [2, (isValid ? 'true' : 'false')];
                }
            });
        });
    };
    DrapoFunctionHandler.prototype.ExecuteFunctionClearValidation = function (sector, contextItem, element, event, functionParsed, executionContext) {
        return __awaiter(this, void 0, void 0, function () {
            var validation;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        validation = functionParsed.Parameters[0];
                        return [4, this.Application.Validator.UncheckValidationExpression(element, sector, validation)];
                    case 1:
                        _a.sent();
                        return [2, ('')];
                }
            });
        });
    };
    DrapoFunctionHandler.prototype.HasFunctionMustacheContext = function (functionsValue, sector, renderContext) {
        return __awaiter(this, void 0, void 0, function () {
            var hasContext;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        hasContext = renderContext.HasExpressionContext(sector, functionsValue);
                        if (hasContext !== null)
                            return [2, (hasContext)];
                        return [4, this.HasFunctionMustacheContextInternal(functionsValue, sector)];
                    case 1:
                        hasContext = _a.sent();
                        renderContext.AddExpressionContext(sector, functionsValue, hasContext);
                        return [2, (hasContext)];
                }
            });
        });
    };
    DrapoFunctionHandler.prototype.HasFunctionMustacheContextInternal = function (functionsValue, sector) {
        return __awaiter(this, void 0, void 0, function () {
            var mustaches, j, mustache, mustacheParts, dataKey, value;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.HasFunctionsContext(functionsValue))
                            return [2, (true)];
                        if (!!this.Application.Parser.IsMustache(functionsValue)) return [3, 2];
                        return [4, this.Application.Barber.HasMustacheContext(functionsValue, sector)];
                    case 1: return [2, (_a.sent())];
                    case 2:
                        mustaches = this.Application.Parser.ParseMustaches(functionsValue);
                        j = 0;
                        _a.label = 3;
                    case 3:
                        if (!(j < mustaches.length)) return [3, 8];
                        mustache = mustaches[j];
                        mustacheParts = this.Application.Parser.ParseMustache(mustache);
                        dataKey = this.Application.Solver.ResolveDataKey(mustacheParts);
                        if (!this.Application.Storage.IsDataKey(dataKey, null))
                            return [2, (true)];
                        value = this.Application.Storage.GetDataKeyField(dataKey, sector, mustacheParts);
                        if (!(value == null)) return [3, 5];
                        return [4, this.Application.ExceptionHandler.HandleError('DrapoFunctionHandler - HasFunctionMustacheContext - Null Mustache - {0}', mustache)];
                    case 4:
                        _a.sent();
                        return [2, (false)];
                    case 5: return [4, this.HasFunctionMustacheContextInternal(value, sector)];
                    case 6:
                        if (_a.sent())
                            return [2, (true)];
                        _a.label = 7;
                    case 7:
                        j++;
                        return [3, 3];
                    case 8: return [2, (false)];
                }
            });
        });
    };
    DrapoFunctionHandler.prototype.HasFunctionsContext = function (functionsValue) {
        var functionsParsed = this.Application.Parser.ParseFunctions(functionsValue);
        for (var i = 0; i < functionsParsed.length; i++) {
            var functionParse = functionsParsed[i];
            var functionParsed = this.Application.Parser.ParseFunction(functionParse);
            if (functionParsed === null)
                continue;
            if (this.IsFunctionContext(functionParsed))
                return (true);
        }
        return (false);
    };
    DrapoFunctionHandler.prototype.GetFunctionsContext = function () {
        var functions = [];
        functions.push('removedataitem');
        return (functions);
    };
    DrapoFunctionHandler.prototype.IsFunctionContext = function (functionParsed) {
        var functions = this.GetFunctionsContext();
        if (this.Application.Solver.Contains(functions, functionParsed.Name))
            return (true);
        return (false);
    };
    return DrapoFunctionHandler;
}());

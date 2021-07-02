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
var DrapoSolver = (function () {
    function DrapoSolver(application) {
        this._application = application;
    }
    Object.defineProperty(DrapoSolver.prototype, "Application", {
        get: function () {
            return (this._application);
        },
        enumerable: true,
        configurable: true
    });
    DrapoSolver.prototype.ResolveConditional = function (expression, elj, sector, context, renderContext, eljForTemplate) {
        if (elj === void 0) { elj = null; }
        if (sector === void 0) { sector = null; }
        if (context === void 0) { context = null; }
        if (renderContext === void 0) { renderContext = null; }
        if (eljForTemplate === void 0) { eljForTemplate = null; }
        return __awaiter(this, void 0, void 0, function () {
            var block, response, responseBoolean;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (typeof expression === 'boolean')
                            return [2, (expression)];
                        if (typeof expression === 'number')
                            return [2, (expression > 0)];
                        block = this.Application.Parser.ParseExpression(expression);
                        return [4, this.ResolveConditionalExpressionBlock(sector, context, renderContext, elj, eljForTemplate, block)];
                    case 1:
                        response = _a.sent();
                        if (!this.Application.Parser.HasMustache(response)) return [3, 3];
                        return [4, this.ResolveConditional(response, elj, sector, context, renderContext, eljForTemplate)];
                    case 2: return [2, (_a.sent())];
                    case 3: return [4, this.ResolveConditionalBoolean(response)];
                    case 4:
                        responseBoolean = _a.sent();
                        return [2, (responseBoolean)];
                }
            });
        });
    };
    DrapoSolver.prototype.ResolveConditionalExpressionBlock = function (sector, context, renderContext, elj, eljForTemplate, block) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.EnsureExpressionItemCurrentLevelResolved(sector, context, renderContext, elj, block, eljForTemplate)];
                    case 1:
                        _a.sent();
                        this.JoinTexts(block);
                        return [4, this.ResolveConditionalExpressionBlockOperation(sector, context, renderContext, elj, eljForTemplate, block)];
                    case 2: return [2, (_a.sent())];
                }
            });
        });
    };
    DrapoSolver.prototype.ResolveConditionalExpressionBlockOperation = function (sector, context, renderContext, elj, eljForTemplate, block) {
        return __awaiter(this, void 0, void 0, function () {
            var itemFirst, itemEmpty, resultFirst, itemSecond, resultSecond, resultDenySecond, resultDenyItemSecond, resultThird, hasMoreThanTwoTerms, resultFourth, resultDenyFourth, resultDenyItemFourth, result, resultItem;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (block.Items.length === 0)
                            return [2, ('')];
                        return [4, this.EnsureExpressionItemResolved(sector, context, renderContext, elj, block, 0, eljForTemplate)];
                    case 1:
                        _a.sent();
                        itemFirst = block.Items[0];
                        if (!((itemFirst.Type == DrapoExpressionItemType.Logical) || (itemFirst.Type == DrapoExpressionItemType.Comparator))) return [3, 3];
                        itemEmpty = new DrapoExpressionItem(DrapoExpressionItemType.Text, '');
                        block.Items.unshift(itemEmpty);
                        return [4, this.ResolveConditionalExpressionBlock(sector, context, renderContext, elj, eljForTemplate, block)];
                    case 2: return [2, (_a.sent())];
                    case 3:
                        resultFirst = itemFirst.Value;
                        if (block.Items.length < 2)
                            return [2, (resultFirst)];
                        return [4, this.EnsureExpressionItemResolved(sector, context, renderContext, elj, block, 1, eljForTemplate)];
                    case 4:
                        _a.sent();
                        itemSecond = block.Items[1];
                        resultSecond = itemSecond.Value;
                        if ((resultSecond === '&&') && (!this.ResolveConditionalBoolean(resultFirst)))
                            return [2, ('false')];
                        if (!(resultFirst === '!')) return [3, 6];
                        resultDenySecond = (!this.ResolveConditionalBoolean(resultSecond)).toString();
                        resultDenyItemSecond = new DrapoExpressionItem(DrapoExpressionItemType.Text, resultDenySecond);
                        block.Items[0] = resultDenyItemSecond;
                        block.Items.splice(1, 1);
                        return [4, this.ResolveConditionalExpressionBlock(sector, context, renderContext, elj, eljForTemplate, block)];
                    case 5: return [2, (_a.sent())];
                    case 6:
                        resultThird = '';
                        hasMoreThanTwoTerms = block.Items.length > 2;
                        if (!hasMoreThanTwoTerms) return [3, 8];
                        return [4, this.EnsureExpressionItemResolved(sector, context, renderContext, elj, block, 2, eljForTemplate)];
                    case 7:
                        _a.sent();
                        resultThird = block.Items[2].Value;
                        _a.label = 8;
                    case 8:
                        if (!(resultThird === '!')) return [3, 12];
                        resultFourth = 'false';
                        if (!(block.Items.length > 3)) return [3, 10];
                        return [4, this.EnsureExpressionItemResolved(sector, context, renderContext, elj, block, 3, eljForTemplate)];
                    case 9:
                        _a.sent();
                        resultFourth = block.Items[3].Value;
                        _a.label = 10;
                    case 10:
                        resultDenyFourth = (!this.ResolveConditionalBoolean(resultFourth)).toString();
                        resultDenyItemFourth = new DrapoExpressionItem(DrapoExpressionItemType.Text, resultDenyFourth);
                        block.Items[2] = resultDenyItemFourth;
                        if (block.Items.length > 3)
                            block.Items.splice(3, 1);
                        return [4, this.ResolveConditionalExpressionBlock(sector, context, renderContext, elj, eljForTemplate, block)];
                    case 11: return [2, (_a.sent())];
                    case 12:
                        result = this.ResolveConditionalOperator(resultFirst, resultSecond, resultThird);
                        resultItem = new DrapoExpressionItem(DrapoExpressionItemType.Text);
                        resultItem.Value = result;
                        block.Items[0] = resultItem;
                        block.Items.splice(1, hasMoreThanTwoTerms ? 2 : 1);
                        return [4, this.ResolveConditionalExpressionBlock(sector, context, renderContext, elj, eljForTemplate, block)];
                    case 13: return [2, (_a.sent())];
                }
            });
        });
    };
    DrapoSolver.prototype.EnsureExpressionItemCurrentLevelResolved = function (sector, context, renderContext, elj, block, eljForTemplate) {
        return __awaiter(this, void 0, void 0, function () {
            var i, item, _a, _b, _c, _d, _e, _f, _g, _h;
            return __generator(this, function (_j) {
                switch (_j.label) {
                    case 0:
                        i = 0;
                        _j.label = 1;
                    case 1:
                        if (!(i < block.Items.length)) return [3, 6];
                        item = block.Items[i];
                        if (!(item.Type === DrapoExpressionItemType.Function)) return [3, 3];
                        _a = block.Items;
                        _b = i;
                        _c = DrapoExpressionItem.bind;
                        _d = [void 0, DrapoExpressionItemType.Text];
                        return [4, this.Application.FunctionHandler.ReplaceFunctionExpressions(sector, context, item.Value, true)];
                    case 2:
                        _a[_b] = new (_c.apply(DrapoExpressionItem, _d.concat([(_j.sent())])))();
                        return [3, 5];
                    case 3:
                        if (!(item.Type === DrapoExpressionItemType.Mustache)) return [3, 5];
                        _e = block.Items;
                        _f = i;
                        _g = DrapoExpressionItem.bind;
                        _h = [void 0, DrapoExpressionItemType.Text];
                        return [4, this.Application.Barber.ResolveControlFlowMustacheString(context, renderContext, item.Value, elj, sector, true, DrapoStorageLinkType.Render, eljForTemplate != null, eljForTemplate)];
                    case 4:
                        _e[_f] = new (_g.apply(DrapoExpressionItem, _h.concat([(_j.sent())])))();
                        _j.label = 5;
                    case 5:
                        i++;
                        return [3, 1];
                    case 6: return [2];
                }
            });
        });
    };
    DrapoSolver.prototype.JoinTexts = function (block) {
        for (var i = block.Items.length - 1; i > 0; i--) {
            var item = block.Items[i];
            if (item.Type !== DrapoExpressionItemType.Text)
                continue;
            var itemPrevious = block.Items[i - 1];
            if (itemPrevious.Type !== DrapoExpressionItemType.Text)
                continue;
            itemPrevious.Value = itemPrevious.Value + item.Value;
            block.Items.splice(i, 1);
        }
    };
    DrapoSolver.prototype.EnsureExpressionItemResolved = function (sector, context, renderContext, elj, block, index, eljForTemplate) {
        return __awaiter(this, void 0, void 0, function () {
            var item, _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
            return __generator(this, function (_o) {
                switch (_o.label) {
                    case 0:
                        item = block.Items[index];
                        if (!(item.Type === DrapoExpressionItemType.Block)) return [3, 2];
                        _a = block.Items;
                        _b = index;
                        _c = DrapoExpressionItem.bind;
                        _d = [void 0, DrapoExpressionItemType.Text];
                        return [4, this.ResolveConditionalExpressionBlock(sector, context, renderContext, elj, eljForTemplate, item)];
                    case 1:
                        _a[_b] = new (_c.apply(DrapoExpressionItem, _d.concat([(_o.sent()).toString()])))();
                        return [3, 6];
                    case 2:
                        if (!(item.Type === DrapoExpressionItemType.Function)) return [3, 4];
                        _e = block.Items;
                        _f = index;
                        _g = DrapoExpressionItem.bind;
                        _h = [void 0, DrapoExpressionItemType.Text];
                        return [4, this.Application.FunctionHandler.ReplaceFunctionExpressions(sector, context, item.Value, true)];
                    case 3:
                        _e[_f] = new (_g.apply(DrapoExpressionItem, _h.concat([(_o.sent())])))();
                        return [3, 6];
                    case 4:
                        if (!(item.Type === DrapoExpressionItemType.Mustache)) return [3, 6];
                        _j = block.Items;
                        _k = index;
                        _l = DrapoExpressionItem.bind;
                        _m = [void 0, DrapoExpressionItemType.Text];
                        return [4, this.Application.Barber.ResolveControlFlowMustacheString(context, renderContext, item.Value, elj, sector, true, DrapoStorageLinkType.Render, eljForTemplate != null, eljForTemplate)];
                    case 5:
                        _j[_k] = new (_l.apply(DrapoExpressionItem, _m.concat([(_o.sent())])))();
                        _o.label = 6;
                    case 6: return [2];
                }
            });
        });
    };
    DrapoSolver.prototype.ResolveConditionalBlock = function (block) {
        var parts = this.Application.Parser.ParseConditionalLogicalOrComparator(block);
        while (parts.length > 2) {
            var result = this.ResolveConditionalOperator(parts[0], parts[1], parts[2]);
            parts[0] = result;
            parts.splice(1, 2);
        }
        if (parts.length == 0)
            return (false);
        return (this.ResolveConditionalBoolean(parts[0]));
    };
    DrapoSolver.prototype.ResolveConditionalOperator = function (dataLeft, dataOperation, dataRight) {
        if (dataOperation == "||")
            return (((this.ResolveConditionalBoolean(dataLeft)) || (this.ResolveConditionalBoolean(dataRight))).toString());
        if (dataOperation == "&&")
            return (((this.ResolveConditionalBoolean(dataLeft)) && (this.ResolveConditionalBoolean(dataRight))).toString());
        if (dataOperation == "!=")
            return ((dataLeft !== dataRight).toString());
        if (dataOperation == "=")
            return ((dataLeft === dataRight).toString());
        if (dataOperation == "<")
            return ((this.ResolveConditionalOperatorLessThan(dataLeft, dataRight)).toString());
        if (dataOperation == "<=")
            return ((this.ResolveConditionalOperatorLessOrEqualThan(dataLeft, dataRight)).toString());
        if (dataOperation == ">")
            return ((this.ResolveConditionalOperatorGreaterThan(dataLeft, dataRight)).toString());
        if (dataOperation == ">=")
            return ((this.ResolveConditionalOperatorGreaterOrEqualThan(dataLeft, dataRight)).toString());
        if (dataOperation == "LIKE")
            return ((this.ResolveConditionalOperatorLike(dataLeft, dataRight)).toString());
        if (dataOperation == "+")
            return (this.ResolveOperationArithmeticAddition(dataLeft, dataRight));
        if (dataOperation == "-")
            return (this.ResolveOperationArithmeticSubtraction(dataLeft, dataRight));
        if (dataOperation == "*")
            return (this.ResolveOperationArithmeticMultiplication(dataLeft, dataRight));
        if (dataOperation == "/")
            return (this.ResolveOperationArithmeticDivision(dataLeft, dataRight));
        this.Application.ExceptionHandler.HandleError('Drapo: Conditional Operation {0} is not supported', dataOperation);
        return (dataLeft);
    };
    DrapoSolver.prototype.ResolveConditionalBoolean = function (data) {
        if ((data != null) && (typeof data === 'string'))
            data = data.toLowerCase();
        if (data == 'true')
            return (true);
        if (data == 'false')
            return (false);
        if (data == '!false')
            return (true);
        if (data == '!true')
            return (false);
        if (data == '!null')
            return (true);
        if (data == 'null')
            return (false);
        if (data == '!')
            return (true);
        return ((data != null) && (data != '') && ((data.length == 1) || (data[0] !== '!')));
    };
    DrapoSolver.prototype.ResolveConditionalOperatorLessThan = function (dataLeft, dataRight) {
        var numberLeft = this.Application.Parser.ParseNumberBlock(dataLeft, null);
        var numberRight = this.Application.Parser.ParseNumberBlock(dataRight, null);
        if ((numberLeft !== null) && (numberRight !== null))
            return (numberLeft < numberRight);
        return (dataLeft < dataRight);
    };
    DrapoSolver.prototype.ResolveConditionalOperatorLessOrEqualThan = function (dataLeft, dataRight) {
        var numberLeft = this.Application.Parser.ParseNumberBlock(dataLeft, null);
        var numberRight = this.Application.Parser.ParseNumberBlock(dataRight, null);
        if ((numberLeft !== null) && (numberRight !== null))
            return (numberLeft <= numberRight);
        return (dataLeft <= dataRight);
    };
    DrapoSolver.prototype.ResolveConditionalOperatorGreaterThan = function (dataLeft, dataRight) {
        var numberLeft = this.Application.Parser.ParseNumberBlock(dataLeft, null);
        var numberRight = this.Application.Parser.ParseNumberBlock(dataRight, null);
        if ((numberLeft !== null) && (numberRight !== null))
            return (numberLeft > numberRight);
        return (dataLeft > dataRight);
    };
    DrapoSolver.prototype.ResolveConditionalOperatorGreaterOrEqualThan = function (dataLeft, dataRight) {
        var numberLeft = this.Application.Parser.ParseNumberBlock(dataLeft, null);
        var numberRight = this.Application.Parser.ParseNumberBlock(dataRight, null);
        if ((numberLeft !== null) && (numberRight !== null))
            return (numberLeft >= numberRight);
        return (dataLeft >= dataRight);
    };
    DrapoSolver.prototype.ResolveConditionalOperatorLike = function (dataLeft, dataRight) {
        if ((dataLeft == null) || (dataLeft == ''))
            return (false);
        if ((dataRight == null) || (dataRight == ''))
            return (false);
        var isAnyLeft = dataRight[0] === '%';
        var isAnyRight = dataRight[dataRight.length - 1] === '%';
        var dataRightClean = ((!isAnyLeft) && (!isAnyRight)) ? dataRight : dataRight.substring((isAnyLeft ? 1 : 0), dataRight.length - (isAnyRight ? 1 : 0));
        var index = dataLeft.toLowerCase().indexOf(dataRightClean.toLowerCase());
        if ((index == null) || (index < 0))
            return (false);
        if ((isAnyLeft) && (isAnyRight))
            return (true);
        if ((isAnyRight) && (index == 0))
            return (true);
        if ((isAnyLeft) && (index == (dataLeft.length - dataRight.length)))
            return (true);
        return (false);
    };
    DrapoSolver.prototype.ResolveOperationArithmeticAddition = function (dataLeft, dataRight) {
        var numberLeft = this.Application.Parser.ParseNumberBlock(dataLeft, 0);
        var numberRight = this.Application.Parser.ParseNumberBlock(dataRight, 0);
        var numberResult = numberLeft + numberRight;
        return (numberResult.toString());
    };
    DrapoSolver.prototype.ResolveOperationArithmeticSubtraction = function (dataLeft, dataRight) {
        var numberLeft = this.Application.Parser.ParseNumberBlock(dataLeft, 0);
        var numberRight = this.Application.Parser.ParseNumberBlock(dataRight, 0);
        var numberResult = numberLeft - numberRight;
        return (numberResult.toString());
    };
    DrapoSolver.prototype.ResolveOperationArithmeticMultiplication = function (dataLeft, dataRight) {
        var numberLeft = this.Application.Parser.ParseNumberBlock(dataLeft, 0);
        var numberRight = this.Application.Parser.ParseNumberBlock(dataRight, 0);
        var numberResult = numberLeft * numberRight;
        return (numberResult.toString());
    };
    DrapoSolver.prototype.ResolveOperationArithmeticDivision = function (dataLeft, dataRight) {
        var numberLeft = this.Application.Parser.ParseNumberBlock(dataLeft, 0);
        var numberRight = this.Application.Parser.ParseNumberBlock(dataRight, 0);
        var numberResult = numberRight != 0 ? numberLeft / numberRight : 0;
        return (numberResult.toString());
    };
    DrapoSolver.prototype.CreateContextItemFromPath = function (sector, dataPath) {
        return __awaiter(this, void 0, void 0, function () {
            var dataKey, context, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dataKey = dataPath[0];
                        context = new DrapoContext();
                        return [4, this.Application.Storage.RetrieveData(dataKey, sector)];
                    case 1:
                        data = _a.sent();
                        return [2, (context.Create(data, null, null, dataKey, dataKey, null, null))];
                }
            });
        });
    };
    DrapoSolver.prototype.CreateMustache = function (dataPath) {
        var mustache = '{{';
        for (var i = 0; i < dataPath.length; i++) {
            if (i > 0)
                mustache = mustache + '.';
            mustache = mustache + dataPath[i];
        }
        return (mustache + '}}');
    };
    DrapoSolver.prototype.CreateMustacheContext = function (context, mustacheParts) {
        var mustacheContext = [];
        var updated = false;
        for (var i = 0; i < mustacheParts.length; i++) {
            var mustachePart = mustacheParts[i];
            var mustachePartNext = i < (mustacheParts.length - 1) ? mustacheParts[i + 1] : null;
            var mustacheSystem = mustachePartNext != null ? this.GetSystemContextPathValue(null, context, [mustachePart, mustachePartNext]) : null;
            if (mustacheSystem !== null) {
                return (mustacheSystem);
            }
            else {
                var mustacheRelative = context.GetContextRelativeArray(mustachePart);
                if (mustacheRelative === null) {
                    mustacheContext.push(mustachePart);
                }
                else {
                    for (var j = 0; j < mustacheRelative.length; j++)
                        mustacheContext.push(mustacheRelative[j]);
                    updated = true;
                }
            }
        }
        if (!updated)
            return (null);
        var mustacheRecursive = this.CreateMustache(mustacheContext);
        var mustacheRecursiveParts = this.Application.Parser.ParseMustache(mustacheRecursive);
        var mustacheRecursiveContext = this.CreateMustacheContext(context, mustacheRecursiveParts);
        if (mustacheRecursiveContext !== null)
            return (mustacheRecursiveContext);
        return (mustacheRecursive);
    };
    DrapoSolver.prototype.CreateMustacheReference = function (sector, contextItem, mustache) {
        return __awaiter(this, void 0, void 0, function () {
            var mustacheContext, mustacheParts, i, mustachePart, mustacheRelative, j, dataKey, storageItem, sectorStorage, mustacheReference;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mustacheContext = [];
                        mustacheParts = this.Application.Parser.ParseMustache(mustache);
                        for (i = 0; i < mustacheParts.length; i++) {
                            mustachePart = mustacheParts[i];
                            if (contextItem != null) {
                                mustacheRelative = this.GetContextItemAbsolute(contextItem, mustachePart);
                                for (j = 0; j < mustacheRelative.length; j++)
                                    mustacheContext.push(mustacheRelative[j]);
                            }
                            else {
                                mustacheContext.push(mustachePart);
                            }
                        }
                        dataKey = mustacheContext[0];
                        return [4, this.Application.Storage.RetrieveDataItem(dataKey, sector)];
                    case 1:
                        storageItem = _a.sent();
                        if (storageItem == null)
                            return [2, ('')];
                        sectorStorage = storageItem.Sector != null ? storageItem.Sector : '';
                        mustacheContext.splice(0, 0, '@' + sectorStorage);
                        mustacheReference = this.CreateMustache(mustacheContext);
                        return [2, (mustacheReference)];
                }
            });
        });
    };
    DrapoSolver.prototype.GetContextItemAbsolute = function (contextItem, mustachePart) {
        if (contextItem.Key !== mustachePart)
            return ([mustachePart]);
        var iteratorParts = this.Application.Parser.ParseForIterable(contextItem.Iterator);
        var mustachePartsAbsolute = iteratorParts.concat('[' + contextItem.Index + ']');
        return (mustachePartsAbsolute);
    };
    DrapoSolver.prototype.ResolveDataPathMustache = function (context, elementJQuery, sector, mustacheParts) {
        return __awaiter(this, void 0, void 0, function () {
            var updated, i, mustachePart, mustachePartParts, dataValue;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        updated = false;
                        i = 1;
                        _a.label = 1;
                    case 1:
                        if (!(i < mustacheParts.length)) return [3, 4];
                        mustachePart = mustacheParts[i];
                        if (!this.Application.Parser.IsMustache(mustachePart))
                            return [3, 3];
                        mustachePartParts = this.Application.Parser.ParseMustache(mustachePart);
                        return [4, this.ResolveDataPath(context, elementJQuery, sector, mustachePartParts)];
                    case 2:
                        dataValue = _a.sent();
                        mustacheParts[i] = dataValue;
                        updated = true;
                        _a.label = 3;
                    case 3:
                        i++;
                        return [3, 1];
                    case 4:
                        if (!updated)
                            return [2, (null)];
                        return [2, (this.CreateMustache(mustacheParts))];
                }
            });
        });
    };
    DrapoSolver.prototype.ExistDataPath = function (context, sector, path) {
        return __awaiter(this, void 0, void 0, function () {
            var dataKey, dataFields, item;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dataKey = this.Application.Solver.ResolveDataKey(path);
                        dataFields = this.Application.Solver.ResolveDataFields(path);
                        return [4, this.ResolveDataPathObjectItem(context.Item, dataKey, sector, true, path)];
                    case 1:
                        item = _a.sent();
                        if (item == null)
                            return [2, (false)];
                        return [2, (this.ExistDataPathObject(item.Data, path))];
                }
            });
        });
    };
    DrapoSolver.prototype.ExistDataPathObject = function (dataObject, dataPath) {
        var data = dataObject;
        for (var i = 1; i < dataPath.length; i++) {
            var currentKey = dataPath[i];
            var index = this.GetDataObjectPathObjectPropertyIndex(currentKey);
            if (index === null) {
                if ((data === null) || (data === undefined) || (data[currentKey] === undefined)) {
                    return (false);
                }
                data = data[currentKey];
            }
            else {
                if (!data.length)
                    return (false);
                data = data[index];
            }
        }
        if ((data === null) || (data === undefined))
            return (false);
        return (true);
    };
    DrapoSolver.prototype.ResolveDataPath = function (context, elementJQuery, sector, path, canBindReader, canBindWriter, modelEvents, modelEventsCancel) {
        if (canBindReader === void 0) { canBindReader = false; }
        if (canBindWriter === void 0) { canBindWriter = false; }
        if (modelEvents === void 0) { modelEvents = null; }
        if (modelEventsCancel === void 0) { modelEventsCancel = null; }
        return __awaiter(this, void 0, void 0, function () {
            var dataPath, i, mustache, isMustacheIndexer, mustacheIndexer, mustacheParts, mustacheValue, mustacheValueIndexer, dataKey, dataFields, _a, data, _b, _c, _d, _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        dataPath = (typeof path === 'string') ? [path] : path;
                        i = 1;
                        _f.label = 1;
                    case 1:
                        if (!(i < dataPath.length)) return [3, 4];
                        mustache = dataPath[i];
                        isMustacheIndexer = this.Application.Parser.IsMustacheIndexer(mustache);
                        mustacheIndexer = isMustacheIndexer ? this.Application.Parser.GetMustacheInsideIndexer(mustache) : mustache;
                        if (!this.Application.Parser.IsMustache(mustacheIndexer))
                            return [3, 3];
                        mustacheParts = this.Application.Parser.ParseMustache(mustacheIndexer);
                        return [4, this.ResolveDataPath(context, elementJQuery, sector, mustacheParts, canBindReader, canBindWriter, modelEvents)];
                    case 2:
                        mustacheValue = _f.sent();
                        mustacheValueIndexer = isMustacheIndexer ? this.Application.Parser.CreateMustacheIndexer(mustacheValue) : mustacheValue;
                        dataPath[i] = mustacheValueIndexer;
                        _f.label = 3;
                    case 3:
                        i++;
                        return [3, 1];
                    case 4:
                        dataKey = this.Application.Solver.ResolveDataKey(dataPath);
                        dataFields = this.Application.Solver.ResolveDataFields(dataPath);
                        _a = (!context.IsKey(dataKey));
                        if (!_a) return [3, 6];
                        return [4, this.Application.Storage.EnsureDataKeyFieldReady(dataKey, sector, dataPath)];
                    case 5:
                        _a = (!(_f.sent()));
                        _f.label = 6;
                    case 6:
                        if (_a) {
                            if ((dataFields.length === 0))
                                return [2, ('')];
                            if (this.Application.Storage.IsDataKeyDelay(dataKey, sector))
                                this.Application.Observer.SubscribeDelay(elementJQuery != null ? elementJQuery[0] : null, dataKey, dataFields);
                            return [2, (this.CreateMustache(dataPath))];
                        }
                        return [4, this.ResolveDataPathObject(sector, context, dataPath)];
                    case 7:
                        data = _f.sent();
                        if (!canBindWriter) return [3, 9];
                        _c = (_b = this.Application.Binder).BindReaderWriter;
                        return [4, this.ResolveDataPathObjectItem(context.Item, dataKey, sector)];
                    case 8:
                        _c.apply(_b, [_f.sent(), elementJQuery != null ? elementJQuery[0] : null, dataFields, modelEvents, modelEventsCancel]);
                        return [3, 11];
                    case 9:
                        if (!canBindReader) return [3, 11];
                        _e = (_d = this.Application.Binder).BindReader;
                        return [4, this.ResolveDataPathObjectItem(context.Item, dataKey, sector)];
                    case 10:
                        _e.apply(_d, [_f.sent(), elementJQuery != null ? elementJQuery[0] : null, dataFields]);
                        _f.label = 11;
                    case 11: return [2, (data)];
                }
            });
        });
    };
    DrapoSolver.prototype.ResolveDataPathObject = function (sector, context, dataPath) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.ResolveItemDataPathObject(sector, context.Item, dataPath)];
                    case 1: return [2, (_a.sent())];
                }
            });
        });
    };
    DrapoSolver.prototype.ResolveItemDataPathObject = function (sector, contextItem, dataPath, canForceLoadDataDelay) {
        if (canForceLoadDataDelay === void 0) { canForceLoadDataDelay = false; }
        return __awaiter(this, void 0, void 0, function () {
            var valueSystem, dataKey, item;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        valueSystem = contextItem !== null ? this.GetSystemContextPathValue(sector, contextItem.Context, dataPath) : null;
                        if (valueSystem !== null)
                            return [2, (valueSystem)];
                        dataKey = dataPath[0];
                        return [4, this.ResolveDataPathObjectItem(contextItem, dataKey, sector, canForceLoadDataDelay, dataPath)];
                    case 1:
                        item = _a.sent();
                        if (item == null)
                            return [2, ('')];
                        return [2, (this.ResolveDataObjectPathObject(item.Data, dataPath))];
                }
            });
        });
    };
    DrapoSolver.prototype.ResolveItemStoragePathObject = function (item, dataPath) {
        var valueSystem = item !== null ? this.GetSystemPathValue(item, dataPath) : null;
        if (valueSystem !== null)
            return (valueSystem);
        return (this.ResolveDataObjectPathObject(item.Data, dataPath));
    };
    DrapoSolver.prototype.ResolveDataObjectPathObject = function (dataObject, dataPath) {
        var data = dataObject;
        for (var i = 1; i < dataPath.length; i++) {
            var currentKey = dataPath[i];
            var index = this.GetDataObjectPathObjectPropertyIndex(currentKey);
            if (index === null) {
                if ((data === null) || (data === undefined) || (data[currentKey] === undefined)) {
                    return ('');
                }
                data = data[currentKey];
            }
            else {
                if (!data.length)
                    return ('');
                data = data[index];
            }
        }
        if ((data === null) || (data === undefined))
            return ('');
        return (data);
    };
    DrapoSolver.prototype.GetDataObjectPathObjectPropertyIndex = function (property) {
        if (property.length < 3)
            return (null);
        if (property[0] !== '[')
            return (null);
        if (property[property.length - 1] !== ']')
            return (null);
        return (this.Application.Parser.ParseNumber(property.substring(1, property.length - 1)));
    };
    DrapoSolver.prototype.ResolveDataObjectLookupHierarchy = function (data, searchField, searchValue, searchHierarchyField) {
        if (searchHierarchyField === void 0) { searchHierarchyField = null; }
        var dataList = data.length == null ? [data] : data;
        for (var i = 0; i < dataList.length; i++) {
            var dataCurrent = dataList[i];
            if (dataCurrent == null)
                continue;
            if ((searchHierarchyField != null) && (dataCurrent[searchHierarchyField] != null)) {
                var dataCurrentChild = this.ResolveDataObjectLookupHierarchy(dataCurrent[searchHierarchyField], searchField, searchValue, searchHierarchyField);
                if (dataCurrentChild != null)
                    return (dataCurrentChild);
            }
            var itemValue = searchField == '_Index' ? i : dataCurrent[searchField];
            if (itemValue == searchValue)
                return (dataCurrent);
        }
        return (null);
    };
    DrapoSolver.prototype.UpdateDataObjectLookupHierarchy = function (data, searchField, searchValue, value, searchHierarchyField) {
        if (searchHierarchyField === void 0) { searchHierarchyField = null; }
        var dataList = data.length == null ? [data] : data;
        for (var i = 0; i < dataList.length; i++) {
            var dataCurrent = dataList[i];
            if (dataCurrent == null)
                continue;
            if ((searchHierarchyField != null) && (dataCurrent[searchHierarchyField] != null)) {
                var updated = this.UpdateDataObjectLookupHierarchy(dataCurrent[searchHierarchyField], searchField, searchValue, value, searchHierarchyField);
                if (updated != null)
                    return (updated);
            }
            var itemValue = searchField == '_Index' ? i : dataCurrent[searchField];
            if ((itemValue != null) && (itemValue == searchValue)) {
                dataList[i] = value;
                return (true);
            }
        }
        return (null);
    };
    DrapoSolver.prototype.ContainsItemStoragePathObject = function (item, dataPath) {
        var data = item.Data;
        for (var i = 1; i < dataPath.length; i++) {
            var currentKey = dataPath[i];
            if ((data === null) || (data === undefined) || (data[currentKey] === undefined)) {
                return (false);
            }
            data = data[currentKey];
        }
        return (true);
    };
    DrapoSolver.prototype.ResolveDataPathObjectItem = function (contextItem, dataKey, sector, canForceLoadDataDelay, dataPath) {
        if (canForceLoadDataDelay === void 0) { canForceLoadDataDelay = false; }
        if (dataPath === void 0) { dataPath = null; }
        return __awaiter(this, void 0, void 0, function () {
            var item, dataItem, context;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        item = contextItem;
                        while (item != null) {
                            if (item.Key == dataKey)
                                return [2, (item)];
                            item = item.Parent;
                        }
                        return [4, this.Application.Storage.RetrieveDataItem(dataKey, sector, canForceLoadDataDelay, null)];
                    case 1:
                        dataItem = _a.sent();
                        if (dataItem == null)
                            return [2, (null)];
                        if (!((canForceLoadDataDelay) && (dataItem.IsDelay))) return [3, 3];
                        return [4, this.Application.Storage.EnsureDataDelayLoaded(dataItem, dataPath)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        context = new DrapoContext();
                        return [2, (context.Create(dataItem.Data, null, null, dataKey, null, null, null))];
                }
            });
        });
    };
    DrapoSolver.prototype.ResolveSector = function (mustacheParts, sector) {
        var mustacheSector = mustacheParts[0];
        if (mustacheSector === '@')
            return (null);
        if (mustacheSector.indexOf("@") === 0)
            return (mustacheSector.substring(1));
        return (sector);
    };
    DrapoSolver.prototype.HasMustachePartsSector = function (mustacheParts) {
        if (mustacheParts == null)
            return (false);
        var part = mustacheParts[0];
        if (part == null)
            return (false);
        if (part.length == 0)
            return (false);
        return (part[0] === '@');
    };
    DrapoSolver.prototype.ResolveDataKey = function (mustacheParts) {
        var index = this.HasMustachePartsSector(mustacheParts) ? 1 : 0;
        return (mustacheParts[index]);
    };
    DrapoSolver.prototype.ResolveDataFields = function (mustacheParts) {
        var dataFields = [];
        var start = this.HasMustachePartsSector(mustacheParts) ? 2 : 1;
        for (var i = start; i < mustacheParts.length; i++)
            dataFields.push(mustacheParts[i]);
        return (dataFields);
    };
    DrapoSolver.prototype.CreateDataPath = function (dataKey, dataFields) {
        var path = [];
        path.push(dataKey);
        if (dataFields != null) {
            for (var i = 0; i < dataFields.length; i++)
                path.push(dataFields[i]);
        }
        return (path);
    };
    DrapoSolver.prototype.GetDataPathParent = function (dataPath) {
        var dataPathParent = [];
        for (var i = 0; i < dataPath.length - 1; i++)
            dataPathParent.push(dataPath[i]);
        return (dataPathParent);
    };
    DrapoSolver.prototype.UpdateItemDataPathObject = function (sector, contextItem, dataPath, value, canNotify) {
        if (canNotify === void 0) { canNotify = true; }
        return __awaiter(this, void 0, void 0, function () {
            var key, storageItem, item, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        key = dataPath[0];
                        if (!(contextItem === null)) return [3, 4];
                        return [4, this.Application.Storage.RetrieveDataItem(key, sector)];
                    case 1:
                        storageItem = _a.sent();
                        if (storageItem === null)
                            return [2, (false)];
                        if (dataPath.length === 1) {
                            if (storageItem.Data === value)
                                return [2, (false)];
                            storageItem.Data = value;
                        }
                        else {
                            if (!this.UpdateDataPathObject(storageItem.Data, dataPath, value))
                                return [2, (false)];
                        }
                        storageItem.HasChanges = true;
                        if (!canNotify) return [3, 3];
                        return [4, this.Application.Observer.Notify(key, null, this.ResolveDataFields(dataPath))];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2, (true)];
                    case 4: return [4, this.ResolveDataPathObjectItem(contextItem, key, sector)];
                    case 5:
                        item = _a.sent();
                        if (item == null)
                            return [2, (false)];
                        if (dataPath.length === 1) {
                            if (item.Data === value)
                                return [2, (false)];
                            item.Data = value;
                        }
                        else {
                            data = item.Data;
                            if (!this.UpdateDataPathObject(item.Data, dataPath, value))
                                return [2, (false)];
                        }
                        if (!canNotify) return [3, 7];
                        return [4, this.Application.Observer.Notify(item.DataKey, item.Index, this.ResolveDataFields(dataPath))];
                    case 6:
                        _a.sent();
                        _a.label = 7;
                    case 7: return [2, (true)];
                }
            });
        });
    };
    DrapoSolver.prototype.UpdateDataPathObject = function (data, dataPath, value) {
        for (var i = 1; i < dataPath.length - 1; i++) {
            var currentKey = dataPath[i];
            var index = this.GetDataObjectPathObjectPropertyIndex(currentKey);
            if (index === null) {
                if ((data === null) || (data === undefined) || (data[currentKey] === undefined)) {
                    return (false);
                }
                data = data[currentKey];
            }
            else {
                if (!data.length)
                    return (false);
                data = data[index];
            }
        }
        if (data == null)
            return (false);
        var dataField = dataPath[dataPath.length - 1];
        var indexDataField = this.GetDataObjectPathObjectPropertyIndex(dataField);
        if (indexDataField === null) {
            if (data[dataField] === value)
                return (false);
            data[dataField] = value;
        }
        else {
            if (data[indexDataField] === value)
                return (false);
            data[indexDataField] = value;
        }
        return (true);
    };
    DrapoSolver.prototype.Clone = function (object, deepCopy) {
        if (deepCopy === void 0) { deepCopy = false; }
        if (typeof object === "string")
            return (object);
        if (typeof object === "number")
            return (object);
        if ($.isArray(object))
            return (this.CloneArray(object, deepCopy));
        if (deepCopy)
            return (jQuery.extend(true, {}, object));
        else
            return (jQuery.extend({}, object));
    };
    DrapoSolver.prototype.CloneArray = function (object, deepCopy) {
        if (deepCopy)
            return (jQuery.extend(true, [], object));
        else
            return (jQuery.extend([], object));
    };
    DrapoSolver.prototype.CloneArrayString = function (list) {
        if (list == null)
            return (null);
        var clone = [];
        for (var i = 0; i < list.length; i++)
            clone.push(list[i]);
        return (clone);
    };
    DrapoSolver.prototype.CloneArrayElement = function (list) {
        if (list == null)
            return (null);
        var clone = [];
        for (var i = 0; i < list.length; i++)
            clone.push(list[i]);
        return (clone);
    };
    DrapoSolver.prototype.CloneArrayAny = function (list) {
        if (list == null)
            return (null);
        var clone = [];
        for (var i = 0; i < list.length; i++)
            clone.push(list[i]);
        return (clone);
    };
    DrapoSolver.prototype.CloneElement = function (el) {
        if (el == null)
            return (null);
        var elj = $(el).clone();
        return (elj[0]);
    };
    DrapoSolver.prototype.GetSystemContextPathValue = function (sector, context, dataPath) {
        if (dataPath.length != 2)
            return (null);
        var property = dataPath[1];
        if (property.charAt(0) !== '_')
            return (null);
        if (context.Item === null)
            return (null);
        var propertyLower = property.toLowerCase();
        var key = dataPath[0];
        if (propertyLower === '_index')
            return (this.GetSystemContextPathValueIndex(context, key));
        if (propertyLower === '_indexrelative')
            return (this.GetSystemContextPathValueIndexRelative(context, key));
        if (context.Item.Key !== key)
            return (null);
        if (propertyLower === '_level')
            return (this.GetSystemContextPathValueLevel(context));
        if (propertyLower === '_haschanges')
            return (this.GetSystemContextPathValueHasChanges(sector, context.Item.DataKey));
        return (null);
    };
    DrapoSolver.prototype.GetSystemPathValue = function (item, dataPath) {
        if (dataPath.length != 2)
            return (null);
        var property = dataPath[1];
        if (property.charAt(0) !== '_')
            return (null);
        if (item === null)
            return (null);
        var propertyLower = dataPath[1].toLowerCase();
        if (propertyLower === '_haschanges')
            return (item.HasChanges.toString());
        return (null);
    };
    DrapoSolver.prototype.GetSystemContextPathValueIndex = function (context, key) {
        var index = context.GetIndex(key);
        if (index === null)
            return (null);
        return (index.toString());
    };
    DrapoSolver.prototype.GetSystemContextPathValueIndexRelative = function (context, key) {
        var indexRelative = context.GetIndexRelative(key);
        if (indexRelative === null)
            return (null);
        return (indexRelative.toString());
    };
    DrapoSolver.prototype.GetSystemContextPathValueLevel = function (context) {
        return (context.Level.toString());
    };
    DrapoSolver.prototype.GetSystemContextPathValueHasChanges = function (sector, dataKey) {
        return (this.Application.Storage.HasChanges(sector, dataKey).toString());
    };
    DrapoSolver.prototype.ResolveSystemContextPath = function (sector, context, expression) {
        if (expression.indexOf('._') < 0)
            return (expression);
        var mustaches = this.Application.Parser.ParseMustaches(expression);
        for (var i = 0; i < mustaches.length; i++) {
            var mustache = mustaches[i];
            var dataPath = this.Application.Parser.ParseMustache(mustache);
            var data = this.GetSystemContextPathValue(sector, context, dataPath);
            if (data === null)
                continue;
            expression = expression.replace(mustache, data);
        }
        return (expression);
    };
    DrapoSolver.prototype.TransformObjectIntoArray = function (object) {
        var array = [];
        for (var property in object) {
            var objectProperty = {};
            objectProperty.Key = property;
            objectProperty.Value = object[property];
            array.push(objectProperty);
        }
        return (array);
    };
    DrapoSolver.prototype.ResolveUrlToAbsolute = function (urlRelative) {
        if (urlRelative.search(/^\/\//) != -1)
            return (window.location.protocol + urlRelative);
        if (urlRelative.search(/:\/\//) != -1)
            return (urlRelative);
        if (urlRelative.search(/^\//) != -1)
            return window.location.origin + urlRelative;
        var base = window.location.href.match(/(.*\/)/)[0];
        return (base + urlRelative);
    };
    DrapoSolver.prototype.Contains = function (data, item) {
        for (var i = 0; i < data.length; i++)
            if (data[i] == item)
                return (true);
        return (false);
    };
    DrapoSolver.prototype.Join = function (list1, list2) {
        var list = [];
        for (var i = 0; i < list1.length; i++)
            list.push(list1[i]);
        for (var i = 0; i < list2.length; i++) {
            var value = list2[i];
            if (!this.Contains(list, value))
                list.push(value);
        }
        return (list);
    };
    DrapoSolver.prototype.Get = function (dictionary, key) {
        for (var i = 0; i < dictionary.length; i++) {
            var keyValue = dictionary[i];
            if (keyValue[0] === key)
                return (keyValue[1]);
        }
        return (null);
    };
    DrapoSolver.prototype.IsEqualStringArray = function (list1, list2) {
        if (list1.length !== list2.length)
            return (false);
        for (var i = 0; i < list1.length; i++)
            if (list1[i] !== list2[i])
                return (false);
        return (true);
    };
    DrapoSolver.prototype.IsEqualString = function (value1, value2) {
        var value1String = this.EnsureString(value1);
        var value2String = this.EnsureString(value2);
        return (value1String === value2String);
    };
    DrapoSolver.prototype.EnsureString = function (data) {
        if (data === null)
            return (data);
        if (typeof data === 'object')
            return ('object');
        if (typeof data === 'string')
            return (data);
        return (data.toString());
    };
    DrapoSolver.prototype.Replace = function (data, from, to) {
        if (from === '.')
            from = '\\.';
        var regex = new RegExp(from, 'g');
        var dataReplaced = data.replace(regex, to);
        return (dataReplaced);
    };
    DrapoSolver.prototype.ResolveMathematicalExpression = function (data) {
        var tokens = this.Application.Parser.ParseBlockMathematicalExpression(data);
        for (var i = 0; i < tokens.length; i++) {
            var token = tokens[i];
            if ((token.length > 2) && (token[0] === '(') && (token[token.length - 1] === ')'))
                tokens[i] = this.ResolveMathematicalExpression(token.substring(1, token.length - 1));
        }
        for (var i = 0; i < tokens.length - 2; i++) {
            var token = tokens[i + 1];
            if (token !== '*')
                continue;
            var blockMultiFirstParameter = tokens[i];
            var blockMultiSecondParameter = tokens[i + 2];
            var blockMultiValue = (this.Application.Parser.ParseNumber(blockMultiFirstParameter) * this.Application.Parser.ParseNumber(blockMultiSecondParameter)).toString();
            tokens[i] = blockMultiValue;
            tokens.splice(i + 1, 2);
            i--;
        }
        for (var i = 0; i < tokens.length - 2; i++) {
            var token = tokens[i + 1];
            if (token !== '/')
                continue;
            var blockDivisionFirstParameter = tokens[i];
            var blockDivisionSecondParameter = tokens[i + 2];
            var numberDividend = this.Application.Parser.ParseNumber(blockDivisionSecondParameter);
            var blockDivisionValue = numberDividend == 0 ? '0' : (this.Application.Parser.ParseNumber(blockDivisionFirstParameter) / numberDividend).toString();
            tokens[i] = blockDivisionValue;
            tokens.splice(i + 1, 2);
            i--;
        }
        for (var i = 0; i < tokens.length - 2; i++) {
            var token = tokens[i + 1];
            if (token !== '+')
                continue;
            var blockPlusFirstParameter = tokens[i];
            var blockPlusSecondParameter = tokens[i + 2];
            var blockPlusValue = (this.Application.Parser.ParseNumber(blockPlusFirstParameter) + this.Application.Parser.ParseNumber(blockPlusSecondParameter)).toString();
            tokens[i] = blockPlusValue;
            tokens.splice(i + 1, 2);
            i--;
        }
        for (var i = 0; i < tokens.length - 2; i++) {
            var token = tokens[i + 1];
            if (token !== '-')
                continue;
            var blockMinusFirstParameter = tokens[i];
            var blockMinusSecondParameter = tokens[i + 2];
            var blockMinusValue = (this.Application.Parser.ParseNumber(blockMinusFirstParameter) - this.Application.Parser.ParseNumber(blockMinusSecondParameter)).toString();
            tokens[i] = blockMinusValue;
            tokens.splice(i + 1, 2);
            i--;
        }
        return (tokens[0]);
    };
    return DrapoSolver;
}());

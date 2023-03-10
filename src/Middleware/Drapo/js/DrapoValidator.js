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
var DrapoValidator = (function () {
    function DrapoValidator(application) {
        this._sectors = [];
        this._sectorsValidationRuleIDs = [];
        this._sectorsValidationRuleTypes = [];
        this._sectorsValidationRuleValues = [];
        this._sectorsValidationRuleTags = [];
        this._sectorsValidationRuleContexts = [];
        this._sectorsValidationGroupGroups = [];
        this._sectorsValidationGroupRules = [];
        this._sectorsValidationGroupContexts = [];
        this._sectorsValidationInterfaceIDs = [];
        this._sectorsValidationInterfaceElements = [];
        this._sectorsValidationInterfaceContexts = [];
        this._application = application;
    }
    Object.defineProperty(DrapoValidator.prototype, "Application", {
        get: function () {
            return (this._application);
        },
        enumerable: false,
        configurable: true
    });
    DrapoValidator.prototype.HasContentValidation = function (content) {
        return (content.indexOf('d-validation') > -1);
    };
    DrapoValidator.prototype.UnloadSectorHierarchy = function (sector) {
        var sectorChildren = this.Application.Document.GetSectorAndChildren(sector);
        for (var i = 0; i < sectorChildren.length; i++)
            this.UnloadSector(sectorChildren[i]);
    };
    DrapoValidator.prototype.UnloadSector = function (sector) {
        var index = this.GetSectorIndex(sector);
        if (index === null)
            return;
        this._sectors.splice(index, 1);
        this._sectorsValidationRuleIDs.splice(index, 1);
        this._sectorsValidationRuleTypes.splice(index, 1);
        this._sectorsValidationRuleValues.splice(index, 1);
        this._sectorsValidationRuleTags.splice(index, 1);
        this._sectorsValidationRuleContexts.splice(index, 1);
        this._sectorsValidationGroupGroups.splice(index, 1);
        this._sectorsValidationGroupRules.splice(index, 1);
        this._sectorsValidationGroupContexts.splice(index, 1);
        this._sectorsValidationInterfaceIDs.splice(index, 1);
        this._sectorsValidationInterfaceElements.splice(index, 1);
        this._sectorsValidationInterfaceContexts.splice(index, 1);
    };
    DrapoValidator.prototype.RegisterValidation = function (el, sector, context) {
        if (context === void 0) { context = null; }
        return __awaiter(this, void 0, void 0, function () {
            var validations, contextItem, validationID, validationIDResolved, validationType, validationValue, validationGroup, validationGroups, validationTag, validation, validationResolved, elj, validatorUncheckedClass;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        validations = this.ExtractValidations(el);
                        if (validations.length === 0)
                            return [2];
                        if ((context == null) && (this.Application.Document.IsElementInsideControlFlowOrContext(el)))
                            return [2];
                        contextItem = context != null ? context.Item : null;
                        validationID = this.Application.Solver.Get(validations, 'id');
                        return [4, this.ResolveValidationID(sector, validationID, contextItem)];
                    case 1:
                        validationIDResolved = _a.sent();
                        if (validationIDResolved != null) {
                            validationType = this.Application.Solver.Get(validations, 'type');
                            validationValue = this.Application.Solver.Get(validations, 'value');
                            validationGroup = this.Application.Solver.Get(validations, 'group');
                            validationGroups = this.Application.Parser.ParseValidationGroups(validationGroup);
                            validationTag = this.GetValidationTag(validations, validationType);
                            this.AddValidationRule(sector, validationIDResolved, validationType, validationValue, validationTag, contextItem);
                            this.AddValidationGroups(sector, validationIDResolved, validationGroups, contextItem);
                        }
                        validation = this.Application.Solver.Get(validations, '');
                        return [4, this.ResolveValidationID(sector, validation, contextItem)];
                    case 2:
                        validationResolved = _a.sent();
                        if (!(validationResolved != null)) return [3, 4];
                        elj = $(el);
                        this.AddValidationInterface(sector, validationResolved, el, contextItem);
                        return [4, this.Application.Config.GetValidatorUncheckedClass()];
                    case 3:
                        validatorUncheckedClass = _a.sent();
                        if (validatorUncheckedClass != null) {
                            elj.addClass(validatorUncheckedClass);
                        }
                        _a.label = 4;
                    case 4: return [2];
                }
            });
        });
    };
    DrapoValidator.prototype.ResolveValidationID = function (sector, validationID, contextItem) {
        return __awaiter(this, void 0, void 0, function () {
            var validationIDContext;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.Application.Parser.HasMustache(validationID))
                            return [2, (validationID)];
                        if (!(contextItem == null)) return [3, 2];
                        return [4, this.Application.Storage.ResolveMustachesRecursive(sector, validationID)];
                    case 1: return [2, (_a.sent())];
                    case 2: return [4, this.Application.Barber.ResolveControlFlowMustacheString(contextItem.Context, null, null, validationID, null, sector, false)];
                    case 3:
                        validationIDContext = _a.sent();
                        return [2, (validationIDContext)];
                }
            });
        });
    };
    DrapoValidator.prototype.GetValidationTag = function (validations, validationType) {
        if (validationType === 'regex')
            return (this.Application.Solver.Get(validations, 'expression'));
        if (validationType === 'compare')
            return (this.Application.Solver.Get(validations, 'valuetocompare'));
        if (validationType === 'outside')
            return (this.Application.Solver.Get(validations, 'sector'));
        return (null);
    };
    DrapoValidator.prototype.IsValidationEventValid = function (el, sector, eventType, location, event, contextItem) {
        return __awaiter(this, void 0, void 0, function () {
            var attribute, validation, isValid;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (el.getAttribute == null)
                            return [2, (true)];
                        attribute = location == null ? 'd-validation-on-' + eventType : 'd-validation-on-' + location + '-' + eventType;
                        validation = el.getAttribute(attribute);
                        if (validation == null)
                            return [2, (true)];
                        return [4, this.IsValidationExpressionValid(el, sector, validation, contextItem, event)];
                    case 1:
                        isValid = _a.sent();
                        return [2, (isValid)];
                }
            });
        });
    };
    DrapoValidator.prototype.IsValidationExpressionValid = function (el, sector, validation, contextItem, event) {
        if (event === void 0) { event = null; }
        return __awaiter(this, void 0, void 0, function () {
            var uncheckedClass, validClass, invalidClass, validations, isValid, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.Application.Config.GetValidatorUncheckedClass()];
                    case 1:
                        uncheckedClass = _a.sent();
                        return [4, this.Application.Config.GetValidatorValidClass()];
                    case 2:
                        validClass = _a.sent();
                        return [4, this.Application.Config.GetValidatorInvalidClass()];
                    case 3:
                        invalidClass = _a.sent();
                        return [4, this.ResolveValidations(sector, validation, contextItem)];
                    case 4:
                        validations = _a.sent();
                        isValid = true;
                        i = 0;
                        _a.label = 5;
                    case 5:
                        if (!(i < validations.length)) return [3, 8];
                        return [4, this.IsValidationValid(sector, validations[i], el, event, isValid, uncheckedClass, validClass, invalidClass)];
                    case 6:
                        if (!(_a.sent()))
                            isValid = false;
                        _a.label = 7;
                    case 7:
                        i++;
                        return [3, 5];
                    case 8: return [2, (isValid)];
                }
            });
        });
    };
    DrapoValidator.prototype.UncheckValidationExpression = function (el, sector, validation, contextItem) {
        return __awaiter(this, void 0, void 0, function () {
            var uncheckedClass, validClass, invalidClass, validations, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.Application.Config.GetValidatorUncheckedClass()];
                    case 1:
                        uncheckedClass = _a.sent();
                        return [4, this.Application.Config.GetValidatorValidClass()];
                    case 2:
                        validClass = _a.sent();
                        return [4, this.Application.Config.GetValidatorInvalidClass()];
                    case 3:
                        invalidClass = _a.sent();
                        return [4, this.ResolveValidations(sector, validation, contextItem)];
                    case 4:
                        validations = _a.sent();
                        for (i = 0; i < validations.length; i++)
                            this.UncheckValidation(sector, validations[i], uncheckedClass, validClass, invalidClass);
                        return [2];
                }
            });
        });
    };
    DrapoValidator.prototype.GetSectorIndex = function (sector) {
        for (var i = 0; i < this._sectors.length; i++)
            if (this._sectors[i] === sector)
                return (i);
        return (null);
    };
    DrapoValidator.prototype.GetIndex = function (list, value) {
        for (var i = 0; i < list.length; i++)
            if (list[i] === value)
                return (i);
        return (null);
    };
    DrapoValidator.prototype.GetElement = function (elements, element) {
        for (var i = 0; i < elements.length; i++)
            if (elements[i] === element)
                return (i);
        return (null);
    };
    DrapoValidator.prototype.EnsureSector = function (sector) {
        var index = this.GetSectorIndex(sector);
        if (index !== null)
            return (index);
        this._sectors.push(sector);
        this._sectorsValidationRuleIDs.push([]);
        this._sectorsValidationRuleTypes.push([]);
        this._sectorsValidationRuleValues.push([]);
        this._sectorsValidationRuleTags.push([]);
        this._sectorsValidationRuleContexts.push([]);
        this._sectorsValidationGroupGroups.push([]);
        this._sectorsValidationGroupRules.push([]);
        this._sectorsValidationGroupContexts.push([]);
        this._sectorsValidationInterfaceIDs.push([]);
        this._sectorsValidationInterfaceElements.push([]);
        this._sectorsValidationInterfaceContexts.push([]);
        return (this._sectors.length - 1);
    };
    DrapoValidator.prototype.AddValidationRule = function (sector, validationID, validationType, validationValue, validationTag, contextItem) {
        var index = this.EnsureSector(sector);
        var ruleIDs = this._sectorsValidationRuleIDs[index];
        var ruleIDIndex = this.GetIndex(ruleIDs, validationID);
        if (ruleIDIndex !== null)
            return;
        var ruleTypes = this._sectorsValidationRuleTypes[index];
        var ruleValues = this._sectorsValidationRuleValues[index];
        var ruleTags = this._sectorsValidationRuleTags[index];
        var ruleContexts = this._sectorsValidationRuleContexts[index];
        ruleIDs.push(validationID);
        ruleTypes.push(validationType);
        ruleValues.push(validationValue);
        ruleTags.push(validationTag);
        ruleContexts.push(contextItem);
    };
    DrapoValidator.prototype.AddValidationGroups = function (sector, validationID, validationGroups, contextItem) {
        for (var i = 0; i < validationGroups.length; i++)
            this.AddValidationGroup(sector, validationID, validationGroups[i], contextItem);
    };
    DrapoValidator.prototype.AddValidationGroup = function (sector, validationID, validationGroup, contextItem) {
        var index = this.EnsureSector(sector);
        var groups = this._sectorsValidationGroupGroups[index];
        var groupsRules = this._sectorsValidationGroupRules[index];
        var groupsContext = this._sectorsValidationGroupContexts[index];
        var groupIndex = this.GetIndex(groups, validationGroup);
        if (groupIndex === null) {
            groups.push(validationGroup);
            groupsRules.push([validationID]);
            groupsContext.push([contextItem]);
        }
        else {
            var groupRules = groupsRules[groupIndex];
            var groupContext = groupsContext[groupIndex];
            var ruleIndex = this.GetIndex(groupRules, validationID);
            if (ruleIndex === null) {
                groupRules.push(validationID);
                groupContext.push(contextItem);
            }
        }
    };
    DrapoValidator.prototype.AddValidationInterface = function (sector, validationID, el, contextItem) {
        var index = this.EnsureSector(sector);
        var interfacesIDs = this._sectorsValidationInterfaceIDs[index];
        var interfacesElements = this._sectorsValidationInterfaceElements[index];
        var interfacesContexts = this._sectorsValidationInterfaceContexts[index];
        var idIndex = this.GetIndex(interfacesIDs, validationID);
        if (idIndex === null) {
            interfacesIDs.push(validationID);
            interfacesElements.push([el]);
            interfacesContexts.push([contextItem]);
        }
        else {
            var interfaceElements = interfacesElements[idIndex];
            var interfaceContexts = interfacesContexts[idIndex];
            var elementIndex = this.GetElement(interfaceElements, el);
            if (elementIndex === null) {
                interfaceElements.push(el);
                interfaceContexts.push(contextItem);
            }
        }
    };
    DrapoValidator.prototype.ExtractValidations = function (el) {
        var attributes = [];
        for (var i = 0; i < el.attributes.length; i++) {
            var attribute = el.attributes[i];
            var attributeProperty = this.ExtractValidationProperty(attribute.nodeName);
            if (attributeProperty != null)
                attributes.push([attributeProperty, attribute.nodeValue]);
        }
        return (attributes);
    };
    DrapoValidator.prototype.ExtractValidationProperty = function (property) {
        var parse = this.Application.Parser.ParseProperty(property);
        if (parse[0] != 'd')
            return (null);
        if (parse[1].toLowerCase() != 'validation')
            return (null);
        if (parse.length === 2)
            return ('');
        return (parse[2]);
    };
    DrapoValidator.prototype.ResolveValidations = function (sector, validation, contextItem) {
        return __awaiter(this, void 0, void 0, function () {
            var validationResolved, validations, validatorsArray, i, validator, validatorConditional, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        validationResolved = null;
                        if (!this.Application.Parser.IsMustacheOnly(validation)) return [3, 2];
                        return [4, this.Application.Barber.ResolveControlFlowMustacheString(contextItem == null ? null : contextItem.Context, null, null, validation, null, sector, false)];
                    case 1:
                        validationResolved = _b.sent();
                        return [3, 3];
                    case 2:
                        validationResolved = validation;
                        _b.label = 3;
                    case 3:
                        validations = [];
                        if (!this.Application.Parser.IsValidatorArray(validationResolved)) return [3, 9];
                        validatorsArray = this.ExtractValidators(validationResolved);
                        i = 0;
                        _b.label = 4;
                    case 4:
                        if (!(i < validatorsArray.length)) return [3, 8];
                        validator = validatorsArray[i];
                        validatorConditional = validator[1];
                        _a = (validatorConditional != null);
                        if (!_a) return [3, 6];
                        return [4, this.IsValidConditional(sector, validatorConditional, contextItem)];
                    case 5:
                        _a = (!(_b.sent()));
                        _b.label = 6;
                    case 6:
                        if (_a)
                            return [3, 7];
                        validations.push(validator[0]);
                        _b.label = 7;
                    case 7:
                        i++;
                        return [3, 4];
                    case 8: return [3, 10];
                    case 9:
                        validations.push(validationResolved);
                        _b.label = 10;
                    case 10: return [2, (validations)];
                }
            });
        });
    };
    DrapoValidator.prototype.ExtractValidators = function (validation) {
        var validators = [];
        var parsedValidators = this.Application.Parser.ParseValidatorsArray(validation);
        for (var i = 0; i < parsedValidators.length; i++) {
            var parsedValidator = parsedValidators[i];
            var parseValidator = this.Application.Parser.ParseValidator(parsedValidator);
            if (parseValidator != null)
                validators.push(parseValidator);
        }
        return (validators);
    };
    DrapoValidator.prototype.IsValidationValid = function (sector, validation, el, event, canFocus, uncheckedClass, validClass, invalidClass) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.IsValidationGroup(sector, validation)) return [3, 2];
                        return [4, this.IsValidationGroupValid(sector, validation, el, event, canFocus, uncheckedClass, validClass, invalidClass)];
                    case 1: return [2, (_a.sent())];
                    case 2: return [4, this.IsValidationRuleValid(sector, validation, el, event, canFocus, uncheckedClass, validClass, invalidClass)];
                    case 3: return [2, (_a.sent())];
                }
            });
        });
    };
    DrapoValidator.prototype.IsValidationGroup = function (sector, validation) {
        var index = this.GetSectorIndex(sector);
        if (index === null)
            return (false);
        var groups = this._sectorsValidationGroupGroups[index];
        var groupIndex = this.GetIndex(groups, validation);
        return (groupIndex !== null);
    };
    DrapoValidator.prototype.IsValidationGroupValid = function (sector, validation, el, event, canFocus, uncheckedClass, validClass, invalidClass) {
        return __awaiter(this, void 0, void 0, function () {
            var rules, isValid, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        rules = this.GetValidationGroupRules(sector, validation);
                        isValid = true;
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < rules.length)) return [3, 4];
                        return [4, this.IsValidationRuleValid(sector, rules[i], el, event, (canFocus && isValid), uncheckedClass, validClass, invalidClass)];
                    case 2:
                        if (!(_a.sent()))
                            isValid = false;
                        _a.label = 3;
                    case 3:
                        i++;
                        return [3, 1];
                    case 4: return [2, (isValid)];
                }
            });
        });
    };
    DrapoValidator.prototype.GetValidationGroupRules = function (sector, validation) {
        var index = this.GetSectorIndex(sector);
        if (index === null)
            return ([]);
        var groups = this._sectorsValidationGroupGroups[index];
        var groupIndex = this.GetIndex(groups, validation);
        if (groupIndex === null)
            return ([]);
        var groupsRules = this._sectorsValidationGroupRules[index];
        var rules = groupsRules[groupIndex];
        return (rules);
    };
    DrapoValidator.prototype.IsValidationRuleValid = function (sector, validation, el, event, canFocus, uncheckedClass, validClass, invalidClass) {
        return __awaiter(this, void 0, void 0, function () {
            var isValid, addClass, removeClass, elements, i, element, elj;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.IsRuleValid(sector, validation, canFocus, el, event)];
                    case 1:
                        isValid = _a.sent();
                        addClass = isValid ? validClass : invalidClass;
                        removeClass = (!isValid) ? validClass : invalidClass;
                        elements = this.GetValidationRuleElements(sector, validation);
                        for (i = 0; i < elements.length; i++) {
                            element = elements[i];
                            elj = $(element);
                            if (uncheckedClass != null)
                                elj.removeClass(uncheckedClass);
                            elj.removeClass(removeClass);
                            elj.addClass(addClass);
                        }
                        return [2, (isValid)];
                }
            });
        });
    };
    DrapoValidator.prototype.GetValidationRuleElements = function (sector, validation) {
        var index = this.GetSectorIndex(sector);
        if (index === null)
            return ([]);
        var interfacesIDs = this._sectorsValidationInterfaceIDs[index];
        var interfacesElements = this._sectorsValidationInterfaceElements[index];
        var idIndex = this.GetIndex(interfacesIDs, validation);
        if (idIndex === null)
            return ([]);
        var interfaceElements = interfacesElements[idIndex];
        return (interfaceElements);
    };
    DrapoValidator.prototype.IsRuleValid = function (sector, validation, canFocus, el, event) {
        return __awaiter(this, void 0, void 0, function () {
            var index, ruleIDs, ruleIDIndex, ruleTypes, type, ruleValues, value, ruleTags, tag, ruleContexts, itemContext, isValid, element;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        index = this.GetSectorIndex(sector);
                        if (index === null)
                            return [2, (true)];
                        ruleIDs = this._sectorsValidationRuleIDs[index];
                        ruleIDIndex = this.GetIndex(ruleIDs, validation);
                        if (ruleIDIndex === null)
                            return [2, (true)];
                        ruleTypes = this._sectorsValidationRuleTypes[index];
                        type = ruleTypes[ruleIDIndex];
                        ruleValues = this._sectorsValidationRuleValues[index];
                        value = ruleValues[ruleIDIndex];
                        ruleTags = this._sectorsValidationRuleTags[index];
                        tag = ruleTags[ruleIDIndex];
                        ruleContexts = this._sectorsValidationRuleContexts[index];
                        itemContext = ruleContexts[ruleIDIndex];
                        return [4, this.IsValid(sector, type, value, tag, itemContext, el, event)];
                    case 1:
                        isValid = _a.sent();
                        if ((!isValid) && (canFocus)) {
                            element = this.Application.Observer.GetElementByModel(sector, value);
                            if (element != null)
                                $(element).focus();
                        }
                        return [2, (isValid)];
                }
            });
        });
    };
    DrapoValidator.prototype.IsValid = function (sector, type, value, tag, itemContext, el, event) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!((type == null) || (type == 'conditional'))) return [3, 2];
                        return [4, this.IsValidConditional(sector, value, itemContext)];
                    case 1: return [2, (_a.sent())];
                    case 2:
                        if (!(type === 'regex')) return [3, 4];
                        return [4, this.IsValidRegex(sector, value, tag, itemContext)];
                    case 3: return [2, (_a.sent())];
                    case 4:
                        if (!(type === 'compare')) return [3, 6];
                        return [4, this.IsValidCompare(sector, value, tag, itemContext)];
                    case 5: return [2, (_a.sent())];
                    case 6:
                        if (!(type === 'outside')) return [3, 8];
                        return [4, this.IsValidOutside(el, event, tag)];
                    case 7: return [2, (_a.sent())];
                    case 8: return [4, this.Application.ExceptionHandler.HandleError('Drapo: There is no validation rule of type: {0}', type)];
                    case 9:
                        _a.sent();
                        return [2, (false)];
                }
            });
        });
    };
    DrapoValidator.prototype.IsValidConditional = function (sector, value, itemContext) {
        return __awaiter(this, void 0, void 0, function () {
            var context, valueResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        context = this.CreateContext(itemContext);
                        return [4, this.Application.Solver.ResolveConditional(value, null, sector, context)];
                    case 1:
                        valueResult = _a.sent();
                        return [2, (valueResult)];
                }
            });
        });
    };
    DrapoValidator.prototype.IsValidRegex = function (sector, value, expression, itemContext) {
        return __awaiter(this, void 0, void 0, function () {
            var context, expressionsResolved, valueResolved, regex;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        context = this.CreateContext(itemContext);
                        return [4, this.Application.Barber.ResolveControlFlowMustacheStringFunction(sector, context, null, null, expression, null, false)];
                    case 1:
                        expressionsResolved = _a.sent();
                        return [4, this.Application.Barber.ResolveControlFlowMustacheStringFunction(sector, context, null, null, value, null, false)];
                    case 2:
                        valueResolved = _a.sent();
                        regex = new RegExp(expressionsResolved);
                        return [2, (regex.test(valueResolved))];
                }
            });
        });
    };
    DrapoValidator.prototype.IsValidCompare = function (sector, value, valueToCompare, itemContext) {
        return __awaiter(this, void 0, void 0, function () {
            var context, valueResolved, valueToCompareResolved;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        context = this.CreateContext(itemContext);
                        return [4, this.Application.Barber.ResolveControlFlowMustacheStringFunction(sector, context, null, null, value, null, false)];
                    case 1:
                        valueResolved = _a.sent();
                        return [4, this.Application.Barber.ResolveControlFlowMustacheStringFunction(sector, context, null, null, valueToCompare, null, false)];
                    case 2:
                        valueToCompareResolved = _a.sent();
                        return [2, (valueResolved == valueToCompareResolved)];
                }
            });
        });
    };
    DrapoValidator.prototype.CreateContext = function (itemContext) {
        var context = new DrapoContext(itemContext);
        return (context);
    };
    DrapoValidator.prototype.IsValidOutside = function (el, event, validSectors) {
        return __awaiter(this, void 0, void 0, function () {
            var target, sectorsAllowed, sectorTarget, sectors, i;
            return __generator(this, function (_a) {
                target = event.target;
                if (validSectors != null) {
                    sectorsAllowed = [];
                    sectorTarget = this.Application.Document.GetSector(target);
                    sectors = this.Application.Parser.ParseTags(validSectors);
                    for (i = 0; i < sectors.length; i++)
                        sectorsAllowed = this.Application.Solver.Join(sectorsAllowed, this.Application.Document.GetSectorAndChildren(sectors[i]));
                    if (!this.Application.Solver.Contains(sectorsAllowed, sectorTarget))
                        return [2, (false)];
                }
                while (target != null) {
                    if (el === target)
                        return [2, (false)];
                    if (target.parentElement)
                        target = target.parentElement;
                    else
                        target = null;
                }
                return [2, (true)];
            });
        });
    };
    DrapoValidator.prototype.UncheckValidation = function (sector, validation, uncheckedClass, validClass, invalidClass) {
        if (this.IsValidationGroup(sector, validation))
            this.UncheckValidationGroup(sector, validation, uncheckedClass, validClass, invalidClass);
        else
            this.UncheckValidationRule(sector, validation, uncheckedClass, validClass, invalidClass);
    };
    DrapoValidator.prototype.UncheckValidationGroup = function (sector, validation, uncheckedClass, validClass, invalidClass) {
        var rules = this.GetValidationGroupRules(sector, validation);
        for (var i = 0; i < rules.length; i++)
            this.UncheckValidationRule(sector, rules[i], uncheckedClass, validClass, invalidClass);
    };
    DrapoValidator.prototype.UncheckValidationRule = function (sector, validation, uncheckedClass, validClass, invalidClass) {
        var elements = this.GetValidationRuleElements(sector, validation);
        for (var i = 0; i < elements.length; i++) {
            var element = elements[i];
            var elj = $(element);
            elj.removeClass(validClass);
            elj.removeClass(invalidClass);
            if (uncheckedClass != null)
                elj.addClass(uncheckedClass);
        }
    };
    DrapoValidator.prototype.IsValidatorInterface = function (el) {
        var attributeValidation = el.getAttribute('d-validation');
        return ((attributeValidation != null) && (attributeValidation != ''));
    };
    return DrapoValidator;
}());

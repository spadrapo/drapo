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
var DrapoComponentHandler = (function () {
    function DrapoComponentHandler(application) {
        this._dataSectors = [];
        this._dataTags = [];
        this._dataElements = [];
        this._dataInstances = [];
        this._application = application;
    }
    Object.defineProperty(DrapoComponentHandler.prototype, "Application", {
        get: function () {
            return (this._application);
        },
        enumerable: true,
        configurable: true
    });
    DrapoComponentHandler.prototype.ResolveComponents = function (jQueryStart) {
        if (jQueryStart === void 0) { jQueryStart = null; }
        return __awaiter(this, void 0, void 0, function () {
            var i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (jQueryStart == null)
                            jQueryStart = $(document.documentElement);
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < jQueryStart.length)) return [3, 4];
                        return [4, this.ResolveComponentsElement(jQueryStart[i], null, true, true)];
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
    DrapoComponentHandler.prototype.ResolveComponentsElement = function (el, context, checkSectorReady, handleDynamicSectors) {
        return __awaiter(this, void 0, void 0, function () {
            var sector, tagName, children, hasChildren, isContext, isInsideContext, i, child, contentUrl;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!handleDynamicSectors) return [3, 2];
                        return [4, this.Application.Document.ResolveComponentDynamicSector(el)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        if (checkSectorReady) {
                            sector = this.Application.Document.GetSector(el);
                            if (sector === '@')
                                return [2];
                        }
                        if (this.Application.ControlFlow.IsElementControlFlowTemplate(el))
                            return [2];
                        tagName = el.tagName.toLowerCase();
                        children = [].slice.call(el.children);
                        hasChildren = children.length > 0;
                        if (!this.IsComponent(tagName)) return [3, 4];
                        isContext = context != null;
                        isInsideContext = this.Application.Document.IsElementInsideControlFlow(el);
                        if (isContext !== isInsideContext)
                            return [2];
                        return [4, this.ResolveComponentElement(el, tagName, context, checkSectorReady, handleDynamicSectors)];
                    case 3:
                        _a.sent();
                        return [3, 11];
                    case 4:
                        if (!hasChildren) return [3, 9];
                        i = 0;
                        _a.label = 5;
                    case 5:
                        if (!(i < children.length)) return [3, 8];
                        child = children[i];
                        return [4, this.ResolveComponentsElement(child, context, checkSectorReady, handleDynamicSectors)];
                    case 6:
                        _a.sent();
                        _a.label = 7;
                    case 7:
                        i++;
                        return [3, 5];
                    case 8: return [3, 11];
                    case 9:
                        contentUrl = el.getAttribute('d-contenturl');
                        if (!(contentUrl != null)) return [3, 11];
                        return [4, this.ResolveContentElement(el, context, contentUrl, checkSectorReady, handleDynamicSectors)];
                    case 10:
                        _a.sent();
                        _a.label = 11;
                    case 11: return [2];
                }
            });
        });
    };
    DrapoComponentHandler.prototype.ResolveComponentElement = function (el, tagName, context, checkSectorReady, handleDynamicSectors) {
        return __awaiter(this, void 0, void 0, function () {
            var html, eljNew, attributes, content, sector, elNew, elContent, isSectorContext, elSector, instance, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.Application.Register.IsRegisteredComponent(tagName)];
                    case 1:
                        if (!!(_a.sent())) return [3, 3];
                        return [4, this.Application.ExceptionHandler.HandleError('There is no component: {0}', tagName)];
                    case 2:
                        _a.sent();
                        return [2];
                    case 3:
                        if (!!this.Application.Register.IsActiveComponent(tagName)) return [3, 5];
                        return [4, this.Application.Register.ActivateComponent(tagName)];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5: return [4, this.Application.Register.GetRegisteredComponentViewContent(tagName)];
                    case 6:
                        html = _a.sent();
                        if (!(html == null)) return [3, 8];
                        return [4, this.Application.ExceptionHandler.HandleError('There is no html for the component: {0}', tagName)];
                    case 7:
                        _a.sent();
                        return [2];
                    case 8:
                        eljNew = $(html);
                        attributes = this.Application.Document.GetElementAttributes(el);
                        content = $(el).html();
                        sector = this.GetSectorContext(el, context);
                        this.Application.Document.ReplaceElement(el, eljNew);
                        this.Application.Document.SetElementAttributes(eljNew, attributes);
                        elNew = eljNew[0];
                        elContent = ((content != null) && (content != '')) ? this.GetElementContent(elNew) : null;
                        if (elContent !== null)
                            $(elContent).html(content);
                        isSectorContext = false;
                        elSector = elNew.getAttribute('d-sector');
                        if (!(elSector === "@")) return [3, 11];
                        elSector = this.CreateGuidContext(elNew, context);
                        elNew.setAttribute('d-sector', elSector);
                        return [4, this.Application.Document.AddSectorHierarchy(elSector, sector)];
                    case 9:
                        _a.sent();
                        return [4, this.Application.Document.AddSectorFriends(sector, elNew.getAttribute('d-sector-friend'))];
                    case 10:
                        _a.sent();
                        return [3, 12];
                    case 11:
                        if (elSector == null) {
                            isSectorContext = ((context != null) && (context.Sector != null));
                            if (isSectorContext)
                                elNew.setAttribute('d-sector', context.Sector);
                        }
                        _a.label = 12;
                    case 12:
                        _a.trys.push([12, 14, , 16]);
                        return [4, this.Application.Register.CreateInstanceComponent(tagName, elNew)];
                    case 13:
                        instance = _a.sent();
                        if (instance != null)
                            this.SubscribeComponentInstance(sector, tagName, elNew, instance);
                        return [3, 16];
                    case 14:
                        e_1 = _a.sent();
                        return [4, this.Application.ExceptionHandler.HandleError('There is an error in component: {0} contructor. {1}', tagName, e_1.toString())];
                    case 15:
                        _a.sent();
                        return [3, 16];
                    case 16: return [4, this.Application.Document.ResolveComponentUpdate(elNew, context)];
                    case 17:
                        _a.sent();
                        if (isSectorContext)
                            elNew.removeAttribute('d-sector');
                        return [4, this.Application.Debugger.NotifyComponents()];
                    case 18:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    DrapoComponentHandler.prototype.GetSectorContext = function (el, context) {
        if ((context != null) && (context.Item != null) && (context.Item.ElementOld != null))
            return (this.Application.Document.GetSector(context.Item.ElementOld));
        if ((context != null) && (context.Sector != null))
            return (context.Sector);
        return (this.Application.Document.GetSector(el));
    };
    DrapoComponentHandler.prototype.CreateGuidContext = function (el, context) {
        var guid = this.CreateGuidContextHierarchy(el, context);
        if (guid !== null)
            return (guid);
        return (this.Application.Document.CreateGuid());
    };
    DrapoComponentHandler.prototype.CreateGuidContextHierarchy = function (el, context) {
        if ((context === null) || (context.Item === null) || (context.Item.ElementOld === null))
            return (null);
        var hierarchy = this.CreateElementHierarchy(el);
        if (hierarchy.length === 0)
            return (null);
        var elHierarchy = this.GetElementByHierarchy(context.Item.ElementOld, hierarchy);
        if (elHierarchy === null)
            return (null);
        var sector = elHierarchy.getAttribute('d-sector');
        if (sector == "@")
            return (null);
        return (sector);
    };
    DrapoComponentHandler.prototype.CreateElementHierarchy = function (el) {
        var hierarchy = [];
        this.InsertElementHierarchy(hierarchy, el);
        hierarchy.reverse();
        return (hierarchy);
    };
    DrapoComponentHandler.prototype.InsertElementHierarchy = function (hierarchy, el) {
        if (el == null)
            return;
        var elParent = el.parentElement;
        if (elParent == null)
            return;
        var index = this.GetElementIndex(elParent, el);
        if (index == null)
            return;
        hierarchy.push(index);
        this.InsertElementHierarchy(hierarchy, elParent);
    };
    DrapoComponentHandler.prototype.GetElementIndex = function (elParent, el) {
        for (var i = 0; i < elParent.children.length; i++)
            if (elParent.children[i] === el)
                return (i);
        return (null);
    };
    DrapoComponentHandler.prototype.GetElementByHierarchy = function (el, hierarchy) {
        var elCurrent = el;
        for (var i = 0; i < hierarchy.length; i++) {
            if (elCurrent == null)
                return (null);
            var index = hierarchy[i];
            if (elCurrent.children.length <= index)
                return (null);
            elCurrent = elCurrent.children[index];
        }
        return (elCurrent);
    };
    DrapoComponentHandler.prototype.GetElementContent = function (el) {
        var elContent = el.getAttribute('d-content');
        if (elContent === 'internal')
            return (el);
        var children = [].slice.call(el.children);
        for (var i = 0; i < children.length; i++) {
            var elContentChild = this.GetElementContent(children[i]);
            if (elContentChild !== null)
                return (elContentChild);
        }
        return (null);
    };
    DrapoComponentHandler.prototype.ResolveContentElement = function (el, context, contentUrl, checkSectorReady, handleDynamicSectors) {
        return __awaiter(this, void 0, void 0, function () {
            var html, content, eljNew;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.Application.Server.GetHTML(contentUrl)];
                    case 1:
                        html = _a.sent();
                        if (!(html == null)) return [3, 3];
                        return [4, this.Application.ExceptionHandler.HandleError('There is an error getting html for the contenturl: {0}', contentUrl)];
                    case 2:
                        _a.sent();
                        return [2];
                    case 3:
                        content = this.Application.Parser.ParseDocumentContent(html);
                        eljNew = $(content);
                        if (!(eljNew.length === 0)) return [3, 5];
                        return [4, this.Application.ExceptionHandler.HandleError('There is no html container for the contenturl: {0}', contentUrl)];
                    case 4:
                        _a.sent();
                        return [2];
                    case 5:
                        el.innerHTML = eljNew[0].innerHTML;
                        return [4, this.Application.Document.ResolveComponentUpdate(el, context)];
                    case 6:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    DrapoComponentHandler.prototype.IsComponent = function (tagName) {
        return (this.IsStartsWith(tagName, "d-"));
    };
    DrapoComponentHandler.prototype.IsStartsWith = function (text, value) {
        var length = value.length;
        if (text.length < length)
            return (false);
        return (text.substr(0, length) === value);
    };
    DrapoComponentHandler.prototype.SubscribeComponentInstance = function (sector, tag, el, instance) {
        var index = this.GetComponentInstanceIndex(sector);
        if (index == null)
            index = this.CreateComponentInstanceIndex(sector);
        var tags = this._dataTags[index];
        tags.push(tag);
        var elements = this._dataElements[index];
        elements.push(el);
        var instances = this._dataInstances[index];
        instances.push(instance);
        return (true);
    };
    DrapoComponentHandler.prototype.GetComponentInstanceIndex = function (sector) {
        for (var i = 0; i < this._dataSectors.length; i++)
            if (this._dataSectors[i] == sector)
                return (i);
        return (null);
    };
    DrapoComponentHandler.prototype.CreateComponentInstanceIndex = function (sector) {
        var index = this._dataSectors.push(sector);
        this._dataTags.push([]);
        this._dataElements.push([]);
        this._dataInstances.push([]);
        return (index - 1);
    };
    DrapoComponentHandler.prototype.GetComponentInstance = function (sector, did) {
        if (did === void 0) { did = null; }
        if (did === null)
            return (this.GetComponentInstanceByElementSector(sector));
        var sectors = this.Application.Document.GetSectorsAllowed(sector);
        if (sectors == null)
            return (this.GetComponentInstanceInternal(sector, did));
        for (var i = 0; i < sectors.length; i++) {
            var sectorCurrent = sectors[i];
            var instance = this.GetComponentInstanceInternal(sectorCurrent, did);
            if (instance != null)
                return (instance);
        }
        return (null);
    };
    DrapoComponentHandler.prototype.GetComponentInstanceByElementSector = function (sector) {
        for (var i = 0; i < this._dataElements.length; i++) {
            var dataElements = this._dataElements[i];
            for (var j = 0; j < dataElements.length; j++) {
                var el = dataElements[j];
                var elSector = el.getAttribute('d-sector');
                if (elSector === sector)
                    return (this._dataInstances[i][j]);
            }
        }
        return (null);
    };
    DrapoComponentHandler.prototype.GetComponentInstanceInternal = function (sector, did) {
        var index = this.GetComponentInstanceIndex(sector);
        if (index === null)
            return (null);
        var elements = this._dataElements[index];
        var instances = this._dataInstances[index];
        for (var j = elements.length - 1; j >= 0; j--) {
            var element = elements[j];
            if (element.parentElement == null)
                continue;
            var elementDid = element.getAttribute('d-id');
            if (did !== elementDid)
                continue;
            return (instances[j]);
        }
        return (null);
    };
    DrapoComponentHandler.prototype.UnloadComponentInstances = function (sector) {
        var index = this.GetComponentInstanceIndex(sector);
        if (index === null)
            return (false);
        this._dataSectors.splice(index, 1);
        this._dataTags.splice(index, 1);
        this._dataElements.splice(index, 1);
        this._dataInstances.splice(index, 1);
        return (true);
    };
    DrapoComponentHandler.prototype.UnloadComponentInstancesDetached = function (sector) {
        return __awaiter(this, void 0, void 0, function () {
            var index, updated, dataTags, dataElements, dataInstances, i, dataElement;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        index = this.GetComponentInstanceIndex(sector);
                        if (index === null)
                            return [2, (false)];
                        updated = false;
                        dataTags = this._dataTags[index];
                        dataElements = this._dataElements[index];
                        dataInstances = this._dataInstances[index];
                        for (i = dataElements.length - 1; i >= 0; i--) {
                            dataElement = dataElements[i];
                            if (this.Application.Document.IsElementAlive(dataElement))
                                continue;
                            dataTags.splice(i, 1);
                            dataElements.splice(i, 1);
                            dataInstances.splice(i, 1);
                            updated = true;
                        }
                        if (!updated) return [3, 2];
                        return [4, this.Application.Debugger.NotifyComponents()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2, (true)];
                }
            });
        });
    };
    DrapoComponentHandler.prototype.UnloadComponentInstancesDetachedFullCheck = function () {
        return __awaiter(this, void 0, void 0, function () {
            var updated, index, dataTags, dataElements, dataInstances, i, dataElement;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        updated = false;
                        for (index = this._dataSectors.length - 1; index >= 0; index--) {
                            dataTags = this._dataTags[index];
                            dataElements = this._dataElements[index];
                            dataInstances = this._dataInstances[index];
                            for (i = dataElements.length - 1; i >= 0; i--) {
                                dataElement = dataElements[i];
                                if (this.Application.Document.IsElementAlive(dataElement))
                                    continue;
                                dataTags.splice(i, 1);
                                dataElements.splice(i, 1);
                                dataInstances.splice(i, 1);
                                updated = true;
                            }
                            if (dataTags.length === 0) {
                                this._dataSectors.splice(index, 1);
                                this._dataTags.splice(index, 1);
                                this._dataElements.splice(index, 1);
                                this._dataInstances.splice(index, 1);
                                updated = true;
                            }
                        }
                        if (!updated) return [3, 2];
                        return [4, this.Application.Debugger.NotifyComponents()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2, (true)];
                }
            });
        });
    };
    DrapoComponentHandler.prototype.HasContentComponent = function (content) {
        return ((content.indexOf('<d-') > -1));
    };
    DrapoComponentHandler.prototype.ResolveComponentContext = function (sector, context, el, renderContext, canResolveComponents) {
        return __awaiter(this, void 0, void 0, function () {
            var tagName, elAttributes, i, elAttribute, elAttributeValue, updated, mustaches, j, mustache, mustacheParts, mustacheContext;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        tagName = el.tagName.toLowerCase();
                        if (!this.IsComponent(tagName))
                            return [2];
                        elAttributes = this.Application.Document.GetElementAttributes(el);
                        for (i = 0; i < elAttributes.length; i++) {
                            elAttribute = elAttributes[i];
                            elAttributeValue = elAttribute[1];
                            updated = false;
                            mustaches = this.Application.Parser.ParseMustaches(elAttributeValue);
                            for (j = 0; j < mustaches.length; j++) {
                                mustache = mustaches[j];
                                mustacheParts = this.Application.Parser.ParseMustache(mustache);
                                mustacheContext = this.Application.Solver.CreateMustacheContext(context, mustacheParts);
                                if ((mustacheContext === null) || (mustacheContext === mustache))
                                    continue;
                                updated = true;
                                elAttributeValue = elAttributeValue.replace(mustache, mustacheContext);
                            }
                            if (updated)
                                el.setAttribute(elAttribute[0], elAttributeValue);
                        }
                        if (!((canResolveComponents) && (((context != null) && (context.HasContextItemBefore)) || (this.Application.Document.IsElementAlive(el))))) return [3, 2];
                        return [4, this.Application.Document.ResolveComponentUpdate(el, context)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2];
                }
            });
        });
    };
    DrapoComponentHandler.prototype.Retrieve = function () {
        var list = [];
        for (var i = 0; i < this._dataSectors.length; i++) {
            var sector = this._dataSectors[i];
            var tags = this._dataTags[i];
            var elements = this._dataElements[i];
            var instances = this._dataInstances[i];
            for (var j = 0; j < tags.length; j++)
                list.push([sector, tags[j], elements[j], instances[j]]);
        }
        return (list);
    };
    DrapoComponentHandler.prototype.AppendInstances = function (sector, componentSectors, componentTags, componentElements, componentInstances) {
        var index = this.GetComponentInstanceIndex(sector);
        if (index === null)
            return;
        componentSectors.push(sector);
        componentTags.push(this.Application.Solver.CloneArrayString(this._dataTags[index]));
        componentElements.push(this.Application.Solver.CloneArrayElement(this._dataElements[index]));
        componentInstances.push(this.Application.Solver.CloneArrayAny(this._dataInstances[index]));
    };
    DrapoComponentHandler.prototype.AddInstances = function (container) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this._dataSectors.push.apply(this._dataSectors, container.ComponentSectors);
                        this._dataTags.push.apply(this._dataTags, container.ComponentTags);
                        this._dataElements.push.apply(this._dataElements, container.ComponentElements);
                        this._dataInstances.push.apply(this._dataInstances, container.ComponentInstances);
                        return [4, this.Application.Debugger.NotifyComponents()];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    return DrapoComponentHandler;
}());

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
var DrapoDocument = (function () {
    function DrapoDocument(application) {
        this._pendingAuthorizations = 0;
        this._sectorsLoaded = [];
        this._message = null;
        this._sectorHierarchy = [];
        this._sectorFriends = [];
        this._lastGuid = null;
        this._application = application;
    }
    Object.defineProperty(DrapoDocument.prototype, "Application", {
        get: function () {
            return (this._application);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoDocument.prototype, "Message", {
        get: function () {
            return (this._message);
        },
        set: function (value) {
            this._message = value;
        },
        enumerable: false,
        configurable: true
    });
    DrapoDocument.prototype.ResetPendingAuthorizations = function (count) {
        if (count === void 0) { count = 0; }
        this._pendingAuthorizations = count;
    };
    DrapoDocument.prototype.StartUpdate = function (sector) {
        if (sector == null) {
            this.InitializeSectorsLoaded();
        }
        else {
            for (var i = this._sectorsLoaded.length - 1; i >= 0; i--)
                if (this._sectorsLoaded[i] === sector)
                    this._sectorsLoaded.splice(i, 1);
        }
    };
    DrapoDocument.prototype.Resolve = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.StartUpdate(null);
                        return [4, this.ResolveInternal()];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    DrapoDocument.prototype.ResolveInternal = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.Application.Log.WriteVerbose('Document - ResolveInternal - Started');
                        return [4, this.ResolveParent()];
                    case 1:
                        if (!!(_a.sent())) return [3, 3];
                        return [4, this.ResolveChildren(null)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        this.Application.Log.WriteVerbose('Document - ResolveInternal - Finished');
                        return [4, this.Application.Storage.ResolveData(false)];
                    case 4:
                        _a.sent();
                        return [4, this.Application.ControlFlow.ResolveControlFlowDocument()];
                    case 5:
                        _a.sent();
                        return [4, this.Application.ComponentHandler.ResolveComponents()];
                    case 6:
                        _a.sent();
                        return [4, this.Application.Storage.ResolveData(true)];
                    case 7:
                        _a.sent();
                        return [4, this.Application.Barber.ResolveMustaches()];
                    case 8:
                        _a.sent();
                        return [4, this.TryOnAuthorizationRequest()];
                    case 9:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    DrapoDocument.prototype.ResolveParent = function () {
        return __awaiter(this, void 0, void 0, function () {
            var div, divElement, parent, parentSector, sectors, html;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.Application.Log.WriteVerbose('Document - ResolveParent - Started');
                        div = $('div').first();
                        if ((div == null) || (div.length === 0)) {
                            this.Application.Log.WriteVerbose('Document - ResolveParent - Finished - NoDiv');
                            return [2, (false)];
                        }
                        divElement = div.get(0);
                        parent = divElement.getAttribute('d-sector-parent-url');
                        if (parent == null) {
                            this.Application.Log.WriteVerbose('Document - ResolveParent - Finished - NoParent');
                            return [2, (false)];
                        }
                        parentSector = divElement.getAttribute('d-sector-parent');
                        if (parentSector == null) {
                            this.Application.Log.WriteVerbose('Document - ResolveParent - Finished - NoParentSector');
                            return [2, (false)];
                        }
                        sectors = this.ExtractSectors(divElement);
                        this.Application.Log.WriteVerbose('Document - ResolveParent - parent = {0}, parentSector = {1}', parent, parentSector);
                        return [4, this.Application.Server.GetViewHTML(parent)];
                    case 1:
                        html = _a.sent();
                        return [4, this.ResolveParentResponse(html, parent, parentSector, divElement.outerHTML, sectors)];
                    case 2:
                        _a.sent();
                        this.Application.Log.WriteVerbose('Document - ResolveParent - Finished');
                        return [2, (true)];
                }
            });
        });
    };
    DrapoDocument.prototype.ResolveParentResponse = function (data, parent, parentSector, childHtml, sectors) {
        return __awaiter(this, void 0, void 0, function () {
            var divChildSector, i, sector, sectorName, url, container;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.Application.Log.WriteVerbose('Document - ResolveParentResponse - Started');
                        if (this.Application.Log.ShowHTML)
                            this.Application.Log.WriteVerbose('Document - ResolveParentResponse - data - {0}', data);
                        this.ReplaceDocument(data);
                        this.Application.Log.WriteVerbose('Document - ResolveParentResponse - parent = {0}, parentSector = {1}', parent, parentSector);
                        divChildSector = $("div[d-sector='" + parentSector + "']");
                        if (divChildSector == null) {
                            this.Application.Log.WriteVerbose('Document - ResolveParentResponse - Finished - divChildSector == null');
                            return [2];
                        }
                        if (this.Application.Log.ShowHTML)
                            this.Application.Log.WriteVerbose('Document - ResolveParentResponse - childHtml - {0}', childHtml);
                        return [4, this.AddSectorFriends(parentSector, divChildSector.attr('d-sector-friend'))];
                    case 1:
                        _a.sent();
                        divChildSector.html(childHtml);
                        i = 0;
                        _a.label = 2;
                    case 2:
                        if (!(i < sectors.length)) return [3, 6];
                        sector = sectors[i];
                        sectorName = sector[0];
                        url = sector[1];
                        container = sector[2];
                        return [4, this.AddSectorHierarchy(sectorName, parentSector)];
                    case 3:
                        _a.sent();
                        this.StartUpdate(sectorName);
                        return [4, this.LoadChildSector(sectorName, url, null, true, false, container)];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5:
                        i++;
                        return [3, 2];
                    case 6:
                        this.Application.Log.WriteVerbose('Document - ResolveParentResponse - Finished');
                        return [4, this.ResolveInternal()];
                    case 7:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    DrapoDocument.prototype.ExtractSectors = function (el) {
        var attributes = [];
        for (var i = 0; i < el.attributes.length; i++) {
            var attribute = el.attributes[i];
            var attributeSectorProperty = this.ExtractSectorProperty(attribute.nodeName);
            if (attributeSectorProperty != null)
                attributes.push([attributeSectorProperty, attribute.nodeValue, el.getAttribute('d-sector-container-' + attributeSectorProperty)]);
        }
        return (attributes);
    };
    DrapoDocument.prototype.ExtractSectorProperty = function (property) {
        var parse = this.Application.Parser.ParseProperty(property);
        if (parse.length != 4)
            return (null);
        if (parse[0] != 'd')
            return (null);
        if ((parse[1].toLowerCase() != 'sector') || (parse[2] != 'default'))
            return (null);
        return (parse[3]);
    };
    DrapoDocument.prototype.ResolveChildren = function (divStart) {
        return __awaiter(this, void 0, void 0, function () {
            var divChildrenSector, sector, sectorChildren, i, sectorChild, sectorChildParent, i, elChild, childSector, url, urlSector, urlResolved, _a, container, childContainer, dataPath, contextItem, item, html, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        divChildrenSector = divStart == null ? $('div[d-sector]') : divStart.find('div[d-sector]');
                        if ((divChildrenSector == null) || (divChildrenSector.length === 0))
                            return [2];
                        sector = this.GetSector(divStart != null ? divStart.get(0) : null);
                        sectorChildren = [];
                        for (i = 0; i < divChildrenSector.length; i++) {
                            sectorChild = divChildrenSector[i];
                            sectorChildParent = this.GetSectorParent(sectorChild);
                            if (sector === sectorChildParent)
                                sectorChildren.push(sectorChild);
                        }
                        i = 0;
                        _c.label = 1;
                    case 1:
                        if (!(i < sectorChildren.length)) return [3, 16];
                        elChild = sectorChildren[i];
                        childSector = elChild.getAttribute('d-sector');
                        if (childSector == "@") {
                            childSector = this.CreateGuid();
                            elChild.setAttribute('d-sector', childSector);
                        }
                        if (this.IsSectorAlreadyLoaded(childSector))
                            return [3, 15];
                        this.MarkSectorAsLoaded(childSector);
                        url = elChild.getAttribute('d-sector-url');
                        if ((url != null) && (elChild.children.length > 0))
                            return [3, 15];
                        urlSector = this.GetSectorParent(elChild);
                        if (!(url != null)) return [3, 3];
                        return [4, this.Application.Storage.ResolveDataUrlMustaches(null, urlSector, url, null)];
                    case 2:
                        _a = _c.sent();
                        return [3, 4];
                    case 3:
                        _a = null;
                        _c.label = 4;
                    case 4:
                        urlResolved = _a;
                        container = null;
                        childContainer = elChild.getAttribute('d-container');
                        if (!(childContainer !== null)) return [3, 10];
                        if (!this.Application.Parser.IsMustache(childContainer)) return [3, 9];
                        dataPath = this.Application.Parser.ParseMustache(childContainer);
                        return [4, this.Application.Solver.CreateContextItemFromPath(childSector, dataPath)];
                    case 5:
                        contextItem = _c.sent();
                        return [4, this.Application.Solver.ResolveItemDataPathObject(childSector, contextItem, dataPath)];
                    case 6:
                        item = _c.sent();
                        if (!((item === null) || (item === ''))) return [3, 8];
                        item = this.Application.Document.CreateGuid();
                        return [4, this.Application.Solver.UpdateItemDataPathObject(childSector, contextItem, dataPath, item)];
                    case 7:
                        _c.sent();
                        _c.label = 8;
                    case 8:
                        container = item.toString();
                        return [3, 10];
                    case 9:
                        if (childContainer == "@") {
                            childContainer = this.CreateGuid();
                            elChild.setAttribute('d-container', childContainer);
                        }
                        container = childContainer;
                        _c.label = 10;
                    case 10:
                        if (!(urlResolved != null)) return [3, 12];
                        return [4, this.Application.Server.GetViewHTML(urlResolved)];
                    case 11:
                        _b = _c.sent();
                        return [3, 13];
                    case 12:
                        _b = null;
                        _c.label = 13;
                    case 13:
                        html = _b;
                        return [4, this.LoadChildSectorInternal(urlResolved, html, childSector, elChild, null, true, false, container)];
                    case 14:
                        _c.sent();
                        _c.label = 15;
                    case 15:
                        i++;
                        return [3, 1];
                    case 16: return [2];
                }
            });
        });
    };
    DrapoDocument.prototype.LoadChildSectorInternal = function (url, data, sector, elSector, title, canRoute, canLoadDefaultSectors, container) {
        if (title === void 0) { title = null; }
        if (canRoute === void 0) { canRoute = true; }
        if (canLoadDefaultSectors === void 0) { canLoadDefaultSectors = false; }
        if (container === void 0) { container = null; }
        return __awaiter(this, void 0, void 0, function () {
            var content, elContentParent, route, sectorParent, eljSector, divChildSectorLoaded, divElement, sectors, i, sectorInfo, sectorName, sectorUrl, sectorContainer, elSectorContent, eljSectorContent, onload;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.Application.Log.WriteVerbose('Document - ResolveChildResponse - Started - Sector {0}', sector);
                        if (!(container !== null)) return [3, 2];
                        return [4, this.Application.SectorContainerHandler.Switch(sector, container)];
                    case 1:
                        if (_a.sent())
                            return [2];
                        content = this.Application.Parser.ParseDocumentContent(data);
                        elContentParent = document.createElement('div');
                        elContentParent.innerHTML = content;
                        elSector.appendChild(elContentParent.children[0]);
                        return [3, 4];
                    case 2:
                        if (!(data != null)) return [3, 4];
                        return [4, this.ReplaceSectorData($(elSector), data)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        route = ((canRoute) && (url != null)) ? elSector.getAttribute('d-route') : 'false';
                        if (!((route == null) || (route != 'false'))) return [3, 6];
                        return [4, this.Application.Router.Route(url, sector, title)];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6:
                        sectorParent = this.GetSectorParent(elSector);
                        return [4, this.Application.Debugger.AddSectorUpdate(sector, sectorParent, url)];
                    case 7:
                        _a.sent();
                        return [4, this.AddSectorHierarchy(sector, sectorParent)];
                    case 8:
                        _a.sent();
                        return [4, this.AddSectorFriends(sector, elSector.getAttribute('d-sector-friend'))];
                    case 9:
                        _a.sent();
                        eljSector = $(elSector);
                        if (!canLoadDefaultSectors) return [3, 14];
                        divChildSectorLoaded = eljSector.children();
                        divElement = divChildSectorLoaded.length > 0 ? divChildSectorLoaded.get(0) : null;
                        sectors = divElement != null ? this.ExtractSectors(divElement) : [];
                        i = 0;
                        _a.label = 10;
                    case 10:
                        if (!(i < sectors.length)) return [3, 14];
                        sectorInfo = sectors[i];
                        sectorName = sectorInfo[0];
                        sectorUrl = sectorInfo[1];
                        sectorContainer = sectorInfo[2];
                        return [4, this.AddSectorHierarchy(sectorName, sector)];
                    case 11:
                        _a.sent();
                        this.StartUpdate(sectorName);
                        return [4, this.LoadChildSector(sectorName, sectorUrl, null, true, false, sectorContainer)];
                    case 12:
                        _a.sent();
                        _a.label = 13;
                    case 13:
                        i++;
                        return [3, 10];
                    case 14:
                        if (data == '')
                            return [2];
                        elSectorContent = container !== null ? elSector.children[elSector.children.length - 1] : elSector;
                        eljSectorContent = $(elSectorContent);
                        return [4, this.Application.Storage.ResolveData(false, elSectorContent)];
                    case 15:
                        _a.sent();
                        return [4, this.Application.ControlFlow.ResolveControlFlowSector(eljSectorContent)];
                    case 16:
                        _a.sent();
                        return [4, this.Application.ComponentHandler.ResolveComponents(eljSectorContent)];
                    case 17:
                        _a.sent();
                        return [4, this.Application.Storage.ResolveData(true, elSectorContent)];
                    case 18:
                        _a.sent();
                        return [4, this.Application.Barber.ResolveMustaches(eljSectorContent)];
                    case 19:
                        _a.sent();
                        return [4, this.ResolveChildren(eljSectorContent)];
                    case 20:
                        _a.sent();
                        return [4, this.Application.Storage.LoadDataDelayedAndNotify()];
                    case 21:
                        _a.sent();
                        onload = elSector.getAttribute("d-on-load");
                        if (!(onload != null)) return [3, 23];
                        return [4, this.Application.FunctionHandler.ResolveFunctionWithoutContext(sector, elSector, onload)];
                    case 22:
                        _a.sent();
                        _a.label = 23;
                    case 23: return [4, this.TryOnAuthorizationRequest()];
                    case 24:
                        _a.sent();
                        if (container !== null)
                            this.InitializeSectorElementDetach(elSectorContent);
                        return [4, this.Application.ComponentHandler.UnloadComponentInstancesDetached(sector)];
                    case 25:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    DrapoDocument.prototype.ReplaceSectorData = function (divChildSector, data) {
        return __awaiter(this, void 0, void 0, function () {
            var content, attributes, templateUrl, template, templateUrlContent, templateContent, sectorTemplateJQuery;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (data === null) {
                            divChildSector.html('');
                            return [2, (false)];
                        }
                        content = this.Application.Parser.ParseDocumentContent(data);
                        attributes = this.Application.Parser.ParseElementAttributes(content);
                        templateUrl = this.Application.Solver.Get(attributes, 'd-templateurl');
                        if (templateUrl === null) {
                            divChildSector.html(content);
                            return [2, (true)];
                        }
                        template = this.Application.Solver.Get(attributes, 'd-template');
                        if (template === null)
                            template = 'template';
                        return [4, this.Application.Server.GetViewHTML(templateUrl)];
                    case 1:
                        templateUrlContent = _a.sent();
                        templateContent = this.Application.Parser.ParseDocumentContent(templateUrlContent);
                        divChildSector.html(templateContent);
                        sectorTemplateJQuery = divChildSector.find("div[d-template='" + template + "']");
                        if (sectorTemplateJQuery.length === 0)
                            divChildSector.html(content);
                        else
                            sectorTemplateJQuery.html(content);
                        return [2, (true)];
                }
            });
        });
    };
    DrapoDocument.prototype.ResolveWindow = function (window) {
        return __awaiter(this, void 0, void 0, function () {
            var elWindow, sector;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        elWindow = window.get(0);
                        sector = this.Application.Document.GetSector(elWindow);
                        this.Application.Document.StartUpdate(sector);
                        return [4, this.Application.Storage.ResolveData(false, elWindow)];
                    case 1:
                        _a.sent();
                        return [4, this.Application.ControlFlow.ResolveControlFlowSector(window, false)];
                    case 2:
                        _a.sent();
                        return [4, this.Application.ComponentHandler.ResolveComponents(window)];
                    case 3:
                        _a.sent();
                        return [4, this.Application.Storage.ResolveData(true, elWindow)];
                    case 4:
                        _a.sent();
                        return [4, this.Application.Barber.ResolveMustaches(window)];
                    case 5:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    DrapoDocument.prototype.ResolveComponentDynamicSector = function (el) {
        return __awaiter(this, void 0, void 0, function () {
            var elSector, isSectorGuid, sectorParent, sector;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        elSector = el.getAttribute('d-sector');
                        if (elSector == null)
                            return [2];
                        isSectorGuid = elSector == '@';
                        if ((!isSectorGuid) && (this.Application.Document.IsSectorReady(elSector)))
                            return [2];
                        sectorParent = this.GetSectorParent(el);
                        sector = isSectorGuid ? this.CreateGuid() : elSector;
                        if (isSectorGuid)
                            el.setAttribute('d-sector', sector);
                        return [4, this.AddSectorHierarchy(sector, sectorParent)];
                    case 1:
                        _a.sent();
                        return [4, this.AddSectorFriends(sector, el.getAttribute('d-sector-friend'))];
                    case 2:
                        _a.sent();
                        this.MarkSectorAsLoaded(sector);
                        return [4, this.Application.Storage.ResolveData(true, el)];
                    case 3:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    DrapoDocument.prototype.ResolveComponentUpdate = function (el, context) {
        return __awaiter(this, void 0, void 0, function () {
            var elj;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        elj = $(el);
                        return [4, this.Application.Storage.ResolveData(false, el)];
                    case 1:
                        _a.sent();
                        return [4, this.Application.ControlFlow.ResolveControlFlowSector(elj)];
                    case 2:
                        _a.sent();
                        return [4, this.Application.ComponentHandler.ResolveComponentsElement(el, context, true, true)];
                    case 3:
                        _a.sent();
                        return [4, this.Application.Storage.ResolveData(true, el)];
                    case 4:
                        _a.sent();
                        return [4, this.Application.Barber.ResolveMustaches(elj, null, false)];
                    case 5:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    DrapoDocument.prototype.RemoveElement = function (el) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        $(el).remove();
                        return [4, this.RemoveElementIteration(el)];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    DrapoDocument.prototype.RemoveElementIteration = function (el) {
        return __awaiter(this, void 0, void 0, function () {
            var sector, children, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sector = el.getAttribute('d-sector');
                        if (!(sector != null)) return [3, 2];
                        return [4, this.RemoveSectorData(sector)];
                    case 1:
                        _a.sent();
                        return [3, 6];
                    case 2:
                        children = [].slice.call(el.children);
                        i = 0;
                        _a.label = 3;
                    case 3:
                        if (!(i < children.length)) return [3, 6];
                        return [4, this.RemoveElementIteration(children[i])];
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
    DrapoDocument.prototype.RemoveSectorData = function (sector) {
        return __awaiter(this, void 0, void 0, function () {
            var sectors, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sectors = this.GetSectorChildren(sector);
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < sectors.length)) return [3, 4];
                        return [4, this.RemoveSectorData(sectors[i])];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        i++;
                        return [3, 1];
                    case 4:
                        this.CleanSectorMetadataInternal(sector);
                        return [4, this.Application.Storage.RemoveBySector(sector)];
                    case 5:
                        _a.sent();
                        this.Application.SectorContainerHandler.RemoveBySector(sector);
                        this.Application.ComponentHandler.UnloadComponentInstances(sector);
                        return [2];
                }
            });
        });
    };
    DrapoDocument.prototype.LoadChildSector = function (sectorName, url, title, canRoute, canLoadDefaultSectors, container) {
        if (title === void 0) { title = null; }
        if (canRoute === void 0) { canRoute = true; }
        if (canLoadDefaultSectors === void 0) { canLoadDefaultSectors = false; }
        if (container === void 0) { container = null; }
        return __awaiter(this, void 0, void 0, function () {
            var sectorJQuery, elSector, i, el, urlResolved, _a, html, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (this.IsSectorAlreadyLoaded(sectorName))
                            return [2, (false)];
                        this.MarkSectorAsLoaded(sectorName);
                        sectorJQuery = $("div[d-sector='" + sectorName + "']");
                        elSector = null;
                        for (i = sectorJQuery.length - 1; i >= 0; i--) {
                            el = sectorJQuery[i];
                            if (this.IsElementDetached(el))
                                continue;
                            elSector = el;
                            break;
                        }
                        if (elSector == null) {
                            this.Application.Log.WriteVerbose('Document - LoadChildSector - Missing Sector - {0}', sectorName);
                            return [2, (false)];
                        }
                        if (!((url === null) || (url === ''))) return [3, 1];
                        _a = '';
                        return [3, 3];
                    case 1: return [4, this.Application.Storage.ResolveDataUrlMustaches(null, null, url, null)];
                    case 2:
                        _a = _c.sent();
                        _c.label = 3;
                    case 3:
                        urlResolved = _a;
                        if (!((urlResolved === null) || (urlResolved === ''))) return [3, 4];
                        _b = '';
                        return [3, 6];
                    case 4: return [4, this.Application.Server.GetViewHTML(urlResolved)];
                    case 5:
                        _b = _c.sent();
                        _c.label = 6;
                    case 6:
                        html = _b;
                        return [4, this.LoadChildSectorInternal(url, html, sectorName, elSector, title, canRoute, canLoadDefaultSectors, container)];
                    case 7:
                        _c.sent();
                        return [2, (true)];
                }
            });
        });
    };
    DrapoDocument.prototype.LoadChildSectorContent = function (sectorName, content) {
        return __awaiter(this, void 0, void 0, function () {
            var sectorJQuery;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.IsSectorAlreadyLoaded(sectorName))
                            return [2, (false)];
                        this.MarkSectorAsLoaded(sectorName);
                        sectorJQuery = $("div[d-sector='" + sectorName + "']");
                        if (sectorJQuery.length == 0) {
                            this.Application.Log.WriteVerbose('Document - LoadChildSectorContent - Missing Sector - {0}', sectorName);
                            return [2, (false)];
                        }
                        return [4, this.LoadChildSectorInternal(null, content, sectorName, sectorJQuery[0], null, false, false, null)];
                    case 1:
                        _a.sent();
                        return [2, (true)];
                }
            });
        });
    };
    DrapoDocument.prototype.LoadChildSectorDefault = function (sectorName) {
        return __awaiter(this, void 0, void 0, function () {
            var sectorJQuery, url, urlSector, urlResolved;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sectorJQuery = $("div[d-sector='" + sectorName + "']");
                        if (sectorJQuery.length == 0) {
                            this.Application.Log.WriteVerbose('Document - LoadChildSectorDefault - Missing Sector - {0}', sectorName);
                            return [2, (false)];
                        }
                        if (sectorJQuery.children.length == 0)
                            return [2, (false)];
                        url = sectorJQuery.attr('d-sector-url');
                        if ((url === null))
                            url = '';
                        urlSector = this.GetSectorParent(sectorJQuery[0]);
                        return [4, this.Application.Storage.ResolveDataUrlMustaches(null, urlSector, url, null)];
                    case 1:
                        urlResolved = _a.sent();
                        return [4, this.LoadChildSector(sectorName, urlResolved, null, false, false)];
                    case 2: return [2, (_a.sent())];
                }
            });
        });
    };
    DrapoDocument.prototype.ReplaceDocument = function (data) {
        this.Application.Log.WriteVerbose('Document - ReplaceDocument - Before - {0}', $('html').html());
        this.Application.Log.WriteVerbose('Document - ReplaceDocument - Data - {0}', data);
        var head = this.ExtractHeadInnerHtml(data);
        if (head != null)
            $('head').html(head);
        var body = this.ExtractBodyInnerHtml(data);
        if (body != null)
            $('body').html(body);
        this.Application.Log.WriteVerbose('Document - ReplaceDocument - After - {0}', $('html').html());
    };
    DrapoDocument.prototype.ReplaceElement = function (el, elNew) {
        $(el).replaceWith(elNew);
    };
    DrapoDocument.prototype.Show = function (elj) {
        if (elj.is('span')) {
            var eljChildren = elj.children();
            if ((eljChildren.length === 1) && ((eljChildren.is('option') || (eljChildren.is('optgroup')))))
                elj = eljChildren;
        }
        for (var i = 0; i < elj.length; i++)
            this.ShowInternal(elj[i]);
        return (elj);
    };
    DrapoDocument.prototype.ShowInternal = function (el) {
        var display = el.style.display;
        if (display === 'none')
            el.style.display = '';
        var style = el.getAttribute('style');
        if (style === '')
            el.removeAttribute('style');
    };
    DrapoDocument.prototype.Hide = function (selector) {
        var isOption = selector.is('option');
        var isOptGroup = ((!isOption) && (selector.is('optgroup')));
        var isParentOptGroup = ((isOption) && (selector.parent().is('optgroup')));
        if (((isOption) && (!isParentOptGroup)) || (isOptGroup)) {
            var parent_1 = (selector.parent().is('span')) ? selector.parent() : this.Wrap(selector, 'span');
            parent_1.hide();
            return (parent_1);
        }
        else {
            selector.hide();
            return (selector);
        }
    };
    DrapoDocument.prototype.GetWrapper = function (elj) {
        if (!elj.is('span'))
            return (null);
        var eljChildren = elj.children();
        if (eljChildren.length !== 1)
            return (null);
        return (eljChildren.get(0));
    };
    DrapoDocument.prototype.Wrap = function (elj, tagName) {
        var el = elj[0];
        var wrapper = document.createElement(tagName);
        el.parentNode.insertBefore(wrapper, el);
        wrapper.appendChild(el);
        return ($(wrapper));
    };
    DrapoDocument.prototype.GetElementAttributes = function (el) {
        var attributes = [];
        for (var i = 0; i < el.attributes.length; i++) {
            var attribute = el.attributes[i];
            attributes.push([attribute.nodeName, attribute.nodeValue]);
        }
        return (attributes);
    };
    DrapoDocument.prototype.GetElementAttributesFilteredPrefix = function (el, prefix) {
        if ((prefix === null) || (prefix === ''))
            return (this.GetElementAttributes(el));
        var attributes = [];
        var length = prefix.length;
        for (var i = 0; i < el.attributes.length; i++) {
            var attribute = el.attributes[i];
            var name_1 = attribute.nodeName;
            if (name_1.length < length)
                continue;
            if (name_1.substring(0, length) !== prefix)
                continue;
            attributes.push([name_1.substring(length), attribute.nodeValue]);
        }
        return (attributes);
    };
    DrapoDocument.prototype.SetElementAttributes = function (elj, attributes) {
        for (var i = 0; i < attributes.length; i++) {
            var attribute = attributes[i];
            elj.attr(attribute[0], attribute[1]);
        }
    };
    DrapoDocument.prototype.ExtractHeadInnerHtml = function (data) {
        var index = data.indexOf('<head>');
        if (index < 0)
            return (null);
        var indexEnd = data.indexOf('</head>');
        var head = data.substr(index + 6, indexEnd - (index + 6));
        var headWithoutFramework = this.RemoveFramework(head);
        return (headWithoutFramework);
    };
    DrapoDocument.prototype.RemoveFramework = function (data) {
        var indexScript = 0;
        while ((indexScript = data.indexOf('<script', indexScript)) >= 0) {
            var indexScriptEnd = data.indexOf('</script>', indexScript);
            if (indexScriptEnd > indexScript) {
                var script = data.substring(indexScript, indexScriptEnd + 9);
                if (script.indexOf('drapo.js') >= 0)
                    return (data.replace(script, ''));
            }
            indexScript = indexScriptEnd;
        }
        return (data);
    };
    DrapoDocument.prototype.ExtractBodyInnerHtml = function (data) {
        var index = data.indexOf('<body>');
        if (index >= 0) {
            var indexEnd = data.indexOf('</body>');
            return (data.substr(index + 6, indexEnd - (index + 6)));
        }
        index = data.indexOf('<div');
        if (index >= 0) {
            return (data.substr(index));
        }
        return (null);
    };
    DrapoDocument.prototype.GetOuterHtml = function (el) {
        return ($('<div>').append($(el).clone()).html());
    };
    DrapoDocument.prototype.IsElementInserted = function (list, itemInsert) {
        for (var i = 0; i < list.length; i++) {
            if (list[i] == itemInsert)
                return (false);
        }
        list.push(itemInsert);
        return (true);
    };
    DrapoDocument.prototype.IsElementAttached = function (el) {
        var elc = el;
        while (elc != null) {
            if (elc.tagName === 'BODY')
                return (true);
            elc = elc.parentElement;
        }
        return (false);
    };
    DrapoDocument.prototype.IsElementInsideControlFlow = function (el) {
        if (el.getAttribute == null)
            return (false);
        if (el.tagName === 'BODY')
            return (false);
        var dfor = el.getAttribute('d-for');
        if (dfor != null)
            return (true);
        var elParent = el.parentElement;
        if (elParent == null)
            return (true);
        return (this.IsElementInsideControlFlow(elParent));
    };
    DrapoDocument.prototype.IsElementInsideControlFlowOrContext = function (el) {
        if (el.getAttribute == null)
            return (false);
        if (el.tagName === 'BODY')
            return (false);
        var dfor = el.getAttribute('d-for');
        if (dfor != null)
            return (true);
        var elPrevious = el.previousElementSibling;
        if (elPrevious != null)
            return (this.IsElementInsideControlFlowOrContext(elPrevious));
        var elParent = el.parentElement;
        if (elParent == null)
            return (true);
        return (this.IsElementInsideControlFlowOrContext(elParent));
    };
    DrapoDocument.prototype.IsElementPreprocessed = function (el) {
        if (el.getAttribute == null)
            return (false);
        var pre = el.getAttribute('d-pre');
        if (pre === 'true')
            return (true);
        var elParent = el.parentElement;
        if (elParent == null)
            return (false);
        return (this.IsElementPreprocessed(elParent));
    };
    DrapoDocument.prototype.RequestAuthorization = function (dataKey, type) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.Application.Observer.SubscribeAuthorization(dataKey, type);
                        return [4, this.TryOnAuthorizationRequest()];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    DrapoDocument.prototype.TryOnAuthorizationRequest = function () {
        return __awaiter(this, void 0, void 0, function () {
            var pendingAuthorizations;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        pendingAuthorizations = this.Application.Observer.GetPendingAuthorization();
                        if (this._pendingAuthorizations === pendingAuthorizations)
                            return [2, (false)];
                        this._pendingAuthorizations = pendingAuthorizations;
                        return [4, this.OnAuthorizationRequest()];
                    case 1:
                        _a.sent();
                        return [2, (true)];
                }
            });
        });
    };
    DrapoDocument.prototype.OnAuthorizationRequest = function () {
        return __awaiter(this, void 0, void 0, function () {
            var onAuthorizationRequest;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.Application.Config.GetOnAuthorizationRequest()];
                    case 1:
                        onAuthorizationRequest = _a.sent();
                        if ((onAuthorizationRequest === null) || (onAuthorizationRequest === ''))
                            return [2];
                        return [4, this.Application.FunctionHandler.ResolveFunctionWithoutContext(null, null, onAuthorizationRequest)];
                    case 2:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    DrapoDocument.prototype.IsSectorAlreadyLoaded = function (sector) {
        for (var i = 0; i < this._sectorsLoaded.length; i++)
            if (this._sectorsLoaded[i] === sector)
                return (true);
        return (false);
    };
    DrapoDocument.prototype.MarkSectorAsLoaded = function (sector) {
        this._sectorsLoaded.push(sector);
    };
    DrapoDocument.prototype.InitializeSectorsLoaded = function () {
        this._sectorsLoaded = [];
    };
    DrapoDocument.prototype.GetSectorParent = function (el) {
        return (this.GetSector(el.parentElement));
    };
    DrapoDocument.prototype.GetSector = function (el) {
        if (el == null)
            return (null);
        var sector = el.getAttribute('d-sector');
        if (sector != null)
            return (sector);
        return (this.GetSector(el.parentElement));
    };
    DrapoDocument.prototype.GetElementByAttribute = function (name, value) {
        var elj = $("[" + name + "='" + value + "']");
        if ((elj == null) || (elj.length == 0))
            return (null);
        return (elj[0]);
    };
    DrapoDocument.prototype.GetSectorElement = function (sector) {
        return (this.GetElementByAttribute('d-sector', sector));
    };
    DrapoDocument.prototype.GetSectorElementInner = function (sector) {
        var elSector = this.GetSectorElement(sector);
        if ((elSector == null) || (elSector.children.length == 0))
            return (null);
        for (var i = elSector.children.length - 1; i >= 0; i--) {
            var elSectorChild = elSector.children[i];
            var detach = elSectorChild.getAttribute('d-detach');
            if ((detach === null) || (detach === '') || (detach === 'active'))
                return (elSectorChild);
        }
        return (null);
    };
    DrapoDocument.prototype.SetSectorElementInner = function (sector, el, canDetach) {
        var elSector = this.GetSectorElement(sector);
        if (elSector == null)
            return (null);
        for (var i = elSector.children.length - 1; i >= 0; i--) {
            var elSectorChild = elSector.children[i];
            var detach = elSectorChild.getAttribute('d-detach');
            if (detach == null) {
                elSector.removeChild(elSectorChild);
            }
            else {
                if (detach === 'active') {
                    var elSectorChildDisplay = elSectorChild.style.display;
                    var detachValue = ((elSectorChildDisplay != null) && (elSectorChildDisplay != '')) ? elSectorChildDisplay : 'empty';
                    elSectorChild.style.display = 'none';
                    elSectorChild.setAttribute('d-detach', detachValue);
                }
            }
        }
        if (el === null)
            return;
        if (canDetach) {
            elSector.appendChild(el);
        }
        else {
            if (el.parentElement == null) {
                el.setAttribute('d-detach', 'active');
                elSector.appendChild(el);
            }
            else {
                var detach = el.getAttribute('d-detach');
                el.style.display = detach != 'empty' ? detach : '';
                el.setAttribute('d-detach', 'active');
            }
        }
    };
    DrapoDocument.prototype.InitializeSectorElementDetach = function (el) {
        if (this.CanDetachElement(el))
            return;
        el.setAttribute('d-detach', 'active');
    };
    DrapoDocument.prototype.CanDetachElement = function (el) {
        if (this.HasElementIframe(el))
            return (false);
        if (this.HasElementCantDetach(el))
            return (false);
        return (true);
    };
    DrapoDocument.prototype.IsElementDetached = function (el) {
        if (el.tagName === 'BODY')
            return (false);
        var detach = el.getAttribute('d-detach');
        if ((detach !== null) && (detach !== '') && (detach != 'active'))
            return (true);
        if (el.parentElement == null)
            return (true);
        return (this.IsElementDetached(el.parentElement));
    };
    DrapoDocument.prototype.IsElementAlive = function (el) {
        if (el === null)
            return (false);
        if (el.tagName === 'BODY')
            return (true);
        if (this.Application.SectorContainerHandler.IsElementContainerized(el))
            return (true);
        return (this.IsElementAlive(el.parentElement));
    };
    DrapoDocument.prototype.IsElementInsideComponent = function (el) {
        if (el === null)
            return (false);
        if (el.tagName === 'BODY')
            return (false);
        if (this.Application.ComponentHandler.IsComponent(el.tagName.toLowerCase()))
            return (true);
        return (this.IsElementInsideComponent(el.parentElement));
    };
    DrapoDocument.prototype.HasElementIframe = function (el) {
        if (el == null)
            return (false);
        if (el.tagName.toLowerCase() === 'iframe')
            return (true);
        var children = [].slice.call(el.children);
        for (var i = 0; i < children.length; i++) {
            var child = children[i];
            var hasChildIframe = this.HasElementIframe(child);
            if (hasChildIframe)
                return (true);
        }
        return (false);
    };
    DrapoDocument.prototype.HasElementCantDetach = function (el) {
        if (el == null)
            return (false);
        var detachable = el.getAttribute('d-detachable');
        if (detachable === 'false')
            return (true);
        var children = [].slice.call(el.children);
        for (var i = 0; i < children.length; i++) {
            var child = children[i];
            var hasElementCantDetach = this.HasElementCantDetach(child);
            if (hasElementCantDetach)
                return (true);
        }
        return (false);
    };
    DrapoDocument.prototype.GetSectorImpersonate = function (el) {
        if (el == null)
            return (null);
        var sector = el.getAttribute('d-sector');
        if (sector != null)
            return (null);
        var sectorImpersonate = el.getAttribute('d-sector-impersonate');
        if (sectorImpersonate != null)
            return (sectorImpersonate);
        return (this.GetSectorImpersonate(el.parentElement));
    };
    DrapoDocument.prototype.IsSectorDynamic = function (el) {
        return __awaiter(this, void 0, void 0, function () {
            var sector;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.GetSectorImpersonate(el)];
                    case 1:
                        sector = _a.sent();
                        return [2, (this.Application.Parser.IsMustache(sector))];
                }
            });
        });
    };
    DrapoDocument.prototype.GetSectorResolved = function (el) {
        return __awaiter(this, void 0, void 0, function () {
            var sector, sectorImpersonate, sectorResolved;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sector = this.GetSector(el);
                        sectorImpersonate = this.GetSectorImpersonate(el);
                        if (sectorImpersonate == null)
                            return [2, (sector)];
                        return [4, this.Application.Storage.ResolveDataUrlMustaches(null, sector, sectorImpersonate, null)];
                    case 1:
                        sectorResolved = _a.sent();
                        return [2, (sectorResolved)];
                }
            });
        });
    };
    DrapoDocument.prototype.CreateGuid = function (isShort) {
        if (isShort === void 0) { isShort = true; }
        if (isShort)
            return (this.CreateGuidShort());
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    };
    DrapoDocument.prototype.CreateGuidShort = function () {
        var guid = this.CreateGuidShortInternal();
        while (guid === this._lastGuid)
            guid = this.CreateGuidShortInternal();
        this._lastGuid = guid;
        return (guid);
    };
    DrapoDocument.prototype.CreateGuidShortInternal = function () {
        var date = new Date();
        var hexa = date.getTime().toString(16);
        if (hexa.length <= 8)
            return (hexa);
        return (hexa.substr(hexa.length - 8));
    };
    DrapoDocument.prototype.EnsureElementHasID = function (el) {
        var id = el.getAttribute('d-id');
        if (id != null)
            return (id);
        id = this.CreateGuid();
        el.setAttribute('d-id', id);
        return (id);
    };
    DrapoDocument.prototype.ApplyNodeDifferences = function (parent, nodeOld, nodeNew, isHTML) {
        if (!nodeOld) {
            parent.appendChild(nodeNew);
        }
        else if (!nodeNew) {
            parent.removeChild(nodeOld);
        }
        else if (this.IsNodeDifferentType(nodeOld, nodeNew)) {
            parent.replaceChild(nodeNew, nodeOld);
        }
        else {
            if ((isHTML) && (nodeOld.outerHTML == nodeNew.outerHTML))
                return;
            this.ApplyNodeEventsDifferences(nodeOld, nodeNew);
            this.ApplyNodeSpecialDifferences(nodeOld, nodeNew);
            this.ApplyNodeAttributesDifferences(nodeOld, nodeNew);
            var childrenOld = nodeOld != null ? [].slice.call(nodeOld.children) : [];
            var childrenNew = nodeNew != null ? [].slice.call(nodeNew.children) : [];
            var lengthOld = childrenOld.length;
            var lengthNew = childrenNew.length;
            if ((lengthOld === 0) && (lengthNew === 0)) {
                if (nodeOld.textContent !== nodeNew.textContent)
                    nodeOld.textContent = nodeNew.textContent;
            }
            else {
                for (var i = 0; i < lengthNew || i < lengthOld; i++) {
                    this.ApplyNodeDifferences(nodeOld, childrenOld[i], childrenNew[i], isHTML);
                }
            }
        }
    };
    DrapoDocument.prototype.ApplyNodeDifferencesRenderClass = function (nodeOld, nodeNew) {
        var className = nodeNew.className;
        if (nodeOld.className !== className)
            nodeOld.className = className;
    };
    DrapoDocument.prototype.IsNodeDifferentType = function (nodeOld, nodeNew) {
        if ((typeof nodeOld) !== (typeof nodeNew))
            return (true);
        if ((nodeOld.nodeType) !== (nodeNew.nodeType))
            return (true);
        if ((nodeOld.tagName) !== (nodeNew.tagName))
            return (true);
        return (false);
    };
    DrapoDocument.prototype.ApplyNodeEventsDifferences = function (nodeOld, nodeNew) {
        var eventsOld = this.ExtractNodeEvents(nodeOld);
        var eventsNew = this.ExtractNodeEvents(nodeNew);
        for (var i = 0; i < eventsNew.length; i++) {
            var eventNew = eventsNew[i];
            var eventType = eventNew[0];
            var eventsHandlerNew = eventNew[1];
            var eventsHandlerOld = this.ExtractEvents(eventType, eventsOld);
            for (var j = 0; j < eventsHandlerNew.length; j++) {
                var eventHandlerNew = eventsHandlerNew[j];
                var eventHandleNamespace = this.CreateNodeEventNamespace(eventHandlerNew);
                var eventHandlerOld = this.ExtractEventHandler(eventHandleNamespace, eventsHandlerOld);
                if (eventHandlerOld === null) {
                    $(nodeOld).bind(eventHandleNamespace, eventHandlerNew.data, eventHandlerNew.handler);
                }
                else {
                    eventHandlerOld.handler = eventHandlerNew.handler;
                }
            }
            if ((eventsHandlerOld !== null) && (eventsHandlerOld.length > eventsHandlerNew.length)) {
                for (var j = 0; j < eventsHandlerOld.length; j++) {
                    var eventHandlerOld = eventsHandlerOld[j];
                    var eventHandleNamespace = this.CreateNodeEventNamespace(eventHandlerOld);
                    var eventHandlerNew = this.ExtractEventHandler(eventHandleNamespace, eventsHandlerNew);
                    if (eventHandlerNew === null)
                        $(nodeOld).unbind(eventHandleNamespace);
                }
            }
        }
        if (eventsOld.length > eventsNew.length) {
            for (var i = 0; i < eventsOld.length; i++) {
                var eventOld = eventsOld[i];
                var eventType = eventOld[0];
                var eventsHandlerNew = this.ExtractEvents(eventType, eventsNew);
                if (eventsHandlerNew === null)
                    $(nodeOld).unbind(eventType);
            }
        }
    };
    DrapoDocument.prototype.ExtractNodeEvents = function (node) {
        var events = [];
        var dataEvents = $._data(node, 'events');
        $.each(dataEvents, function (eventType, eventArray) {
            events.push([eventType, eventArray]);
        });
        return (events);
    };
    DrapoDocument.prototype.ExtractEvents = function (eventType, events) {
        for (var i = 0; i < events.length; i++) {
            var event_1 = events[i];
            if (event_1[0] === eventType)
                return (event_1[1]);
        }
        return (null);
    };
    DrapoDocument.prototype.ExtractEventHandler = function (namespace, eventsHandler) {
        if (eventsHandler === null)
            return (null);
        for (var i = 0; i < eventsHandler.length; i++) {
            var eventHandler = eventsHandler[i];
            if (namespace === this.CreateNodeEventNamespace(eventHandler))
                return (eventHandler);
        }
        return (null);
    };
    DrapoDocument.prototype.CreateNodeEventNamespace = function (event) {
        return (event.namespace.length > 0 ? (event.type + '.' + event.namespace) : (event.type));
    };
    DrapoDocument.prototype.ApplyNodeSpecialDifferences = function (nodeOld, nodeNew) {
        var tag = nodeOld.tagName.toLowerCase();
        if (tag === "input")
            this.ApplyNodeSpecialDifferencesInput(nodeOld, nodeNew);
        else if (tag === "select")
            this.ApplyNodeSpecialDifferencesSelect(nodeOld, nodeNew);
        else if (tag === "textarea")
            this.ApplyNodeSpecialDifferencesTextarea(nodeOld, nodeNew);
    };
    DrapoDocument.prototype.ApplyNodeSpecialDifferencesInput = function (nodeOld, nodeNew) {
        var type = nodeOld.type;
        if (((type == 'checkbox')) && (nodeOld.checked !== nodeNew.checked))
            nodeOld.checked = nodeNew.checked;
        if (((type == 'text') || (type == 'password')) && (nodeOld.value !== nodeNew.value))
            nodeOld.value = nodeNew.value;
    };
    DrapoDocument.prototype.ApplyNodeSpecialDifferencesSelect = function (nodeOld, nodeNew) {
        if (nodeOld.value !== nodeNew.value)
            nodeOld.value = nodeNew.value;
    };
    DrapoDocument.prototype.ApplyNodeSpecialDifferencesTextarea = function (nodeOld, nodeNew) {
        if (nodeOld.value !== nodeNew.value)
            nodeOld.value = nodeNew.value;
    };
    DrapoDocument.prototype.ApplyNodeAttributesDifferences = function (nodeOld, nodeNew) {
        var attributesOld = this.ExtactNodeAttributes(nodeOld);
        var attributesNew = this.ExtactNodeAttributes(nodeNew);
        for (var i = 0; i < attributesNew.length; i++) {
            var attribute = attributesNew[i];
            var name_2 = attribute[0];
            var valueNew = attribute[1];
            var valueOld = this.ExtractNodeAttributeValue(attributesOld, name_2);
            if (valueNew === valueOld)
                continue;
            if ((name_2 === 'class') && (this.Application.Validator.IsValidatorInterface(nodeOld)))
                continue;
            nodeOld.setAttribute(name_2, valueNew);
        }
        for (var i = 0; i < attributesOld.length; i++) {
            var attribute = attributesOld[i];
            var name_3 = attribute[0];
            var valueNew = this.ExtractNodeAttributeValue(attributesNew, name_3);
            if (valueNew !== null)
                continue;
            nodeOld.removeAttribute(name_3);
        }
    };
    DrapoDocument.prototype.ExtactNodeAttributes = function (node) {
        var attributes = [];
        var nodeAttributes = node.attributes;
        var length = nodeAttributes.length;
        for (var i = 0; i < length; i++) {
            var nodeAttribute = nodeAttributes[i];
            attributes.push([nodeAttribute.name, nodeAttribute.value]);
        }
        return (attributes);
    };
    DrapoDocument.prototype.ExtractNodeAttributeValue = function (attributes, name) {
        for (var i = attributes.length - 1; i >= 0; i--)
            if (attributes[i][0] === name)
                return (attributes[i][1]);
        return (null);
    };
    DrapoDocument.prototype.Contains = function (elementJQuery) {
        return (jQuery.contains(document.documentElement, elementJQuery[0]));
    };
    DrapoDocument.prototype.ExtractQueryString = function (canUseRouter) {
        var url = canUseRouter ? document.location.href : this.Application.Router.GetLastRouteUrl();
        if (url == null)
            url = document.location.href;
        return (this.Application.Parser.ParseQueryString(url));
    };
    DrapoDocument.prototype.Sleep = function (timeout) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, new Promise(function (resolve) { return setTimeout(resolve, timeout); })];
            });
        });
    };
    DrapoDocument.prototype.WaitForMessage = function (retry, interval) {
        if (retry === void 0) { retry = 1000; }
        if (interval === void 0) { interval = 50; }
        return __awaiter(this, void 0, void 0, function () {
            var i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < retry)) return [3, 4];
                        if (this.Message != null)
                            return [2, (this.Message)];
                        return [4, this.Application.Document.Sleep(interval)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        i++;
                        return [3, 1];
                    case 4: return [2, (null)];
                }
            });
        });
    };
    DrapoDocument.prototype.AddSectorHierarchy = function (sector, sectorParent) {
        return __awaiter(this, void 0, void 0, function () {
            var i, sectorHierarchyCurrent, sectorHierarchy;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < this._sectorHierarchy.length)) return [3, 4];
                        sectorHierarchyCurrent = this._sectorHierarchy[i];
                        if (sectorHierarchyCurrent[0] !== sector)
                            return [3, 3];
                        sectorHierarchyCurrent[1] = sectorParent;
                        return [4, this.Application.Debugger.NotifySectors()];
                    case 2:
                        _a.sent();
                        return [2];
                    case 3:
                        i++;
                        return [3, 1];
                    case 4:
                        sectorHierarchy = [sector, sectorParent];
                        this._sectorHierarchy.push(sectorHierarchy);
                        return [4, this.Application.Debugger.NotifySectors()];
                    case 5:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    DrapoDocument.prototype.GetSectorAndChildren = function (sector) {
        var sectors = [];
        sectors.push(sector);
        for (var i = 0; i < this._sectorHierarchy.length; i++) {
            var sectorHierarchy = this._sectorHierarchy[i];
            if (sectorHierarchy[1] !== sector)
                continue;
            var sectorChild = sectorHierarchy[0];
            sectors.push(sectorChild);
            var sectorChildren = this.GetSectorHierarchyChildren(sectorChild);
            for (var j = 0; j < sectorChildren.length; j++)
                sectors.push(sectorChildren[j]);
        }
        return (sectors);
    };
    DrapoDocument.prototype.GetSectorChildren = function (sector) {
        var sectors = [];
        for (var i = 0; i < this._sectorHierarchy.length; i++) {
            var sectorHierarchy = this._sectorHierarchy[i];
            if (sectorHierarchy[1] !== sector)
                continue;
            var sectorChild = sectorHierarchy[0];
            sectors.push(sectorChild);
        }
        return (sectors);
    };
    DrapoDocument.prototype.GetSectorHierarchyChildren = function (sector) {
        var sectors = [];
        for (var i = 0; i < this._sectorHierarchy.length; i++) {
            var sectorHierarchy = this._sectorHierarchy[i];
            if (sectorHierarchy[1] !== sector)
                continue;
            var sectorChild = sectorHierarchy[0];
            sectors.push(sectorChild);
            var sectorChildren = this.GetSectorHierarchyChildren(sectorChild);
            for (var j = 0; j < sectorChildren.length; j++)
                sectors.push(sectorChildren[j]);
        }
        return (sectors);
    };
    DrapoDocument.prototype.IsSectorReady = function (sector) {
        if (sector == null)
            return (true);
        for (var i = 0; i < this._sectorHierarchy.length; i++) {
            var sectorHierarchy = this._sectorHierarchy[i];
            if (sectorHierarchy[0] === sector)
                return (true);
        }
        return (false);
    };
    DrapoDocument.prototype.GetSectorHierarchyParents = function (sector) {
        var sectors = [sector];
        for (var i = 0; i < this._sectorHierarchy.length; i++) {
            var sectorHierarchy = this._sectorHierarchy[i];
            if (sectorHierarchy[0] !== sector)
                continue;
            var sectorParent = sectorHierarchy[1];
            if (sectorParent == null)
                continue;
            var sectorParents = this.GetSectorHierarchyParents(sectorParent);
            for (var j = 0; j < sectorParents.length; j++)
                sectors.push(sectorParents[j]);
        }
        return (sectors);
    };
    DrapoDocument.prototype.AppendSectorHierarchyBySector = function (sectorHierarchy, sector) {
        for (var i = 0; i < this._sectorHierarchy.length; i++) {
            var sectorHierarchyCurrent = this._sectorHierarchy[i];
            if (sectorHierarchyCurrent[0] !== sector)
                continue;
            sectorHierarchy.push([sector, sectorHierarchyCurrent[1]]);
            break;
        }
    };
    DrapoDocument.prototype.AddSectorHierarchys = function (sectorHierarchys) {
        for (var i = 0; i < sectorHierarchys.length; i++)
            this._sectorHierarchy.push(sectorHierarchys[i]);
    };
    DrapoDocument.prototype.AppendSectorFriendsBySector = function (sectorFriends, sector) {
        for (var i = 0; i < this._sectorFriends.length; i++) {
            var sectorFriend = this._sectorFriends[i];
            if (sectorFriend[0] !== sector)
                continue;
            sectorFriends.push([sector, this.Application.Solver.CloneArrayString(sectorFriend[1])]);
            break;
        }
    };
    DrapoDocument.prototype.AddSectorFriendsRange = function (sectorFriends) {
        for (var i = 0; i < sectorFriends.length; i++)
            this._sectorFriends.push(sectorFriends[i]);
    };
    DrapoDocument.prototype.IsSystemKey = function (key) {
        return ((key.length > 2) && (key[0] == '_') && (key[1] == '_'));
    };
    DrapoDocument.prototype.IsHiddenKey = function (key) {
        return ((key.length > 1) && (key[0] == '_'));
    };
    DrapoDocument.prototype.GetSectors = function () {
        var sectors = [];
        sectors.push('');
        for (var i = 0; i < this._sectorHierarchy.length; i++) {
            var sectorHierarchy = this._sectorHierarchy[i];
            var sector = sectorHierarchy[0];
            if (this.IsSystemKey(sector))
                continue;
            sectors.push(sector);
        }
        return (sectors);
    };
    DrapoDocument.prototype.IsEqualSector = function (sector1, sector2) {
        var sector1Root = this.IsSectorRoot(sector1);
        var sector2Root = this.IsSectorRoot(sector2);
        if ((sector1Root) && (sector2Root))
            return (true);
        if ((sector1Root) || (sector2Root))
            return (false);
        return (sector1 === sector2);
    };
    DrapoDocument.prototype.IsSectorRoot = function (sector) {
        return ((sector === null) || (sector === ''));
    };
    DrapoDocument.prototype.CleanSectorMetadata = function (sector) {
        if (sector == null)
            return;
        var sectorChildren = this.GetSectorAndChildren(sector);
        for (var i = 0; i < sectorChildren.length; i++)
            this.CleanSectorMetadataInternal(sectorChildren[i]);
    };
    DrapoDocument.prototype.CleanSectorMetadataInternal = function (sector) {
        for (var i = this._sectorFriends.length - 1; i >= 0; i--) {
            var sectorFriends = this._sectorFriends[i];
            if (sectorFriends[0] !== sector)
                continue;
            this._sectorFriends.splice(i, 1);
            break;
        }
        for (var i = this._sectorHierarchy.length - 1; i >= 0; i--) {
            var sectorHierarchy = this._sectorHierarchy[i];
            if (sectorHierarchy[0] !== sector)
                continue;
            this._sectorHierarchy.splice(i, 1);
        }
    };
    DrapoDocument.prototype.GetSectorsAllowed = function (sector) {
        if (sector == null)
            return (null);
        var sectors = this.GetSectorHierarchyParents(sector);
        for (var i = 0; i < sectors.length; i++) {
            var sectorCurrent = sectors[i];
            var sectorCurrentFriends = this.GetSectorFriends(sectorCurrent);
            if (sectorCurrentFriends == null)
                continue;
            for (var j = 0; j < sectorCurrentFriends.length; j++) {
                var sectorCurrentFriend = sectorCurrentFriends[j];
                if (this.Application.Solver.Contains(sectors, sectorCurrentFriend))
                    continue;
                sectors.push(sectorCurrentFriend);
                var sectorCurrentFriendChildren = this.GetSectorHierarchyChildren(sectorCurrentFriend);
                for (var k = 0; k < sectorCurrentFriendChildren.length; k++) {
                    var sectorCurrentFriendChild = sectorCurrentFriendChildren[k];
                    if (this.Application.Solver.Contains(sectors, sectorCurrentFriendChild))
                        continue;
                    sectors.push(sectorCurrentFriendChild);
                }
            }
        }
        return (sectors);
    };
    DrapoDocument.prototype.IsSectorAllowed = function (sector, sectors) {
        if (sector == null)
            return (true);
        if (sectors == null)
            return (true);
        for (var i = 0; i < sectors.length; i++)
            if (sectors[i] == sector)
                return (true);
        return (false);
    };
    DrapoDocument.prototype.AddSectorFriends = function (sector, sectorFriendsText) {
        return __awaiter(this, void 0, void 0, function () {
            var friends, i, sectorFriend, i, sectorFriendsCurrent, sectorFriends;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (sectorFriendsText == null)
                            return [2];
                        friends = this.Application.Parser.ParseTags(sectorFriendsText);
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < friends.length)) return [3, 4];
                        if (!this.Application.Parser.IsMustache(friends[i])) return [3, 3];
                        return [4, this.Application.Storage.RetrieveDataValue(sector, friends[i])];
                    case 2:
                        sectorFriend = _a.sent();
                        friends.splice(i, 1);
                        friends.push(sectorFriend);
                        _a.label = 3;
                    case 3:
                        i++;
                        return [3, 1];
                    case 4:
                        for (i = 0; i < this._sectorFriends.length; i++) {
                            sectorFriendsCurrent = this._sectorFriends[i];
                            if (sectorFriendsCurrent[0] !== sector)
                                continue;
                            sectorFriendsCurrent[1] = friends;
                            return [2];
                        }
                        sectorFriends = [sector, friends];
                        this._sectorFriends.push(sectorFriends);
                        return [2];
                }
            });
        });
    };
    DrapoDocument.prototype.GetSectorFriends = function (sector) {
        for (var i = 0; i < this._sectorFriends.length; i++) {
            var sectorFriends = this._sectorFriends[i];
            if (sectorFriends[0] === sector)
                return (sectorFriends[1]);
        }
        return (null);
    };
    DrapoDocument.prototype.CollectSector = function (sector) {
        return __awaiter(this, void 0, void 0, function () {
            var i, sectorHierarchy, sectorCurrent;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        i = this._sectorHierarchy.length - 1;
                        _a.label = 1;
                    case 1:
                        if (!(i >= 0)) return [3, 5];
                        sectorHierarchy = this._sectorHierarchy[i];
                        if (sectorHierarchy[1] !== sector)
                            return [3, 4];
                        sectorCurrent = sectorHierarchy[0];
                        return [4, this.CollectSector(sectorCurrent)];
                    case 2:
                        _a.sent();
                        if (this.GetElementByAttribute('d-sector', sectorCurrent) !== null)
                            return [3, 4];
                        return [4, this.Application.SectorContainerHandler.UnloadSector(sectorCurrent)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        i--;
                        return [3, 1];
                    case 5: return [2];
                }
            });
        });
    };
    DrapoDocument.prototype.IsFirstChild = function (elj) {
        return (elj.index() === 0);
    };
    DrapoDocument.prototype.IsLastChild = function (elj) {
        return (elj.next().length === 0);
    };
    DrapoDocument.prototype.ReceiveMessage = function (message) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(message.Action === 'execute')) return [3, 2];
                        return [4, this.ExecuteMessage(message)];
                    case 1:
                        _a.sent();
                        return [3, 5];
                    case 2:
                        if (!(message.Action === 'update')) return [3, 4];
                        return [4, this.UpdateMessage(message)];
                    case 3:
                        _a.sent();
                        return [3, 5];
                    case 4:
                        this.Message = message;
                        _a.label = 5;
                    case 5: return [2];
                }
            });
        });
    };
    DrapoDocument.prototype.ExecuteMessage = function (message) {
        return __awaiter(this, void 0, void 0, function () {
            var storageItem, valueFunction;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.Application.IsLoaded) return [3, 2];
                        return [4, this.Sleep(50)];
                    case 1:
                        _a.sent();
                        return [3, 0];
                    case 2: return [4, this.Application.Storage.RetrieveDataItem(message.DataKey, message.Sector)];
                    case 3:
                        storageItem = _a.sent();
                        if (storageItem === null)
                            return [2];
                        if (!storageItem.IsTypeValue)
                            return [2];
                        valueFunction = storageItem.Data;
                        return [4, this.Application.FunctionHandler.ResolveFunctionWithoutContext(message.Sector, null, valueFunction)];
                    case 4:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    DrapoDocument.prototype.UpdateMessage = function (message) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.Application.Storage.UpdateData(message.DataKey, message.Sector, message.Data)];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    DrapoDocument.prototype.GetClipboard = function () {
        return __awaiter(this, void 0, void 0, function () {
            var value, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4, this.GetClipboardValueAsync()];
                    case 1:
                        value = _b.sent();
                        if (value !== null)
                            return [2, (value)];
                        return [2, (this.GetClipboardValueExecCommand())];
                    case 2:
                        _a = _b.sent();
                        return [2, ('')];
                    case 3: return [2];
                }
            });
        });
    };
    DrapoDocument.prototype.GetClipboardValueAsync = function () {
        return __awaiter(this, void 0, void 0, function () {
            var clipboard, value;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        clipboard = navigator.clipboard;
                        if (clipboard == null)
                            return [2, (null)];
                        if (!clipboard.readText)
                            return [2, (null)];
                        return [4, clipboard.readText()];
                    case 1:
                        value = _a.sent();
                        return [2, (value)];
                }
            });
        });
    };
    DrapoDocument.prototype.GetClipboardValueExecCommand = function () {
        return __awaiter(this, void 0, void 0, function () {
            var el, value;
            return __generator(this, function (_a) {
                el = document.createElement('textarea');
                document.body.appendChild(el);
                el.select();
                document.execCommand('paste');
                value = el.value;
                document.body.removeChild(el);
                return [2, (value)];
            });
        });
    };
    DrapoDocument.prototype.SetClipboard = function (value) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.SetClipboardEvent(value)];
                    case 1:
                        if (_a.sent())
                            return [2, (true)];
                        return [4, this.SetClipboardTextArea(value)];
                    case 2: return [2, (_a.sent())];
                }
            });
        });
    };
    DrapoDocument.prototype.SetClipboardEvent = function (value) {
        return __awaiter(this, void 0, void 0, function () {
            var result, listener;
            return __generator(this, function (_a) {
                result = false;
                listener = function (ev) {
                    if (!ev.clipboardData)
                        return (false);
                    ev.preventDefault();
                    ev.clipboardData.setData('text/plain', value);
                    result = true;
                    return (true);
                };
                try {
                    document.addEventListener('copy', listener);
                    document.execCommand('copy');
                }
                catch (_b) {
                    return [2, (false)];
                }
                finally {
                    document.removeEventListener('copy', listener);
                }
                return [2, (result)];
            });
        });
    };
    DrapoDocument.prototype.SetClipboardTextArea = function (value) {
        return __awaiter(this, void 0, void 0, function () {
            var el, result;
            return __generator(this, function (_a) {
                el = document.createElement('textarea');
                el.setAttribute('style', 'width:1px;height:0px;border:0;opacity:0;');
                el.value = value;
                document.body.appendChild(el);
                el.select();
                result = document.execCommand('copy');
                document.body.removeChild(el);
                return [2, (result)];
            });
        });
    };
    DrapoDocument.prototype.StartUnitTest = function () {
        return __awaiter(this, void 0, void 0, function () {
            var unitTest;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        unitTest = $("[d-id='__drapoUnitTest']");
                        if ((unitTest === null) || (unitTest.length === 0))
                            return [2];
                        return [4, this.Application.EventHandler.TriggerClick(unitTest[0])];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    return DrapoDocument;
}());

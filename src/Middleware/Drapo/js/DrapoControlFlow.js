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
var DrapoControlFlow = (function () {
    function DrapoControlFlow(application) {
        this._application = application;
    }
    Object.defineProperty(DrapoControlFlow.prototype, "Application", {
        get: function () {
            return (this._application);
        },
        enumerable: false,
        configurable: true
    });
    DrapoControlFlow.prototype.ResolveControlFlowDocument = function () {
        return __awaiter(this, void 0, void 0, function () {
            var els;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        els = this.Application.Searcher.FindAllByAttribute('d-for');
                        return [4, this.ResolveControlFlowForArray(els)];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    DrapoControlFlow.prototype.ResolveControlFlowSector = function (el, canResolveComponents) {
        if (canResolveComponents === void 0) { canResolveComponents = true; }
        return __awaiter(this, void 0, void 0, function () {
            var els;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (el == null)
                            return [2];
                        els = this.Application.Searcher.FindAllByAttributeFromParent('d-for', el);
                        return [4, this.ResolveControlFlowForArray(els, false, true, DrapoStorageLinkType.Render, canResolveComponents)];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    DrapoControlFlow.prototype.ResolveControlFlowForParent = function (forElement) {
        var forElementParent = null;
        while ((forElementParent = forElement.parentElement) != null) {
            if (forElementParent.getAttribute('d-for') != null)
                return (forElementParent);
            forElement = forElementParent;
        }
        return (null);
    };
    DrapoControlFlow.prototype.ResolveControlFlowForRoot = function (forElement) {
        var forElementParent = null;
        while ((forElementParent = this.ResolveControlFlowForParent(forElement)) != null) {
            forElement = forElementParent;
        }
        return (forElement);
    };
    DrapoControlFlow.prototype.ResolveControlFlowForElement = function (forElement, isIncremental, canUseDifference, type, canResolveComponents) {
        if (isIncremental === void 0) { isIncremental = false; }
        if (canUseDifference === void 0) { canUseDifference = true; }
        if (type === void 0) { type = DrapoStorageLinkType.Render; }
        if (canResolveComponents === void 0) { canResolveComponents = true; }
        return __awaiter(this, void 0, void 0, function () {
            var forElements;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        forElements = [];
                        forElements.push(forElement);
                        return [4, this.ResolveControlFlowForArray(forElements, isIncremental, canUseDifference, type, canResolveComponents)];
                    case 1: return [2, (_a.sent())];
                }
            });
        });
    };
    DrapoControlFlow.prototype.ResolveControlFlowForArray = function (forElements, isIncremental, canUseDifference, type, canResolveComponents) {
        if (isIncremental === void 0) { isIncremental = false; }
        if (canUseDifference === void 0) { canUseDifference = true; }
        if (type === void 0) { type = DrapoStorageLinkType.Render; }
        if (canResolveComponents === void 0) { canResolveComponents = true; }
        return __awaiter(this, void 0, void 0, function () {
            var forElementsInserted, i, forElement, forElementRoot, context, sector, renderContext;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        forElementsInserted = [];
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < forElements.length)) return [3, 4];
                        forElement = forElements[i];
                        forElementRoot = this.ResolveControlFlowForRoot(forElement);
                        if (!this.Application.Document.IsElementInserted(forElementsInserted, forElementRoot))
                            return [3, 3];
                        if (this.Application.Document.IsElementPreprocessed(forElement))
                            return [3, 3];
                        if (this.Application.Document.IsElementInsideComponent(forElement))
                            return [3, 3];
                        context = new DrapoContext();
                        sector = this.Application.Document.GetSector(forElementRoot);
                        context.Sector = sector;
                        if (!this.Application.Document.IsSectorReady(sector))
                            return [3, 3];
                        renderContext = new DrapoRenderContext();
                        return [4, this.ResolveControlFlowForInternal(sector, context, renderContext, forElementRoot, isIncremental, canUseDifference, type, canResolveComponents)];
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
    DrapoControlFlow.prototype.InitializeContext = function (context, content) {
        if (this.Application.Barber.HasContentMustacheNodesContext(content))
            context.CheckMustacheNodes = true;
        if (this.Application.ModelHandler.HasContentModelContext(content))
            context.CheckModel = true;
        if (this.Application.Barber.HasContentMustacheAttributeContext(content))
            context.CheckMustacheAttributes = true;
        if (this.Application.AttributeHandler.HasContentIDContext(content))
            context.CheckID = true;
        if (this.Application.AttributeHandler.HasContentAttributeContext(content))
            context.CheckAttribute = true;
        if (this.Application.ClassHandler.HasContentClassContext(content))
            context.CheckClass = true;
        if (this.Application.EventHandler.HasContentEventContext(content))
            context.CheckEvent = true;
        if (this.Application.BehaviorHandler.HasContentBehaviorContext(content))
            context.CheckBehavior = true;
        if (this.Application.ComponentHandler.HasContentComponent(content))
            context.CheckComponent = true;
        if (this.Application.Validator.HasContentValidation(content))
            context.CheckValidation = true;
        context.Checkpoint();
    };
    DrapoControlFlow.prototype.IsElementControlFlowTemplate = function (el) {
        var forText = el.getAttribute('d-for');
        if (forText === null)
            return (false);
        return (el.style.display === 'none');
    };
    DrapoControlFlow.prototype.ResolveControlFlowForInternal = function (sector, context, renderContext, elFor, isIncremental, canUseDifference, type, canResolveComponents) {
        if (canUseDifference === void 0) { canUseDifference = true; }
        if (type === void 0) { type = DrapoStorageLinkType.Render; }
        if (canResolveComponents === void 0) { canResolveComponents = true; }
        return __awaiter(this, void 0, void 0, function () {
            var forText, ifText, forIfText, wasWrapped, viewportBeforeScrollPosition, wrapper, parsedFor, key, dataKeyIteratorRange, forElementRecursive, elementForTemplate, hasIfText, hasForIfText, conditionalForIfResult, isContextRoot, elAnchor, content, dForRender, dForRenders, isHTML, isViewport, hasViewPortBefore, hasViewPortbeforeRecycle, viewportBefore, itemsViewport, isDifference, isLastChild, isContextRootFull, isFirstChild, isContextRootFullExclusive, elForParent, items, dataItem, datas, range, dataKeyIterator, dataKey, dataKeyIteratorParts, isDataKey, dataKeyRoot, lastInserted, start, nextElements, dataLength, i, template, forReferenceTemplate, isHash, hashTemplate, useHash, length, canCreateViewport, viewport, isViewportActive, canFragmentElements, fragment, canUseTemplate, templateVariables, _a, nodesRemovedCount, startViewport, endViewport, j, data, templateKey, _b, templateData, _c, template, viewportIndexDifference, nodeIndex, oldNode, item, _d, hashValueBefore, hashValueCurrent, _e, applyHash, template;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        forText = elFor.getAttribute('d-for');
                        ifText = null;
                        forIfText = null;
                        wasWrapped = false;
                        viewportBeforeScrollPosition = 0;
                        if (forText == null) {
                            wrapper = this.Application.Document.GetWrapper(elFor);
                            forText = wrapper != null ? wrapper.getAttribute('d-for') : null;
                            if (forText == null)
                                return [2, (false)];
                            wasWrapped = true;
                            ifText = wrapper.getAttribute('d-if');
                            forIfText = wrapper.getAttribute('d-for-if');
                        }
                        parsedFor = this.Application.Parser.ParseFor(forText);
                        if (parsedFor == null)
                            return [2, (false)];
                        key = parsedFor[0];
                        dataKeyIteratorRange = parsedFor[2];
                        forElementRecursive = isIncremental ? null : context.GetElementTemplate(key);
                        elementForTemplate = forElementRecursive != null ? forElementRecursive : elFor;
                        if (ifText == null)
                            ifText = elementForTemplate.getAttribute('d-if');
                        hasIfText = (ifText != null);
                        if (forIfText == null)
                            forIfText = elementForTemplate.getAttribute('d-for-if');
                        hasForIfText = (forIfText != null);
                        conditionalForIfResult = true;
                        isContextRoot = context.IsEmpty;
                        elAnchor = (isContextRoot) ? this.Application.Document.Hide(elFor) : elFor;
                        content = isContextRoot ? elFor.outerHTML : null;
                        if (isContextRoot)
                            this.InitializeContext(context, content);
                        dForRender = elementForTemplate.getAttribute('d-for-render');
                        dForRenders = ((dForRender == null) || (dForRender == '')) ? [] : this.Application.Parser.ParseBlock(dForRender, ',');
                        isHTML = this.Application.Solver.Contains(dForRenders, 'html');
                        isViewport = this.Application.Solver.Contains(dForRenders, 'viewport');
                        hasViewPortBefore = (isViewport) && (this.Application.ViewportHandler.HasElementViewport(elementForTemplate));
                        hasViewPortbeforeRecycle = ((hasViewPortBefore) && ((!canUseDifference) || (isViewport)));
                        if (hasViewPortbeforeRecycle) {
                            hasViewPortBefore = false;
                            viewportBefore = this.Application.ViewportHandler.GetElementViewport(elementForTemplate);
                            viewportBeforeScrollPosition = viewportBefore.ElementScroll.scrollTop;
                            this.Application.ViewportHandler.DestroyViewportControlFlow(viewportBefore);
                            itemsViewport = this.Application.Document.GetNextAll(elAnchor);
                            this.RemoveList(itemsViewport);
                        }
                        isDifference = ((canUseDifference) && ((!isViewport) || (hasViewPortBefore)) && (!isIncremental) && (!hasIfText));
                        isLastChild = this.Application.Document.IsLastChild(elAnchor);
                        if ((isDifference) && (isContextRoot) && (isLastChild))
                            isDifference = false;
                        isContextRootFull = ((isContextRoot) && (!isDifference));
                        isFirstChild = this.Application.Document.IsFirstChild(elAnchor);
                        isContextRootFullExclusive = ((isContextRootFull) && (isFirstChild) && (!wasWrapped));
                        elForParent = elAnchor.parentElement;
                        if (!hasForIfText) return [3, 2];
                        return [4, this.Application.Solver.ResolveConditional(forIfText, null, sector, context, renderContext)];
                    case 1:
                        conditionalForIfResult = _f.sent();
                        _f.label = 2;
                    case 2:
                        items = isContextRootFullExclusive ? null : this.Application.Document.GetNextAll(elAnchor);
                        dataItem = null;
                        datas = null;
                        range = this.GetIteratorRange(dataKeyIteratorRange);
                        dataKeyIterator = range == null ? dataKeyIteratorRange : this.CleanIteratorRange(dataKeyIteratorRange);
                        dataKey = dataKeyIterator;
                        if (!this.IsControlFlowDataKeyIterator(dataKeyIterator)) return [3, 4];
                        return [4, this.GetControlFlowDataKeyIterators(context, renderContext, elementForTemplate, dataKeyIterator)];
                    case 3:
                        datas = _f.sent();
                        return [3, 9];
                    case 4:
                        dataKeyIteratorParts = this.Application.Parser.ParseForIterable(dataKeyIterator);
                        dataKey = dataKeyIteratorParts[0];
                        isDataKey = this.Application.Storage.IsDataKey(dataKey, sector);
                        if (isDataKey) {
                            dataKeyRoot = context.GetDataKeyRoot();
                            if (dataKeyRoot === null) {
                                this.Application.Observer.UnsubscribeFor(dataKey, elementForTemplate);
                                this.Application.Observer.SubscribeFor(elementForTemplate, dataKey);
                            }
                            else if (dataKeyRoot !== dataKey) {
                                this.Application.Observer.SubscribeLink(dataKey, dataKeyRoot);
                            }
                            if (hasForIfText)
                                this.Application.Observer.SubscribeLinkMustache(forIfText, dataKey);
                        }
                        if (!conditionalForIfResult) return [3, 8];
                        if (!this.HasContextIterators(context, dataKeyIteratorParts)) return [3, 5];
                        datas = this.GetContextIteratorsData(context, dataKeyIteratorParts);
                        return [3, 7];
                    case 5: return [4, this.Application.Storage.Retrieve(dataKey, sector, context, dataKeyIteratorParts)];
                    case 6:
                        dataItem = _f.sent();
                        if (dataItem == null)
                            return [2, (false)];
                        if ((isDataKey) && (dataKeyIteratorParts.length > 1)) {
                            datas = this.Application.Solver.ResolveDataObjectPathObject(dataItem.Data, dataKeyIteratorParts);
                        }
                        else {
                            datas = dataItem.Data;
                        }
                        _f.label = 7;
                    case 7: return [3, 9];
                    case 8:
                        datas = [];
                        _f.label = 9;
                    case 9:
                        if (datas == null)
                            return [2, (false)];
                        if (!datas.length)
                            datas = this.Application.Solver.TransformObjectIntoArray(datas);
                        if (range !== null)
                            datas = this.ApplyRange(datas, range);
                        lastInserted = elAnchor;
                        start = 0;
                        if (isIncremental) {
                            nextElements = this.Application.Document.GetNextAll(elAnchor);
                            start = this.Application.Document.GetIndex(elAnchor) + nextElements.length;
                            if (nextElements.length > 0)
                                lastInserted = nextElements[nextElements.length - 1];
                        }
                        if ((!isDifference) && (type == DrapoStorageLinkType.RenderClass))
                            type = DrapoStorageLinkType.Render;
                        if ((!isIncremental) && (!isDifference) && (!isContextRootFullExclusive) && (!isViewport))
                            this.RemoveList(items);
                        if (isDifference) {
                            dataLength = datas.length;
                            for (i = items.length - 1; i >= dataLength; i--) {
                                this.RemoveListIndex(items, i);
                            }
                        }
                        if ((datas.length !== null) && (datas.length === 0)) {
                            if (isIncremental)
                                return [2, (false)];
                            if (isContextRootFullExclusive) {
                                this.Application.Observer.UnsubscribeFor(dataKey, elementForTemplate);
                                if (!isLastChild)
                                    this.Application.Document.SetHTML(elForParent, content);
                                template = elForParent.children[0];
                                this.Application.Observer.SubscribeFor(template, dataKey);
                            }
                            return [2, (false)];
                        }
                        this.Application.Observer.IsEnabledNotifyIncremental = false;
                        forReferenceTemplate = this.Application.Document.Clone(elementForTemplate);
                        if ((isContextRoot) || (context.IsInsideRecursion))
                            forReferenceTemplate = this.Application.Document.Show(forReferenceTemplate);
                        forReferenceTemplate.removeAttribute('d-for');
                        if (ifText != null)
                            forReferenceTemplate.removeAttribute('d-if');
                        isHash = this.Application.Solver.Contains(dForRenders, 'hash');
                        hashTemplate = isHash ? this.GetElementHashTemplate(elementForTemplate) : null;
                        useHash = hashTemplate !== null;
                        length = datas.length;
                        canCreateViewport = ((isContextRoot) && (isFirstChild) && (!wasWrapped) && (!hasIfText) && (range === null));
                        viewport = (canCreateViewport && isViewport) ? this.Application.ViewportHandler.CreateViewportControlFlow(sector, elementForTemplate, forReferenceTemplate, dataKey, key, dataKeyIteratorRange, datas) : null;
                        isViewportActive = ((viewport != null) && (viewport.IsActive));
                        if (dForRender != null)
                            forReferenceTemplate.removeAttribute('d-for-render');
                        lastInserted = this.Application.ViewportHandler.CreateViewportControlFlowBallonBefore(viewport, lastInserted);
                        canFragmentElements = viewport == null;
                        fragment = document.createDocumentFragment();
                        canUseTemplate = isContextRootFullExclusive && (type == DrapoStorageLinkType.Render) && (datas.length > 3);
                        if (!canUseTemplate) return [3, 11];
                        return [4, this.GetTemplateVariables(sector, context, dataKey, key, forReferenceTemplate)];
                    case 10:
                        _a = (_f.sent());
                        return [3, 12];
                    case 11:
                        _a = null;
                        _f.label = 12;
                    case 12:
                        templateVariables = _a;
                        nodesRemovedCount = 0;
                        startViewport = this.Application.ViewportHandler.GetViewportControlFlowStart(viewport, start);
                        endViewport = this.Application.ViewportHandler.GetViewportControlFlowEnd(viewport, length);
                        if (isViewportActive)
                            context.Initialize(startViewport - 1);
                        j = startViewport;
                        _f.label = 13;
                    case 13:
                        if (!(j < endViewport)) return [3, 32];
                        data = datas[j];
                        if (!(templateVariables !== null)) return [3, 15];
                        return [4, this.CreateTemplateKey(sector, context, dataKey, templateVariables, data, key, j)];
                    case 14:
                        _b = _f.sent();
                        return [3, 16];
                    case 15:
                        _b = null;
                        _f.label = 16;
                    case 16:
                        templateKey = _b;
                        if (!(templateKey !== null)) return [3, 18];
                        return [4, this.GetTemplateFromTemplateKey(context, templateKey)];
                    case 17:
                        _c = _f.sent();
                        return [3, 19];
                    case 18:
                        _c = null;
                        _f.label = 19;
                    case 19:
                        templateData = _c;
                        if (!((templateKey !== null) && (templateData === null))) return [3, 21];
                        return [4, this.CreateTemplate(sector, context, renderContext, this.Application.Document.Clone(forReferenceTemplate), dataKey, key, j, data)];
                    case 20:
                        templateData = _f.sent();
                        this.AddTemplate(context, templateKey, templateData);
                        _f.label = 21;
                    case 21:
                        template = templateData !== null ? this.Application.Document.Clone(templateData) : this.Application.Document.Clone(forReferenceTemplate);
                        viewportIndexDifference = (isViewportActive ? (1 - startViewport) : 0);
                        nodeIndex = j - nodesRemovedCount + viewportIndexDifference;
                        oldNode = ((items !== null) && (nodeIndex < items.length)) ? items[nodeIndex] : null;
                        item = context.Create(data, template, elementForTemplate, dataKey, key, dataKeyIterator, j, oldNode);
                        _d = (hasIfText);
                        if (!_d) return [3, 23];
                        return [4, this.Application.Solver.ResolveConditional(ifText, template, sector, context, renderContext, elementForTemplate)];
                    case 22:
                        _d = (!(_f.sent()));
                        _f.label = 23;
                    case 23:
                        if (_d) {
                            if ((isDifference) && (oldNode !== null))
                                this.RemoveListIndex(items, nodeIndex);
                            nodesRemovedCount++;
                            context.Pop();
                            return [3, 31];
                        }
                        if (!(type == DrapoStorageLinkType.Render)) return [3, 29];
                        hashValueBefore = ((useHash) && (oldNode != null)) ? oldNode.getAttribute('d-hash') : null;
                        if (!(hashTemplate === null)) return [3, 24];
                        _e = null;
                        return [3, 26];
                    case 24: return [4, this.GetElementHashValue(sector, context, template, hashTemplate)];
                    case 25:
                        _e = _f.sent();
                        _f.label = 26;
                    case 26:
                        hashValueCurrent = _e;
                        applyHash = ((!useHash) || (hashValueCurrent !== hashValueBefore));
                        if (!applyHash) return [3, 28];
                        return [4, this.ResolveControlFlowForIterationRender(sector, context, template, renderContext, true, canResolveComponents)];
                    case 27:
                        _f.sent();
                        _f.label = 28;
                    case 28:
                        if (((isDifference) || (isViewportActive)) && (oldNode != null)) {
                            if (applyHash)
                                this.Application.Document.ApplyNodeDifferences(oldNode.parentElement, oldNode, template, isHTML);
                            if (hashValueCurrent !== null)
                                oldNode.setAttribute('d-hash', hashValueCurrent);
                            lastInserted = oldNode;
                        }
                        else if (canFragmentElements) {
                            if (hashValueCurrent !== null)
                                template.setAttribute('d-hash', hashValueCurrent);
                            fragment.appendChild(template);
                        }
                        else {
                            lastInserted.after(template);
                            lastInserted = template;
                            if (hashValueCurrent !== null)
                                template.setAttribute('d-hash', hashValueCurrent);
                            if (!this.Application.ViewportHandler.HasHeightChanged(viewport)) {
                                this.Application.ViewportHandler.UpdateHeightItem(viewport, template);
                                endViewport = this.Application.ViewportHandler.GetViewportControlFlowEnd(viewport, length);
                                canFragmentElements = true;
                            }
                        }
                        return [3, 31];
                    case 29:
                        if (!(type == DrapoStorageLinkType.RenderClass)) return [3, 31];
                        return [4, this.ResolveControlFlowForIterationRenderClass(context, renderContext, template, sector)];
                    case 30:
                        _f.sent();
                        if (oldNode != null)
                            this.Application.Document.ApplyNodeDifferencesRenderClass(oldNode, template);
                        _f.label = 31;
                    case 31:
                        j++;
                        return [3, 13];
                    case 32:
                        this.Application.ViewportHandler.AppendViewportControlFlowBallonAfter(viewport, fragment);
                        if ((viewport == null) && (isContextRootFullExclusive) && (!isIncremental)) {
                            this.Application.Observer.UnsubscribeFor(dataKey, elementForTemplate);
                            if (elForParent.children.length !== 1)
                                this.Application.Document.SetHTML(elForParent, content);
                            template = elForParent.children[0];
                            this.Application.Observer.SubscribeFor(template, dataKey);
                            elForParent.append(fragment);
                            elFor = template;
                        }
                        else {
                            if (fragment.childNodes.length > 0)
                                lastInserted.after(fragment);
                        }
                        this.Application.ViewportHandler.ActivateViewportControlFlow(viewport, lastInserted);
                        this.Application.Observer.IsEnabledNotifyIncremental = true;
                        if (!((context.IsInsideRecursion) && (!context.IsElementTemplateRoot(key)))) return [3, 34];
                        return [4, this.Application.Document.RemoveElement(elementForTemplate, false)];
                    case 33:
                        _f.sent();
                        _f.label = 34;
                    case 34:
                        if (!((dataItem != null) && (dataItem.IsIncremental))) return [3, 36];
                        return [4, this.Application.Binder.BindIncremental(elFor, dataKeyIterator, sector, isIncremental)];
                    case 35:
                        _f.sent();
                        _f.label = 36;
                    case 36:
                        if (!isContextRoot) return [3, 39];
                        return [4, this.Application.ComponentHandler.UnloadComponentInstancesDetached(sector)];
                    case 37:
                        _f.sent();
                        return [4, this.Application.Document.CollectSector(sector)];
                    case 38:
                        _f.sent();
                        _f.label = 39;
                    case 39:
                        if (!hasViewPortbeforeRecycle) return [3, 41];
                        viewport.ElementScroll.scrollTop = viewportBeforeScrollPosition;
                        return [4, this.ResolveControlFlowForViewportScroll(viewport)];
                    case 40:
                        _f.sent();
                        _f.label = 41;
                    case 41: return [2];
                }
            });
        });
    };
    DrapoControlFlow.prototype.ResolveControlFlowForIterationRender = function (sector, context, element, renderContext, isStart, canResolveComponents) {
        return __awaiter(this, void 0, void 0, function () {
            var children, hasChildren, i, child, forText, ifText, hasIfText, applyConditional, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!context.CheckMustacheNodes) return [3, 2];
                        return [4, this.Application.Barber.ResolveControlFlowMustacheNodes(context, element, sector)];
                    case 1:
                        _b.sent();
                        _b.label = 2;
                    case 2:
                        children = [].slice.call(element.children);
                        hasChildren = children.length > 0;
                        if (!hasChildren) return [3, 32];
                        i = 0;
                        _b.label = 3;
                    case 3:
                        if (!(i < children.length)) return [3, 32];
                        child = children[i];
                        forText = child.getAttribute('d-for');
                        if (!(forText != null)) return [3, 9];
                        ifText = child.getAttribute('d-if');
                        hasIfText = (ifText != null);
                        applyConditional = ((hasIfText) && (this.CanApplyConditional(context, forText, ifText)));
                        _a = (!applyConditional);
                        if (_a) return [3, 5];
                        return [4, this.Application.Solver.ResolveConditional(ifText, null, sector, context, renderContext)];
                    case 4:
                        _a = (_b.sent());
                        _b.label = 5;
                    case 5:
                        if (!_a) return [3, 7];
                        context.Down();
                        return [4, this.ResolveControlFlowForInternal(sector, context, renderContext, child, false, true, DrapoStorageLinkType.Render)];
                    case 6:
                        _b.sent();
                        context.Up();
                        _b.label = 7;
                    case 7: return [4, this.Application.Document.RemoveElement(child)];
                    case 8:
                        _b.sent();
                        children.splice(i, 1);
                        i--;
                        return [3, 31];
                    case 9: return [4, this.IsControlFlowForIterationVisible(sector, context, child, renderContext)];
                    case 10:
                        if (!!(_b.sent())) return [3, 12];
                        return [4, this.Application.Document.RemoveElement(child)];
                    case 11:
                        _b.sent();
                        children.splice(i, 1);
                        i--;
                        return [3, 31];
                    case 12:
                        if (!context.CheckMustacheAttributes) return [3, 14];
                        return [4, this.Application.Barber.ResolveControlFlowMustacheAttributes(context, child, sector)];
                    case 13:
                        _b.sent();
                        _b.label = 14;
                    case 14: return [4, this.ResolveControlFlowForIterationRender(sector, context, child, renderContext, false, canResolveComponents)];
                    case 15:
                        _b.sent();
                        if (!context.CheckID) return [3, 17];
                        return [4, this.Application.AttributeHandler.ResolveIDContext(context, child, sector, true)];
                    case 16:
                        _b.sent();
                        _b.label = 17;
                    case 17:
                        if (!context.CheckAttribute) return [3, 19];
                        return [4, this.Application.AttributeHandler.ResolveAttrContext(context, child, true)];
                    case 18:
                        _b.sent();
                        _b.label = 19;
                    case 19:
                        if (!context.CheckModel) return [3, 21];
                        return [4, this.Application.ModelHandler.ResolveModel(context, renderContext, child, sector, true, true)];
                    case 20:
                        _b.sent();
                        _b.label = 21;
                    case 21:
                        if (!context.CheckClass) return [3, 23];
                        return [4, this.Application.ClassHandler.ResolveClassContext(context, renderContext, child, sector, true, DrapoStorageLinkType.Render)];
                    case 22:
                        _b.sent();
                        _b.label = 23;
                    case 23:
                        if (!context.CheckEvent) return [3, 25];
                        return [4, this.Application.EventHandler.AttachContext(context, child, sector, renderContext)];
                    case 24:
                        _b.sent();
                        _b.label = 25;
                    case 25:
                        if (!context.CheckBehavior) return [3, 27];
                        return [4, this.Application.BehaviorHandler.ResolveBehaviorContext(context, child, true)];
                    case 26:
                        _b.sent();
                        _b.label = 27;
                    case 27:
                        if (!context.CheckComponent) return [3, 29];
                        return [4, this.Application.ComponentHandler.ResolveComponentContext(sector, context, child, renderContext, canResolveComponents)];
                    case 28:
                        _b.sent();
                        _b.label = 29;
                    case 29:
                        if (!context.CheckValidation) return [3, 31];
                        return [4, this.Application.Validator.RegisterValidation(child, sector, context)];
                    case 30:
                        _b.sent();
                        _b.label = 31;
                    case 31:
                        i++;
                        return [3, 3];
                    case 32:
                        if (!((isStart) || (!hasChildren))) return [3, 50];
                        if (!context.CheckID) return [3, 34];
                        return [4, this.Application.AttributeHandler.ResolveIDContext(context, element, sector, true)];
                    case 33:
                        _b.sent();
                        _b.label = 34;
                    case 34:
                        if (!context.CheckAttribute) return [3, 36];
                        return [4, this.Application.AttributeHandler.ResolveAttrContext(context, element, true)];
                    case 35:
                        _b.sent();
                        _b.label = 36;
                    case 36:
                        if (!context.CheckModel) return [3, 38];
                        return [4, this.Application.ModelHandler.ResolveModel(context, renderContext, element, sector, true, true)];
                    case 37:
                        _b.sent();
                        _b.label = 38;
                    case 38:
                        if (!context.CheckClass) return [3, 40];
                        return [4, this.Application.ClassHandler.ResolveClassContext(context, renderContext, element, sector, true, DrapoStorageLinkType.RenderClass)];
                    case 39:
                        _b.sent();
                        _b.label = 40;
                    case 40:
                        if (!context.CheckEvent) return [3, 42];
                        return [4, this.Application.EventHandler.AttachContext(context, element, sector, renderContext)];
                    case 41:
                        _b.sent();
                        _b.label = 42;
                    case 42:
                        if (!context.CheckBehavior) return [3, 44];
                        return [4, this.Application.BehaviorHandler.ResolveBehaviorContext(context, element, true)];
                    case 43:
                        _b.sent();
                        _b.label = 44;
                    case 44:
                        if (!context.CheckComponent) return [3, 46];
                        return [4, this.Application.ComponentHandler.ResolveComponentContext(sector, context, element, renderContext, canResolveComponents)];
                    case 45:
                        _b.sent();
                        _b.label = 46;
                    case 46:
                        if (!context.CheckValidation) return [3, 48];
                        return [4, this.Application.Validator.RegisterValidation(element, sector, context)];
                    case 47:
                        _b.sent();
                        _b.label = 48;
                    case 48:
                        if (!((!hasChildren) && (context.CheckMustacheAttributes))) return [3, 50];
                        return [4, this.Application.Barber.ResolveControlFlowMustacheAttributes(context, element, sector)];
                    case 49:
                        _b.sent();
                        _b.label = 50;
                    case 50: return [2];
                }
            });
        });
    };
    DrapoControlFlow.prototype.CanApplyConditional = function (context, forText, ifText) {
        var parsedFor = this.Application.Parser.ParseFor(forText);
        if (parsedFor == null)
            return (true);
        var key = parsedFor[0];
        if (context.IsKey(key))
            return (true);
        var index = ifText.indexOf('{{' + key);
        return (index < 0);
    };
    DrapoControlFlow.prototype.ResolveControlFlowForIterationRenderClass = function (context, renderContext, element, sector) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.Application.ClassHandler.ResolveClassContext(context, renderContext, element, sector, true, DrapoStorageLinkType.RenderClass)];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    DrapoControlFlow.prototype.IsControlFlowForIterationVisible = function (sector, context, el, renderContext) {
        return __awaiter(this, void 0, void 0, function () {
            var ifText, value;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ifText = el.getAttribute('d-if');
                        if (ifText == null)
                            return [2, (true)];
                        return [4, this.Application.FunctionHandler.HasFunctionMustacheContext(ifText, sector, renderContext)];
                    case 1:
                        if (!(_a.sent()))
                            return [2, (true)];
                        return [4, this.Application.Solver.ResolveConditional(ifText, null, sector, context, renderContext)];
                    case 2:
                        value = _a.sent();
                        if (value)
                            el.removeAttribute('d-if');
                        return [2, (value)];
                }
            });
        });
    };
    DrapoControlFlow.prototype.RemoveList = function (els) {
        if (els === null)
            return;
        for (var i = els.length - 1; i >= 0; i--)
            this.RemoveListIndex(els, i);
    };
    DrapoControlFlow.prototype.RemoveListIndex = function (els, index) {
        var node = els[index];
        if (node.parentElement != null)
            node.parentElement.removeChild(node);
        els.splice(index, 1);
    };
    DrapoControlFlow.prototype.IsControlFlowDataKeyIterator = function (dataKey) {
        return (this.Application.Parser.IsIterator(dataKey));
    };
    DrapoControlFlow.prototype.GetControlFlowDataKeyIterators = function (context, renderContext, elementForTemplate, expression) {
        return __awaiter(this, void 0, void 0, function () {
            var sector, mustaches, i, mustache, mustacheParts, dataKey, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sector = this.Application.Document.GetSector(elementForTemplate);
                        mustaches = this.Application.Parser.ParseMustaches(expression);
                        for (i = 0; i < mustaches.length; i++) {
                            mustache = mustaches[i];
                            mustacheParts = this.Application.Parser.ParseMustache(mustache);
                            dataKey = this.Application.Solver.ResolveDataKey(mustacheParts);
                            if (!this.Application.Storage.IsDataKey(dataKey, sector, renderContext))
                                continue;
                            this.Application.Observer.UnsubscribeFor(dataKey, elementForTemplate);
                            this.Application.Observer.SubscribeFor(elementForTemplate, dataKey);
                        }
                        return [4, this.Application.Barber.ResolveControlFlowMustacheString(context, renderContext, null, expression, elementForTemplate, sector, true, null, true, elementForTemplate)];
                    case 1:
                        data = _a.sent();
                        return [2, (this.Application.Parser.ParseIterator(data))];
                }
            });
        });
    };
    DrapoControlFlow.prototype.GetElementHashTemplate = function (el) {
        var content = el.outerHTML;
        var mustaches = this.Application.Parser.ParseMustaches(content);
        var template = '';
        for (var i = 0; i < mustaches.length; i++) {
            if (i > 0)
                template = template + '_';
            template = template + mustaches[i];
        }
        return (template);
    };
    DrapoControlFlow.prototype.GetElementHashValue = function (sector, context, el, hashTemplate) {
        return __awaiter(this, void 0, void 0, function () {
            var hashValue;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.Application.ModelHandler.ResolveValueExpression(context, el, sector, hashTemplate, false)];
                    case 1:
                        hashValue = _a.sent();
                        return [2, (hashValue)];
                }
            });
        });
    };
    DrapoControlFlow.prototype.GetTemplateVariables = function (sector, context, dataKey, key, template) {
        return __awaiter(this, void 0, void 0, function () {
            var elsFor, dataKeys, elIfs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        elsFor = this.Application.Searcher.FindAllByAttributeFromParent('d-for', template);
                        if (elsFor.length < 1)
                            return [2, (null)];
                        return [4, this.GetControlFlowExpressionsDataKey(sector, elsFor)];
                    case 1:
                        dataKeys = _a.sent();
                        if ((dataKeys == null) || (dataKeys.length < 1))
                            return [2, (null)];
                        elIfs = this.Application.Searcher.FindAllByAttributeFromParent('d-if', template);
                        if (elIfs.length < 1)
                            return [2, ([])];
                        return [2, (this.GetControlFlowConditionsDataKey(sector, dataKey, key, elIfs))];
                }
            });
        });
    };
    DrapoControlFlow.prototype.GetControlFlowExpressionsDataKey = function (sector, elsFor) {
        var dataKeys = [];
        for (var i = 0; i < elsFor.length; i++) {
            var elForCurrent = elsFor[i];
            var forText = elForCurrent.getAttribute('d-for');
            var parsedFor = this.Application.Parser.ParseFor(forText);
            if (parsedFor == null)
                continue;
            var dataKey = parsedFor[2];
            var dataKeyIteratorParts = this.Application.Parser.ParseForIterable(dataKey);
            if (dataKeyIteratorParts.length !== 1)
                return (null);
            var isDataKey = this.Application.Storage.IsDataKey(dataKey, sector);
            if (!isDataKey)
                return (null);
            dataKeys.push(dataKey);
        }
        return (dataKeys);
    };
    DrapoControlFlow.prototype.GetControlFlowConditionsDataKey = function (sector, dataKey, key, elIfs) {
        var dataPaths = [];
        for (var i = 0; i < elIfs.length; i++) {
            var elIfCurrent = elIfs[i];
            var ifText = elIfCurrent.getAttribute('d-if');
            var mustaches = this.Application.Parser.ParseMustaches(ifText);
            for (var j = 0; j < mustaches.length; j++) {
                var mustache = mustaches[j];
                var mustacheParts = this.Application.Parser.ParseMustache(mustache);
                if (mustacheParts[0] !== key)
                    continue;
                dataPaths.push(mustacheParts);
            }
        }
        return (dataPaths);
    };
    DrapoControlFlow.prototype.CreateTemplateKey = function (sector, context, dataKey, templateVariables, data, key, index) {
        return __awaiter(this, void 0, void 0, function () {
            var templateKey, i, mustacheParts, mustacheResolved;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (templateVariables.length === 0)
                            return [2, ('_')];
                        templateKey = '';
                        context.Create(data, null, null, dataKey, key, null, index);
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < templateVariables.length)) return [3, 4];
                        mustacheParts = templateVariables[i];
                        return [4, this.Application.Solver.ResolveDataPath(context, null, null, sector, mustacheParts)];
                    case 2:
                        mustacheResolved = _a.sent();
                        templateKey = templateKey + '_' + mustacheResolved;
                        _a.label = 3;
                    case 3:
                        i++;
                        return [3, 1];
                    case 4:
                        context.Pop();
                        return [2, (templateKey)];
                }
            });
        });
    };
    DrapoControlFlow.prototype.CreateTemplate = function (sector, context, renderContext, el, dataKey, key, index, data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        context.CanUpdateTemplate = true;
                        context.Create(data, el, null, dataKey, key, null, index);
                        return [4, this.ResolveControlFlowForIterationRender(sector, context, el, renderContext, true, false)];
                    case 1:
                        _a.sent();
                        context.Pop();
                        context.CanUpdateTemplate = false;
                        return [2, (el)];
                }
            });
        });
    };
    DrapoControlFlow.prototype.GetTemplateFromTemplateKey = function (context, templateKey) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, (context.GetTemplate(templateKey))];
            });
        });
    };
    DrapoControlFlow.prototype.AddTemplate = function (context, templateKey, template) {
        context.AddTemplate(templateKey, template);
    };
    DrapoControlFlow.prototype.GetIteratorRange = function (iterator) {
        var rangeString = this.GetIteratorRangeString(iterator);
        if (rangeString === null)
            return (null);
        var range = this.GetIteratorRangeInternal(rangeString);
        if (!this.IsValidRange(range)) {
            this.Application.ExceptionHandler.HandleError('DrapoFunctionHandler - GetIteratorRange - Invalid Iterator Range - {0}', iterator);
        }
        return (range);
    };
    DrapoControlFlow.prototype.GetIteratorRangeInternal = function (rangeString) {
        var index = rangeString.indexOf('..');
        if (index === -1)
            return (new DrapoRange(rangeString, rangeString));
        if (index === 0)
            return (new DrapoRange(null, rangeString.substr(2)));
        if (index === rangeString.length - 2)
            return (new DrapoRange(rangeString.substr(0, rangeString.length - 2)));
        return (new DrapoRange(rangeString.substr(0, index), rangeString.substr(index + 2)));
    };
    DrapoControlFlow.prototype.GetIteratorRangeString = function (iterator) {
        if (iterator[iterator.length - 1] !== ']')
            return (null);
        var index = iterator.lastIndexOf('[');
        if (index < 1)
            return (null);
        if (iterator[0] === '{')
            return (null);
        return (iterator.substring(index + 1, iterator.length - 1));
    };
    DrapoControlFlow.prototype.CleanIteratorRange = function (iterator) {
        var index = iterator.lastIndexOf('[');
        if (index === -1)
            return (iterator);
        return (iterator.substring(0, index));
    };
    DrapoControlFlow.prototype.IsValidRange = function (range) {
        if (!this.IsValidRangeIndex(range.Start))
            return (false);
        if (!this.IsValidRangeIndex(range.End))
            return (false);
        return (true);
    };
    DrapoControlFlow.prototype.IsValidRangeIndex = function (rangeIndex) {
        if (rangeIndex === null)
            return (true);
        var isHat = rangeIndex[0] === '^';
        if (isHat)
            return (this.Application.Parser.IsNumber(rangeIndex.substr(1)));
        return (this.Application.Parser.IsNumber(rangeIndex));
    };
    DrapoControlFlow.prototype.ApplyRange = function (data, range) {
        var start = range.Start == null ? 0 : this.GetRangeIndex(data, range.Start);
        var end = range.End === null ? data.length : this.GetRangeIndex(data, range.End);
        var isCrescent = end > start;
        var dataRange = [];
        for (var i = start; ((isCrescent) && (i < end)) || ((!isCrescent) && (i >= end)); isCrescent ? i++ : i--) {
            if (i < 0)
                continue;
            if (i >= data.length)
                continue;
            dataRange.push(data[i]);
        }
        return (dataRange);
    };
    DrapoControlFlow.prototype.GetRangeIndex = function (data, rangeIndex) {
        var isHat = rangeIndex[0] === '^';
        var number = this.Application.Parser.ParseNumber(isHat ? rangeIndex.substr(1) : rangeIndex);
        var numberHat = isHat ? data.length - number : number;
        if (numberHat < 0)
            return (0);
        if (numberHat > data.length)
            return (data.length);
        return (numberHat);
    };
    DrapoControlFlow.prototype.HasContextIterators = function (context, dataKeyIteratorParts) {
        if (dataKeyIteratorParts.length != 1)
            return (false);
        var key = dataKeyIteratorParts[0];
        var item = this.GetContextItemByKey(context, key);
        return (item != null);
    };
    DrapoControlFlow.prototype.GetContextIteratorsData = function (context, dataKeyIteratorParts) {
        if (dataKeyIteratorParts.length < 1)
            return ([]);
        var key = dataKeyIteratorParts[0];
        var item = this.GetContextItemByKey(context, key);
        var datas = this.Application.Solver.ResolveDataObjectPathObject(item.Data, dataKeyIteratorParts);
        return (datas);
    };
    DrapoControlFlow.prototype.GetContextItemByKey = function (context, key) {
        for (var i = 0; i < context.ItemsCurrentStack.length; i++) {
            var item = context.ItemsCurrentStack[i];
            if (item.Key == key)
                return (item);
        }
        return (null);
    };
    DrapoControlFlow.prototype.ExecuteDataItem = function (sector, context, expression, iterator, forText, ifText, all, datas, dataKey, key, executionContext) {
        if (executionContext === void 0) { executionContext = null; }
        return __awaiter(this, void 0, void 0, function () {
            var j, data, item, execute, conditionalText, conditional, parsedFor, keyChildren, dataKeyIteratorRange, range, dataKeyIterator, dataKeyChildren, dataKeyIteratorParts, datasChildren, childExecuted;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        j = 0;
                        _a.label = 1;
                    case 1:
                        if (!(j < datas.length)) return [3, 9];
                        data = datas[j];
                        item = context.Create(data, null, null, dataKey, key, iterator, j);
                        execute = true;
                        if (!(ifText != null)) return [3, 4];
                        return [4, this.Application.Barber.ResolveControlFlowMustacheStringFunction(sector, context, null, executionContext, ifText, null)];
                    case 2:
                        conditionalText = _a.sent();
                        return [4, this.Application.Solver.ResolveConditional(conditionalText)];
                    case 3:
                        conditional = _a.sent();
                        if (!conditional) {
                            context.Pop();
                            execute = false;
                        }
                        _a.label = 4;
                    case 4:
                        if (!execute) return [3, 6];
                        return [4, this.Application.FunctionHandler.ResolveFunction(sector, context.Item, null, null, expression, executionContext)];
                    case 5:
                        _a.sent();
                        if (!all)
                            return [2, (true)];
                        _a.label = 6;
                    case 6:
                        if (forText == null)
                            return [3, 8];
                        parsedFor = this.Application.Parser.ParseFor(forText);
                        if (parsedFor == null)
                            return [3, 8];
                        keyChildren = parsedFor[0];
                        dataKeyIteratorRange = parsedFor[2];
                        range = this.GetIteratorRange(dataKeyIteratorRange);
                        dataKeyIterator = range == null ? dataKeyIteratorRange : this.CleanIteratorRange(dataKeyIteratorRange);
                        dataKeyChildren = dataKeyIterator;
                        dataKeyIteratorParts = this.Application.Parser.ParseForIterable(dataKeyIterator);
                        datasChildren = this.Application.Solver.ResolveDataObjectPathObject(data, dataKeyIteratorParts);
                        if (range !== null)
                            datasChildren = this.Application.ControlFlow.ApplyRange(datasChildren, range);
                        if (datasChildren.length === 0)
                            return [3, 8];
                        return [4, this.ExecuteDataItem(sector, context, expression, dataKeyIterator, forText, ifText, all, datasChildren, dataKeyChildren, keyChildren, executionContext)];
                    case 7:
                        childExecuted = _a.sent();
                        if ((childExecuted) && (!all))
                            return [2, (true)];
                        _a.label = 8;
                    case 8:
                        j++;
                        return [3, 1];
                    case 9: return [2, (false)];
                }
            });
        });
    };
    DrapoControlFlow.prototype.ResolveControlFlowForViewportScroll = function (viewport) {
        return __awaiter(this, void 0, void 0, function () {
            var view, dForRender, dForRenders, isHash, hashTemplate, rowsBeforeRemove, rowsBeforeInsertStart, rowsBeforeInsertEnd, rowsAfterRemove, rowsAfterInsertStart, rowsAfterInsertEnd, rowRemove, elBallonAfter, rowNext, rowRemove, i, rowNext, fragmentBefore, rowRemove, i, rowPrevious, fragmentAfter, elementAfterPrevious;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        view = this.Application.ViewportHandler.GetView(viewport);
                        if (view === null)
                            return [2];
                        dForRender = viewport.Element.getAttribute('d-for-render');
                        dForRenders = (dForRender == null) || (dForRender == '') ? [] : this.Application.Parser.ParseBlock(dForRender, ',');
                        isHash = this.Application.Solver.Contains(dForRenders, 'hash');
                        hashTemplate = isHash ? this.GetElementHashTemplate(viewport.Element) : null;
                        rowsBeforeRemove = view[0];
                        rowsBeforeInsertStart = view[1];
                        rowsBeforeInsertEnd = view[2];
                        rowsAfterRemove = view[3];
                        rowsAfterInsertStart = view[4];
                        rowsAfterInsertEnd = view[5];
                        if (rowsBeforeRemove !== null) {
                            if (rowsBeforeRemove === -1) {
                                rowRemove = viewport.ElementBallonBefore.nextElementSibling;
                                elBallonAfter = viewport.ElementBallonAfter;
                                while ((rowRemove != null) && (rowRemove !== elBallonAfter)) {
                                    rowNext = rowRemove.nextElementSibling;
                                    rowRemove.remove();
                                    rowRemove = rowNext;
                                }
                            }
                            else {
                                rowRemove = viewport.ElementBallonBefore.nextElementSibling;
                                if (rowRemove != null) {
                                    for (i = 0; i < rowsBeforeRemove; i++) {
                                        rowNext = rowRemove.nextElementSibling;
                                        rowRemove.remove();
                                        rowRemove = rowNext;
                                    }
                                }
                            }
                        }
                        return [4, this.CreateControlFlowForViewportFragment(viewport, rowsBeforeInsertStart, rowsBeforeInsertEnd, hashTemplate)];
                    case 1:
                        fragmentBefore = _a.sent();
                        if (fragmentBefore !== null) {
                            viewport.ElementBallonBefore.after(fragmentBefore);
                        }
                        if (rowsAfterRemove !== null) {
                            rowRemove = viewport.ElementBallonAfter.previousElementSibling;
                            for (i = 0; i < rowsAfterRemove; i++) {
                                rowPrevious = rowRemove.previousElementSibling;
                                rowRemove.remove();
                                rowRemove = rowPrevious;
                            }
                        }
                        return [4, this.CreateControlFlowForViewportFragment(viewport, rowsAfterInsertStart, rowsAfterInsertEnd, hashTemplate)];
                    case 2:
                        fragmentAfter = _a.sent();
                        if (fragmentAfter !== null) {
                            elementAfterPrevious = viewport.ElementBallonAfter.previousElementSibling;
                            elementAfterPrevious.after(fragmentAfter);
                        }
                        this.Application.ViewportHandler.UpdateElementsBallon(viewport);
                        return [4, this.Application.ComponentHandler.UnloadComponentInstancesDetached(viewport.Sector)];
                    case 3:
                        _a.sent();
                        return [4, this.Application.Document.CollectSector(viewport.Sector)];
                    case 4:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    DrapoControlFlow.prototype.CreateControlFlowForViewportFragment = function (viewport, start, end, hashTemplate) {
        return __awaiter(this, void 0, void 0, function () {
            var fragment, context, content, renderContext, i, data, template, item, hashValueCurrent, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if ((start === null) || (end == start))
                            return [2, (null)];
                        fragment = document.createDocumentFragment();
                        context = new DrapoContext();
                        context.Sector = viewport.Sector;
                        context.Index = start - 1;
                        context.IndexRelative = context.Index;
                        content = viewport.ElementTemplate.outerHTML;
                        this.InitializeContext(context, content);
                        renderContext = new DrapoRenderContext();
                        i = start;
                        _b.label = 1;
                    case 1:
                        if (!(i < end)) return [3, 7];
                        data = viewport.Data[i];
                        template = this.Application.Document.Clone(viewport.ElementTemplate);
                        item = context.Create(data, template, template, viewport.DataKey, viewport.Key, viewport.DataKeyIteratorRange, i, null);
                        return [4, this.ResolveControlFlowForIterationRender(viewport.Sector, context, template, renderContext, true, true)];
                    case 2:
                        _b.sent();
                        if (!(hashTemplate === null)) return [3, 3];
                        _a = null;
                        return [3, 5];
                    case 3: return [4, this.GetElementHashValue(viewport.Sector, context, template, hashTemplate)];
                    case 4:
                        _a = _b.sent();
                        _b.label = 5;
                    case 5:
                        hashValueCurrent = _a;
                        if (hashValueCurrent !== null)
                            template.setAttribute('d-hash', hashValueCurrent);
                        fragment.appendChild(template);
                        _b.label = 6;
                    case 6:
                        i++;
                        return [3, 1];
                    case 7: return [2, (fragment)];
                }
            });
        });
    };
    return DrapoControlFlow;
}());

/// <reference path="../typings/index.d.ts" />

class DrapoControlFlow {
    //Field
    private _application: DrapoApplication;

    //Properties
    get Application(): DrapoApplication {
        return (this._application);
    }

    //Constructors
    constructor(application: DrapoApplication) {
        this._application = application;
    }

    public async ResolveControlFlowDocument(): Promise<void> {
        const els: HTMLElement[] = this.Application.Searcher.FindByAttribute('d-for');
        await this.ResolveControlFlowForArray(els);
    }

    public async ResolveControlFlowSector(el: HTMLElement, canResolveComponents: boolean = true): Promise<void> {
        if (el == null)
            return;
        const els: HTMLElement[] = this.Application.Searcher.FindByAttributeFromParent('d-for', el);
        await this.ResolveControlFlowForArray(els, false, true, DrapoStorageLinkType.Render, canResolveComponents);
    }

    private ResolveControlFlowForParent(forElement: HTMLElement): HTMLElement {
        let forElementParent: HTMLElement = null;
        while ((forElementParent = forElement.parentElement) != null) {
            if (forElementParent.getAttribute('d-for') != null)
                return (forElementParent);
            forElement = forElementParent;
        }
        return (null);
    }

    private ResolveControlFlowForRoot(forElement: HTMLElement): HTMLElement {
        let forElementParent: HTMLElement = null;
        while ((forElementParent = this.ResolveControlFlowForParent(forElement)) != null) {
            forElement = forElementParent;
        }
        return (forElement);
    }

    public async ResolveControlFlowForElement(forElement: HTMLElement, isIncremental: boolean = false, canUseDifference: boolean = true, type: DrapoStorageLinkType = DrapoStorageLinkType.Render, canResolveComponents: boolean = true): Promise<void> {
        const forElements: HTMLElement[] = [];
        forElements.push(forElement);
        return (await this.ResolveControlFlowForArray(forElements, isIncremental, canUseDifference, type, canResolveComponents));
    }

    public async ResolveControlFlowForArray(forElements: HTMLElement[], isIncremental: boolean = false, canUseDifference: boolean = true, type: DrapoStorageLinkType = DrapoStorageLinkType.Render, canResolveComponents: boolean = true): Promise<void> {
        const forElementsInserted: HTMLElement[] = [];
        for (let i = 0; i < forElements.length; i++) {
            const forElement: HTMLElement = forElements[i];
            const forElementRoot: HTMLElement = this.ResolveControlFlowForRoot(forElement);
            if (!this.Application.Document.IsElementInserted(forElementsInserted, forElementRoot))
                continue;
            if (this.Application.Document.IsElementPreprocessed(forElement))
                continue;
            if (this.Application.Document.IsElementInsideComponent(forElement))
                continue;
            const context: DrapoContext = new DrapoContext();
            const sector: string = this.Application.Document.GetSector(forElementRoot);
            context.Sector = sector;
            if (!this.Application.Document.IsSectorReady(sector))
                continue;
            const renderContext: DrapoRenderContext = new DrapoRenderContext();
            await this.ResolveControlFlowForInternal(sector, context, renderContext, forElementRoot, isIncremental, canUseDifference, type, canResolveComponents);
        }
    }

    public InitializeContext(context: DrapoContext, content: string) {
        //Mustache Nodes
        if (this.Application.Barber.HasContentMustacheNodesContext(content))
            context.CheckMustacheNodes = true;
        //Model
        if (this.Application.ModelHandler.HasContentModelContext(content))
            context.CheckModel = true;
        //Mustache Attribute
        if (this.Application.Barber.HasContentMustacheAttributeContext(content))
            context.CheckMustacheAttributes = true;
        //ID
        if (this.Application.AttributeHandler.HasContentIDContext(content))
            context.CheckID = true;
        //Attribute
        if (this.Application.AttributeHandler.HasContentAttributeContext(content))
            context.CheckAttribute = true;
        //Class
        if (this.Application.ClassHandler.HasContentClassContext(content))
            context.CheckClass = true;
        //Events
        if (this.Application.EventHandler.HasContentEventContext(content))
            context.CheckEvent = true;
        //Behavior
        if (this.Application.BehaviorHandler.HasContentBehaviorContext(content))
        context.CheckBehavior = true;
        //Component
        if (this.Application.ComponentHandler.HasContentComponent(content))
        context.CheckComponent = true;
        //Validation
        if (this.Application.Validator.HasContentValidation(content))
        context.CheckValidation = true;
        //Checkpoint
        context.Checkpoint();
    }

    public IsElementControlFlowTemplate(el: HTMLElement): boolean {
        const forText: string = el.getAttribute('d-for');
        if (forText === null)
            return (false);
        return (el.style.display === 'none');
    }

    private async ResolveControlFlowForInternal(sector: string, context: DrapoContext, renderContext: DrapoRenderContext, elFor: HTMLElement, isIncremental: boolean, canUseDifference: boolean = true, type: DrapoStorageLinkType = DrapoStorageLinkType.Render, canResolveComponents: boolean = true): Promise<boolean> {
        let forText: string = elFor.getAttribute('d-for');
        let ifText: string = null;
        let forIfText: string = null;
        let wasWrapped: boolean = false;
        let viewportBeforeScrollPosition: number = 0;
        if (forText == null) {
            //Wrapped d-for
            const wrapper: HTMLElement = this.Application.Document.GetWrapper(elFor);
            forText = wrapper != null ? wrapper.getAttribute('d-for') : null;
            if (forText == null)
                return (false);
            wasWrapped = true;
            ifText = wrapper.getAttribute('d-if');
            forIfText = wrapper.getAttribute('d-for-if');
        }
        const parsedFor: string[] = this.Application.Parser.ParseFor(forText);
        if (parsedFor == null)
            return (false);
        //data item
        const key: string = parsedFor[0];
        //Iterable
        const dataKeyIteratorRange = parsedFor[2];
        //Base Element will be the template. Hide him and remove all elements created after him
        const forElementRecursive: HTMLElement = isIncremental ? null : context.GetElementTemplate(key);
        const elementForTemplate: HTMLElement = forElementRecursive != null ? forElementRecursive : elFor;
        //If
        if (ifText == null)
            ifText = elementForTemplate.getAttribute('d-if');
        const hasIfText: boolean = (ifText != null);
        if (forIfText == null)
            forIfText = elementForTemplate.getAttribute('d-for-if');
        const hasForIfText: boolean = (forIfText != null);
        let conditionalForIfResult: boolean = true;
        const isContextRoot: boolean = context.IsEmpty;
        //Anchor
        const elAnchor: HTMLElement = (isContextRoot) ? this.Application.Document.Hide(elFor) : elFor;
        const content: string = isContextRoot ? elFor.outerHTML : null;
        if (isContextRoot)
            this.InitializeContext(context, content);
        //For render
        const dForRender: string = elementForTemplate.getAttribute('d-for-render');
        const dForRenders: string[] = ((dForRender == null) || (dForRender == '')) ? [] : this.Application.Parser.ParseBlock(dForRender, ',');
        //Html
        const isHTML: boolean = this.Application.Solver.Contains(dForRenders, 'html');
        //Viewport
        const isViewport: boolean = this.Application.Solver.Contains(dForRenders, 'viewport');
        let hasViewPortBefore: boolean = (isViewport) && (this.Application.ViewportHandler.HasElementViewport(elementForTemplate));
        const hasViewPortbeforeRecycle: boolean = ((hasViewPortBefore) && ((!canUseDifference) || (isViewport)));
        if (hasViewPortbeforeRecycle) {
            //Reset Viewport
            hasViewPortBefore = false;
            const viewportBefore: DrapoViewport = this.Application.ViewportHandler.GetElementViewport(elementForTemplate);
            //Backup scrollPosition
            viewportBeforeScrollPosition = viewportBefore.ElementScroll.scrollTop;
            this.Application.ViewportHandler.DestroyViewportControlFlow(viewportBefore);
            const itemsViewport: HTMLElement[] = this.Application.Document.GetNextAll(elAnchor);
            this.RemoveList(itemsViewport);
        }
        //Difference
        let isDifference: boolean = ((canUseDifference) && ((!isViewport) || (hasViewPortBefore)) && (!isIncremental) && (!hasIfText));
        const isLastChild: boolean = this.Application.Document.IsLastChild(elAnchor);
        if ((isDifference) && (isContextRoot) && (isLastChild))
            isDifference = false;
        const isContextRootFull: boolean = ((isContextRoot) && (!isDifference));
        const isFirstChild: boolean = this.Application.Document.IsFirstChild(elAnchor);
        const isContextRootFullExclusive: boolean = ((isContextRootFull) && (isFirstChild) && (!wasWrapped));
        const elForParent: HTMLElement = elAnchor.parentElement;
        if (hasForIfText)
            conditionalForIfResult = await this.Application.Solver.ResolveConditional(forIfText, null, sector, context, renderContext);
        const items: HTMLElement[] = isContextRootFullExclusive ? null : this.Application.Document.GetNextAll(elAnchor);
        let dataItem: DrapoStorageItem = null;
        let datas: any[] = null;
        const range: DrapoRange = this.GetIteratorRange(dataKeyIteratorRange);
        const dataKeyIterator: string = range == null ? dataKeyIteratorRange : this.CleanIteratorRange(dataKeyIteratorRange);
        let dataKey: string = dataKeyIterator;
        if (this.IsControlFlowDataKeyIterator(dataKeyIterator)) {
            //Iterators
            datas = await this.GetControlFlowDataKeyIterators(context, renderContext, elementForTemplate, dataKeyIterator);
        } else {
            //Notify
            const dataKeyIteratorParts: string[] = this.Application.Parser.ParseForIterable(dataKeyIterator);
            dataKey = dataKeyIteratorParts[0];
            const isDataKey: boolean = this.Application.Storage.IsDataKey(dataKey, sector);
            if (isDataKey) {
                const dataKeyRoot: string = context.GetDataKeyRoot();
                if (dataKeyRoot === null) {
                    this.Application.Observer.UnsubscribeFor(dataKey, elementForTemplate);
                    this.Application.Observer.SubscribeFor(elementForTemplate, dataKey);
                } else if (dataKeyRoot !== dataKey) {
                    this.Application.Observer.SubscribeLink(dataKey, dataKeyRoot);
                }
                if (hasForIfText)
                    this.Application.Observer.SubscribeLinkMustache(forIfText, dataKey);
            }
            //Storage
            if (conditionalForIfResult) {
                dataItem = await this.Application.Storage.Retrieve(dataKey, sector, context, dataKeyIteratorParts);
                if (dataItem == null)
                    return (false);
                if ((isDataKey) && (dataKeyIteratorParts.length > 1)) {
                    datas = this.Application.Solver.ResolveDataObjectPathObject(dataItem.Data, dataKeyIteratorParts);
                } else {
                    datas = dataItem.Data;
                }
            } else {
                datas = [];
            }
        }
        if (datas == null)
            return (false);
        if (!datas.length)
            datas = this.Application.Solver.TransformObjectIntoArray(datas);
        //Apply Range
        if (range !== null)
            datas = this.ApplyRange(datas, range);
        let lastInserted: HTMLElement = elAnchor;
        let start: number = 0;
        if (isIncremental) {
            const nextElements: HTMLElement[] = this.Application.Document.GetNextAll(elAnchor);
            start = this.Application.Document.GetIndex(elAnchor) + nextElements.length;
            if (nextElements.length > 0)
                lastInserted = nextElements[nextElements.length - 1];
        }
        if ((!isDifference) && (type == DrapoStorageLinkType.RenderClass))
            type = DrapoStorageLinkType.Render;
        //Removing Data
        if ((!isIncremental) && (!isDifference) && (!isContextRootFullExclusive) && (!isViewport))
            this.RemoveList(items);
        if (isDifference) {
            const dataLength: number = datas.length;
            for (let i: number = items.length - 1; i >= dataLength; i--) {
                this.RemoveListIndex(items, i);
            }
        }
        if ((datas.length !== null) && (datas.length === 0)) {
            if (isIncremental)
                return (false);
            if (isContextRootFullExclusive) {
                this.Application.Observer.UnsubscribeFor(dataKey, elementForTemplate);
                if (!isLastChild)
                    this.Application.Document.SetHTML(elForParent,content);
                const template: HTMLElement = elForParent.children[0] as HTMLElement;
                this.Application.Observer.SubscribeFor(template, dataKey);
            }
            return (false);
        }
        this.Application.Observer.IsEnabledNotifyIncremental = false;
        let forReferenceTemplate: HTMLElement = this.Application.Document.Clone(elementForTemplate);
        if ((isContextRoot) || (context.IsInsideRecursion))
            forReferenceTemplate = this.Application.Document.Show(forReferenceTemplate);
        forReferenceTemplate.removeAttribute('d-for');
        if (ifText != null)
            forReferenceTemplate.removeAttribute('d-if');
        //Hash
        const isHash: boolean = this.Application.Solver.Contains(dForRenders, 'hash');
        const hashTemplate: string = isHash ? this.GetElementHashTemplate(elementForTemplate) : null;
        const useHash: boolean = hashTemplate !== null;
        //Data Length
        const length: number = datas.length;
        //Viewport
        const canCreateViewport: boolean = ((isContextRoot) && (isFirstChild) && (!wasWrapped) && (!hasIfText) && (range === null));
        const viewport: DrapoViewport = (canCreateViewport && isViewport) ? this.Application.ViewportHandler.CreateViewportControlFlow(sector, elementForTemplate, forReferenceTemplate, dataKey, key, dataKeyIteratorRange, datas) : null;
        const isViewportActive: boolean = ((viewport != null) && (viewport.IsActive));
        if (dForRender != null)
            forReferenceTemplate.removeAttribute('d-for-render');
        //Viewport Ballon Before
        lastInserted = this.Application.ViewportHandler.CreateViewportControlFlowBallonBefore(viewport, lastInserted);
        //Document Fragment
        let canFragmentElements: boolean = viewport == null;
        const fragment: DocumentFragment = document.createDocumentFragment();
        //Inline d-for inside
        const canUseTemplate: boolean = isContextRootFullExclusive && (type == DrapoStorageLinkType.Render) && (datas.length > 3);
        const templateVariables: string[][] = canUseTemplate ? (await this.GetTemplateVariables(sector, context, dataKey, key, forReferenceTemplate)) : null;
        //Render
        let nodesRemovedCount: number = 0;
        const startViewport: number = this.Application.ViewportHandler.GetViewportControlFlowStart(viewport, start);
        let endViewport: number = this.Application.ViewportHandler.GetViewportControlFlowEnd(viewport, length);
        if (isViewportActive)
            context.Initialize(startViewport - 1);
        for (let j = startViewport; j < endViewport; j++) {
            const data: any = datas[j];
            //Template
            const templateKey: string = templateVariables !== null ? await this.CreateTemplateKey(sector, context, dataKey, templateVariables, data, key, j) : null;
            let templateData: HTMLElement = templateKey !== null ? await this.GetTemplateFromTemplateKey(context, templateKey) : null;
            if ((templateKey !== null) && (templateData === null)) {
                templateData = await this.CreateTemplate(sector, context, renderContext, this.Application.Document.Clone(forReferenceTemplate), dataKey, key, j, data);
                this.AddTemplate(context, templateKey, templateData);
            }
            const template: HTMLElement = templateData !== null ? this.Application.Document.Clone(templateData) : this.Application.Document.Clone(forReferenceTemplate);
            const viewportIndexDifference: number = (isViewportActive ? (1 - startViewport) : 0);
            const nodeIndex: number = j - nodesRemovedCount + viewportIndexDifference;
            const oldNode: HTMLElement = ((items !== null) && (nodeIndex < items.length)) ? items[nodeIndex] : null;
            const item: DrapoContextItem = context.Create(data, template, elementForTemplate, dataKey, key, dataKeyIterator, j, oldNode);
            if ((hasIfText) && (!await this.Application.Solver.ResolveConditional(ifText, template, sector, context, renderContext, elementForTemplate))) {
                if ((isDifference) && (oldNode !== null))
                    this.RemoveListIndex(items, nodeIndex);
                nodesRemovedCount++;
                context.Pop();
                continue;
            }
            if (type == DrapoStorageLinkType.Render) {
                const hashValueBefore: string = ((useHash) && (oldNode != null)) ? oldNode.getAttribute('d-hash') : null;
                const hashValueCurrent: string = hashTemplate === null ? null : await this.GetElementHashValue(sector, context, template, hashTemplate);
                const applyHash: boolean = ((!useHash) || (hashValueCurrent !== hashValueBefore));
                if (applyHash)
                    await this.ResolveControlFlowForIterationRender(sector, context, template, renderContext, true, canResolveComponents);
                if (((isDifference) || (isViewportActive)) && (oldNode != null)) {
                    if (applyHash)
                        this.Application.Document.ApplyNodeDifferences(oldNode.parentElement, oldNode, template, isHTML);
                    if (hashValueCurrent !== null)
                        oldNode.setAttribute('d-hash', hashValueCurrent);
                    lastInserted = oldNode;
                } else if (canFragmentElements) {
                    if (hashValueCurrent !== null)
                        template.setAttribute('d-hash', hashValueCurrent);
                    fragment.appendChild(template);
                } else {
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
            } else if (type == DrapoStorageLinkType.RenderClass) {
                await this.ResolveControlFlowForIterationRenderClass(context, renderContext, template, sector);
                if (oldNode != null)
                    this.Application.Document.ApplyNodeDifferencesRenderClass(oldNode, template);
            }
        }
        //Viewport Ballon After
        this.Application.ViewportHandler.AppendViewportControlFlowBallonAfter(viewport, fragment);
        if ((viewport == null) && (isContextRootFullExclusive) && (!isIncremental)) {
            this.Application.Observer.UnsubscribeFor(dataKey, elementForTemplate);
            if (elForParent.children.length !== 1)
                this.Application.Document.SetHTML(elForParent, content);
            const template: HTMLElement = elForParent.children[0] as HTMLElement;
            this.Application.Observer.SubscribeFor(template, dataKey);
            elForParent.append(fragment);
            elFor = template;
        } else {
            if (fragment.childNodes.length > 0)
                lastInserted.after(fragment);
        }
        //Viewport Activate
        this.Application.ViewportHandler.ActivateViewportControlFlow(viewport, lastInserted);
        //Enable Incremental Notify
        this.Application.Observer.IsEnabledNotifyIncremental = true;
        //Inside recursion we can remove template.
        if ((context.IsInsideRecursion) && (!context.IsElementTemplateRoot(key)))
            await this.Application.Document.RemoveElement(elementForTemplate, false);
        //Subscribe
        if ((dataItem != null) && (dataItem.IsIncremental))
            await this.Application.Binder.BindIncremental(elFor, dataKeyIterator, sector, isIncremental);
        //Garbage Collector
        if (isContextRoot) {
            //Unload Components Detached
            await this.Application.ComponentHandler.UnloadComponentInstancesDetached(sector);
            //Collect Sectors
            await this.Application.Document.CollectSector(sector);
        }
        //Restore scroll position
        if (hasViewPortbeforeRecycle) {
            viewport.ElementScroll.scrollTop = viewportBeforeScrollPosition;
            await this.ResolveControlFlowForViewportScroll(viewport);
        }
    }

    private async ResolveControlFlowForIterationRender(sector: string, context: DrapoContext, element: HTMLElement, renderContext: DrapoRenderContext, isStart: boolean, canResolveComponents: boolean): Promise<void> {
        //Mustache Nodes
        if (context.CheckMustacheNodes)
            await this.Application.Barber.ResolveControlFlowMustacheNodes(context, element, sector);
        //Children
        const children: Array<HTMLElement> = [].slice.call(element.children);
        const hasChildren: boolean = children.length > 0;
        if (hasChildren) {
            for (let i = 0; i < children.length; i++) {
                const child: HTMLElement = children[i];
                const forText = child.getAttribute('d-for');
                if (forText != null) {
                    //Nested or Recursive
                    const ifText = child.getAttribute('d-if');
                    const hasIfText: boolean = (ifText != null);
                    const applyConditional: boolean = ((hasIfText) && (this.CanApplyConditional(context, forText, ifText)));
                    if ((!applyConditional) || (await this.Application.Solver.ResolveConditional(ifText, null, sector, context, renderContext))) {
                        context.Down();
                        await this.ResolveControlFlowForInternal(sector, context, renderContext, child, false, true, DrapoStorageLinkType.Render);
                        context.Up();
                    }
                    //Clean up the dfor Nested or Recursive
                    await this.Application.Document.RemoveElement(child);
                    children.splice(i, 1);
                    i--;
                } else {
                    //Visibility
                    if (!await this.IsControlFlowForIterationVisible(sector, context, child, renderContext)) {
                        await this.Application.Document.RemoveElement(child);
                        children.splice(i, 1);
                        i--;
                        continue;
                    }
                    //Mustache Attributes
                    if (context.CheckMustacheAttributes)
                        await this.Application.Barber.ResolveControlFlowMustacheAttributes(context, child, sector);
                    //Children
                    await this.ResolveControlFlowForIterationRender(sector, context, child, renderContext, false, canResolveComponents);
                    //ID
                    if (context.CheckID)
                        await this.Application.AttributeHandler.ResolveIDContext(context, child, sector, true);
                    //Attribute
                    if (context.CheckAttribute)
                        await this.Application.AttributeHandler.ResolveAttrContext(context, child, true);
                    //Model
                    if (context.CheckModel)
                        await this.Application.ModelHandler.ResolveModel(context, renderContext, child, sector, true, true);
                    //Class
                    if (context.CheckClass)
                        await this.Application.ClassHandler.ResolveClassContext(context, renderContext, child, sector, true, DrapoStorageLinkType.Render);
                    //Events
                    if (context.CheckEvent)
                        await this.Application.EventHandler.AttachContext(context, child, sector, renderContext);
                    //Behavior
                    if (context.CheckBehavior)
                        await this.Application.BehaviorHandler.ResolveBehaviorContext(context, child, true);
                    //Component
                    if (context.CheckComponent)
                        await this.Application.ComponentHandler.ResolveComponentContext(sector, context, child, renderContext, canResolveComponents);
                    //Validation
                    if (context.CheckValidation)
                        await this.Application.Validator.RegisterValidation(child, sector, context);
                }
            }
        }
        if ((isStart) || (!hasChildren)) {
            //ID
            if (context.CheckID)
                await this.Application.AttributeHandler.ResolveIDContext(context, element, sector, true);
            //Attribute
            if (context.CheckAttribute)
                await this.Application.AttributeHandler.ResolveAttrContext(context, element, true);
            //Model
            if (context.CheckModel)
                await this.Application.ModelHandler.ResolveModel(context, renderContext, element, sector, true, true);
            //Class
            if (context.CheckClass)
                await this.Application.ClassHandler.ResolveClassContext(context, renderContext, element, sector, true, DrapoStorageLinkType.RenderClass);
            //Events
            if (context.CheckEvent)
                await this.Application.EventHandler.AttachContext(context, element, sector, renderContext);
            //Behavior
            if (context.CheckBehavior)
                await this.Application.BehaviorHandler.ResolveBehaviorContext(context, element, true);
            //Component
            if (context.CheckComponent)
                await this.Application.ComponentHandler.ResolveComponentContext(sector, context, element, renderContext, canResolveComponents);
            //Validation
            if (context.CheckValidation)
                await this.Application.Validator.RegisterValidation(element, sector, context);
            //Mustache Attributes
            if ((!hasChildren) && (context.CheckMustacheAttributes))
                await this.Application.Barber.ResolveControlFlowMustacheAttributes(context, element, sector);
        }
    }

    private CanApplyConditional(context: DrapoContext, forText: string, ifText: string): boolean {
        const parsedFor: string[] = this.Application.Parser.ParseFor(forText);
        if (parsedFor == null)
            return (true);
        const key: string = parsedFor[0];
        if (context.IsKey(key))
            return (true);
        //Check if is using the for context
        const index: number = ifText.indexOf('{{' + key);
        return (index < 0);
    }

    private async ResolveControlFlowForIterationRenderClass(context: DrapoContext, renderContext: DrapoRenderContext, element: HTMLElement, sector: string): Promise<void> {
        await this.Application.ClassHandler.ResolveClassContext(context, renderContext, element, sector, true, DrapoStorageLinkType.RenderClass);
    }

    public async IsControlFlowForIterationVisible(sector: string, context: DrapoContext, el: Element, renderContext: DrapoRenderContext): Promise<boolean> {
        const ifText: string = el.getAttribute('d-if');
        if (ifText == null)
            return (true);
        if (!await this.Application.FunctionHandler.HasFunctionMustacheContext(ifText, sector, renderContext))
            return (true);
        const value: boolean = await this.Application.Solver.ResolveConditional(ifText, null, sector, context, renderContext);
        if (value)
            el.removeAttribute('d-if');
        return (value);
    }

    private RemoveList(els: HTMLElement[]): void {
        if (els === null)
            return;
        for (let i: number = els.length - 1; i >= 0; i--)
            this.RemoveListIndex(els, i);
    }

    private RemoveListIndex(els: HTMLElement[], index: number): void {
        const node: HTMLElement = els[index];
        if (node.parentElement != null)
            node.parentElement.removeChild(node);
        els.splice(index, 1);
    }

    private IsControlFlowDataKeyIterator(dataKey: string): boolean {
        return (this.Application.Parser.IsIterator(dataKey));
    }

    private async GetControlFlowDataKeyIterators(context: DrapoContext, renderContext: DrapoRenderContext, elementForTemplate: HTMLElement, expression: string): Promise<string[]> {
        const sector: string = this.Application.Document.GetSector(elementForTemplate);
        const mustaches: string[] = this.Application.Parser.ParseMustaches(expression);
        for (let i: number = 0; i < mustaches.length; i++) {
            const mustache: string = mustaches[i];
            const mustacheParts: string[] = this.Application.Parser.ParseMustache(mustache);
            const dataKey: string = this.Application.Solver.ResolveDataKey(mustacheParts);
            if (!this.Application.Storage.IsDataKey(dataKey, sector, renderContext))
                continue;
            this.Application.Observer.UnsubscribeFor(dataKey, elementForTemplate);
            this.Application.Observer.SubscribeFor(elementForTemplate, dataKey);
        }
        const data: string = await this.Application.Barber.ResolveControlFlowMustacheString(context, renderContext, null, expression, elementForTemplate, sector, true, null, true, elementForTemplate);
        return (this.Application.Parser.ParseIterator(data));
    }

    private GetElementHashTemplate(el: HTMLElement): string {
        const content: string = el.outerHTML;
        const mustaches: string[] = this.Application.Parser.ParseMustaches(content);
        let template: string = '';
        for (let i: number = 0; i < mustaches.length; i++) {
            if (i > 0)
                template = template + '_';
            template = template + mustaches[i];
        }
        return (template);
    }

    private async GetElementHashValue(sector: string, context: DrapoContext, el: HTMLElement, hashTemplate: string): Promise<string> {
        const hashValue: string = await this.Application.ModelHandler.ResolveValueExpression(context, el, sector, hashTemplate, false);
        return (hashValue);
    }

    private async GetTemplateVariables(sector: string, context: DrapoContext, dataKey: string, key: string, template: HTMLElement): Promise<string[][]> {
        //At least 2 for creating a template
        const elsFor: HTMLElement[] = this.Application.Searcher.FindByAttributeFromParent('d-for', template);
        if (elsFor.length < 1)
            return (null);
        const dataKeys: string[] = await this.GetControlFlowExpressionsDataKey(sector, elsFor);
        if ((dataKeys == null) || (dataKeys.length < 1))
            return (null);
        const elIfs: HTMLElement[] = this.Application.Searcher.FindByAttributeFromParent('d-if', template);
        if (elIfs.length < 1)
            return ([]);
        return (this.GetControlFlowConditionsDataKey(sector, dataKey, key, elIfs));
    }

    private GetControlFlowExpressionsDataKey(sector: string, elsFor: HTMLElement[]): string[] {
        const dataKeys: string[] = [];
        for (let i: number = 0; i < elsFor.length; i++) {
            const elForCurrent: HTMLElement = elsFor[i];
            const forText: string = elForCurrent.getAttribute('d-for');
            const parsedFor: string[] = this.Application.Parser.ParseFor(forText);
            if (parsedFor == null)
                continue;
            //Iterable
            const dataKey = parsedFor[2];
            const dataKeyIteratorParts: string[] = this.Application.Parser.ParseForIterable(dataKey);
            if (dataKeyIteratorParts.length !== 1)
                return (null);
            const isDataKey: boolean = this.Application.Storage.IsDataKey(dataKey, sector);
            if (!isDataKey)
                return (null);
            dataKeys.push(dataKey);
        }
        return (dataKeys);
    }

    private GetControlFlowConditionsDataKey(sector: string, dataKey: string, key: string, elIfs: HTMLElement[]): string[][] {
        const dataPaths: string[][] = [];
        for (let i: number = 0; i < elIfs.length; i++) {
            const elIfCurrent: HTMLElement = elIfs[i];
            const ifText: string = elIfCurrent.getAttribute('d-if');
            const mustaches: string[] = this.Application.Parser.ParseMustaches(ifText);
            for (let j: number = 0; j < mustaches.length; j++) {
                const mustache: string = mustaches[j];
                const mustacheParts: string[] = this.Application.Parser.ParseMustache(mustache);
                if (mustacheParts[0] !== key)
                    continue;
                dataPaths.push(mustacheParts);
            }
        }
        return (dataPaths);
    }

    private async CreateTemplateKey(sector: string, context: DrapoContext, dataKey: string, templateVariables: string[][], data: any, key: string, index: number): Promise<string> {
        if (templateVariables.length === 0)
            return ('_');
        let templateKey: string = '';
        context.Create(data, null, null, dataKey, key, null, index);
        for (let i: number = 0; i < templateVariables.length; i++) {
            const mustacheParts: string[] = templateVariables[i];
            const mustacheResolved: string = await this.Application.Solver.ResolveDataPath(context, null, null, sector, mustacheParts);
            templateKey = templateKey + '_' + mustacheResolved;
        }
        context.Pop();
        return (templateKey);
    }

    private async CreateTemplate(sector: string, context: DrapoContext, renderContext: DrapoRenderContext, el: HTMLElement, dataKey: string, key: string, index: number, data: any): Promise<HTMLElement> {
        context.CanUpdateTemplate = true;
        context.Create(data, el, null, dataKey, key, null, index);
        await this.ResolveControlFlowForIterationRender(sector, context, el, renderContext, true, false);
        context.Pop();
        context.CanUpdateTemplate = false;
        return (el);
    }

    private async GetTemplateFromTemplateKey(context: DrapoContext, templateKey: string): Promise<HTMLElement> {
        return (context.GetTemplate(templateKey));
    }

    private AddTemplate(context: DrapoContext, templateKey: string, template: HTMLElement): void {
        context.AddTemplate(templateKey, template);
    }

    public GetIteratorRange(iterator: string): DrapoRange {
        const rangeString = this.GetIteratorRangeString(iterator);
        if (rangeString === null)
            return (null);
        const range: DrapoRange = this.GetIteratorRangeInternal(rangeString);
        if (!this.IsValidRange(range)) {
            // tslint:disable-next-line:no-floating-promises
            this.Application.ExceptionHandler.HandleError('DrapoFunctionHandler - GetIteratorRange - Invalid Iterator Range - {0}', iterator);
        }
        return (range);
    }

    private GetIteratorRangeInternal(rangeString: string): DrapoRange {
        const index: number = rangeString.indexOf('..');
        if (index === -1)
            return (new DrapoRange(rangeString, rangeString));
        if (index === 0)
            return (new DrapoRange(null, rangeString.substr(2)));
        if (index === rangeString.length - 2)
            return (new DrapoRange(rangeString.substr(0, rangeString.length - 2)));
        return (new DrapoRange(rangeString.substr(0, index), rangeString.substr(index + 2)));
    }

    private GetIteratorRangeString(iterator: string): string {
        if (iterator[iterator.length - 1] !== ']')
            return (null);
        const index: number = iterator.lastIndexOf('[');
        if (index < 1)
            return (null);
        if (iterator[0] === '{')
            return (null);
        return (iterator.substring(index + 1, iterator.length - 1));
    }

    public CleanIteratorRange(iterator: string): string {
        const index: number = iterator.lastIndexOf('[');
        if (index === -1)
            return (iterator);
        return (iterator.substring(0, index));
    }

    private IsValidRange(range: DrapoRange): boolean {
        if (!this.IsValidRangeIndex(range.Start))
            return (false);
        if (!this.IsValidRangeIndex(range.End))
            return (false);
        return (true);
    }

    private IsValidRangeIndex(rangeIndex: string): boolean {
        if (rangeIndex === null)
            return (true);
        const isHat: boolean = rangeIndex[0] === '^';
        if (isHat)
            return (this.Application.Parser.IsNumber(rangeIndex.substr(1)));
        return (this.Application.Parser.IsNumber(rangeIndex));
    }

    public ApplyRange(data: any[], range: DrapoRange): any[] {
        const start: number = range.Start == null ? 0 : this.GetRangeIndex(data, range.Start);
        const end: number = range.End === null ? data.length : this.GetRangeIndex(data, range.End);
        const isCrescent: boolean = end > start;
        const dataRange: any[] = [];
        for (let i: number = start; ((isCrescent) && (i < end)) || ((!isCrescent) && (i >= end)); isCrescent ? i++ : i--) {
            if (i < 0)
                continue;
            if (i >= data.length)
                continue;
            dataRange.push(data[i]);
        }
        return (dataRange);
    }

    public GetRangeIndex(data: any[], rangeIndex: string): number {
        const isHat: boolean = rangeIndex[0] === '^';
        const number: number = this.Application.Parser.ParseNumber(isHat ? rangeIndex.substr(1) : rangeIndex);
        const numberHat: number = isHat ? data.length - number : number;
        if (numberHat < 0)
            return (0);
        if (numberHat > data.length)
            return (data.length);
        return (numberHat);
    }

    public async ExecuteDataItem(sector: string, context: DrapoContext, expression: string, iterator: string, forText: string, ifText: string, all: boolean, datas: any[], dataKey: string, key: string, executionContext: DrapoExecutionContext<any> = null): Promise<boolean> {
        for (let j: number = 0; j < datas.length; j++) {
            const data: any = datas[j];
            const item: DrapoContextItem = context.Create(data, null, null, dataKey, key, iterator, j);
            let execute: boolean = true;
            if (ifText != null) {
                const conditionalText: string = await this.Application.Barber.ResolveControlFlowMustacheStringFunction(sector, context, null, executionContext, ifText, null);
                const conditional: boolean = await this.Application.Solver.ResolveConditional(conditionalText);
                if (!conditional) {
                    context.Pop();
                    execute = false;
                }
            }
            if (execute) {
                await this.Application.FunctionHandler.ResolveFunction(sector, context.Item, null, null, expression, executionContext);
                if (!all)
                    return (true);
            }
            if (forText == null)
                continue;
            const parsedFor: string[] = this.Application.Parser.ParseFor(forText);
            if (parsedFor == null)
                continue;
            //data item
            const keyChildren: string = parsedFor[0];
            //Iterable
            const dataKeyIteratorRange = parsedFor[2];
            const range: DrapoRange = this.GetIteratorRange(dataKeyIteratorRange);
            const dataKeyIterator: string = range == null ? dataKeyIteratorRange : this.CleanIteratorRange(dataKeyIteratorRange);
            const dataKeyChildren: string = dataKeyIterator;
            const dataKeyIteratorParts: string[] = this.Application.Parser.ParseForIterable(dataKeyIterator);
            let datasChildren: any[] = this.Application.Solver.ResolveDataObjectPathObject(data, dataKeyIteratorParts);
            if (range !== null)
                datasChildren = this.Application.ControlFlow.ApplyRange(datasChildren, range);
            if (datasChildren.length === 0)
                continue;
            const childExecuted: boolean = await this.ExecuteDataItem(sector, context, expression, dataKeyIterator, forText, ifText, all, datasChildren, dataKeyChildren, keyChildren, executionContext);
            if ((childExecuted) && (!all))
                return (true);
        }
        return (false);
    }

    public async ResolveControlFlowForViewportScroll(viewport: DrapoViewport): Promise<void> {
        const view: [number, number, number, number, number, number] = this.Application.ViewportHandler.GetView(viewport);
        if (view === null)
            return;
        //Hash
        const dForRender: string = viewport.Element.getAttribute('d-for-render');
        const dForRenders: string[] = (dForRender == null) || (dForRender == '') ? [] : this.Application.Parser.ParseBlock(dForRender, ',');
        const isHash: boolean = this.Application.Solver.Contains(dForRenders, 'hash');
        const hashTemplate: string = isHash ? this.GetElementHashTemplate(viewport.Element) : null;
        //Rows
        const rowsBeforeRemove: number = view[0];
        const rowsBeforeInsertStart: number = view[1];
        const rowsBeforeInsertEnd: number = view[2];
        const rowsAfterRemove: number = view[3];
        const rowsAfterInsertStart: number = view[4];
        const rowsAfterInsertEnd: number = view[5];
        //Before Remove
        if (rowsBeforeRemove !== null) {
            if (rowsBeforeRemove === -1) {
                //Clear
                let rowRemove: Element = viewport.ElementBallonBefore.nextElementSibling;
                const elBallonAfter: HTMLElement = viewport.ElementBallonAfter;
                while ((rowRemove != null) && (rowRemove !== elBallonAfter)) {
                    const rowNext: Element = rowRemove.nextElementSibling;
                    rowRemove.remove();
                    rowRemove = rowNext;
                }
            } else {
                let rowRemove: Element = viewport.ElementBallonBefore.nextElementSibling;
                if (rowRemove != null) {
                    for (let i: number = 0; i < rowsBeforeRemove; i++) {
                        const rowNext: Element = rowRemove.nextElementSibling;
                        rowRemove.remove();
                        rowRemove = rowNext;
                    }
                }
            }
        }
        //Before Insert
        const fragmentBefore: DocumentFragment = await this.CreateControlFlowForViewportFragment(viewport, rowsBeforeInsertStart, rowsBeforeInsertEnd, hashTemplate);
        if (fragmentBefore !== null) {
            viewport.ElementBallonBefore.after(fragmentBefore);
        }
        //After Remove
        if (rowsAfterRemove !== null) {
            let rowRemove: Element = viewport.ElementBallonAfter.previousElementSibling;
            for (let i: number = 0; i < rowsAfterRemove; i++) {
                const rowPrevious: Element = rowRemove.previousElementSibling;
                rowRemove.remove();
                rowRemove = rowPrevious;
            }
        }
        //After Insert
        const fragmentAfter: DocumentFragment = await this.CreateControlFlowForViewportFragment(viewport, rowsAfterInsertStart, rowsAfterInsertEnd, hashTemplate);
        if (fragmentAfter !== null) {
            const elementAfterPrevious: Element = viewport.ElementBallonAfter.previousElementSibling;
            elementAfterPrevious.after(fragmentAfter);
        }
        //Ballon
        this.Application.ViewportHandler.UpdateElementsBallon(viewport);
        //Garbage Collector
        //Unload Components Detached
        await this.Application.ComponentHandler.UnloadComponentInstancesDetached(viewport.Sector);
        //Collect Sectors
        await this.Application.Document.CollectSector(viewport.Sector);
    }

    private async CreateControlFlowForViewportFragment(viewport: DrapoViewport, start: number, end: number, hashTemplate: string): Promise<DocumentFragment> {
        if ((start === null) || (end == start))
            return (null);
        const fragment: DocumentFragment = document.createDocumentFragment();
        const context: DrapoContext = new DrapoContext();
        context.Sector = viewport.Sector;
        context.Index = start - 1;
        context.IndexRelative = context.Index;
        const content: string = viewport.ElementTemplate.outerHTML;
        this.InitializeContext(context, content);
        const renderContext: DrapoRenderContext = new DrapoRenderContext();
        for (let i = start; i < end; i++) {
            const data: any = viewport.Data[i];
            //Template
            const template: HTMLElement = this.Application.Document.Clone(viewport.ElementTemplate);
            const item: DrapoContextItem = context.Create(data, template, template, viewport.DataKey, viewport.Key, viewport.DataKeyIteratorRange, i, null);
            await this.ResolveControlFlowForIterationRender(viewport.Sector, context, template, renderContext, true, true);
            const hashValueCurrent: string = hashTemplate === null ? null : await this.GetElementHashValue(viewport.Sector, context, template, hashTemplate);
            if (hashValueCurrent !== null)
                template.setAttribute('d-hash', hashValueCurrent);
            fragment.appendChild(template);
        }
        return (fragment);
    }
}

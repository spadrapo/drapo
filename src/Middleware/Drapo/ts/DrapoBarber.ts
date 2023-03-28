class DrapoBarber {
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

    public HasContentMustacheNodesContext(content: string): boolean {
        let isInsideTag: boolean = false;
        const length: number = content.length - 1;
        for (let i: number = 0; i < length; i++) {
            const chr: string = content[i];
            if (chr == '>') {
                isInsideTag = false;
            } else if (chr == '<') {
                isInsideTag = true;
            } else if ((!isInsideTag) && (chr === '{')) {
                if (content[i + 1] === '{')
                    return (true);
            }
        }
        return (false);
    }

    public HasContentMustacheAttributeContext(content: string): boolean {
        //Attributes
        const attributes: [string, string][] = this.Application.Parser.ParseHTMLAttributes(content);
        for (let i: number = 0; i < attributes.length; i++) {
            const attribute: [string, string] = attributes[i];
            const attributeKey: string = attribute[0];
            if ((attributeKey !== 'value') && (attributeKey !== 'class'))
                continue;
            const attributeValue: string = attribute[1];
            if (attributeValue.indexOf('{{') >= 0)
                return (true);
        }
        return (false);
    }

    private HasContentMustacheAttributeContextMustache(content: string, attribute: string): boolean {
        // tslint:disable-next-line
        return ((content.indexOf(attribute + '="{{') > -1) || (content.indexOf(attribute + "='{{") > -1));
    }

    public async ResolveMustaches(el: HTMLElement = null, sector: string = null, stopAtSectors: boolean = true): Promise<void> {
        //Who needs data ?
        if (el == null)
            el = document.documentElement;
        if (sector === null)
            sector = this.Application.Document.GetSector(el);
        const renderContext: DrapoRenderContext = new DrapoRenderContext();
        const context: DrapoContext = new DrapoContext();
        this.Application.ControlFlow.InitializeContext(context, el.outerHTML);
        await this.ResolveMustachesInternal(el, sector, context, renderContext, stopAtSectors);
        //Notify who needs data
        await this.Application.Storage.LoadDataDelayedAndNotify();
    }

    private async ResolveMustachesInternal(el: HTMLElement, sector: string, context: DrapoContext, renderContext: DrapoRenderContext, stopAtSectors: boolean): Promise<void> {
        const pre: string = el.getAttribute != null ? el.getAttribute('d-pre') : null;
        if (pre === 'true')
            return;
        const children: Array<HTMLElement> = [].slice.call(el.children);
        const hasChildren: boolean = children.length > 0;
        if (hasChildren) {
            for (let i = 0; i < children.length; i++) {
                const child: HTMLElement = children[i];
                const childSector: string = child.getAttribute('d-sector');
                if (childSector != null) {
                    if (stopAtSectors)
                        continue;
                    sector = childSector;
                }
                //Render
                const canRender: boolean = await this.CanRender(child, sector);
                if (canRender) {
                    //Children
                    await this.ResolveMustachesInternal(child, sector, context, renderContext, stopAtSectors);
                } else {
                    await this.Application.Document.RemoveElement(child);
                }
            }
        } else {
            //Mustaches
            await this.ResolveMustacheElementLeaf(el);
        }
        //ID
        if (context.CheckID)
            await this.Application.AttributeHandler.ResolveID(el, sector);
        //Attr
        if (context.CheckAttribute)
            await this.Application.AttributeHandler.ResolveAttr(el);
        //Model
        if (context.CheckModel)
            await this.ResolveModel(el);
        //Class
        if (context.CheckClass)
            await this.Application.ClassHandler.ResolveClass(el, sector);
        //Validation
        if (context.CheckValidation)
            await this.Application.Validator.RegisterValidation(el, sector);
        //Events
        if (context.CheckEvent)
            await this.Application.EventHandler.Attach(el, renderContext);
        //Behavior
        if (context.CheckBehavior)
            await this.Application.BehaviorHandler.ResolveBehavior(el);
        //Visibility
        await this.ResolveMustacheElementVisibility(el);
        //Cloak
        await this.ResolveCloak(el);
    }

    private async CanRender(el: HTMLElement, sector: string): Promise<boolean> {
        const dRender: string = el.getAttribute('d-render');
        if (dRender == null)
            return (true);
        if (this.Application.Barber.HasMustacheContext(dRender, sector))
            return (true);
        const context: DrapoContext = new DrapoContext();
        const expression: string = await this.Application.Barber.ResolveControlFlowMustacheStringFunction(sector, context, null, null, dRender, null, false);
        const result: boolean = await this.Application.Solver.ResolveConditional(expression);
        el.removeAttribute('d-render');
        return (result);
    }

    public async ResolveFilter(el: HTMLElement, sector: string, canBind: boolean, dataKeyFilter: string, dataFieldFilter: string): Promise<void> {
        if (this.Application.Document.IsElementPreprocessed(el))
            return;
        //Mustaches
        const children: Array<HTMLElement> = [].slice.call(el.children);
        const hasChildren: boolean = children.length > 0;
        if (!hasChildren) {
            await this.ResolveMustacheElementLeaf(el, false, true, dataKeyFilter, dataFieldFilter);
        }
        //ID
        await this.Application.AttributeHandler.ResolveID(el, sector, canBind, true, dataKeyFilter, dataFieldFilter);
        //Attr
        await this.Application.AttributeHandler.ResolveAttr(el, canBind, true, dataKeyFilter, dataFieldFilter);
        //Model
        await this.ResolveModel(el, canBind, true, dataKeyFilter, dataFieldFilter);
        //Class
        await this.Application.ClassHandler.ResolveClass(el, sector, canBind, true, dataKeyFilter, dataFieldFilter);
        //Visibility
        await this.ResolveMustacheElementVisibility(el, canBind);
        //Delay
        await this.Application.Storage.LoadDataDelayedAndNotify();
        //Cloak
        await this.ResolveCloak(el, canBind);
    }

    public async ResolveElementDelayed(el: HTMLElement, sector: string, dataKeyFilter: string = null, dataFieldFilter: string = null): Promise<void> {
        //Mustaches
        await this.ResolveMustacheElementLeaf(el, true, false, dataKeyFilter, dataFieldFilter);
        //Attr
        await this.Application.AttributeHandler.ResolveAttr(el, false, false, dataKeyFilter, dataFieldFilter);
        //Class
        await this.Application.ClassHandler.ResolveClass(el, sector, false, false, dataKeyFilter, dataFieldFilter);
    }

    public async ResolveMustacheElementLeaf(el: HTMLElement, canUseModel: boolean = false, canSubscribeDelay: boolean = true, dataKeyFilter: string = null, dataFieldFilter: string = null): Promise<void> {
        //We only accept mustaches in the text by now.
        const sector = this.Application.Document.GetSector(el);
        const model: string = canUseModel ? el.getAttribute('d-model') : null;
        let text = model != null ? model : this.Application.Document.GetText(el);
        let updated: boolean = false;
        const mustaches: string[] = this.Application.Parser.ParseMustaches(text);
        for (let i: number = 0; i < mustaches.length; i++) {
            const mustache: string = mustaches[i];
            const mustacheParts: string[] = this.Application.Parser.ParseMustache(mustache);
            const dataKey: string = this.Application.Solver.ResolveDataKey(mustacheParts);
            if ((dataKeyFilter != null) && (dataKey != dataKeyFilter))
                continue;
            //Can be data item or iterator. We only want data item by now
            if (!this.Application.Storage.IsMustachePartsDataKey(sector, mustacheParts))
                continue;
            const dataFields: string[] = this.Application.Solver.ResolveDataFields(mustacheParts);
            const dataField: string = dataFields[0];
            if ((dataFieldFilter != null) && (dataField != dataFieldFilter))
                continue;
            if (await this.Application.Storage.EnsureDataKeyFieldReady(dataKey, sector, mustacheParts)) {
                const mustacheData: string = this.Application.Storage.GetDataKeyField(dataKey, sector, mustacheParts);
                if (mustacheData == null)
                    continue;
                text = text.replace(mustache, mustacheData);
                updated = true;
            } else if (canSubscribeDelay) {
                this.Application.Observer.SubscribeDelay(el, dataKey, dataFields);
            }
        }
        if (updated)
            this.Application.Document.SetText(el, text);
    }

    public async ResolveModel(el: HTMLElement, canBind: boolean = true, canSubscribeDelay: boolean = true, dataKeyFilter: string = null, dataFieldFilter: string = null): Promise<void> {
        const model: string = el.getAttribute('d-model');
        if (model == null)
            return;
        const sector = this.Application.Document.GetSector(el);
        if (this.Application.Barber.HasMustacheContext(model, sector))
            return;
        const isMustacheOnly: boolean = this.Application.Parser.IsMustacheOnly(model, true);
        if (!isMustacheOnly) {
            const context: DrapoContext = new DrapoContext();
            await this.Application.ModelHandler.ResolveModel(context, null, el, sector, canBind, false);
            return;
        }
        const mustaches: string[] = this.Application.Parser.ParseMustaches(model);
        if (mustaches.length != 1)
            return;
        const mustache: string = mustaches[0];
        const mustacheParts: string[] = this.Application.Parser.ParseMustache(mustache);
        const dataKey: string = this.Application.Solver.ResolveDataKey(mustacheParts);
        if ((dataKeyFilter != null) && (dataKey != dataKeyFilter))
            return;
        if (!this.Application.Storage.IsDataKey(dataKey, sector))
            return;
        const dataFields: string[] = this.Application.Solver.ResolveDataFields(mustacheParts);
        const dataField: string = dataFields[0];
        if ((dataFieldFilter != null) && (dataField != dataFieldFilter))
            return;
        if (await this.Application.Storage.EnsureDataKeyFieldReady(dataKey, sector, mustacheParts)) {
            const context: DrapoContext = new DrapoContext();
            const data: any = await this.Application.Storage.RetrieveData(dataKey, sector);
            context.Create(data, el, null, dataKey, dataKey, null, null);
            await this.Application.ModelHandler.ResolveModel(context, null, el, sector, canBind, false);
        } else if (canSubscribeDelay) {
            this.Application.Observer.SubscribeDelay(el, dataKey, dataFields);
        }
    }

    public async ResolveControlFlowMustacheAttributes(context: DrapoContext, element: HTMLElement, sector: string): Promise<void> {
        //Attribute value
        await this.ResolveControlFlowMustacheAttribute(context, "value", element, sector);
        //Attribute class
        await this.ResolveControlFlowMustacheAttribute(context, "class", element, sector);
    }

    public async ResolveControlFlowMustacheNodes(context: DrapoContext, element: HTMLElement, sector: string): Promise<void> {
        const childNodes: Array<HTMLElement> = [].slice.call(element.childNodes);
        for (let i = 0; i < childNodes.length; i++) {
            const childNode: HTMLElement = childNodes[i];
            if (childNode.nodeType != Node.TEXT_NODE)
                continue;
            let text: string = childNode.nodeValue;
            const textOriginal: string = text;
            const mustaches = this.Application.Parser.ParseMustaches(text);
            if (mustaches.length == 0)
                continue;
            for (let j = 0; j < mustaches.length; j++) {
                const mustache = mustaches[j];
                const mustacheParts: string[] = this.Application.Parser.ParseMustache(mustache);
                if ((context !== null) && (!context.CanResolve(mustacheParts[0])))
                    continue;
                const mustacheData = await this.Application.Solver.ResolveDataPath(context, null, element, sector, mustacheParts, true);
                text = text.replace(mustache, mustacheData);
            }
            if (textOriginal !== text)
                childNode.nodeValue = text;
        }
    }

    public async ResolveControlFlowMustacheAttribute(context: DrapoContext, attribute: string, el: HTMLElement, sector: string): Promise<void> {
        let hasChanges: boolean = false;
        let text: string = el.getAttribute(attribute);
        const mustaches = this.Application.Parser.ParseMustaches(text);
        for (let j = 0; j < mustaches.length; j++) {
            const mustache = mustaches[j];
            const mustacheParts: string[] = this.Application.Parser.ParseMustache(mustache);
            if (!context.CanResolve(mustacheParts[0]))
                continue;
            const mustacheData = await this.Application.Solver.ResolveDataPath(context, null, el, sector, mustacheParts, true);
            text = text.replace(mustache, mustacheData);
            hasChanges = true;
        }
        if (context.CanUpdateTemplate) {
            if (this.Application.Parser.HasMustache(text)) {
                if (hasChanges)
                    el.setAttribute(attribute, text);
                return;
            }
        }
        if (hasChanges)
            el.setAttribute(attribute, text);
    }

    public async ResolveControlFlowMustacheStringFunction(sector: string, context: DrapoContext, renderContext: DrapoRenderContext, executionContext: DrapoExecutionContext<any>, expression: string, element: HTMLElement, canBind: boolean = true, type: DrapoStorageLinkType = DrapoStorageLinkType.Render): Promise<string> {
        //Replace Functions
        const expressionWithoutFunctions: string = await this.Application.FunctionHandler.ReplaceFunctionExpressions(sector, context, expression, canBind);
        //Resolve Mustaches
        return (this.ResolveControlFlowMustacheString(context, renderContext, executionContext, expressionWithoutFunctions, element, sector, canBind, type));
    }

    public async ResolveControlFlowMustacheString(context: DrapoContext, renderContext: DrapoRenderContext, executionContext: DrapoExecutionContext<any>, expression: string, element: HTMLElement, sector: string, canBind: boolean = true, type: DrapoStorageLinkType = DrapoStorageLinkType.Render, isForIterator: boolean = false, elementForTemplate: HTMLElement = null): Promise<string> {
        const mustaches = this.Application.Parser.ParseMustaches(expression);
        for (let j = 0; j < mustaches.length; j++) {
            const mustache = mustaches[j];
            const mustacheParts: string[] = this.Application.Parser.ParseMustache(mustache);
            const dataKey: string = this.Application.Solver.ResolveDataKey(mustacheParts);
            const dataFields: string[] = this.Application.Solver.ResolveDataFields(mustacheParts);
            if ((this.Application.Storage.IsDataKey(dataKey, sector, renderContext)) && (!this.Application.Storage.IsDataKeyExecution(dataKey))) {
                await this.Application.Storage.EnsureDataKeyFieldReady(dataKey, sector, mustacheParts);
                //Data Key
                let mustacheData: string = this.Application.Storage.GetDataKeyField(dataKey, sector, mustacheParts);
                mustacheData = this.Application.Solver.EnsureString(mustacheData);
                //Bind
                if (canBind) {
                    if (isForIterator) {
                        this.Application.Observer.SubscribeLink(dataKey, context.GetDataKeyRoot(), dataFields);
                    } else {
                        const contextDataKey: DrapoContext = new DrapoContext();
                        const data: any = await this.Application.Storage.RetrieveData(dataKey, sector);
                        contextDataKey.Create(data, element, null, dataKey, dataKey, null, null);
                        this.Application.Binder.BindReader(contextDataKey.Item, element, dataFields);
                        if ((context != null) && (context.Item != null) && (dataKey !== context.Item.DataKey))
                            this.Application.Observer.SubscribeStorage(dataKey, dataFields, context.Item.DataKey, type);
                    }
                }
                expression = expression.replace(mustache, mustacheData);
            } else {
                //Context
                let mustacheData = context.Item === null ? '' : await this.Application.Solver.ResolveDataPath(context, executionContext, element, sector, mustacheParts, canBind);
                mustacheData = this.Application.Solver.EnsureString(mustacheData);
                expression = expression.replace(mustache, mustacheData);
            }
        }
        return (expression);
    }

    public async ResolveMustacheElementVisibility(el: HTMLElement, canBind: boolean = true): Promise<void> {
        const elFor: string = el.getAttribute('d-for');
        if (elFor != null)
            return;
        const elIF: string = el.getAttribute('d-if');
        if (elIF == null)
            return;
        const sector: string = this.Application.Document.GetSector(el);
        if (this.Application.Barber.HasMustacheContext(elIF, sector))
            return;
        const context: DrapoContext = new DrapoContext();
        const visibility: boolean = await this.Application.Solver.ResolveConditional(elIF, el, sector, context);
        if (visibility)
            this.Application.Document.Show(el);
        else
            this.Application.Document.Hide(el);
    }

    public HasMustacheContext(expression: string, sector: string, renderContext: DrapoRenderContext = null): boolean {
        //Disabling cache for mustache context. We have some problems that can be see at: ControlFlowComponentsClass.html
        //const value: boolean = this.Application.SectorContainerHandler.HasMustacheContextCache(sector, expression);
        //if (value !== null)
        //    return (value);
        const valueCache: boolean = this.HasMustacheContextInternal(expression, sector, renderContext);
        /*this.Application.SectorContainerHandler.AddMustacheContextCache(sector, expression, valueCache);*/
        return (valueCache);
    }

    private HasMustacheContextInternal(expression: string, sector: string, renderContext: DrapoRenderContext = null): boolean {
        const mustaches = this.Application.Parser.ParseMustaches(expression, true);
        for (let j = 0; j < mustaches.length; j++) {
            const mustache = mustaches[j];
            const mustacheParts: string[] = this.Application.Parser.ParseMustache(mustache);
            const dataKey: string = this.Application.Solver.ResolveDataKey(mustacheParts);
            const isDataKey: boolean = this.Application.Storage.IsDataKey(dataKey, sector, renderContext);
            if (!isDataKey)
                return (true);
        }
        return (false);
    }

    public async ResolveCloak(el: HTMLElement, canBind: boolean = true): Promise<void> {
        const elCloak: string = el.getAttribute('d-cloak');
        if (elCloak == null)
            return;
        el.classList.remove(elCloak);
    }
}
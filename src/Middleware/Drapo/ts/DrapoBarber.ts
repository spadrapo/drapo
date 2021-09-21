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

    public async ResolveMustaches(jQueryStart: JQuery = null, sector: string = null, stopAtSectors: boolean = true): Promise<void> {
        //Who needs data ?
        if (jQueryStart == null)
            jQueryStart = $(document.documentElement);
        if (sector === null)
            sector = this.Application.Document.GetSector(jQueryStart.get(0));
        const renderContext: DrapoRenderContext = new DrapoRenderContext();
        for (let i = 0; i < jQueryStart.length; i++)
            await this.ResolveMustachesInternal(jQueryStart[i], sector, renderContext, stopAtSectors);
        //Notify who needs data
        await this.Application.Storage.LoadDataDelayedAndNotify();
    }

    private async ResolveMustachesInternal(el: HTMLElement, sector: string, renderContext: DrapoRenderContext, stopAtSectors: boolean): Promise<void> {
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
                const canRender: boolean = await this.CanRender(el, sector);
                if (canRender) {
                    //Children
                    await this.ResolveMustachesInternal(child, sector, renderContext, stopAtSectors);
                } else {
                    await this.Application.Document.RemoveElement(child);
                    i--;
                }
            }
        } else {
            //Mustaches
            await this.ResolveMustacheElementLeaf(el);
        }
        //ID
        await this.Application.AttributeHandler.ResolveID(el, sector);
        //Attr
        await this.Application.AttributeHandler.ResolveAttr(el);
        //Model
        await this.ResolveModel(el);
        //Class
        await this.Application.ClassHandler.ResolveClass(el, sector);
        //Validation
        await this.Application.Validator.RegisterValidation(el, sector);
        //Events
        await this.Application.EventHandler.Attach(el, renderContext);
        //Behavior
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
        if (await this.Application.Barber.HasMustacheContext(dRender, sector))
            return (true);
        const context: DrapoContext = new DrapoContext();
        const expression: string = await this.Application.Barber.ResolveControlFlowMustacheStringFunction(sector, context, null, dRender, null, false);
        const result: boolean = await this.Application.Solver.ResolveConditional(expression);
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
        const elj: JQuery = $(el);
        let text = model != null ? model : elj.text();
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
            elj.text(text);
    }

    public async ResolveModel(el: HTMLElement, canBind: boolean = true, canSubscribeDelay: boolean = true, dataKeyFilter: string = null, dataFieldFilter: string = null): Promise<void> {
        const model: string = el.getAttribute('d-model');
        if (model == null)
            return;
        const sector = this.Application.Document.GetSector(el);
        if (await this.Application.Barber.HasMustacheContext(model, sector))
            return;
        const isMustacheOnly: boolean = this.Application.Parser.IsMustacheOnly(model, true);
        if (!isMustacheOnly)
        {
            const context: DrapoContext = new DrapoContext();
            await this.Application.ModelHandler.ResolveModel(context, null, el, null, sector, canBind, false);
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
            const elj: JQuery = $(el);
            await this.Application.ModelHandler.ResolveModel(context, null, el, elj, sector, canBind, false);
        } else if (canSubscribeDelay) {
            this.Application.Observer.SubscribeDelay(el, dataKey, dataFields);
        }
    }

    public async ResolveControlFlowMustacheAttributes(context: DrapoContext, elementJQuery: JQuery, sector: string): Promise<void> {
        //Attribute value
        await this.ResolveControlFlowMustacheAttribute(context, "value", elementJQuery, sector);
        //Attribute class
        await this.ResolveControlFlowMustacheAttribute(context, "class", elementJQuery, sector);
    }

    public async ResolveControlFlowMustacheNodes(context: DrapoContext, element: HTMLElement, elementJQuery: JQuery, sector: string): Promise<void> {
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
                const mustacheData = await this.Application.Solver.ResolveDataPath(context, elementJQuery, sector, mustacheParts, true);
                text = text.replace(mustache, mustacheData);
            }
            if (textOriginal !== text)
                childNode.nodeValue = text;
        }
    }

    public async ResolveControlFlowMustacheAttribute(context: DrapoContext, attribute: string, elementJQuery: JQuery, sector: string): Promise<void> {
        const jQueryResults: JQuery = elementJQuery.filter("[" + attribute + "*='{{']");
        if ((jQueryResults == null) || (jQueryResults.length == 0))
            return;
        for (let i = 0; i < jQueryResults.length; i++) {
            const el: HTMLElement = jQueryResults[i];
            let text: string = el.getAttribute(attribute);
            const mustaches = this.Application.Parser.ParseMustaches(text);
            for (let j = 0; j < mustaches.length; j++) {
                const mustache = mustaches[j];
                const mustacheParts: string[] = this.Application.Parser.ParseMustache(mustache);
                if (!context.CanResolve(mustacheParts[0]))
                    continue;
                const mustacheData = await this.Application.Solver.ResolveDataPath(context, elementJQuery, sector, mustacheParts, true);
                text = text.replace(mustache, mustacheData);
            }
            if (context.CanUpdateTemplate) {
                if (this.Application.Parser.HasMustache(text)) {
                    elementJQuery.attr(attribute, text);
                    continue;
                }
            }
            el.setAttribute(attribute, text);
        }
    }

    public async ResolveControlFlowMustacheStringFunction(sector: string, context: DrapoContext, renderContext: DrapoRenderContext, expression: string, elementJQuery: JQuery, canBind: boolean = true, type: DrapoStorageLinkType = DrapoStorageLinkType.Render): Promise<string> {
        //Replace Functions
        const expressionWithoutFunctions: string = await this.Application.FunctionHandler.ReplaceFunctionExpressions(sector, context, expression, canBind);
        //Resolve Mustaches
        return (this.ResolveControlFlowMustacheString(context, renderContext, expressionWithoutFunctions, elementJQuery, sector, canBind, type));
    }

    public async ResolveControlFlowMustacheString(context: DrapoContext, renderContext : DrapoRenderContext, expression: string, elementJQuery: JQuery, sector: string, canBind: boolean = true, type: DrapoStorageLinkType = DrapoStorageLinkType.Render, isForIterator: boolean = false, elementForTemplate: HTMLElement = null): Promise<string> {
        const mustaches = this.Application.Parser.ParseMustaches(expression);
        for (let j = 0; j < mustaches.length; j++) {
            const mustache = mustaches[j];
            const mustacheParts: string[] = this.Application.Parser.ParseMustache(mustache);
            const dataKey: string = this.Application.Solver.ResolveDataKey(mustacheParts);
            const dataFields: string[] = this.Application.Solver.ResolveDataFields(mustacheParts);
            if (this.Application.Storage.IsDataKey(dataKey, sector, renderContext)) {
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
                        const el: HTMLElement = elementJQuery != null ? elementJQuery[0] : null;
                        contextDataKey.Create(data, el, null, dataKey, dataKey, null, null);
                        this.Application.Binder.BindReader(contextDataKey.Item, el, dataFields);
                        if ((context.Item != null) && (dataKey !== context.Item.DataKey))
                            this.Application.Observer.SubscribeStorage(dataKey, dataFields, context.Item.DataKey, type);
                    }
                }
                expression = expression.replace(mustache, mustacheData);
            } else {
                //Context
                let mustacheData = context.Item === null ? '' : await this.Application.Solver.ResolveDataPath(context, elementJQuery, sector, mustacheParts, canBind);
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
        if (await this.Application.Barber.HasMustacheContext(elIF, sector))
            return;
        const context: DrapoContext = new DrapoContext();
        const elj: JQuery = $(el);
        const visibility: boolean = await this.Application.Solver.ResolveConditional(elIF, elj, sector, context);
        if (visibility)
            this.Application.Document.Show(elj);
        else
            this.Application.Document.Hide(elj);
    }

    public async HasMustacheContext(expression: string, sector: string, renderContext: DrapoRenderContext = null): Promise<boolean> {
        const mustaches = this.Application.Parser.ParseMustaches(expression, true);
        for (let j = 0; j < mustaches.length; j++) {
            const mustache = mustaches[j];
            const mustacheParts: string[] = this.Application.Parser.ParseMustache(mustache);
            const dataKey: string = this.Application.Solver.ResolveDataKey(mustacheParts);
            const isDataKey: boolean = await this.Application.Storage.IsDataKey(dataKey, sector, renderContext);
            if (!isDataKey)
                return (true);
        }
        return (false);
    }

    public async ResolveCloak(el: HTMLElement, canBind: boolean = true): Promise<void> {
        const elj: JQuery = $(el);
        const elCloak: string = el.getAttribute('d-cloak');
        if (elCloak == null)
            return;
        elj.removeClass(elCloak);
    }
}
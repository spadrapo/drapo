class DrapoModelHandler {
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

    public HasContentModelContext(content: string): boolean {
        return (content.indexOf('d-model') > -1);
    }

    public async ResolveOnModelChange(contextItem: DrapoContextItem, el: HTMLElement): Promise<void> {
        const onModel: string = el.getAttribute('d-on-model-change');
        if ((onModel === null) || (onModel === undefined))
            return;
        const sector: string = this.Application.Document.GetSector(el);
        await this.Application.FunctionHandler.ResolveFunction(sector, contextItem, null, null, onModel);
    }

    public async ResolveOnModelComplete(contextItem: DrapoContextItem, el: HTMLElement): Promise<void> {
        const onModel: string = el.getAttribute('d-on-model-complete');
        if ((onModel === null) || (onModel === undefined))
            return;
        const sector: string = this.Application.Document.GetSector(el);
        await this.Application.FunctionHandler.ResolveFunction(sector, contextItem, null, null, onModel);
    }

    public async ResolveModel(context: DrapoContext, renderContext: DrapoRenderContext, el: HTMLElement, sector: string, canBind: boolean, isContext: boolean = true): Promise<boolean> {
        const model: string = el.getAttribute('d-model');
        if (model == null)
            return (false);
        const isMustacheContext: boolean = this.Application.Barber.HasMustacheContext(model, sector, renderContext);
        if (isContext !== isMustacheContext)
            return;
        const isMustacheOnly: boolean = this.Application.Parser.IsMustacheOnly(model, true);
        const mustache: string = isMustacheOnly ? model : null;
        const mustacheParts: string[] = isMustacheOnly ? this.Application.Parser.ParseMustache(model) : null;
        const dataFields: string[] = isMustacheOnly ? this.Application.Solver.ResolveDataFields(mustacheParts) : null;
        //Initialize
        const onModelInitialize: string = el.getAttribute('d-on-model-initialize');
        if ((onModelInitialize !== null) && (onModelInitialize !== undefined) && (!await this.Application.Solver.ExistDataPath(context, sector, mustacheParts))) {
            await this.Application.FunctionHandler.ResolveFunction(sector, context.Item, null, null, onModelInitialize);
            if((!isContext) || (!context.CanUpdateTemplate))
                el.removeAttribute('d-on-model-initialize');
        }
        //Notify
        let canNotify: boolean = true;
        const modelNotify: string = el.getAttribute('d-modelNotify');
        if (modelNotify != null) {
            canNotify = modelNotify === 'true';
            if ((isContext) && (context.CanUpdateTemplate))
                el.removeAttribute('d-modelNotify');
        }
        const modelEvents: string[] = this.Application.Parser.ParseEvents(el.getAttribute('d-model-event'));
        if (modelEvents.length === 0)
            modelEvents.push('change');
        if ((isMustacheOnly) && (context.CanUpdateTemplate)) {
            const mustacheResolved: string = await this.Application.Solver.ResolveDataPathMustache(context, null, el, sector, mustacheParts);
            if (mustacheResolved !== null)
                el.setAttribute('d-model', mustacheResolved);
        }
        const modelOrValue: string = isMustacheOnly ? model : await this.ResolveValueExpression(context, el, sector, model, canBind);
        let updated: boolean = false;
        const tag: string = el.tagName.toLowerCase();
        if (tag === 'input')
            updated = await this.ResolveModelInput(context, el, sector, model, mustache, mustacheParts, dataFields, canBind, modelEvents, this.Application.Parser.ParseEvents(el.getAttribute('d-model-event-cancel')), canNotify);
        else if (tag === 'select')
            updated = await this.ResolveModelSelect(context, el, sector, model, mustache, mustacheParts, dataFields, canBind, modelEvents, canNotify);
        else if (tag === 'textarea')
            updated = await this.ResolveModelTextArea(context, el as HTMLTextAreaElement, sector, modelOrValue, mustache, mustacheParts, dataFields, canBind, modelEvents, this.Application.Parser.ParseEvents(el.getAttribute('d-model-event-cancel')), canNotify);
        else if (tag === 'span')
            updated = await this.ResolveModelSpan(context, el, sector, modelOrValue, mustache, mustacheParts, dataFields, canBind, ((isContext) && (!context.CanUpdateTemplate)));
        else if (tag === 'li')
            updated = await this.ResolveModelLI(context, el, sector, model, mustache, mustacheParts, dataFields, canBind);
        else if (tag === 'div')
            updated = true;
        else if (tag === 'label')
            updated = await this.ResolveModelSpan(context, el, sector, modelOrValue, mustache, mustacheParts, dataFields, canBind, ((isContext) && (!context.CanUpdateTemplate)));
        else if (tag === 'button')
            updated = await this.ResolveModelSpan(context, el, sector, modelOrValue, mustache, mustacheParts, dataFields, canBind, ((isContext) && (!context.CanUpdateTemplate)));
        else
            await this.Application.ExceptionHandler.HandleError('DrapoModelHandler - ResolveModel - model not supported in tag: {0}', tag);
        if ((updated) && (isContext)) {
            const canRemoveModel: boolean = ((!context.CanUpdateTemplate) || (context.IsInsideRecursion));
            const dataKey: string = isMustacheOnly ? this.Application.Solver.ResolveDataKey(mustacheParts) : null;
            if ((canRemoveModel) && ((!isMustacheOnly) || (dataKey === context.Item.Key)))
                el.removeAttribute('d-model');
        }
        return (updated);
    }

    public async ResolveValueExpression(context: DrapoContext, el: HTMLElement, sector: string, model: string, canBind: boolean): Promise<string> {
        if (canBind)
        {
            const mustaches: string[] = this.Application.Parser.ParseMustaches(model, true);
            for (let i: number = 0; i < mustaches.length; i++) {
                const mustache: string = mustaches[i];
                const mustacheParts: string[] = this.Application.Parser.ParseMustache(mustache);
                const dataKey: string = this.Application.Solver.ResolveDataKey(mustacheParts);
                const dataFields: string[] = this.Application.Solver.ResolveDataFields(mustacheParts);
                this.Application.Binder.BindReader(await this.Application.Solver.ResolveDataPathObjectItem(context.Item, dataKey, sector), el, dataFields);
            }
        }
        const executionContext: DrapoExecutionContext<any> = new DrapoExecutionContext<any>(this.Application);
        const value: any = await this.Application.FunctionHandler.ResolveFunctions(sector, context.Item, el, executionContext, model, false);
        const valueString: string = this.Application.Solver.EnsureString(value);
        if (valueString != model)
            return (await this.ResolveValueExpression(context, el, sector, valueString, canBind));
        return (valueString);
    }

    public async ResolveModelInput(context: DrapoContext, el: HTMLElement, sector: string, model: string, mustache: string, mustacheParts: string[], dataFields: string[], canBind: boolean, modelEvents: string[], modelEventsCancel: string[], canNotify: boolean): Promise<boolean> {
        const type: string = el.getAttribute('type');
        if (type == 'checkbox')
            return (this.ResolveModelInputCheckbox(context, el as HTMLInputElement, sector, model, mustache, mustacheParts, dataFields, canBind, modelEvents, canNotify));
        if (type == 'text')
            return (this.ResolveModelInputText(context, el, sector, model, mustache, mustacheParts, dataFields, canBind, modelEvents, modelEventsCancel, canNotify));
        if (type == 'number')
            return (this.ResolveModelInputNumber(context, el, sector, model, mustache, mustacheParts, dataFields, canBind, modelEvents, modelEventsCancel, canNotify));
        if (type == 'password')
            return (this.ResolveModelInputPassword(context, el, sector, model, mustache, mustacheParts, dataFields, canBind, modelEvents, modelEventsCancel, canNotify));
        if (type == 'hidden')
            return (this.ResolveModelInputHidden(context, el, sector, model, mustache, mustacheParts, dataFields, canBind, modelEvents, canNotify));
        if (type == 'range')
            return (this.ResolveModelInputRange(context, el, sector, model, mustache, mustacheParts, dataFields, canBind, modelEvents, canNotify));
        await this.Application.ExceptionHandler.HandleError('DrapoModelHandler - ResolveModelInput - model not supported in input type: {0}', type);
        return (false);
    }

    public async ResolveModelInputCheckbox(context: DrapoContext, element: HTMLInputElement, sector: string, model: string, mustache: string, mustacheParts: string[], dataFields: string[], canBind: boolean, modelEvents: string[], canNotify: boolean): Promise<boolean> {
        //Value
        const value: boolean = await this.Application.Solver.ResolveConditional(await this.Application.Solver.ResolveDataPath(context, null, element, sector, mustacheParts, canBind, canBind, modelEvents, null, canNotify));
        //Checked
        element.checked = value;
        return (true);
    }

    public async ResolveModelTextArea(context: DrapoContext, el: HTMLTextAreaElement, sector: string, model: string, mustache: string, mustacheParts: string[], dataFields: string[], canBind: boolean, modelEvents: string[], modelEventsCancel: string[], canNotify: boolean): Promise<boolean> {
        //Value
        const value: string = mustacheParts != null ? await this.Application.Solver.ResolveDataPath(context, null, el, sector, mustacheParts, canBind, canBind, modelEvents, modelEventsCancel, canNotify) : model;
        //Text
        el.value = value;
        return (true);
    }

    public async ResolveModelInputText(context: DrapoContext, element: HTMLElement, sector: string, model: string, mustache: string, mustacheParts: string[], dataFields: string[], canBind: boolean, modelEvents: string[], modelEventsCancel: string[], canNotify: boolean): Promise<boolean> {
        //Value
        const value: string = mustacheParts != null ? await this.Application.Solver.ResolveDataPath(context, null, element, sector, mustacheParts, canBind, canBind, modelEvents, modelEventsCancel, canNotify) : model;
        //Text
        const elementInput: HTMLInputElement = element as HTMLInputElement;
        if (elementInput.value !== value)
            elementInput.value = value;
        return (true);
    }

    public async ResolveModelInputNumber(context: DrapoContext, element: HTMLElement, sector: string, model: string, mustache: string, mustacheParts: string[], dataFields: string[], canBind: boolean, modelEvents: string[], modelEventsCancel: string[], canNotify: boolean): Promise<boolean> {
        //Value
        const value: string = await this.Application.Solver.ResolveDataPath(context, null, element, sector, mustacheParts, canBind, canBind, modelEvents, modelEventsCancel, canNotify);
        //Text
        const elementInput: HTMLInputElement = element as HTMLInputElement;
        if (elementInput.value !== value)
            elementInput.value = value;
        return (true);
    }

    public async ResolveModelInputPassword(context: DrapoContext, element: HTMLElement, sector: string, model: string, mustache: string, mustacheParts: string[], dataFields: string[], canBind: boolean, modelEvents: string[], modelEventsCancel: string[], canNotify: boolean): Promise<boolean> {
        //Value
        const value: string = await this.Application.Solver.ResolveDataPath(context, null, element, sector, mustacheParts, canBind, canBind, modelEvents, modelEventsCancel, canNotify);
        //Text
        const elementInput: HTMLInputElement = element as HTMLInputElement;
        elementInput.value = value;
        return (true);
    }

    public async ResolveModelInputHidden(context: DrapoContext, element: HTMLElement, sector: string, model: string, mustache: string, mustacheParts: string[], dataFields: string[], canBind: boolean, modelEvents: string[], canNotify: boolean): Promise<boolean> {
        //Value
        const value: string = await this.Application.Solver.ResolveDataPath(context, null, element, sector, mustacheParts, canBind, canBind, modelEvents, null, canNotify);
        //Text
        const elementInput: HTMLInputElement = element as HTMLInputElement;
        if (elementInput.value !== value)
            elementInput.value = value;
        return (true);
    }

    public async ResolveModelInputRange(context: DrapoContext, element: HTMLElement, sector: string, model: string, mustache: string, mustacheParts: string[], dataFields: string[], canBind: boolean, modelEvents: string[], canNotify: boolean): Promise<boolean> {
        //Value
        const value: string = await this.Application.Solver.ResolveDataPath(context, null, element, sector, mustacheParts, canBind, canBind, modelEvents, null, canNotify);
        //Text
        const elementInput: HTMLInputElement = element as HTMLInputElement;
        if (elementInput.value !== value)
            elementInput.value = value;
        return (true);
    }

    public async ResolveModelSelect(context: DrapoContext, element: HTMLElement, sector: string, model: string, mustache: string, mustacheParts: string[], dataFields: string[], canBind: boolean, modelEvents: string[], canNotify: boolean): Promise<boolean> {
        //Value
        const value: string = await this.Application.Solver.ResolveDataPath(context, null, element, sector, mustacheParts, canBind, canBind, modelEvents, null, canNotify);
        //Selected
        const elementSelect: HTMLSelectElement = element as HTMLSelectElement;
        if (elementSelect.value !== value)
            elementSelect.value = value;
        return (true);
    }

    private async ResolveModelSpan(context: DrapoContext, el: HTMLElement, sector: string, model: string, mustache: string, mustacheParts: string[], dataFields: string[], canBind: boolean, canClean : boolean): Promise<boolean> {
        let updated: boolean = true;
        const format: string = el.getAttribute("d-format");
        //Value
        let value: string = mustacheParts != null ? await this.Application.Solver.ResolveDataPath(context, null, el, sector, mustacheParts, canBind, false) : model;
        //We can still have delayed mustaches here. Lets transform them in non context d-model now
        if (this.Application.Parser.IsMustache(value)) {
            el.setAttribute('d-model', value);
            value = '';
            updated = false;
        } else if ((canClean) && (format != null)){
            el.removeAttribute('d-model');
        }
        //Format
        let valueFormatted = value;
        if (format != null) {
            if (canClean)
                el.removeAttribute('d-format');
            let formatResolved: string = format;
            while (this.Application.Parser.HasMustache(formatResolved))
                formatResolved = await this.Application.Barber.ResolveControlFlowMustacheString(context, null, null, formatResolved, el, sector, false);
            const culture: string = el.getAttribute("d-culture");
            let cultureResolved: string = culture;
            if (cultureResolved != null) {
                if (canClean)
                    el.removeAttribute('d-culture');
                while (this.Application.Parser.HasMustache(cultureResolved))
                    cultureResolved = await this.Application.Barber.ResolveControlFlowMustacheString(context, null, null, cultureResolved, el, sector, false);
            }
            const formatTimezone: string = el.getAttribute("d-format-timezone");
            if ((canClean) && (formatTimezone != null))
                el.removeAttribute('d-format-timezone');
            const applyTimezone: boolean = (formatTimezone != 'false');
            valueFormatted = this.Application.Formatter.Format(value, formatResolved, cultureResolved, applyTimezone);
        }
        //Selected
        const elementSpan: HTMLSpanElement = el as HTMLSpanElement;
        if (elementSpan.textContent !== valueFormatted)
            elementSpan.textContent = valueFormatted;
        return (updated);
    }

    public async ResolveModelLI(context: DrapoContext, el: HTMLElement, sector: string, model: string, mustache: string, mustacheParts: string[], dataFields: string[], canBind: boolean): Promise<boolean> {
        let updated: boolean = true;
        //Value
        let value: string = await this.Application.Solver.ResolveDataPath(context, null, el, sector, mustacheParts, canBind, false);
        //We can still have delayed mustaches here. Lets transform them in non context d-model now
        if (this.Application.Parser.IsMustache(value)) {
            el.setAttribute('d-model', value);
            value = '';
            updated = false;
        }
        //Selected
        const elementLI: HTMLLIElement = el as HTMLLIElement;
        if (elementLI.textContent !== value)
            elementLI.textContent = value;
        return (updated);
    }

}
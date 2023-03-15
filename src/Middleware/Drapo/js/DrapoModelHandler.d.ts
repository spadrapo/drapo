declare class DrapoModelHandler {
    private _application;
    get Application(): DrapoApplication;
    constructor(application: DrapoApplication);
    HasContentModelContext(content: string): boolean;
    ResolveOnModelChange(contextItem: DrapoContextItem, el: HTMLElement): Promise<void>;
    ResolveOnModelComplete(contextItem: DrapoContextItem, el: HTMLElement): Promise<void>;
    ResolveModel(context: DrapoContext, renderContext: DrapoRenderContext, el: HTMLElement, elj: JQuery, sector: string, canBind: boolean, isContext?: boolean): Promise<boolean>;
    ResolveValueExpression(context: DrapoContext, el: HTMLElement, sector: string, model: string, canBind: boolean): Promise<string>;
    ResolveModelInput(context: DrapoContext, el: HTMLElement, elementJQuery: JQuery, sector: string, model: string, mustache: string, mustacheParts: string[], dataFields: string[], canBind: boolean, modelEvents: string[], modelEventsCancel: string[], canNotify: boolean): Promise<boolean>;
    ResolveModelInputCheckbox(context: DrapoContext, element: HTMLElement, elementJQuery: JQuery, sector: string, model: string, mustache: string, mustacheParts: string[], dataFields: string[], canBind: boolean, modelEvents: string[], canNotify: boolean): Promise<boolean>;
    ResolveModelTextArea(context: DrapoContext, el: HTMLElement, sector: string, model: string, mustache: string, mustacheParts: string[], dataFields: string[], canBind: boolean, modelEvents: string[], modelEventsCancel: string[], canNotify: boolean): Promise<boolean>;
    ResolveModelInputText(context: DrapoContext, element: HTMLElement, elj: JQuery, sector: string, model: string, mustache: string, mustacheParts: string[], dataFields: string[], canBind: boolean, modelEvents: string[], modelEventsCancel: string[], canNotify: boolean): Promise<boolean>;
    ResolveModelInputNumber(context: DrapoContext, element: HTMLElement, elementJQuery: JQuery, sector: string, model: string, mustache: string, mustacheParts: string[], dataFields: string[], canBind: boolean, modelEvents: string[], modelEventsCancel: string[], canNotify: boolean): Promise<boolean>;
    ResolveModelInputPassword(context: DrapoContext, element: HTMLElement, elementJQuery: JQuery, sector: string, model: string, mustache: string, mustacheParts: string[], dataFields: string[], canBind: boolean, modelEvents: string[], modelEventsCancel: string[], canNotify: boolean): Promise<boolean>;
    ResolveModelInputHidden(context: DrapoContext, element: HTMLElement, elementJQuery: JQuery, sector: string, model: string, mustache: string, mustacheParts: string[], dataFields: string[], canBind: boolean, modelEvents: string[], canNotify: boolean): Promise<boolean>;
    ResolveModelInputRange(context: DrapoContext, element: HTMLElement, elementJQuery: JQuery, sector: string, model: string, mustache: string, mustacheParts: string[], dataFields: string[], canBind: boolean, modelEvents: string[], canNotify: boolean): Promise<boolean>;
    ResolveModelSelect(context: DrapoContext, element: HTMLElement, elementJQuery: JQuery, sector: string, model: string, mustache: string, mustacheParts: string[], dataFields: string[], canBind: boolean, modelEvents: string[], canNotify: boolean): Promise<boolean>;
    private ResolveModelSpan;
    ResolveModelLI(context: DrapoContext, el: HTMLElement, elj: JQuery, sector: string, model: string, mustache: string, mustacheParts: string[], dataFields: string[], canBind: boolean): Promise<boolean>;
}

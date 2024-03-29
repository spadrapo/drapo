declare class DrapoBarber {
    private _application;
    get Application(): DrapoApplication;
    constructor(application: DrapoApplication);
    HasContentMustacheNodesContext(content: string): boolean;
    HasContentMustacheAttributeContext(content: string): boolean;
    private HasContentMustacheAttributeContextMustache;
    ResolveMustaches(el?: HTMLElement, sector?: string, stopAtSectors?: boolean): Promise<void>;
    private ResolveMustachesInternal;
    private CanRender;
    ResolveFilter(el: HTMLElement, sector: string, canBind: boolean, dataKeyFilter: string, dataFieldFilter: string): Promise<void>;
    ResolveElementDelayed(el: HTMLElement, sector: string, dataKeyFilter?: string, dataFieldFilter?: string): Promise<void>;
    ResolveMustacheElementLeaf(el: HTMLElement, canUseModel?: boolean, canSubscribeDelay?: boolean, dataKeyFilter?: string, dataFieldFilter?: string): Promise<void>;
    ResolveModel(el: HTMLElement, canBind?: boolean, canSubscribeDelay?: boolean, dataKeyFilter?: string, dataFieldFilter?: string): Promise<void>;
    ResolveControlFlowMustacheAttributes(context: DrapoContext, element: HTMLElement, sector: string): Promise<void>;
    ResolveControlFlowMustacheNodes(context: DrapoContext, element: HTMLElement, sector: string): Promise<void>;
    ResolveControlFlowMustacheAttribute(context: DrapoContext, attribute: string, el: HTMLElement, sector: string): Promise<void>;
    ResolveControlFlowMustacheStringFunction(sector: string, context: DrapoContext, renderContext: DrapoRenderContext, executionContext: DrapoExecutionContext<any>, expression: string, element: HTMLElement, canBind?: boolean, type?: DrapoStorageLinkType): Promise<string>;
    ResolveControlFlowMustacheString(context: DrapoContext, renderContext: DrapoRenderContext, executionContext: DrapoExecutionContext<any>, expression: string, element: HTMLElement, sector: string, canBind?: boolean, type?: DrapoStorageLinkType, isForIterator?: boolean, elementForTemplate?: HTMLElement): Promise<string>;
    ResolveMustacheElementVisibility(el: HTMLElement, canBind?: boolean): Promise<void>;
    HasMustacheContext(expression: string, sector: string, renderContext?: DrapoRenderContext): boolean;
    private HasMustacheContextInternal;
    ResolveCloak(el: HTMLElement, canBind?: boolean): Promise<void>;
}

declare class DrapoControlFlow {
    private _application;
    get Application(): DrapoApplication;
    constructor(application: DrapoApplication);
    ResolveControlFlowDocument(): Promise<void>;
    ResolveControlFlowSector(el: HTMLElement, canResolveComponents?: boolean): Promise<void>;
    private ResolveControlFlowForParent;
    private ResolveControlFlowForRoot;
    ResolveControlFlowForElement(forElement: HTMLElement, isIncremental?: boolean, canUseDifference?: boolean, type?: DrapoStorageLinkType, canResolveComponents?: boolean): Promise<void>;
    ResolveControlFlowForArray(forElements: HTMLElement[], isIncremental?: boolean, canUseDifference?: boolean, type?: DrapoStorageLinkType, canResolveComponents?: boolean): Promise<void>;
    InitializeContext(context: DrapoContext, content: string): void;
    IsElementControlFlowTemplate(el: HTMLElement): boolean;
    private ResolveControlFlowForInternal;
    private ResolveControlFlowForIterationRender;
    private CanApplyConditional;
    private ResolveControlFlowForIterationRenderClass;
    IsControlFlowForIterationVisible(sector: string, context: DrapoContext, el: Element, renderContext: DrapoRenderContext): Promise<boolean>;
    private RemoveList;
    private RemoveListIndex;
    private IsControlFlowDataKeyIterator;
    private GetControlFlowDataKeyIterators;
    private GetElementHashTemplate;
    private GetElementHashValue;
    private GetTemplateVariables;
    private GetControlFlowExpressionsDataKey;
    private GetControlFlowConditionsDataKey;
    private CreateTemplateKey;
    private CreateTemplate;
    private GetTemplateFromTemplateKey;
    private AddTemplate;
    GetIteratorRange(iterator: string): DrapoRange;
    private GetIteratorRangeInternal;
    private GetIteratorRangeString;
    CleanIteratorRange(iterator: string): string;
    private IsValidRange;
    private IsValidRangeIndex;
    ApplyRange(data: any[], range: DrapoRange): any[];
    GetRangeIndex(data: any[], rangeIndex: string): number;
    private HasContextIterators;
    private GetContextIteratorsData;
    private GetContextItemByKey;
    ExecuteDataItem(sector: string, context: DrapoContext, expression: string, iterator: string, forText: string, ifText: string, all: boolean, datas: any[], dataKey: string, key: string, executionContext?: DrapoExecutionContext<any>): Promise<boolean>;
    ResolveControlFlowForViewportScroll(viewport: DrapoViewport): Promise<void>;
    private CreateControlFlowForViewportFragment;
}

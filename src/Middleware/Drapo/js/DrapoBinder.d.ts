/// <reference path="../typings/index.d.ts" />
declare class DrapoBinder {
    private _application;
    get Application(): DrapoApplication;
    constructor(application: DrapoApplication);
    BindReaderWriter(contextItem: DrapoContextItem, el: HTMLElement, dataFields: string[], eventTypes: string[], eventTypesCancel: string[], canNotify: boolean): void;
    BindReader(contextItem: DrapoContextItem, el: HTMLElement, dataFields: string[]): void;
    BindWriter(contextItem: DrapoContextItem, el: HTMLElement, dataFields: string[], eventTypes: string[], eventTypesCancel: string[], canNotify: boolean): void;
    BindWriterEvent(e: JQueryEventObject, eventType: string, eventFilter: string, contextItem: DrapoContextItem, el: HTMLElement, dataFields: string[], data: any, dataKey: string, index: number, canNotify: boolean): Promise<boolean>;
    BindIncremental(elj: JQuery, dataKey: string, sector: string, isIncremental: boolean): Promise<void>;
    BindIncrementalScroll(binder: JQuery, eventNamespace: string, eljParent: JQuery, dataKey: string, sector: string): Promise<boolean>;
    private GetEventValue;
    private GetEventValueInput;
    private GetParentElementWithScrollVertical;
    private IsElementScrollVisible;
    private HasElementVerticalScroll;
    IsElementScrollVerticalAlmostEnd(el: JQuery): boolean;
    UnbindControlFlowViewport(viewport: DrapoViewport): void;
    BindControlFlowViewport(viewport: DrapoViewport): void;
    BindControlFlowViewportScroll(viewport: DrapoViewport): Promise<void>;
}

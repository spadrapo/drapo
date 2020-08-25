/// <reference path="../typings/index.d.ts" />
declare class DrapoBinder {
    private _application;
    get Application(): DrapoApplication;
    constructor(application: DrapoApplication);
    BindReaderWriter(contextItem: DrapoContextItem, el: HTMLElement, dataFields: string[], eventTypes: string[], eventTypesCancel?: string[]): void;
    BindReader(contextItem: DrapoContextItem, el: HTMLElement, dataFields: string[]): void;
    BindWriter(contextItem: DrapoContextItem, el: HTMLElement, dataFields: string[], eventTypes: string[], eventTypesCancel: string[]): void;
    BindWriterEvent(e: JQueryEventObject, eventType: string, eventFilter: string, contextItem: DrapoContextItem, el: HTMLElement, dataFields: string[], data: any, dataKey: string, index: number): Promise<boolean>;
    BindIncremental(elj: JQuery, dataKey: string, sector: string, isIncremental: boolean): Promise<void>;
    BindIncrementalScroll(binder: JQuery, eventNamespace: string, eljParent: JQuery, dataKey: string, sector: string): Promise<boolean>;
    private GetEventValue;
    private GetEventValueInput;
    private GetParentElementWithScrollVertical;
    private IsElementScrollVisible;
    private HasElementVerticalScroll;
    IsElementScrollVerticalAlmostEnd(el: JQuery): boolean;
}

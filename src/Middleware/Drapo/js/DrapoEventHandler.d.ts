declare class DrapoEventHandler {
    private _application;
    private readonly _debounceDefault;
    private readonly _debounceDefaultClick;
    private readonly _debounce;
    private readonly _detach;
    get Application(): DrapoApplication;
    constructor(application: DrapoApplication);
    HasContentEventContext(content: string): boolean;
    CreateEventNamespace(el: HTMLElement, location: string, eventType: string, namespace: string): string;
    GetEventPropagation(el: HTMLElement, eventType: string): boolean;
    private RetrieveEventBinder;
    private IsLocationBody;
    GetElementParent(element: Element, levels?: number): JQuery;
    Attach(el: HTMLElement, renderContext: DrapoRenderContext): Promise<void>;
    AttachContext(context: DrapoContext, el: HTMLElement, elj: JQuery, sector: string, renderContext: DrapoRenderContext): Promise<void>;
    private ExecuteEvent;
    private IsEventTypeValid;
    private IsEventDelay;
    GetEventDebounce(el: HTMLElement, eventType: string): number;
    GetEventDetach(el: HTMLElement, eventType: string): string[];
    private HasEventDoubleClickInParent;
    private IsEventTypeKeyboard;
    IsValidEventFilter(e: Event, eventFilter: string): boolean;
    private IsValidEventFilterKeyboard;
    private GetKeyboardMapping;
    private RetrieveElementEvents;
}

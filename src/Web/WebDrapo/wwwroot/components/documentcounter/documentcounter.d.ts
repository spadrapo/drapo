/// <reference types="drapo" />
declare function documentcounterConstructor(el: HTMLElement, app: any): Promise<DocumentCounter>;
declare class DocumentCounter {
    private _el;
    private _app;
    private _counter;
    constructor(el: HTMLElement, app: DrapoApplication);
    Initalize(): Promise<void>;
    private HandleDocumentMouseUp;
}

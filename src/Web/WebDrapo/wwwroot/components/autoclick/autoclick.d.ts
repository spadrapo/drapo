declare function autoclickConstructor(el: HTMLElement, app: any): Promise<AutoClick>;
declare class AutoClick {
    private _el;
    private _app;
    private _sector;
    private _model;
    constructor(el: HTMLElement, app: any);
    Initalize(): Promise<void>;
    private GetElementButton;
}

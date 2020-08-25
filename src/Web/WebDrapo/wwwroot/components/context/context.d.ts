declare function contextConstructor(el: HTMLElement, app: any): Promise<Context>;
declare class Context {
    private _el;
    private _app;
    private _sector;
    private _model;
    constructor(el: HTMLElement, app: any);
    Initalize(): Promise<void>;
    private GetElementFor;
    private GetElementComponent;
}

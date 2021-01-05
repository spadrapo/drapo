declare function objectlistviewConstructor(el: HTMLElement, app: any): Promise<any>;
declare class ObjectListView {
    private _el;
    private _app;
    constructor(el: HTMLElement, app: any);
    Initalize(): Promise<void>;
}

declare function compositeConstructor(el: HTMLElement, app: any): Promise<Composite>;
declare class Composite {
    private _el;
    private _app;
    private _dataKeySource;
    private _sector;
    private _sectors;
    constructor(el: HTMLElement, app: any);
    Initalize(): Promise<void>;
    private GetElementItems;
    private GetCount;
    Render(): Promise<boolean>;
}

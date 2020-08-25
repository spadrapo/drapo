declare function labelcontextsectorConstructor(el: HTMLElement, app: any): Promise<LabelContextSector>;
declare class LabelContextSector {
    private _el;
    private _app;
    private _sector;
    private _model;
    constructor(el: HTMLElement, app: any);
    Initalize(): Promise<void>;
    private GetElementModel;
    private GetElementContent;
    Update(): Promise<void>;
}

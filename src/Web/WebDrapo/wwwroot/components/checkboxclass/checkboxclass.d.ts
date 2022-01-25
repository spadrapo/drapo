declare function checkboxclassConstructor(el: HTMLElement, app: any): Promise<any>;
declare class CheckboxClass {
    private _el;
    private _app;
    private _sector;
    private _notify;
    constructor(el: HTMLElement, app: any);
    Initalize(): Promise<void>;
}

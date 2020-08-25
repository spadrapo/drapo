declare function checkboxConstructor(el: HTMLElement, app: any): Promise<any>;
declare class Checkbox {
    private _el;
    private _app;
    constructor(el: HTMLElement, app: any);
    Initalize(): Promise<void>;
}

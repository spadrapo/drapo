declare function incrementConstructor(el: HTMLElement, app: any): Promise<Increment>;
declare class Increment {
    private _el;
    private _app;
    private _sector;
    constructor(el: HTMLElement, app: any);
    Initalize(): Promise<void>;
    Notify(): Promise<void>;
}

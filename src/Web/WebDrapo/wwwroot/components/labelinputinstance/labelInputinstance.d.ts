declare function labelinputinstanceConstructor(el: HTMLElement, app: any): Promise<LabelInputInstance>;
declare class LabelInputInstance {
    private _el;
    private _app;
    private _sector;
    constructor(el: HTMLElement, app: any);
    Initalize(): Promise<void>;
    Notify(): Promise<void>;
    Update(value: string): Promise<void>;
}

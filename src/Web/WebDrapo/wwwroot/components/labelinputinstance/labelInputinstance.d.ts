/// <reference types="drapo" />
declare function labelinputinstanceConstructor(el: HTMLElement, app: DrapoApplication): Promise<LabelInputInstance>;
declare class LabelInputInstance {
    private _el;
    private _app;
    private _sector;
    constructor(el: HTMLElement, app: DrapoApplication);
    Initalize(): Promise<void>;
    Notify(): Promise<void>;
    Update(value: string): Promise<void>;
}

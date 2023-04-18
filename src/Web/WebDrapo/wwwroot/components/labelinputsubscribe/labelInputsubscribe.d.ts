/// <reference types="drapo" />
declare function labelinputsubscribeConstructor(el: HTMLElement, app: DrapoApplication): Promise<LabelInputSubscribe>;
declare class LabelInputSubscribe {
    private _el;
    private _app;
    private _sector;
    constructor(el: HTMLElement, app: DrapoApplication);
    Initalize(): Promise<void>;
    Notify(): Promise<void>;
    Update(value: string): Promise<void>;
}

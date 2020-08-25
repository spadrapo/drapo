declare function labelinputsubscribeConstructor(el: HTMLElement, app: any): Promise<LabelInputSubscribe>;
declare class LabelInputSubscribe {
    private _el;
    private _app;
    private _sector;
    constructor(el: HTMLElement, app: any);
    Initalize(): Promise<void>;
    Notify(): Promise<void>;
    Update(value: string): Promise<void>;
}

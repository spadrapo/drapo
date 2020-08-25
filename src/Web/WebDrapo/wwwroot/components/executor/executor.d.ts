/// <reference types="drapo" />
declare function executorConstructor(el: HTMLElement, app: DrapoApplication): Promise<Executor>;
declare class Executor {
    private _el;
    private _app;
    private _sector;
    constructor(el: HTMLElement, app: DrapoApplication);
    Initalize(): Promise<void>;
    Increment(value: string): Promise<string>;
}

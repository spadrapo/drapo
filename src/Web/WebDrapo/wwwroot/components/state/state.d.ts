declare function stateConstructor(el: HTMLElement, app: any): Promise<State>;
declare class State {
    private _el;
    private _app;
    constructor(el: HTMLElement, app: any);
    Initalize(): Promise<void>;
}

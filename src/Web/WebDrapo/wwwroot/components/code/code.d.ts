/// <reference types="drapo" />
declare function codeConstructor(el: HTMLElement, app: DrapoApplication): Promise<Code>;
declare class Code {
    private _el;
    private _app;
    constructor(el: HTMLElement, app: DrapoApplication);
    Initalize(): Promise<void>;
    private GetElementContent;
    private GetElementCode;
}

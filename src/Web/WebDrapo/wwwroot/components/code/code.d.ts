declare function codeConstructor(el: HTMLElement, app: any): Promise<Code>;
declare class Code {
    private _el;
    private _app;
    constructor(el: HTMLElement, app: any);
    Initalize(): Promise<void>;
    private GetElementContent;
    private GetElementCode;
}

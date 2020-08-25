/// <reference types="drapo" />
declare function linkedcubeConstructor(el: HTMLElement, app: DrapoApplication): Promise<any>;
declare class LinkedCube {
    private _el;
    private _app;
    private _cube;
    constructor(el: HTMLElement, app: DrapoApplication);
    Initalize(): Promise<void>;
    private GetElementCube;
    Add(page: string, row: string, column: string, value: string): Promise<void>;
    Clear(): Promise<void>;
    Remove(page: string, row: string, column: string): Promise<void>;
    Render(): Promise<void>;
    private InsertNodeElement;
    private CreateNodeText;
    private CreateContextText;
    private HasError;
}

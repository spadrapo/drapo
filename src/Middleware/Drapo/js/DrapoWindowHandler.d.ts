declare class DrapoWindowHandler {
    private _application;
    private _windows;
    get Application(): DrapoApplication;
    constructor(application: DrapoApplication);
    CreateAndShowWindowDefinition(name: string, parameters: [string, string][]): Promise<void>;
    CreateAndShowWindow(uri: string, did: string, parameters: [string, string][], parametersDefault?: any): Promise<void>;
    private IsWindowLoaded;
    CloseWindow(did: string, all: boolean, type: string): Promise<void>;
    TryClose(window: DrapoWindow): Promise<void>;
    DestroyWindowElement(window: DrapoWindow): Promise<void>;
    HideWindow(did: string, all: boolean): Promise<DrapoWindow>;
    private GetWindowDefinition;
    GetWindowByElement(el: Element): DrapoWindow;
}

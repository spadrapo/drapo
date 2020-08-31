declare class DrapoViewportHandler {
    private _application;
    get Application(): DrapoApplication;
    constructor(application: DrapoApplication);
    CreateViewportControlFlow(el: HTMLElement, isContextRootFullExclusive: boolean, hasIf: boolean, hasRange: boolean): DrapoViewport;
    GetViewportControlFlowLength(viewport: DrapoViewport, length: number): number;
    UpdateHeightItem(viewport: DrapoViewport, elItem: HTMLElement): boolean;
    private GetElementStyleHeight;
    private GetElementClientHeight;
    private GetElementScrollViewport;
    private HasOverflowY;
    private IsOverflowEnabled;
}

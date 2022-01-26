declare class DrapoViewportHandler {
    private _application;
    private _viewportPropertyName;
    get Application(): DrapoApplication;
    constructor(application: DrapoApplication);
    CreateViewportControlFlow(sector: string, el: HTMLElement, elTemplate: HTMLElement, dataKey: string, key: string, dataKeyIteratorRange: string, data: any[]): DrapoViewport;
    GetElementViewport(el: HTMLElement): DrapoViewport;
    HasElementViewport(el: HTMLElement): boolean;
    CreateViewportControlFlowBallonBefore(viewport: DrapoViewport, lastInserted: JQuery): JQuery;
    private GetBallonBefore;
    private GetElementItemHeight;
    AppendViewportControlFlowBallonAfter(viewport: DrapoViewport, fragment: DocumentFragment): void;
    ActivateViewportControlFlow(viewport: DrapoViewport): void;
    GetViewportControlFlowStart(viewport: DrapoViewport, start: number): number;
    GetViewportControlFlowEnd(viewport: DrapoViewport, length: number): number;
    UpdateHeightItem(viewport: DrapoViewport, elItem: HTMLElement): boolean;
    private UpdateValues;
    private UpdateValuesBallon;
    UpdateElementsBallon(viewport: DrapoViewport): void;
    private GetElementHeightRect;
    private GetElementStyleHeight;
    private GetElementHeight;
    private GetScrollViewport;
    private HasOverflowY;
    private IsOverflowEnabled;
    GetView(viewport: DrapoViewport): [number, number, number, number, number, number];
    private GetViewFactorCurrent;
}

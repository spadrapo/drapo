declare class DrapoViewportHandler {
    private _application;
    get Application(): DrapoApplication;
    constructor(application: DrapoApplication);
    CreateViewportControlFlow(sector: string, el: HTMLElement, elTemplate: HTMLElement, dataKey: string, key: string, dataKeyIteratorRange: string, data: any[], isContextRootFullExclusive: boolean, hasIf: boolean, hasRange: boolean): DrapoViewport;
    CreateViewportControlFlowBallonBefore(viewport: DrapoViewport, lastInserted: JQuery): JQuery;
    AppendViewportControlFlowBallonAfter(viewport: DrapoViewport, fragment: DocumentFragment): void;
    GetViewportControlFlowStart(viewport: DrapoViewport, start: number): number;
    GetViewportControlFlowEnd(viewport: DrapoViewport, length: number): number;
    UpdateHeightItem(viewport: DrapoViewport, elItem: HTMLElement): boolean;
    private UpdateValues;
    private UpdateValuesBallon;
    UpdateElementsBallon(viewport: DrapoViewport): void;
    private GetElementStyleHeight;
    private GetElementClientHeight;
    private GetScrollViewport;
    private HasOverflowY;
    private IsOverflowEnabled;
    GetView(viewport: DrapoViewport): [number, number, number, number, number, number];
    private GetViewFactorCurrent;
}

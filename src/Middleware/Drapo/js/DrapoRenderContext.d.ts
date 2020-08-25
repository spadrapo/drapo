declare class DrapoRenderContext {
    private _sectorExpressionContexts;
    private _dataKeyElements;
    private GetKey;
    HasExpressionContext(sector: string, expression: string): boolean;
    AddExpressionContext(sector: string, expression: string, hasContext: boolean): void;
    HasDataKeyElement(dataKey: string): boolean;
    AddDataKeyElement(dataKey: string, hasElement: boolean): void;
}

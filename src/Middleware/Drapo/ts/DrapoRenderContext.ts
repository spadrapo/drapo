class DrapoRenderContext {
    private _sectorExpressionContexts: any = {};
    private _dataKeyElements: any = {};

    private GetKey(sector: string, expression: string) : string
    {
        return (sector + '_' + expression);
    }

    public HasExpressionContext(sector: string, expression: string): boolean
    {
        const key: string = this.GetKey(sector, expression);
        const value: any = this._sectorExpressionContexts[key];
        if (value == null)
            return (null);
        return (value as boolean);
    }

    public AddExpressionContext(sector: string, expression: string, hasContext: boolean): void {
        const key: string = this.GetKey(sector, expression);
        this._sectorExpressionContexts[key] = hasContext;
    }

    public HasDataKeyElement(dataKey: string): boolean {
        const value: any = this._dataKeyElements[dataKey];
        if (value == null)
            return (null);
        return (value as boolean);
    }

    public AddDataKeyElement(dataKey: string, hasElement: boolean): void {
        this._dataKeyElements[dataKey] = hasElement;
    }
}
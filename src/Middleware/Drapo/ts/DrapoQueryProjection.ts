class DrapoQueryProjection {
    private _source: string = null;
    private _column: string = null;
    private _alias: string = null;
    private _functionName: string = null;
    private _functionParameters: string[] = null;

    get Source(): string {
        return (this._source);
    }
    set Source(value: string) {
        this._source = value;
    }
    get Column(): string {
        return (this._column);
    }
    set Column(value: string) {
        this._column = value;
    }
    get Alias(): string {
        return (this._alias);
    }
    set Alias(value: string) {
        this._alias = value;
    }
    get FunctionName(): string {
        return (this._functionName);
    }
    set FunctionName(value: string) {
        this._functionName = value;
    }
    get FunctionParameters(): string[] {
        return (this._functionParameters);
    }
    set FunctionParameters(value: string[]) {
        this._functionParameters = value;
    }
}
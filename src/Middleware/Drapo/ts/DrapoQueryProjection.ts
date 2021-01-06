class DrapoQueryProjection {
    private _source: string = null;
    private _column: string = null;
    private _alias: string = null;

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
}
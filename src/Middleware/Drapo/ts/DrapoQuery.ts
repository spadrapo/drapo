class DrapoQuery {
    private _error: string = null;
    private _projections: DrapoQueryProjection[] = [];
    private _sources: DrapoQuerySource[] = [];

    get Error(): string {
        return (this._error);
    }
    set Error(value: string) {
        this._error = value;
    }
    get Projections(): DrapoQueryProjection[] {
        return (this._projections);
    }
    set Projections(value: DrapoQueryProjection[]) {
        this._projections = value;
    }
    get Sources(): DrapoQuerySource[] {
        return (this._sources);
    }
    set Sources(value: DrapoQuerySource[]) {
        this._sources = value;
    }
}
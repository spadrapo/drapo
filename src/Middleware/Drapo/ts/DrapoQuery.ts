class DrapoQuery {
    private _error: string = null;
    private _projections: DrapoQueryProjection[] = [];
    private _sources: DrapoQuerySource[] = [];
    private _filter: DrapoQueryCondition = null;
    private _outputArray: string = null;

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

    get Filter(): DrapoQueryCondition {
        return (this._filter);
    }

    set Filter(value: DrapoQueryCondition) {
        this._filter = value;
    }

    get OutputArray(): string {
        return (this._outputArray);
    }

    set OutputArray(value: string) {
        this._outputArray = value;
    }
}
class DrapoQuery {
    private _error: string = null;
    private _projections: DrapoQueryProjection[] = [];
    private _sources: DrapoQuerySource[] = [];
    private _filter: DrapoQueryCondition = null;
    private _sorts: DrapoQuerySort[] = null;
    private _outputArray: string = null;
    private _options: DrapoQueryOptions = null;
    private _distinct: boolean = false;

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

    get Sorts(): DrapoQuerySort[] {
        return (this._sorts);
    }

    set Sorts(value: DrapoQuerySort[]) {
        this._sorts = value;
    }

    get OutputArray(): string {
        return (this._outputArray);
    }

    set OutputArray(value: string) {
        this._outputArray = value;
    }

    get Options(): DrapoQueryOptions {
        return (this._options);
    }

    set Options(value: DrapoQueryOptions) {
        this._options = value;
    }

    get Distinct(): boolean {
        return (this._distinct);
    }

    set Distinct(value: boolean) {
        this._distinct = value;
    }
}
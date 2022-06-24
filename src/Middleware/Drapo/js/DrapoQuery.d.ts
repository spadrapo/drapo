declare class DrapoQuery {
    private _error;
    private _projections;
    private _sources;
    private _filter;
    private _sorts;
    private _outputArray;
    get Error(): string;
    set Error(value: string);
    get Projections(): DrapoQueryProjection[];
    set Projections(value: DrapoQueryProjection[]);
    get Sources(): DrapoQuerySource[];
    set Sources(value: DrapoQuerySource[]);
    get Filter(): DrapoQueryCondition;
    set Filter(value: DrapoQueryCondition);
    get Sorts(): DrapoQuerySort[];
    set Sorts(value: DrapoQuerySort[]);
    get OutputArray(): string;
    set OutputArray(value: string);
}

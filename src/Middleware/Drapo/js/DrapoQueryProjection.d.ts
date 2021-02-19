declare class DrapoQueryProjection {
    private _source;
    private _column;
    private _alias;
    private _aggregation;
    get Source(): string;
    set Source(value: string);
    get Column(): string;
    set Column(value: string);
    get Alias(): string;
    set Alias(value: string);
    get Aggregation(): string;
    set Aggregation(value: string);
}

declare class DrapoQueryCondition {
    private _sourceLeft;
    private _columnLeft;
    private _comparator;
    private _sourceRight;
    private _columnRight;
    get SourceLeft(): string;
    set SourceLeft(value: string);
    get ColumnLeft(): string;
    set ColumnLeft(value: string);
    get Comparator(): string;
    set Comparator(value: string);
    get SourceRight(): string;
    set SourceRight(value: string);
    get ColumnRight(): string;
    set ColumnRight(value: string);
    Clone(): DrapoQueryCondition;
}

declare class DrapoQueryCondition {
    private _sourceLeft;
    private _columnLeft;
    private _valueLeft;
    private _comparator;
    private _sourceRight;
    private _columnRight;
    private _valueRight;
    private _isNullRight;
    get SourceLeft(): string;
    set SourceLeft(value: string);
    get ColumnLeft(): string;
    set ColumnLeft(value: string);
    get ValueLeft(): string;
    set ValueLeft(value: string);
    get Comparator(): string;
    set Comparator(value: string);
    get SourceRight(): string;
    set SourceRight(value: string);
    get ColumnRight(): string;
    set ColumnRight(value: string);
    get ValueRight(): string;
    set ValueRight(value: string);
    get IsNullRight(): boolean;
    set IsNullRight(value: boolean);
    Clone(): DrapoQueryCondition;
}

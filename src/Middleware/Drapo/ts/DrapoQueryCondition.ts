class DrapoQueryCondition {
    private _sourceLeft: string = null;
    private _columnLeft: string = null;
    private _valueLeft: string = null;
    private _comparator: string = null;
    private _sourceRight: string = null;
    private _columnRight: string = null;
    private _valueRight: string = null;
    private _isNullRight: boolean = false;
    private _isSearchStartRight: boolean = false;
    private _isSearchEndRight: boolean = false;

    get SourceLeft(): string {
        return (this._sourceLeft);
    }
    set SourceLeft(value: string) {
        this._sourceLeft = value;
    }
    get ColumnLeft(): string {
        return (this._columnLeft);
    }
    set ColumnLeft(value: string) {
        this._columnLeft = value;
    }
    get ValueLeft(): string {
        return (this._valueLeft);
    }
    set ValueLeft(value: string) {
        this._valueLeft = value;
    }
    get Comparator(): string {
        return (this._comparator);
    }
    set Comparator(value: string) {
        this._comparator = value;
    }
    get SourceRight(): string {
        return (this._sourceRight);
    }
    set SourceRight(value: string) {
        this._sourceRight = value;
    }
    get ColumnRight(): string {
        return (this._columnRight);
    }
    set ColumnRight(value: string) {
        this._columnRight = value;
    }
    get ValueRight(): string {
        return (this._valueRight);
    }
    set ValueRight(value: string) {
        this._valueRight = value;
    }
    get IsNullRight(): boolean {
        return (this._isNullRight);
    }
    set IsNullRight(value: boolean) {
        this._isNullRight = value;
    }

    get IsSearchStartRight(): boolean {
        return (this._isSearchStartRight);
    }
    set IsSearchStartRight(value: boolean) {
        this._isSearchStartRight = value;
    }

    get IsSearchEndRight(): boolean {
        return (this._isSearchEndRight);
    }
    set IsSearchEndRight(value: boolean) {
        this._isSearchEndRight = value;
    }

    public Clone(): DrapoQueryCondition {
        const clone: DrapoQueryCondition = new DrapoQueryCondition();
        clone.SourceLeft = this.SourceLeft;
        clone.ColumnLeft = this.ColumnLeft;
        clone.ValueLeft = this.ValueLeft;
        clone.Comparator = this.Comparator;
        clone.SourceRight = this.SourceRight;
        clone.ColumnRight = this.ColumnRight;
        clone.ValueRight = this.ValueRight;
        clone.IsNullRight = this.IsNullRight;
        clone.IsSearchStartRight = this.IsSearchStartRight;
        clone.IsSearchEndRight = this.IsSearchEndRight;
        return (clone);
    }
}
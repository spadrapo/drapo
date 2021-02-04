class DrapoQueryCondition {
    private _sourceLeft: string = null;
    private _columnLeft: string = null;
    private _comparator: string = null;
    private _sourceRight: string = null;
    private _columnRight: string = null;

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

    public Clone(): DrapoQueryCondition {
        const clone: DrapoQueryCondition = new DrapoQueryCondition();
        clone.SourceLeft = this.SourceLeft;
        clone.ColumnLeft = this.ColumnLeft;
        clone.Comparator = this.Comparator;
        clone.SourceRight = this.SourceRight;
        clone.ColumnRight = this.ColumnRight;
        return (clone);
    }
}
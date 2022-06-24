class DrapoQuerySort {
    private _column: string = null;
    private _type: string = null;
    get Column(): string {
        return (this._column);
    }
    set Column(value: string) {
        this._column = value;
    }
    get Type(): string {
        return (this._type);
    }
    set Type(value: string) {
        this._type = value;
    }
}
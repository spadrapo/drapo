class DrapoQueryOptions {
    private _list: string = null;
    get List(): string {
        return (this._list);
    }
    set List(value: string) {
        this._list = value;
    }
}
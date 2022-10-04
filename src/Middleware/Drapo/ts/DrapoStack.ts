class DrapoStack {
    private _data: any[] = [];

    public Peek(): any{
        if (this._data.length == 0)
            return (null);
        return (this._data[this._data.length - 1]);
    }

    public Push(item: any): void {
        this._data.push(item);
    }

    public Pop(): any {
        const item: any = this._data.pop(); 
        return (item ?? null);
    } 
}
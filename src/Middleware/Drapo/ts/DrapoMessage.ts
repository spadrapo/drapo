class DrapoMessage {
    //Fields
    private _action: string = null;
    private _dataKey: string = null;
    private _sector: string = null;
    private _tag: string = null;
    private _data: any = null;

    //Properties
    get Action(): string {
        return (this._action);
    }
    set Action(value: string) {
        this._action = value;
    }

    get DataKey(): string {
        return (this._dataKey);
    }
    set DataKey(value: string) {
        this._dataKey = value;
    }

    get Sector(): string {
        return (this._sector);
    }
    set Sector(value: string) {
        this._sector = value;
    }

    get Tag(): string {
        return (this._tag);
    }
    set Tag(value: string) {
        this._tag = value;
    }

    get Data(): any {
        return (this._data);
    }
    set Data(value: any) {
        this._data = value;
    }
}
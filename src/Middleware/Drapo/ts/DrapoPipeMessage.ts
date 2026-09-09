class DrapoPipeMessage {
    //Fields
    private _type: DrapoPipeMessageType = null;
    private _data: string = null;
    private _sector: string = null;

    //Properties
    get Type(): DrapoPipeMessageType {
        return (this._type);
    }
    set Type(value: DrapoPipeMessageType) {
        this._type = value;
    }
    get Data(): string {
        return (this._data);
    }
    set Data(value: string) {
        this._data = value;
    }
    get Sector(): string {
        return (this._sector);
    }
    set Sector(value: string) {
        this._sector = value;
    }
}
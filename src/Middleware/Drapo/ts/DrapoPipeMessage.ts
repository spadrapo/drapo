class DrapoPipeMessage {
    //Fields
    private _type: DrapoPipeMessageType = null;
    private _data: string = null;

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
}
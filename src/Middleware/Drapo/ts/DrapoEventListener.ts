class DrapoEventListener {
    private _eventType: string = null;
    private _eventNamespace: string = null;
    private _function: Function = null;
    get EventType(): string {
        return (this._eventType);
    }
    set EventType(value: string) {
        this._eventType = value;
    }
    get EventNamespace(): string {
        return (this._eventNamespace);
    }
    set EventNamespace(value: string) {
        this._eventNamespace = value;
    }
    get Function(): Function {
        return (this._function);
    }
    set Function(value: Function) {
        this._function = value;
    }
    //Constructors
    constructor() {
    }
}
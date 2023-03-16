declare class DrapoEventListener {
    private _eventType;
    private _eventNamespace;
    private _function;
    get EventType(): string;
    set EventType(value: string);
    get EventNamespace(): string;
    set EventNamespace(value: string);
    get Function(): Function;
    set Function(value: Function);
    constructor();
}

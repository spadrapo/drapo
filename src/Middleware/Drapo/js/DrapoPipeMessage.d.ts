declare class DrapoPipeMessage {
    private _type;
    private _data;
    get Type(): DrapoPipeMessageType;
    set Type(value: DrapoPipeMessageType);
    get Data(): string;
    set Data(value: string);
}

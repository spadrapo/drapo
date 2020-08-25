declare class DrapoMessage {
    private _action;
    private _dataKey;
    private _sector;
    private _tag;
    private _data;
    get Action(): string;
    set Action(value: string);
    get DataKey(): string;
    set DataKey(value: string);
    get Sector(): string;
    set Sector(value: string);
    get Tag(): string;
    set Tag(value: string);
    get Data(): any;
    set Data(value: any);
}

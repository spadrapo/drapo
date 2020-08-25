declare class DrapoRange {
    private _start;
    private _end;
    get Start(): string;
    set Start(value: string);
    get End(): string;
    set End(value: string);
    constructor(start?: string, end?: string);
}

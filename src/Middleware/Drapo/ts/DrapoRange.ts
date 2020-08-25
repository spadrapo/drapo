class DrapoRange {
    private _start: string = null;
    private _end: string = null;
    get Start(): string {
        return (this._start);
    }
    set Start(value: string) {
        this._start = value;
    }
    get End(): string {
        return (this._end);
    }
    set End(value: string) {
        this._end = value;
    }
    //Constructors
    constructor(start : string = null, end: string = null) {
        this._start = start;
        this._end = end;
    }
}
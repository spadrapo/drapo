class DrapoView {
    private _name: string = null;
    private _tag: string = null;
    private _condition: string = null;

    get Name(): string {
        return (this._name);
    }

    set Name(value: string) {
        this._name = value;
    }

    get Tag(): string {
        return (this._tag);
    }

    set Tag(value: string) {
        this._tag = value;
    }

    get Condition(): string {
        return (this._condition);
    }

    set Condition(value: string) {
        this._condition = value;
    }
}
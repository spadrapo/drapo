class DrapoRegularExpressionItem {
    private _expression: string;
    private _name: string;
    private _value: string;

    get Expression(): string {
        return (this._expression);
    }
    set Expression(value: string) {
        this._expression = value;
    }
    get Name(): string {
        return (this._name);
    }
    set Name(value: string) {
        this._name = value;
    }
    get Value(): string {
        return (this._value);
    }
    set Value(value: string) {
        this._value = value;
    }
}
class DrapoFunction
{
    //Fields
    private _name: string = null;
    private _parameters: string[] = [];

    //Properties
    get Name(): string
    {
        return (this._name);
    }
    set Name(value: string)
    {
        this._name = value;
    }
    get Parameters(): string[] {
        return (this._parameters);
    }
    set Parameters(value: string[]) {
        this._parameters = value;
    }
}
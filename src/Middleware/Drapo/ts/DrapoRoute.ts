class DrapoRoute {
    private _uri: string = null;
    private _expression: string = null;
    private _beforeLoadExpression: string = null;
    private _afterLoadExpression: string = null;

    get Uri(): string {
        return (this._uri);
    }
    set Uri(value: string) {
        this._uri = value;
    }

    get Expression(): string {
        return (this._expression);
    }
    set Expression(value: string) {
        this._expression = value;
    }

    get BeforeLoadExpression(): string {
        return (this._beforeLoadExpression);
    }
    set BeforeLoadExpression(value: string) {
        this._beforeLoadExpression = value;
    }

    get AfterLoadExpression(): string {
        return (this._afterLoadExpression);
    }
    set AfterLoadExpression(value: string) {
        this._afterLoadExpression = value;
    }
}
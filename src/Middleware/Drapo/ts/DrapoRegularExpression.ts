class DrapoRegularExpression {
    private _expression: string;
    private _items: DrapoRegularExpressionItem[] = [];

    get Expression(): string {
        return (this._expression);
    }
    set Expression(value: string) {
        this._expression = value;
    }

    get Items(): DrapoRegularExpressionItem[] {
        return (this._items);
    }

    public CreateItem(expression: string, name: string = null): DrapoRegularExpressionItem {
        const item: DrapoRegularExpressionItem = new DrapoRegularExpressionItem();
        item.Expression = expression;
        item.Name = name;
        this._items.push(item);
        return (item);
    }

    public IsValid(value: string): boolean {
        const regex: RegExp = new RegExp(this.Expression);
        if (!regex.test(value))
            return (false);
        let valueCurrent: string = value;
        for (let i: number = 0; i < this._items.length; i++)
        {
            const item: DrapoRegularExpressionItem = this._items[i];
            const match : RegExpMatchArray = valueCurrent.match(item.Expression);
            if (match == null)
                return (null);
            const matchValue : string = match[0];
            if (valueCurrent.indexOf(matchValue) != 0)
                return (null);
            item.Value = matchValue;
            valueCurrent = valueCurrent.substring(matchValue.length);
        }
        return (true);
    }

    public GetValue(name: string): string{
        for (let i: number = 0; i < this._items.length; i++)
        {
            const item: DrapoRegularExpressionItem = this._items[i];
            if (item.Name === name)
                return (item.Value);
        }
        return (null);
    }
}
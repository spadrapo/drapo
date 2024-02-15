class DrapoExpressionItem {
    //Fields
    private _type: DrapoExpressionItemType;
    private _value: string = '';
    private _items: DrapoExpressionItem[] = [];

    //Properties
    get Type(): DrapoExpressionItemType {
        return (this._type);
    }
    set Type(value: DrapoExpressionItemType) {
        this._type = value;
    }
    get Value(): string {
        return (this._value);
    }
    set Value(value: string) {
        if ((value != null) && (value.length > 1) && (value[0] === "'") && (value[value.length - 1] === "'"))
            this._value = value.substring(1,value.length - 1);
        else if ((value != null) && (value.length > 1) && (value[0] === '"') && (value[value.length - 1] === '"'))
            this._value = value.substring(1, value.length - 1);
        else
            this._value = value;
    }
    get Items(): DrapoExpressionItem[] {
        return (this._items);
    }
    set Items(value: DrapoExpressionItem[]) {
        this._items = value;
    }

    //Constructor
    constructor(type: DrapoExpressionItemType, value : string = '') {
        this._type = type;
        this.Value = value;
    }

    public GetItemIndex(value: string): number
    {
        for (let i: number = 0; i < this._items.length; i++)
            if (this._items[i].Value === value)
                return (i);
        return (null);
    }

    public CreateBlock(startingIndex: number, endingIndex: number): DrapoExpressionItem {
        const block: DrapoExpressionItem = new DrapoExpressionItem(DrapoExpressionItemType.Block);
        for (let i: number = startingIndex; i <= endingIndex; i++)
            block.Items.push(this.Items[i]);
        return (block);
    }
}
declare class DrapoExpressionItem {
    private _type;
    private _value;
    private _items;
    get Type(): DrapoExpressionItemType;
    set Type(value: DrapoExpressionItemType);
    get Value(): string;
    set Value(value: string);
    get Items(): DrapoExpressionItem[];
    set Items(value: DrapoExpressionItem[]);
    constructor(type: DrapoExpressionItemType, value?: string);
    GetItemIndex(value: string): number;
}

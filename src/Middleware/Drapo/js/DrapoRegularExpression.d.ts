declare class DrapoRegularExpression {
    private _expression;
    private _items;
    get Expression(): string;
    set Expression(value: string);
    get Items(): DrapoRegularExpressionItem[];
    CreateItem(expression: string, name?: string): DrapoRegularExpressionItem;
    IsValid(value: string): boolean;
    GetValue(name: string): string;
}

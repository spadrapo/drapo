class DrapoDrag {
    //Field
    private _code: string;
    private _action: string;
    private _contextItem: DrapoContextItem;
    private _tags: string[];
    private _notify: boolean;
    private _onBefore: string;
    private _onAfter: string;
    private _dataKey: string;
    private _sector: string;
    private _custom: string;

    //Properties
    get Code(): string {
        return (this._code);
    }
    set Code(value: string) {
        this._code = value;
    }

    get Action(): string {
        return (this._action);
    }
    set Action(value: string) {
        this._action = value;
    }

    get Item(): DrapoContextItem {
        return (this._contextItem);
    }
    set Item(value: DrapoContextItem) {
        this._contextItem = value;
    }

    get Tags(): string[] {
        return (this._tags);
    }
    set Tags(value: string[]) {
        this._tags = value;
    }

    get Notify(): boolean {
        return (this._notify);
    }
    set Notify(value: boolean) {
        this._notify = value;
    }

    get OnBefore(): string {
        return (this._onBefore);
    }
    set OnBefore(value: string) {
        this._onBefore = value;
    }

    get OnAfter(): string {
        return (this._onAfter);
    }
    set OnAfter(value: string) {
        this._onAfter = value;
    }

    get DataKey(): string {
        return (this._dataKey);
    }
    set DataKey(value: string) {
        this._dataKey = value;
    }

    get Sector(): string {
        return (this._sector);
    }
    set Sector(value: string) {
        this._sector = value;
    }

    get Custom(): string {
        return (this._custom);
    }
    set Custom(value: string) {
        this._custom = value;
    }

    //Constructors
    constructor() {
        this._action = 'move';
        this._tags = [];
    }

    public IsMatch(tags: string[]): boolean
    {
        for (let i: number = 0; i < tags.length; i++)
        {
            const tag: string = tags[i];
            for (let j: number = 0; j < this._tags.length; j++)
            {
                if (this._tags[j] === tag)
                    return (true);
            }
        }
        return (false);
    }
}
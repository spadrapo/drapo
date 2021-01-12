class DrapoContextItem {
    //Fields
    private _context: DrapoContext = null;
    private _parent: DrapoContextItem = null;
    private _children: DrapoContextItem[] = [];
    private _data: any = null;
    private _dataKey: string = null;
    private _key: string = null;
    private _iterator: string = null;
    private _index: number = null;
    private _element: HTMLElement = null;
    private _elementForTemplate: HTMLElement = null;
    private _elementOld: HTMLElement = null;
    //Properties
    get Context(): DrapoContext {
        return (this._context);
    }
    get Parent(): DrapoContextItem {
        return (this._parent);
    }
    get Children(): DrapoContextItem[] {
        return (this._children);
    }

    get Data(): any {
        return (this._data);
    }
    set Data(value: any) {
        this._data = value;
    }

    get DataKey(): string {
        return (this._dataKey);
    }
    set DataKey(value: string) {
        this._dataKey = value;
    }

    get Key(): string {
        return (this._key);
    }
    set Key(value: string) {
        this._key = value;
    }

    get Iterator(): string {
        return (this._iterator);
    }
    set Iterator(value: string) {
        this._iterator = value;
    }

    get Index(): number {
        return (this._index);
    }
    set Index(value: number) {
        this._index = value;
    }

    get Element(): HTMLElement {
        return (this._element);
    }
    set Element(value: HTMLElement) {
        this._element = value;
    }

    get ElementForTemplate(): HTMLElement {
        return (this._elementForTemplate);
    }
    set ElementForTemplate(value: HTMLElement) {
        this._elementForTemplate = value;
    }

    get ElementOld(): HTMLElement {
        return (this._elementOld);
    }
    set ElementOld(value: HTMLElement) {
        this._elementOld = value;
    }

    get RootItem(): DrapoContextItem {
        if (this.Parent != null)
            return (this.Parent.RootItem);
        return (this);
    }

    get RootElement(): HTMLElement {
        return (this.RootItem.Element);
    }

    //Constructor
    constructor(context: DrapoContext, parent: DrapoContextItem = null) {
        this._context = context;
        this._parent = parent;
    }
}
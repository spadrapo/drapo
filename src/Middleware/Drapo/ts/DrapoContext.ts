class DrapoContext {
    //Fields
    private _sector: string = null;
    private _itemsRoot: DrapoContextItem[] = [];
    private _items: DrapoContextItem[] = this._itemsRoot;
    private _itemParent: DrapoContextItem = null;
    private _itemCurrent: DrapoContextItem = null;
    private _itemCurrentStack: DrapoContextItem[] = [];
    private _index: number = -1;
    private _level: number = 0;
    private _indexRelatives: number[] = [];
    private _indexRelative: number = -1;
    private _checkpoint: boolean = false;
    private _checkMustacheNodes: boolean = false;
    private _checkMustacheAttributes: boolean = false;
    private _checkModel: boolean = false;
    private _checkID: boolean = false;
    private _checkAttribute: boolean = false;
    private _checkClass: boolean = false;
    private _checkEvent: boolean = false;
    private _checkBehavior: boolean = false;
    private _checkComponent: boolean = false;
    private _checkValidation: boolean = false;
    private _canUpdateTemplate: boolean = false;
    private _templateKeys: string[] = [];
    private _templateDatas: JQuery[] = [];
    //Properties
    set Sector(value: string) {
        this._sector = value;
    }

    get Sector(): string {
        return (this._sector);
    }

    get Item(): DrapoContextItem {
        return (this._itemCurrent);
    }

    get Index(): number {
        return (this._index);
    }

    get IsEmpty(): boolean {
        return (this._index === -1);
    }

    get IndexRelative(): number {
        return (this._indexRelative);
    }

    get Level(): number {
        return (this._level);
    }

    get IsInsideRecursion(): boolean {
        return (this._level > 0);
    }

    set CheckMustacheNodes(value: boolean) {
        this._checkMustacheNodes = value;
    }

    get CheckMustacheNodes(): boolean {
        return ((!this._checkpoint) || (this._checkMustacheNodes));
    }

    set CheckMustacheAttributes(value: boolean) {
        this._checkMustacheAttributes = value;
    }

    get CheckMustacheAttributes(): boolean {
        return ((!this._checkpoint) || (this._checkMustacheAttributes));
    }

    set CheckModel(value: boolean) {
        this._checkModel = value;
    }

    get CheckModel(): boolean {
        return ((!this._checkpoint) || (this._checkModel));
    }

    set CheckID(value: boolean) {
        this._checkID = value;
    }

    get CheckID(): boolean {
        return ((!this._checkpoint) || (this._checkID));
    }

    set CheckAttribute(value: boolean) {
        this._checkAttribute = value;
    }

    get CheckAttribute(): boolean {
        return ((!this._checkpoint) || (this._checkAttribute));
    }

    set CheckClass(value: boolean) {
        this._checkClass = value;
    }

    get CheckClass(): boolean {
        return ((!this._checkpoint) || (this._checkClass));
    }

    set CheckEvent(value: boolean) {
        this._checkEvent = value;
    }

    get CheckEvent(): boolean {
        return (((!this._checkpoint) || (this._checkEvent)) && (!this.CanUpdateTemplate));
    }

    set CheckBehavior(value: boolean) {
        this._checkBehavior = value;
    }

    get CheckBehavior(): boolean {
        return (((!this._checkpoint) || (this._checkBehavior)) && (!this.CanUpdateTemplate));
    }

    set CheckComponent(value: boolean) {
        this._checkComponent = value;
    }

    get CheckComponent(): boolean {
        return (((!this._checkpoint) || (this._checkComponent)) && (!this.CanUpdateTemplate));
    }

    set CheckValidation(value: boolean) {
        this._checkValidation = value;
    }

    get CheckValidation(): boolean {
        return (((!this._checkpoint) || (this._checkValidation)) && (!this.CanUpdateTemplate));
    }

    get CanUpdateTemplate(): boolean {
        return (this._canUpdateTemplate);
    }

    set CanUpdateTemplate(value: boolean) {
        this._canUpdateTemplate = value;
    }

    //Constructor
    constructor(item: DrapoContextItem = null) {
        if (item != null) {
            this._items.push(item);
            this._itemCurrent = item;
        }
    }

    public Create(data: any, element: HTMLElement, elementForTemplate: HTMLElement, dataKey: string, key: string, iterator: string, index: number, elementOld: HTMLElement = null): DrapoContextItem {
        const item: DrapoContextItem = new DrapoContextItem(this, this._itemParent);
        item.Data = data;
        item.Element = element;
        item.ElementForTemplate = elementForTemplate;
        item.ElementOld = elementOld;
        item.DataKey = dataKey;
        item.Key = key;
        item.Iterator = iterator;
        item.Index = index;
        this._items.push(item);
        this._itemCurrent = item;
        this._index++;
        this._indexRelative++;
        return (item);
    }

    public Pop(): DrapoContextItem {
        if (this._itemCurrent == null)
            return (null);
        this._itemCurrent = this._items.length < 2 ? null : this._items[this._items.length - 2];
        return (this._items.pop());
    }

    public Down(): boolean {
        if (this._itemCurrent == null)
            return (false);
        this._items = this._itemCurrent.Children;
        this._itemParent = this._itemCurrent;
        this._itemCurrentStack.push(this._itemCurrent);
        this._level++;
        this._indexRelatives.push(this._indexRelative);
        this._indexRelative = -1;
        return (true);
    }

    public Up(): boolean {
        if (this._itemParent == null)
            return (false);
        this._itemParent = this._itemParent.Parent;
        this._items = this._itemParent == null ? this._itemsRoot : this._itemParent.Children;
        this._itemCurrent = this._itemCurrentStack.pop();
        this._level--;
        this._indexRelative = this._indexRelatives.pop();
        return (true);
    }

    public GetElementTemplate(key: string): HTMLElement {
        let item: DrapoContextItem = this.Item;
        let template: HTMLElement = null;
        while (item != null) {
            if (item.Key == key)
                template = item.ElementForTemplate;
            item = item.Parent;
        }
        return (template);
    }

    public IsElementTemplateRoot(key: string): boolean {
        let item: DrapoContextItem = this.Item;
        while (item != null) {
            if ((item.Parent === null) && (item.Key === key))
                return (true);
            item = item.Parent;
        }
        return (false);
    }

    public IsKey(key: string): boolean {
        let item: DrapoContextItem = this.Item;
        while (item != null) {
            if (item.Key === key)
                return (true);
            item = item.Parent;
        }
        return (false);
    }

    public GetDataKeyRoot(): string {
        if (this._itemsRoot.length === 0)
            return (null);
        return (this._itemsRoot[0].DataKey);
    }

    public Checkpoint(): void {
        if (this._checkpoint)
            return;
        if (this._level !== 0)
            return;
        this._checkpoint = true;
    }

    private GetTemplateIndex(templateKey: string): number {
        for (let i: number = 0; i < this._templateKeys.length; i++)
            if (this._templateKeys[i] === templateKey)
                return (i);
        return (null);
    }

    public GetTemplate(templateKey: string): JQuery {
        const index: number = this.GetTemplateIndex(templateKey);
        if (index === null)
            return (null);
        return (this._templateDatas[index]);
    }

    public AddTemplate(templateKey: string, templateData: JQuery): void {
        const index: number = this.GetTemplateIndex(templateKey);
        if (index === null) {
            this._templateKeys.push(templateKey);
            this._templateDatas.push(templateData);
        } else {
            this._templateDatas[index] = templateData;
        }
    }

    public CanResolve(key: string): boolean {
        if (!this._canUpdateTemplate)
            return (true);
        return (!this.IsElementTemplateRoot(key));
    }

    public HasContextItemBefore(): boolean {
        return ((this.Item != null) && (this.Item.ElementOld != null));
    }

    public GetContextRelativeArray(mustachePart: string): string[] {
        if (this.Item.Key === mustachePart)
            return ([this.Item.Iterator, '[' + this.IndexRelative + ']']);
        for (let i: number = 0; i < this._itemCurrentStack.length; i++) {
            const itemCurrent: DrapoContextItem = this._itemCurrentStack[i];
            if (itemCurrent.Key !== mustachePart)
                continue;
            return ([itemCurrent.Iterator, '[' + this._indexRelatives[i] + ']']);
        }
        return (null);
    }

    public GetIndex(key: string) : number {
        if (this.Item.Key === key)
            return (this.Index);
        for (let i: number = 0; i < this._itemCurrentStack.length; i++)
        {
            const itemCurrent: DrapoContextItem = this._itemCurrentStack[i];
            if (itemCurrent.Key === key)
                return (itemCurrent.Index);
        }
        return (null);
    }

    public GetIndexRelative(key: string): number {
        if (this.Item.Key === key)
            return (this.IndexRelative);
        for (let i: number = 0; i < this._itemCurrentStack.length; i++) {
            const itemCurrent: DrapoContextItem = this._itemCurrentStack[i];
            if (itemCurrent.Key === key)
                return (this._indexRelatives[i]);
        }
        return (null);
    }
}
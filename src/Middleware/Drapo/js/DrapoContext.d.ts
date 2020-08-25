declare class DrapoContext {
    private _sector;
    private _itemsRoot;
    private _items;
    private _itemParent;
    private _itemCurrent;
    private _itemCurrentStack;
    private _index;
    private _level;
    private _indexRelatives;
    private _indexRelative;
    private _checkpoint;
    private _checkMustacheNodes;
    private _checkMustacheAttributes;
    private _checkModel;
    private _checkID;
    private _checkAttribute;
    private _checkClass;
    private _checkEvent;
    private _checkBehavior;
    private _checkComponent;
    private _checkValidation;
    private _canUpdateTemplate;
    private _templateKeys;
    private _templateDatas;
    set Sector(value: string);
    get Sector(): string;
    get Item(): DrapoContextItem;
    get Index(): number;
    get IsEmpty(): boolean;
    get IndexRelative(): number;
    get Level(): number;
    get IsInsideRecursion(): boolean;
    set CheckMustacheNodes(value: boolean);
    get CheckMustacheNodes(): boolean;
    set CheckMustacheAttributes(value: boolean);
    get CheckMustacheAttributes(): boolean;
    set CheckModel(value: boolean);
    get CheckModel(): boolean;
    set CheckID(value: boolean);
    get CheckID(): boolean;
    set CheckAttribute(value: boolean);
    get CheckAttribute(): boolean;
    set CheckClass(value: boolean);
    get CheckClass(): boolean;
    set CheckEvent(value: boolean);
    get CheckEvent(): boolean;
    set CheckBehavior(value: boolean);
    get CheckBehavior(): boolean;
    set CheckComponent(value: boolean);
    get CheckComponent(): boolean;
    set CheckValidation(value: boolean);
    get CheckValidation(): boolean;
    get CanUpdateTemplate(): boolean;
    set CanUpdateTemplate(value: boolean);
    constructor(item?: DrapoContextItem);
    Create(data: any, element: HTMLElement, elementForTemplate: HTMLElement, dataKey: string, key: string, iterator: string, index: number, elementOld?: HTMLElement): DrapoContextItem;
    Pop(): DrapoContextItem;
    Down(): boolean;
    Up(): boolean;
    GetElementTemplate(key: string): HTMLElement;
    IsElementTemplateRoot(key: string): boolean;
    IsKey(key: string): boolean;
    GetDataKeyRoot(): string;
    Checkpoint(): void;
    private GetTemplateIndex;
    GetTemplate(templateKey: string): JQuery;
    AddTemplate(templateKey: string, templateData: JQuery): void;
    CanResolve(key: string): boolean;
    HasContextItemBefore(): boolean;
    GetContextRelativeArray(mustachePart: string): string[];
    GetIndex(key: string): number;
    GetIndexRelative(key: string): number;
}
declare class DrapoResize {
    private _code;
    private _contextItem;
    private _element;
    private _parentJQuery;
    private _container;
    private _model;
    private _location;
    private _type;
    private _unit;
    private _class;
    private _preview;
    private _sizeStart;
    private _unitStart;
    private _eventStartValue;
    private _eventCurrentValue;
    get Code(): string;
    set Code(value: string);
    get Item(): DrapoContextItem;
    set Item(value: DrapoContextItem);
    get Element(): HTMLElement;
    set Element(value: HTMLElement);
    get ParentJQuery(): JQuery;
    set ParentJQuery(value: JQuery);
    get Container(): HTMLElement;
    set Container(value: HTMLElement);
    get Model(): string;
    set Model(value: string);
    get Location(): string;
    set Location(value: string);
    get Type(): string;
    set Type(value: string);
    get Unit(): string;
    set Unit(value: string);
    get Class(): string;
    set Class(value: string);
    get Preview(): boolean;
    set Preview(value: boolean);
    get SizeStart(): number;
    set SizeStart(value: number);
    get UnitStart(): string;
    set UnitStart(value: string);
    get EventStartValue(): number;
    set EventStartValue(value: number);
    get EventCurrentValue(): number;
    set EventCurrentValue(value: number);
    constructor();
}

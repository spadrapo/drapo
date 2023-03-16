class DrapoResize {
    private _code: string;
    private _contextItem: DrapoContextItem;
    private _element: HTMLElement;
    private _parentJQuery: JQuery;
    private _container: HTMLElement;
    private _model: string;
    private _location: string;
    private _type: string;
    private _unit: string;
    private _class: string;
    private _preview: boolean;
    private _sizeStart: number;
    private _unitStart: string;
    private _eventStartValue: number;
    private _eventCurrentValue: number;

    get Code(): string {
        return (this._code);
    }
    set Code(value: string) {
        this._code = value;
    }
    get Item(): DrapoContextItem {
        return (this._contextItem);
    }
    set Item(value: DrapoContextItem) {
        this._contextItem = value;
    }
    get Element(): HTMLElement {
        return (this._element);
    }
    set Element(value: HTMLElement) {
        this._element = value;
    }
    get ParentJQuery(): JQuery {
        return (this._parentJQuery);
    }
    set ParentJQuery(value: JQuery) {
        this._parentJQuery = value;
    }
    get Container(): HTMLElement {
        return (this._container);
    }
    set Container(value: HTMLElement) {
        this._container = value;
    }
    get Model(): string {
        return (this._model);
    }
    set Model(value: string) {
        this._model = value;
    }
    get Location(): string {
        return (this._location);
    }
    set Location(value: string) {
        this._location = value;
    }
    get Type(): string {
        return (this._type);
    }
    set Type(value: string) {
        this._type = value;
    }
    get Unit(): string {
        return (this._unit);
    }
    set Unit(value: string) {
        this._unit = value;
    }
    get Class(): string {
        return (this._class);
    }
    set Class(value: string) {
        this._class = value;
    }
    get Preview(): boolean {
        return (this._preview);
    }
    set Preview(value: boolean) {
        this._preview = value;
    }
    get SizeStart(): number {
        return (this._sizeStart);
    }
    set SizeStart(value: number) {
        this._sizeStart = value;
    }
    get UnitStart(): string {
        return (this._unitStart);
    }
    set UnitStart(value: string) {
        this._unitStart = value;
    }
    get EventStartValue(): number {
        return (this._eventStartValue);
    }
    set EventStartValue(value: number) {
        this._eventStartValue = value;
    }
    get EventCurrentValue(): number {
        return (this._eventCurrentValue);
    }
    set EventCurrentValue(value: number) {
        this._eventCurrentValue = value;
    }
    //Constructors
    constructor() {
        this.Unit = 'px';
    }
}
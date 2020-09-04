class DrapoViewport {
    private _sector: string = null;
    private _dataKey: string = null;
    private _key: string = null;
    private _dataKeyIteratorRange: string = null;
    private _data: any[] = null;
    private _el: HTMLElement = null;
    private _elScroll: HTMLElement = null;
    private _elTemplate: HTMLElement = null;
    private _elBallonBefore: HTMLElement = null;
    private _elBallonAfter: HTMLElement = null;
    private _heightScroll: number = null;
    private _heightBefore: number = null;
    private _heightAfter: number = null;
    private _heightItem: number = null;
    private _heightBallonBefore: number = null;
    private _heightBallonAfter: number = null;
    private _dataStart: number = null;
    private _dataEnd: number = null;
    private _dataLength: number = null;
    private _factor: number = 2;
    private _eventScrollTimeout: number = null;

    get Sector(): string {
        return (this._sector);
    }

    set Sector(value: string) {
        this._sector = value;
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

    get DataKeyIteratorRange(): string {
        return (this._dataKeyIteratorRange);
    }

    set DataKeyIteratorRange(value: string) {
        this._dataKeyIteratorRange = value;
    }

    get Data(): any[] {
        return (this._data);
    }

    set Data(value: any[]) {
        this._data = value;
    }

    get Element(): HTMLElement {
        return (this._el);
    }

    set Element(value: HTMLElement) {
        this._el = value;
    }

    get ElementTemplate(): HTMLElement {
        return (this._elTemplate);
    }

    set ElementTemplate(value: HTMLElement) {
        this._elTemplate = value;
    }

    get ElementBallonBefore(): HTMLElement {
        return (this._elBallonBefore);
    }

    set ElementBallonBefore(value: HTMLElement) {
        this._elBallonBefore = value;
    }

    get ElementBallonAfter(): HTMLElement {
        return (this._elBallonAfter);
    }

    set ElementBallonAfter(value: HTMLElement) {
        this._elBallonAfter = value;
    }

    get ElementScroll(): HTMLElement {
        return (this._elScroll);
    }

    set ElementScroll(value: HTMLElement) {
        this._elScroll = value;
    }

    get HeightScroll(): number {
        return (this._heightScroll);
    }

    set HeightScroll(value: number) {
        this._heightScroll = value;
    }

    get HeightBefore(): number {
        return (this._heightBefore);
    }

    set HeightBefore(value: number) {
        this._heightBefore = value;
    }

    get HeightAfter(): number {
        return (this._heightAfter);
    }

    set HeightAfter(value: number) {
        this._heightAfter = value;
    }

    get HeightItem(): number {
        return (this._heightItem);
    }

    set HeightItem(value: number) {
        this._heightItem = value;
    }

    get HeightBallonBefore(): number {
        return (this._heightBallonBefore);
    }

    set HeightBallonBefore(value: number) {
        this._heightBallonBefore = value;
    }

    get HeightBallonAfter(): number {
        return (this._heightBallonAfter);
    }

    set HeightBallonAfter(value: number) {
        this._heightBallonAfter = value;
    }

    get DataStart(): number {
        return (this._dataStart);
    }

    set DataStart(value: number) {
        this._dataStart = value;
    }

    get DataEnd(): number {
        return (this._dataEnd);
    }

    set DataEnd(value: number) {
        this._dataEnd = value;
    }

    get DataLength(): number {
        return (this._dataLength);
    }

    set DataLength(value: number) {
        this._dataLength = value;
    }

    get Factor(): number {
        return (this._factor);
    }

    set Factor(value: number) {
        this._factor  = value;
    }

    get EventScrollTimeout(): number {
        return (this._eventScrollTimeout);
    }

    set EventScrollTimeout(value: number) {
        this._eventScrollTimeout = value;
    }
}
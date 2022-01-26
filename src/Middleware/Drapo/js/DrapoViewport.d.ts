declare class DrapoViewport {
    private _busy;
    private _sector;
    private _dataKey;
    private _key;
    private _dataKeyIteratorRange;
    private _data;
    private _el;
    private _elScroll;
    private _elTemplate;
    private _elBallonBefore;
    private _elBallonAfter;
    private _heightScroll;
    private _heightBefore;
    private _heightAfter;
    private _heightItem;
    private _heightBallonBefore;
    private _heightBallonAfter;
    private _dataStart;
    private _dataEnd;
    private _dataLength;
    private _factor;
    private _eventScrollTimeout;
    private _scrollTop;
    private _isActive;
    get Busy(): boolean;
    set Busy(value: boolean);
    get Sector(): string;
    set Sector(value: string);
    get DataKey(): string;
    set DataKey(value: string);
    get Key(): string;
    set Key(value: string);
    get DataKeyIteratorRange(): string;
    set DataKeyIteratorRange(value: string);
    get Data(): any[];
    set Data(value: any[]);
    get Element(): HTMLElement;
    set Element(value: HTMLElement);
    get ElementTemplate(): HTMLElement;
    set ElementTemplate(value: HTMLElement);
    get ElementBallonBefore(): HTMLElement;
    set ElementBallonBefore(value: HTMLElement);
    get ElementBallonAfter(): HTMLElement;
    set ElementBallonAfter(value: HTMLElement);
    get ElementScroll(): HTMLElement;
    set ElementScroll(value: HTMLElement);
    get HeightScroll(): number;
    set HeightScroll(value: number);
    get HeightBefore(): number;
    set HeightBefore(value: number);
    get HeightAfter(): number;
    set HeightAfter(value: number);
    get HeightItem(): number;
    set HeightItem(value: number);
    get HeightBallonBefore(): number;
    set HeightBallonBefore(value: number);
    get HeightBallonAfter(): number;
    set HeightBallonAfter(value: number);
    get DataStart(): number;
    set DataStart(value: number);
    get DataEnd(): number;
    set DataEnd(value: number);
    get DataLength(): number;
    set DataLength(value: number);
    get Factor(): number;
    set Factor(value: number);
    get EventScrollTimeout(): number;
    set EventScrollTimeout(value: number);
    get ScrollTop(): number;
    set ScrollTop(value: number);
    get IsActive(): boolean;
    set IsActive(value: boolean);
}

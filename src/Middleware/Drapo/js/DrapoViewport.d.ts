declare class DrapoViewport {
    private _el;
    private _elScroll;
    private _heightScroll;
    private _heightBefore;
    private _heightAfter;
    private _heightItem;
    private _heightBallonBefore;
    private _heightBallonAfter;
    get Element(): HTMLElement;
    set Element(value: HTMLElement);
    get ElementScroll(): HTMLElement;
    set ElementScroll(value: HTMLElement);
    get HeightScroll(): number;
    set Height(value: number);
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
}

class DrapoViewport {
    private _el: HTMLElement = null;
    private _elScroll: HTMLElement = null;
    private _heightScroll: number = null;
    private _heightBefore: number = null;
    private _heightAfter: number = null;
    private _heightItem: number = null;
    private _heightBallonBefore: number = null;
    private _heightBallonAfter: number = null;

    get Element(): HTMLElement {
        return (this._el);
    }

    set Element(value: HTMLElement) {
        this._el = value;
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

    set Height(value: number) {
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
}
class DrapoWindow {
    private _did: string = null;
    private _uri: string = null;
    private _element: HTMLElement = null;
    private _visible: boolean = true;
    private _code: string = null;

    get Did(): string {
        return (this._did);
    }

    set Did(value: string) {
        this._did = value;
    }

    get Uri(): string {
        return (this._uri);
    }

    set Uri(value: string) {
        this._uri = value;
    }

    get Element(): HTMLElement {
        return (this._element);
    }

    set Element(value: HTMLElement) {
        this._element = value;
    }

    get Visible(): boolean {
        return (this._visible);
    }

    set Visible(value: boolean) {
        this._visible = value;
    }

    get Code(): string {
        return (this._code);
    }

    set Code(value: string) {
        this._code = value;
    }
}
declare class DrapoWindow {
    private _did;
    private _uri;
    private _element;
    private _visible;
    private _code;
    get Did(): string;
    set Did(value: string);
    get Uri(): string;
    set Uri(value: string);
    get Element(): HTMLElement;
    set Element(value: HTMLElement);
    get Visible(): boolean;
    set Visible(value: boolean);
    get Code(): string;
    set Code(value: string);
}

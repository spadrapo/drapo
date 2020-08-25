declare function stylistConstructor(el: HTMLElement, app: any): Promise<Stylist>;
declare class Stylist {
    private _el;
    private _app;
    private _sector;
    private _size;
    private _color;
    private _name;
    constructor(el: HTMLElement, app: any);
    Initalize(): Promise<void>;
}

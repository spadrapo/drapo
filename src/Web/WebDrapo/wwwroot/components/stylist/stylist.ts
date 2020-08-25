async function stylistConstructor(el: HTMLElement, app: any): Promise<Stylist> {
    //Initialize
    let instance: Stylist = new Stylist(el, app);
    await instance.Initalize();
    return (instance);
}

class Stylist {
    //Field
    private _el: HTMLElement = null;
    private _app: any;
    private _sector: string = null;
    private _size: string = null;
    private _color: string = null; 
    private _name: string = null;
    //Properties
    //Constructors
    constructor(el: HTMLElement, app: any) {
        this._el = el;
        this._app = app;
    }

    public async Initalize(): Promise<void> {
        this._sector = this._app._document.GetSector(this._el);
        this._size = this._el.getAttribute("dc-size");
        this._color = this._el.getAttribute("dc-color");
        this._name = this._el.getAttribute("dc-name");
        const elBlock: HTMLElement = this._el.children[1].children[0] as HTMLElement;
        const values: [string, string][] = [];
        values.push(['position', 'relative']);
        values.push(['float', 'left']);
        values.push(['margin', '5px']);
        values.push(['background-color', this._color]);
        values.push(['width', this._size]);
        values.push(['height', this._size]);
        this._name = this._app._stylist.Create(values, this._name);
        elBlock.className = this._name;
    }
}
async function listConstructor(el: HTMLElement, app: any): Promise<any> {
    //Initialize
    const listObj: List = new List(el, app);
    return (listObj);
}

class List {
    //Field
    private _el: HTMLElement = null;
    private _app: any;

    //Constructors
    constructor(el: HTMLElement, app: any) {
        this._el = el;
        this._app = app;
    }
}
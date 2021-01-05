async function objectlistviewConstructor(el: HTMLElement, app: any): Promise<any> {
    //Initialize
    let objectListViewObj: ObjectListView = new ObjectListView(el, app);
    await objectListViewObj.Initalize();
    return (objectListViewObj);
}

class ObjectListView {
    //Field
    private _el: HTMLElement = null;
    private _app: any;

    //Constructors
    constructor(el: HTMLElement, app: any) {
        this._el = el;
        this._app = app;
    }

    public async Initalize(): Promise<void> {
    
    }
}

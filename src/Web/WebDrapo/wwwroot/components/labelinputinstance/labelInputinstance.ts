async function labelinputinstanceConstructor(el: HTMLElement, app: DrapoApplication): Promise<LabelInputInstance> {
    //Initialize
    let instance: LabelInputInstance = new LabelInputInstance(el, app);
    await instance.Initalize();
    return (instance);
}

class LabelInputInstance {
    //Field
    private _el: HTMLElement = null;
    private _app: DrapoApplication;
    private _sector: string = null;
    //Properties
    //Constructors
    constructor(el: HTMLElement, app: DrapoApplication) {
        this._el = el;
        this._app = app;
    }

    public async Initalize(): Promise<void> {
        this._sector = this._app.Document.GetSector(this._el);
        let dataKey = this._el.getAttribute("d-dataKeySource");
        let instance: LabelInputInstance = this;
        this._app.Observer.SubscribeComponent(dataKey, this._el, function () { instance.Notify(); });
        await this.Notify();
    }

    public async Notify(): Promise<void> {
        let sector = this._app.Document.GetSector(this._el);
        let dataKey = this._el.getAttribute("d-dataKeySource");
        let dataField = this._el.getAttribute("d-dataKeyField");
        let caption = this._el.getAttribute("d-caption");
        let label: HTMLElement = this._el.children[0] as HTMLElement;
        let input: HTMLElement = this._el.children[this._el.children.length - 1] as HTMLElement;
        this._app.Document.SetHTML(label, caption);
        let dataItem: any = await this._app.Storage.RetrieveData(dataKey, sector);
        let value = (dataItem != null) ? dataItem[dataField] : '';
        this._app.Document.SetHTML(input, value);
    }

    public async Update(value: string): Promise<void>
    {
        let dataKey = this._el.getAttribute("d-dataKeySource");
        let dataField = this._el.getAttribute("d-dataKeyField");
        let mustache: string = '{{' + dataKey + '.' + dataField + '}}';
        let dataPath: string[] = this._app.Parser.ParseMustache(mustache);
        await this._app.Storage.UpdateDataPath(this._sector, null, dataPath, value);
    }
}

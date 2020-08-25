async function labelinputinstanceConstructor(el: HTMLElement, app: any): Promise<LabelInputInstance> {
    //Initialize
    let instance: LabelInputInstance = new LabelInputInstance(el, app);
    await instance.Initalize();
    return (instance);
}

class LabelInputInstance {
    //Field
    private _el: HTMLElement = null;
    private _app: any;
    private _sector: string = null;
    //Properties
    //Constructors
    constructor(el: HTMLElement, app: any) {
        this._el = el;
        this._app = app;
    }

    public async Initalize(): Promise<void> {
        let elj = $(this._el);
        this._sector = this._app._document.GetSector(elj);
        let dataKey = elj.attr("d-dataKeySource");
        let instance: LabelInputInstance = this;
        this._app._observer.SubscribeComponent(dataKey, this._el, function () { instance.Notify(); });
        await this.Notify();
    }

    public async Notify(): Promise<void> {
        let elj = $(this._el);
        let sector = this._app._document.GetSector(elj);
        let dataKey = elj.attr("d-dataKeySource");
        let dataField = elj.attr("d-dataKeyField");
        let caption = elj.attr("d-caption");
        let label = elj.children().first();
        let input = elj.children().last();
        label.html(caption);
        let dataItem: any = await this._app._storage.RetrieveData(dataKey, sector);
        let value = (dataItem != null) ? dataItem[dataField] : '';
        input.html(value);
    }

    public async Update(value: string): Promise<void>
    {
        let elj = $(this._el);
        let dataKey = elj.attr("d-dataKeySource");
        let dataField = elj.attr("d-dataKeyField");
        let mustache: string = '{{' + dataKey + '.' + dataField + '}}';
        let dataPath: string[] = this._app._parser.ParseMustache(mustache);
        await this._app._storage.UpdateDataPath(this._sector, null, dataPath, value);
    }
}

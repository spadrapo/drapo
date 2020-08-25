async function labelcontextConstructor(el: HTMLElement, app: any): Promise<LabelContext> {
    //Initialize
    let instance: LabelContext = new LabelContext(el, app);
    await instance.Initalize();
    return (instance);
}

class LabelContext {
    //Field
    private _el: HTMLElement = null;
    private _app: any;
    private _sector: string = null;
    private _model: string = null;
    //Properties
    //Constructors
    constructor(el: HTMLElement, app: any) {
        this._el = el;
        this._app = app;
    }

    public async Initalize(): Promise<void> {
        this._sector = this._app._document.GetSector(this._el);
        this._model = this._el.getAttribute("dc-model");
        const elModel: HTMLSpanElement = this.GetElementModel();
        elModel.textContent = this._model.substring(2, this._model.length - 2);
        const labelContext: LabelContext = this;
        this._app._observer.SubscribeComponent(this._model, this._el, async () => { await labelContext.Update(); });
        await this.Update();
    }

    private GetElementModel(): HTMLSpanElement {
        return (<HTMLSpanElement>this._el.children[0]);
    }

    private GetElementContent(): HTMLSpanElement {
        return (<HTMLSpanElement>this._el.children[1]);
    }

    public async Update() : Promise<void>
    {
        const elContent: HTMLSpanElement = this.GetElementContent();
        const data: any = await this._app._storage.RetrieveDataValue(this._sector, this._model);
        elContent.textContent = data;
    }
}


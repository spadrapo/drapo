async function incrementConstructor(el: HTMLElement, app: any): Promise<Increment> {
    //Initialize
    let instance: Increment = new Increment(el, app);
    await instance.Initalize();
    return (instance);
}

class Increment {
    //Field
    private _el: HTMLElement = null;
    private _app: any;
    private _sector: string = null;
    //Properties
    //Constructors
    constructor(el: HTMLElement, app: any) {
        this._el = el;
        this._app = app;
        this._sector = app._document.GetSector(el);
    }

    public async Initalize(): Promise<void> {
        let instance: Increment = this;
        const dataKey: string = this._el.getAttribute('dc-dataKey');
        this._app._observer.SubscribeComponent(dataKey, this._el, async () => { await instance.Notify(); });
    }

    public async Notify() : Promise<void>
    {
        await this._app._functionHandler.ResolveFunctionWithoutContext(this._sector, this._el, 'AddDataItem(data,any)');
    }
}


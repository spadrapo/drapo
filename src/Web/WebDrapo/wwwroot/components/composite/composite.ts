async function compositeConstructor(el: HTMLElement, app: any): Promise<Composite> {
    //Initialize
    let instance: Composite = new Composite(el, app);
    await instance.Initalize();
    return (instance);
}

class Composite {
    //Field
    private _el: HTMLElement = null;
    private _app: any;
    private _dataKeySource: string = null;
    private _sector: string = null;
    private _sectors: boolean = false;
    //Properties
    //Constructors
    constructor(el: HTMLElement, app: any) {
        this._el = el;
        this._app = app;
    }

    public async Initalize(): Promise<void> {
        this._sector = this._app._document.GetSector(this._el);
        this._dataKeySource = this._el.getAttribute("dc-dataKeySource");
        this._sectors = this._el.getAttribute("dc-sectors") === 'true';
        let instance: Composite = this;
        this._app._observer.SubscribeComponent(this._dataKeySource, this._el, async () => { return(await instance.Render()); });
        await this.Render();
    }

    private GetElementItems(): HTMLDivElement {
        return (<HTMLDivElement>this._el.children[0]);
    }

    private async GetCount(): Promise<number>
    {
        let dataValue: string = await this._app._storage.RetrieveDataValue(this._sector, this._dataKeySource);
        return (Number(dataValue));
    }

    public async Render(): Promise<boolean> {
        let elItems: HTMLDivElement = this.GetElementItems();
        //Remove
        elItems.innerHTML = '';
        let fragment: DocumentFragment = document.createDocumentFragment();
        //Insert
        let count: number = await this.GetCount();
        for (let i: number = 0; i < count; i++)
        {
            let elItem: HTMLElement = document.createElement('div');
            if (this._sectors)
                elItem.setAttribute('d-sector', '@');
            let elComponent: HTMLElement = document.createElement('d-dataValue');
            elComponent.setAttribute('d-dataValue', this._dataKeySource);
            elItem.appendChild(elComponent);
            fragment.appendChild(elItem);
        }
        elItems.appendChild(fragment);
        return (count != 42);
    }
}
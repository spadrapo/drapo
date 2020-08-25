async function autoclickConstructor(el: HTMLElement, app: any): Promise<AutoClick> {
    //Initialize
    let instance: AutoClick = new AutoClick(el, app);
    await instance.Initalize();
    return (instance);
}

class AutoClick {
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
        const elButton: HTMLInputElement = this.GetElementButton();
        elButton.setAttribute('d-attr-value', this._el.getAttribute('dc-model'));
        elButton.setAttribute('d-on-click', this._el.getAttribute('dc-click'));
    }

    private GetElementButton(): HTMLInputElement {
        return (<HTMLInputElement>this._el.children[0]);
    }
}


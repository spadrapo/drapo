async function contextConstructor(el: HTMLElement, app: any): Promise<Context> {
    //Initialize
    let instance: Context = new Context(el, app);
    await instance.Initalize();
    return (instance);
}

class Context {
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
        const elFor: HTMLInputElement = this.GetElementFor();
        const elComponent: HTMLElement = this.GetElementComponent();
        elFor.setAttribute('d-for', elFor.getAttribute('d-for').replace('dc-for', this._el.getAttribute('dc-for')));
        elComponent.setAttribute('dc-model', elComponent.getAttribute('dc-model').replace('dc-property', this._el.getAttribute('dc-property')));
    }

    private GetElementFor(): HTMLInputElement {
        return (<HTMLInputElement>this._el.children[0]);
    }

    private GetElementComponent(): HTMLElement {
        return (<HTMLElement>this._el.children[0].children[0]);
    }
}


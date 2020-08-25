async function stateConstructor(el: HTMLElement, app: any): Promise<State> {
    //Initialize
    let instance: State = new State(el, app);
    await instance.Initalize();
    return (instance);
}

class State {
    //Field
    private _el: HTMLElement = null;
    private _app: any;
    //Properties
    //Constructors
    constructor(el: HTMLElement, app: any) {
        this._el = el;
        this._app = app;
    }

    public async Initalize(): Promise<void> {

    }
}


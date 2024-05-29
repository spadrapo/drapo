async function documentcounterConstructor(el: HTMLElement, app: any): Promise<DocumentCounter> {
    //Initialize
    let instance: DocumentCounter = new DocumentCounter(el, app);
    await instance.Initalize();
    return (instance);
}
class DocumentCounter {
    //Field
    private _el: HTMLElement = null;
    private _app: DrapoApplication = null;
    private _counter: number = 0;
    //Properties
    //Constructors
    constructor(el: HTMLElement, app: DrapoApplication) {
        this._el = el;
        this._app = app;
    }

    public async Initalize(): Promise<void> {
        document.addEventListener('mouseup', async (evt) => { return await (this.HandleDocumentMouseUp(evt)); }, false);
        this._el.innerText = this._counter.toString();
    }

    private async HandleDocumentMouseUp(evt: MouseEvent): Promise<void> {
        this._counter++;
        this._el.innerText = this._counter.toString();
    }
}

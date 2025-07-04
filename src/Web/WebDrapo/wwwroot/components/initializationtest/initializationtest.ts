async function initializationtestConstructor(el: HTMLElement, app: DrapoApplication): Promise<InitializationTest> {
    //Initialize
    let instance: InitializationTest = new InitializationTest(el, app);
    await instance.Initalize();
    return (instance);
}

class InitializationTest {
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
        console.log('Initializing');
        this._sector = this._app.Document.GetSector(this._el);
        const dataKeyClipboard: string = this._el.getAttribute('dc-initialized-result');
        if (dataKeyClipboard != null && dataKeyClipboard.length > 0) {
            await this._app.Storage.UpdateData(dataKeyClipboard, this._sector, 'true');
            console.log('Initialized');
        }
    }
}
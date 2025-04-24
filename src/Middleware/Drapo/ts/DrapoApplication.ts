class DrapoApplication {
    // Fields
    private _isLoaded: boolean = false;
    private _logger: DrapoLogger;
    private _router: DrapoRouter;
    private _server: DrapoServer;
    private _observer: DrapoObserver;
    private _document: DrapoDocument;
    private _controlFlow: DrapoControlFlow;
    private _parser: DrapoParser;
    private _storage: DrapoStorage;
    private _solver: DrapoSolver;
    private _binder: DrapoBinder;
    private _config: DrapoConfig;
    private _register: DrapoRegister;
    private _serializer: DrapoSerializer;
    private _barber: DrapoBarber;
    private _searcher: DrapoSearcher;
    private _modelHandler: DrapoModelHandler;
    private _attributeHandler: DrapoAttributeHandler;
    private _classHandler: DrapoClassHandler;
    private _eventHandler: DrapoEventHandler;
    private _functionHandler: DrapoFunctionHandler;
    private _componentHandler: DrapoComponentHandler;
    private _cookieHandler: DrapoCookieHandler;
    private _sectorContainerHandler: DrapoSectorContainerHandler;
    private _windowHandler: DrapoWindowHandler;
    private _behaviorHandler: DrapoBehaviorHandler;
    private _plumber: DrapoPlumber;
    private _formatter: DrapoFormatter;
    private _validator: DrapoValidator;
    private _exceptionHandler: DrapoExceptionHandler;
    private _globalization: DrapoGlobalization;
    private _stylist: DrapoStylist;
    private _viewportHandler: DrapoViewportHandler;
    private _cacheHandler: DrapoCacheHandler;
    private _worker: DrapoWorker;
    private _debugger: DrapoDebugger;

    // Properties
    get IsLoaded(): boolean {
        return (this._isLoaded);
    }

    get Log(): DrapoLogger {
        return (this._logger);
    }

    get Router(): DrapoRouter {
        return (this._router);
    }

    get Server(): DrapoServer {
        return (this._server);
    }

    get Observer(): DrapoObserver {
        return (this._observer);
    }

    get Document(): DrapoDocument {
        return (this._document);
    }

    get ControlFlow(): DrapoControlFlow {
        return (this._controlFlow);
    }

    get Parser(): DrapoParser {
        return (this._parser);
    }

    get Storage(): DrapoStorage {
        return (this._storage);
    }

    get Solver(): DrapoSolver {
        return (this._solver);
    }

    get Binder(): DrapoBinder {
        return (this._binder);
    }

    get Config(): DrapoConfig {
        return (this._config);
    }

    get Register(): DrapoRegister {
        return (this._register);
    }

    get Serializer(): DrapoSerializer {
        return (this._serializer);
    }

    get Barber(): DrapoBarber {
        return (this._barber);
    }

    get Searcher(): DrapoSearcher {
        return (this._searcher);
    }

    get ModelHandler(): DrapoModelHandler {
        return (this._modelHandler);
    }

    get AttributeHandler(): DrapoAttributeHandler {
        return (this._attributeHandler);
    }

    get ClassHandler(): DrapoClassHandler {
        return (this._classHandler);
    }

    get EventHandler(): DrapoEventHandler {
        return (this._eventHandler);
    }

    get FunctionHandler(): DrapoFunctionHandler {
        return (this._functionHandler);
    }

    get ComponentHandler(): DrapoComponentHandler {
        return (this._componentHandler);
    }

    get CookieHandler(): DrapoCookieHandler {
        return (this._cookieHandler);
    }

    get SectorContainerHandler(): DrapoSectorContainerHandler {
        return (this._sectorContainerHandler);
    }

    get WindowHandler(): DrapoWindowHandler {
        return (this._windowHandler);
    }

    get BehaviorHandler(): DrapoBehaviorHandler {
        return (this._behaviorHandler);
    }

    get Plumber(): DrapoPlumber {
        return (this._plumber);
    }

    get Formatter(): DrapoFormatter {
        return (this._formatter);
    }

    get Validator(): DrapoValidator {
        return (this._validator);
    }

    get ExceptionHandler(): DrapoExceptionHandler {
        return(this._exceptionHandler);
    }

    get Globalization(): DrapoGlobalization {
        return (this._globalization);
    }

    get Stylist(): DrapoStylist
    {
        return (this._stylist);
    }

    get ViewportHandler(): DrapoViewportHandler {
        return (this._viewportHandler);
    }

    get CacheHandler(): DrapoCacheHandler {
        return (this._cacheHandler);
    }

    get Worker(): DrapoWorker {
        return (this._worker);
    }

    get Debugger(): DrapoDebugger {
        return (this._debugger);
    }

    // Constructors
    constructor() {
        this._logger = new DrapoLogger(this);
        this._router = new DrapoRouter(this);
        this._server = new DrapoServer(this);
        this._observer = new DrapoObserver(this);
        this._document = new DrapoDocument(this);
        this._controlFlow = new DrapoControlFlow(this);
        this._parser = new DrapoParser(this);
        this._storage = new DrapoStorage(this);
        this._solver = new DrapoSolver(this);
        this._binder = new DrapoBinder(this);
        this._config = new DrapoConfig(this);
        this._register = new DrapoRegister(this);
        this._serializer = new DrapoSerializer(this);
        this._barber = new DrapoBarber(this);
        this._searcher = new DrapoSearcher(this);
        this._modelHandler = new DrapoModelHandler(this);
        this._attributeHandler = new DrapoAttributeHandler(this);
        this._classHandler = new DrapoClassHandler(this);
        this._eventHandler = new DrapoEventHandler(this);
        this._functionHandler = new DrapoFunctionHandler(this);
        this._componentHandler = new DrapoComponentHandler(this);
        this._cookieHandler = new DrapoCookieHandler(this);
        this._sectorContainerHandler = new DrapoSectorContainerHandler(this);
        this._windowHandler = new DrapoWindowHandler(this);
        this._behaviorHandler = new DrapoBehaviorHandler(this);
        this._plumber = new DrapoPlumber(this);
        this._formatter = new DrapoFormatter(this);
        this._validator = new DrapoValidator(this);
        this._exceptionHandler = new DrapoExceptionHandler(this);
        this._globalization = new DrapoGlobalization(this);
        this._stylist = new DrapoStylist(this);
        this._viewportHandler = new DrapoViewportHandler(this);
        this._cacheHandler = new DrapoCacheHandler(this);
        this._worker = new DrapoWorker(this);
        this._debugger = new DrapoDebugger(this);
    }

    public async OnLoad(): Promise<void> {
        try {
            this.Log.WriteVerbose('Application - OnLoad - Started');
            await this.Debugger.Initialize();
            await this.CacheHandler.Initialize();
            await this.Document.Resolve();
            await this.Debugger.ConnectDebugger();
            await this.Plumber.ConnectPipe();
            await this.Router.ApplyRouteStartup();
            await this.Document.StartUnitTest();
            this._isLoaded = true;
            this.Log.WriteVerbose('Application - OnLoad - Finished');
        } catch (e) {
            await this.ExceptionHandler.Handle(e, 'OnLoad');
        }
    }

    public show(): string {
        // tslint:disable-next-line:no-floating-promises
        this.Debugger.ShowDebugger();
        return ('');
    }

    public close(): string {
        // tslint:disable-next-line:no-floating-promises
        this.Debugger.CloseDebugger();
        return ('');
    }
}

window.onload = () => {
    const application: DrapoApplication = new DrapoApplication();
    const windowAny: any = window as any;
    windowAny.drapo = application;
    // tslint:disable-next-line:no-floating-promises
    application.OnLoad();
};

window.onpopstate = (e : Event) => {
    const windowAny: any = window as any;
    const application: DrapoApplication = windowAny.drapo as DrapoApplication;
    application.Router.OnPopState(e);
};

window.addEventListener('message', (event) => {
    const windowAny: any = window as any;
    const application: DrapoApplication = windowAny.drapo as DrapoApplication;
    // tslint:disable-next-line:no-floating-promises
    application.Document.ReceiveMessage(event.data);
}, false);

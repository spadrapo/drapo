declare class DrapoWorker {
    private _application;
    private _pollingItem;
    private _pollingTimeout;
    get Application(): DrapoApplication;
    constructor(application: DrapoApplication);
    Check(): void;
    private Destroy;
    private Work;
}

class DrapoSearcher {
    //Field
    private _application: DrapoApplication;

    //Properties
    get Application(): DrapoApplication {
        return (this._application);
    }

    //Constructors
    constructor(application: DrapoApplication) {
        this._application = application;
    }
}
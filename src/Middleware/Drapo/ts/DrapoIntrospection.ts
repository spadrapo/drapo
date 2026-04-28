interface DrapoRuntimeState {
    isLoaded: boolean;
    browser: {
        width: number;
        height: number;
    };
}

class DrapoIntrospection {
    //Fields
    private _application: DrapoApplication;
    private _window: Window;

    //Properties
    get Application(): DrapoApplication {
        return (this._application);
    }

    //Constructors
    constructor(application: DrapoApplication, windowObject: Window = window) {
        this._application = application;
        this._window = windowObject;
    }

    public GetSectors(): string[] {
        return (this.Application.Document.GetSectors().slice());
    }

    public GetDataKeys(sector: string = null): string[] {
        return (this.Application.Storage.GetDataKeys(sector));
    }

    public IsDataKey(dataKey: string, sector: string = null): boolean {
        if ((dataKey == null) || (dataKey === ''))
            return (false);
        if (this.Application.Document.IsHiddenKey(dataKey))
            return (false);
        return (this.Application.Storage.IsDataKey(dataKey, sector));
    }

    public GetRuntimeState(): DrapoRuntimeState {
        return ({
            browser: this.GetBrowserState(),
            isLoaded: this.Application.IsLoaded
        });
    }

    private GetBrowserState(): { width: number; height: number } {
        const documentElement: HTMLElement = this._window.document.documentElement;
        const body: HTMLElement = this._window.document.body;
        const width: number = this._window.innerWidth || (documentElement == null ? 0 : documentElement.clientWidth) || (body == null ? 0 : body.clientWidth);
        const height: number = this._window.innerHeight || (documentElement == null ? 0 : documentElement.clientHeight) || (body == null ? 0 : body.clientHeight);
        return ({
            height,
            width
        });
    }
}

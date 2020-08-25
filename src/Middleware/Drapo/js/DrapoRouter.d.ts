declare class DrapoRouter {
    private _application;
    private _routes;
    private _canUseRouter;
    get Application(): DrapoApplication;
    constructor(application: DrapoApplication);
    private Create;
    GetLastRouteUrlBySector(sector: string): string;
    GetLastRouteUrl(): string;
    private GetLastRouteBySector;
    private GetLastRouteTitle;
    CanUseRouter(): Promise<boolean>;
    Route(url: string, sector?: string, title?: string, state?: any): Promise<void>;
    OnPopState(e: Event): void;
    private UpdateTitle;
    UpdateURL(url: string): Promise<void>;
}

class DrapoRouter
{
    //Field
    private _application: DrapoApplication;
    private _routes: DrapoRouteItem[] = [];
    private _canUseRouter : boolean = null;

    //Properties
    get Application(): DrapoApplication {
        return (this._application);
    }

    //Constructors
    constructor(application: DrapoApplication) {
        this._application = application;
    }

    private Create(url: string, sector: string, title: string, state: any): DrapoRouteItem
    {
        const route: DrapoRouteItem = new DrapoRouteItem();
        route.Url = url;
        route.Sector = sector;
        route.Title = title;
        route.State = state;
        this._routes.push(route);
        return (route);
    }

    public GetLastRouteUrlBySector(sector: string): string
    {
        const route: DrapoRouteItem = this.GetLastRouteBySector(sector);
        if (route == null)
            return (null);
        return(route.Url);
    }

    public GetLastRouteUrl(): string {
        for (let i: number = this._routes.length - 1; i >= 0; i--) {
            const route: DrapoRouteItem = this._routes[i];
            if (route.Url != null)
                return (route.Url);
        }
        return (null);
    }

    private GetLastRouteBySector(sector: string) : DrapoRouteItem
    {
        for (let i: number = this._routes.length - 1; i >= 0; i--)
        {
            const route: DrapoRouteItem = this._routes[i];
            if (route.Sector === sector)
                return (route);
        }
        return (null);
    }

    private GetLastRouteTitle(): string
    {
        for (let i: number = this._routes.length - 1; i >= 0; i--) {
            const route: DrapoRouteItem = this._routes[i];
            if (route.Title !== null)
                return (route.Title);
        }
        return (null);
    }

    public async CanUseRouter(): Promise<boolean>
    {
        if (this._canUseRouter === null)
            this._canUseRouter = await this.Application.Config.GetUseRouter();
        return (this._canUseRouter);
    }

    public async Route(url: string, sector: string = null, title : string = null, state : any = null) : Promise<void>
    {
        const canUseRouter: boolean = await this.CanUseRouter();
        this.UpdateTitle(title);
        if (canUseRouter) {
            const route: DrapoRouteItem = this.Create(this.Application.Server.ResolveUrl(url), sector, title, state);
            history.pushState(null, route.Title, route.Url);
        }
        this._application.Log.WriteVerbose("Router - Route to {0}", url);
    }

    public OnPopState(e : Event) : void
    {
        const route: DrapoRouteItem = this._routes.pop();
        if (route == null)
            return;
        const routePrevious: DrapoRouteItem = this.GetLastRouteBySector(route.Sector);
        const title: string = this.GetLastRouteTitle();
        this.UpdateTitle(title);
        this.Application.Document.StartUpdate(null);
        if (routePrevious == null) {
            // tslint:disable-next-line:no-floating-promises
            this.Application.Document.LoadChildSectorDefault(route.Sector);
        } else {
            // tslint:disable-next-line:no-floating-promises
            this.Application.Document.LoadChildSector(route.Sector, route.Url, route.Title, false);
        }
    }

    private UpdateTitle(title: string): void {
        if (title == null)
            return;
        if (title == '')
            return;
        if (title == '=')
            return;
        document.title = title;
    }

    public async UpdateURL(url: string): Promise<void>
    {
        const urlResolved: string = this.Application.Server.ResolveUrl(url);
        history.pushState(null, document.title, urlResolved);
    }
}

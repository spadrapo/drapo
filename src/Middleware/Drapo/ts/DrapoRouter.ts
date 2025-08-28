class DrapoRouter {
    //Field
    private _application: DrapoApplication;
    private _routes: DrapoRouteItem[] = [];
    private _canUseRouter: boolean = null;

    //Properties
    get Application(): DrapoApplication {
        return (this._application);
    }

    //Constructors
    constructor(application: DrapoApplication) {
        this._application = application;
    }

    private Create(url: string, sector: string, title: string, state: any): DrapoRouteItem {
        const route: DrapoRouteItem = new DrapoRouteItem();
        route.Url = url;
        route.Sector = sector;
        route.Title = title;
        route.State = state;
        this._routes.push(route);
        return (route);
    }

    public GetLastRouteUrlBySector(sector: string): string {
        const route: DrapoRouteItem = this.GetLastRouteBySector(sector);
        if (route == null)
            return (null);
        return (route.Url);
    }

    public GetLastRouteUrl(): string {
        for (let i: number = this._routes.length - 1; i >= 0; i--) {
            const route: DrapoRouteItem = this._routes[i];
            if (route.Url != null)
                return (route.Url);
        }
        return (null);
    }

    private GetLastRouteBySector(sector: string): DrapoRouteItem {
        for (let i: number = this._routes.length - 1; i >= 0; i--) {
            const route: DrapoRouteItem = this._routes[i];
            if (route.Sector === sector)
                return (route);
        }
        return (null);
    }

    private GetLastRouteTitle(): string {
        for (let i: number = this._routes.length - 1; i >= 0; i--) {
            const route: DrapoRouteItem = this._routes[i];
            if (route.Title !== null)
                return (route.Title);
        }
        return (null);
    }

    public async CanUseRouter(): Promise<boolean> {
        if (this._canUseRouter === null)
            this._canUseRouter = await this.Application.Config.GetUseRouter();
        return (this._canUseRouter);
    }

    public async Route(url: string, sector: string = null, title: string = null, state: any = null): Promise<void> {
        const canUseRouter: boolean = await this.CanUseRouter();
        this.UpdateTitle(title);
        if (canUseRouter) {
            const route: DrapoRouteItem = this.Create(this.Application.Server.ResolveUrl(url), sector, title, state);
            history.pushState(null, route.Title, route.Url);
        }
        this._application.Log.WriteVerbose("Router - Route to {0}", url);
    }

    public OnPopState(e: Event): void {
        const route: DrapoRouteItem = this._routes.pop();
        if (route == null)
            return;
        
        // Handle navigation for configured routes (no sector) vs manual routes (with sector)
        if (route.Sector != null) {
            // Manual route with sector - use existing logic
            const routePrevious: DrapoRouteItem = this.GetLastRouteBySector(route.Sector);
            const title: string = this.GetLastRouteTitle();
            this.UpdateTitle(title);
            this.Application.Document.StartUpdate(null);
            if (routePrevious == null) {
                // tslint:disable-next-line:no-floating-promises
                this.Application.Document.LoadChildSectorDefault(route.Sector);
            } else {
                // tslint:disable-next-line:no-floating-promises
                this.Application.Document.LoadChildSector(route.Sector, routePrevious.Url, routePrevious.Title, false);
            }
        } else {
            // Configured route without sector - apply the previous route
            const previousUrl: string = this.GetLastRouteUrl();
            const title: string = this.GetLastRouteTitle();
            this.UpdateTitle(title);
            if (previousUrl != null) {
                // tslint:disable-next-line:no-floating-promises
                this.ApplyRoutePath(previousUrl, false, false);
            }
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

    public async UpdateURL(url: string): Promise<void> {
        const urlResolved: string = this.Application.Server.ResolveUrl(url);
        history.pushState(null, document.title, urlResolved);
    }

    public async ApplyRouteStartup(): Promise<boolean> {
        const path: string = window.location.pathname;
        return (await this.ApplyRoutePath(path, true, false));
    }

    public async ApplyRoutePath(path: string, isLoad: boolean, updateHistory: boolean = true): Promise<boolean> {
        const flags: string = 'i';
        const routes: DrapoRoute[] = await this.Application.Config.GetRoutes();
        for (let i: number = 0; i < routes.length; i++) {
            const route: DrapoRoute = routes[i];
            const regex: RegExp = new RegExp(route.Uri, flags);
            if (!regex.test(path))
                continue;
            return (await this.ApplyRoute(path, route, isLoad, updateHistory));
        }
        return (false);
    }

    private async ApplyRoute(path: string, route: DrapoRoute, isLoad: boolean, updateHistory: boolean = true): Promise<boolean> {
        //History
        if (updateHistory) {
            history.pushState(null, null, path);
            // Store route history for back navigation
            this.Create(path, null, document.title, null);
        }
        //Parameters
        await this.ApplyRouteParameters(path, route);
        //Before
        if ((isLoad) && (route.BeforeLoadExpression != null))
            await this.Application.FunctionHandler.ResolveFunctionWithoutContext(null, null, route.BeforeLoadExpression, null);
        //Expression
        await this.Application.FunctionHandler.ResolveFunctionWithoutContext(null, null, route.Expression, null);
        //After
        if ((isLoad) && (route.AfterLoadExpression != null))
            await this.Application.FunctionHandler.ResolveFunctionWithoutContext(null, null, route.AfterLoadExpression, null);
        return (true);
    }

    private async ApplyRouteParameters(path: string, route: DrapoRoute): Promise<void> {
        //Extract
        const parameters: [string, string][] = this.ExtractRouteParameters(path, route);
        //Data
        const routeParameters: any = {};
        for (let i = 0; i < parameters.length; i++) {
            const pair: [string, string] = parameters[i];
            routeParameters[pair[0]] = pair[1];
        }
        //Storage
        const storageRoute: DrapoStorageItem = await this.Application.Storage.RetrieveDataItem('__route', null);
        storageRoute.Data = routeParameters as any[];
    }

    private ExtractRouteParameters(path: string, route: DrapoRoute): [string, string][] {
        return (this.ExtractRegexGroupValues(path, route.Uri));
    }

    private ExtractRegexGroupValues(input: string, patternStr: string): [string, string][] {
        const { pattern, groupNames } = this.TransformNamedGroups(patternStr);
        const regex = new RegExp(pattern);
        const match = regex.exec(input);
        if (!match)
            return null;
        const result: [string, string][] = [];
        groupNames.forEach((name, i) => {
            result.push([name, match[i + 1] ?? '']);
        });
        return result;
    }

    private TransformNamedGroups(patternStr: string): { pattern: string; groupNames: string[] } {
        const groupNames: string[] = [];
        const transformedPattern = patternStr.replace(/\(\?<([a-zA-Z0-9_]+)>/g, (_, name: string) => {
            groupNames.push(name);
            return '(';
        });
        return { pattern: transformedPattern, groupNames };
    }
}

class DrapoWindowHandler {
    //Field
    private _application: DrapoApplication;
    private _windows: DrapoWindow[] = [];

    //Properties
    get Application(): DrapoApplication {
        return (this._application);
    }

    //Constructors
    constructor(application: DrapoApplication) {
        this._application = application;
    }

    public async CreateAndShowWindowDefinition(name: string, parameters: [string, string][]): Promise<void> {
        const windowDefinition: any = await this.GetWindowDefinition(name);
        if (windowDefinition === null)
            return;
        const uri: string = windowDefinition.Path;
        const did: string = windowDefinition.Did;
        const parametersDefault = windowDefinition.Parameters;
        await this.CreateAndShowWindow(uri, did, parameters, parametersDefault);
    }

    public async CreateAndShowWindow(uri: string, did: string, parameters: [string, string][], parametersDefault: any = null): Promise<void> {
        //Windows Container
        const windowsDid: JQuery = $("[d-id='" + did + "']");
        if ((windowsDid === null) || (windowsDid.windowContainer === 0))
            return;
        const elWindowsDid : HTMLElement = windowsDid[0];
        const allowMultipleInstanceUrl: boolean = (!(elWindowsDid.getAttribute('d-window-allowMultipleInstanceUrl') === 'false'));
        if ((!allowMultipleInstanceUrl) && (this.IsWindowLoaded(uri, did)))
            return;
        //Content
        const windowContent: string = await this.Application.Server.GetHTML(uri);
        if (windowContent === null)
            return;
        //Parameters
        let content: string = $(windowContent).last()[0].outerHTML;
        for (let i: number = 0; i < parameters.length; i++) {
            const parameter: [string, string] = parameters[i];
            content = content.replace(parameter[0], parameter[1]);
        }
        //Default Parameters
        if (parametersDefault != null) {
            for (const parameterCode in parametersDefault) {
                const parameterValue = parametersDefault[parameterCode];
                content = content.replace(parameterCode, parameterValue);
            }
        }
        //Jquery Window
        let windowElement: JQuery = null;
        //Template
        const attributes: [string, string][] = this.Application.Parser.ParseElementAttributes(content);
        //Template Url
        const templateUrl: string = this.Application.Solver.Get(attributes, 'd-templateurl');
        let template: string = templateUrl === null ? null : this.Application.Solver.Get(attributes, 'd-template');
        if (template === null)
            template = 'template';
        //Init d-on-Load
        let onLoad: string = null;
        //Template Url Content
        const templateUrlContent = templateUrl === null ? null : await this.Application.Server.GetHTML(templateUrl);
        const templateContent = templateUrlContent === null ? null : this.Application.Parser.ParseDocumentContent(templateUrlContent);
        if (templateContent !== null) {
            //Append Template
            windowsDid.append(templateContent);
            windowElement = windowsDid.children().last();
            const windowElementTemplateJQuery: JQuery = windowElement.find("div[d-template='" + template + "']");
            if (windowElementTemplateJQuery.length === 0) {
                windowElement.html(content);
            } else {
                windowElementTemplateJQuery.html(content);
                const elTemplate: HTMLElement = windowElementTemplateJQuery[0];
                onLoad = elTemplate.getAttribute('d-on-load');
            }
        } else {
            //Append Content
            windowsDid.append(content);
            windowElement = windowsDid.children().last();
        }
        //Sector
        const elWindow: HTMLElement = windowElement[0];
        const sector: string = this.Application.Document.GetSectorParent(elWindow);
        let elSector: string = elWindow.getAttribute('d-sector');
        if (elSector === "@") {
            elSector = this.Application.Document.CreateGuid();
            elWindow.setAttribute('d-sector', elSector);
            await this.Application.Document.AddSectorHierarchy(elSector, sector);
        }
        //Window
        const window: DrapoWindow = new DrapoWindow();
        window.Code = this.Application.Document.CreateGuid();
        window.Did = did;
        window.Uri = uri;
        //Resolve
        window.Element = windowElement[0];
        this._windows.push(window);
        await this.Application.Document.ResolveWindow($(window.Element));
        //d-on-load
        if (onLoad != null)
            await this.Application.FunctionHandler.ResolveFunctionWithoutContext(elSector, elWindow, onLoad);
    }

    private IsWindowLoaded(uri: string, did: string): boolean {
        for (let i: number = this._windows.length - 1; i >= 0; i--) {
            const window: DrapoWindow = this._windows[i];
            if ((window.Did === did) && (window.Uri === uri))
                return (true);
        }
        return (false);
    }

    public async CloseWindow(did: string, all: boolean, type: string): Promise<void> {
        if (this._windows.length == 0)
            return;
        const isTypeHidden: boolean = type === 'hidden';
        for (let i: number = this._windows.length - 1; i >= 0; i--) {
            const window: DrapoWindow = this._windows[i];
            if ((did !== null) && (did !== '') && (window.Did !== did) && (window.Code !== did))
                continue;
            if ((isTypeHidden) && (window.Visible))
                continue;
            await this.DestroyWindowElement(window);
            this._windows.splice(i, 1);
            if (!all)
                break;
        }
    }

    public async TryClose(window: DrapoWindow): Promise<void> {
        const parent: JQuery = $(window.Element).parent();
        if ((parent == null) || (parent.length == 0))
            return;
        await this.DestroyWindowElement(window);
        for (let i: number = this._windows.length - 1; i >= 0; i--) {
            if (window !== this._windows[i])
                continue;
            this._windows.splice(i, 1);
            break;
        }
    }

    public async DestroyWindowElement(window: DrapoWindow): Promise<void> {
        await this.Application.Document.RemoveElement(window.Element);
        await this.Application.ComponentHandler.UnloadComponentInstancesDetachedFullCheck();
    }

    public async HideWindow(did: string, all: boolean): Promise<DrapoWindow> {
        if (this._windows.length == 0)
            return;
        let windowHidden: DrapoWindow = null;
        for (let i: number = this._windows.length - 1; i >= 0; i--) {
            const window: DrapoWindow = this._windows[i];
            if ((did !== null) && (did !== '') && (window.Did !== did))
                continue;
            if (!window.Visible)
                continue;
            window.Visible = false;
            windowHidden = window;
            this.Application.Document.Hide($(window.Element));
            if (!all)
                break;
        }
        return (windowHidden);
    }

    private async GetWindowDefinition(name: string): Promise<any> {
        const windows: any[] = await this.Application.Config.GetSector("Windows");
        if (windows === null)
            return (null);
        for (let i: number = 0; i < windows.length; i++) {
            const window: any = windows[i];
            if (window.Name === name)
                return (window);
        }
        return (null);
    }

    public GetWindowByElement(el: Element): DrapoWindow {
        while (el !== null) {
            for (let i: number = this._windows.length - 1; i >= 0; i--) {
                const window: DrapoWindow = this._windows[i];
                if (window.Element === el)
                    return (window);
            }
            el = el.parentElement;
        }
        return (null);
    }
}

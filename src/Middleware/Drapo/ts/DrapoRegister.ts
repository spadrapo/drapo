class DrapoRegister {
    //Field
    private _application: DrapoApplication;
    private _components: string[] = [];
    private _componentsActivation: { [tagName: string]: Promise<void> } = {};
    private _cacheKeys: string[] = [];
    private _cacheDatas: string[] = [];

    //Properties
    get Application(): DrapoApplication {
        return (this._application);
    }

    //Constructors
    constructor(application: DrapoApplication) {
        this._application = application;
    }

    private async GetRegisteredComponent(tagName: string): Promise<any>
    {
        const components: any[] = await this.Application.Config.GetSector("Components");
        if (components == null)
            return (null);
        for (let i: number = 0; i < components.length; i++) {
            const component: any = components[i];
            if (component.Tag == tagName)
                return (component);
        }
        return(null);
    }

    public async IsRegisteredComponent(tagName: string): Promise<boolean>
    {
        return (await this.GetRegisteredComponent(tagName) != null);
    }

    public IsActiveComponent(tagName: string): boolean {
        for (let i: number = 0; i < this._components.length; i++)
            if (this._components[i] === tagName)
                return (true);
        return (false);
    }

    public async ActivateComponent(tagName : string) : Promise<void>
    {
        // A concurrent caller awaits the activation in progress instead of appending the files again
        const activation: Promise<void> = this._componentsActivation[tagName];
        if (activation != null)
            return (await activation);
        if (this.IsActiveComponent(tagName))
            return;
        // Mark as active before the first await so a concurrent resolution of the same tag does not load it twice
        this._components.push(tagName);
        const activationNew: Promise<void> = this.ActivateComponentFiles(tagName);
        this._componentsActivation[tagName] = activationNew;
        try {
            await activationNew;
        } catch (e) {
            // A failed activation can be retried
            this.UnmarkComponentAsActive(tagName);
            throw e;
        } finally {
            delete this._componentsActivation[tagName];
        }
    }

    public async TryMarkComponentAsActive(tagName: string): Promise<boolean>
    {
        // Waits for the activations in progress, then decides without yielding so no other activation can start in between
        let activation: Promise<void> = this._componentsActivation[tagName];
        while (activation != null) {
            try {
                await activation;
            } catch (e) {
                // The caller of ActivateComponent receives the error
            }
            activation = this._componentsActivation[tagName];
        }
        if (this.IsActiveComponent(tagName))
            return (false);
        this._components.push(tagName);
        return (true);
    }

    private async ActivateComponentFiles(tagName: string): Promise<void>
    {
        const component: any = await this.GetRegisteredComponent(tagName);
        // Resolve every url before appending, so a failure leaves nothing on the page
        const files: [any, string][] = [];
        for (let i: number = 0; i < component.Files.length; i++)
        {
            const file: any = component.Files[i];
            if ((file.Type === 2) || (file.Type === 1))
                files.push([file, this.Application.Server.ResolveUrl(await this.GetComponentFileUrl(component, file))]);
        }
        for (let i: number = 0; i < files.length; i++)
        {
            const [file, url] = files[i];
            if (file.Type === 2)
                this.ActivateComponentFileScript(url);
            else
                this.ActivateComponentFileStyle(url);
        }
    }

    private UnmarkComponentAsActive(tagName: string): void {
        const index: number = this._components.indexOf(tagName);
        if (index >= 0)
            this._components.splice(index, 1);
    }

    public MarkComponentAsActive(tagName: string): void {
        if (!this.IsActiveComponent(tagName))
            this._components.push(tagName);
    }

    private ActivateComponentFileScript(url: string): void
    {
        const script: HTMLScriptElement = document.createElement('script');
        script.src = url;
        script.async = false;
        document.head.appendChild(script);
    }

    private ActivateComponentFileStyle(url: string): void
    {
        const link: HTMLLinkElement = document.createElement('link');
        link.href = url;
        link.rel = 'stylesheet';
        document.head.appendChild(link);
    }

    public async CreateInstanceComponent(tagName: string, el : HTMLElement): Promise<any>
    {
        const component: any = await this.GetRegisteredComponent(tagName);
        if ((component.Constructor == null) || (component.Constructor == ''))
            return;
        await this.WaitForFunction(component.Constructor);
        const constructor = (window as any)[component.Constructor];
        if (constructor == null)
            return;
        const result: any = constructor(el, this.Application);
        if (Promise.resolve(result) == result) {
            const resultPromise: Promise<any> = result;
            return(await resultPromise);
        }
        return (null);
    }

    private async WaitForFunction(functionName: string, retry: number = 1000, interval: number = 1000) : Promise<void>
    {
        for (let i: number = 0; i < retry; i++) {
            const functionReference: any = (window as any)[functionName];
            if (functionReference != null)
                return;
            await this.Application.Document.Sleep(interval);
        }
    }

    public async GetRegisteredComponentViewContent(tagName : string) : Promise<string>
    {
        const component: any = await this.GetRegisteredComponent(tagName);
        if (component == null)
            return (null);
        for (let i = 0; i < component.Files.length; i++)
        {
            const file: any = component.Files[i];
            if (file.Type === 0)
                return (await this.GetRegisteredComponentFileContent(component, file));
        }
        return (null);
    }

    private async GetRegisteredComponentFileContent(component : any, file : any) : Promise<string>
    {
        const key: string = this.CreateKeyComponentFile(component, file);
        let index: number = this.GetCacheKeyIndex(key);
        if (index == null)
            index = this.AddCacheData(key, await this.GetRegisteredComponentFileContentInternal(component, file));
        return (this.GetCacheData(index));
    }

    public async GetComponentTagsByFileUrl(): Promise<{ [url: string]: string }> {
        const tags: { [url: string]: string } = {};
        const components: any[] = await this.Application.Config.GetSector("Components");
        if (components == null)
            return (tags);
        for (const component of components)
            for (const file of component.Files)
                tags[this.GetComponentFileRelativeUrl(component, file)] = component.Tag;
        return (tags);
    }

    private GetComponentFileRelativeUrl(component: any, file: any): string {
        return (file.ResourceType === 1 ? file.Path : '~/components/' + component.Name + '/' + file.Name);
    }

    private async GetComponentFileUrl(component: any, file: any) : Promise<string>
    {
        let url: string = this.GetComponentFileRelativeUrl(component, file);
        url += await this.Application.Server.AppendUrlQueryStringCacheStatic(url);
        return (url);
    }

    private async GetRegisteredComponentFileContentInternal(component: any, file: any): Promise<string>
    {
        const url: string = await this.GetComponentFileUrl(component, file);
        const htmlCached: string = await this.Application.CacheHandler.GetCachedComponentView(url);
        if (htmlCached != null)
            return (htmlCached);
        const response: [string, boolean] = await this.Application.Server.GetHTML(url);
        if (response == null)
            return (null);
        const html: string = response[0];
        const allowCache: boolean = response[1];
        if (allowCache)
            await this.Application.CacheHandler.SetCachedComponentView(url, html);
        return (html);
    }

    private CreateKeyComponentFile(component: any, file: any) : string
    {
        return (component.Name + ':' + file.Name);
    }

    private GetCacheKeyIndex(dataKey: string): number {
        for (let i = 0; i < this._cacheKeys.length; i++) {
            if (this._cacheKeys[i] == dataKey)
                return (i);
        }
        return (null);
    }

    private GetCacheData(dataIndex: number): string {
        return (this._cacheDatas[dataIndex]);
    }

    private AddCacheData(dataKey: string, data: string): number {
        this._cacheKeys.push(dataKey);
        this._cacheDatas.push(data);
        return (this._cacheKeys.length - 1);
    }

    private IsEndsWith(text: string, value: string): boolean {
        const length: number = value.length;
        if (text.length < length)
            return (false);
        return (text.substr(text.length - length) === value);
    }

}

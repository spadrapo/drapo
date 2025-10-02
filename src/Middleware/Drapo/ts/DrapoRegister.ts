class DrapoRegister {
    //Field
    private _application: DrapoApplication;
    private _components: string[] = [];
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
        const component: any = await this.GetRegisteredComponent(tagName);
        this._components.push(tagName);
        for (let i: number = 0; i < component.Files.length; i++)
        {
            const file: any = component.Files[i];
            if (file.Type === 2)
                await this.ActivateComponentFileScript(component, file);
            else if (file.Type === 1)
                await this.ActivateComponentFileStyle(component, file);
        }
    }

    public MarkComponentAsActive(tagName: string): void {
        if (!this.IsActiveComponent(tagName))
            this._components.push(tagName);
    }

    private async ActivateComponentFileScript(component: any, file : any) : Promise<void>
    {
        const relatedUrl: string = await this.GetComponentFileUrl(component, file);
        const url: string = this.Application.Server.ResolveUrl(relatedUrl);
        const script: HTMLScriptElement = document.createElement('script');
        script.src = url;
        script.async = false;
        document.head.appendChild(script);
    }

    private async ActivateComponentFileStyle(component: any, file: any): Promise<void>
    {
        const relatedUrl: string = await this.GetComponentFileUrl(component, file);
        const url: string = this.Application.Server.ResolveUrl(relatedUrl);
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

    private async GetComponentFileUrl(component: any, file: any) : Promise<string>
    {
        let url: string = file.ResourceType === 1 ? file.Path : '~/components/' + component.Name + '/' + file.Name;
        url += await this.Application.Server.AppendUrlQueryStringCacheStatic(url);
        return (url);
    }

    private async GetRegisteredComponentFileContentInternal(component: any, file: any): Promise<string>
    {
        const url: string = await this.GetComponentFileUrl(component, file);
        const htmlCached: string = this.Application.CacheHandler.GetCachedComponentView(url);
        if (htmlCached != null)
            return (htmlCached);
        const response: [string, boolean] = await this.Application.Server.GetHTML(url);
        if (response == null)
            return (null);
        const html: string = response[0];
        const allowCache: boolean = response[1];
        if (allowCache)
            this.Application.CacheHandler.SetCachedComponentView(url, html);
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

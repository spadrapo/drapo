class DrapoConfig {
    //Field
    private _application: DrapoApplication;
    private _url: string = null;
    private _cacheKeys: string[] = null;
    private _cacheDatas: any[][] = null;
    private _timezone: number = null;

    //Properties
    get Application(): DrapoApplication {
        return (this._application);
    }

    //Constructors
    constructor(application: DrapoApplication) {
        this._application = application;
    }

    private GetUrl(): string {
        if (this._url == null)
            this._url = this.GetUrlInternal();
        return (this._url);
    }

    private GetUrlInternal(): string {
        return ('~/drapo.json');
    }

    private async Load(): Promise<void> {
        this._cacheKeys = [];
        this._cacheDatas = [];
        const data: any[] = await this.Application.Server.GetJSON(this.GetUrl());
        for (const property in data) {
            this._cacheKeys.push(property);
            this._cacheDatas.push(data[property]);
        }
    }

    private IsLoaded(): boolean {
        return (this._cacheKeys != null);
    }

    private async EnsureLoaded(): Promise<void> {
        if (this.IsLoaded())
            return;
        await this.Load();
    }

    public async GetSector(name: string): Promise<any> {
        await this.EnsureLoaded();
        const index = this.GetCacheKeyIndex(name);
        if (index == null)
            return (null);
        return (this.GetCacheData(index));
    }

    private GetCacheKeyIndex(dataKey: string): number {
        for (let i = 0; i < this._cacheKeys.length; i++) {
            if (this._cacheKeys[i] == dataKey)
                return (i);
        }
        return (null);
    }

    private GetCacheData(dataIndex: number): any[] {
        return (this._cacheDatas[dataIndex]);
    }

    private AddCacheData(dataKey: string, data: any[]): void {
        this._cacheKeys.push(dataKey);
        this._cacheDatas.push(data);
    }

    public async GetProperty(name: string): Promise<string> {
        const config: any = await this.GetSector(name);
        if ((config === undefined) || (config === null))
            return (null);
        return (config);
    }

    private async GetPropertyBoolean(name: string): Promise<boolean> {
        const value: string = await this.GetProperty(name);
        if (value == null)
            return (false);
        return (value.toString() == 'true');
    }

    private async GetPropertyArray(name: string): Promise<any[]> {
        const value: any = await this.GetSector(name);
        if ((value === undefined) || (value === null))
            return (null);
        return (value);
    }

    public async GetUsePipes(): Promise<boolean> {
        return (await this.GetPropertyBoolean('UsePipes'));
    }

    public async GetUseRouter(): Promise<boolean> {
        return (await this.GetPropertyBoolean('UseRouter'));
    }

    public async GetCanUseWebSocket(): Promise<boolean> {
        return (await this.GetPropertyBoolean('CanUseWebSocket'));
    }

    public async GetUseCacheLocalStorage(): Promise<boolean> {
        return (await this.GetPropertyBoolean('UseCacheLocalStorage'));
    }

    public async GetUseCacheStatic(): Promise<boolean> {
        return (await this.GetPropertyBoolean('UseCacheStatic'));
    }

    public async GetPipeHubName(): Promise<string> {
        return (await this.GetProperty('PipeHubName'));
    }

    public async GetPipeActionRegister(): Promise<string> {
        return (await this.GetProperty('PipeActionRegister'));
    }

    public async GetPipeActionNotify(): Promise<string> {
        return (await this.GetProperty('PipeActionNotify'));
    }

    public async GetPipeActionPolling(): Promise<string> {
        return (await this.GetProperty('PipeActionPolling'));
    }

    public async GetPipeHeaderConnectionId(): Promise<string> {
        return (await this.GetProperty('PipeHeaderConnectionId'));
    }

    public async GetOnAuthorizationRequest(): Promise<string> {
        return (await this.GetProperty('OnAuthorizationRequest'));
    }

    public async GetOnError(): Promise<string> {
        return (await this.GetProperty('OnError'));
    }

    public async GetOnReconnect(): Promise<string> {
        return (await this.GetProperty('OnReconnect'));
    }

    public async GetStorageErrors(): Promise<string> {
        return (await this.GetProperty('StorageErrors'));
    }

    public async GetOnBadRequest(): Promise<string> {
        return (await this.GetProperty('OnBadRequest'));
    }

    public async GetStorageBadRequest(): Promise<string> {
        return (await this.GetProperty('StorageBadRequest'));
    }

    public async GetValidatorUncheckedClass(): Promise<string> {
        return (await this.GetProperty('ValidatorUncheckedClass'));
    }

    public async GetValidatorValidClass(): Promise<string> {
        return (await this.GetProperty('ValidatorValidClass'));
    }

    public async GetValidatorInvalidClass(): Promise<string> {
        return (await this.GetProperty('ValidatorInvalidClass'));
    }

    public async GetApplicationBuild(): Promise<string> {
        return (await this.GetProperty('ApplicationBuild'));
    }

    public async GetHeaderContainerId(): Promise<string> {
        return (await this.GetProperty('HeaderContainerId'));
    }

    public async GetHeaderCSRF(): Promise<string> {
        return (await this.GetProperty('HeaderCSRF'));
    }

    public async GetTimestamp(): Promise<string> {
        return (await this.GetProperty('Timestamp'));
    }

    public async GetViews(): Promise<DrapoView[]> {
        return (await this.GetPropertyArray('Views'));
    }

    public async GetRoutes(): Promise<DrapoRoute[]> {
        return (await this.GetPropertyArray('Routes'));
    }

    public GetTimezone(): number {
        return (this._timezone);
    }

    public SetTimezone(value : number): void {
        this._timezone = value;
    }
}

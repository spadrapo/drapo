class DrapoCacheHandler {
    private _application: DrapoApplication;
    private _hasLocalStorage: boolean = null;
    private _useLocalStorage: boolean = false;
    private _applicationBuild: string = null;
    private readonly TYPE_DATA: string = "data";

    //Properties
    private get Application(): DrapoApplication {
        return (this._application);
    }

    private get CanUseLocalStorage(): boolean {
        return ((this._hasLocalStorage) && (this._useLocalStorage));
    }

    //Constructors
    constructor(application: DrapoApplication) {
        this._application = application;
        this._hasLocalStorage = window.localStorage != null;
    }

    public async Initialize(): Promise<boolean> {
        this._useLocalStorage = await this.Application.Config.GetUseCacheLocalStorage();
        this._applicationBuild = await this.Application.Config.GetApplicationBuild();
        return (true);
    }

    public EnsureLoaded(storageItem: DrapoStorageItem, sector: string, dataKey: string, dataPath: string[] = null): boolean {
        if (!this.CanUseLocalStorage)
            return (false);
        const cacheKey: string = this.CreateCacheKey(this.TYPE_DATA, storageItem.CacheKeys, sector, dataKey, dataPath);
        if (cacheKey == null)
            return (false);
        const valueCached: any = this.GetClientDataCache(cacheKey);
        if (valueCached == null)
            return (false);
        const appended: boolean = this.AppendStorageDataCache(storageItem, valueCached);
        return (appended);
    }

    public GetCachedData(cacheKeys: string[], sector: string, dataKey: string): any[]{
        if (!this.CanUseLocalStorage)
            return (null);
        const cacheKey: string = this.CreateCacheKey(this.TYPE_DATA, cacheKeys, sector, dataKey, null);
        if (cacheKey == null)
            return (null);
        const valueCached: any = this.GetClientDataCache(cacheKey);
        return (valueCached);
    }

    public AppendCacheData(cacheKeys: string[], sector: string, dataKey: string, value: any, isDelay: boolean = false): boolean {
        if (!this.CanUseLocalStorage)
            return (false);
        if ((cacheKeys == null) || (cacheKeys.length == 0))
            return (null);
        let appended: boolean = false;
        if (isDelay){
            for (const dataField in value)
            {
                const dataPath: string[] = [dataKey, dataField];
                const dataPathValue: string = value[dataField];
                if (this.AppendCacheDataEntry(cacheKeys, sector, dataKey, dataPath, dataPathValue))
                    appended = true;
            }
        } else {
            appended = this.AppendCacheDataEntry(cacheKeys, sector, dataKey, null, value);
        }
        return (appended);
    }

    private AppendCacheDataEntry(cacheKeys: string[], sector: string, dataKey: string, dataPath: string[], value: any): boolean {
        const cacheKey: string = this.CreateCacheKey(this.TYPE_DATA, cacheKeys, sector, dataKey, dataPath);
        if (cacheKey == null)
            return (false);
        this.SetClientDataCache(cacheKey, value);
        return (true);
    }

    private CreateCacheKey(type: string, cacheKeys: string[], sector: string, dataKey: string, dataPath: string[]): string {
        if ((cacheKeys == null) || (cacheKeys.length == 0))
            return (null);
        let key: string = type;
        for (let i: number = 0; i < cacheKeys.length; i++) {
            const cacheKey: string = cacheKeys[i];
            const cacheKeyValue: string = this.GetKey(cacheKey, sector, dataKey, dataPath);
            if (cacheKeyValue == null)
                return (null);
            key = key + '_' + cacheKeyValue;
        }
        return (key);
    }

    private GetKey(cacheKey: string, sector: string, dataKey: string, dataPath: string[]): string {
        const key: string = cacheKey.toLowerCase();
        if (key == 'datakey')
            return (dataKey);
        if (key == 'datapath') {
            if ((dataPath == null) || (dataPath.length <= 1))
                return (dataKey);
            let dataPathValue: string = dataPath[0];
            for (let i: number = 1; i < dataPath.length; i++)
                dataPathValue = dataPathValue + '.' + dataPath[i];
            return (dataPathValue);
        }
        if (key == 'culture') {
            return (this.Application.Globalization.GetCulture());
        }
        if (key == 'applicationbuild') {
            return (this._applicationBuild);
        }
        return (null);
    }

    private AppendStorageDataCache(storageItem: DrapoStorageItem, valueCached: any[]): boolean {
        if (storageItem.IsDelay) {
            for (const dataField in valueCached)
                storageItem.Data[dataField] = valueCached[dataField];
        } else {
            storageItem.Data = valueCached;
        }
        return (true);
    }

    private GetClientDataCache(cacheKey: string): any {
        const value: any = window.localStorage.getItem(cacheKey);
        if (value == null)
            return (null);
        return(this.Application.Serializer.Deserialize(value));
    }

    private SetClientDataCache(cacheKey: string, value: any): void {
        const valueSerialized: string = this.Application.Serializer.SerializeObject(value);
        window.localStorage.setItem(cacheKey, valueSerialized);
    }
}
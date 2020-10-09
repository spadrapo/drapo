declare class DrapoCacheHandler {
    private _application;
    private _hasLocalStorage;
    private _useLocalStorage;
    private _applicationBuild;
    private readonly TYPE_DATA;
    private readonly TYPE_COMPONENT;
    private readonly TYPE_VIEW;
    private get Application();
    private get CanUseLocalStorage();
    constructor(application: DrapoApplication);
    Initialize(): Promise<boolean>;
    EnsureLoaded(storageItem: DrapoStorageItem, sector: string, dataKey: string, dataPath?: string[]): boolean;
    GetCachedData(cacheKeys: string[], sector: string, dataKey: string): any[];
    AppendCacheData(cacheKeys: string[], sector: string, dataKey: string, value: any, isDelay?: boolean): boolean;
    private AppendCacheDataEntry;
    private CreateCacheKey;
    private GetKey;
    private AppendStorageDataCache;
    private GetClientDataCache;
    private SetClientDataCache;
}

declare class DrapoConfig {
    private _application;
    private _url;
    private _cacheKeys;
    private _cacheDatas;
    get Application(): DrapoApplication;
    constructor(application: DrapoApplication);
    private GetUrl;
    private GetUrlInternal;
    private Load;
    private IsLoaded;
    private EnsureLoaded;
    GetSector(name: string): Promise<any>;
    private GetCacheKeyIndex;
    private GetCacheData;
    private AddCacheData;
    GetProperty(name: string): Promise<string>;
    private GetPropertyBoolean;
    private GetPropertyArray;
    GetUsePipes(): Promise<boolean>;
    GetUseRouter(): Promise<boolean>;
    GetUseCacheLocalStorage(): Promise<boolean>;
    GetUseCacheStatic(): Promise<boolean>;
    GetPipeHubName(): Promise<string>;
    GetPipeActionRegister(): Promise<string>;
    GetPipeActionNotify(): Promise<string>;
    GetPipeHeaderConnectionId(): Promise<string>;
    GetOnAuthorizationRequest(): Promise<string>;
    GetOnError(): Promise<string>;
    GetStorageErrors(): Promise<string>;
    GetOnBadRequest(): Promise<string>;
    GetStorageBadRequest(): Promise<string>;
    GetValidatorUncheckedClass(): Promise<string>;
    GetValidatorValidClass(): Promise<string>;
    GetValidatorInvalidClass(): Promise<string>;
    GetApplicationBuild(): Promise<string>;
    GetViews(): Promise<DrapoView[]>;
}

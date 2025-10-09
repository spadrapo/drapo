class DrapoCacheHandler {
    private _application: DrapoApplication;
    private _hasLocalStorage: boolean = null;
    private _useLocalStorage: boolean = false;
    private _useCacheLocalStorageCleanup: boolean = true;
    private _applicationBuild: string = null;
    private _cacheKeysView: string[] = null;
    private _cacheKeysComponentView: string[] = null;
    private _cacheKeysComponentStyle: string[] = null;
    private _cacheKeysComponentScript: string[] = null;
    private readonly TYPE_DATA: string = "d";
    private readonly TYPE_COMPONENTVIEW: string = "cv";
    private readonly TYPE_COMPONENTSTYLE: string = "cs";
    private readonly TYPE_COMPONENTSCRIPT: string = "cj";
    private readonly TYPE_VIEW: string = "v";
    private readonly TYPE_PACK: string = "p";

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
        this._useCacheLocalStorageCleanup = await this.Application.Config.GetUseCacheLocalStorageCleanup();
        this._applicationBuild = await this.Application.Config.GetApplicationBuild();
        if (this._useCacheLocalStorageCleanup) {
            this.CleanupOldVersionCache();
        }
        this._cacheKeysView = await this.GetConfigurationKeys('CacheKeysView');
        this._cacheKeysComponentView = await this.GetConfigurationKeys('CacheKeysComponentView');
        this._cacheKeysComponentStyle = await this.GetConfigurationKeys('CacheKeysComponentStyle');
        this._cacheKeysComponentScript = await this.GetConfigurationKeys('CacheKeysComponentScript');
        return (true);
    }

    public EnsureLoaded(storageItem: DrapoStorageItem, sector: string, dataKey: string, dataPath: string[] = null): boolean {
        if (!this.CanUseLocalStorage)
            return (false);
        const cacheKey: string = this.CreateCacheKey(this.TYPE_DATA, storageItem.CacheKeys, sector, dataKey, dataPath, null);
        if (cacheKey == null)
            return (false);
        const valueCached: any = this.GetClientDataCache(cacheKey);
        if (valueCached == null)
            return (false);
        const appended: boolean = this.AppendStorageDataCache(storageItem, dataPath, valueCached);
        return (appended);
    }

    public GetCachedData(cacheKeys: string[], sector: string, dataKey: string): any[] {
        if (!this.CanUseLocalStorage)
            return (null);
        const cacheKey: string = this.CreateCacheKey(this.TYPE_DATA, cacheKeys, sector, dataKey, null, null);
        if (cacheKey == null)
            return (null);
        const valueCached: any = this.GetClientDataCache(cacheKey);
        return (valueCached);
    }

    public GetCachedDataPath(cacheKeys: string[], sector: string, dataKey: string, dataPath: string[]): any {
        if (!this.CanUseLocalStorage)
            return (null);
        const cacheKey: string = this.CreateCacheKey(this.TYPE_DATA, cacheKeys, sector, dataKey, dataPath, null);
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
        if (isDelay) {
            for (const dataField in value) {
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

    public GetCachedView(url: string): string {
        if (!this.CanUseLocalStorage)
            return (null);
        const cacheKey: string = this.CreateCacheKey(this.TYPE_VIEW, this._cacheKeysView, null, null, null, url);
        if (cacheKey == null)
            return (null);
        const value: string = this.GetClientDataCache(cacheKey);
        return (value);
    }

    public SetCachedView(url: string, value: string) : boolean {
        if (!this.CanUseLocalStorage)
            return (false);
        const cacheKey: string = this.CreateCacheKey(this.TYPE_VIEW, this._cacheKeysView, null, null, null, url);
        if (cacheKey == null)
            return (false);
        this.SetClientDataCache(cacheKey, value);
        return (true);
    }

    public GetCachedComponentView(url: string): string {
        if (!this.CanUseLocalStorage)
            return (null);
        const cacheKey: string = this.CreateCacheKey(this.TYPE_COMPONENTVIEW, this._cacheKeysView, null, null, null, url);
        if (cacheKey == null)
            return (null);
        const value: string = this.GetClientDataCache(cacheKey);
        return (value);
    }

    public SetCachedComponentView(url: string, value: string): boolean {
        if (!this.CanUseLocalStorage)
            return (false);
        const cacheKey: string = this.CreateCacheKey(this.TYPE_COMPONENTVIEW, this._cacheKeysView, null, null, null, url);
        if (cacheKey == null)
            return (false);
        this.SetClientDataCache(cacheKey, value);
        return (true);
    }

    private async GetConfigurationKeys(name: string): Promise<string[]> {
        const value: string = await this.Application.Config.GetProperty(name);
        if ((value == null) || (value == ''))
            return (null);
        const values: string[] = this.Application.Parser.ParsePipes(value);
        if ((values == null) || (values.length == 0))
            return (null);
        return (values);
    }

    private AppendCacheDataEntry(cacheKeys: string[], sector: string, dataKey: string, dataPath: string[], value: any): boolean {
        const cacheKey: string = this.CreateCacheKey(this.TYPE_DATA, cacheKeys, sector, dataKey, dataPath, null);
        if (cacheKey == null)
            return (false);
        this.SetClientDataCache(cacheKey, value);
        return (true);
    }

    private CreateCacheKey(type: string, cacheKeys: string[], sector: string, dataKey: string, dataPath: string[], url: string, packName: string = null): string {
        if ((cacheKeys == null) || (cacheKeys.length == 0))
            return (null);
        let key: string = type;
        for (let i: number = 0; i < cacheKeys.length; i++) {
            const cacheKey: string = cacheKeys[i];
            const cacheKeyValue: string = this.GetKey(cacheKey, sector, dataKey, dataPath, url, packName);
            if (cacheKeyValue == null)
                return (null);
            key = key + '_' + cacheKeyValue;
        }
        return (key);
    }

    private GetKey(cacheKey: string, sector: string, dataKey: string, dataPath: string[], url: string, packName: string = null): string {
        const key: string = cacheKey.toLowerCase();
        if (key == 'datakey')
            return (dataKey);
        if (key == 'url')
            return (url);
        if (key == 'packname')
            return (packName);
        if (key == 'datapath') {
            if ((dataPath == null) || (dataPath.length <= 1))
                return (dataKey);
            let dataPathValue: string = dataPath[0];
            for (let i: number = 1; i < dataPath.length; i++)
                dataPathValue = dataPathValue + '.' + dataPath[i];
            return (dataPathValue);
        }
        if (key == 'culture')
            return (this.Application.Globalization.GetCulture());
        if (key == 'applicationbuild')
            return (this._applicationBuild);
        if (key == 'view')
            return (this.Application.CookieHandler.GetView());
        if (key == 'theme')
            return (this.Application.CookieHandler.GetTheme());
        return (null);
    }

    private AppendStorageDataCache(storageItem: DrapoStorageItem, dataPath: string[], valueCached: any): boolean {
        if (storageItem.IsDelay) {
            const data: any = storageItem.Data;
            const dataField: string = dataPath[1];
            data[dataField] = valueCached;
        } else {
            storageItem.Data = valueCached;
        }
        return (true);
    }

    private GetClientDataCache(cacheKey: string): any {
        let value: any = null;
        try {
            value = window.localStorage.getItem(cacheKey);
            if (value == null)
                return (null);
        } catch (e) {
            this._useLocalStorage = false;
            // tslint:disable-next-line:no-floating-promises
            this.Application.ExceptionHandler.Handle(e, 'DrapoCacheHandler - GetClientDataCache :' + cacheKey);
        }
        try {
            return (this.Application.Serializer.Deserialize(value));
        } catch{
            return (null);
        }
    }

    private SetClientDataCache(cacheKey: string, value: any): void {
        try {
            const valueSerialized: string = this.Application.Serializer.SerializeObject(value);
            window.localStorage.setItem(cacheKey, valueSerialized);
        } catch (e) {
            this._useLocalStorage = false;
            // tslint:disable-next-line:no-floating-promises
            this.Application.ExceptionHandler.Handle(e, 'DrapoCacheHandler - SetClientDataCache');
        }
    }

    public GetCachedPack(packName: string): any {
        if (!this.CanUseLocalStorage)
            return (null);
        const cacheKey: string = this.CreatePackCacheKey(packName);
        return this.GetClientDataCache(cacheKey);
    }

    public SetCachedPack(packName: string, packData: any, etag: string = null): void {
        if (!this.CanUseLocalStorage)
            return;
        const cacheKey: string = this.CreatePackCacheKey(packName);
        const cacheItem = { data: packData, etag, timestamp: Date.now() };
        this.SetClientDataCache(cacheKey, cacheItem);
    }

    private CreatePackCacheKey(packName: string): string {
        const cacheKeys = ['applicationbuild', 'packname'];
        return this.CreateCacheKey(this.TYPE_PACK, cacheKeys, null, null, null, null, packName);
    }

    private CleanupOldVersionCache(): void {
        if (!this.CanUseLocalStorage || !this._applicationBuild)
            return;

        try {
            const versionKey = 'drapo_current_version';
            const storedVersion = window.localStorage.getItem(versionKey);

            if (storedVersion === null || storedVersion !== this._applicationBuild) {
                // This is a new version or version has changed, clear all cache entries that depend on applicationbuild
                this.ClearVersionDependentCache();
                // Mark this version as current
                window.localStorage.setItem(versionKey, this._applicationBuild);
            }
        } catch (e) {
            // If we can't access localStorage, disable it
            this._useLocalStorage = false;
            // tslint:disable-next-line:no-floating-promises
            this.Application.ExceptionHandler.Handle(e, 'DrapoCacheHandler - CleanupOldVersionCache');
        }
    }

    private ClearVersionDependentCache(): void {
        if (!this.CanUseLocalStorage || !this._applicationBuild)
            return;

        try {
            const keysToRemove: string[] = [];

            // Get all configured cache key patterns that include applicationbuild
            const cacheKeyConfigs = [
                { type: this.TYPE_VIEW, keys: this._cacheKeysView },
                { type: this.TYPE_COMPONENTVIEW, keys: this._cacheKeysComponentView },
                { type: this.TYPE_COMPONENTSTYLE, keys: this._cacheKeysComponentStyle },
                { type: this.TYPE_COMPONENTSCRIPT, keys: this._cacheKeysComponentScript }
            ];

            // Filter configs to only those that include applicationbuild
            const applicationBuildConfigs = cacheKeyConfigs.filter((config) => {
                if (config.keys == null) return false;
                return config.keys.some((cacheKeyName) => cacheKeyName.toLowerCase() === 'applicationbuild');
            });

            // Iterate through all localStorage keys - collect keys first to avoid iteration issues
            const allKeys: string[] = [];
            for (let i = 0; i < window.localStorage.length; i++) {
                const key = window.localStorage.key(i);
                if (key !== null) {
                    allKeys.push(key);
                }
            }

            // Check each key to see if it should be removed
            for (const key of allKeys) {
                // Check if this key matches any cache type that uses applicationbuild
                for (const config of applicationBuildConfigs) {
                    if (key.startsWith(config.type + '_')) {
                        // Check if this key contains the current application build version
                        if (!key.includes('_' + this._applicationBuild + '_')) {
                            // This key doesn't contain the current version, so it's from an old version
                            keysToRemove.push(key);
                        }
                        break;
                    }
                }

                // Also handle pack cache which has a known pattern
                if (key.startsWith(this.TYPE_PACK + '_') && !key.includes('_' + this._applicationBuild + '_')) {
                    keysToRemove.push(key);
                }

                // Handle data cache - this is trickier as it depends on individual data item cache keys
                if (key.startsWith(this.TYPE_DATA + '_')) {
                    // For data cache, we'll use a more conservative approach
                    // Only remove if it clearly contains a version pattern that's not the current version
                    const keyParts = key.split('_');
                    for (let i = 0; i < keyParts.length; i++) {
                        const part = keyParts[i];
                        // Look for version-like patterns (numbers with dots)
                        if (part.match(/^\d+(\.\d+)+$/) && part !== this._applicationBuild) {
                            keysToRemove.push(key);
                            break;
                        }
                    }
                }
            }

            // Remove all outdated cache entries
            for (const key of keysToRemove) {
                window.localStorage.removeItem(key);
            }

        } catch (e) {
            this._useLocalStorage = false;
            // tslint:disable-next-line:no-floating-promises
            this.Application.ExceptionHandler.Handle(e, 'DrapoCacheHandler - ClearVersionDependentCache');
        }
    }
}
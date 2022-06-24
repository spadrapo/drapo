/// <reference path="../typings/index.d.ts" />

class DrapoStorage {
    //Field
    private _application: DrapoApplication;
    private _cacheKeys: string[] = [];
    private _cacheItems: DrapoStorageItem[] = [];
    private _isDelayTriggered: boolean = false;
    private _cacheLocalDataKeyArray: [string, string, boolean][] = [];
    private readonly CONTENT_TYPE_JSON: string = 'application/json; charset=utf-8';
    private _lock: boolean = false;
    //Properties
    get Application(): DrapoApplication {
        return (this._application);
    }

    //Constructors
    constructor(application: DrapoApplication) {
        this._application = application;
    }

    public async AdquireLock(): Promise<void>{
        while (this._lock) {
            await this.Application.Document.Sleep(50);
        }
        this._lock = true;
    }

    public ReleaseLock(): void {
        this._lock = false;
    }

    public async Retrieve(elj: JQuery, dataKey: string, sector: string, context: DrapoContext, dataKeyParts: string[] = null): Promise<DrapoStorageItem> {
        if (dataKeyParts === null)
            dataKeyParts = this.Application.Parser.ParseForIterable(dataKey);
        //Data
        if ((dataKeyParts.length == 1) || (this.IsDataKey(dataKeyParts[0], sector)))
            return (await this.RetrieveDataItem(dataKey, sector));
        //Iterator
        if ((dataKeyParts.length > 1) && (context.Item != null))
            return (this.RetrieveIterator(dataKey, dataKeyParts, context));
        //Data Field
        if ((dataKeyParts.length > 1) && (context.Item === null)) {
            const item: DrapoStorageItem = await this.RetrieveDataItem(dataKey, sector);
            if (item === null)
                return (null);
            return (this.RetrieveIteratorChild(dataKey, dataKeyParts, item.Data));
        }
        return (null);
    }

    public async RetrieveDataItemContext(dataKey: string, sector: string, executionContext: DrapoExecutionContext<any> = null): Promise<DrapoStorageItem> {
        if ((executionContext !== null) && (executionContext.HasSectorContainer(sector))) {
            const dataItemContext: DrapoStorageItem = await this.Application.SectorContainerHandler.GetStorageItem(sector, executionContext.GetSectorContainer(sector), dataKey);
            if (dataItemContext !== null)
                return (dataItemContext);
        }
        const dataItem: DrapoStorageItem = await this.RetrieveDataItem(dataKey, sector);
        return (dataItem);
    }

    public async RetrieveData(dataKey: string, sector: string, executionContext: DrapoExecutionContext<any> = null): Promise<any[]> {
        const dataItem: DrapoStorageItem = ((executionContext !== null) && (executionContext.HasSectorContainer(sector))) ? await this.Application.SectorContainerHandler.GetStorageItem(sector, executionContext.GetSectorContainer(sector), dataKey) : await this.RetrieveDataItem(dataKey, sector);
        if (dataItem == null)
            return (null);
        return (dataItem.Data);
    }

    public RetrieveStorageItemsCached(sector: string, dataKeyOrDataGroup: string): DrapoStorageItem[] {
        const isAllSectors: boolean = ((sector === null) || (sector === ''));
        const isAllData: boolean = ((dataKeyOrDataGroup === null) || (dataKeyOrDataGroup === ''));
        const list: DrapoStorageItem[] = [];
        for (let i: number = 0; i < this._cacheItems.length; i++) {
            const item: DrapoStorageItem = this._cacheItems[i];
            //Sector
            if ((!isAllSectors) && (item.Sector !== sector))
                continue;
            const dataKey: string = this._cacheKeys[i];
            //Data
            if ((!isAllData) && (dataKey !== dataKeyOrDataGroup) && (!item.ContainsGroup(dataKeyOrDataGroup)))
                continue;
            list.push(item);
        }
        return (list);
    }

    public async RetrieveDataValue(sector: string, mustache: string): Promise<any> {
        const mustacheFullParts: string[] = this.Application.Parser.ParseMustache(mustache);
        const dataSector: string = this.Application.Solver.ResolveSector(mustacheFullParts, sector);
        const dataKey: string = this.Application.Solver.ResolveDataKey(mustacheFullParts);
        const mustacheDataFields: string[] = this.Application.Solver.ResolveDataFields(mustacheFullParts);
        const mustacheParts: string[] = this.Application.Solver.CreateDataPath(dataKey, mustacheDataFields);
        if (await this.EnsureDataKeyFieldReady(dataKey, dataSector, mustacheParts))
            return (this.Application.Storage.GetDataKeyField(dataKey, dataSector, mustacheParts));
        const item: DrapoStorageItem = await this.RetrieveDataItemInternal(dataKey, dataSector, true, mustacheDataFields);
        if ((item == null) || (item.Data == null))
            return ('');
        const cacheIndex: number = this.GetCacheKeyIndex(dataKey, dataSector);
        if (cacheIndex == null) {
            await this.AddCacheData(dataKey, dataSector, item);
        } else {
            const cacheItem: DrapoStorageItem = this.GetCacheDataItem(cacheIndex);
            for (const dataFieldCurrent in item.Data)
                cacheItem.Data[dataFieldCurrent] = item.Data[dataFieldCurrent];
        }
        const data: string = this.Application.Solver.ResolveItemStoragePathObject(item, mustacheParts);
        return (data);
    }

    public async CanGrowData(dataKey: string, sector: string): Promise<boolean> {
        const dataItem: DrapoStorageItem = await this.RetrieveDataItem(dataKey, sector);
        if (dataItem == null)
            return (false);
        return ((dataItem.IsIncremental) && (!dataItem.IsFull));
    }

    public async GrowData(dataKey: string, sector: string): Promise<boolean> {
        const cacheIndex = this.GetCacheKeyIndex(dataKey, sector);
        if (cacheIndex == null)
            return (false);
        const dataItem: DrapoStorageItem = this.GetCacheDataItem(cacheIndex);
        if (dataItem == null)
            return (false);
        if (dataItem.IsFull)
            return (false);
        if (dataItem.IsGrowing)
            return (false);
        dataItem.IsGrowing = true;
        const dataNew: any[] = await this.RetrieveDataKeyUrl(dataKey, sector, dataItem.UrlGet, dataItem.UrlParameters, dataItem.PostGet, (dataItem.Start + dataItem.Data.length).toString(), dataItem.Increment.toString(), dataItem.Type, dataItem.IsToken);
        if (dataNew == null)
            return (false);
        dataItem.IsGrowing = false;
        if (dataNew.length < dataItem.Increment)
            dataItem.IsFull = true;
        for (let i = 0; i < dataNew.length; i++)
            dataItem.Data.push(dataNew[i]);
        return (true);
    }

    public async UpdateData(dataKey: string, sector: string, data: any[] | any, notify: boolean = true): Promise<boolean> {
        const cacheIndex = await this.EnsureDataKeyReady(dataKey, sector);
        if (cacheIndex == null)
            return (false);
        const dataItem: DrapoStorageItem = this.GetCacheDataItem(cacheIndex);
        if (dataItem == null)
            return (false);
        if (dataItem.Data == data)
            return (false);
        dataItem.Data = data;
        await this.NotifyChanges(dataItem, notify, dataKey, null, null, false);
        return (true);
    }

    public async UpdateDataPath(sector: string, contextItem: DrapoContextItem, dataPath: string[], value: any, canNotify: boolean = true): Promise<boolean> {
        const dataKey: string = this.Application.Solver.ResolveDataKey(dataPath);
        const dataItem: DrapoStorageItem = await this.Application.Storage.RetrieveDataItem(dataKey, sector);
        if (dataItem == null)
            return (false);
        const context: DrapoContext = new DrapoContext();
        const item: DrapoContextItem = contextItem == null ? context.Create(dataItem.Data, null, null, dataKey, null, null, null) : contextItem;
        if (item == null)
            return (false);
        if ((dataPath == null) || (dataPath.length == 1)) {
            if (dataItem.Data == value)
                return (false);
            dataItem.Data = value;
        } else {
            if (!this.Application.Solver.UpdateDataPathObject(item.Data, dataPath, value))
                return (false);
        }
        if (canNotify)
            await this.Application.Observer.Notify(item.DataKey, item.Index, this.Application.Solver.ResolveDataFields(dataPath));
        await this.NotifyChanges(dataItem, false, dataKey, null, this.Application.Solver.ResolveDataFields(dataPath), false);
        return (true);
    }

    public async ReloadData(dataKey: string, sector: string, notify: boolean = true, canUseDifference: boolean = false): Promise<boolean> {
        const dataKeyIndex: number = this.GetCacheKeyIndex(dataKey, sector);
        if (dataKeyIndex == null)
            return (true);
        const storageItem: DrapoStorageItem = this._cacheItems[dataKeyIndex];
        if (storageItem.UrlGet !== null) {
            const storageItemLoaded: DrapoStorageItem = await this.RetrieveDataItemInternal(dataKey, sector);
            if (storageItemLoaded !== null)
                this._cacheItems[dataKeyIndex] = storageItemLoaded;
        } else if (storageItem.Type === 'query') {
            const storageItemLoaded: DrapoStorageItem = await this.RetrieveDataItemInternal(dataKey, sector);
            if (storageItemLoaded !== null) {
                const isEqual: boolean = this.Application.Solver.IsEqualAny(storageItem.Data, storageItemLoaded.Data);
                if (isEqual)
                    return (false);
                this._cacheItems[dataKeyIndex] = storageItemLoaded;
            }
        } else {
            this.RemoveCacheData(dataKeyIndex, false);
        }
        if (notify)
            await this.Application.Observer.Notify(dataKey, null, null, canUseDifference);
        return (true);
    }

    public GetSectors(dataKey: string): string[] {
        const sectors: string[] = [];
        for (let i: number = this._cacheKeys.length - 1; i >= 0; i--)
            if (this._cacheKeys[i] === dataKey)
                sectors.push(this._cacheItems[i].Sector);
        return (sectors);
    }

    public GetSectorDataKeys(sector: string): string[] {
        const dataKeys: string[] = [];
        for (let i: number = this._cacheKeys.length - 1; i >= 0; i--)
            if (this._cacheItems[i].Sector === sector)
                dataKeys.push(this._cacheKeys[i]);
        return (dataKeys);
    }

    public async ReloadPipe(dataPipe: string): Promise<boolean> {
        let reloaded = false;
        for (let i: number = this._cacheItems.length - 1; i >= 0; i--) {
            //We need to check if the storage item is still loaded. Because we have an async method in ReloadData.
            //I don't know if we are coming from EventLoop or not
            if (i >= this._cacheItems.length)
                continue;
            const storageItem: DrapoStorageItem = this._cacheItems[i];
            if (storageItem.Pipes == null)
                continue;
            if (!this.Application.Solver.Contains(storageItem.Pipes, dataPipe))
                continue;
            if (await this.ReloadData(this._cacheKeys[i], null))
                reloaded = true;
        }
        return (reloaded);
    }

    public IsMustachePartsDataKey(sector: string, mustacheParts: string[]): boolean {
        const dataKey: string = mustacheParts[0];
        if (!this.IsDataKey(dataKey, sector))
            return (false);
        for (let i: number = 1; i < mustacheParts.length; i++) {
            const mustachePart: string = mustacheParts[i];
            if (!this.Application.Parser.IsMustache(mustachePart))
                continue;
            const mustachePartParts: string[] = this.Application.Parser.ParseMustache(mustachePart);
            if (!this.IsMustachePartsDataKey(sector, mustachePartParts))
                return (false);
        }
        return (true);
    }

    public IsDataKey(dataKey: string, sector: string, renderContext: DrapoRenderContext = null): boolean {
        if (this.Application.Document.IsSystemKey(dataKey))
            return (true);
        const cacheIndex = this.GetCacheKeyIndex(dataKey, sector);
        if (cacheIndex != null)
            return (true);
        return (this.IsDataKeyElement(dataKey, renderContext));
    }

    public IsDataKeyDelay(dataKey: string, sector: string): boolean {
        const cacheIndex = this.GetCacheKeyIndex(dataKey, sector);
        if (cacheIndex === null)
            return (false);
        const cacheItem: DrapoStorageItem = this.GetCacheDataItem(cacheIndex);
        if (cacheItem === null)
            return (false);
        return (cacheItem.IsDelay);
    }

    private IsDataKeyElement(dataKey: string, renderContext: DrapoRenderContext): boolean {
        if (renderContext === null)
            return (this.IsDataKeyElementInternal(dataKey));
        const hasDataKeyElement: boolean = renderContext.HasDataKeyElement(dataKey);
        if (hasDataKeyElement !== null)
            return (hasDataKeyElement);
        const isDataKeyElement: boolean = this.IsDataKeyElementInternal(dataKey);
        renderContext.AddDataKeyElement(dataKey, isDataKeyElement);
        return (isDataKeyElement);
    }

    private IsDataKeyElementInternal(dataKey: string): boolean {
        const jqueryDataKeys: JQuery = $("[d-dataKey='" + dataKey + "']");
        return ((jqueryDataKeys != null) && (jqueryDataKeys.length > 0));
    }

    public ClearCacheLocal(): void {
        this._cacheLocalDataKeyArray = [];
    }

    public async IsDataKeyArray(dataKey: string, sector: string): Promise<boolean> {
        const itemSystem: DrapoStorageItem = await this.RetrieveDataItemInternalSystem(dataKey);
        if (itemSystem !== null)
            return (itemSystem.IsTypeArray);
        for (let i: number = 0; i < this._cacheLocalDataKeyArray.length; i++) {
            const dataKeyArray: [string, string, boolean] = this._cacheLocalDataKeyArray[i];
            if ((dataKeyArray[0] === dataKey) && (dataKeyArray[1] === sector))
                return (dataKeyArray[2]);
        }
        const isDataKeyArray: boolean = await this.IsDataKeyArrayInternal(dataKey, sector);
        this._cacheLocalDataKeyArray.push([dataKey, sector, isDataKeyArray]);
        return (isDataKeyArray);
    }

    private async IsDataKeyArrayInternal(dataKey: string, sector: string): Promise<boolean> {
        const cacheIndex = this.GetCacheKeyIndex(dataKey, sector);
        if (cacheIndex === null) {
            const el: HTMLElement = this.GetDataKeyElement(dataKey, sector);
            return (el == null);
        }
        const storageItem: DrapoStorageItem = this.GetCacheDataItem(cacheIndex);
        return (storageItem.IsTypeArray);
    }

    public async EnsureDataKeyReady(dataKey: string, sector: string): Promise<number> {
        let cacheIndex = this.GetCacheKeyIndex(dataKey, sector);
        if (cacheIndex == null) {
            const item: DrapoStorageItem = await this.RetrieveDataItemInternal(dataKey, sector);
            if (item == null)
                return (null);
            cacheIndex = await this.AddCacheData(dataKey, sector, item);
        }
        return (cacheIndex);
    }

    public async EnsureDataKeyFieldReady(dataKey: string, sector: string, dataPath: string[]): Promise<boolean> {
        let cacheIndex = this.GetCacheKeyIndex(dataKey, sector);
        if (cacheIndex == null) {
            const item: DrapoStorageItem = await this.RetrieveDataItemInternal(dataKey, sector);
            if (item == null)
                return (false);
            cacheIndex = await this.AddCacheData(dataKey, sector, item);
        }
        const storageItem: DrapoStorageItem = this.GetCacheDataItem(cacheIndex);
        if (!storageItem.IsDelay)
            return (true);
        const hasData: boolean = this.Application.Solver.ContainsItemStoragePathObject(storageItem, dataPath);
        if (hasData)
            return (true);
        const isLoaded: boolean = this.Application.CacheHandler.EnsureLoaded(storageItem, sector, dataKey, dataPath);
        if (!isLoaded)
            return (false);
        return (this.Application.Solver.ContainsItemStoragePathObject(storageItem, dataPath));
    }

    public GetData(sector: string, dataPath: string[]): string {
        if ((dataPath == null) || (dataPath.length == 0))
            return (null);
        const dataKey: string = this.Application.Solver.ResolveDataKey(dataPath);
        return (this.GetDataKeyField(dataKey, sector, dataPath));
    }

    public GetDataKeyField(dataKey: string, sector: string, dataPath: string[], executionContext: DrapoExecutionContext<any> = null): string {
        const storageItem: DrapoStorageItem = this.GetCacheStorageItem(dataKey, sector, executionContext);
        if (storageItem === null)
            return (null);
        return (this.Application.Solver.ResolveItemStoragePathObject(storageItem, dataPath));
    }

    public async SetDataKeyField(dataKey: string, sector: string, dataFields: string[], value: any, notify: boolean = true): Promise<boolean> {
        const cacheIndex = await this.EnsureDataKeyReady(dataKey, sector);
        if (cacheIndex == null)
            return (false);
        const storageItem: DrapoStorageItem = this.GetCacheDataItem(cacheIndex);
        if ((dataFields !== null) && (storageItem.IsTypeArray)) {
            //Array
            const length: number = storageItem.Data.length;
            let updated: boolean = false;
            for (let i: number = 0; i < length; i++) {
                const data: any = storageItem.Data[i];
                if (this.Application.Solver.UpdateDataPathObject(data, dataFields, value))
                    updated = true;
            }
            if (!updated)
                return (false);
            await this.NotifyChanges(storageItem, notify, dataKey, null, dataFields);
        } else {
            const path: string[] = this.Application.Solver.CreateDataPath(dataKey, dataFields);
            if (path.length === 1) {
                //Value
                if (storageItem.Data === value)
                    return (false);
                storageItem.Data = value;
                await this.NotifyChanges(storageItem, notify, dataKey, null, null);
            } else {
                //Object
                if (!this.Application.Solver.UpdateDataPathObject(storageItem.Data, path, value))
                    return (false);
                await this.NotifyChanges(storageItem, notify, dataKey, null, dataFields);
            }
        }
        return (true);
    }

    public async UpdateDataFieldLookup(dataKey: string, sector: string, dataFieldSeek: string, valueSeek: string, dataField: string | [string], value: any, notify: boolean = true): Promise<boolean> {
        const cacheIndex = await this.EnsureDataKeyReady(dataKey, sector);
        if (cacheIndex == null)
            return (false);
        const dataPath: [string] = (typeof dataField === "string") ? [dataField] : dataField;
        const storageItem: DrapoStorageItem = this.GetCacheDataItem(cacheIndex);
        if (storageItem.IsTypeArray) {
            //Array
            const length: number = storageItem.Data.length;
            let updated: boolean = false;
            const context: DrapoContext = new DrapoContext();
            for (let i: number = 0; i < length; i++) {
                const data: any = storageItem.Data[i];
                const dataPathSeek: string[] = this.CreateDataPath(dataKey, dataFieldSeek);
                const contextItem: DrapoContextItem = context.Create(data, null, null, dataKey, dataKey, null, i);
                const dataPathSeekValue = await this.Application.Solver.ResolveItemDataPathObject(sector, contextItem, dataPathSeek);
                if (!this.Application.Solver.IsEqualString(valueSeek, dataPathSeekValue))
                    continue;
                if (!this.Application.Solver.UpdateDataPathObject(data, dataPath, value))
                    continue;
                this.FlagAsUpdated(storageItem, i);
                updated = true;
            }
            if (!updated)
                return (false);
            await this.NotifyChanges(storageItem, notify, dataKey, null, null);
        } else {
            return (false);
        }
        return (true);
    }

    public async RemoveDataItemLookup(dataSource: string, sector: string, dataFieldSeek: string | string[], valueSeek: string, notify: boolean = true): Promise<boolean> {
        const isDataSourceMustache: boolean = this.Application.Parser.IsMustache(dataSource);
        if (isDataSourceMustache)
            return (await this.RemoveDataItemLookupMustache(dataSource, sector, dataFieldSeek, valueSeek, notify));
        return (await this.RemoveDataItemLookupDataKey(dataSource, sector, dataFieldSeek, valueSeek, notify));
    }

    private async RemoveDataItemLookupDataKey(dataKey: string, sector: string, dataFieldSeek: string | string[], valueSeek: string, notify: boolean = true): Promise<boolean> {
        const cacheIndex = await this.EnsureDataKeyReady(dataKey, sector);
        if (cacheIndex == null)
            return (false);
        const dataPath: string[] = (typeof dataFieldSeek === "string") ? [dataFieldSeek] : dataFieldSeek;
        const storageItem: DrapoStorageItem = this.GetCacheDataItem(cacheIndex);
        if (storageItem.IsTypeArray) {
            //Array
            const length: number = storageItem.Data.length;
            const removedArray: number[] = [];
            const context: DrapoContext = new DrapoContext();
            for (let i: number = 0; i < length; i++) {
                const data: any = storageItem.Data[i];
                const dataPathSeek: string[] = this.Application.Solver.CreateDataPath(dataKey, dataPath);
                const contextItem: DrapoContextItem = context.Create(data, null, null, dataKey, dataKey, null, i);
                const dataPathSeekValue = await this.Application.Solver.ResolveItemDataPathObject(sector, contextItem, dataPathSeek);
                if (!this.Application.Solver.IsEqualString(valueSeek, dataPathSeekValue))
                    continue;
                removedArray.push(i);
            }
            for (let i: number = removedArray.length - 1; i >= 0; i--) {
                const index: number = removedArray[i];
                this.DeleteDataItemIndex(storageItem, index);
            }
            await this.NotifyChanges(storageItem, ((notify) && (removedArray.length > 0)), dataKey, null, null);
        } else {
            return (false);
        }
        return (true);
    }

    private async RemoveDataItemLookupMustache(dataSource: string, sector: string, dataFieldSeek: string | string[], valueSeek: string, notify: boolean = true): Promise<boolean> {
        const dataSourcePath: string[] = this.Application.Parser.ParseMustache(dataSource);
        const dataKey: string = this.Application.Solver.ResolveDataKey(dataSourcePath);
        const cacheIndex = await this.EnsureDataKeyReady(dataKey, sector);
        if (cacheIndex == null)
            return (false);
        const storageItem: DrapoStorageItem = this.GetCacheStorageItem(dataKey, sector, null);
        if (storageItem === null)
            return (false);
        const dataBase: any[] = this.Application.Solver.ResolveItemStoragePathObject(storageItem, dataSourcePath);
        if ((dataBase == null) || (dataBase.length == 0))
            return (false);
        const dataPath: string[] = (typeof dataFieldSeek === "string") ? [dataKey, dataFieldSeek] : this.Application.Solver.CreateDataPath(dataKey, dataFieldSeek);
        const length: number = dataBase.length;
        const removedArray: number[] = [];
        const context: DrapoContext = new DrapoContext();
        for (let i: number = 0; i < length; i++) {
            const data: any = dataBase[i];
            const dataPathSeekValue = this.Application.Solver.ResolveDataObjectPathObject(data, dataPath);
            if (!this.Application.Solver.IsEqualString(valueSeek, dataPathSeekValue))
                continue;
            removedArray.push(i);
        }
        for (let i: number = removedArray.length - 1; i >= 0; i--) {
            const index: number = removedArray[i];
            dataBase.splice(index, 1);
        }
        await this.NotifyChanges(storageItem, ((notify) && (removedArray.length > 0)), dataKey, null, null);
        return (true);
    }

    private CreatePath(data: string): string[] {
        return ([data]);
    }

    private CreateDataPath(dataKey: string, dataField: string): string[] {
        return ([dataKey, dataField]);
    }

    public async LoadDataDelayedAndNotify(): Promise<void> {
        if (this._isDelayTriggered)
            return;
        if (!this.Application.Observer.HasDelayKeys())
            return;
        this._isDelayTriggered = true;
        const dataKeys: string[] = this.Application.Observer.GetDelayKeys();
        for (let i: number = 0; i < dataKeys.length; i++) {
            const dataKey: string = dataKeys[i];
            const dataFields: string[] = this.Application.Observer.GetDelayFields(dataKey);
            if (dataFields.length == 0)
                continue;
            //Load
            const item: DrapoStorageItem = await this.RetrieveDataItemInternal(dataKey, null, true, dataFields);
            if ((item == null) || (item.Data == null))
                continue;
            const cacheIndex: number = this.GetCacheKeyIndex(dataKey, null);
            if (cacheIndex == null) {
                await this.AddCacheData(dataKey, null, item);
            } else {
                const cacheItem: DrapoStorageItem = this.GetCacheDataItem(cacheIndex);
                for (const dataField in item.Data)
                    cacheItem.Data[dataField] = item.Data[dataField];
            }
            //Notify
            for (const dataField in item.Data)
                await this.Application.Observer.NotifyDelay(dataKey, [dataField]);
        }
        this._isDelayTriggered = false;
    }

    public async RetrieveDataItem(dataKey: string, sector: string, canLoadDelay: boolean = false, dataDelayFields: string[] = null): Promise<DrapoStorageItem> {
        const cacheIndex = this.GetCacheKeyIndex(dataKey, sector);
        if (cacheIndex != null)
            return (this.GetCacheDataItem(cacheIndex));
        const item: DrapoStorageItem = await this.RetrieveDataItemInternal(dataKey, sector, canLoadDelay, dataDelayFields);
        if (item === null)
            return (null);
        if (item.OnLoad) {
            const executionContext: DrapoExecutionContext<any> = this.Application.FunctionHandler.CreateExecutionContext();
            executionContext.HasBreakpoint = await this.Application.Debugger.HasBreakpoint(sector, dataKey);
            executionContext.Sector = sector;
            executionContext.DataKey = dataKey;
            await this.Application.FunctionHandler.ResolveFunctionWithoutContext(sector, item.Element, item.OnLoad, executionContext);
        }
        if (item.CanCache) {
            await this.AddCacheData(dataKey, item.Sector, item);
            if (item.OnAfterCached != null)
                await this.Application.FunctionHandler.ResolveFunctionWithoutContext(sector, item.Element, item.OnAfterCached);
        }
        if (item.OnAfterLoad) {
            const executionContext: DrapoExecutionContext<any> = this.Application.FunctionHandler.CreateExecutionContext();
            executionContext.HasBreakpoint = await this.Application.Debugger.HasBreakpoint(sector, dataKey);
            executionContext.Sector = sector;
            executionContext.DataKey = dataKey;
            await this.Application.FunctionHandler.ResolveFunctionWithoutContext(sector, item.Element, item.OnAfterLoad, executionContext);
        }
        await this.Application.Debugger.NotifyStorage(dataKey);
        return (item);
    }

    private Filter(sector: string, jqueryDataKeys: JQuery): HTMLElement {
        const sectors: string[] = this.Application.Document.GetSectorsAllowed(sector);
        for (let i: number = 0; i < jqueryDataKeys.length; i++) {
            const el: HTMLElement = jqueryDataKeys[i];
            const elSector: string = this.Application.Document.GetSector(el);
            if (elSector !== sector) {
                //Check Data Access
                const elAccess: string = el.getAttribute('d-dataAccess');
                if (elAccess == 'private')
                    continue;
                const elType: string = el.getAttribute('d-dataType');
                if ((elAccess == null) && (elType === 'parent'))
                    continue;
            }
            if ((this.Application.Document.IsSectorAllowed(elSector, sectors)) && (!this.Application.Document.IsElementDetached(el)))
                return (el);
        }
        return (null);
    }

    private GetDataKeyElement(dataKey: string, sector: string) {
        const jqueryDataKeys: JQuery = $("[d-dataKey='" + dataKey + "']");
        const el: HTMLElement = this.Filter(sector, jqueryDataKeys);
        return (el);
    }

    private async RetrieveDataItemInternal(dataKey: string, sector: string, canLoadDelay: boolean = false, dataDelayFields: string[] = null): Promise<DrapoStorageItem> {
        const itemSystem: DrapoStorageItem = await this.RetrieveDataItemInternalSystem(dataKey);
        if (itemSystem !== null)
            return (itemSystem);
        const el: HTMLElement = this.GetDataKeyElement(dataKey, sector);
        if (el == null) {
            await this.Application.ExceptionHandler.HandleError('Storage - RetrieveDataItemInternal - Invalid DataKey: {0}', dataKey);
            return (null);
        }
        //Url
        const dataUrlGet: string = el.getAttribute('d-dataUrlGet');
        const isDelay: boolean = el.getAttribute('d-dataDelay') === 'true';
        if ((isDelay) && (!canLoadDelay))
            return (null);
        let dataUrlParameters: string = el.getAttribute('d-dataUrlParameters');
        if ((dataUrlParameters == null) || (dataUrlParameters == ''))
            dataUrlParameters = 'optional';
        const dataUrlSet: string = el.getAttribute('d-dataUrlSet');
        const dataPostGet: string = el.getAttribute('d-dataPostGet');
        const isLazy: boolean = el.getAttribute('d-dataLazy') === 'true';
        const dataStart: string = el.getAttribute('d-dataLazyStart');
        const dataIncrement: string = el.getAttribute('d-dataLazyIncrement');
        const isUnitOfWork: boolean = el.getAttribute('d-dataUnitOfWork') === 'true';
        const cookieName: string = el.getAttribute('d-dataCookieGet');
        const isCookieChange: boolean = el.getAttribute('d-dataCookieChange') === 'true';
        const userConfig: string = el.getAttribute('d-dataUserConfig');
        const isToken: boolean = el.getAttribute('d-dataToken') === 'true';
        let type: string = el.getAttribute('d-dataType');
        const access: string = el.getAttribute('d-dataAccess');
        const value: string = el.getAttribute('d-dataValue');
        const dataSector: string = this.Application.Document.GetSector(el);
        const groupsAttribute: string = el.getAttribute('d-dataGroups');
        const groups: string[] = ((groupsAttribute == null) || (groupsAttribute == '')) ? null : this.Application.Parser.ParsePipes(groupsAttribute);
        const pipes: string[] = this.Application.Parser.ParsePipes(el.getAttribute('d-dataPipes'));
        const channels: string[] = await this.ParseChannels(sector, el.getAttribute('d-dataChannels'));
        const canCache: boolean = this.Application.Parser.ParseBoolean(el.getAttribute('d-dataCache'), true);
        const cacheKeys: string[] = this.Application.Parser.ParsePipes(el.getAttribute('d-dataCacheKeys'));
        const onLoad: string = type === 'function' ? value : null;
        const onAfterLoad: string = el.getAttribute('d-dataOnAfterLoad');
        const onAfterContainerLoad: string = el.getAttribute('d-dataOnAfterContainerLoad');
        const onBeforeContainerUnload: string = el.getAttribute('d-dataOnBeforeContainerUnLoad');
        const onAfterCached: string = el.getAttribute('d-dataOnAfterCached');
        const onNotify: string = el.getAttribute('d-dataOnNotify');
        const headersGet: [string, string][] = this.ExtractDataHeaderGet(el);
        const headersSet: [string, string][] = this.ExtractDataHeaderSet(el);
        const headersResponse: [string, string][] = ((isCookieChange) || (type === 'file')) ? [] : null;
        const data: any[] = await this.RetrieveDataKey(dataKey, sector, el, dataUrlGet, dataUrlParameters, dataPostGet, dataStart, dataIncrement, isDelay, dataDelayFields, cookieName, type, isToken, cacheKeys, channels, headersGet, headersResponse);
        if (data == null) {
            return (null);
        }
        if (type == null) {
            if (data.length)
                type = 'array';
            else
                type = 'object';
        }
        const increment: number = this.Application.Parser.GetStringAsNumber(dataIncrement);
        const isFull: boolean = ((isLazy) && (data.length < increment)) ? true : false;
        const item: DrapoStorageItem = new DrapoStorageItem(type, access, el, data, dataUrlGet, dataUrlSet, dataUrlParameters, dataPostGet, this.Application.Parser.GetStringAsNumber(dataStart), increment, isLazy, isFull, isUnitOfWork, isDelay, cookieName, isCookieChange, userConfig, isToken, dataSector, groups, pipes, channels, canCache, cacheKeys, onLoad, onAfterLoad, onAfterContainerLoad, onBeforeContainerUnload, onAfterCached, onNotify, headersGet, headersSet);
        return (item);
    }

    private async RetrieveDataKey(dataKey: string, sector: string, el: HTMLElement, dataUrlGet: string, dataUrlParameters: string, dataPostGet: string, dataStart: string, dataIncrement: string, isDelay: boolean, dataDelayFields: string[], cookieName: string, type: string, isToken: boolean, cacheKeys: string[], channels: string[], headersGet: [string, string][], headersResponse: [string, string][]): Promise<any[]> {
        //Channels
        if (channels !== null) {
            const dataChannels: any[] = this.RetrieveDataChannels(channels);
            if (dataChannels != null)
                return (dataChannels);
        }
        //Url
        if (dataUrlGet != null)
            return (await this.RetrieveDataKeyUrl(dataKey, sector, dataUrlGet, dataUrlParameters, dataPostGet, dataStart, dataIncrement, type, isToken, cacheKeys, isDelay, dataDelayFields, headersGet, headersResponse));
        //Cookie
        if (cookieName != null)
            return (this.RetrieveDataKeyCookie(cookieName));
        //Initialize
        if (type != null)
            return (await this.RetrieveDataKeyInitialize(dataKey, sector, type, el));
        //Config
        const dataConfig: string = el.getAttribute('d-dataConfigGet');
        if (dataConfig != null)
            return (await this.RetrieveDataKeyConfig(dataConfig));
        return (null);
    }

    private async RetrieveDataKeyUrl(dataKey: string, sector: string, dataUrlGet: string, dataUrlParameters: string, dataPostGet: string, dataStart: string, dataIncrement: string, type: string, isToken: boolean, cacheKeys: string[] = null, isDelay: boolean = false, dataDelayFields: string[] = null, headersGet: [string, string][] = null, headersResponse: [string, string][] = null): Promise<any[]> {
        let url: string = dataUrlGet;
        if ((false) && (isToken) && (!this.Application.Server.HasToken())) {
            await this.Application.Document.RequestAuthorization(dataKey, 'notify');
            return ([]);
        }
        //Cache LocalStorage
        if (!isDelay) {
            const cachedData: any[] = this.Application.CacheHandler.GetCachedData(cacheKeys, sector, dataKey);
            if (cachedData != null)
                return (cachedData);
        }
        if ((isDelay) && (dataDelayFields != null) && (dataDelayFields.length === 1)) {
            const cachedData: any = this.Application.CacheHandler.GetCachedDataPath(cacheKeys, sector, dataKey, [dataKey, dataDelayFields[0]]);
            if (cachedData != null) {
                const objectCachedData: any = {};
                objectCachedData[dataDelayFields[0]] = cachedData;
                return (objectCachedData);
            }
        }
        //Internal Parameters
        if (dataStart != null)
            url = url.replace('{{start}}', dataStart);
        if (dataIncrement != null)
            url = url.replace('{{increment}}', dataIncrement);
        //Mustaches
        const changes: [string, string][] = [];
        url = await this.ResolveDataUrlMustaches(dataKey, sector, url, null, changes);
        if ((dataUrlParameters === 'required') && (this.HasChangeNullOrEmpty(changes)))
            return ([]);
        //Data
        let verb: string = "GET";
        let data: string = null;
        let contentType: string = null;
        let headers: [string, string][] = [];
        //Delay
        if (isDelay) {
            if (dataDelayFields === null)
                return ([]);
            verb = "POST";
            data = this.Application.Serializer.Serialize(dataDelayFields);
            contentType = this.CONTENT_TYPE_JSON;
        } else if (dataPostGet != null) {
            //Post Get
            verb = "POST";
            const dataPostGetKey: string = this.Application.Parser.IsMustache(dataPostGet) ? await this.ResolveMustaches(sector, dataPostGet) : dataPostGet;
            const item: DrapoStorageItem = await this.RetrieveDataItem(dataPostGetKey, sector);
            if (item !== null)
                data = this.Application.Serializer.Serialize(item.Data);
            contentType = this.CONTENT_TYPE_JSON;
            //Subscribe
            this.Application.Observer.SubscribeStorage(dataPostGetKey, null, dataKey);
        } else {
            //Convert Headers Data
            headers = await this.ResolveDataHeaders(dataKey, sector, headersGet, null);
        }
        let dataResponse: any[] = null;
        if (type === 'file')
            dataResponse = await this.Application.Server.GetFile(url, verb, data, contentType, dataKey, headers, headersResponse);
        else
            dataResponse = await this.Application.Server.GetJSON(url, verb, data, contentType, dataKey, headers, headersResponse);
        //Cache
        this.Application.CacheHandler.AppendCacheData(cacheKeys, sector, dataKey, dataResponse, isDelay);
        return (dataResponse);
    }

    private async ParseChannels(sector: string, channels: string): Promise<string[]> {
        if (channels == null)
            return (null);
        const channelsResolved: string = await this.ResolveDataUrlMustaches(null, sector, channels, null);
        return (this.Application.Parser.ParsePipes(channelsResolved));
    }

    private RetrieveDataChannels(channels: string[]): any[] {
        if (channels == null)
            return (null);
        for (let i: number = 0; i < channels.length; i++) {
            const dataChannel: any[] = this.RetrieveDataChannel(channels[i]);
            if (dataChannel !== null)
                return (dataChannel);
        }
        return (null);
    }

    private ContainsDataChannel(dataItem: DrapoStorageItem, channel: string): boolean {
        if (dataItem.Channels === null)
            return (false);
        for (let i: number = 0; i < dataItem.Channels.length; i++) {
            if (channel === dataItem.Channels[i])
                return (true);
        }
        return (false);
    }

    private RetrieveDataChannel(channel: string): any[] {
        for (let i: number = 0; i < this._cacheItems.length; i++) {
            const dataItem: DrapoStorageItem = this._cacheItems[i];
            if (this.ContainsDataChannel(dataItem, channel))
                return (this.Application.Solver.Clone(dataItem.Data, true));
        }
        return (null);
    }

    private async PropagateDataChannels(dataItem: DrapoStorageItem): Promise<boolean> {
        if (dataItem.Channels === null)
            return (false);
        for (let i: number = 0; i < dataItem.Channels.length; i++) {
            const channel: string = dataItem.Channels[i];
            for (let j: number = 0; j < this._cacheItems.length; j++) {
                const dataItemCurrent: DrapoStorageItem = this._cacheItems[j];
                if (!this.ContainsDataChannel(dataItemCurrent, channel))
                    continue;
                //We only suppport primitive types right now
                if (dataItem.Data === dataItemCurrent.Data)
                    continue;
                await this.Application.Storage.UpdateData(this._cacheKeys[j], dataItemCurrent.Sector, dataItem.Data, true);
            }
        }
        return (true);
    }

    private HasChangeNullOrEmpty(changes: [string, string][]): boolean {
        for (let i: number = 0; i < changes.length; i++) {
            const change: [string, string] = changes[i];
            const value: string = change[1];
            if ((value === null) || (value === ''))
                return (true);
        }
        return (false);
    }

    private ExtractDataHeaderGet(el: HTMLElement): [string, string][] {
        const attributes: [string, string][] = [];
        for (let i: number = 0; i < el.attributes.length; i++) {
            const attribute: Attr = el.attributes[i];
            const attributeProperty = this.ExtractDataHeaderGetProperty(attribute.nodeName);
            if (attributeProperty != null)
                attributes.push([attributeProperty, attribute.nodeValue]);
        }
        return (attributes);
    }

    public ExtractDataHeaderGetProperty(property: string): string {
        const parse: string[] = this.Application.Parser.ParseProperty(property);
        if (parse.length != 3)
            return (null);
        if (parse[0] != 'd')
            return (null);
        if (parse[1].toLowerCase() != 'dataheaderget')
            return (null);
        return (parse[2]);
    }

    private ExtractDataHeaderSet(el: HTMLElement): [string, string][] {
        const attributes: [string, string][] = [];
        for (let i: number = 0; i < el.attributes.length; i++) {
            const attribute: Attr = el.attributes[i];
            const attributeProperty = this.ExtractDataHeaderSetProperty(attribute.nodeName);
            if (attributeProperty != null)
                attributes.push([attributeProperty, attribute.nodeValue]);
        }
        return (attributes);
    }

    public ExtractDataHeaderSetProperty(property: string): string {
        const parse: string[] = this.Application.Parser.ParseProperty(property);
        if (parse.length != 3)
            return (null);
        if (parse[0] != 'd')
            return (null);
        if (parse[1].toLowerCase() != 'dataheaderset')
            return (null);
        return (parse[2]);
    }

    public async ResolveDataUrlMustaches(dataKey: string, sector: string, url: string, executionContext: DrapoExecutionContext<any>, changes: [string, string][] = null): Promise<string> {
        const mustaches: string[] = this.Application.Parser.ParseMustaches(url);
        for (let i = 0; i < mustaches.length; i++) {
            const mustache: string = mustaches[i];
            const mustacheParts: string[] = this.Application.Parser.ParseMustache(mustache);
            const mustacheDataKey: string = this.Application.Solver.ResolveDataKey(mustacheParts);
            const change: [string, string] = [mustache, null];
            if (changes != null)
                changes.push(change);
            if (!this.IsDataKey(mustacheDataKey, sector))
                continue;
            const isSameDataKey: boolean = dataKey === mustacheDataKey;
            if ((!isSameDataKey) && (!await this.Application.Storage.EnsureDataKeyFieldReady(mustacheDataKey, sector, mustacheParts)))
                continue;
            const mustacheData: string = this.Application.Storage.GetDataKeyField(mustacheDataKey, sector, mustacheParts, executionContext);
            if ((!isSameDataKey) && (mustacheData == null))
                continue;
            const mustacheDataEncoded: string = this.Application.Server.EnsureUrlComponentEncoded(mustacheData);
            url = url.replace(mustache, mustacheDataEncoded);
            change[1] = mustacheDataEncoded;
            if ((!isSameDataKey) && (dataKey !== null)) {
                const mustacheDataFields: string[] = this.Application.Solver.ResolveDataFields(mustacheParts);
                this.Application.Observer.SubscribeStorage(mustacheDataKey, mustacheDataFields, dataKey);
            }
        }
        return (url);
    }

    public async ResolveDataHeaders(dataKey: string, sector: string, headers: [string, string][], executionContext: DrapoExecutionContext<any>): Promise<[string, string][]> {
        const headersData: [string, string][] = [];
        if (headers === null)
            return (headersData);
        const isSectorActive: boolean = (executionContext === null) || (!executionContext.HasSectorContainer(sector));
        for (let i: number = 0; i < headers.length; i++) {
            const header: [string, string] = headers[i];
            const headerValue: string = header[1];
            let headerDataKey: string = null;
            let data: any = null;
            if (!this.Application.Parser.IsMustache(headerValue)) {
                headerDataKey = headerValue;
                data = await this.RetrieveData(headerDataKey, sector, executionContext);
                if (isSectorActive)
                    this.Application.Observer.SubscribeStorage(headerDataKey, null, dataKey);
            } else {
                const headerMustacheParts: string[] = this.Application.Parser.ParseMustache(headerValue);
                headerDataKey = this.Application.Solver.ResolveDataKey(headerMustacheParts);
                const headerDataFields: string[] = this.Application.Solver.ResolveDataFields(headerMustacheParts);
                const dataItem: DrapoStorageItem = await this.RetrieveDataItem(headerDataKey, sector);
                data = this.Application.Solver.ResolveItemStoragePathObject(dataItem, headerMustacheParts);
                if (isSectorActive)
                    this.Application.Observer.SubscribeStorage(headerDataKey, headerDataFields, dataKey);
            }
            if (data == null)
                continue;
            const dataSerialized = this.Application.Serializer.Serialize(data);
            const dataEncoded: string = this.Application.Serializer.EncodeHeaderFieldValue(dataSerialized);
            headersData.push([header[0], dataEncoded]);

        }
        return (headersData);
    }

    public async ResolveMustachesRecursive(sector: string, data: string): Promise<string> {
        const dataResolved: string = await this.ResolveMustaches(sector, data, true);
        if (dataResolved === data)
            return (dataResolved);
        return (await this.ResolveMustachesRecursive(sector, dataResolved));
    }

    public async ResolveMustaches(sector: string, data: string, canSubscribe: boolean = false): Promise<string> {
        const mustaches: string[] = this.Application.Parser.ParseMustaches(data);
        for (let i = 0; i < mustaches.length; i++) {
            const mustache: string = mustaches[i];
            const mustacheParts: string[] = this.Application.Parser.ParseMustache(mustache);
            const dataSector: string = this.Application.Solver.ResolveSector(mustacheParts, sector);
            const mustacheDataKey: string = this.Application.Solver.ResolveDataKey(mustacheParts);
            if (!this.IsDataKey(mustacheDataKey, dataSector))
                continue;
            const mustacheDataFields: string[] = this.Application.Solver.ResolveDataFields(mustacheParts);
            if (!await this.Application.Storage.EnsureDataKeyFieldReady(mustacheDataKey, dataSector, mustacheParts)) {
                if (!canSubscribe)
                    continue;
                this.Application.Observer.SubscribeDelay(null, mustacheDataKey, this.Application.Solver.ResolveDataFields(mustacheParts));
                return (data);
            }
            const mustacheData: string = this.Application.Storage.GetDataKeyField(mustacheDataKey, dataSector, mustacheParts);
            if (mustacheData == null)
                continue;
            data = data.replace(mustache, mustacheData);
        }
        return (data);
    }

    private async ReactivateDataUrlMustache(dataKey: string, sector: string, item: DrapoStorageItem): Promise<void> {
        if (item.UrlGet == null)
            return;
        await this.ResolveDataUrlMustaches(dataKey, sector, item.UrlGet, null);
    }

    private async RetrieveDataKeyInitialize(dataKey: string, sector: string, type: string, el: HTMLElement): Promise<any[]> {
        if (type == 'object')
            return (this.RetrieveDataKeyInitializeObject(el));
        if (type == 'array')
            return (this.RetrieveDataKeyInitializeArray(el));
        if (type == 'value')
            return (this.RetrieveDataKeyInitializeValue(el));
        if (type == 'mapping')
            return (await this.RetrieveDataKeyInitializeMapping(el, sector, dataKey));
        if (type == 'pointer')
            return (await this.RetrieveDataKeyInitializePointer(el, sector, dataKey));
        if (type == 'function')
            return (await this.RetrieveDataKeyInitializeFunction(dataKey, el));
        if (type == 'querystring')
            return (this.RetrieveDataKeyInitializeQueryString(el, sector, dataKey));
        if (type == 'query')
            return (this.RetrieveDataKeyInitializeQuery(el, sector, dataKey));
        if (type == 'parent')
            return (this.RetrieveDataKeyInitializeParent(el, sector));
        return (null);
    }

    private RetrieveDataKeyInitializeValue(el: HTMLElement): any {
        const dataValue: string = el.getAttribute('d-dataValue');
        if (dataValue != null)
            return (dataValue);
        return ('');
    }

    private RetrieveDataKeyInitializeArray(el: HTMLElement): any[] {
        const dataValue: string = el.getAttribute('d-dataValue');
        if (dataValue == null)
            return ([]);
        const data: any[] = this.Application.Parser.ParseIterator(dataValue);
        if (data.length)
            return (data);
        return ([data]);
    }

    private async RetrieveDataKeyInitializeMapping(el: HTMLElement, sector: string, dataKey: string): Promise<any[]> {
        const dataValue: string = el.getAttribute('d-dataValue');
        if (dataValue == null)
            return ([]);
        const isReference: boolean = el.getAttribute('d-dataLoadType') === 'reference';
        let dataValueResolved: string = dataValue;
        if (this.Application.Parser.IsMustache(dataValue))
            dataValueResolved = await this.ResolveMustaches(sector, dataValue);
        if (isReference) {
            el.setAttribute('d-dataValue', dataValueResolved);
            const dataReference: any[] = await this.RetrieveDataValue(sector, dataValueResolved);
            return (this.Application.Solver.Clone(dataReference, true));
        }
        const isSubscribe: boolean = el.getAttribute('d-dataMappingSubscribe') === 'true';
        if (isSubscribe)
            this.Application.Observer.SubscribeStorage(dataValueResolved, null, dataKey, DrapoStorageLinkType.Reload);
        const storageItemMapped = await this.RetrieveDataItem(dataValueResolved, sector);
        if (storageItemMapped === null)
            return (null);
        let data: any[] = storageItemMapped.Data;
        const dataMappingField: string = el.getAttribute('d-dataMappingField');
        if ((dataMappingField != null) && (dataMappingField != '')) {
            const dataMappingFieldResolved: string = await this.ResolveMustaches(sector, dataMappingField);
            if ((dataMappingFieldResolved != null) && (dataMappingFieldResolved != '')) {
                const dataPath: string[] = this.Application.Parser.ParsePath(dataMappingFieldResolved);
                const dataPathFull: string[] = this.Application.Solver.CreateDataPath(dataValueResolved, dataPath);
                data = this.Application.Solver.ResolveDataObjectPathObject(data, dataPathFull);
                if (data === null)
                    return (null);
            }
        }
        const dataMappingSearchField: string = el.getAttribute('d-dataMappingSearchField');
        let dataMappingSearchValue: string = el.getAttribute('d-dataMappingSearchValue');
        const dataMappingSearchHierarchyField: string = el.getAttribute('d-dataMappingSearchHierarchyField');
        if ((dataMappingSearchField != null) && (dataMappingSearchField != '') && (dataMappingSearchValue != null) && (dataMappingSearchValue != '')) {
            if (this.Application.Parser.IsMustache(dataMappingSearchValue)) {
                const dataPath: string[] = this.Application.Parser.ParseMustache(dataMappingSearchValue);
                dataMappingSearchValue = await this.Application.Solver.ResolveItemDataPathObject(sector, null, dataPath);
            }
            data = this.Application.Solver.ResolveDataObjectLookupHierarchy(data, dataMappingSearchField, dataMappingSearchValue, dataMappingSearchHierarchyField);
        }
        return (this.Application.Solver.Clone(data, true));
    }

    private async RetrieveDataKeyInitializePointer(el: HTMLElement, sector: string, dataKey: string): Promise<any[]> {
        const dataValue: string = el.getAttribute('d-dataValue');
        if (dataValue == null) {
            await this.Application.ExceptionHandler.HandleError('DrapoStorage - value of a pointer cant be null - {0}', dataKey);
            return ([]);
        }
        if (!this.Application.Parser.IsMustache(dataValue)) {
            await this.Application.ExceptionHandler.HandleError('DrapoStorage - value of a pointer must be a mustache - {0}', dataKey);
            return ([]);
        }
        //We need to resolve the dataValue to the last mustache
        let dataMustache: string = dataValue;
        while (this.Application.Parser.IsMustache(dataMustache)) {
            const dataMustacheResolved: string = await this.ResolveMustaches(sector, dataMustache);
            if ((dataMustacheResolved == null) || (dataMustacheResolved === ''))
                break;
            if (!this.Application.Parser.IsMustache(dataMustacheResolved))
                break;
            dataMustache = dataMustacheResolved;
        }
        //Subscribe
        const mustacheParts: string[] = this.Application.Parser.ParseMustache(dataMustache);
        const mustacheDataKey: string = this.Application.Solver.ResolveDataKey(mustacheParts);
        this.Application.Observer.SubscribeStorage(mustacheDataKey, null, dataKey, DrapoStorageLinkType.Pointer);
        this.Application.Observer.SubscribeStorage(dataKey, null, mustacheDataKey, DrapoStorageLinkType.Pointer);
        //Return the same reference data
        const dataReference: any[] = await this.RetrieveDataValue(sector, dataMustache);
        return (dataReference);
    }

    public async UpdatePointerStorageItems(dataKey: string, dataReferenceKey: string): Promise<void> {
        const storageItems: DrapoStorageItem[] = this.Application.Storage.RetrieveStorageItemsCached(null, dataKey);
        if (storageItems.length == 0)
            return;
        const storageItem: DrapoStorageItem = storageItems[0];
        const storageReferenceItems: DrapoStorageItem[] = this.Application.Storage.RetrieveStorageItemsCached(null, dataReferenceKey);
        if (storageReferenceItems.length == 0)
            return;
        const storageReferenceItem: DrapoStorageItem = storageReferenceItems[0];
        if (storageItem.HasChanges)
            storageReferenceItem.HasChanges = true;
        if (storageReferenceItem.Type !== 'pointer')
            return;
        const storageItemLoaded: DrapoStorageItem = await this.RetrieveDataItemInternal(dataReferenceKey, storageReferenceItem.Sector);
        if (storageItemLoaded === null)
            return;
        storageReferenceItem.Data = storageItemLoaded.Data;
    }

    private async RetrieveDataKeyInitializeFunction(dataKey: string, el: HTMLElement): Promise<any[]> {
        const dataValue: string = el.getAttribute('d-dataValue');
        if (dataValue == null)
            return ([]);
        const isToken: boolean = el.getAttribute('d-dataToken') === 'true';
        if (isToken) {
            if ((!this.Application.Server.HasToken()) && (this.Application.Observer.HasPendingAuthorization())) {
                await this.Application.Document.RequestAuthorization(dataKey, 'initialize');
                return (null);
            }
        }
        return ([]);
    }

    private async RetrieveDataKeyInitializeQueryString(el: HTMLElement, sector: string, dataKey: string): Promise<any[]> {
        let object: any = await this.RetrieveDataKeyInitializeMapping(el, sector, dataKey);
        if ((object !== null) && (((object.length) && (object.length > 0)) || (Object.keys(object).length > 0)))
            return (object);
        object = {};
        const canUseRouter: boolean = await this.Application.Router.CanUseRouter();
        const dictionary: [string, string][] = await this.Application.Document.ExtractQueryString(canUseRouter);
        for (let i: number = 0; i < dictionary.length; i++) {
            const keyValuePair: [string, string] = dictionary[i];
            const key: string = keyValuePair[0];
            const value: string = keyValuePair[1];
            object[key] = value;
        }
        return (object);
    }

    private async RetrieveDataKeyInitializeQuery(el: HTMLElement, sector: string, dataKey: string): Promise<any[]> {
        const dataValue: string = el.getAttribute('d-dataValue');
        if (dataValue == null) {
            await this.Application.ExceptionHandler.HandleError('There is no d-datavalue in: {0}', dataKey);
            return ([]);
        }
        const query: DrapoQuery = this.Application.Parser.ParseQuery(dataValue);
        if (query === null) {
            await this.Application.ExceptionHandler.HandleError('There is an error in query d-datavalue in: {0}', dataKey);
            return ([]);
        }
        if (query.Error !== null) {
            await this.Application.ExceptionHandler.HandleError('Error parsing the query in: {0}. {1}', dataKey, query.Error);
            return ([]);
        }
        if (query.Sources.length > 2) {
            await this.Application.ExceptionHandler.HandleError('Only support for 2 sources in query: {0}', dataKey);
            return ([]);
        }
        //Options
        const dataQueryArray: string = el.getAttribute('d-dataQueryArray');
        if (dataQueryArray != null)
            query.OutputArray = dataQueryArray;
        return (await this.ExecuteQuery(sector, dataKey, query));
    }

    private RetrieveDataKeyInitializeParent(el: HTMLElement, sector: string): any {
        const dataValue: string = el.getAttribute('d-dataValue');
        const isReference: boolean = el.getAttribute('d-dataLoadType') === 'reference';
        let elParent: HTMLElement = el.parentElement;
        let elParentAttributes: [string, string][] = null;
        while ((elParent !== null) && ((elParentAttributes = this.Application.Document.GetElementAttributesFilteredPrefix(elParent, dataValue)).length == 0))
            elParent = elParent.parentElement;
        return (this.BuildObject(sector, isReference, elParentAttributes));
    }

    private async BuildObject(sector: string, isReference: boolean, attributes: [string, string][]): Promise<object> {
        const object: any = {};
        let hasDelay: boolean = false;
        for (let i: number = 0; i < attributes.length; i++) {
            const keyValuePair: [string, string] = attributes[i];
            const key: string = keyValuePair[0];
            const value: string = keyValuePair[1];
            const valueResolved: string = isReference ? await this.ResolveMustachesRecursive(sector, value) : value;
            if ((isReference) && (this.Application.Parser.IsMustache(valueResolved)))
                hasDelay = true;
            object[key] = valueResolved;
        }
        if (hasDelay) {
            //Notify who needs data
            await this.Application.Storage.LoadDataDelayedAndNotify();
            for (let i: number = 0; i < attributes.length; i++) {
                const keyValuePair: [string, string] = attributes[i];
                const key: string = keyValuePair[0];
                const value: string = object[key];
                if (!this.Application.Parser.IsMustache(value))
                    continue;
                const valueResolved: string = await this.ResolveMustachesRecursive(sector, value);
                object[key] = valueResolved;
            }
        }
        return (object);
    }

    private RetrieveDataKeyInitializeObject(el: HTMLElement): any {
        const dataValue: string = el.getAttribute('d-dataValue');
        if ((dataValue != null) && (this.Application.Serializer.IsJson(dataValue))) {
            return (this.Application.Serializer.Deserialize(dataValue));
        }
        const object: any = {};
        const propertyKeys: string[] = [];
        const propertyNames: string[] = [];
        const propertyValues: string[] = [];
        for (let i: number = 0; i < el.attributes.length; i++) {
            const attribute: Attr = el.attributes[i];
            this.RetrieveDataProperty(object, attribute.nodeName, attribute.nodeValue, propertyKeys, propertyNames, propertyValues);
        }
        return (object);
    }

    private RetrieveDataProperty(object: any, property: string, value: string, propertyKeys: string[], propertyNames: string[], propertyValues: string[]): boolean {
        const parse: string[] = this.Application.Parser.ParseProperty(property);
        if (parse.length < 3)
            return (false);
        if (parse[0] != 'd')
            return (false);
        if (parse[1].toLowerCase() != 'dataproperty')
            return (false);
        //Simple
        if (parse.length == 3) {
            object[parse[2]] = value;
            return (true);
        }
        //Name & Value
        const key: string = parse[2];
        const nameOrValue = parse[3];
        let index: number = this.RetrieveDataPropertyKeyIndex(propertyKeys, key);
        if (nameOrValue == 'name') {
            if (index < 0) {
                index = propertyKeys.push(key);
                propertyNames.push(value);
                propertyValues.push(null);
                return (false);
            } else {
                propertyNames[index] = value;
                object[value] = propertyValues[index];
                return (true);
            }
        }
        if (nameOrValue == 'value') {
            if (index < 0) {
                index = propertyKeys.push(key);
                propertyNames.push(null);
                propertyValues.push(value);
                return (false);
            } else {
                propertyValues[index] = value;
                object[propertyNames[index]] = value;
                return (true);
            }
        }
        return (false);
    }

    private RetrieveDataPropertyKeyIndex(propertyKeys: string[], key: string): number {
        for (let i: number = propertyKeys.length - 1; i >= 0; i--)
            if (propertyKeys[i] == key)
                return (i);
        return (-1);
    }

    private async RetrieveDataKeyConfig(sector: string): Promise<any> {
        return (await this.Application.Config.GetSector(sector));
    }

    private RetrieveDataKeyCookie(name: string): any {
        return (this.Application.CookieHandler.RetrieveData(name));
    }

    public RetrieveIterator(dataKey: string, dataKeyParts: string[], context: DrapoContext): DrapoStorageItem {
        //Child
        if (dataKeyParts[0] == context.Item.Key)
            return (this.RetrieveIteratorChild(dataKey, dataKeyParts, context.Item.Data));
        return (null);
    }

    public RetrieveIteratorChild(dataKey: string, dataKeyParts: string[], contextData: any): DrapoStorageItem {
        let current: any = contextData;
        for (let i = 1; i < dataKeyParts.length; i++) {
            const dataKeyCurrent = dataKeyParts[i];
            if (current[dataKeyCurrent] === 'undefined')
                return (null);
            current = current[dataKeyCurrent];
        }
        return (new DrapoStorageItem('array', null, null, current, null, null, null, null, null, null, false, true, false, false, null, false, null, false, null, null, null, null, false, null, null, null, null, null, null, null, null, null));
    }

    public async AddDataItem(dataKey: string, dataPath: string[], sector: string, item: any, notify: boolean = true): Promise<boolean> {
        const dataItem: DrapoStorageItem = await this.RetrieveDataItem(dataKey, sector);
        if (dataItem == null)
            return (false);
        let data: any[] = dataItem.Data;
        if (dataPath != null)
            data = this.Application.Solver.ResolveDataObjectPathObject(data, dataPath, []);
        data.push(item);
        if (dataItem.IsUnitOfWork)
            dataItem.DataInserted.push(item);
        await this.NotifyChanges(dataItem, notify, dataKey, null, null);
    }

    public async ToggleData(dataKey: string, dataPath: string[], sector: string, item: any, notify: boolean = true): Promise<boolean> {
        const dataItem: DrapoStorageItem = await this.RetrieveDataItem(dataKey, sector);
        if (dataItem == null)
            return (false);
        let data: any[] = dataItem.Data;
        if (dataPath != null)
            data = this.Application.Solver.ResolveDataObjectPathObject(data, dataPath);
        let found: boolean = false;
        for (let i: number = 0; i < data.length; i++) {
            if (data[i] != item)
                continue;
            found = true;
            data.splice(i, 1);
        }
        if (!found)
            data.push(item);
        await this.NotifyChanges(dataItem, notify, dataKey, null, null);
    }

    public async GetDataItemLast(dataKey: string, sector: string): Promise<any> {
        const dataItem: DrapoStorageItem = await this.RetrieveDataItem(dataKey, sector);
        if (dataItem == null)
            return (null);
        if (dataItem.Data.length == 0)
            return (null);
        return (dataItem.Data[dataItem.Data.length - 1]);
    }

    public async FlagDataItemAsUpdated(dataKey: string, sector: string, index: number, notify: boolean = true): Promise<boolean> {
        const dataItem: DrapoStorageItem = await this.RetrieveDataItem(dataKey, sector);
        if (dataItem == null)
            return (false);
        this.FlagAsUpdated(dataItem, index);
        await this.NotifyChanges(dataItem, notify, dataKey, null, null);
        return (true);
    }

    public async NotifyChanges(dataItem: DrapoStorageItem, notify: boolean, dataKey: string, dataIndex: number, dataFields: string[], canUseDifference: boolean = true): Promise<void> {
        dataItem.HasChanges = true;
        if (notify)
            await this.Application.Observer.Notify(dataKey, dataIndex, dataFields, canUseDifference);
        //Channels
        await this.PropagateDataChannels(dataItem);
    }

    public async NotifyNoChanges(dataItem: DrapoStorageItem, notify: boolean, dataKey: string): Promise<void> {
        dataItem.HasChanges = false;
        if (notify)
            await this.Application.Observer.Notify(dataKey, null, ['_HasChanges']);
    }

    public FlagAsUpdated(dataItem: DrapoStorageItem, index: number): boolean {
        if (!dataItem.IsUnitOfWork)
            return (false);
        const dataArray: any[] = dataItem.Data;
        if (dataArray.length <= index)
            return (false);
        const data: any = dataArray[index];
        for (let i: number = dataItem.DataUpdated.length - 1; i >= 0; i--)
            if (dataItem.DataUpdated[i] === data)
                return (false);
        dataItem.DataUpdated.push(data);
        return (true);
    }

    public GetCacheKeys(): string[] {
        return (this._cacheKeys);
    }

    private GetCacheKeyIndex(dataKey: string, sector: string): number {
        const sectors: string[] = this.Application.Document.GetSectorsAllowed(sector);
        for (let i = 0; i < this._cacheKeys.length; i++) {
            const storageItem: DrapoStorageItem = this._cacheItems[i];
            const isAccessPublic: boolean = storageItem.IsAccessPublic;
            if ((this._cacheKeys[i] == dataKey) && ((this.Application.Document.IsSystemKey(dataKey)) || (storageItem.Sector === sector) || ((isAccessPublic) && (this.Application.Document.IsSectorAllowed(storageItem.Sector, sectors)))))
                return (i);
        }
        return (null);
    }

    public IsDataReady(sector: string, dataKey: string): boolean {
        const index: number = this.GetCacheKeyIndex(dataKey, sector);
        return (index !== null);
    }

    private GetCacheStorageItem(dataKey: string, sector: string, executionContext: DrapoExecutionContext<any>): DrapoStorageItem {
        if ((executionContext !== null) && (executionContext.HasSectorContainer(sector)))
            return (this.Application.SectorContainerHandler.GetStorageItem(sector, executionContext.GetSectorContainer(sector), dataKey));
        const index: number = this.GetCacheKeyIndex(dataKey, sector);
        if (index === null)
            return (null);
        return (this.GetCacheDataItem(index));
    }

    private GetCacheData(dataIndex: number): any[] {
        return (this._cacheItems[dataIndex].Data);
    }

    private GetCacheDataItem(dataIndex: number): DrapoStorageItem {
        return (this._cacheItems[dataIndex]);
    }

    private async AddCacheData(dataKey: string, sector: string, dataItem: DrapoStorageItem, canFireEventOnAfterCached: boolean = true): Promise<number> {
        this._cacheKeys.push(dataKey);
        const index: number = this._cacheItems.push(dataItem) - 1;
        //After Cached
        if ((canFireEventOnAfterCached) && (dataItem.OnAfterCached != null))
            await this.Application.FunctionHandler.ResolveFunctionWithoutContext(sector, dataItem.Element, dataItem.OnAfterCached);
        return (index);
    }

    public async FireEventOnNotify(dataKey: string): Promise<void> {
        for (let i: number = this._cacheKeys.length - 1; i >= 0; i--) {
            if (i >= this._cacheItems.length)
                continue;
            const cacheKey: string = this._cacheKeys[i];
            if (cacheKey != dataKey)
                continue;
            const storageItem: DrapoStorageItem = this._cacheItems[i];
            if (storageItem.OnNotify == null)
                continue;
            await this.Application.FunctionHandler.ResolveFunctionWithoutContext(storageItem.Sector, null, storageItem.OnNotify);
        }
    }

    private RemoveCacheData(index: number, canRemoveObservers = true): void {
        if (canRemoveObservers)
            this.Application.Observer.Unsubscribe(this._cacheKeys[index]);
        this._cacheKeys.splice(index, 1);
        this._cacheItems.splice(index, 1);
    }

    public AppendCacheDataItemBySector(storageItems: [string, DrapoStorageItem][], sector: string): void {
        for (let i: number = this._cacheItems.length - 1; i >= 0; i--) {
            const storageItem: DrapoStorageItem = this._cacheItems[i];
            if (storageItem.Sector !== sector)
                continue;
            storageItems.push([this._cacheKeys[i], this._cacheItems[i]]);
        }
    }

    public AddCacheDataItems(storageItems: [string, DrapoStorageItem][]): void {
        for (let i: number = storageItems.length - 1; i >= 0; i--) {
            const storageItem: [string, DrapoStorageItem] = storageItems[i];
            this._cacheKeys.push(storageItem[0]);
            this._cacheItems.push(storageItem[1]);
        }
    }

    public RemoveBySector(sector: string): void {
        for (let i: number = this._cacheItems.length - 1; i >= 0; i--) {
            const storageItem: DrapoStorageItem = this._cacheItems[i];
            if (storageItem.Sector !== sector)
                continue;
            this._cacheKeys.splice(i, 1);
            this._cacheItems.splice(i, 1);
        }
    }

    public DiscardCacheData(dataKey: string, sector: string, canRemoveObservers: boolean = false): boolean {
        const dataKeyIndex: number = this.GetCacheKeyIndex(dataKey, sector);
        if (dataKeyIndex == null)
            return (false);
        this.RemoveCacheData(dataKeyIndex, canRemoveObservers);
        return (true);
    }

    public DiscardCacheDataBySector(sector: string): boolean {
        let removed: boolean = false;
        for (let i: number = this._cacheItems.length - 1; i >= 0; i--) {
            const item: DrapoStorageItem = this._cacheItems[i];
            if (item.Sector !== sector)
                continue;
            const dataKey: string = this._cacheKeys[i];
            if (this.DiscardCacheData(dataKey, item.Sector))
                removed = true;
        }
        return (removed);
    }

    public async DeleteDataItem(dataKey: string, dataPath: string[], sector: string, item: any, notify: boolean): Promise<boolean> {
        const dataItem: DrapoStorageItem = await this.RetrieveDataItem(dataKey, sector);
        if (dataItem == null)
            return (false);
        let data: any[] = dataItem.Data;
        if (data == null)
            return (false);
        if (dataPath != null)
            data = this.Application.Solver.ResolveDataObjectPathObject(data, dataPath);
        const index: number = this.GetDataItemIndex(data, item);
        if (index == null)
            return (false);
        if (dataItem.IsUnitOfWork)
            dataItem.DataDeleted.push(item);
        data.splice(index, 1);
        await this.NotifyChanges(dataItem, notify, dataKey, index, dataPath);
        return (true);
    }

    public DeleteDataItemIndex(dataItem: DrapoStorageItem, index: number): boolean {
        const data: any[] = dataItem.Data;
        if (data == null)
            return (false);
        const item: any = data[index];
        if (item == null)
            return (false);
        if (dataItem.IsUnitOfWork)
            dataItem.DataDeleted.push(item);
        data.splice(index, 1);
        return (true);
    }

    private GetDataItemIndex(data: any[], item: any): number {
        for (let i = 0; i < data.length; i++)
            if (data[i] == item)
                return (i);
        return (null);
    }

    public async PostData(dataKey: string, sector: string, dataKeyResponse: string, notify: boolean, executionContext: DrapoExecutionContext<any>): Promise<boolean> {
        const dataItem: DrapoStorageItem = await this.RetrieveDataItemContext(dataKey, sector, executionContext);
        if (dataItem == null)
            return (false);
        //Cookie
        if (dataItem.CookieName != null)
            return (this.Application.CookieHandler.SetCookieValue(dataItem));
        if (dataItem.Type === 'mapping')
            return (this.PostDataMapping(dataKey, sector, dataItem, notify, executionContext));
        const dataItemResponse: DrapoStorageItem = dataKeyResponse == '' ? null : (dataKey == dataKeyResponse ? dataItem : await this.RetrieveDataItem(dataKeyResponse, sector));
        //Headers
        const headers: [string, string][] = await this.ResolveDataHeaders(dataKey, sector, dataItem.HeadersSet, executionContext);
        //Post
        let url: string = dataItem.UrlSet;
        url = await this.ResolveDataUrlMustaches(null, sector, url, executionContext);
        const object: any = {};
        if (dataItem.IsUnitOfWork) {
            if (dataItem.DataInserted.length > 0)
                object.Inserted = dataItem.DataInserted;
            if (dataItem.DataUpdated.length > 0)
                object.Updated = dataItem.DataUpdated;
            if (dataItem.DataDeleted.length > 0)
                object.Deleted = dataItem.DataDeleted;
        } else {
            object.Entities = dataItem.Data;
        }
        const headersResponse: [string, string][] = dataItem.IsCookieChange ? [] : null;
        const data: any[] = await this.Application.Server.GetJSON(url, "POST", this.Application.Serializer.Serialize(object), this.CONTENT_TYPE_JSON, null, headers);
        if (this.Application.Server.HasBadRequest)
            return (false);
        if ((data != null) && (dataItemResponse != null))
            dataItemResponse.Data = data;
        dataItem.DataInserted = [];
        dataItem.DataUpdated = [];
        dataItem.DataDeleted = [];
        if (dataKey !== dataKeyResponse)
            await this.NotifyNoChanges(dataItem, notify, dataKey);
        await this.NotifyChanges(dataItem, ((notify) && (dataItemResponse != null)), dataKeyResponse, null, null);
        return (true);
    }

    public async PostDataItem(dataKey: string, sector: string, dataKeyResponse: string, notify: boolean, executionContext: DrapoExecutionContext<any>): Promise<boolean> {
        const dataItem: DrapoStorageItem = await this.RetrieveDataItem(dataKey, sector);
        if (dataItem == null)
            return (false);
        //Cookie
        if (dataItem.CookieName != null)
            return (this.Application.CookieHandler.SetCookieValue(dataItem));
        const dataItemResponse: DrapoStorageItem = dataKeyResponse == '' ? null : (dataKey == dataKeyResponse ? dataItem : await this.RetrieveDataItem(dataKeyResponse, sector));
        //Headers
        const headers: [string, string][] = await this.ResolveDataHeaders(dataKey, sector, dataItem.HeadersSet, executionContext);
        //Post
        let url: string = dataItem.UrlSet;
        //Mustaches
        url = await this.ResolveDataUrlMustaches(null, sector, url, executionContext);
        const object: any = dataItem.Data;
        const headersResponse: [string, string][] = dataItem.IsCookieChange ? [] : null;
        const data: any[] = await this.Application.Server.GetJSON(url, "POST", this.Application.Serializer.Serialize(object), this.CONTENT_TYPE_JSON, null, headers, headersResponse);
        if (this.Application.Server.HasBadRequest)
            return (false);

        if (dataItemResponse != null)
            dataItemResponse.Data = data;
        if (dataKey !== dataKeyResponse)
            await this.NotifyNoChanges(dataItem, notify, dataKey);
        await this.NotifyChanges(dataItem, ((notify) && (dataItemResponse != null)), dataKeyResponse, null, null);
        return (true);
    }

    public async PostDataMapping(dataKey: string, sector: string, dataItem: DrapoStorageItem, notify: boolean, executionContext: DrapoExecutionContext<any>): Promise<boolean> {
        const el: HTMLElement = this.GetDataKeyElement(dataKey, sector);
        if (el === null) // The source is gone
            return (false);
        const dataValue: string = el.getAttribute('d-dataValue');
        if (dataValue == null)
            return (false);
        let updated: boolean = false;
        const isReference: boolean = el.getAttribute('d-dataLoadType') === 'reference';
        if (isReference) {
            const mustacheFullPartsReference: string[] = this.Application.Parser.ParseMustache(dataValue);
            const dataSectorReference: string = this.Application.Solver.ResolveSector(mustacheFullPartsReference, sector);
            const dataKeyReference: string = this.Application.Solver.ResolveDataKey(mustacheFullPartsReference);
            const mustacheDataFieldsReference: string[] = this.Application.Solver.ResolveDataFields(mustacheFullPartsReference);
            const mustachePartsReference: string[] = this.Application.Solver.CreateDataPath(dataKeyReference, mustacheDataFieldsReference);
            const dataClone: any[] = this.Application.Solver.Clone(dataItem.Data, true);
            updated = await this.UpdateDataPath(dataSectorReference, null, mustachePartsReference, dataClone, notify);
            return (updated);
        }
        let dataValueResolved: string = dataValue;
        if (this.Application.Parser.IsMustache(dataValue))
            dataValueResolved = await this.ResolveMustaches(sector, dataValue);
        const storageItemMapped = await this.RetrieveDataItem(dataValueResolved, sector);
        if (storageItemMapped === null)
            return (null);
        const dataMappingField: string = el.getAttribute('d-dataMappingField');
        const dataMappingSearchField: string = el.getAttribute('d-dataMappingSearchField');
        let dataMappingSearchValue: string = el.getAttribute('d-dataMappingSearchValue');
        const dataMappingSearchHierarchyField: string = el.getAttribute('d-dataMappingSearchHierarchyField');
        if (((dataMappingField == null) || (dataMappingField == '')) && ((dataMappingSearchField == null) || (dataMappingSearchField == ''))) //Root
        {
            if (storageItemMapped.Data === dataItem.Data)
                return (false);
            updated = true;
            storageItemMapped.Data = dataItem.Data;
            storageItemMapped.HasChanges = true;
        }
        if (!updated) {
            let data: any[] = storageItemMapped.Data;
            let dataPath: string[] = null;
            if ((dataMappingField != null) && (dataMappingField != '')) {
                const dataMappingFieldResolved: string = await this.ResolveMustaches(sector, dataMappingField);
                if ((dataMappingFieldResolved != null) && (dataMappingFieldResolved != '')) {
                    dataPath = this.Application.Parser.ParsePath(dataMappingFieldResolved);
                    const dataPathFull: string[] = this.Application.Solver.CreateDataPath(dataValueResolved, dataPath);
                    data = this.Application.Solver.ResolveDataObjectPathObject(data, dataPathFull);
                    if (data === null)
                        return (false);
                }
            }
            if ((dataMappingSearchField != null) && (dataMappingSearchField != '') && (dataMappingSearchValue != null) && (dataMappingSearchValue != '')) {
                if (this.Application.Parser.IsMustache(dataMappingSearchValue)) {
                    const dataPathCurrent: string[] = this.Application.Parser.ParseMustache(dataMappingSearchValue);
                    dataMappingSearchValue = await this.Application.Solver.ResolveItemDataPathObject(sector, null, dataPathCurrent);
                }
                const updatedDataObject: boolean = this.Application.Solver.UpdateDataObjectLookupHierarchy(data, dataMappingSearchField, dataMappingSearchValue, dataItem.Data, dataMappingSearchHierarchyField);
                if (updatedDataObject == null)
                    return (false);
                updated = updatedDataObject;
            } else {
                updated = await this.SetDataKeyField(dataValueResolved, sector, dataPath, dataItem.Data, false);
            }
        }
        await this.NotifyChanges(dataItem, ((updated) && (notify)), dataValueResolved, null, null);
        return (true);
    }

    public async ClearData(dataText: string, sector: string, notify: boolean): Promise<boolean> {
        if (this.Application.Parser.IsMustache(dataText)) {
            const mustacheParts: string[] = this.Application.Parser.ParseMustache(dataText);
            const dataKey: string = this.Application.Solver.ResolveDataKey(mustacheParts);
            const dataItem: DrapoStorageItem = await this.RetrieveDataItem(dataKey, sector);
            if (dataItem == null)
                return (false);
            const data: any = this.Application.Solver.ResolveItemStoragePathObject(dataItem, mustacheParts);
            if ((data == null) || (data == undefined) || (data.length == undefined))
                return (false);
            for (let i = data.length - 1; i >= 0; i--) {
                const item: any = data[i];
                data.splice(i, 1);
            }
            await this.NotifyChanges(dataItem, notify, dataKey, null, null);
        } else {
            const dataKey: string = dataText;
            const dataItem: DrapoStorageItem = await this.RetrieveDataItem(dataKey, sector);
            if (dataItem == null)
                return (false);
            for (let i = dataItem.Data.length - 1; i >= 0; i--) {
                const item: any = dataItem.Data[i];
                if (dataItem.IsUnitOfWork)
                    dataItem.DataDeleted.push(item);
                dataItem.Data.splice(i, 1);
            }
            await this.NotifyChanges(dataItem, notify, dataKey, null, null);
        }
        return (true);
    }

    public async UnloadData(dataKey: string, sector: string): Promise<boolean> {
        return (this.DiscardCacheData(dataKey, sector, true));
    }

    public async ClearDataToken(): Promise<void> {
        for (let i: number = 0; i < this._cacheItems.length; i++) {
            const item: DrapoStorageItem = this._cacheItems[i];
            if (!item.IsToken)
                continue;
            item.Data = [];
            item.DataDeleted = [];
            item.DataInserted = [];
            item.DataUpdated = [];
            const dataKey = this._cacheKeys[i];
            this.Application.Observer.SubscribeAuthorization(dataKey, 'notify');
            await this.NotifyChanges(item, true, dataKey, null, null);
        }
    }

    public async FireEventOnBeforeContainerUnload(sector: string): Promise<void> {
        for (let i = this._cacheItems.length - 1; i >= 0; i--) {
            if (i >= this._cacheItems.length)
                continue;
            const item: DrapoStorageItem = this._cacheItems[i];
            if (item.Sector !== sector)
                continue;
            if (item.OnBeforeContainerUnload === null)
                continue;
            await this.Application.FunctionHandler.ResolveFunctionWithoutContext(item.Sector, item.Element, item.OnBeforeContainerUnload);
        }
    }

    public async FireEventOnAfterContainerLoad(sector: string): Promise<void> {
        for (let i = this._cacheItems.length - 1; i >= 0; i--) {
            if (i >= this._cacheItems.length)
                continue;
            const item: DrapoStorageItem = this._cacheItems[i];
            if (item.Sector !== sector)
                continue;
            if (item.OnAfterContainerLoad === null)
                continue;
            await this.Application.FunctionHandler.ResolveFunctionWithoutContext(item.Sector, item.Element, item.OnAfterContainerLoad);
        }
    }

    public async MoveDataItem(dataKey: string, sector: string, dataMove: any, dataPosition: any, notify: boolean): Promise<boolean> {
        const dataItem: DrapoStorageItem = await this.RetrieveDataItem(dataKey, sector);
        if (dataItem == null)
            return (false);
        let indexBefore: number = null;
        let indexAfter: number = null;
        for (let i: number = 0; i < dataItem.Data.length; i++) {
            const data: any = dataItem.Data[i];
            if (data === dataMove)
                indexBefore = i;
            if (data === dataPosition)
                indexAfter = i;
        }
        if ((indexBefore === null) || (indexAfter === null) || (indexBefore === indexAfter))
            return (false);
        await this.FlagDataItemAsUpdated(dataKey, sector, indexBefore, false);
        await this.FlagDataItemAsUpdated(dataKey, sector, indexAfter, false);
        dataItem.Data.splice(indexBefore, 1);
        dataItem.Data.splice(indexAfter, 0, dataMove);
        await this.NotifyChanges(dataItem, notify, dataKey, null, null, true);
        return (true);
    }

    public async MoveDataIndex(dataKey: string, sector: string, dataMove: any, index: number, notify: boolean): Promise<boolean> {
        const dataItem: DrapoStorageItem = await this.RetrieveDataItem(dataKey, sector);
        if (dataItem == null)
            return (false);
        let indexBefore: number = null;
        for (let i: number = 0; i < dataItem.Data.length; i++) {
            const data: any = dataItem.Data[i];
            if (data === dataMove)
                indexBefore = i;
        }
        if ((indexBefore === null) || (index === null) || (indexBefore === index))
            return (false);
        await this.FlagDataItemAsUpdated(dataKey, sector, indexBefore, false);
        await this.FlagDataItemAsUpdated(dataKey, sector, index, false);
        dataItem.Data.splice(indexBefore, 1);
        dataItem.Data.splice(index, 0, dataMove);
        await this.NotifyChanges(dataItem, notify, dataKey, null, null, true);
        return (true);
    }

    public async ResolveData(executeNoCache: boolean, el: HTMLElement = null): Promise<void> {
        if (el == null)
            el = document.documentElement;
        const children: Array<HTMLElement> = [].slice.call(el.children);
        for (let i = 0; i < children.length; i++)
            await this.ResolveDataElement(executeNoCache, children[i]);
    }

    public async ResolveDataElement(executeNoCache: boolean, el: HTMLElement): Promise<void> {
        const sector: string = el.getAttribute ? el.getAttribute('d-sector') : null;
        if (sector != null)
            return;
        const children: Array<HTMLElement> = [].slice.call(el.children);
        const hasChildren: boolean = children.length > 0;
        if (hasChildren) {
            for (let i = 0; i < children.length; i++) {
                const child: HTMLElement = children[i];
                await this.ResolveDataElement(executeNoCache, child);
            }
        } else {
            await this.ResolveDataLoadInternal(executeNoCache, el);
        }
    }

    public async ResolveDataLoadInternal(executeNoCache: boolean, el: HTMLElement): Promise<void> {
        const dataLoadType = el.getAttribute('d-dataLoadType');
        if (dataLoadType == null)
            return;
        if (dataLoadType !== 'startup')
            return;
        //Startup
        const dataKey = el.getAttribute('d-dataKey');
        if (dataKey == null)
            return;
        const sector: string = this.Application.Document.GetSector(el);
        if (!this.Application.Document.IsSectorReady(sector))
            return;
        const cacheIndex = this.GetCacheKeyIndex(dataKey, sector);
        if (cacheIndex !== null)
            return;
        const canCache: boolean = this.Application.Parser.ParseBoolean(el.getAttribute('d-dataCache'), true);
        if ((!executeNoCache) && (!canCache))
            return;
        await this.RetrieveDataItem(dataKey, sector, true, null);
    }

    public CreateErrorForStorage(type: string = null, message: string = null, content: string = null): any {
        const object: any = {};
        object.Type = type;
        object.Message = message;
        object.Content = content;
        object.Date = new Date();
        return (object);
    }

    public async EnsureDataDelayLoaded(dataItem: DrapoStorageItem, dataPath: string[]): Promise<void> {
        const data: string = this.Application.Solver.ResolveDataObjectPathObject(dataItem.Data, dataPath);
        if (data !== '')
            return;
        const dataKey: string = dataPath[0];
        const dataField: string = dataPath[1];
        //Load
        const item: DrapoStorageItem = await this.RetrieveDataItemInternal(dataKey, null, true, [dataField]);
        for (const dataFieldCurrent in item.Data)
            dataItem.Data[dataFieldCurrent] = item.Data[dataFieldCurrent];
    }

    public HasChanges(sector: string, dataKey: string): boolean {
        const cacheIndex = this.GetCacheKeyIndex(dataKey, sector);
        if (cacheIndex === null)
            return (false);
        const storageItem: DrapoStorageItem = this.GetCacheDataItem(cacheIndex);
        if (storageItem === null)
            return (false);
        return (storageItem.HasChanges);
    }

    private async RetrieveDataItemInternalSystem(dataKey: string): Promise<DrapoStorageItem> {
        if (dataKey === '__debugger')
            return (this.RetrieveDataItemInternalSystemDebugger(dataKey));
        if (dataKey === '__sectors')
            return (this.RetrieveDataItemInternalSystemSectors(dataKey));
        if (dataKey === '__datakeysfunction')
            return (this.RetrieveDataItemInternalSystemDataKeysFunction(dataKey));
        if (dataKey === '__breakpoints')
            return (this.RetrieveDataItemInternalSystemBreakpoints(dataKey));
        if (dataKey === '__notifys')
            return (this.RetrieveDataItemInternalSystemNotifys(dataKey));
        if (dataKey === '__pipes')
            return (this.RetrieveDataItemInternalSystemPipes(dataKey));
        if (dataKey === '__errors')
            return (this.RetrieveDataItemInternalSystemErrors(dataKey));
        if (dataKey === '__functions')
            return (this.RetrieveDataItemInternalSystemFunctions(dataKey));
        if (dataKey === '__components')
            return (this.RetrieveDataItemInternalSystemComponents(dataKey));
        if (dataKey === '__requests')
            return (this.RetrieveDataItemInternalSystemRequests(dataKey));
        if (dataKey === '__sectorsupdate')
            return (this.RetrieveDataItemInternalSystemSectorsUpdate(dataKey));
        if (dataKey === '__runtime')
            return (this.RetrieveDataItemInternalSystemRuntime(dataKey));
        if (dataKey === '__objects')
            return (this.RetrieveDataItemInternalSystemObjects(dataKey));
        if (dataKey === '__objectsexpanded')
            return (this.RetrieveDataItemInternalSystemObjectsExpanded(dataKey));
        if (dataKey === '__objectproperties')
            return (this.RetrieveDataItemInternalSystemObjectProperties(dataKey));
        if (dataKey === '__objectdata')
            return (this.RetrieveDataItemInternalSystemObjectData(dataKey));
        if (dataKey === '__objectwatch')
            return (this.RetrieveDataItemInternalSystemObjectWatch(dataKey));
        if (dataKey === '__objectswatchs')
            return (this.RetrieveDataItemInternalSystemObjectsWatchs(dataKey));
        if (dataKey === '__objectswatchsvalues')
            return (this.RetrieveDataItemInternalSystemObjectsWatchsValues(dataKey));
        if (dataKey === '__browser')
            return (this.RetrieveDataItemInternalSystemBrowser(dataKey));
        if (dataKey === '__debuggerProperties')
            return (this.RetrieveDataItemInternalSystemDebuggerProperties(dataKey));
        return (null);
    }

    private CreateDataItemInternal(dataKey: string, data: any, canCache: boolean = true): DrapoStorageItem {
        const item: DrapoStorageItem = new DrapoStorageItem(data.length != null ? 'array' : 'object', null, null, data, null, null, null, null, null, null, false, true, false, false, null, false, null, false, '', null, null, null, canCache, null, null, null, null, null, null, null, null, null);
        return (item);
    }

    private async RetrieveDataItemInternalSystemDebugger(dataKey: string): Promise<DrapoStorageItem> {
        const data: any = {};
        data.sector = '';
        data.datakey = '';
        const item: DrapoStorageItem = this.CreateDataItemInternal(dataKey, data);
        return (item);
    }

    private async RetrieveDataItemInternalSystemSectors(dataKey: string): Promise<DrapoStorageItem> {
        const data: string[] = this.Application.Document.GetSectors();
        const item: DrapoStorageItem = this.CreateDataItemInternal(dataKey, data);
        return (item);
    }

    private async RetrieveDataItemInternalSystemDataKeysFunction(dataKey: string): Promise<DrapoStorageItem> {
        this.Application.Observer.SubscribeStorage('__debugger', ['sector'], dataKey);
        const sector: string = await this.ResolveMustaches('', '{{__debugger.sector}}');
        const data: string[] = [];
        data.push('');
        for (let i: number = 0; i < this._cacheItems.length; i++) {
            const itemCache: DrapoStorageItem = this._cacheItems[i];
            if (!this.Application.Document.IsEqualSector(itemCache.Sector, sector))
                continue;
            const itemDataKey: string = this._cacheKeys[i];
            if (this.Application.Document.IsSystemKey(itemDataKey))
                continue;
            if ((!itemCache.IsTypeFunction) && ((!itemCache.IsTypeValue)))
                continue;
            data.push(itemDataKey);
        }
        const item: DrapoStorageItem = this.CreateDataItemInternal(dataKey, data);
        return (item);
    }

    private async RetrieveDataItemInternalSystemBreakpoints(dataKey: string): Promise<DrapoStorageItem> {
        const data: any[] = [];
        const item: DrapoStorageItem = this.CreateDataItemInternal(dataKey, data);
        return (item);
    }

    private async RetrieveDataItemInternalSystemNotifys(dataKey: string): Promise<DrapoStorageItem> {
        const data: any[] = [];
        const item: DrapoStorageItem = this.CreateDataItemInternal(dataKey, data);
        return (item);
    }

    private async RetrieveDataItemInternalSystemPipes(dataKey: string): Promise<DrapoStorageItem> {
        const data: any[] = [];
        const item: DrapoStorageItem = this.CreateDataItemInternal(dataKey, data);
        return (item);
    }

    private async RetrieveDataItemInternalSystemErrors(dataKey: string): Promise<DrapoStorageItem> {
        const data: any[] = [];
        const item: DrapoStorageItem = this.CreateDataItemInternal(dataKey, data);
        return (item);
    }

    private async RetrieveDataItemInternalSystemFunctions(dataKey: string): Promise<DrapoStorageItem> {
        const data: any[] = [];
        const item: DrapoStorageItem = this.CreateDataItemInternal(dataKey, data);
        return (item);
    }

    private async RetrieveDataItemInternalSystemComponents(dataKey: string): Promise<DrapoStorageItem> {
        const data: any[] = await this.Application.Debugger.GetComponents();
        const item: DrapoStorageItem = this.CreateDataItemInternal(dataKey, data);
        return (item);
    }

    private async RetrieveDataItemInternalSystemRequests(dataKey: string): Promise<DrapoStorageItem> {
        const data: any[] = [];
        const item: DrapoStorageItem = this.CreateDataItemInternal(dataKey, data);
        return (item);
    }

    private async RetrieveDataItemInternalSystemSectorsUpdate(dataKey: string): Promise<DrapoStorageItem> {
        const data: any[] = [];
        const item: DrapoStorageItem = this.CreateDataItemInternal(dataKey, data);
        return (item);
    }

    private async RetrieveDataItemInternalSystemRuntime(dataKey: string): Promise<DrapoStorageItem> {
        const data: any = {};
        data.sector = '';
        data.datakey = '';
        data.label = '';
        data.expression = '';
        data.functionValue = '';
        const item: DrapoStorageItem = this.CreateDataItemInternal(dataKey, data);
        return (item);
    }

    private async RetrieveDataItemInternalSystemObjects(dataKey: string): Promise<DrapoStorageItem> {
        this.Application.Observer.SubscribeStorage('__objectsexpanded', [], dataKey, DrapoStorageLinkType.Reload);
        const data: any[] = await this.Application.Debugger.GetObjects();
        const item: DrapoStorageItem = this.CreateDataItemInternal(dataKey, data);
        return (item);
    }

    private async RetrieveDataItemInternalSystemObjectsExpanded(dataKey: string): Promise<DrapoStorageItem> {
        const data: any[] = [];
        data.push('sector_null');
        const item: DrapoStorageItem = this.CreateDataItemInternal(dataKey, data);
        return (item);
    }

    private async RetrieveDataItemInternalSystemObjectProperties(dataKey: string): Promise<DrapoStorageItem> {
        const data: any = {};
        data.sector = '';
        data.datakey = '';
        const item: DrapoStorageItem = this.CreateDataItemInternal(dataKey, data);
        return (item);
    }

    private async RetrieveDataItemInternalSystemObjectData(dataKey: string): Promise<DrapoStorageItem> {
        const data: any[] = await this.Application.Debugger.GetObjectData();
        const item: DrapoStorageItem = this.CreateDataItemInternal(dataKey, data);
        return (item);
    }

    private async RetrieveDataItemInternalSystemObjectWatch(dataKey: string): Promise<DrapoStorageItem> {
        const data: any = {};
        data.Sector = '';
        data.Mustache = '';
        const item: DrapoStorageItem = this.CreateDataItemInternal(dataKey, data);
        return (item);
    }

    private async RetrieveDataItemInternalSystemObjectsWatchs(dataKey: string): Promise<DrapoStorageItem> {
        const data: any[] = [];
        const item: DrapoStorageItem = this.CreateDataItemInternal(dataKey, data);
        return (item);
    }

    private async RetrieveDataItemInternalSystemObjectsWatchsValues(dataKey: string): Promise<DrapoStorageItem> {
        const data: any[] = await this.Application.Debugger.GetWatchsValues();
        const item: DrapoStorageItem = this.CreateDataItemInternal(dataKey, data);
        return (item);
    }

    private async RetrieveDataItemInternalSystemBrowser(dataKey: string): Promise<DrapoStorageItem> {
        const data: any = {};
        const width: number = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        const height: number = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        data.Width = width;
        data.Height = height;
        const item: DrapoStorageItem = this.CreateDataItemInternal(dataKey, data);
        item.CanCache = false;
        return (item);
    }

    private async RetrieveDataItemInternalSystemDebuggerProperties(dataKey: string): Promise<DrapoStorageItem> {
        const data: any = {};
        data.left = false;
        data.showobjects = false;
        data.showbreakpoints = false;
        data.shownotifys = false;
        data.showerrors = true;
        data.showpipes = true;
        data.showfunctions = false;
        data.showcomponents = false;
        data.showserver = false;
        data.showsectorsupdate = false;
        data.persist = false;
        const item: DrapoStorageItem = this.CreateDataItemInternal(dataKey, data);
        return (item);
    }

    private async ExecuteQuery(sector: string, dataKey: string, query: DrapoQuery): Promise<any[]> {
        let objects: any[] = [];
        const objectsId: string[][] = [];
        const objectsInformation: any[] = [];
        const filters: DrapoQueryCondition[] = [];
        const hasFilters: boolean = query.Filter !== null;
        //Resolve External Mustaches
        await this.ResolveQueryConditionMustaches(sector, dataKey, query);
        for (let i: number = 0; i < query.Sources.length; i++) {
            const querySource: DrapoQuerySource = query.Sources[i];
            const querySourcePath: string = querySource.Source;
            const isQuerySourceMustache: boolean = this.Application.Parser.IsMustache(querySourcePath);
            //DataKey
            let sourceDataKey: string = querySourcePath;
            let sourceMustache: string = sourceDataKey;
            if (isQuerySourceMustache) {
                const mustacheParts: string[] = this.Application.Parser.ParseMustache(querySourcePath);
                const mustacheDataKey: string = this.Application.Solver.ResolveDataKey(mustacheParts);
                sourceDataKey = mustacheDataKey;
            } else {
                sourceMustache = this.Application.Solver.CreateMustache([sourceDataKey]);
            }
            //Subscribe
            this.Application.Observer.SubscribeStorage(sourceDataKey, null, dataKey);
            //Data
            const querySourceData = await this.RetrieveDataValue(sector, sourceMustache);
            const querySourceObjects: any[] = Array.isArray(querySourceData) ? querySourceData : [querySourceData];
            for (let j: number = 0; j < querySourceObjects.length; j++) {
                const querySourceObject: any = querySourceObjects[j];
                //Search
                const objectIndexes: number[] = this.EnsureQueryObject(query, querySource, i, objects, objectsId, objectsInformation, querySourceObject);
                if ((objectIndexes === null) || (objectIndexes.length === 0))
                    continue;
                for (let k: number = 0; k < objectIndexes.length; k++) {
                    const objectIndex: number = objectIndexes[k];
                    const object: any = objects[objectIndex];
                    const objectInformation: any = objectsInformation[objectIndex];
                    //Projections
                    this.InjectQueryObjectProjections(query, querySource, object, objectInformation, querySourceObject);
                    //Filter
                    if (hasFilters) {
                        const isAdd: boolean = (i === 0);
                        const filter: DrapoQueryCondition = isAdd ? query.Filter.Clone() : filters[objectIndex];
                        if (isAdd)
                            filters.push(filter);
                        this.ResolveQueryConditionSource(query, querySource, querySourceObject, filter);
                    }
                }
            }
        }
        //Unmatched
        const count: number = query.Sources.length;
        if ((count > 1) && (query.Sources[1].JoinType == 'INNER')) {
            for (let i: number = objects.length - 1; i >= 0; i--) {
                if (objectsId[i].length === count)
                    continue;
                objects.splice(i, 1);
                objectsInformation.splice(i, 1);
                if (hasFilters)
                    filters.splice(i, 1);
            }
        }
        //Filters
        if (hasFilters) {
            for (let i: number = filters.length - 1; i >= 0; i--) {
                const filter: DrapoQueryCondition = filters[i];
                if (this.IsValidQueryCondition(filter))
                    continue;
                objects.splice(i, 1);
                objectsInformation.splice(i, 1);
            }
        }
        //Aggregations
        if (query.Projections[0].FunctionName === 'COUNT') {
            //We only support count right now
            const objectAggregation: any = {};
            objectAggregation[query.Projections[0].Alias] = objects.length;
            return (objectAggregation);
        }
        //Functions
        this.ResolveQueryFunctions(query, objects, objectsInformation);
        //Output Array
        if (query.OutputArray != null) {
            const outputArray: any[] = [];
            for (let i: number = 0; i < objects.length; i++) {
                const object: any = objects[i];
                outputArray.push(object[query.OutputArray]);
            }
            objects = outputArray;
        }
        //Order By
        if (query.Sorts != null)
            objects = this.ResolveQueryOrderBy(query, objects);
        return (objects);
    }

    private EnsureQueryObject(query: DrapoQuery, querySource: DrapoQuerySource, indexSource: number, objects: any[], objectsIds: string[][], objectsInformation: any[], querySourceObject: any): number[] {
        let object: any = null;
        //Only One
        if (query.Sources.length == 1) {
            object = {};
            objects.push(object);
            objectsInformation.push({});
            return ([objects.length - 1]);
        }
        const joinCondition = query.Sources[1].JoinConditions[0];
        const column: string = joinCondition.SourceLeft == querySource.Alias ? joinCondition.ColumnLeft : joinCondition.ColumnRight;
        const isObject: boolean = typeof querySourceObject === 'object';
        const id: string = isObject ? querySourceObject[column] : querySourceObject;
        if (indexSource === 0) {
            object = {};
            objects.push(object);
            const ids: string[] = [];
            ids.push(id);
            objectsIds.push(ids);
            objectsInformation.push({});
            return ([objects.length - 1]);
        }
        const indexes: number[] = [];
        for (let i: number = 0; i < objects.length; i++) {
            const objectsId: string[] = objectsIds[i];
            if (objectsId.length > 1)
                continue;
            const objectId = objectsId[0];
            if (objectId != id)
                continue;
            objectsId.push(objectId);
            indexes.push(i);
        }
        if ((indexes.length == 0) && (querySource.JoinType === 'OUTER')) {
            object = {};
            objects.push(object);
            const ids: string[] = [];
            ids.push(id);
            objectsIds.push(ids);
            objectsInformation.push({});
            return ([objects.length - 1]);
        }
        return (indexes);
    }

    private InjectQueryObjectProjections(query: DrapoQuery, querySource: DrapoQuerySource, object: any, objectInformation: any, sourceObject: any): void {
        const isObject: boolean = typeof sourceObject === 'object';
        for (let i: number = 0; i < query.Projections.length; i++) {
            const projection: DrapoQueryProjection = query.Projections[i];
            if (projection.FunctionName !== null) {
                //Function
                for (let j: number = 0; j < projection.FunctionParameters.length; j++) {
                    const functionParameter: string = projection.FunctionParameters[j];
                    const functionParameterName: string = this.ResolveQueryFunctionParameterName(functionParameter);
                    if (objectInformation[functionParameterName] != null)
                        continue;
                    const functionParameterValues: string[] = this.Application.Parser.ParseQueryProjectionFunctionParameterValue(functionParameterName);
                    const source: string = functionParameterValues[0];
                    if ((querySource.Alias ?? querySource.Source) !== source)
                        continue;
                    const value: any = isObject ? sourceObject[projection.Column] : sourceObject;
                    objectInformation[functionParameterName] = value;
                }
            } else {
                //Projection
                const source: string = projection.Source;
                if (source !== null) {
                    if ((querySource.Alias !== null) && (source !== querySource.Alias))
                        continue;
                    if ((querySource.Alias === null) && (source !== querySource.Source))
                        continue;
                } else {
                    if ((isObject) && (!sourceObject[projection.Column]))
                        continue;
                    if ((!isObject) && ((querySource.Alias ?? querySource.Source) !== projection.Column))
                        continue;
                }
                const value: any = isObject ? sourceObject[projection.Column] : sourceObject;
                object[projection.Alias ?? projection.Column] = value;
            }
        }
    }

    private ResolveQueryConditionSource(query: DrapoQuery, querySource: DrapoQuerySource, sourceObject: any, filter: DrapoQueryCondition): void {
        //Left
        const valueLeft: string = this.ResolveQueryConditionSourceColumn(query, querySource, sourceObject, filter.SourceLeft, filter.ColumnLeft);
        if (valueLeft !== null)
            filter.ValueLeft = valueLeft;
        //Right
        if (filter.IsNullRight)
            return;
        const valueRight: string = this.ResolveQueryConditionSourceColumn(query, querySource, sourceObject, filter.SourceRight, filter.ColumnRight);
        if (valueRight !== null)
            filter.ValueRight = valueRight;
    }

    private ResolveQueryConditionSourceColumn(query: DrapoQuery, querySource: DrapoQuerySource, sourceObject: any, source: string, column: string): string {
        const isObject: boolean = typeof sourceObject === 'object';
        if (source !== null) {
            if ((querySource.Alias !== null) && (source !== querySource.Alias))
                return (null);
            if ((querySource.Alias === null) && (source !== querySource.Source))
                return (null);
        } else {
            if ((isObject) && (!(column in sourceObject)))
                return (null);
            if ((!isObject) && ((querySource.Alias ?? querySource.Source) !== column))
                return (null);
        }
        const value: any = isObject ? sourceObject[column] : sourceObject;
        return (value == null ? null : this.Application.Solver.EnsureString(value));
    }

    private ResolveQueryFunctionParameterName(value: string): string {
        value = value.replace('.', '_');
        return (value);
    }

    private ResolveQueryFunctions(query: DrapoQuery, objects: any[], objectsInformation: any[]): void {
        for (let i: number = 0; i < query.Projections.length; i++) {
            const projection: DrapoQueryProjection = query.Projections[i];
            if (projection.FunctionName !== null)
                this.ResolveQueryFunction(projection.Alias, projection.FunctionName, projection.FunctionParameters, objects, objectsInformation);
        }
    }

    private ResolveQueryFunction(projectionAlias: string, functionName: string, functionParameters: string[], objects: any[], objectsInformation: any[]): void {
        if (functionName === 'COALESCE')
            this.ResolveQueryFunctionCoalesce(projectionAlias, functionParameters, objects, objectsInformation);
    }

    private ResolveQueryFunctionCoalesce(projectionAlias: string, functionParameters: string[], objects: any[], objectsInformation: any[]): void {
        for (let i: number = 0; i < objects.length; i++) {
            const object: any = objects[i];
            const objectInformation: any = objectsInformation[i];
            for (let j: number = 0; j < functionParameters.length; j++) {
                const functionParameter: string = functionParameters[j];
                const functionParameterName: string = this.ResolveQueryFunctionParameterName(functionParameter);
                if (objectInformation[functionParameterName] == null)
                    continue;
                object[projectionAlias] = objectInformation[functionParameterName];
                break;
            }
        }
    }

    private async ResolveQueryConditionMustaches(sector: string, dataKey: string, query: DrapoQuery): Promise<void> {
        //Filter
        if (query.Filter != null)
            await this.ResolveQueryConditionMustachesFilter(sector, dataKey, query.Filter);
        //Sources
        for (let i: number = 0; i < query.Sources.length; i++) {
            const source: DrapoQuerySource = query.Sources[i];
            if (source.JoinConditions == null)
                continue;
            for (let j = 0; j < source.JoinConditions.length; j++) {
                const filter: DrapoQueryCondition = source.JoinConditions[j];
                await this.ResolveQueryConditionMustachesFilter(sector, dataKey, filter);
            }
        }
        //Sorts
        if (query.Sorts != null)
            await this.ResolveQuerySortsMustaches(sector, dataKey, query.Sorts);
    }

    private async ResolveQueryConditionMustachesFilter(sector: string, dataKey: string, filter: DrapoQueryCondition): Promise<void> {
        //Left
        const valueLeft: string = await this.ResolveQueryConditionMustachesFilterValue(sector, dataKey, filter.ValueLeft);
        if (valueLeft !== undefined) {
            filter.ColumnLeft = valueLeft;
            filter.ValueLeft = valueLeft;
        }
        //Right
        const valueRight: string = await this.ResolveQueryConditionMustachesFilterValue(sector, dataKey, filter.ValueRight);
        if (valueRight !== undefined) {
            filter.ColumnRight = valueRight;
            filter.ValueRight = valueRight;
        }
    }

    private async ResolveQueryConditionMustachesFilterValue(sector: string, dataKey: string, value: string): Promise<string> {
        if (!this.Application.Parser.IsMustache(value))
            return (undefined);
        const mustacheParts: string[] = this.Application.Parser.ParseMustache(value);
        const mustacheDataKey: string = this.Application.Solver.ResolveDataKey(mustacheParts);
        //Subscribe
        this.Application.Observer.SubscribeStorage(mustacheDataKey, null, dataKey);
        const valueResolved: string = await this.RetrieveDataValue(sector, value);
        return (valueResolved);
    }

    private IsValidQueryCondition(filter: DrapoQueryCondition): boolean {
        if ((filter.Comparator === '=') && (filter.ValueLeft == filter.ValueRight))
            return (true);
        if ((filter.Comparator === 'IS') && (filter.IsNullRight) && (filter.ValueLeft == null))
            return (true);
        if ((filter.Comparator === 'IS NOT') && (filter.IsNullRight) && (filter.ValueLeft != null))
            return (true);
        return (false);
    }

    private async ResolveQuerySortsMustaches(sector: string, dataKey: string, sorts: DrapoQuerySort[]): Promise<void> {
        for (let i: number = 0; i < sorts.length; i++) {
            let sort: DrapoQuerySort = sorts[i];
            const column: string = await this.ResolveQueryConditionMustachesFilterValue(sector, dataKey, sort.Column);
            if (column !== undefined)
                sort.Column = column;
            const type: string = await this.ResolveQueryConditionMustachesFilterValue(sector, dataKey, sort.Type);
            if (column !== undefined)
                sort.Type = type;
        }
    }

    private ResolveQueryOrderBy(query: DrapoQuery, objects: any[]): any[] {
        if ((query.Sorts == null) || (query.Sorts.length == 0))
            return (objects);
        const sorts: DrapoQuerySort[] = query.Sorts;
        let sorted: boolean = true;
        while (sorted) {
            sorted = false;
            for (let i: number = 0; i < (objects.length - 1); i++) {
                const objectCurrent = objects[i]; 
                const objectNext = objects[i + 1];
                if (!this.IsSwapQueryOrderBy(sorts, objectCurrent, objectNext))
                    continue;
                sorted = true;
                objects[i] = objectNext;
                objects[i + 1] = objectCurrent;
            }
        }
        return (objects);
    }

    private IsSwapQueryOrderBy(sorts: DrapoQuerySort[], objectCurrent: any, objectNext: any): boolean{
        for (let i: number = 0; i < sorts.length; i++) {
            const sort: DrapoQuerySort = sorts[i];
            const value: number = this.GetSwapQueryOrderBy(sort, objectCurrent, objectNext);
            if (value == 0)
                continue;
            if (value < 0)
                return (true);
            return (false);
        }
        return (false);
    }

    private GetSwapQueryOrderBy(sort: DrapoQuerySort, objectCurrent: any, objectNext: any): number {
        const propertyCurrent = objectCurrent[sort.Column];
        const propertyNext = objectNext[sort.Column];
        if (propertyCurrent == propertyNext)
            return (0);
        let value: number = propertyNext > propertyCurrent ? 1 : -1;
        if (sort.Type == 'DESC')
            value = 0 - value;
        return (value);
    }
}

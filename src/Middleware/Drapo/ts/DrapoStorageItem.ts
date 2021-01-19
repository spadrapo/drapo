class DrapoStorageItem {
    //Fields
    private _type: string = null;
    private _access: string = null;
    private _element: Element;
    private _data: any[] = [];
    private _dataInserted: any = [];
    private _dataUpdated: any = [];
    private _dataDeleted: any = [];
    private _urlGet: string = null;
    private _urlSet: string = null;
    private _urlParameters: string = null;
    private _postGet: string = null;
    private _start: number = null;
    private _increment: number = null;
    private _isIncremental: boolean = false;
    private _isFull: boolean = false;
    private _isGrowing: boolean = false;
    private _isUnitOfWork = false;
    private _isDelay: boolean = false;
    private _cookieName: string = null;
    private _isCookieChange: boolean = false;
    private _userConfig: string = null;
    private _isToken: boolean = false;
    private _sector: string = null;
    private _groups: string[] = null;
    private _pipes: string[] = null;
    private _canCache: boolean = true;
    private _cacheKeys: string[] = null;
    private _onLoad: string = null;
    private _onAfterContainerLoad: string = null;
    private _onBeforeContainerUnload: string = null;
    private _onAfterCached: string = null;
    private _onNotify: string = null;
    private _headersGet: [string, string][] = [];
    private _headersSet: [string, string][] = [];
    private _hasChanges: boolean = false;

    //Properties
    get Type(): string {
        return (this._type);
    }
    set Type(value: string) {
        this._type = value;
    }

    get Access(): string {
        return (this._access);
    }
    set Access(value: string) {
        this._access = value;
    }

    get Element(): Element {
        return (this._element);
    }
    set Element(value: Element) {
        this._element = value;
    }

    get Data(): any[] {
        return (this._data);
    }
    set Data(value: any[]) {
        this._data = value;
        this._isFull = false;
        this._isGrowing = false;
    }

    get DataInserted(): any[] {
        return (this._dataInserted);
    }
    set DataInserted(value: any[]) {
        this._dataInserted = value;
    }

    get DataUpdated(): any[] {
        return (this._dataUpdated);
    }
    set DataUpdated(value: any[]) {
        this._dataUpdated = value;
    }

    get DataDeleted(): any[] {
        return (this._dataDeleted);
    }
    set DataDeleted(value: any[]) {
        this._dataDeleted = value;
    }

    get UrlGet(): string {
        return (this._urlGet);
    }
    set UrlGet(value: string) {
        this._urlGet = value;
    }

    get UrlSet(): string {
        return (this._urlSet);
    }
    set UrlSet(value: string) {
        this._urlSet = value;
    }

    get UrlParameters(): string {
        return (this._urlParameters);
    }

    get IsUrlParametersRequired(): boolean {
        return (this._urlParameters === 'required');
    }

    get PostGet(): string {
        return (this._postGet);
    }
    set PostGet(value: string) {
        this._postGet = value;
    }

    get Start(): number {
        return (this._start);
    }
    set Start(value: number) {
        this._start = value;
    }

    get Increment(): number {
        return (this._increment);
    }
    set Increment(value: number) {
        this._increment = value;
    }

    get IsIncremental(): boolean {
        return (this._isIncremental);
    }
    set IsIncremental(value: boolean) {
        this._isIncremental = value;
    }

    get IsFull(): boolean {
        return (this._isFull);
    }
    set IsFull(value: boolean) {
        this._isFull = value;
    }

    get IsGrowing(): boolean {
        return (this._isGrowing);
    }
    set IsGrowing(value: boolean) {
        this._isGrowing = value;
    }

    get IsUnitOfWork(): boolean {
        return (this._isUnitOfWork);
    }
    set IsUnitOfWork(value: boolean) {
        this._isUnitOfWork = value;
    }

    get IsDelay(): boolean {
        return (this._isDelay);
    }
    set IsDelay(value: boolean) {
        this._isDelay = value;
    }

    get CookieName(): string {
        return (this._cookieName);
    }
    set CookieName(value: string) {
        this._cookieName = value;
    }

    get IsCookieChange(): boolean {
        return (this._isCookieChange);
    }
    set IsCookieChange(value: boolean) {
        this._isCookieChange = value;
    }

    get UserConfig(): string {
        return (this._userConfig);
    }
    set UserConfig(value: string) {
        this._userConfig = value;
    }

    get IsTypeValue(): boolean {
        return (this._type === 'value');
    }

    get IsTypeObject(): boolean {
        return (this._type === 'object');
    }

    get IsTypeParent(): boolean {
        return (this._type === 'parent');
    }

    get IsTypeArray(): boolean {
        return ((this._type === 'array') || (Array.isArray(this.Data)));
    }

    get IsTypeFunction(): boolean {
        return (this._type === 'function');
    }

    get IsAccessPublic(): boolean {
        return (this._access === 'public');
    }

    get IsAccessPrivate(): boolean {
        return (this._access === 'private');
    }

    get IsToken(): boolean {
        return (this._isToken);
    }
    set IsToken(value: boolean) {
        this._isToken = value;
    }

    get Sector(): string {
        return (this._sector);
    }
    set Sector(value: string) {
        this._sector = value;
    }

    get Pipes(): string[] {
        return (this._pipes);
    }
    set Pipes(value: string[]) {
        this._pipes = value;
    }

    get CanCache(): boolean {
        return (this._canCache);
    }
    set CanCache(value: boolean) {
        this._canCache = value;
    }

    get CacheKeys(): string[] {
        return (this._cacheKeys);
    }
    set CacheKeys(value: string[]) {
        this._cacheKeys = value;
    }

    get OnLoad(): string {
        return (this._onLoad);
    }
    set OnLoad(value: string) {
        this._onLoad = value;
    }

    get OnAfterContainerLoad(): string {
        return (this._onAfterContainerLoad);
    }
    set OnAfterContainerLoad(value: string) {
        this._onAfterContainerLoad = value;
    }

    get OnBeforeContainerUnload(): string {
        return (this._onBeforeContainerUnload);
    }
    set OnBeforeContainerUnload(value: string) {
        this._onBeforeContainerUnload = value;
    }

    get OnAfterCached(): string {
        return (this._onAfterCached);
    }
    set OnAfterCached(value: string) {
        this._onAfterCached = value;
    }

    get OnNotify(): string {
        return (this._onNotify);
    }
    set OnNotify(value: string) {
        this._onNotify = value;
    }

    get HeadersGet(): [string, string][] {
        return (this._headersGet);
    }
    set HeadersGet(value: [string, string][]) {
        this._headersGet = value;
    }

    get HeadersSet(): [string, string][] {
        return (this._headersSet);
    }
    set HeadersSet(value: [string, string][]) {
        this._headersSet = value;
    }

    get HasChanges(): boolean {
        return (this._hasChanges);
    }
    set HasChanges(value: boolean) {
        this._hasChanges = value;
    }

    //Constructor
    constructor(type: string, access: string, element: Element, data: any[], urlGet: string, urlSet: string, urlParameters: string, postGet: string, start: number, increment: number, isIncremental: boolean, isFull: boolean, isUnitOfWork: boolean, isDelay: boolean, cookieName: string, isCookieChange: boolean, userConfig: string, isToken: boolean, sector: string, groups: string[], pipes: string[], canCache: boolean, cacheKeys: string[], onLoad: string, onAfterContainerLoad: string, onBeforeContainerUnload: string, onAfterCached: string, onNotify: string, headersGet: [string, string][], headersSet: [string, string][]) {
        this._type = type;
        this._access = access;
        this._element = element;
        this._data = data;
        this._urlGet = urlGet;
        this._urlSet = urlSet;
        this._urlParameters = urlParameters;
        this._postGet = postGet;
        this._start = start;
        this._increment = increment;
        this._isIncremental = isIncremental;
        this._isFull = isFull;
        this._isUnitOfWork = isUnitOfWork;
        this._isDelay = isDelay;
        this._cookieName = cookieName;
        this._isCookieChange = isCookieChange;
        this._userConfig = userConfig;
        this._isToken = isToken;
        this._sector = sector;
        this._groups = groups;
        this._pipes = pipes;
        this._canCache = canCache;
        this._cacheKeys = cacheKeys;
        this._onLoad = onLoad;
        this._onAfterContainerLoad = onAfterContainerLoad == null ? null : onAfterContainerLoad;
        this._onBeforeContainerUnload = onBeforeContainerUnload == null ? null : onBeforeContainerUnload;
        this._onAfterCached = onAfterCached == null ? null : onAfterCached;
        this._onNotify = onNotify == null ? null : onNotify;
        this._headersGet = headersGet;
        this._headersSet = headersSet;
        this.Initialize();
    }

    private Initialize(): void {
        //Access
        if (this._access == null)
            this._access = this.IsTypeParent ? 'private' : 'public';
    }

    public ContainsGroup(group: string): boolean {
        if (this._groups == null)
            return (false);
        for (let i: number = 0; i < this._groups.length; i++)
            if (this._groups[i] === group)
                return (true);
        return (false);
    }
}
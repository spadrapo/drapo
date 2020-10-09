declare class DrapoCookieHandler {
    private _application;
    get Application(): DrapoApplication;
    constructor(application: DrapoApplication);
    RetrieveData(name?: string): any;
    private CreateStructure;
    GetCookieValues(name?: string): [string, string][];
    private GetCookieValue;
    private CreateCookieValues;
    SetCookieValue(dataItem: DrapoStorageItem): boolean;
    private CreateCookieValue;
    private SetDocumentCookie;
    HandleCookieValuesChanges(cookieValuesBefore: [string, string][]): Promise<boolean>;
    private HandleCookieValueChange;
    private GetCookieValuesNamedChanged;
    private HasCookieValueChanged;
    GetTheme(): string;
    GetView(): string;
}

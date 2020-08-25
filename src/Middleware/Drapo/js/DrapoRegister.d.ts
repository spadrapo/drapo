declare class DrapoRegister {
    private _application;
    private _components;
    private _cacheKeys;
    private _cacheDatas;
    get Application(): DrapoApplication;
    constructor(application: DrapoApplication);
    private GetRegisteredComponent;
    IsRegisteredComponent(tagName: string): Promise<boolean>;
    IsActiveComponent(tagName: string): boolean;
    ActivateComponent(tagName: string): Promise<void>;
    private ActivateComponentFileScript;
    private ActivateComponentFileStyle;
    CreateInstanceComponent(tagName: string, el: HTMLElement): Promise<any>;
    private WaitForFunction;
    GetRegisteredComponentViewContent(tagName: string): Promise<string>;
    private GetRegisteredComponentFileContent;
    private GetComponentFileUrl;
    private GetRegisteredComponentFileContentInternal;
    private CreateKeyComponentFile;
    private GetCacheKeyIndex;
    private GetCacheData;
    private AddCacheData;
    private IsEndsWith;
}

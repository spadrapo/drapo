declare class DrapoClassHandler {
    private _application;
    get Application(): DrapoApplication;
    constructor(application: DrapoApplication);
    HasContentClassContext(content: string): boolean;
    ResolveClass(el: HTMLElement, sector: string, canBind?: boolean, canSubscribeDelay?: boolean, dataKeyFilter?: string, dataFieldFilter?: string, type?: DrapoStorageLinkType): Promise<void>;
    ResolveClassContext(context: DrapoContext, renderContext: DrapoRenderContext, el: HTMLElement, sector: string, canBind: boolean, type?: DrapoStorageLinkType): Promise<boolean>;
    private ExtractClasses;
}

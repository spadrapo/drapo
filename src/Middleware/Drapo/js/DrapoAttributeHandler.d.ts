declare class DrapoAttributeHandler {
    private _application;
    get Application(): DrapoApplication;
    constructor(application: DrapoApplication);
    HasContentIDContext(content: string): boolean;
    HasContentAttributeContext(content: string): boolean;
    ResolveAttr(el: HTMLElement, canBind?: boolean, canSubscribeDelay?: boolean, dataKeyFilter?: string, dataFieldFilter?: string): Promise<void>;
    ResolveAttrContext(context: DrapoContext, el: HTMLElement, canBind: boolean): Promise<void>;
    private ResolveContextValue;
    private ExtractAttr;
    private ExtractAttrProperty;
    ResolveID(el: HTMLElement, sector: string, canBind?: boolean, canSubscribeDelay?: boolean, dataKeyFilter?: string, dataFieldFilter?: string): Promise<void>;
    ResolveIDContext(context: DrapoContext, el: HTMLElement, sector: string, canBind: boolean): Promise<boolean>;
    private ResolveConversionAttributeValue;
    private ResolveConversionAttributeSourceValue;
}

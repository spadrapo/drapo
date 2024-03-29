declare class DrapoComponentHandler {
    private _application;
    private _dataSectors;
    private _dataTags;
    private _dataElements;
    private _dataInstances;
    get Application(): DrapoApplication;
    constructor(application: DrapoApplication);
    ResolveComponents(el?: HTMLElement): Promise<void>;
    ResolveComponentsElement(el: HTMLElement, context: DrapoContext, checkSectorReady: boolean, handleDynamicSectors: boolean): Promise<void>;
    private ResolveComponentElement;
    private GetSectorContext;
    private CreateGuidContext;
    private CreateGuidContextHierarchy;
    private CreateElementHierarchy;
    private InsertElementHierarchy;
    private GetElementIndex;
    private GetElementByHierarchy;
    private GetElementContent;
    private ResolveContentElement;
    IsComponent(tagName: string): boolean;
    private IsStartsWith;
    private SubscribeComponentInstance;
    private GetComponentInstanceIndex;
    private CreateComponentInstanceIndex;
    GetComponentInstance(sector: string, did?: string): any;
    private GetComponentInstanceByElementSector;
    private GetComponentInstanceInternal;
    UnloadComponentInstances(sector: string): boolean;
    UnloadComponentInstancesDetached(sector: string): Promise<boolean>;
    UnloadComponentInstancesDetachedFullCheck(): Promise<boolean>;
    HasContentComponent(content: string): boolean;
    ResolveComponentContext(sector: string, context: DrapoContext, el: HTMLElement, renderContext: DrapoRenderContext, canResolveComponents: boolean): Promise<void>;
    Retrieve(): [string, string, HTMLElement, any][];
    AppendInstances(sector: string, componentSectors: string[], componentTags: string[][], componentElements: HTMLElement[][], componentInstances: any[][]): void;
    AddInstances(container: DrapoSectorContainerItem): Promise<void>;
}

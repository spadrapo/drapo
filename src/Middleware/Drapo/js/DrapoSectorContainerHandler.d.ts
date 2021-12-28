declare class DrapoSectorContainerHandler {
    private readonly CONTAINER_EQUAL;
    private _application;
    private _containers;
    private _activeSectorContainers;
    private _sectorContexts;
    private _sectorContextsExpressions;
    private _sectorContextsValues;
    get Application(): DrapoApplication;
    constructor(application: DrapoApplication);
    IsElementContainerized(element: HTMLElement): boolean;
    private GetElementRoot;
    Switch(sector: string, containerCode?: string): Promise<boolean>;
    private CreateContainer;
    private LoadContainer;
    UnloadSector(sector: string): Promise<void>;
    RemoveByContainer(containerCode: string): boolean;
    RemoveBySector(sector: string): boolean;
    GetStorageItem(sector: string, containerCode: string, dataKey: string): DrapoStorageItem;
    ReloadStorageItemByPipe(dataPipe: string): void;
    HasMustacheContextCache(sector: string, expression: string): boolean;
    private RemoveMustacheContextCache;
    AddMustacheContextCache(sector: string, expression: string, value: boolean): void;
    private GetMustacheContextIndex;
    private GetMustacheContextExpressionIndex;
}

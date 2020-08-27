declare class DrapoSectorContainerItem {
    private _sector;
    private _containerCode;
    private _storageItems;
    private _sectorHierarchys;
    private _sectorFriends;
    private _componentSectors;
    private _componentTags;
    private _componentElements;
    private _componentInstances;
    private _element;
    private _canDetachElement;
    get Sector(): string;
    get ContainerCode(): string;
    get StorageItems(): [string, DrapoStorageItem][];
    get SectorHierarchys(): [string, string][];
    get SectorFriends(): [string, string[]][];
    get ComponentSectors(): string[];
    get ComponentTags(): string[][];
    get ComponentElements(): HTMLElement[][];
    get ComponentInstances(): any[][];
    get Element(): HTMLElement;
    get CanDetachElement(): boolean;
    constructor(sector: string, containerCode: string, storageItems: [string, DrapoStorageItem][], sectorHierarchys: [string, string][], sectorFriends: [string, string[]][], componentSectors: string[], componentTags: string[][], componentElements: HTMLElement[][], componentInstances: any[][], element: HTMLElement, canDetachElement: boolean);
}

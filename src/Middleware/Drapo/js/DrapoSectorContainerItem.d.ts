declare class DrapoSectorContainerItem {
    private _sector;
    private _containerCode;
    private _storageItems;
    private _sectorHierarchys;
    private _sectorFriends;
    private _element;
    private _canDetachElement;
    get Sector(): string;
    get ContainerCode(): string;
    get StorageItems(): [string, DrapoStorageItem][];
    get SectorHierarchys(): [string, string][];
    get SectorFriends(): [string, string[]][];
    get Element(): HTMLElement;
    get CanDetachElement(): boolean;
    constructor(sector: string, containerCode: string, storageItems: [string, DrapoStorageItem][], sectorHierarchys: [string, string][], sectorFriends: [string, string[]][], element: HTMLElement, canDetachElement: boolean);
}

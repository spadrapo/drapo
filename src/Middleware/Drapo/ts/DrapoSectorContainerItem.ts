class DrapoSectorContainerItem {
    private _sector: string = null;
    private _containerCode: string = null;
    private _storageItems: [string, DrapoStorageItem][] = [];
    private _sectorHierarchys: [string, string][] = [];
    private _sectorFriends: [string, string[]][] = [];
    private _element: HTMLElement = null;
    private _canDetachElement: boolean = true;

    get Sector(): string {
        return (this._sector);
    }
    get ContainerCode(): string {
        return (this._containerCode);
    }
    get StorageItems(): [string, DrapoStorageItem][] {
        return (this._storageItems);
    }
    get SectorHierarchys(): [string, string][] {
        return this._sectorHierarchys;
    }
    get SectorFriends(): [string, string[]][] {
        return this._sectorFriends;
    }
    get Element(): HTMLElement {
        return this._element;
    }
    get CanDetachElement(): boolean {
        return this._canDetachElement;
    }
    constructor(sector: string, containerCode: string, storageItems: [string, DrapoStorageItem][], sectorHierarchys: [string, string][], sectorFriends: [string, string[]][], element: HTMLElement, canDetachElement : boolean) {
        this._sector = sector;
        this._containerCode = containerCode;
        this._storageItems = storageItems;
        this._sectorHierarchys = sectorHierarchys;
        this._sectorFriends = sectorFriends;
        this._element = element;
        this._canDetachElement = canDetachElement;
    }
}
class DrapoSectorContainerItem {
    private _sector: string = null;
    private _containerCode: string = null;
    private _storageItems: DrapoStorageItem[] = [];
    private _sectorHierarchys: [string, string][] = [];
    private _sectorFriends: [string, string[]][] = [];
    private _componentSectors: string[] = [];
    private _componentTags: string[][] = [];
    private _componentElements: HTMLElement[][] = [];
    private _componentInstances: any[][] = [];
    private _element: HTMLElement = null;
    private _canDetachElement: boolean = true;

    get Sector(): string {
        return (this._sector);
    }
    get ContainerCode(): string {
        return (this._containerCode);
    }
    get StorageItems(): DrapoStorageItem[] {
        return (this._storageItems);
    }
    get SectorHierarchys(): [string, string][] {
        return this._sectorHierarchys;
    }
    get SectorFriends(): [string, string[]][] {
        return this._sectorFriends;
    }
    get ComponentSectors(): string[] {
        return (this._componentSectors);
    }
    get ComponentTags(): string[][] {
        return (this._componentTags);
    }
    get ComponentElements(): HTMLElement[][] {
        return (this._componentElements);
    }
    get ComponentInstances(): any[][] {
        return (this._componentInstances);
    }
    get Element(): HTMLElement {
        return this._element;
    }
    get CanDetachElement(): boolean {
        return this._canDetachElement;
    }
    constructor(sector: string, containerCode: string, storageItems: DrapoStorageItem[], sectorHierarchys: [string, string][], sectorFriends: [string, string[]][], componentSectors: string[], componentTags: string[][], componentElements: HTMLElement[][], componentInstances: any[][], element: HTMLElement, canDetachElement : boolean) {
        this._sector = sector;
        this._containerCode = containerCode;
        this._storageItems = storageItems;
        this._sectorHierarchys = sectorHierarchys;
        this._sectorFriends = sectorFriends;
        this._componentSectors = componentSectors;
        this._componentTags = componentTags;
        this._componentElements = componentElements;
        this._componentInstances = componentInstances;
        this._element = element;
        this._canDetachElement = canDetachElement;
    }
}
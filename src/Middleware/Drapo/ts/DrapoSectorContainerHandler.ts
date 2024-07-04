class DrapoSectorContainerHandler {
    private readonly CONTAINER_EQUAL = '=';
    private _application: DrapoApplication;
    private _containers: DrapoSectorContainerItem[] = [];
    private _activeSectorContainers: [string, string][] = [];
    private _sectorContexts: string[] = [];
    private _sectorContextsExpressions: string[][] = [];
    private _sectorContextsValues: boolean[][] = [];

    //Properties
    get Application(): DrapoApplication {
        return (this._application);
    }

    //Constructors
    constructor(application: DrapoApplication) {
        this._application = application;
    }

    public IsElementContainerized(element: HTMLElement): boolean {
        const elRoot: HTMLElement = this.GetElementRoot(element);
        if (elRoot === null)
            return (false);
        for (let i: number = this._containers.length - 1; i >= 0; i--) {
            const container: DrapoSectorContainerItem = this._containers[i];
            if (container.Element === elRoot)
                return (true);
        }
        return (false);
    }

    private GetElementRoot(el: HTMLElement): HTMLElement {
        if (el == null)
            return (null);
        while (el.parentElement !== null) {
            el = el.parentElement;
            if (el.tagName === 'BODY')
                return (null);
        }
        return (el);
    }

    public async Switch(sector: string, containerCode: string = null): Promise<boolean> {
        //Previous Active
        let containerCodePrevious: string = null;
        for (let i: number = 0; i < this._activeSectorContainers.length; i++) {
            const activeSectorContainer: [string, string] = this._activeSectorContainers[i];
            if (activeSectorContainer[0] !== sector)
                continue;
            containerCodePrevious = activeSectorContainer[1];
            if (containerCode !== this.CONTAINER_EQUAL)
                this._activeSectorContainers.splice(i, 1);
            break;
        }
        //Create a new container with current data for the previous active
        if ((containerCodePrevious !== null) && (containerCode !== this.CONTAINER_EQUAL)) {
            const containerPrevious: DrapoSectorContainerItem = this.CreateContainer(sector, containerCodePrevious);
            this._containers.push(containerPrevious);
        }
        //Unload Sector
        await this.UnloadSector(sector);
        //Detach Element to create a new one later
        if (containerCode === this.CONTAINER_EQUAL) {
            const el: HTMLElement = this.Application.Document.GetSectorElementInner(sector);
            if ((el !== null) && (el.parentElement !== null))
                el.parentElement.removeChild(el);
        }
        //Empty Container
        if ((containerCode === null) || (containerCode === this.CONTAINER_EQUAL)) {
            return (false);
        }
        //Load Container
        let loaded: boolean = false;
        for (let i: number = 0; i < this._containers.length; i++) {
            const container: DrapoSectorContainerItem = this._containers[i];
            if ((container.Sector !== sector) || (container.ContainerCode !== containerCode))
                continue;
            this._containers.splice(i, 1);
            await this.LoadContainer(container);
            loaded = true;
            break;
        }
        //Activate
        this._activeSectorContainers.push([sector, containerCode]);
        return (loaded);
    }

    private CreateContainer(sector: string, containerCode: string): DrapoSectorContainerItem {
        //Element
        const el: HTMLElement = this.Application.Document.GetSectorElementInner(sector);
        //Can Detach Element
        const canDetachElement: boolean = this.Application.Document.CanDetachElement(el);
        //Sector and Children
        const sectorChildren: string[] = this.Application.Document.GetSectorAndChildren(sector);
        //Storage Items
        const storageItems: DrapoStorageItem[] = [];
        //Sector Hierarchys
        const sectorHierarchys: [string, string][] = [];
        //Sector Friends
        const sectorFriends: [string, string[]][] = [];
        //Observer
        const observerItem: DrapoSectorContainerObserverItem = new DrapoSectorContainerObserverItem();
        //Component Sectors
        const componentSectors: string[] = [];
        //Component Tags
        const componentTags: string[][] = [];
        //Component Elements
        const componentElements: HTMLElement[][] = [];
        //Component Instances
        const componentInstances: any[][] = [];
        //Sectors
        for (let i: number = 0; i < sectorChildren.length; i++) {
            const sectorCurrent: string = sectorChildren[i];
            //Sector Storage Items
            this.Application.Storage.AppendCacheDataItemBySector(storageItems, sectorCurrent);
            //Sector Hierarchys
            this.Application.Document.AppendSectorHierarchyBySector(sectorHierarchys, sectorCurrent);
            //Sector Friends
            this.Application.Document.AppendSectorFriendsBySector(sectorFriends, sectorCurrent);
            //Observer
            this.Application.Observer.AppendObserverItem(observerItem, sectorCurrent);
            //Components
            this.Application.ComponentHandler.AppendInstances(sectorCurrent, componentSectors, componentTags, componentElements, componentInstances);
        }
        return (new DrapoSectorContainerItem(sector, containerCode, storageItems, sectorHierarchys, sectorFriends, observerItem, componentSectors, componentTags, componentElements, componentInstances, el, canDetachElement));
    }

    private async LoadContainer(container: DrapoSectorContainerItem): Promise<void> {
        //Element
        this.Application.Document.SetSectorElementInner(container.Sector, container.Element, container.CanDetachElement);
        //Storage Items
        await this.Application.Storage.AddCacheDataItems(container.StorageItems);
        //Sector Hierarchy
        this.Application.Document.AddSectorHierarchys(container.SectorHierarchys);
        //Sector Friends
        this.Application.Document.AddSectorFriendsRange(container.SectorFriends);
        //Observer
        this.Application.Observer.AddObserverItem(container.ObserverItem);
        //Component
        await this.Application.ComponentHandler.AddInstances(container);
        //Sector Event
        const sectorChildren: string[] = this.Application.Document.GetSectorAndChildren(container.Sector);
        for (let i: number = 0; i < sectorChildren.length; i++) {
            const sectorCurrent: string = sectorChildren[i];
            await this.Application.Storage.FireEventOnAfterContainerLoad(sectorCurrent);
        }
    }

    public async UnloadSector(sector: string): Promise<void> {
        //Sector and Children
        const sectorChildren: string[] = this.Application.Document.GetSectorAndChildren(sector);
        //Sectors
        for (let i: number = 0; i < sectorChildren.length; i++) {
            const sectorCurrent: string = sectorChildren[i];
            //Sector Event
            await this.Application.Storage.FireEventOnBeforeContainerUnload(sectorCurrent);
            //Unload Observer
            this.Application.Observer.UnloadSector(sectorCurrent);
            //Unload Validation
            this.Application.Validator.UnloadSector(sectorCurrent);
            //Unload Component Instances
            this.Application.ComponentHandler.UnloadComponentInstances(sectorCurrent);
            //Unload Storage Items
            await this.Application.Storage.RemoveBySector(sectorCurrent);
            //Unload Context Cache
            this.RemoveMustacheContextCache(sectorCurrent);
        }
        //Clean Sector Metadata
        this.Application.Document.CleanSectorMetadata(sector);
        //Remove Sector Element
        this.Application.Document.SetSectorElementInner(sector, null, null);
    }

    public RemoveByContainer(containerCode: string): boolean {
        //Active
        for (let i: number = this._activeSectorContainers.length - 1; i >= 0; i--) {
            const sectorContainer: [string, string] = this._activeSectorContainers[i];
            if (sectorContainer[1] !== containerCode)
                continue;
            const el: HTMLElement = this.Application.Document.GetSectorElementInner(sectorContainer[0]);
            if ((el !== null) && (el.parentElement !== null))
                el.parentElement.removeChild(el);
            this._activeSectorContainers.splice(i, 1);
            break;
        }
        //Containers
        let removed: boolean = false;
        for (let i: number = this._containers.length - 1; i >= 0; i--) {
            const container: DrapoSectorContainerItem = this._containers[i];
            if (container.ContainerCode !== containerCode)
                continue;
            if (container.Element != null && container.Element.parentElement != null)
                container.Element.parentElement.removeChild(container.Element);
            this._containers.splice(i, 1);
            removed = true;
            break;
        }
        return (removed);
    }

    public RemoveBySector(sector: string): boolean {
        //Active
        for (let i: number = this._activeSectorContainers.length - 1; i >= 0; i--) {
            const sectorContainer: [string, string] = this._activeSectorContainers[i];
            if (sectorContainer[0] !== sector)
                continue;
            this._activeSectorContainers.splice(i, 1);
            break;
        }
        //Containers
        let removed: boolean = false;
        for (let i: number = this._containers.length - 1; i >= 0; i--) {
            const container: DrapoSectorContainerItem = this._containers[i];
            if (container.Sector !== sector)
                continue;
            if ((!container.CanDetachElement) && (container.Element.parentElement != null))
                container.Element.parentElement.removeChild(container.Element);
            this._containers.splice(i, 1);
            removed = true;
        }
        return (removed);
    }

    public GetStorageItem(sector: string, containerCode: string, dataKey: string): DrapoStorageItem {
        //Containers
        for (let i: number = this._containers.length - 1; i >= 0; i--) {
            const container: DrapoSectorContainerItem = this._containers[i];
            if ((container.Sector !== sector) || (container.ContainerCode !== containerCode))
                continue;
            for (let j: number = 0; j < container.StorageItems.length; j++) {
                const storageItem: DrapoStorageItem = container.StorageItems[j];
                if (storageItem.DataKey !== dataKey)
                    continue;
                if (storageItem.Sector !== sector)
                    continue;
                return (storageItem);
            }
            break;
        }
        return (null);
    }

    public ReloadStorageItemByPipe(dataPipe: string): void {
        //Here we need to only mark the storage item that needs reload
    }

    public HasMustacheContextCache(sector: string, expression: string): boolean {
        const indexSector: number = this.GetMustacheContextIndex(sector);
        if (indexSector === null)
            return (null);
        const indexExpression = this.GetMustacheContextExpressionIndex(indexSector, expression);
        if (indexExpression === null)
            return (null);
        return (this._sectorContextsValues[indexSector][indexExpression]);
    }

    private RemoveMustacheContextCache(sector: string): void {
        const indexSector: number = this.GetMustacheContextIndex(sector);
        if (indexSector === null)
            return;
        this._sectorContexts.splice(indexSector, 1);
        this._sectorContextsExpressions.splice(indexSector, 1);
        this._sectorContextsValues.splice(indexSector, 1);
    }

    public AddMustacheContextCache(sector: string, expression: string, value: boolean): void {
        let indexSector: number = this.GetMustacheContextIndex(sector);
        if (indexSector === null) {
            indexSector = this._sectorContexts.push(sector) - 1;
            this._sectorContextsExpressions.push([]);
            this._sectorContextsValues.push([]);
        }
        this._sectorContextsExpressions[indexSector].push(expression);
        this._sectorContextsValues[indexSector].push(value);
    }

    private GetMustacheContextIndex(sector: string): number {
        for (let i: number = 0; i < this._sectorContexts.length; i++)
            if (this._sectorContexts[i] === sector)
                return (i);
        return (null);
    }

    private GetMustacheContextExpressionIndex(indexSector: number, expression: string): number {
        const expressions: string[] = this._sectorContextsExpressions[indexSector];
        for (let i: number = 0; i < expressions.length; i++)
            if (expressions[i] === expression)
                return (i);
        return (null);
    }
}
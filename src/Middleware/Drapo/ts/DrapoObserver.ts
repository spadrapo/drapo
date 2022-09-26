class DrapoObserver {
    //Field
    private _application: DrapoApplication;
    private _dataBarberDataKeys: string[] = [];
    private _dataBarberFields: string[][][] = [];
    private _dataBarberElements: HTMLElement[][] = [];
    private _dataForDataKey: string[] = [];
    private _dataForElement: HTMLElement[][] = [];
    private _dataIncrementalKey: string[] = [];
    private _dataIncrementalElements: HTMLElement[][] = [];
    private _IsEnabledNotifyIncremental: boolean = true;
    private _dataDelayKey: string[] = [];
    private _dataDelayField: string[][] = [];
    private _dataDelayElements: HTMLElement[][][] = [];
    private _dataStorageKey: string[] = [];
    private _dataStorageKeyFields: string[][] = [];
    private _dataStorageKeyReferenceKey: string[][] = [];
    private _dataStorageType: DrapoStorageLinkType[][] = [];
    private _dataAuthorizationKey: string[] = [];
    private _dataAuthorizationType: string[] = [];
    private _dataLinkDataKey: string[] = [];
    private _dataLinkReferenceKey: string[] = [];
    private _dataLinkDataFields: string[][] = [];
    private _dataComponentKey: string[] = [];
    private _dataComponentField: string[][][] = [];
    private _dataComponentElements: HTMLElement[][] = [];
    private _dataComponentFunction: Function[][] = [];
    private _dataComponentElementsFocus: HTMLElement[][] = [];

    //Properties
    get Application(): DrapoApplication {
        return (this._application);
    }

    get IsEnabledNotifyIncremental(): boolean {
        return (this._IsEnabledNotifyIncremental);
    }
    set IsEnabledNotifyIncremental(value: boolean) {
        this._IsEnabledNotifyIncremental = value;
    }

    //Constructors
    constructor(application: DrapoApplication) {
        this._application = application;
    }

    private GetBarberDataKeyIndex(dataKey: string): number {
        for (let i = 0; i < this._dataBarberDataKeys.length; i++) {
            if (this._dataBarberDataKeys[i] == dataKey)
                return (i);
        }
        return (null);
    }

    private GetForDataKeyIndex(dataKey: string): number {
        for (let i = 0; i < this._dataForDataKey.length; i++) {
            if (this._dataForDataKey[i] == dataKey)
                return (i);
        }
        return (null);
    }

    private GetDataIncrementalKeyIndex(dataKey: string): number {
        for (let i = 0; i < this._dataIncrementalKey.length; i++) {
            if (this._dataIncrementalKey[i] == dataKey)
                return (i);
        }
        return (null);
    }

    private CreateBarberDataKeyIndex(dataKey: string): number {
        const index: number = this._dataBarberDataKeys.push(dataKey);
        this._dataBarberFields.push([]);
        this._dataBarberElements.push([]);
        return (index - 1);
    }

    private CreateForDataKeyIndex(dataKey: string): number {
        const index: number = this._dataForDataKey.push(dataKey);
        this._dataForElement.push([]);
        return (index - 1);
    }

    private CreateDataIncrementalKeyIndex(dataKey: string): number {
        const index: number = this._dataIncrementalKey.push(dataKey);
        this._dataIncrementalElements.push([]);
        return (index - 1);
    }

    public SubscribeBarber(element: HTMLElement, dataKey: string, dataFields: string[]): boolean {
        let dataKeyIndex: number = this.GetBarberDataKeyIndex(dataKey);
        if (dataKeyIndex == null)
            dataKeyIndex = this.CreateBarberDataKeyIndex(dataKey);
        const dataBarberFields: string[][] = this._dataBarberFields[dataKeyIndex];
        const elements: HTMLElement[] = this._dataBarberElements[dataKeyIndex];
        for (let i: number = 0; i < dataBarberFields.length; i++) {
            if (!this.IsEqualDataFields(dataBarberFields[i], dataFields))
                continue;
            if (elements[i] !== element)
                continue;
            return (false);
        }
        dataBarberFields.push(dataFields);
        elements.push(element);
        return (true);
    }

    private UnsubscribeBarber(dataKey: string) {
        const dataKeyIndex: number = this.GetBarberDataKeyIndex(dataKey);
        if (dataKeyIndex === null)
            return;
        this._dataBarberDataKeys.splice(dataKeyIndex, 1);
        this._dataBarberElements.splice(dataKeyIndex, 1);
        this._dataBarberFields.splice(dataKeyIndex, 1);
    }

    public SubscribeFor(elementForTemplate: HTMLElement, dataKey: string): void {
        let dataKeyIndex: number = this.GetForDataKeyIndex(dataKey);
        if (dataKeyIndex == null)
            dataKeyIndex = this.CreateForDataKeyIndex(dataKey);
        this._dataForElement[dataKeyIndex].push(elementForTemplate);
    }

    public SubscribeStorage(dataKey: string, dataFields: string[], dataReferenceKey: string, type: DrapoStorageLinkType = DrapoStorageLinkType.Reload): void {
        const dataField: string = ((dataFields != null) && (dataFields.length > 0)) ? dataFields[0] : null;
        let dataKeyIndex: number = this.GetStorageKeyIndex(dataKey);
        if (dataKeyIndex == null)
            dataKeyIndex = this.CreateStorageDataKeyIndex(dataKey);
        const dataStorageFields: string[] = this._dataStorageKeyFields[dataKeyIndex];
        const dataReferenceKeys: string[] = this._dataStorageKeyReferenceKey[dataKeyIndex];
        const dataTypes: DrapoStorageLinkType[] = this._dataStorageType[dataKeyIndex];
        for (let i = 0; i < dataStorageFields.length; i++) {
            if ((dataStorageFields[i] === dataField) && (dataReferenceKeys[i] === dataReferenceKey))
                return;
        }
        dataStorageFields.push(dataField);
        dataReferenceKeys.push(dataReferenceKey);
        dataTypes.push(type);
    }

    public UnsubscribeStorage(dataKey: string): void {
        this.UnsubscribeStorageReferenceKey(dataKey);
        const dataKeyIndex: number = this.GetStorageKeyIndex(dataKey);
        if (dataKeyIndex === null)
            return;
        this._dataStorageKey.splice(dataKeyIndex, 1);
        this._dataStorageKeyFields.splice(dataKeyIndex, 1);
        this._dataStorageKeyReferenceKey.splice(dataKeyIndex, 1);
        this._dataStorageType.splice(dataKeyIndex, 1);
    }

    private UnsubscribeStorageReferenceKey(dataKey: string) {
        for (let i: number = this._dataStorageKey.length - 1; i >= 0; i--) {
            const references: string[] = this._dataStorageKeyReferenceKey[i];
            for (let j: number = references.length - 1; j >= 0; j--) {
                if (references[j] !== dataKey)
                    continue;
                this._dataStorageKeyFields[i].splice(j, 1);
                this._dataStorageKeyReferenceKey[i].splice(j, 1);
                this._dataStorageType[i].splice(j, 1);
            }
            if (references.length !== 0)
                continue;
            this._dataStorageKey.splice(i, 1);
            this._dataStorageKeyFields.splice(i, 1);
            this._dataStorageKeyReferenceKey.splice(i, 1);
            this._dataStorageType.splice(i, 1);
        }
    }

    public UnsubscribeFor(dataKey: string, elementForTemplate: HTMLElement = null): void {
        const dataKeyIndex: number = this.GetForDataKeyIndex(dataKey);
        if (dataKeyIndex == null)
            return;
        if (elementForTemplate === null) {
            this._dataForDataKey.splice(dataKeyIndex, 1);
            this._dataForElement.splice(dataKeyIndex, 1);
            return;
        }
        const dataElements: HTMLElement[] = this._dataForElement[dataKeyIndex];
        for (let i = dataElements.length - 1; i >= 0; i--) {
            const dataElementParent: HTMLElement = dataElements[i];
            if (dataElementParent != elementForTemplate)
                continue;
            this._dataForElement[dataKeyIndex].splice(i, 1);
        }
    }

    public async Notify(dataKey: string, dataIndex: number, dataFields: string[], canUseDifference: boolean = true, canNotifyStorage : boolean = true, notifyStorageDataKey: string = null): Promise<void> {
        //Debugger
        await this.Application.Debugger.AddNotify(dataKey);
        //Storage
        if (canNotifyStorage)
            await this.NotifyStorage(dataKey, dataFields, notifyStorageDataKey);
        //Control Flow
        await this.NotifyFor(dataKey, dataIndex, dataFields, canUseDifference);
        //Mustaches
        await this.NotifyBarber(dataKey, dataFields);
        //Link
        await this.NotifyLink(dataKey, dataFields);
        //Components
        await this.NotifyComponent(dataKey, dataFields);
        //Storage Event OnNotify
        await this.Application.Storage.FireEventOnNotify(dataKey);
    }

    public async NotifyFor(dataKey: string, dataIndex: number, dataFields: string[], canUseDifference: boolean = true, type: DrapoStorageLinkType = DrapoStorageLinkType.Render): Promise<void> {
        const index: number = this.GetForDataKeyIndex(dataKey);
        if (index === null)
            return;
        const dataElements: HTMLElement[] = this._dataForElement[index];
        for (let i = dataElements.length - 1; i >= 0; i--) {
            const dataElement: HTMLElement = dataElements[i];
            if (dataElement.parentElement === null) {
                dataElements.splice(i, 1);
            } else if (!this.Application.SectorContainerHandler.IsElementContainerized(dataElement)) {
                const elj: JQuery = $(dataElement);
                const eljParent: JQuery = elj.parent();
                //Control Flow
                await this.Application.ControlFlow.ResolveControlFlowFor(elj, false, canUseDifference, type);
                //Components
                await this.Application.ComponentHandler.ResolveComponents(eljParent);
            }
        }
    }

    public async NotifyBarber(dataKey: string, dataFields: string[]): Promise<void> {
        const dataKeyIndex: number = this.GetBarberDataKeyIndex(dataKey);
        if (dataKeyIndex === null)
            return;
        const dataField: string = ((dataFields != null) && (dataFields.length > 0)) ? dataFields[0] : null;
        const dataElements: HTMLElement[] = this._dataBarberElements[dataKeyIndex];
        const dataBarberFields: string[][] = this._dataBarberFields[dataKeyIndex];
        for (let i = dataElements.length - 1; i >= 0; i--) {
            const element: HTMLElement = dataElements[i];
            if (this.Application.Document.IsElementAttached(element)) {
                const dataBarberFieldsCurrent: string[] = dataBarberFields[i];
                if (!this.IsCompatibleDataFields(dataFields, dataBarberFieldsCurrent))
                    continue;
                const sector: string = this.Application.Document.GetSector(element);
                //TODO: We need to pass the full filter here in the future
                await this.Application.Barber.ResolveFilter(element, sector, dataField == null, dataKey, dataField);
            } else if (!this.Application.SectorContainerHandler.IsElementContainerized(element)) {
                dataElements.splice(i, 1);
                dataBarberFields.splice(i, 1);
            }
        }
    }

    public async NotifyStorage(dataKey: string, dataFields: string[], notifyStorageDataKey: string = null): Promise<void> {
        const dataKeyIndex: number = this.GetStorageKeyIndex(dataKey);
        if (dataKeyIndex == null)
            return;
        const dataField: string = ((dataFields != null) && (dataFields.length > 0)) ? dataFields[0] : null;
        const dataStorageFields: string[] = this._dataStorageKeyFields[dataKeyIndex];
        const dataReferenceKeys: string[] = this._dataStorageKeyReferenceKey[dataKeyIndex];
        const dataTypes: DrapoStorageLinkType[] = this._dataStorageType[dataKeyIndex];
        for (let i = 0; i < dataStorageFields.length; i++) {
            if ((dataField != null) && (dataStorageFields[i] != null) && (dataStorageFields[i] !== dataField))
                continue;
            const dataReferenceKey: string = dataReferenceKeys[i];
            if ((notifyStorageDataKey != null) && (dataReferenceKey === notifyStorageDataKey))
                continue;
            const type: DrapoStorageLinkType = dataTypes[i];
            if (type == DrapoStorageLinkType.Reload) {
                const sectors: string[] = this.Application.Storage.GetSectors(dataReferenceKey);
                for (let j = 0; j < sectors.length; j++)
                    await this.Application.Storage.ReloadData(dataReferenceKey, sectors[j], true, false);
            } else if (type == DrapoStorageLinkType.RenderClass) {
                await this.NotifyStorageRenderClass(dataReferenceKey);
            } else if (type == DrapoStorageLinkType.Pointer) {
                await this.Application.Storage.UpdatePointerStorageItems(dataKey, dataReferenceKey);
                await this.Application.Observer.Notify(dataReferenceKey, null, null, true, true, dataKey);
            } else {
                await this.Application.Observer.Notify(dataReferenceKey, null, null);
            }
        }
    }

    public async NotifyStorageRenderClass(dataKey: string): Promise<void> {
        await this.NotifyFor(dataKey, null, null, true, DrapoStorageLinkType.RenderClass);
    }

    public SubscribeIncremental(el: HTMLElement, dataKey: string): void {
        let dataKeyIndex: number = this.GetDataIncrementalKeyIndex(dataKey);
        if (dataKeyIndex == null)
            dataKeyIndex = this.CreateDataIncrementalKeyIndex(dataKey);
        this._dataIncrementalElements[dataKeyIndex].push(el);
    }

    public async NotifyIncremental(dataKey: string): Promise<void> {
        if (!this.IsEnabledNotifyIncremental)
            return;
        const dataKeyIndex: number = this.GetDataIncrementalKeyIndex(dataKey);
        if (dataKeyIndex == null)
            return;
        const elements: HTMLElement[] = this._dataIncrementalElements[dataKeyIndex];
        for (let i = elements.length - 1; i >= 0; i--) {
            if (i >= elements.length)
                continue;
            const element: HTMLElement = elements[i];
            if (element.parentElement === null)
                elements.splice(i, 1);
            else
                await this.Application.ControlFlow.ResolveControlFlowFor($(element), true);
        }
    }

    public SubscribeDelay(el: HTMLElement, dataKey: string, dataFields: string[]): void {
        //DataKey
        let dataKeyIndex: number = this.GetDelayKeyIndex(dataKey);
        if (dataKeyIndex == null) {
            dataKeyIndex = this._dataDelayKey.push(dataKey) - 1;
            this._dataDelayField.push([]);
            this._dataDelayElements.push([]);
        }
        //We only support one field in delay
        const dataField: string = ((dataFields != null) && (dataFields.length > 0)) ? dataFields[0] : null;
        //DataField
        let dataFieldIndex: number = this.GetDelayFieldKeyIndex(dataKeyIndex, dataField);
        if (dataFieldIndex == null) {
            dataFieldIndex = this._dataDelayField[dataKeyIndex].push(dataField) - 1;
            this._dataDelayElements[dataKeyIndex].push([]);
        }
        //Element
        this._dataDelayElements[dataKeyIndex][dataFieldIndex].push(el);
    }

    public async NotifyDelay(dataKey: string, dataFields: string[]): Promise<void> {
        //DataKey
        const dataKeyIndex: number = this.GetDelayKeyIndex(dataKey);
        if (dataKeyIndex == null)
            return;
        //We only support one field in delay
        const dataField: string = ((dataFields != null) && (dataFields.length > 0)) ? dataFields[0] : null;
        //DataField
        const dataFieldIndex: number = this.GetDelayFieldKeyIndex(dataKeyIndex, dataField);
        if (dataFieldIndex == null)
            return;
        //Elements
        const elements: HTMLElement[] = this._dataDelayElements[dataKeyIndex][dataFieldIndex];
        for (let i: number = 0; i < elements.length; i++) {
            const element: HTMLElement = elements[i];
            if (element === null)
                continue;
            //Subscribe
            this.SubscribeBarber(element, dataKey, dataFields);
            //Sector
            const sector: string = this.Application.Document.GetSector(element);
            //Resolve
            await this.Application.Barber.ResolveElementDelayed(element, sector, dataKey, dataField);
        }
        //Clean
        this._dataDelayField[dataKeyIndex].splice(dataFieldIndex, 1);
        this._dataDelayElements[dataKeyIndex].splice(dataFieldIndex, 1);
    }

    public SubscribeAuthorization(dataKey: string, type: string): void {
        if (this.HasDataKeyAuthorization(dataKey))
            return;
        this._dataAuthorizationKey.push(dataKey);
        this._dataAuthorizationType.push(type);
    }

    public HasDataKeyAuthorization(dataKey: string): boolean {
        return (this.GetDataKeyAuthorizationIndex(dataKey) >= 0);
    }

    private GetDataKeyAuthorizationIndex(dataKey: string): number {
        for (let i = 0; i < this._dataAuthorizationKey.length; i++)
            if (this._dataAuthorizationKey[i] == dataKey)
                return (i);
        return (-1);
    }

    public async NotifyAuthorization(): Promise<void> {
        for (let i = this._dataAuthorizationKey.length - 1; i >= 0; i--) {
            const dataKey: string = this._dataAuthorizationKey[i];
            const type: string = this._dataAuthorizationType[i];
            this._dataAuthorizationKey.splice(i, 1);
            this._dataAuthorizationType.splice(i, 1);
            this.Application.Document.ResetPendingAuthorizations(this.GetPendingAuthorization());
            if (type === 'notify')
                await this.Application.Storage.ReloadData(dataKey, null);
            else if (type === 'initialize')
                await this.Application.Storage.RetrieveDataItem(dataKey, null);
        }
        this.Application.Document.ResetPendingAuthorizations();
    }

    public HasPendingAuthorization(): boolean {
        return (this.GetPendingAuthorization() > 0);
    }

    public GetPendingAuthorization(): number {
        return (this._dataAuthorizationKey.length);
    }

    public HasDelayKeys(): boolean {
        return (this._dataDelayKey.length > 0);
    }

    public GetDelayKeys(): string[] {
        return (this._dataDelayKey);
    }

    public GetDelayFields(dataKey: string): string[] {
        const dataKeyIndex: number = this.GetDelayKeyIndex(dataKey);
        if (dataKeyIndex == null)
            return (null);
        return (this._dataDelayField[dataKeyIndex]);
    }

    private GetDelayKeyIndex(dataKey: string): number {
        const data: string[] = this._dataDelayKey;
        for (let i = 0; i < data.length; i++) {
            if (data[i] == dataKey)
                return (i);
        }
        return (null);
    }

    private GetDelayFieldKeyIndex(dataKeyIndex: number, dataField: string): number {
        const data: string[] = this._dataDelayField[dataKeyIndex];
        for (let i = 0; i < data.length; i++) {
            if (data[i] == dataField)
                return (i);
        }
        return (null);
    }

    private GetStorageKeyIndex(dataKey: string): number {
        const data: string[] = this._dataStorageKey;
        for (let i = 0; i < data.length; i++) {
            if (data[i] == dataKey)
                return (i);
        }
        return (null);
    }

    private CreateStorageDataKeyIndex(dataKey: string): number {
        const index: number = this._dataStorageKey.push(dataKey);
        this._dataStorageKeyFields.push([]);
        this._dataStorageKeyReferenceKey.push([]);
        this._dataStorageType.push([]);
        return (index - 1);
    }

    public SubscribeLink(dataKey: string, referenceKey: string, dataFields: string[] = null): boolean {
        if (referenceKey === null)
            return (false);
        const index: number = this.GetLinkIndex(dataKey, referenceKey);
        if (index !== null) {
            const linkDataFields: string[] = this._dataLinkDataFields[index];
            if (linkDataFields == null)
                return (false);
            if (this.IsEqualDataFields(linkDataFields, dataFields))
                return (false);
            this._dataLinkDataFields[index] = null;
            return (true);
        }
        if (this.GetLinkIndex(referenceKey, dataKey) !== null)
            return (false);
        this._dataLinkDataKey.push(dataKey);
        this._dataLinkReferenceKey.push(referenceKey);
        this._dataLinkDataFields.push(dataFields);
        return (true);
    }

    public SubscribeLinkMustache(mustache: string, referenceKey: string): boolean {
        let inserted: boolean = false;
        const mustaches: string[] = this.Application.Parser.ParseMustaches(mustache);
        for (let i: number = 0; i < mustaches.length; i++) {
            const mustacheCurrent: string = mustaches[i];
            const mustacheParts: string[] = this.Application.Parser.ParseMustache(mustacheCurrent);
            const mustacheDataKey: string = this.Application.Solver.ResolveDataKey(mustacheParts);
            const mustacheDataFields: string[] = this.Application.Solver.ResolveDataFields(mustacheParts);
            if (this.SubscribeLink(mustacheDataKey, referenceKey, mustacheDataFields))
                inserted = true;
        }
        return (inserted);
    }

    public UnsubscribeLink(dataKey: string, referenceKey: string = null): boolean {
        if (referenceKey === null) {
            let unsubscribed = false;
            for (let i: number = 0; i < this._dataLinkDataKey.length; i++) {
                let remove: boolean = false;
                if (this._dataLinkDataKey[i] === dataKey)
                    remove = true;
                if ((!remove) && (this._dataLinkReferenceKey[i] === dataKey))
                    remove = true;
                if (!remove)
                    continue;
                unsubscribed = true;
                this._dataLinkDataKey.splice(i, 1);
                this._dataLinkReferenceKey.splice(i, 1);
                this._dataLinkDataFields.splice(i, 1);
            }
            return (unsubscribed);
        } else {
            const index: number = this.GetLinkIndex(dataKey, referenceKey);
            if (index === null)
                return (false);
            this._dataLinkDataKey.splice(index, 1);
            this._dataLinkReferenceKey.splice(index, 1);
            this._dataLinkDataFields.splice(index, 1);
            return (true);
        }
    }

    private GetLinkIndex(dataKey: string, referenceKey: string): number {
        for (let i: number = 0; i < this._dataLinkDataKey.length; i++) {
            const dataKeyLink: string = this._dataLinkDataKey[i];
            if (dataKeyLink !== dataKey)
                continue;
            const referenceKeyLink: string = this._dataLinkReferenceKey[i];
            if (referenceKeyLink === referenceKey)
                return (i);
        }
        return (null);
    }

    private async NotifyLink(dataKey: string, dataFields: string[]): Promise<void> {
        for (let i: number = 0; i < this._dataLinkDataKey.length; i++) {
            const dataKeyLink: string = this._dataLinkDataKey[i];
            if ((dataKeyLink !== dataKey) || (!this.IsCompatibleDataFields(dataFields, this._dataLinkDataFields[i])))
                continue;
            const referenceKeyLink: string = this._dataLinkReferenceKey[i];
            await this.Notify(referenceKeyLink, null, null);
        }
    }

    public Unsubscribe(dataKey: string): void {
        //Storage
        this.UnsubscribeStorage(dataKey);
        //Control Flow
        this.UnsubscribeFor(dataKey);
        //Mustaches
        this.UnsubscribeBarber(dataKey);
        //Link
        this.UnsubscribeLink(dataKey);
        //Component
        this.UnsubscribeComponent(dataKey);
    }

    public UnsubscribeDetached(sector: string): void {
        //Component
        this.UnsubscribeComponentDetached(sector);
    }

    private GetComponentDataKeyIndex(dataKey: string): number {
        const data: string[] = this._dataComponentKey;
        for (let i = 0; i < data.length; i++) {
            if (data[i] == dataKey)
                return (i);
        }
        return (null);
    }

    private CreateComponentDataKeyIndex(dataKey: string): number {
        const index: number = this._dataComponentKey.push(dataKey);
        this._dataComponentField.push([]);
        this._dataComponentElements.push([]);
        this._dataComponentFunction.push([]);
        this._dataComponentElementsFocus.push([]);
        return (index - 1);
    }

    public SubscribeComponent(value: string, el: HTMLElement, notifyFunction: Function, elFocus: HTMLElement = null): void {
        let dataKey: string = null;
        let dataFields: string[] = null;
        let elComponentFocus: HTMLElement = null;
        if (this.Application.Parser.IsMustache(value)) {
            const mustacheParts: string[] = this.Application.Parser.ParseMustache(value);
            dataKey = this.Application.Solver.ResolveDataKey(mustacheParts);
            dataFields = this.Application.Solver.ResolveDataFields(mustacheParts);
            elComponentFocus = elFocus;
        } else {
            dataKey = value;
        }
        let dataKeyIndex: number = this.GetComponentDataKeyIndex(dataKey);
        if (dataKeyIndex == null)
            dataKeyIndex = this.CreateComponentDataKeyIndex(dataKey);
        this._dataComponentField[dataKeyIndex].push(dataFields);
        this._dataComponentElements[dataKeyIndex].push(el);
        this._dataComponentFunction[dataKeyIndex].push(notifyFunction);
        this._dataComponentElementsFocus[dataKeyIndex].push(elComponentFocus);
    }

    private UnsubscribeComponent(dataKey: string): void {
        const dataKeyIndex: number = this.GetComponentDataKeyIndex(dataKey);
        if (dataKeyIndex == null)
            return;
        this._dataComponentKey.splice(dataKeyIndex, 1);
        this._dataComponentField.splice(dataKeyIndex, 1);
        this._dataComponentElements.splice(dataKeyIndex, 1);
        this._dataComponentFunction.splice(dataKeyIndex, 1);
        this._dataComponentElementsFocus.splice(dataKeyIndex, 1);
    }

    private UnsubscribeComponentDetached(sector: string): void {
        for (let i: number = this._dataComponentKey.length - 1; i >= 0; i--) {
            const dataComponentElements: HTMLElement[] = this._dataComponentElements[i];
            for (let j: number = dataComponentElements.length - 1; j >= 0; j--) {
                const dataComponentElement: HTMLElement = dataComponentElements[j];
                if (this.Application.Document.IsElementAttached(dataComponentElement))
                    continue;
                dataComponentElements.splice(j, 1);
                this._dataComponentField[i].splice(j, 1);
                this._dataComponentFunction[i].splice(j, 1);
                this._dataComponentElementsFocus[i].splice(j, 1);
            }
            if (dataComponentElements.length > 0)
                continue;
            this._dataComponentKey.splice(i, 1);
            this._dataComponentField.splice(i, 1);
            this._dataComponentElements.splice(i, 1);
            this._dataComponentFunction.splice(i, 1);
            this._dataComponentElementsFocus.splice(i, 1);
        }
    }

    private async NotifyComponent(dataKey: string, dataFields: string[]): Promise<void> {
        const dataKeyIndex: number = this.GetComponentDataKeyIndex(dataKey);
        if (dataKeyIndex == null)
            return;
        const dataComponentElements: HTMLElement[] = this._dataComponentElements[dataKeyIndex];
        const dataComponentFunctions: Function[] = this._dataComponentFunction[dataKeyIndex];
        for (let i: number = dataComponentElements.length - 1; i >= 0; i--) {
            const dataComponentElement: HTMLElement = dataComponentElements[i];
            if ((this.Application.Document.IsElementAttached(dataComponentElement)) && (!this.Application.Document.IsElementDetached(dataComponentElement))) {
                const dataComponentFunction: Function = dataComponentFunctions[i];
                const result: any = await dataComponentFunction.apply(null, [dataComponentElement, this.Application, dataFields]);
                if ((result == null) || (result == true))
                    await this.Application.Document.ResolveComponentUpdate(dataComponentElement, null);
            } else if (!this.Application.SectorContainerHandler.IsElementContainerized(dataComponentElement)) {
                this._dataComponentField[dataKeyIndex].splice(i, 1);
                this._dataComponentElements[dataKeyIndex].splice(i, 1);
                this._dataComponentFunction[dataKeyIndex].splice(i, 1);
                this._dataComponentElementsFocus[dataKeyIndex].splice(i, 1);
            }
        }
    }

    public GetElementByModel(sector: string, model: string): HTMLElement {
        if (!this.Application.Parser.IsMustacheOnly(model))
            return (null);
        const mustacheParts: string[] = this.Application.Parser.ParseMustache(model);
        const dataKey: string = this.Application.Solver.ResolveDataKey(mustacheParts);
        const dataFields: string[] = this.Application.Solver.ResolveDataFields(mustacheParts);
        //Components
        const el: HTMLElement = this.GetElementByModelComponent(sector, model, dataKey, dataFields);
        if (el !== null)
            return (el);
        //Barber
        return (this.GetElementByModelBarber(sector, model, dataKey, dataFields));
    }

    private GetElementByModelComponent(sector: string, model: string, dataKey: string, dataFields: string[]): HTMLElement {
        const dataKeyIndex: number = this.GetComponentDataKeyIndex(dataKey);
        if (dataKeyIndex === null)
            return (null);
        const componentDataFields: string[][] = this._dataComponentField[dataKeyIndex];
        const els: HTMLElement[] = this._dataComponentElementsFocus[dataKeyIndex];
        for (let i: number = els.length - 1; i >= 0; i--) {
            const el: HTMLElement = els[i];
            if (el === null)
                continue;
            if (el.parentElement == null)
                continue;
            const componentDataField: string[] = componentDataFields[i];
            if (componentDataField == null)
                continue;
            const isEqual: boolean = this.Application.Solver.IsEqualStringArray(dataFields, componentDataField);
            if (isEqual)
                return (el);
        }
        return (null);
    }

    private GetElementByModelBarber(sector: string, model: string, dataKey: string, dataFields: string[]): HTMLElement {
        const dataKeyIndex: number = this.GetBarberDataKeyIndex(dataKey);
        if (dataKeyIndex === null)
            return;
        const dataBarberElements: HTMLElement[] = this._dataBarberElements[dataKeyIndex];
        const dataBarberFields: string[][] = this._dataBarberFields[dataKeyIndex];
        for (let i = 0; i < dataBarberElements.length; i++) {
            const element: HTMLElement = dataBarberElements[i];
            const sectorElement: string = this.Application.Document.GetSector(element);
            if (sectorElement !== sector)
                continue;
            const barberFields: string[] = dataBarberFields[i];
            const isEqual: boolean = this.IsEqualDataFields(barberFields, dataFields);
            if (!isEqual)
                continue;
            return (element);
        }
        return (null);
    }

    private IsCompatibleDataFields(dataFields1: string[], dataFields2: string[]): boolean {
        if (dataFields1 == null)
            return (true);
        if (dataFields2 == null)
            return (true);
        for (let i: number = 0; (i < dataFields1.length) && (i < dataFields2.length); i++)
            if (dataFields1[i] != dataFields2[i])
                return (false);
        return (true);
    }

    private IsEqualDataFields(dataFields1: string[], dataFields2: string[]): boolean {
        const isNull1 = dataFields1 == null;
        const isNull2 = dataFields2 == null;
        if (isNull1 != isNull2)
            return (false);
        if (isNull1)
            return (true);
        const length: number = dataFields1.length;
        if (length != dataFields2.length)
            return (false);
        for (let i: number = 0; i < length; i++)
            if (dataFields1[i] != dataFields2[i])
                return (false);
        return (true);
    }
}

class DrapoDebugger {
    //Field
    private _application: DrapoApplication;
    private _visible: boolean = false;
    private _active: boolean = false;
    private _sector: string = '__debugger';
    private SESSION_STORAGE_KEY: string = 'drapoDebugger';

    //Properties
    get Application(): DrapoApplication {
        return (this._application);
    }

    get Visible(): any {
        return (this._visible);
    }

    get Active(): any {
        return (this._active);
    }

    //Constructors
    constructor(application: DrapoApplication) {
        this._application = application;
    }

    public async ConnectDebugger(): Promise<void> {
        const binder: JQuery = $(document);
        const application: DrapoApplication = this.Application;
        binder.bind('keyup.debugger', (e: JQueryEventObject) => {
            if (!e.ctrlKey)
                return;
            if (e.key !== 'F2')
                return;
            // tslint:disable-next-line:no-floating-promises
            application.Debugger.ToogleDebugger();
        });
    }

    public async Initialize(): Promise<void>
    {
        const debuggerPropertiesText: string = window.sessionStorage.getItem(this.SESSION_STORAGE_KEY);
        if (debuggerPropertiesText == null)
            return;
        const debuggerProperties: any = this.Application.Serializer.Deserialize(debuggerPropertiesText);
        await this.Application.Storage.UpdateData('__debuggerProperties', null, debuggerProperties);
        this._active = true;
    }

    public async ToogleDebugger(): Promise<boolean> {
        if (this._visible)
            return (this.CloseDebugger());
        else
            return (this.ShowDebugger());
    }

    public async ShowDebugger(): Promise<boolean> {
        if (this._visible)
            return (false);
        await this.Application.Storage.UnloadData('__objects', '');
        //Inject Sector
        let eljSector = $("div[d-sector='" + this._sector + "']");
        if (eljSector.length === 0) {
            const fragment: DocumentFragment = document.createDocumentFragment();
            const elSector: HTMLElement = document.createElement('div');
            elSector.setAttribute('d-sector', this._sector);
            elSector.setAttribute('style', 'position:relative;z-index:99999');
            fragment.appendChild(elSector);
            document.body.appendChild(fragment);
            eljSector = $(elSector);
        }
        //Load Sector
        this.Application.Document.StartUpdate(this._sector);
        await this.Application.Document.LoadChildSectorContent(this._sector, '<d-debugger></d-debugger>');
        this._visible = true;
        this._active = true;
        return (true);
    }

    public async CloseDebugger(): Promise<boolean> {
        if (!this._visible)
            return (false);
        //Unload Sector
        this.Application.Document.StartUpdate(this._sector);
        await this.Application.Document.LoadChildSectorContent(this._sector, '');
        //Remove Sector
        const eljSector = $("div[d-sector='" + this._sector + "']");
        eljSector.remove();
        this._visible = false;
        this._active = false;
        return (true);
    }

    public async HasBreakpoint(sector: string, dataKey: string): Promise<boolean> {
        if (!this.Active)
            return (false);
        const breakpoints: any[] = await this.Application.Storage.RetrieveData('__breakpoints', '');
        for (let i: number = 0; i < breakpoints.length; i++) {
            const breakpoint: any = breakpoints[i];
            if ((this.Application.Document.IsEqualSector(breakpoint.sector, sector)) && (breakpoint.datakey === dataKey))
                return (true);
        }
        return (false);
    }

    public async ActivateBreakpoint(sector: string, dataKey: string, functionsValue: string, functionValue: string, label: string): Promise<void> {
        if (!this.Active)
            return;
        await this.Application.Storage.SetDataKeyField('__runtime', '', ['sector'], sector, false);
        await this.Application.Storage.SetDataKeyField('__runtime', '', ['datakey'], dataKey, false);
        await this.Application.Storage.SetDataKeyField('__runtime', '', ['expression'], functionsValue, false);
        await this.Application.Storage.SetDataKeyField('__runtime', '', ['functionValue'], functionValue, false);
        await this.Application.Storage.SetDataKeyField('__runtime', '', ['label'], label, false);
        await this.Application.Storage.SetDataKeyField('__runtime', '', ['running'], false, false);
        await this.Application.Observer.Notify('__runtime', null, null);
        while (true) {
            const isRunning: string = await this.Application.Storage.ResolveMustaches('', '{{__runtime.running}}');
            if (await this.Application.Solver.ResolveConditional(isRunning))
                break;
            await this.Application.Document.Sleep(1000);
        }
    }

    public async CleanRuntime(): Promise<void> {
        if (!this.Active)
            return;
        await this.Application.Storage.SetDataKeyField('__runtime', '', ['sector'], '', false);
        await this.Application.Storage.SetDataKeyField('__runtime', '', ['datakey'], '', false);
        await this.Application.Storage.SetDataKeyField('__runtime', '', ['expression'], '', false);
        await this.Application.Storage.SetDataKeyField('__runtime', '', ['functionValue'], '', false);
        await this.Application.Storage.SetDataKeyField('__runtime', '', ['label'], '', false);
        await this.Application.Observer.Notify('__runtime', null, null);
    }

    public async NotifySectors(): Promise<void> {
        if (!this.Active)
            return;
        await this.Application.Storage.ReloadData('__sectors', '');
        await this.Application.Storage.ReloadData('__objects', '');
        await this.Application.Storage.ReloadData('__objectswatchsvalues', '');
    }

    public async NotifyStorage(dataKey: string): Promise<void> {
        if (!this.Active)
            return;
        if (this.Application.Document.IsHiddenKey(dataKey))
            return;
        await this.Application.Storage.ReloadData('__objects', '');
        await this.Application.Storage.ReloadData('__objectswatchsvalues', '');
    }

    public async NotifyComponents(): Promise<void> {
        if (!this.Active)
            return;
        await this.Application.Storage.ReloadData('__components', '');
    }

    public async AddNotify(dataKey: string): Promise<void> {
        if (!this.Active)
            return;
        if (this.Application.Document.IsHiddenKey(dataKey))
            return;
        await this.Application.Storage.AddDataItem('__notifys', null, '', dataKey);
        await this.Application.Storage.ReloadData('__objectswatchsvalues', '');
    }

    public async AddPipe(pipe: string): Promise<void> {
        if (!this.Active)
            return;
        if (this.Application.Document.IsHiddenKey(pipe))
            return;
        await this.Application.Storage.AddDataItem('__pipes', null, '', pipe);
    }

    public async AddFunction(functionParsed: DrapoFunction): Promise<void> {
        if (!this.Active)
            return;
        if (this.Application.Document.IsHiddenKey(functionParsed.Name))
            return;
        let functionText = functionParsed.Name + '(';
        for (let i: number = 0; i < functionParsed.Parameters.length; i++) {
            if (i != 0)
                functionText += ',';
            functionText += functionParsed.Parameters[i];
        }
        functionText += ')';
        await this.Application.Storage.AddDataItem('__functions', null, '', functionText);
    }

    public async AddError(error: string): Promise<void> {
        if (!this.Active)
            return;
        const lastError: any = await this.Application.Storage.GetDataItemLast('__errors', '');
        if (lastError == error)
            return;
        await this.Application.Storage.AddDataItem('__errors', null, '', error);
    }

    public async GetObjects(): Promise<any[]> {
        const objectsExpanded: any[] = await this.Application.Storage.RetrieveData('__objectsexpanded', null);
        const objects: any[] = [];
        await this.CreateObjectSector(objectsExpanded, objects, null, 'root');
        return (objects);
    }

    private async CreateObject(type: string, key: string, name: string, sector: string, objectsExpanded: any[]): Promise<any> {
        const object: any = {};
        object.Type = type;
        object.Key = key;
        object.Code = type + '_' + key;
        object.Name = name != null ? name : key;
        object.Children = [];
        object.Sector = sector;
        object.Action = this.CreateObjectAction(type, key, name, sector);
        object.IsExpanded = false;
        if (objectsExpanded != null) {
            for (let i: number = 0; i < objectsExpanded.length; i++) {
                if (objectsExpanded[i] != object.Code)
                    continue;
                object.IsExpanded = true;
                break;
            }
        }
        return (object);
    }

    private CreateObjectAction(type: string, key: string, name: string, sector: string): string {
        if (type === 'sector')
            return ('UpdateDataField(__objectproperties,datakey,);UpdateDataField(__objectproperties,sector,' + sector + ');Debugger(highlight,sector,dbgDebuggerHighlight,' + sector + ')');
        if (type === 'data')
            return ('UpdateDataField(__objectproperties,sector,' + sector + ',false);UpdateDataField(__objectproperties,datakey,' + key + ');Debugger(highlight,sector,dbgDebuggerHighlight,);ReloadData(__objectdata)');
        return ('');
    }

    private async CreateObjectSector(objectsExpanded: any[], objects: any[], sector: string, name: string = null): Promise<void> {
        if ((sector != null) && (sector[0] == '_'))
            return;
        const object: any = await this.CreateObject('sector', sector, name != null ? name : sector, sector, objectsExpanded);
        objects.push(object);
        await this.InsertObjectSectorChildrenSectors(objectsExpanded, object.Children, sector);
        await this.InsertObjectSectorChildrenData(object.Children, sector);
    }

    private async InsertObjectSectorChildrenSectors(objectsExpanded: any[], objects: any[], sector: string): Promise<void> {
        const sectors: string[] = this.Application.Document.GetSectorChildren(sector);
        for (let i: number = 0; i < sectors.length; i++) {
            await this.CreateObjectSector(objectsExpanded, objects, sectors[i]);
        }
    }

    private async InsertObjectSectorChildrenData(objects: any[], sector: string): Promise<void> {
        const dataKeys: string[] = this.Application.Storage.GetSectorDataKeys(sector);
        for (let i: number = 0; i < dataKeys.length; i++) {
            const dataKey: string = dataKeys[i];
            if (dataKey[0] == '_')
                return;
            const object: any = await this.CreateObject('data', dataKey, dataKey, sector, null);
            objects.push(object);
        }
    }

    private CreateObjectData(sector: string, name: string, value: string, mustache: string): any {
        const object: any = {};
        object.Name = name != null ? name : 'data';
        object.Value = value;
        object.Mustache = mustache;
        object.__objectdata = [];
        object.Action = 'UpdateDataField(__objectwatch,Sector,' + sector + ');UpdateDataField(__objectwatch,Mustache,' + object.Mustache + ');AddDataItem(__objectswatchs,__objectwatch);ReloadData(__objectswatchsvalues)';
        object.IsExpanded = name == null;
        return (object);
    }

    public async GetObjectData(): Promise<any[]> {
        const sector: string = await this.Application.Storage.RetrieveDataValue(null, '{{__objectproperties.sector}}');
        const dataKey: string = await this.Application.Storage.RetrieveDataValue(null, '{{__objectproperties.datakey}}');
        const objects: any[] = [];
        if (dataKey == '')
            return (objects);
        const data: any = await this.GetObjectDataItem(dataKey, sector);
        await this.InsertObjectData(sector, objects, dataKey, null, data);
        return (objects);
    }

    private async GetObjectDataItem(dataKey: string, sector: string): Promise<any> {
        const storageItem: DrapoStorageItem = await this.Application.Storage.RetrieveDataItem(dataKey, sector);
        if (storageItem == null)
            return (null);
        if ((storageItem.Type == 'function') && (storageItem.OnLoad != null))
            return (storageItem.OnLoad);
        return (storageItem.Data);
    }

    private async InsertObjectData(sector: string, objects: any[], mustachePrefix: string, name: string, data: any): Promise<void> {
        if (data == null)
            return;
        if (name !== null)
            mustachePrefix = mustachePrefix + '.' + name;
        if (Array.isArray(data))
            await this.InsertObjectDataArray(sector, objects, mustachePrefix, name, data);
        else if (data instanceof Object)
            await this.InsertObjectDataObject(sector, objects, mustachePrefix, name, data);
        else if ((typeof data === 'string') || (data instanceof String))
            await this.InsertObjectDataString(sector, objects, mustachePrefix, name, data as string);
        else
            await this.InsertObjectDataString(sector, objects, mustachePrefix, name, data.toString());
    }

    private async InsertObjectDataObject(sector: string, objects: any[], mustache: string, name: string, data: any): Promise<void> {
        const object: any = this.CreateObjectData(sector, name, '', mustache);
        objects.push(object);
        for (const property in data) {
            const propertyName: string = property;
            const propertyData: any = data[property];
            await this.InsertObjectData(sector, object.__objectdata, mustache, propertyName, propertyData);
        }
    }

    private async InsertObjectDataArray(sector: string, objects: any[], mustache: string, name: string, data: any[]): Promise<void> {
        const object: any = this.CreateObjectData(sector, name, '', mustache);
        objects.push(object);
        await this.InsertObjectDataString(sector, object.__objectdata, mustache + '.length', 'length', data.length.toString());
        for (let i: number = 0; i < data.length; i++)
            await this.InsertObjectData(sector, object.__objectdata, mustache, '[' + i + ']', data[i]);
    }

    private async InsertObjectDataString(sector: string, objects: any[], mustache: string, name: string, data: string): Promise<void> {
        objects.push(this.CreateObjectData(sector, name, data, mustache));
    }

    private CreateWatchValue(sector: string, mustache: string, value: string, index: number): any {
        const object: any = {};
        object.Sector = sector == null ? 'root' : sector;
        object.Mustache = mustache;
        object.Value = value;
        object.ActionRemove = 'RemoveDataItemLookup(__objectswatchs,_Index,' + index + ');ReloadData(__objectswatchsvalues)';
        return (object);
    }

    public async GetWatchsValues(): Promise<any[]> {
        const objects: any[] = [];
        const watchs: any[] = await this.Application.Storage.RetrieveData('__objectswatchs', null);
        for (let i: number = 0; i < watchs.length; i++) {
            const watch: any = watchs[i];
            const sector: string = watch.Sector;
            const mustache: string = watch.Mustache;
            const value: string = await this.Application.Storage.RetrieveDataValue(sector, '{{' + mustache + '}}');
            objects.push(this.CreateWatchValue(sector, mustache, value, i));
        }
        return (objects);
    }

    public async ExecuteFunctionDebugger(parameters: string[]): Promise<void> {
        const command: string = parameters[0].toLowerCase();
        if (command == 'highlight')
            await this.ExecuteFunctionDebuggerHighligh(parameters);
        else if (command == 'reload')
            await this.ExecuteFunctionDebuggerReload();
        else if (command == 'persist')
            await this.ExecuteFunctionDebuggerPersist();
    }

    private async ExecuteFunctionDebuggerHighligh(parameters: string[]): Promise<void> {
        const location: string = parameters[1].toLowerCase();
        if (location == 'sector')
            await this.ExecuteFunctionDebuggerHighlighSector(parameters);
        else if (location == 'component')
            await this.ExecuteFunctionDebuggerHighlighComponent(parameters);
    }

    private async ExecuteFunctionDebuggerHighlighSector(parameters: string[]): Promise<void> {
        const classHighlight: string = parameters[2];
        const sector: string = parameters[3];
        const elBeforeList = document.getElementsByClassName(classHighlight);
        const elBefore: HTMLElement = elBeforeList.length > 0 ? elBeforeList[0] as HTMLElement : null;
        const eljAfter: JQuery = ((sector != '') && (sector != 'null')) ? $('[d-sector="' + sector + '"]') : null;
        const elAfter: HTMLElement = ((eljAfter != null) && (eljAfter.length > 0)) ? eljAfter[0] : null;
        if (elBefore != null)
            $(elBefore).removeClass(classHighlight);
        if (elBefore != elAfter)
            $(elAfter).addClass(classHighlight);
    }

    private async ExecuteFunctionDebuggerHighlighComponent(parameters: string[]): Promise<void> {
        const classHighlight: string = parameters[2];
        const index: number = Number(parameters[3]);
        const elBeforeList = document.getElementsByClassName(classHighlight);
        const elBefore: HTMLElement = elBeforeList.length > 0 ? elBeforeList[0] as HTMLElement : null;
        const components: [string, string, HTMLElement, any][] = this.Application.ComponentHandler.Retrieve();
        const elAfter: HTMLElement = components[index][2];
        if (elBefore != null)
            $(elBefore).removeClass(classHighlight);
        if (elBefore != elAfter)
            $(elAfter).addClass(classHighlight);
    }

    public async GetComponents(): Promise<any[]> {
        const objectsExpanded: any[] = await this.Application.Storage.RetrieveData('__objectsexpanded', null);
        const objects: any[] = [];
        const components: [string, string, HTMLElement, any][] = this.Application.ComponentHandler.Retrieve();
        for (let i: number = 0; i < components.length; i++) {
            const component: [string, string, HTMLElement, any] = components[i];
            objects.push(this.CreateComponentData(component[1], i));
        }
        return (objects);
    }

    public async CreateRequest(url: string): Promise<any> {
        if (!this.Active)
            return (null);
        const request: any = {};
        request.Url = url;
        request.Start = new Date(Date.now()).toJSON();
        await this.Application.Storage.AddDataItem('__requests', null, '', request, false);
        return (request);
    }

    public async FinishRequest(request: any): Promise<void> {
        if (request == null)
            return (null);
        request.End = new Date(Date.now()).toJSON();
        const lastRequest: any = await this.Application.Storage.GetDataItemLast('__requests', '');
        request.Last = request === request;
        await this.Application.Observer.Notify('__requests', null, null);
    }

    private CreateComponentData(tag: string, index: number): any {
        const object: any = {};
        object.Tag = tag;
        object.Action = 'Debugger(highlight,component,dbgDebuggerHighlight, ' + index + ')';
        return (object);
    }

    public async AddSectorUpdate(name: string, parent : string, url: string): Promise<void> {
        if (!this.Active)
            return (null);
        const sectorUpdate: any = {};
        sectorUpdate.Name = name;
        sectorUpdate.Parent = parent;
        sectorUpdate.Url = url;
        await this.Application.Storage.AddDataItem('__sectorsupdate', null, '', sectorUpdate);
    }

    private async ExecuteFunctionDebuggerReload(): Promise<void> {
        if (!window.sessionStorage)
            return;
        const debuggerConfiguration: any[] = await this.Application.Storage.RetrieveData('__debuggerProperties', null);
        window.sessionStorage.setItem(this.SESSION_STORAGE_KEY, this.Application.Serializer.Serialize(debuggerConfiguration));
        window.location.reload();
    }

    private async ExecuteFunctionDebuggerPersist(): Promise<void> {
        if (!window.sessionStorage)
            return;
        const debuggerConfiguration: any = await this.Application.Storage.RetrieveData('__debuggerProperties', null);
        if (debuggerConfiguration == null)
            return;
        const persist: boolean = this.Application.Solver.ResolveConditionalBoolean(debuggerConfiguration.persist);
        if (persist)
            window.sessionStorage.setItem(this.SESSION_STORAGE_KEY, this.Application.Serializer.Serialize(debuggerConfiguration));
        else
            window.sessionStorage.removeItem(this.SESSION_STORAGE_KEY);
    }
}
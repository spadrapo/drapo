declare class DrapoDebugger {
    private _application;
    private _visible;
    private _active;
    private _sector;
    private SESSION_STORAGE_KEY;
    get Application(): DrapoApplication;
    get Visible(): any;
    get Active(): any;
    constructor(application: DrapoApplication);
    ConnectDebugger(): Promise<void>;
    Initialize(): Promise<void>;
    ToogleDebugger(): Promise<boolean>;
    ShowDebugger(): Promise<boolean>;
    CloseDebugger(): Promise<boolean>;
    HasBreakpoint(sector: string, dataKey: string): Promise<boolean>;
    ActivateBreakpoint(sector: string, dataKey: string, functionsValue: string, functionValue: string, label: string): Promise<void>;
    CleanRuntime(): Promise<void>;
    NotifySectors(): Promise<void>;
    NotifyStorage(dataKey: string): Promise<void>;
    NotifyComponents(): Promise<void>;
    AddNotify(dataKey: string): Promise<void>;
    AddPipe(pipe: string): Promise<void>;
    AddFunction(functionParsed: DrapoFunction): Promise<void>;
    AddError(error: string): Promise<void>;
    GetObjects(): Promise<any[]>;
    private CreateObject;
    private CreateObjectAction;
    private CreateObjectSector;
    private InsertObjectSectorChildrenSectors;
    private InsertObjectSectorChildrenData;
    private CreateObjectData;
    GetObjectData(): Promise<any[]>;
    private GetObjectDataItem;
    private InsertObjectData;
    private InsertObjectDataObject;
    private InsertObjectDataArray;
    private InsertObjectDataString;
    private CreateWatchValue;
    GetWatchsValues(): Promise<any[]>;
    ExecuteFunctionDebugger(parameters: string[]): Promise<void>;
    private ExecuteFunctionDebuggerHighligh;
    private ExecuteFunctionDebuggerHighlighSector;
    private ExecuteFunctionDebuggerHighlighComponent;
    GetComponents(): Promise<any[]>;
    CreateRequest(url: string): Promise<any>;
    FinishRequest(request: any): Promise<void>;
    private CreateComponentData;
    AddSectorUpdate(name: string, parent: string, url: string): Promise<void>;
    private ExecuteFunctionDebuggerReload;
    private ExecuteFunctionDebuggerPersist;
}

class DrapoExecutionContext<T>
{
    //Fields
    private _application: DrapoApplication = null;
    private _hasError: boolean = false;
    private _canReset: boolean = false;
    private _hasBreakpoint: boolean = false;
    private _sector: string = '';
    private _dataKey: string = '';
    private _data: T = null;
    private _sectorContainer: [string, string][] = [];
    private _windowsAutoClose: DrapoWindow[] = [];
    //Properties
    get HasError(): boolean {
        return (this._hasError);
    }
    set HasError(value: boolean) {
        this._hasError = value;
    }

    get CanReset(): boolean {
        return (this._canReset);
    }
    set CanReset(value: boolean) {
        this._canReset = value;
    }

    get HasBreakpoint(): boolean {
        return (this._hasBreakpoint);
    }
    set HasBreakpoint(value: boolean) {
        this._hasBreakpoint = value;
    }

    get Sector(): string {
        return (this._sector);
    }
    set Sector(value: string) {
        this._sector = value;
    }

    get DataKey(): string {
        return (this._dataKey);
    }
    set DataKey(value: string) {
        this._dataKey = value;
    }

    get Data(): T {
        return (this._data);
    }
    set Data(value: T) {
        this._data = value;
    }

    //Constructor
    constructor(application : DrapoApplication) {
        this._application = application;
    }

    public async Continue(): Promise<boolean>
    {
        return (!this._hasError);
    }

    public AddSectorContainer(sector: string, containerCode: string): void
    {
        for (let i: number = 0; i < this._sectorContainer.length; i++)
        {
            const tuple: [string, string] = this._sectorContainer[i];
            if (tuple[0] !== sector)
                continue;
            tuple[1] = containerCode;
            break;
        }
        this._sectorContainer.push([sector, containerCode]);
    }

    public HasSectorContainer(sector: string) : boolean
    {
        for (let i: number = 0; i < this._sectorContainer.length; i++) {
            const tuple: [string, string] = this._sectorContainer[i];
            if (tuple[0] === sector)
                return(true);
        }
        return (false);
    }

    public GetSectorContainer(sector: string): string
    {
        for (let i: number = 0; i < this._sectorContainer.length; i++) {
            const tuple: [string, string] = this._sectorContainer[i];
            if (tuple[0] === sector)
                return (tuple[1]);
        }
        return (null);
    }

    public AddWindowAutoClose(window : DrapoWindow): void  {
        this._windowsAutoClose.push(window);
    }

    public GetWindowsAutoClose() : DrapoWindow[]
    {
        return (this._windowsAutoClose);
    }
 }
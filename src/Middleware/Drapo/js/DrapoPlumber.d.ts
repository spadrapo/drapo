declare var signalR: any;
declare class DrapoPlumber {
    private _application;
    get Application(): DrapoApplication;
    constructor(application: DrapoApplication);
    private CanUsePipes;
    ConnectPipe(): Promise<boolean>;
    RequestPipeRegister(connection: any): Promise<void>;
    private WaitForRegister;
    NotifyPipe(message: DrapoPipeMessage): Promise<void>;
    NotifyPipeStorage(message: DrapoPipeMessage): Promise<void>;
    private NofityPipeRegister;
    private NofityPipeExecute;
}

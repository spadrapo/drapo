declare var signalR: any;
declare class DrapoPlumber {
    private _application;
    private _lock;
    private _messages;
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
    Lock(): boolean;
    Unlock(): Promise<boolean>;
    Clear(): void;
}

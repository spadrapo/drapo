declare var signalR: any;
declare class DrapoPlumber {
    private _application;
    private _connection;
    private _lock;
    private _messages;
    private _actionPolling;
    private _pollingMessages;
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
    SendPolling(pollingKey: string): Promise<string>;
    private GetMessagePolling;
    private WaitForMessagePollingHash;
    ReceivePollingPipe(message: DrapoPipePollingMessage): Promise<void>;
    Lock(): boolean;
    Unlock(): Promise<boolean>;
    Clear(): void;
}

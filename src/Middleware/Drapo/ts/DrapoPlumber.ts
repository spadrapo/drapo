declare var signalR: any;
class DrapoPlumber {
    //Field
    private _application: DrapoApplication;
    private _lock: boolean = false;
    private _messages: DrapoPipeMessage[] = [];

    //Properties
    get Application(): DrapoApplication {
        return (this._application);
    }

    //Constructors
    constructor(application: DrapoApplication) {
        this._application = application;
    }

    private async CanUsePipes(): Promise<boolean> {
        return (await this.Application.Config.GetUsePipes());
    }

    public async ConnectPipe(): Promise<boolean> {
        const usePipes = await this.CanUsePipes();
        if (!usePipes)
            return (false);
        const application: DrapoApplication = this.Application;
        const pipHubName = await this.Application.Config.GetPipeHubName();
        const urlRelative = '~/' + pipHubName;
        const urlAbsolute = this.Application.Server.ResolveUrl(urlRelative);
        const connection = new signalR.HubConnectionBuilder()
            .withUrl(urlAbsolute, {
                skipNegotiation: true,
                transport: signalR.HttpTransportType.WebSockets
            })
            .withAutomaticReconnect({
                nextRetryDelayInMilliseconds: (retryContext: { previousRetryCount : number; }) => {
                    if (retryContext.previousRetryCount < 10)
                        return (1000);
                    if (retryContext.previousRetryCount < 100)
                        return (10000);
                    return (60000);
                }
            })
            .build();
        await connection.start();
        const actionNotify = await this.Application.Config.GetPipeActionNotify();
        connection.on(actionNotify, (message: any) => {
            // tslint:disable-next-line:no-floating-promises
            application.Plumber.NotifyPipe(message);
        });
        connection.onreconnected(async (connectionId: string) => {
            await this.RequestPipeRegister(connection);
            const onReconnect = await this.Application.Config.GetOnReconnect();
            if ((onReconnect != null) && (onReconnect != ''))
                await this.Application.FunctionHandler.ResolveFunctionWithoutContext(null, null, onReconnect);
        });
        await this.RequestPipeRegister(connection);
        return (true);
    }

    public async RequestPipeRegister(connection : any): Promise<void>
    {
        const actionRegister = await this.Application.Config.GetPipeActionRegister();
        await connection.send(actionRegister);
        await this.WaitForRegister();
    }

    private async WaitForRegister(retry: number = 1000, interval: number = 50): Promise<string> {
        const pipeHeaderConnectionId: string = await this.Application.Config.GetPipeHeaderConnectionId();
        for (let i: number = 0; i < retry; i++) {
            const register: string = this.Application.Server.GetRequestHeader(pipeHeaderConnectionId);
            if (register != null)
                return (register);
            await this.Application.Document.Sleep(interval);
        }
        return (null);
    }

    public async NotifyPipe(message: DrapoPipeMessage): Promise<void> {
        try {
            if (this._lock) {
                this._messages.push(message);
                return;
            }
            if (message.Type == DrapoPipeMessageType.Storage)
                await this.NotifyPipeStorage(message);
            else if (message.Type == DrapoPipeMessageType.Register)
                await this.NofityPipeRegister(message);
            else if (message.Type == DrapoPipeMessageType.Execute)
                await this.NofityPipeExecute(message);
        } catch (e) {
            await this.Application.ExceptionHandler.Handle(e, 'DrapoPlumber - NotifyPipe');
        }
    }

    public async NotifyPipeStorage(message: DrapoPipeMessage): Promise<void> {
        const dataPipes: string[] = this.Application.Parser.ParsePipes(message.Data);
        if (dataPipes == null)
            return;
        await this.Application.Storage.AdquireLock();
        for (let i: number = 0; i < dataPipes.length; i++)
        {
            const dataPipe: string = dataPipes[i];
            //Debugger
            await this.Application.Debugger.AddPipe(dataPipe);
            //Reload Active Storage
            await this.Application.Storage.ReloadPipe(dataPipe);
            //Reload Containers
            this.Application.SectorContainerHandler.ReloadStorageItemByPipe(dataPipe);
        }
        this.Application.Storage.ReleaseLock();
    }

    private async NofityPipeRegister(message: DrapoPipeMessage) : Promise<void>
    {
        const pipeHeaderConnectionId: string = await this.Application.Config.GetPipeHeaderConnectionId();
        this.Application.Server.AddRequestHeader(pipeHeaderConnectionId, message.Data);
    }

    private async NofityPipeExecute(message: DrapoPipeMessage): Promise<void>
    {
        await this.Application.FunctionHandler.ResolveFunctionWithoutContext(null, null, message.Data);
    }

    public Lock(): boolean {
        if (this._lock)
            return (false);
        this._lock = true;
        return (true);
    }

    public async Unlock(): Promise<boolean> {
        if (!this._lock)
            return (false);
        this._lock = false;
        for (let i = this._messages.length - 1; i >= 0; i--) {
            const message: DrapoPipeMessage = this._messages[i];
            await this.NotifyPipe(message);
        }
        this._messages.length = 0;
        return (true);
    }

    public Clear(): void {
        this._messages.length = 0;
    }
}
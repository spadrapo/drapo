class DrapoWorker {
    //Field
    private _application: DrapoApplication;
    private _pollingItem: DrapoStorageItem = null;
    private _pollingTimeout: number = null;

    //Properties
    get Application(): DrapoApplication {
        return (this._application);
    }

    //Constructors
    constructor(application: DrapoApplication) {
        this._application = application;
    }

    public Check(): void {
        //Try find next storage 
        const item: DrapoStorageItem = this.Application.Storage.GetCachedDataItemByDatePolling();
        if (item == null) {
            this.Destroy(true);
            return;
        }
        if ((this._pollingItem != null) && (this._pollingItem === item))
            return;
        //Work
        this._pollingItem = item;    
        const application: DrapoApplication = this.Application;
        this._pollingTimeout = setTimeout(async () => {
            application.Worker.Destroy(false);
            await application.Worker.Work(item);
        }, item.PollingTimespan);

    }

    private Destroy(cleanItem: boolean): void {
        if (this._pollingTimeout !== null) {
            clearTimeout(this._pollingTimeout);
            this._pollingTimeout = null;
        }
        if (cleanItem)
            this._pollingItem = null;
    }

    private async Work(item: DrapoStorageItem): Promise<void> {
        if (!this.Application.Storage.ExistCachedDataItem(item)) {
            this.Check()
            return;
        }
        const pollingHash: string = await this.Application.Plumber.SendPolling(item.PollingKey);
        if (!this.Application.Storage.ExistCachedDataItem(item)) {
            this.Check()
            return;
        }
        if (item.PollingHash !== pollingHash) {
            item.PollingHash = pollingHash;
            await this.Application.Storage.ExecuteCachedDataItemPolling(item);
        }
        item.CheckpointPolling();
        this._pollingItem = null;
        this.Check();
    }
}
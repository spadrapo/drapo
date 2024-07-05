class DrapoSectorContainerObserverItem {
    private _dataForDataKey: string[] = [];
    private _dataForElement: HTMLElement[] = [];
    private _dataForSector: string[] = [];
    private _dataBarberDataKey: string[] = [];
    private _dataBarberElement: HTMLElement[] = [];
    private _dataBarberSector: string[] = [];
    private _dataBarberFields: string[][] = [];

    get DataForDataKey(): string[] {
        return (this._dataForDataKey);
    }

    get DataForElement(): HTMLElement[] {
        return (this._dataForElement);
    }

    get DataForSector(): string[] {
        return (this._dataForSector);
    }

    get DataBarberDataKey(): string[] {
        return (this._dataBarberDataKey);
    }

    get DataBarberElement(): HTMLElement[] {
        return (this._dataBarberElement);
    }

    get DataBarberSector(): string[] {
        return (this._dataBarberSector);
    }

    get DataBarberFields(): string[][] {
        return (this._dataBarberFields);
    }

    public AddFor(dataKey: string, el: HTMLElement, sector: string): void {
        this._dataForDataKey.push(dataKey);
        this._dataForElement.push(el);
        this._dataForSector.push(sector);
    }

    public AddBarber(dataKey: string, el: HTMLElement, sector: string, fields:string[]) {
        this._dataBarberDataKey.push(dataKey);
        this._dataBarberElement.push(el);
        this._dataBarberSector.push(sector);
        this._dataBarberFields.push(fields);
    }
}
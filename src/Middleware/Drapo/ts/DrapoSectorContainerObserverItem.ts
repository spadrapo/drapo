class DrapoSectorContainerObserverItem {
    private _dataForDataKey: string[] = [];
    private _dataForElement: HTMLElement[] = [];
    private _dataForSector: string[] = [];

    get DataForDataKey(): string[] {
        return (this._dataForDataKey);
    }

    get DataForElement(): HTMLElement[] {
        return (this._dataForElement);
    }

    get DataForSector(): string[] {
        return (this._dataForSector);
    }

    public AddFor(dataKey: string, el: HTMLElement, sector: string): void {
        this._dataForDataKey.push(dataKey);
        this._dataForElement.push(el);
        this._dataForSector.push(sector);
    }
}
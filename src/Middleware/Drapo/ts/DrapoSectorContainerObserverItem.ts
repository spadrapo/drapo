class DrapoSectorContainerObserverItem {
    private _dataForDataKey: string[] = [];
    private _dataForElement: HTMLElement[] = [];
    private _dataForSector: string[] = [];
    private _dataBarberDataKey: string[] = [];
    private _dataBarberElement: HTMLElement[] = [];
    private _dataBarberSector: string[] = [];
    private _dataBarberFields: string[][] = [];
    private _dataComponentKey: string[] = [];
    private _dataComponentField: string[][] = [];
    private _dataComponentElements: HTMLElement[] = [];
    private _dataComponentSector: string[] = [];
    private _dataComponentFunction: Function[] = [];
    private _dataComponentElementsFocus: HTMLElement[] = [];

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
    get DataComponentKey(): string[] {
        return (this._dataComponentKey);
    }

    get DataComponentField(): string[][] {
        return (this._dataComponentField);
    }

    get DataComponentElements(): HTMLElement[] {
        return (this._dataComponentElements);
    }

    get DataComponentSector(): string[] {
        return (this._dataComponentSector);
    }

    get DataComponentFunction(): Function[] {
        return (this._dataComponentFunction);
    }

    get DataComponentElementsFocus(): HTMLElement[] {
        return (this._dataComponentElementsFocus);
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

    public AddComponent(dataKey: string, el: HTMLElement, sector: string, fields: string[], componentFunction: Function, elFocus: HTMLElement) {
        this._dataComponentKey.push(dataKey);
        this._dataComponentElements.push(el);
        this._dataComponentSector.push(sector);
        this._dataComponentField.push(fields);
        this._dataComponentFunction.push(componentFunction);
        this._dataComponentElementsFocus.push(elFocus);
    }
}
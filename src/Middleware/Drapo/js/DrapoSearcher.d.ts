declare class DrapoSearcher {
    private _application;
    get Application(): DrapoApplication;
    constructor(application: DrapoApplication);
    FindDataKey(dataKey: string, sector: string): HTMLElement;
    HasDataKeyElement(dataKey: string): boolean;
    private Filter;
}

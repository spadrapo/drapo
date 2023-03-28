declare class DrapoSearcher {
    private _application;
    get Application(): DrapoApplication;
    constructor(application: DrapoApplication);
    FindDataKey(dataKey: string, sector: string): HTMLElement;
    HasDataKeyElement(dataKey: string): boolean;
    private Filter;
    FindByAttributeAndValue(name: string, value: string): HTMLElement;
    FindByAttributeAndValueFromParent(name: string, value: string, parent: HTMLElement): HTMLElement;
    FindByAttribute(name: string): HTMLElement[];
    FindByAttributeFromParent(name: string, el: HTMLElement): HTMLElement[];
}

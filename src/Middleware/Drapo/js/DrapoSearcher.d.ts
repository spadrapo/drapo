declare class DrapoSearcher {
    private _application;
    get Application(): DrapoApplication;
    constructor(application: DrapoApplication);
    FindDataKey(dataKey: string, sector: string): HTMLElement;
    HasDataKeyElement(dataKey: string): boolean;
    private Filter;
    private CreateElementsList;
    FindByAttributeAndValue(name: string, value: string): HTMLElement;
    FindAllByAttributeAndValue(name: string, value: string): HTMLElement[];
    FindByAttributeAndValueFromParent(name: string, value: string, parent: HTMLElement): HTMLElement;
    FindAllByAttribute(name: string): HTMLElement[];
    FindAllByAttributeFromParent(name: string, parent: HTMLElement): HTMLElement[];
    FindByTagName(tagName: string): HTMLElement;
}

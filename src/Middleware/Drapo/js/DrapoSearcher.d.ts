declare class DrapoSearcher {
    private _application;
    get Application(): DrapoApplication;
    constructor(application: DrapoApplication);
    FindType(type: string): HTMLElement;
    FindAllTypeWithAttribute(type: string, attributeName: string, parent?: HTMLElement): HTMLElement[];
    FindAllTypeWithAttributeValue(type: string, attributeName: string, attributeValue: string, parent?: HTMLElement): HTMLElement[];
    FindTypeWithAttribute(type: string, attributeName: string, parent?: HTMLElement): HTMLElement;
    FindTypeWithAttributeValue(type: string, attributeName: string, attributeValue: string): HTMLElement;
    FindAttributeValue(attributeName: string, attributeValue: string): HTMLElement;
}

class DrapoSearcher {
    //Field
    private _application: DrapoApplication;

    //Properties
    get Application(): DrapoApplication {
        return (this._application);
    }

    //Constructors
    constructor(application: DrapoApplication) {
        this._application = application;
    }

    public FindDataKey(dataKey: string, sector: string): HTMLElement {
        const els: HTMLElement[] = this.FindAllByAttributeAndValue('d-datakey', dataKey);
        const el: HTMLElement = this.Filter(sector, els);
        return (el);
    }

    public HasDataKeyElement(dataKey: string): boolean {
        const el: HTMLElement = this.FindByAttributeAndValue('d-datakey', dataKey);
        return (el != null);
    }

    private Filter(sector: string, els: HTMLElement[]): HTMLElement {
        const sectors: string[] = this.Application.Document.GetSectorsAllowed(sector);
        for (let i: number = 0; i < els.length; i++) {
            const el: HTMLElement = els[i];
            const elSector: string = this.Application.Document.GetSector(el);
            if (elSector !== sector) {
                //Check Data Access
                const elAccess: string = el.getAttribute('d-dataAccess');
                if (elAccess == 'private')
                    continue;
                const elType: string = el.getAttribute('d-dataType');
                if ((elAccess == null) && (elType === 'parent'))
                    continue;
            }
            if ((this.Application.Document.IsSectorAllowed(elSector, sectors)) && (!this.Application.Document.IsElementDetached(el)))
                return (el);
        }
        return (null);
    }

    private CreateElementsList(nodes: NodeListOf<Element>): HTMLElement[] {
        const els: HTMLElement[] = [];
        for (let i: number = 0; i < nodes.length; i++)
            els.push(nodes[i] as HTMLElement);
        return (els);
    }

    public FindByAttributeAndValue(name: string, value: string): HTMLElement {
        const el: HTMLElement = document.querySelector("[" + name + "='" + value + "']");
        return (el);
    }

    public FindAllByAttributeAndValue(name: string, value: string): HTMLElement[] {
        const nodes: NodeListOf<Element> = document.querySelectorAll("[" + name + "='" + value + "']");
        return (this.CreateElementsList(nodes));
    }

    public FindByAttributeAndValueFromParent(name: string, value: string, parent: HTMLElement): HTMLElement {
        const el: HTMLElement = parent.querySelector("[" + name + "='" + value + "']");
        return (el);
    }

    public FindAllByAttribute(name: string): HTMLElement[] {
        const nodes: NodeListOf<Element> = document.querySelectorAll("[" + name + "]");
        return (this.CreateElementsList(nodes));
    }

    public FindAllByAttributeFromParent(name: string, parent: HTMLElement): HTMLElement[] {
        const nodes: NodeListOf<Element> = parent.querySelectorAll("[" + name + "]");
        return (this.CreateElementsList(nodes));
    }

    public FindByTagName(tagName: string): HTMLElement {
        const el: HTMLElement = document.querySelector(tagName);
        return (el);
    }
}
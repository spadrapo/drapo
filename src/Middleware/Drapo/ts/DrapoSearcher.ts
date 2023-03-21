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
        const jqueryDataKeys: JQuery = $("[d-dataKey='" + dataKey + "']");
        const el: HTMLElement = this.Filter(sector, jqueryDataKeys);
        return (el);
    }

    public HasDataKeyElement(dataKey: string): boolean {
        const jqueryDataKeys: JQuery = $("[d-dataKey='" + dataKey + "']");
        return ((jqueryDataKeys != null) && (jqueryDataKeys.length > 0));
    }

    private Filter(sector: string, jqueryDataKeys: JQuery): HTMLElement {
        const sectors: string[] = this.Application.Document.GetSectorsAllowed(sector);
        for (let i: number = 0; i < jqueryDataKeys.length; i++) {
            const el: HTMLElement = jqueryDataKeys[i];
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

    public FindByAttributeAndValue(name: string, value: string): HTMLElement {
        const elementsJQuery: JQuery = $("[" + name + "='" + value + "']");
        if ((elementsJQuery === null) || (elementsJQuery.windowContainer === 0))
            return (null);
        return (elementsJQuery[0]);
    }

    public FindByAttributeAndValueFromParent(name: string, value: string, parent: HTMLElement): HTMLElement {
        const elementsJQuery: JQuery = $(parent).find("[" + name + "='" + value + "']");
        if ((elementsJQuery === null) || (elementsJQuery.windowContainer === 0))
            return (null);
        return (elementsJQuery[0]);
    }
}
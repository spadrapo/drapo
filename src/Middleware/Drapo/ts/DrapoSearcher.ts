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

    public FindType(type: string): HTMLElement {
        const first: JQuery = $(type).first();
        if ((first == null) || (first.length === 0))
            return (null);
        return (first[0]);
    }

    public FindAllTypeWithAttribute(type: string, attributeName: string, parent: HTMLElement = null): HTMLElement[] {
        const elj: JQuery = parent == null ? $(type + '[' + attributeName + ']') : $(parent).find(type + '[' + attributeName + ']');
        const els: HTMLElement[] = [];
        for (let i: number = 0; i < elj.length; i++)
            els.push(elj[i]);
        return (els);
    }

    public FindAllTypeWithAttributeValue(type: string, attributeName: string, attributeValue: string, parent: HTMLElement = null): HTMLElement[] {
        const elj: JQuery = parent == null ? $(type + "[" + attributeName + "='" + attributeValue + "']") : $(parent).find(type + "[" + attributeName + "='" + attributeValue + "']");
        const els: HTMLElement[] = [];
        for (let i: number = 0; i < elj.length; i++)
            els.push(elj[i]);
        return (els);
    }

    public FindTypeWithAttribute(type: string, attributeName: string, parent: HTMLElement = null): HTMLElement {
        const elj: JQuery = parent == null ? $(type + '[' + attributeName + ']') : $(parent).find(type + '[' + attributeName + ']');
        if ((elj == null) || (elj.length === 0))
            return (null);
        return (elj[0]);
    }

    public FindTypeWithAttributeValue(type: string, attributeName: string, attributeValue: string): HTMLElement {
        const elj: JQuery = $(type + "[" + attributeName + "='" + attributeValue + "']")
        if ((elj == null) || (elj.length === 0))
            return (null);
        return (elj[0]);
    }

    public FindAttributeValue(attributeName: string, attributeValue: string): HTMLElement {
        const elj: JQuery = $("[" + attributeName + "='" + attributeValue + "']")
        if ((elj == null) || (elj.length === 0))
            return (null);
        return (elj[0]);
    }
}
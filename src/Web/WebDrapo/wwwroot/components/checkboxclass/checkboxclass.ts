async function checkboxclassConstructor(el: HTMLElement, app: any): Promise<any> {
    //Initialize
    const checkbox: CheckboxClass = new CheckboxClass(el, app);
    await checkbox.Initalize();
    return (checkbox);
}

class CheckboxClass {
    //Field
    private _el: HTMLElement = null;
    private _app: any;
    private _sector: string = null;
    private _notify: boolean = true;
    //Properties
    //Constructors
    constructor(el: HTMLElement, app: any) {
        this._el = el;
        this._app = app;
    }

    public async Initalize(): Promise<void> {
        this._sector = this._app.Document.GetSector(this._el);
        this._notify = (this._el.getAttribute("dc-notify") === "true");
        const checkboxValue = this._el.getAttribute('dc-value');
        this._el.removeAttribute('dc-value');
        const checkboxLabel = this._el.getAttribute('dc-label');
        this._el.removeAttribute('dc-label');
        const functionClick = this._el.getAttribute('dc-onclick');
        this._el.removeAttribute('dc-onclick');
        const onClick: string = "ToggleItemField(" + checkboxValue + "," + this._notify + ")";
        let onClicking: string = "";

        if (functionClick.length > 0)
            onClicking = onClick + ";Execute(" + functionClick + ")";
        if (onClicking == "")
            onClicking = onClick;

        //Input
        const elCheckbox: any = this._el.children[1].children[0].children[0];
        elCheckbox.setAttribute('d-model', checkboxValue);
        //Label
        const elLabel: any = this._el.children[1].children[0].children[1];
        elLabel.setAttribute('d-model', checkboxLabel);
        elLabel.setAttribute('d-on-click', onClicking);
    }
}
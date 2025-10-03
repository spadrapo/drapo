async function checkboxConstructor(el: HTMLElement, app: any): Promise<any> {
    //Initialize
    let checkbox: Checkbox = new Checkbox(el, app);
    await checkbox.Initalize();
    return (checkbox);
}

class Checkbox {
    //Field
    private _el: HTMLElement = null;
    private _app: any;
    //Properties
    //Constructors
    constructor(el: HTMLElement, app: any) {
        this._el = el;
        this._app = app;
    }

    public async Initalize(): Promise<void> {
        let checkboxValue = this._el.getAttribute('dc-value');
        this._el.removeAttribute('dc-value');
        let checkboxLabel = this._el.getAttribute('dc-label');
        this._el.removeAttribute('dc-label');
        let functionClick = this._el.getAttribute('dc-onclick');
        this._el.removeAttribute('dc-onclick');
        let onClick: string = "ToggleItemField(" + checkboxValue + ")";
        let onClicking: string = "";

        if (functionClick.length > 0)
            onClicking = onClick + ";Execute(" + functionClick + ")";
        if (onClicking == "")
            onClicking = onClick;

        //Input
        let elCheckbox: any = this._el.children[0].children[0].children[0];
        elCheckbox.setAttribute('d-model', checkboxValue);
        //Label
        let elLabel: any = this._el.children[0].children[0].children[1];
        elLabel.setAttribute('d-model', checkboxLabel);
        elLabel.setAttribute('d-on-click', onClicking);
    }
}
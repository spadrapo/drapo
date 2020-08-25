async function codeConstructor(el: HTMLElement, app: any): Promise<Code> {
    //Initialize
    let instance: Code = new Code(el, app);
    await instance.Initalize();
    return (instance);
}

class Code {
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
        const elContent: HTMLDivElement = this.GetElementContent();
        const elCode: HTMLPreElement = this.GetElementCode();
        const content: string = $(elContent).html();
        const contentEncoded: string = $('<textarea/>').text(content).html();
        $(elContent).remove();
        $(elCode).html(contentEncoded);
    }

    private GetElementContent(): HTMLDivElement {
        return (<HTMLDivElement>this._el.children[0]);
    }

    private GetElementCode(): HTMLPreElement {
        return (<HTMLPreElement>this._el.children[1]);
    }
}


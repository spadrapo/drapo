async function multitabConstructor(el: HTMLElement, app: DrapoApplication): Promise<any> {
    let multitab: MultiTab = new MultiTab(el, app);
    await multitab.Initialize();
    return multitab;
}

class MultiTab {
    private _el: HTMLElement = null;
    private _app: DrapoApplication;
    private _selectedTabIndex: number = null;

    constructor(el: HTMLElement, app: DrapoApplication) {
        this._el = el;
        this._app = app;
    }

    get Application(): DrapoApplication {
        return (this._app);
    }

    public async Initialize(): Promise<any> {
        this._selectedTabIndex = Number.parseInt(this._el.getAttribute('dc-selectedTabIndex'));
        await this.Fill();
    }

    private GetInternalElementContent(): HTMLDivElement {
        return <HTMLDivElement>this._el.children[0].children[1];
    }

    private GetElementContainerTabs(): HTMLDivElement {
        return <HTMLDivElement>this._el.children[1];
    }

    private GetElementContentTab(): HTMLDivElement {
        return <HTMLDivElement>this._el.children[2];
    }

    private async Fill(): Promise<void> {
        let multitab: MultiTab = this;
        const elInternal: HTMLDivElement = this.GetInternalElementContent();
        const elContainerTabs: HTMLDivElement = this.GetElementContainerTabs();
        elContainerTabs.addEventListener('mouseup', async (evt) => { return await multitab.HandleTabMouseUp(evt); }, false);

        let fragment: DocumentFragment = document.createDocumentFragment();
        for (var i = 0; i < elInternal.children.length; i++) {
            let elTab: HTMLElement = <HTMLElement>elInternal.children[i];
            const model: string = elTab.getAttribute("label");
            const icon: string = elTab.getAttribute("icon");
            const url: string = elTab.getAttribute("url");

            let div: HTMLDivElement = document.createElement("div");
            div.setAttribute("url", url);
            if (i === this._selectedTabIndex) {
                this.SetSelected(div);
                await this.LoadContent(div);
            }
            else {
                this.SetDefault(div);
            }

            let spanIcon: HTMLSpanElement = document.createElement("span");
            spanIcon.setAttribute("class", icon);
            div.appendChild(spanIcon);

            let spanLabel: HTMLSpanElement = document.createElement("span");
            if (i === this._selectedTabIndex)
                spanLabel.setAttribute("class", "suTabSectorTitle suTabSectorSelected");
            else
                spanLabel.setAttribute("class", "suTabSectorTitle");
            if (model)
                spanLabel.setAttribute("d-model", model);

            div.appendChild(spanLabel)
            fragment.appendChild(div);
        }
        elContainerTabs.appendChild(fragment);
    }

    private async HandleTabMouseUp(evt: MouseEvent): Promise<void> {
        const target: HTMLSpanElement = <HTMLSpanElement>evt.target;
        await this.LoadContent(<HTMLDivElement>target.parentElement);

        let divs: HTMLCollection = target.parentElement.parentElement.children;
        for (var i = 0; i < divs.length; i++) {
            let div: HTMLDivElement = <HTMLDivElement>divs[i];
            let spanLabel: HTMLSpanElement = <HTMLSpanElement>divs[i].children[1];
            div.removeAttribute("class");
            spanLabel.removeAttribute("class");
            if (div == target.parentElement) {
                this.SetSelected(div);
                this.SetTabSelected(spanLabel);
            }
            else {
                this.SetDefault(div);
                this.SetTabDefault(spanLabel);
            }
        }
    }

    private async LoadContent(target: HTMLDivElement): Promise<void> {
        const url: string = target.getAttribute("url");
        const html: string = await this.Application.Server.GetViewHTML(url);
        const content: string = this.Application.Parser.ParseDocumentContent(html);
        let div: HTMLDivElement = this.GetElementContentTab();
        div.innerHTML = content;
        this.Application.Document.ResolveComponentUpdate(div, null);
    }

    private SetDefault(div: HTMLDivElement) {
        div.setAttribute("class", "suMultitabTab");
    }

    private SetSelected(div: HTMLDivElement) {
        div.setAttribute("class", "suMultitabTab suMultitabTabActive");
    }

    private SetTabDefault(spanLabel: HTMLSpanElement) {
        spanLabel.setAttribute("class", "suTabSectorTitle");
    }

    private SetTabSelected(spanLabel: HTMLSpanElement) {
        spanLabel.setAttribute("class", "suTabSectorTitle suTabSectorSelected");
    }
}
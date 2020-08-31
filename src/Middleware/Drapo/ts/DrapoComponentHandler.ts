class DrapoComponentHandler {
    //Field
    private _application: DrapoApplication;
    private _dataSectors: string[] = [];
    private _dataTags: string[][] = [];
    private _dataElements: HTMLElement[][] = [];
    private _dataInstances: any[][] = [];

    //Properties
    get Application(): DrapoApplication {
        return (this._application);
    }

    //Constructors
    constructor(application: DrapoApplication) {
        this._application = application;
    }

    public async ResolveComponents(jQueryStart: JQuery = null): Promise<void> {
        if (jQueryStart == null)
            jQueryStart = $(document.documentElement);
        for (let i = 0; i < jQueryStart.length; i++)
            await this.ResolveComponentsElement(jQueryStart[i], null, true, true);
    }

    public async ResolveComponentsElement(el: HTMLElement, context: DrapoContext, checkSectorReady: boolean, handleDynamicSectors: boolean): Promise<void> {
        if (handleDynamicSectors)
            await this.Application.Document.ResolveComponentDynamicSector(el);
        if (checkSectorReady) {
            const sector: string = this.Application.Document.GetSector(el);
            if (sector === '@')
                return;
        }
        //We dont want to evaluate the template of control flow
        if (this.Application.ControlFlow.IsElementControlFlowTemplate(el))
            return;
        const tagName: string = el.tagName.toLowerCase();
        const children: Array<HTMLElement> = [].slice.call(el.children);
        const hasChildren: boolean = children.length > 0;
        if (this.IsComponent(tagName)) {
            //Context
            const isContext: boolean = context != null;
            const isInsideContext: boolean = this.Application.Document.IsElementInsideControlFlow(el);
            if (isContext !== isInsideContext)
                return;
            await this.ResolveComponentElement(el, tagName, context, checkSectorReady, handleDynamicSectors);
        } else if (hasChildren) {
            for (let i = 0; i < children.length; i++) {
                const child: HTMLElement = children[i];
                await this.ResolveComponentsElement(child, context, checkSectorReady, handleDynamicSectors);
            }
        } else {
            const contentUrl: string = el.getAttribute('d-contenturl');
            if (contentUrl != null)
                await this.ResolveContentElement(el, context, contentUrl, checkSectorReady, handleDynamicSectors);
        }
    }

    private async ResolveComponentElement(el: HTMLElement, tagName: string, context: DrapoContext, checkSectorReady: boolean, handleDynamicSectors: boolean): Promise<void> {
        //Registered
        if (!await this.Application.Register.IsRegisteredComponent(tagName)) {
            await this.Application.ExceptionHandler.HandleError('There is no component: {0}', tagName);
            return;
        }
        //Activate
        if (!this.Application.Register.IsActiveComponent(tagName))
            await this.Application.Register.ActivateComponent(tagName);
        //Content
        const html: string = await this.Application.Register.GetRegisteredComponentViewContent(tagName);
        if (html == null) {
            await this.Application.ExceptionHandler.HandleError('There is no html for the component: {0}', tagName);
            return;
        }
        //New Element
        const eljNew: JQuery = $(html);
        //Extract Attributes
        const attributes: [string, string][] = this.Application.Document.GetElementAttributes(el);
        //Extract Content
        const content: string = $(el).html();
        //Sector
        const sector: string = this.GetSectorContext(el, context);
        //Replace
        this.Application.Document.ReplaceElement(el, eljNew);
        //Deploy Attributes
        this.Application.Document.SetElementAttributes(eljNew, attributes);
        const elNew: HTMLElement = eljNew[0];
        //Deploy Content
        const elContent: HTMLElement = ((content != null) && (content != '')) ? this.GetElementContent(elNew) : null;
        if (elContent !== null)
            $(elContent).html(content);
        //Sector Component
        let isSectorContext: boolean = false;
        let elSector: string = elNew.getAttribute('d-sector');
        if (elSector === "@") {
            elSector = this.CreateGuidContext(elNew, context);
            elNew.setAttribute('d-sector', elSector);
            await this.Application.Document.AddSectorHierarchy(elSector, sector);
            //Sector Friend
            this.Application.Document.AddSectorFriends(sector, elNew.getAttribute('d-sector-friend'));
        } else if (elSector == null) {
            isSectorContext = ((context != null) && (context.Sector != null));
            if (isSectorContext)
                elNew.setAttribute('d-sector', context.Sector);
        }
        //Instance
        try {
            const instance: any = await this.Application.Register.CreateInstanceComponent(tagName, elNew);
            if (instance != null)
                this.SubscribeComponentInstance(sector, tagName, elNew, instance);
        } catch (e) {
            await this.Application.ExceptionHandler.HandleError('There is an error in component: {0} contructor. {1}', tagName, e.toString());
        }
        //Resolve Sector
        await this.Application.Document.ResolveComponentUpdate(elNew, context);
        if (isSectorContext)
            elNew.removeAttribute('d-sector');
        //Debugger
        await this.Application.Debugger.NotifyComponents();
    }

    private GetSectorContext(el: HTMLElement, context: DrapoContext) : string
    {
        if ((context != null) && (context.Item != null) && (context.Item.ElementOld != null))
            return (this.Application.Document.GetSector(context.Item.ElementOld));
        if ((context != null) && (context.Sector != null))
            return(context.Sector);
        return (this.Application.Document.GetSector(el));
    }

    private CreateGuidContext(el: HTMLElement, context: DrapoContext): string {
        const guid: string = this.CreateGuidContextHierarchy(el, context);
        if (guid !== null)
            return (guid);
        return (this.Application.Document.CreateGuid());
    }

    private CreateGuidContextHierarchy(el: HTMLElement, context: DrapoContext): string {
        if ((context === null) || (context.Item === null) || (context.Item.ElementOld === null))
            return (null);
        const hierarchy: number[] = this.CreateElementHierarchy(el);
        if (hierarchy.length === 0)
            return (null);
        const elHierarchy: HTMLElement = this.GetElementByHierarchy(context.Item.ElementOld, hierarchy);
        if (elHierarchy === null)
            return (null);
        const sector: string = elHierarchy.getAttribute('d-sector');
        if (sector == "@")
            return (null);
        return (sector);
    }

    private CreateElementHierarchy(el: HTMLElement): number[] {
        const hierarchy: number[] = [];
        this.InsertElementHierarchy(hierarchy, el);
        hierarchy.reverse();
        return (hierarchy);
    }

    private InsertElementHierarchy(hierarchy: number[], el: HTMLElement): void {
        if (el == null)
            return;
        const elParent: HTMLElement = el.parentElement;
        if (elParent == null)
            return;
        const index: number = this.GetElementIndex(elParent, el);
        if (index == null)
            return;
        hierarchy.push(index);
        this.InsertElementHierarchy(hierarchy, elParent);
    }

    private GetElementIndex(elParent: HTMLElement, el: HTMLElement): number {
        for (let i: number = 0; i < elParent.children.length; i++)
            if (elParent.children[i] === el)
                return (i);
        return (null);
    }

    private GetElementByHierarchy(el: HTMLElement, hierarchy: number[]): HTMLElement {
        let elCurrent: HTMLElement = el;
        for (let i: number = 0; i < hierarchy.length; i++) {
            if (elCurrent == null)
                return (null);
            const index: number = hierarchy[i];
            if (elCurrent.children.length <= index)
                return (null);
            elCurrent = elCurrent.children[index] as HTMLElement;
        }
        return (elCurrent);
    }

    private GetElementContent(el: HTMLElement): HTMLElement {
        const elContent: string = el.getAttribute('d-content');
        if (elContent === 'internal')
            return (el);
        const children: Array<HTMLElement> = [].slice.call(el.children);
        for (let i: number = 0; i < children.length; i++) {
            const elContentChild: HTMLElement = this.GetElementContent(children[i]);
            if (elContentChild !== null)
                return (elContentChild);
        }
        return (null);
    }

    private async ResolveContentElement(el: HTMLElement, context: DrapoContext, contentUrl: string, checkSectorReady: boolean, handleDynamicSectors: boolean): Promise<void> {
        const html: string = await this.Application.Server.GetHTML(contentUrl);
        if (html == null) {
            await this.Application.ExceptionHandler.HandleError('There is an error getting html for the contenturl: {0}', contentUrl);
            return;
        }
        //Content
        const content: string = this.Application.Parser.ParseDocumentContent(html);
        const eljNew: JQuery = $(content);
        if (eljNew.length === 0) {
            await this.Application.ExceptionHandler.HandleError('There is no html container for the contenturl: {0}', contentUrl);
            return;
        }
        //Swap Content
        el.innerHTML = eljNew[0].innerHTML;
        //Resolve Component Children
        await this.Application.Document.ResolveComponentUpdate(el, context);
    }

    public IsComponent(tagName: string): boolean {
        return (this.IsStartsWith(tagName, "d-"));
    }

    private IsStartsWith(text: string, value: string): boolean {
        const length: number = value.length;
        if (text.length < length)
            return (false);
        return (text.substr(0, length) === value);
    }

    private SubscribeComponentInstance(sector: string, tag: string, el: HTMLElement, instance: any): boolean {
        let index: number = this.GetComponentInstanceIndex(sector);
        if (index == null)
            index = this.CreateComponentInstanceIndex(sector);
        const tags: string[] = this._dataTags[index];
        tags.push(tag);
        const elements: HTMLElement[] = this._dataElements[index];
        elements.push(el);
        const instances: any[] = this._dataInstances[index];
        instances.push(instance);
        return (true);
    }

    private GetComponentInstanceIndex(sector: string): number {
        for (let i = 0; i < this._dataSectors.length; i++)
            if (this._dataSectors[i] == sector)
                return (i);
        return (null);
    }

    private CreateComponentInstanceIndex(sector: string): number {
        const index: number = this._dataSectors.push(sector);
        this._dataTags.push([]);
        this._dataElements.push([]);
        this._dataInstances.push([]);
        return (index - 1);
    }

    public GetComponentInstance(sector: string, did: string = null): any {
        if (did === null)
            return (this.GetComponentInstanceByElementSector(sector));
        const sectors: string[] = this.Application.Document.GetSectorsAllowed(sector);
        if (sectors == null)
            return (this.GetComponentInstanceInternal(sector, did));
        for (let i: number = 0; i < sectors.length; i++) {
            const sectorCurrent: string = sectors[i];
            const instance = this.GetComponentInstanceInternal(sectorCurrent, did);
            if (instance != null)
                return (instance);
        }
        return (null);
    }

    private GetComponentInstanceByElementSector(sector: string): any
    {
        for (let i: number = 0; i < this._dataElements.length; i++) {
            const dataElements: HTMLElement[] = this._dataElements[i];
            for (let j: number = 0; j < dataElements.length; j++) {
                const el: HTMLElement = dataElements[j];
                const elSector: string = el.getAttribute('d-sector');
                if (elSector === sector)
                    return (this._dataInstances[i][j]);
            }
        }
        return (null);
    }

    private GetComponentInstanceInternal(sector: string, did: string): any {
        const index: number = this.GetComponentInstanceIndex(sector);
        if (index === null)
            return (null);
        const elements: HTMLElement[] = this._dataElements[index];
        const instances: any[] = this._dataInstances[index];
        for (let j: number = elements.length - 1; j >= 0; j--) {
            const element: HTMLElement = elements[j];
            if (element.parentElement == null)
                continue;
            const elementDid: string = element.getAttribute('d-id');
            if (did !== elementDid)
                continue;
            return (instances[j]);
        }
        return (null);
    }

    public UnloadComponentInstances(sector: string): boolean {
        const index: number = this.GetComponentInstanceIndex(sector);
        if (index === null)
            return (false);
        this._dataSectors.splice(index, 1);
        this._dataTags.splice(index, 1);
        this._dataElements.splice(index, 1);
        this._dataInstances.splice(index, 1);
        return (true);
    }

    public async UnloadComponentInstancesDetached(sector: string): Promise<boolean> {
        const index: number = this.GetComponentInstanceIndex(sector);
        if (index === null)
            return (false);
        let updated: boolean = false;
        const dataTags: string[] = this._dataTags[index];
        const dataElements: HTMLElement[] = this._dataElements[index];
        const dataInstances: any[] = this._dataInstances[index];
        for (let i: number = dataElements.length - 1; i >= 0; i--) {
            const dataElement: HTMLElement = dataElements[i];
            if (this.Application.Document.IsElementAlive(dataElement))
                continue;
            dataTags.splice(i, 1);
            dataElements.splice(i, 1);
            dataInstances.splice(i, 1);
            updated = true;
        }
        //Debugger
        if (updated)
            await this.Application.Debugger.NotifyComponents();
        return (true);
    }

    public async UnloadComponentInstancesDetachedFullCheck(): Promise<boolean> {
        let updated: boolean = false;
        for (let index = this._dataSectors.length - 1; index >= 0; index--) {
            const dataTags: string[] = this._dataTags[index];
            const dataElements: HTMLElement[] = this._dataElements[index];
            const dataInstances: any[] = this._dataInstances[index];
            for (let i: number = dataElements.length - 1; i >= 0; i--) {
                const dataElement: HTMLElement = dataElements[i];
                if (this.Application.Document.IsElementAlive(dataElement))
                    continue;
                dataTags.splice(i, 1);
                dataElements.splice(i, 1);
                dataInstances.splice(i, 1);
                updated = true;
            }
            if (dataTags.length === 0) {
                this._dataSectors.splice(index, 1);
                this._dataTags.splice(index, 1);
                this._dataElements.splice(index, 1);
                this._dataInstances.splice(index, 1);
                updated = true;
            }
        }
        //Debugger
        if (updated)
            await this.Application.Debugger.NotifyComponents();
        return (true);
    }

    public HasContentComponent(content: string): boolean {
        return ((content.indexOf('<d-') > -1));
    }

    public async ResolveComponentContext(sector: string, context: DrapoContext, el: HTMLElement, renderContext: DrapoRenderContext, canResolveComponents: boolean): Promise<void> {
        const tagName: string = el.tagName.toLowerCase();
        if (!this.IsComponent(tagName))
            return;
        const elAttributes: [string, string][] = this.Application.Document.GetElementAttributes(el);
        for (let i: number = 0; i < elAttributes.length; i++) {
            const elAttribute: [string, string] = elAttributes[i];
            let elAttributeValue: string = elAttribute[1];
            let updated: boolean = false;
            const mustaches: string[] = this.Application.Parser.ParseMustaches(elAttributeValue);
            for (let j: number = 0; j < mustaches.length; j++) {
                const mustache: string = mustaches[j];
                const mustacheParts: string[] = this.Application.Parser.ParseMustache(mustache);
                const mustacheContext: string = this.Application.Solver.CreateMustacheContext(context, mustacheParts);
                if ((mustacheContext === null) || (mustacheContext === mustache))
                    continue;
                updated = true;
                elAttributeValue = elAttributeValue.replace(mustache, mustacheContext);
            }
            if (updated)
                el.setAttribute(elAttribute[0], elAttributeValue);
        }
        if ((canResolveComponents) && (((context != null) && (context.HasContextItemBefore)) || (this.Application.Document.IsElementAlive(el))))
            await this.Application.Document.ResolveComponentUpdate(el, context);
    }

    public Retrieve(): [string, string, HTMLElement, any][] {
        const list: [string, string, HTMLElement, any][] = [];
        for (let i: number = 0; i < this._dataSectors.length; i++) {
            const sector: string = this._dataSectors[i];
            const tags: string[] = this._dataTags[i];
            const elements: HTMLElement[] = this._dataElements[i];
            const instances: any[] = this._dataInstances[i];
            for (let j: number = 0; j < tags.length; j++)
                list.push([sector, tags[j], elements[j], instances[j]]);
        }
        return (list);
    }

    public AppendInstances(sector :string, componentSectors: string[], componentTags: string[][], componentElements: HTMLElement[][], componentInstances: any[][]): void {
        const index: number = this.GetComponentInstanceIndex(sector);
        if (index === null)
            return;
        componentSectors.push(sector);
        componentTags.push(this.Application.Solver.CloneArrayString(this._dataTags[index]));
        componentElements.push(this.Application.Solver.CloneArrayElement(this._dataElements[index]));
        componentInstances.push(this.Application.Solver.CloneArrayAny(this._dataInstances[index]));
    }

    public async AddInstances(container: DrapoSectorContainerItem): Promise<void> {
        this._dataSectors.push.apply(this._dataSectors, container.ComponentSectors);
        this._dataTags.push.apply(this._dataTags, container.ComponentTags);
        this._dataElements.push.apply(this._dataElements, container.ComponentElements);
        this._dataInstances.push.apply(this._dataInstances, container.ComponentInstances);
        await this.Application.Debugger.NotifyComponents();
    }
}
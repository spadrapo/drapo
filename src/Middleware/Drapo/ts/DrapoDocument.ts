/// <reference path="../typings/index.d.ts" />

class DrapoDocument {
    //Field
    private _application: DrapoApplication;
    private _pendingAuthorizations: number = 0;
    private _sectorsLoaded: string[] = [];
    private _message: DrapoMessage = null;
    private _sectorHierarchy: [string, string][] = [];
    private _sectorFriends: [string, string[]][] = [];
    private _lastGuid: string = null;

    //Properties
    get Application(): DrapoApplication {
        return (this._application);
    }

    get Message(): DrapoMessage {
        return (this._message);
    }
    set Message(value: DrapoMessage) {
        this._message = value;
    }

    //Constructors
    constructor(application: DrapoApplication) {
        this._application = application;
    }

    public ResetPendingAuthorizations(count: number = 0): void {
        this._pendingAuthorizations = count;
    }

    public StartUpdate(sector: string): void {
        if (sector == null) {
            this.InitializeSectorsLoaded();
        } else {
            for (let i: number = this._sectorsLoaded.length - 1; i >= 0; i--)
                if (this._sectorsLoaded[i] === sector)
                    this._sectorsLoaded.splice(i, 1);
        }
    }

    public async Resolve(): Promise<void> {
        this.StartUpdate(null);
        await this.ResolveInternal();
    }

    public async ResolveInternal(): Promise<void> {
        this.Application.Log.WriteVerbose('Document - ResolveInternal - Started');
        if (!await this.ResolveParent())
            await this.ResolveChildren(null);
        this.Application.Log.WriteVerbose('Document - ResolveInternal - Finished');
        //Storage Before
        await this.Application.Storage.ResolveData(false);
        //Control Flow
        await this.Application.ControlFlow.ResolveControlFlowDocument();
        //Components
        await this.Application.ComponentHandler.ResolveComponents();
        //Storage After
        await this.Application.Storage.ResolveData(true);
        //Mustaches
        await this.Application.Barber.ResolveMustaches();
        //Authorization Pending
        await this.TryOnAuthorizationRequest();
    }

    private async ResolveParent(): Promise<boolean> {
        this.Application.Log.WriteVerbose('Document - ResolveParent - Started');
        const div = $('div').first();
        if ((div == null) || (div.length === 0)) {
            this.Application.Log.WriteVerbose('Document - ResolveParent - Finished - NoDiv');
            return (false);
        }
        const divElement: HTMLElement = div.get(0);
        const parent = divElement.getAttribute('d-sector-parent-url');
        if (parent == null) {
            this.Application.Log.WriteVerbose('Document - ResolveParent - Finished - NoParent');
            return (false);
        }
        const parentSector = divElement.getAttribute('d-sector-parent');
        if (parentSector == null) {
            this.Application.Log.WriteVerbose('Document - ResolveParent - Finished - NoParentSector');
            return (false);
        }
        //Sector
        const sectors: [string, string, string][] = this.ExtractSectors(divElement);
        this.Application.Log.WriteVerbose('Document - ResolveParent - parent = {0}, parentSector = {1}', parent, parentSector);
        const html: string = await this.Application.Server.GetViewHTML(parent);
        await this.ResolveParentResponse(html, parent, parentSector, divElement.outerHTML, sectors);
        this.Application.Log.WriteVerbose('Document - ResolveParent - Finished');
        return (true);
    }

    public async ResolveParentResponse(data: string, parent: string, parentSector: string, childHtml: string, sectors: [string, string, string][]): Promise<void> {
        this.Application.Log.WriteVerbose('Document - ResolveParentResponse - Started');
        //Replace document with parent data
        if (this.Application.Log.ShowHTML)
            this.Application.Log.WriteVerbose('Document - ResolveParentResponse - data - {0}', data);
        this.ReplaceDocument(data);
        //Replace Child html
        this.Application.Log.WriteVerbose('Document - ResolveParentResponse - parent = {0}, parentSector = {1}', parent, parentSector);
        const divChildSector = $("div[d-sector='" + parentSector + "']");
        if (divChildSector == null) {
            this.Application.Log.WriteVerbose('Document - ResolveParentResponse - Finished - divChildSector == null');
            return;
        }
        if (this.Application.Log.ShowHTML)
            this.Application.Log.WriteVerbose('Document - ResolveParentResponse - childHtml - {0}', childHtml);
        await this.AddSectorFriends(parentSector, divChildSector.attr('d-sector-friend'));
        divChildSector.html(childHtml);
        //Sectors
        for (let i: number = 0; i < sectors.length; i++) {
            const sector: [string, string, string] = sectors[i];
            const sectorName: string = sector[0];
            const url: string = sector[1];
            const container: string = sector[2];
            await this.AddSectorHierarchy(sectorName, parentSector);
            this.StartUpdate(sectorName);
            await this.LoadChildSector(sectorName, url, null, true, false, container);
        }
        this.Application.Log.WriteVerbose('Document - ResolveParentResponse - Finished');
        //Internal
        await this.ResolveInternal();
    }

    private ExtractSectors(el: HTMLElement): [string, string, string][] {
        const attributes: [string, string, string][] = [];
        for (let i: number = 0; i < el.attributes.length; i++) {
            const attribute: Attr = el.attributes[i];
            const attributeSectorProperty = this.ExtractSectorProperty(attribute.nodeName);
            if (attributeSectorProperty != null)
                attributes.push([attributeSectorProperty, attribute.nodeValue, el.getAttribute('d-sector-container-' + attributeSectorProperty)]);
        }
        return (attributes);
    }

    private ExtractSectorProperty(property: string): string {
        const parse: string[] = this.Application.Parser.ParseProperty(property);
        if (parse.length != 4)
            return (null);
        if (parse[0] != 'd')
            return (null);
        if ((parse[1].toLowerCase() != 'sector') || (parse[2] != 'default'))
            return (null);
        return (parse[3]);
    }

    private async ResolveChildren(divStart: JQuery): Promise<void> {
        //Children Sectors
        const divChildrenSector = divStart == null ? $('div[d-sector]') : divStart.find('div[d-sector]');
        if ((divChildrenSector == null) || (divChildrenSector.length === 0))
            return;
        //Retrieve First Level Sectors
        const sector: string = this.GetSector(divStart != null ? divStart.get(0) : null);
        const sectorChildren: HTMLElement[] = [];
        for (let i = 0; i < divChildrenSector.length; i++) {
            const sectorChild: HTMLElement = divChildrenSector[i];
            const sectorChildParent = this.GetSectorParent(sectorChild);
            if (sector === sectorChildParent)
                sectorChildren.push(sectorChild);
        }
        //Resolve Children Sectors
        for (let i = 0; i < sectorChildren.length; i++) {
            const elChild: HTMLElement = sectorChildren[i];
            let childSector: string = elChild.getAttribute('d-sector');
            if (childSector == "@") {
                childSector = this.CreateGuid();
                elChild.setAttribute('d-sector', childSector);
            }
            if (this.IsSectorAlreadyLoaded(childSector))
                continue;
            //Mark Sector as Loaded
            this.MarkSectorAsLoaded(childSector);
            //Url
            const url = elChild.getAttribute('d-sector-url');
            if ((url != null) && (elChild.children.length > 0))
                continue;
            const urlSector = this.GetSectorParent(elChild);
            const urlResolved = url != null ? await this.Application.Storage.ResolveDataUrlMustaches(null, urlSector, url, null) : null;
            //Container
            let container: string = null;
            let childContainer: string = elChild.getAttribute('d-container');
            if (childContainer !== null) {
                if (this.Application.Parser.IsMustache(childContainer)) {
                    const dataPath: string[] = this.Application.Parser.ParseMustache(childContainer);
                    const contextItem: DrapoContextItem = await this.Application.Solver.CreateContextItemFromPath(childSector, dataPath);
                    let item: any = await this.Application.Solver.ResolveItemDataPathObject(childSector, contextItem, dataPath);
                    if ((item === null) || (item === '')) {
                        item = this.Application.Document.CreateGuid();
                        await this.Application.Solver.UpdateItemDataPathObject(childSector, contextItem, dataPath, item);
                    }
                    container = item.toString();
                } else {
                    if (childContainer == "@") {
                        childContainer = this.CreateGuid();
                        elChild.setAttribute('d-container', childContainer);
                    }
                    container = childContainer;
                }
            }
            const html: string = urlResolved != null ? await this.Application.Server.GetViewHTML(urlResolved) : null;
            await this.LoadChildSectorInternal(urlResolved, html, childSector, elChild, null, true, false, container);
        }
    }

    private async LoadChildSectorInternal(url: string, data: string, sector: string, elSector: HTMLElement, title: string = null, canRoute: boolean = true, canLoadDefaultSectors: boolean = false, container: string = null): Promise<void> {
        this.Application.Log.WriteVerbose('Document - ResolveChildResponse - Started - Sector {0}', sector);
        //Switch Sector
        if (container !== null) {
            if (await this.Application.SectorContainerHandler.Switch(sector, container))
                return;
            //Append
            const content: string = this.Application.Parser.ParseDocumentContent(data);
            const elContentParent = document.createElement('div');
            elContentParent.innerHTML = content;
            elSector.appendChild(elContentParent.children[0]);
        } else {
            //Replacing
            if (data != null)
                await this.ReplaceSectorData($(elSector), data);
        }
        //Routing
        const route: string = ((canRoute) && (url != null)) ? elSector.getAttribute('d-route') : 'false';
        if ((route == null) || (route != 'false'))
            await this.Application.Router.Route(url, sector, title);
        //Sector Hierarchy
        const sectorParent: string = this.GetSectorParent(elSector);
        await this.Application.Debugger.AddSectorUpdate(sector, sectorParent, url);
        await this.AddSectorHierarchy(sector, sectorParent);
        //Sector Friend
        await this.AddSectorFriends(sector, elSector.getAttribute('d-sector-friend'));
        const eljSector: JQuery = $(elSector);
        //Load Default Sectors
        if (canLoadDefaultSectors) {
            const divChildSectorLoaded: JQuery = eljSector.children();
            const divElement: HTMLElement = divChildSectorLoaded.length > 0 ? divChildSectorLoaded.get(0) : null;
            const sectors: [string, string, string][] = divElement != null ? this.ExtractSectors(divElement) : [];
            for (let i: number = 0; i < sectors.length; i++) {
                const sectorInfo: [string, string, string] = sectors[i];
                const sectorName: string = sectorInfo[0];
                const sectorUrl: string = sectorInfo[1];
                const sectorContainer: string = sectorInfo[2];
                await this.AddSectorHierarchy(sectorName, sector);
                this.StartUpdate(sectorName);
                await this.LoadChildSector(sectorName, sectorUrl, null, true, false, sectorContainer);
            }
        }
        if (data == '')
            return;
        //Content
        const elSectorContent: HTMLElement = container !== null ? elSector.children[elSector.children.length - 1] as HTMLElement : elSector;
        const eljSectorContent: JQuery = $(elSectorContent);
        //Storage Before
        await this.Application.Storage.ResolveData(false, elSectorContent);
        //Control Flow
        await this.Application.ControlFlow.ResolveControlFlowSector(eljSectorContent);
        //Components
        await this.Application.ComponentHandler.ResolveComponents(eljSectorContent);
        //Storage After
        await this.Application.Storage.ResolveData(true, elSectorContent);
        //Mustaches
        await this.Application.Barber.ResolveMustaches(eljSectorContent);
        //Children
        await this.ResolveChildren(eljSectorContent);
        //Delay
        await this.Application.Storage.LoadDataDelayedAndNotify();
        //Event On Load
        const onload: string = elSector.getAttribute("d-on-load");
        if (onload != null)
            await this.Application.FunctionHandler.ResolveFunctionWithoutContext(sector, elSector, onload);
        //Authorization Pending
        await this.TryOnAuthorizationRequest();
        //Initialize Detach
        if (container !== null)
            this.InitializeSectorElementDetach(elSectorContent);
        //Garbage Collector
        await this.Application.ComponentHandler.UnloadComponentInstancesDetached(sector);
    }

    private async ReplaceSectorData(divChildSector: JQuery, data: string): Promise<boolean> {
        if (data === null) {
            divChildSector.html('');
            return (false);
        }
        const content: string = this.Application.Parser.ParseDocumentContent(data);
        const attributes: [string, string][] = this.Application.Parser.ParseElementAttributes(content);
        //Template Url
        const templateUrl: string = this.Application.Solver.Get(attributes, 'd-templateurl');
        if (templateUrl === null) {
            divChildSector.html(content);
            return (true);
        }
        //Template
        let template: string = this.Application.Solver.Get(attributes, 'd-template');
        if (template === null)
            template = 'template';
        //Template Url Content
        const templateUrlContent = await this.Application.Server.GetViewHTML(templateUrl);
        const templateContent = this.Application.Parser.ParseDocumentContent(templateUrlContent);
        //Insert Template
        divChildSector.html(templateContent);
        const sectorTemplateJQuery: JQuery = divChildSector.find("div[d-template='" + template + "']");
        if (sectorTemplateJQuery.length === 0)
            divChildSector.html(content);
        else
            sectorTemplateJQuery.html(content);
        return (true);
    }

    public async ResolveWindow(window: JQuery): Promise<void> {
        const elWindow: HTMLElement = window.get(0);
        const sector: string = this.Application.Document.GetSector(elWindow);
        //Start Update
        this.Application.Document.StartUpdate(sector);
        //Storage Before
        await this.Application.Storage.ResolveData(false, elWindow);
        //Control Flow
        await this.Application.ControlFlow.ResolveControlFlowSector(window, false);
        //Components
        await this.Application.ComponentHandler.ResolveComponents(window);
        //Storage After
        await this.Application.Storage.ResolveData(true, elWindow);
        //Mustaches
        await this.Application.Barber.ResolveMustaches(window);
    }

    public async ResolveComponentDynamicSector(el: HTMLElement): Promise<void> {
        const elSector: string = el.getAttribute('d-sector');
        if (elSector == null)
            return;
        const isSectorGuid: boolean = elSector == '@';
        if ((!isSectorGuid) && (this.Application.Document.IsSectorReady(elSector)))
            return;
        const sectorParent: string = this.GetSectorParent(el);
        const sector: string = isSectorGuid ? this.CreateGuid() : elSector;
        if (isSectorGuid)
            el.setAttribute('d-sector', sector);
        await this.AddSectorHierarchy(sector, sectorParent);
        //Sector Friend
        await this.AddSectorFriends(sector, el.getAttribute('d-sector-friend'));
        this.MarkSectorAsLoaded(sector);
        //Storage
        await this.Application.Storage.ResolveData(true, el);
    }

    public async ResolveComponentUpdate(el: HTMLElement, context: DrapoContext): Promise<void> {
        //Sector
        const elj: JQuery = $(el);
        //Storage Before
        await this.Application.Storage.ResolveData(false, el);
        //Control Flow
        await this.Application.ControlFlow.ResolveControlFlowSector(elj);
        //Internal Components
        await this.Application.ComponentHandler.ResolveComponentsElement(el, context, true, true);
        //Storage After
        await this.Application.Storage.ResolveData(true, el);
        //Mustaches
        await this.Application.Barber.ResolveMustaches(elj, null, false);
    }

    public async RemoveElement(el: HTMLElement): Promise<void> {
        $(el).remove();
        this.RemoveElementIteration(el);
    }

    private RemoveElementIteration(el: HTMLElement): void {
        //Sector
        const sector: string = el.getAttribute('d-sector');
        if (sector != null) {
            this.RemoveSectorData(sector);
        } else {
            //Recursive
            const children: Array<HTMLElement> = [].slice.call(el.children);
            for (let i: number = 0; i < children.length; i++)
                this.RemoveElementIteration(children[i]);
        }
    }

    private RemoveSectorData(sector: string): void {
        //Children
        const sectors: string[] = this.GetSectorChildren(sector);
        for (let i: number = 0; i < sectors.length; i++)
            this.RemoveSectorData(sectors[i]);
        //Metadata
        this.CleanSectorMetadataInternal(sector);
        //Storage
        this.Application.Storage.RemoveBySector(sector);
        //Container
        this.Application.SectorContainerHandler.RemoveBySector(sector);
        //Components
        this.Application.ComponentHandler.UnloadComponentInstances(sector);
    }

    public async LoadChildSector(sectorName: string, url: string, title: string = null, canRoute: boolean = true, canLoadDefaultSectors: boolean = false, container: string = null): Promise<boolean> {
        if (this.IsSectorAlreadyLoaded(sectorName))
            return (false);
        //Mark Sector as Loaded
        this.MarkSectorAsLoaded(sectorName);
        const sectorJQuery: JQuery = $("div[d-sector='" + sectorName + "']");
        let elSector: HTMLElement = null;
        for (let i: number = sectorJQuery.length - 1; i >= 0; i--)
        {
            const el: HTMLElement = sectorJQuery[i];
            if (this.IsElementDetached(el))
                continue;
            elSector = el;
            break;
        }
        if (elSector == null) {
            this.Application.Log.WriteVerbose('Document - LoadChildSector - Missing Sector - {0}', sectorName);
            return (false);
        }
        const urlResolved: string = ((url === null) || (url === '')) ? '' : await this.Application.Storage.ResolveDataUrlMustaches(null, null, url, null);
        const html: string = ((urlResolved === null) || (urlResolved === '')) ? '' : await this.Application.Server.GetViewHTML(urlResolved);
        await this.LoadChildSectorInternal(url, html, sectorName, elSector, title, canRoute, canLoadDefaultSectors, container);
        return (true);
    }

    public async LoadChildSectorContent(sectorName: string, content: string): Promise<boolean> {
        if (this.IsSectorAlreadyLoaded(sectorName))
            return (false);
        //Mark Sector as Loaded
        this.MarkSectorAsLoaded(sectorName);
        const sectorJQuery: JQuery = $("div[d-sector='" + sectorName + "']");
        if (sectorJQuery.length == 0) {
            this.Application.Log.WriteVerbose('Document - LoadChildSectorContent - Missing Sector - {0}', sectorName);
            return (false);
        }
        await this.LoadChildSectorInternal(null, content, sectorName, sectorJQuery[0], null, false, false, null);
        return (true);
    }

    public async LoadChildSectorDefault(sectorName: string): Promise<boolean> {
        const sectorJQuery: JQuery = $("div[d-sector='" + sectorName + "']");
        if (sectorJQuery.length == 0) {
            this.Application.Log.WriteVerbose('Document - LoadChildSectorDefault - Missing Sector - {0}', sectorName);
            return (false);
        }
        if (sectorJQuery.children.length == 0)
            return (false);
        let url: string = sectorJQuery.attr('d-sector-url');
        if ((url === null))
            url = '';
        const urlSector = this.GetSectorParent(sectorJQuery[0]);
        const urlResolved = await this.Application.Storage.ResolveDataUrlMustaches(null, urlSector, url, null);
        return (await this.LoadChildSector(sectorName, urlResolved, null, false, false));
    }

    private ReplaceDocument(data: string): void {
        this.Application.Log.WriteVerbose('Document - ReplaceDocument - Before - {0}', $('html').html());
        this.Application.Log.WriteVerbose('Document - ReplaceDocument - Data - {0}', data);
        const head: string = this.ExtractHeadInnerHtml(data);
        if (head != null)
            $('head').html(head);
        const body: string = this.ExtractBodyInnerHtml(data);
        if (body != null)
            $('body').html(body);
        this.Application.Log.WriteVerbose('Document - ReplaceDocument - After - {0}', $('html').html());
    }

    public ReplaceElement(el: Element, elNew: Element | string | JQuery): void {
        $(el).replaceWith(elNew);
    }

    public Show(elj: JQuery): JQuery {
        //Unwrap first
        if (elj.is('span')) {
            const eljChildren: JQuery = elj.children();
            if ((eljChildren.length === 1) && ((eljChildren.is('option') || (eljChildren.is('optgroup')))))
                elj = eljChildren;
        }
        //Now show it
        for (let i: number = 0; i < elj.length; i++)
            this.ShowInternal(elj[i]);
        return (elj);
    }

    private ShowInternal(el: HTMLElement): void {
        const display: string = el.style.display;
        if (display === 'none')
            el.style.display = '';
        const style: string = el.getAttribute('style');
        if (style === '')
            el.removeAttribute('style');
    }

    public Hide(selector: JQuery): JQuery {
        //Wrap and hide
        const isOption: boolean = selector.is('option');
        const isOptGroup: boolean = ((!isOption) && (selector.is('optgroup')));
        const isParentOptGroup = ((isOption) && (selector.parent().is('optgroup')));
        if (((isOption) && (!isParentOptGroup)) || (isOptGroup)) {
            const parent: JQuery = (selector.parent().is('span')) ? selector.parent() : this.Wrap(selector, 'span');
            parent.hide();
            return (parent);
        } else {
            selector.hide();
            return (selector);
        }
    }

    public GetWrapper(elj: JQuery): HTMLElement {
        if (!elj.is('span'))
            return (null);
        const eljChildren: JQuery = elj.children();
        if (eljChildren.length !== 1)
            return (null);
        return (eljChildren.get(0));
    }

    private Wrap(elj: JQuery, tagName: string): JQuery {
        const el: HTMLElement = elj[0];
        const wrapper: HTMLElement = document.createElement(tagName);
        el.parentNode.insertBefore(wrapper, el);
        wrapper.appendChild(el);
        return ($(wrapper));
    }

    public GetElementAttributes(el: Element): [string, string][] {
        const attributes: [string, string][] = [];
        for (let i: number = 0; i < el.attributes.length; i++) {
            const attribute: Attr = el.attributes[i];
            attributes.push([attribute.nodeName, attribute.nodeValue]);
        }
        return (attributes);
    }

    public GetElementAttributesFilteredPrefix(el: Element, prefix: string): [string, string][] {
        if ((prefix === null) || (prefix === ''))
            return (this.GetElementAttributes(el));
        const attributes: [string, string][] = [];
        const length: number = prefix.length;
        for (let i: number = 0; i < el.attributes.length; i++) {
            const attribute: Attr = el.attributes[i];
            const name: string = attribute.nodeName;
            if (name.length < length)
                continue;
            if (name.substring(0, length) !== prefix)
                continue;
            attributes.push([name.substring(length), attribute.nodeValue]);
        }
        return (attributes);
    }

    public SetElementAttributes(elj: JQuery, attributes: [string, string][]): void {
        for (let i: number = 0; i < attributes.length; i++) {
            const attribute: [string, string] = attributes[i];
            elj.attr(attribute[0], attribute[1]);
        }
    }

    private ExtractHeadInnerHtml(data: string): string {
        //Head
        const index: number = data.indexOf('<head>');
        if (index < 0)
            return (null);
        const indexEnd: number = data.indexOf('</head>');
        const head: string = data.substr(index + 6, indexEnd - (index + 6));
        const headWithoutFramework: string = this.RemoveFramework(head);
        return (headWithoutFramework);
    }

    private RemoveFramework(data: string): string {
        //Remove Drapo Framework
        let indexScript: number = 0;
        while ((indexScript = data.indexOf('<script', indexScript)) >= 0) {
            const indexScriptEnd: number = data.indexOf('</script>', indexScript);
            if (indexScriptEnd > indexScript) {
                const script: string = data.substring(indexScript, indexScriptEnd + 9);
                if (script.indexOf('drapo.js') >= 0)
                    return (data.replace(script, ''));
            }
            indexScript = indexScriptEnd;
        }
        return (data);
    }

    private ExtractBodyInnerHtml(data: string): string {
        //Body
        let index: number = data.indexOf('<body>');
        if (index >= 0) {
            const indexEnd: number = data.indexOf('</body>');
            return (data.substr(index + 6, indexEnd - (index + 6)));
        }
        //First Div Content
        index = data.indexOf('<div');
        if (index >= 0) {
            return (data.substr(index));
        }
        return (null);
    }

    private GetOuterHtml(el: any): any {
        return ($('<div>').append($(el).clone()).html());
    }

    public IsElementInserted(list: HTMLElement[], itemInsert: HTMLElement): boolean {
        for (let i = 0; i < list.length; i++) {
            if (list[i] == itemInsert)
                return (false);
        }
        list.push(itemInsert);
        return (true);
    }

    public IsElementAttached(el: HTMLElement): boolean {
        let elc: HTMLElement = el;
        while ((elc = elc.parentElement) !== null)
            if (elc.tagName === 'BODY')
                return (true);
        return (false);
    }

    public IsElementInsideControlFlow(el: HTMLElement): boolean {
        if (el.getAttribute == null)
            return (false);
        if (el.tagName === 'BODY')
            return (false);
        const dfor: string = el.getAttribute('d-for');
        if (dfor != null)
            return (true);
        const elParent: HTMLElement = el.parentElement;
        if (elParent == null)
            return (true);
        return (this.IsElementInsideControlFlow(elParent));
    }

    public IsElementInsideControlFlowOrContext(el: HTMLElement): boolean {
        if (el.getAttribute == null)
            return (false);
        if (el.tagName === 'BODY')
            return (false);
        const dfor: string = el.getAttribute('d-for');
        if (dfor != null)
            return (true);
        const elPrevious: HTMLElement = el.previousElementSibling as HTMLElement;
        if (elPrevious != null)
            return (this.IsElementInsideControlFlowOrContext(elPrevious));
        const elParent: HTMLElement = el.parentElement;
        if (elParent == null)
            return (true);
        return (this.IsElementInsideControlFlowOrContext(elParent));
    }

    public IsElementPreprocessed(el: HTMLElement): boolean {
        if (el.getAttribute == null)
            return (false);
        const pre: string = el.getAttribute('d-pre');
        if (pre === 'true')
            return (true);
        const elParent: HTMLElement = el.parentElement;
        if (elParent == null)
            return (false);
        return (this.IsElementPreprocessed(elParent));
    }

    public async RequestAuthorization(dataKey: string, type: string): Promise<void> {
        //Subscribe Key
        this.Application.Observer.SubscribeAuthorization(dataKey, type);
        //Event
        await this.TryOnAuthorizationRequest();
    }

    private async TryOnAuthorizationRequest(): Promise<boolean> {
        const pendingAuthorizations: number = this.Application.Observer.GetPendingAuthorization();
        if (this._pendingAuthorizations === pendingAuthorizations)
            return (false);
        this._pendingAuthorizations = pendingAuthorizations;
        await this.OnAuthorizationRequest();
        return (true);
    }

    private async OnAuthorizationRequest(): Promise<void> {
        //Event Authorization Request configurated in server side
        const onAuthorizationRequest: string = await this.Application.Config.GetOnAuthorizationRequest();
        if ((onAuthorizationRequest === null) || (onAuthorizationRequest === ''))
            return;
        await this.Application.FunctionHandler.ResolveFunctionWithoutContext(null, null, onAuthorizationRequest);
    }

    private IsSectorAlreadyLoaded(sector: string): boolean {
        for (let i: number = 0; i < this._sectorsLoaded.length; i++)
            if (this._sectorsLoaded[i] === sector)
                return (true);
        return (false);
    }

    public MarkSectorAsLoaded(sector: string): void {
        this._sectorsLoaded.push(sector);
    }

    private InitializeSectorsLoaded(): void {
        this._sectorsLoaded = [];
    }

    public GetSectorParent(el: HTMLElement): string {
        return (this.GetSector(el.parentElement));
    }

    public GetSector(el: HTMLElement): string {
        if (el == null)
            return (null);
        const sector: string = el.getAttribute('d-sector');
        if (sector != null)
            return (sector);
        return (this.GetSector(el.parentElement));
    }

    private GetElementByAttribute(name: string, value: string): HTMLElement {
        const elj: JQuery = $("[" + name + "='" + value + "']");
        if ((elj == null) || (elj.length == 0))
            return (null);
        return (elj[0]);
    }

    private GetSectorElement(sector: string): HTMLElement {
        return (this.GetElementByAttribute('d-sector', sector));
    }

    public GetSectorElementInner(sector: string): HTMLElement {
        const elSector: HTMLElement = this.GetSectorElement(sector);
        if ((elSector == null) || (elSector.children.length == 0))
            return (null);
        for (let i: number = elSector.children.length - 1; i >= 0; i--)
        {
            const elSectorChild: HTMLElement = elSector.children[i] as HTMLElement;
            const detach: string = elSectorChild.getAttribute('d-detach');
            if ((detach === null) || (detach === '') || (detach === 'active'))
                return (elSectorChild);
        }
        return (null);
    }

    public SetSectorElementInner(sector: string, el: HTMLElement, canDetach: boolean): void {
        const elSector: HTMLElement = this.GetSectorElement(sector);
        if (elSector == null)
            return (null);
        //Disable/Remove Old
        for (let i: number = elSector.children.length - 1; i >= 0; i--) {
            const elSectorChild: HTMLElement = elSector.children[i] as HTMLElement;
            const detach: string = elSectorChild.getAttribute('d-detach');
            if (detach == null) {
                elSector.removeChild(elSectorChild);
            } else {
                if (detach === 'active') {
                    const elSectorChildDisplay: string = elSectorChild.style.display;
                    const detachValue: string = ((elSectorChildDisplay != null) && (elSectorChildDisplay != '')) ? elSectorChildDisplay : 'empty';
                    elSectorChild.style.display = 'none';
                    elSectorChild.setAttribute('d-detach', detachValue);
                }
            }
        }
        //Enable/Add New
        if (el === null)
            return;
        if (canDetach) {
            elSector.appendChild(el);
        } else {
            if (el.parentElement == null) {
                el.setAttribute('d-detach', 'active');
                elSector.appendChild(el);
            } else {
                const detach: string = el.getAttribute('d-detach');
                el.style.display = detach != 'empty' ? detach : '';
                el.setAttribute('d-detach', 'active');
            }
        }
    }

    private InitializeSectorElementDetach(el: HTMLElement) {
        if (this.CanDetachElement(el))
            return;
        el.setAttribute('d-detach', 'active');
    }

    public CanDetachElement(el: HTMLElement): boolean {
        //If we dont find an iframe we can detach it
        if (this.HasElementIframe(el))
            return (false);
        if (this.HasElementCantDetach(el))
            return (false);
        return (true);
    }

    public IsElementDetached(el: HTMLElement): boolean {
        //In this case the element is at the DOM tree and does not have the d-detach active
        if (el.tagName === 'BODY')
            return (false);
        const detach = el.getAttribute('d-detach');
        if ((detach !== null) && (detach !== '') && (detach != 'active'))
            return (true);
        if (el.parentElement == null)
            return (true);
        return(this.IsElementDetached(el.parentElement));
    }

    public IsElementAlive(el : HTMLElement): boolean {
        if (el === null)
            return (false);
        if (el.tagName === 'BODY')
            return (true);
        if (this.Application.SectorContainerHandler.IsElementContainerized(el))
            return (true);
        return (this.IsElementAlive(el.parentElement));
    }

    public IsElementInsideComponent(el: HTMLElement): boolean {
        if (el === null)
            return (false);
        if (el.tagName === 'BODY')
            return (false);
        if (this.Application.ComponentHandler.IsComponent(el.tagName.toLowerCase()))
            return (true);
        return (this.IsElementInsideComponent(el.parentElement));
    }

    private HasElementIframe(el: HTMLElement): boolean {
        if (el == null)
            return (false);
        if (el.tagName.toLowerCase() === 'iframe')
            return (true);
        const children: Array<HTMLElement> = [].slice.call(el.children);
        for (let i = 0; i < children.length; i++) {
            const child: HTMLElement = children[i];
            const hasChildIframe: boolean = this.HasElementIframe(child);
            if (hasChildIframe)
                return (true);
        }
        return (false);
    }

    private HasElementCantDetach(el: HTMLElement): boolean {
        if (el == null)
            return (false);
        const detachable: string = el.getAttribute('d-detachable');
        if (detachable === 'false')
            return (true);
        const children: Array<HTMLElement> = [].slice.call(el.children);
        for (let i = 0; i < children.length; i++) {
            const child: HTMLElement = children[i];
            const hasElementCantDetach: boolean = this.HasElementCantDetach(child);
            if (hasElementCantDetach)
                return (true);
        }
        return (false);
    }

    public GetSectorImpersonate(el: HTMLElement): string {
        if (el == null)
            return (null);
        const sector: string = el.getAttribute('d-sector');
        if (sector != null)
            return (null);
        const sectorImpersonate: string = el.getAttribute('d-sector-impersonate');
        if (sectorImpersonate != null)
            return (sectorImpersonate);
        return (this.GetSectorImpersonate(el.parentElement));
    }

    public async IsSectorDynamic(el: HTMLElement): Promise<boolean> {
        const sector: string = await this.GetSectorImpersonate(el);
        return (this.Application.Parser.IsMustache(sector));
    }

    public async GetSectorResolved(el: HTMLElement): Promise<string> {
        const sector: string = this.GetSector(el);
        const sectorImpersonate: string = this.GetSectorImpersonate(el);
        if (sectorImpersonate == null)
            return (sector);
        const sectorResolved = await this.Application.Storage.ResolveDataUrlMustaches(null, sector, sectorImpersonate, null);
        return (sectorResolved);
    }

    public CreateGuid(isShort: boolean = true): string {
        if (isShort)
            return (this.CreateGuidShort());
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
            // tslint:disable-next-line:no-bitwise one-variable-per-declaration
            const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    private CreateGuidShort(): string {
        let guid: string = this.CreateGuidShortInternal();
        while (guid === this._lastGuid)
            guid = this.CreateGuidShortInternal();
        this._lastGuid = guid;
        return (guid);
    }

    private CreateGuidShortInternal(): string {
        const date: Date = new Date();
        const hexa: string = date.getTime().toString(16);
        if (hexa.length <= 8)
            return (hexa);
        return (hexa.substr(hexa.length - 8));
    }

    public EnsureElementHasID(el: HTMLElement): string {
        let id: string = el.getAttribute('d-id');
        if (id != null)
            return (id);
        id = this.CreateGuid();
        el.setAttribute('d-id', id);
        return (id);
    }

    public ApplyNodeDifferences(parent: HTMLElement, nodeOld: HTMLElement, nodeNew: HTMLElement): void {
        if (!nodeOld) {
            //Inserted
            parent.appendChild(nodeNew);
        } else if (!nodeNew) {
            //Removed
            parent.removeChild(nodeOld);
        } else if (this.IsNodeDifferentType(nodeOld, nodeNew)) {
            //Changed
            parent.replaceChild(nodeNew, nodeOld);
        } else {
            //Events
            this.ApplyNodeEventsDifferences(nodeOld, nodeNew);
            //Special
            this.ApplyNodeSpecialDifferences(nodeOld, nodeNew);
            //Attributes
            this.ApplyNodeAttributesDifferences(nodeOld, nodeNew);
            //Children
            const childrenOld: Array<HTMLElement> = nodeOld != null ? [].slice.call(nodeOld.children) : [];
            const childrenNew: Array<HTMLElement> = nodeNew != null ? [].slice.call(nodeNew.children) : [];
            const lengthOld = childrenOld.length;
            const lengthNew = childrenNew.length;
            if ((lengthOld === 0) && (lengthNew === 0)) {
                if (nodeOld.textContent !== nodeNew.textContent)
                    nodeOld.textContent = nodeNew.textContent;
            } else {
                for (let i = 0; i < lengthNew || i < lengthOld; i++) {
                    this.ApplyNodeDifferences(nodeOld, childrenOld[i], childrenNew[i]);
                }
            }
        }
    }

    public ApplyNodeDifferencesRenderClass(nodeOld: HTMLElement, nodeNew: HTMLElement): void {
        const className = nodeNew.className;
        if (nodeOld.className !== className)
            nodeOld.className = className;
    }

    private IsNodeDifferentType(nodeOld: HTMLElement, nodeNew: HTMLElement): boolean {
        if ((typeof nodeOld) !== (typeof nodeNew))
            return (true);
        if ((nodeOld.nodeType) !== (nodeNew.nodeType))
            return (true);
        if ((nodeOld.tagName) !== (nodeNew.tagName))
            return (true);
        return (false);
    }

    private ApplyNodeEventsDifferences(nodeOld: HTMLElement, nodeNew: HTMLElement): void {
        const eventsOld: [string, any[]][] = this.ExtractNodeEvents(nodeOld);
        const eventsNew: [string, any[]][] = this.ExtractNodeEvents(nodeNew);
        //Event Type : Insert - Update
        for (let i: number = 0; i < eventsNew.length; i++) {
            const eventNew: [string, any[]] = eventsNew[i];
            const eventType: string = eventNew[0];
            const eventsHandlerNew: any[] = eventNew[1];
            const eventsHandlerOld: any[] = this.ExtractEvents(eventType, eventsOld);
            //Event Array : Insert - Update
            for (let j: number = 0; j < eventsHandlerNew.length; j++) {
                const eventHandlerNew: any = eventsHandlerNew[j];
                const eventHandleNamespace = this.CreateNodeEventNamespace(eventHandlerNew);
                const eventHandlerOld: any = this.ExtractEventHandler(eventHandleNamespace, eventsHandlerOld);
                if (eventHandlerOld === null) {
                    //Insert
                    $(nodeOld).bind(eventHandleNamespace, eventHandlerNew.data, eventHandlerNew.handler);
                } else {
                    //Update
                    eventHandlerOld.handler = eventHandlerNew.handler;
                }
            }
            //Event Array : Delete
            if ((eventsHandlerOld !== null) && (eventsHandlerOld.length > eventsHandlerNew.length)) {
                for (let j: number = 0; j < eventsHandlerOld.length; j++) {
                    const eventHandlerOld: any = eventsHandlerOld[j];
                    const eventHandleNamespace = this.CreateNodeEventNamespace(eventHandlerOld);
                    const eventHandlerNew: any = this.ExtractEventHandler(eventHandleNamespace, eventsHandlerNew);
                    if (eventHandlerNew === null)
                        $(nodeOld).unbind(eventHandleNamespace);
                }
            }
        }
        //Event Type : Delete
        if (eventsOld.length > eventsNew.length) {
            for (let i: number = 0; i < eventsOld.length; i++) {
                const eventOld: [string, any[]] = eventsOld[i];
                const eventType: string = eventOld[0];
                const eventsHandlerNew: any[] = this.ExtractEvents(eventType, eventsNew);
                if (eventsHandlerNew === null)
                    $(nodeOld).unbind(eventType);
            }
        }
    }

    private ExtractNodeEvents(node: HTMLElement): [string, any[]][] {
        const events: [string, any[]][] = [];
        const dataEvents = ($ as any)._data(node, 'events');
        $.each(dataEvents, (eventType: string, eventArray) => {
            events.push([eventType, eventArray]);
        });
        return (events);
    }

    private ExtractEvents(eventType: string, events: [string, any[]][]): any[] {
        for (let i: number = 0; i < events.length; i++) {
            const event: [string, any[]] = events[i];
            if (event[0] === eventType)
                return (event[1]);
        }
        return (null);
    }

    private ExtractEventHandler(namespace: string, eventsHandler: any[]) {
        if (eventsHandler === null)
            return (null);
        for (let i: number = 0; i < eventsHandler.length; i++) {
            const eventHandler: any = eventsHandler[i];
            if (namespace === this.CreateNodeEventNamespace(eventHandler))
                return (eventHandler);
        }
        return (null);
    }

    private CreateNodeEventNamespace(event: any): string {
        return (event.namespace.length > 0 ? (event.type + '.' + event.namespace) : (event.type));
    }

    private ApplyNodeSpecialDifferences(nodeOld: HTMLElement, nodeNew: HTMLElement): void {
        const tag: string = nodeOld.tagName.toLowerCase();
        if (tag === "input")
            this.ApplyNodeSpecialDifferencesInput(nodeOld as HTMLInputElement, nodeNew as HTMLInputElement);
        else if (tag === "select")
            this.ApplyNodeSpecialDifferencesSelect(nodeOld as HTMLSelectElement, nodeNew as HTMLSelectElement);
        else if (tag === "textarea")
            this.ApplyNodeSpecialDifferencesTextarea(nodeOld as HTMLInputElement, nodeNew as HTMLInputElement);
    }

    private ApplyNodeSpecialDifferencesInput(nodeOld: HTMLInputElement, nodeNew: HTMLInputElement): void {
        const type = nodeOld.type;
        if (((type == 'checkbox')) && (nodeOld.checked !== nodeNew.checked))
            nodeOld.checked = nodeNew.checked;
        if (((type == 'text') || (type == 'password')) && (nodeOld.value !== nodeNew.value))
            nodeOld.value = nodeNew.value;
    }

    private ApplyNodeSpecialDifferencesSelect(nodeOld: HTMLSelectElement, nodeNew: HTMLSelectElement): void {
        if (nodeOld.value !== nodeNew.value)
            nodeOld.value = nodeNew.value;
    }

    private ApplyNodeSpecialDifferencesTextarea(nodeOld: HTMLInputElement, nodeNew: HTMLInputElement): void {
        if (nodeOld.value !== nodeNew.value)
            nodeOld.value = nodeNew.value;
    }

    private ApplyNodeAttributesDifferences(nodeOld: HTMLElement, nodeNew: HTMLElement): void {
        const attributesOld: [string, string][] = this.ExtactNodeAttributes(nodeOld);
        const attributesNew: [string, string][] = this.ExtactNodeAttributes(nodeNew);
        //Insert - Update
        for (let i: number = 0; i < attributesNew.length; i++) {
            const attribute: [string, string] = attributesNew[i];
            const name: string = attribute[0];
            const valueNew: string = attribute[1];
            const valueOld: string = this.ExtractNodeAttributeValue(attributesOld, name);
            if (valueNew === valueOld)
                continue;
            if ((name === 'class') && (this.Application.Validator.IsValidatorInterface(nodeOld)))
                continue;
            nodeOld.setAttribute(name, valueNew);
        }
        //Remove
        for (let i: number = 0; i < attributesOld.length; i++) {
            const attribute: [string, string] = attributesOld[i];
            const name: string = attribute[0];
            const valueNew: string = this.ExtractNodeAttributeValue(attributesNew, name);
            if (valueNew !== null)
                continue;
            nodeOld.removeAttribute(name);
        }
    }

    private ExtactNodeAttributes(node: HTMLElement): [string, string][] {
        const attributes: [string, string][] = [];
        const nodeAttributes: NamedNodeMap = node.attributes;
        const length: number = nodeAttributes.length;
        for (let i: number = 0; i < length; i++) {
            const nodeAttribute: Attr = nodeAttributes[i];
            attributes.push([nodeAttribute.name, nodeAttribute.value]);
        }
        return (attributes);
    }

    private ExtractNodeAttributeValue(attributes: [string, string][], name: string): string {
        for (let i: number = attributes.length - 1; i >= 0; i--)
            if (attributes[i][0] === name)
                return (attributes[i][1]);
        return (null);
    }

    public Contains(elementJQuery: JQuery): boolean {
        return (jQuery.contains(document.documentElement, elementJQuery[0]));
    }

    public ExtractQueryString(canUseRouter: boolean): [string, string][] {
        let url: string = canUseRouter ? document.location.href : this.Application.Router.GetLastRouteUrl();
        if (url == null)
            url = document.location.href;
        return (this.Application.Parser.ParseQueryString(url));
    }

    public async Sleep(timeout: number): Promise<{}> {
        return new Promise((resolve) => setTimeout(resolve, timeout));
    }

    public async WaitForMessage(retry: number = 1000, interval: number = 50): Promise<DrapoMessage> {
        for (let i: number = 0; i < retry; i++) {
            if (this.Message != null)
                return (this.Message);
            await this.Application.Document.Sleep(interval);
        }
        return (null);
    }

    public async AddSectorHierarchy(sector: string, sectorParent: string): Promise<void> {
        //Update
        for (let i: number = 0; i < this._sectorHierarchy.length; i++) {
            const sectorHierarchyCurrent: [string, string] = this._sectorHierarchy[i];
            if (sectorHierarchyCurrent[0] !== sector)
                continue;
            sectorHierarchyCurrent[1] = sectorParent;
            await this.Application.Debugger.NotifySectors();
            return;
        }
        //Add
        const sectorHierarchy: [string, string] = [sector, sectorParent];
        this._sectorHierarchy.push(sectorHierarchy);
        await this.Application.Debugger.NotifySectors();
    }

    public GetSectorAndChildren(sector: string): string[] {
        const sectors: string[] = [];
        sectors.push(sector);
        for (let i: number = 0; i < this._sectorHierarchy.length; i++) {
            const sectorHierarchy: [string, string] = this._sectorHierarchy[i];
            if (sectorHierarchy[1] !== sector)
                continue;
            const sectorChild = sectorHierarchy[0];
            sectors.push(sectorChild);
            const sectorChildren: string[] = this.GetSectorHierarchyChildren(sectorChild);
            for (let j: number = 0; j < sectorChildren.length; j++)
                sectors.push(sectorChildren[j]);
        }
        return (sectors);
    }

    public GetSectorChildren(sector: string): string[] {
        const sectors: string[] = [];
        for (let i: number = 0; i < this._sectorHierarchy.length; i++) {
            const sectorHierarchy: [string, string] = this._sectorHierarchy[i];
            if (sectorHierarchy[1] !== sector)
                continue;
            const sectorChild = sectorHierarchy[0];
            sectors.push(sectorChild);
        }
        return (sectors);
    }

    public GetSectorHierarchyChildren(sector: string): string[] {
        const sectors: string[] = [];
        for (let i: number = 0; i < this._sectorHierarchy.length; i++) {
            const sectorHierarchy: [string, string] = this._sectorHierarchy[i];
            if (sectorHierarchy[1] !== sector)
                continue;
            const sectorChild = sectorHierarchy[0];
            sectors.push(sectorChild);
            const sectorChildren: string[] = this.GetSectorHierarchyChildren(sectorChild);
            for (let j: number = 0; j < sectorChildren.length; j++)
                sectors.push(sectorChildren[j]);
        }
        return (sectors);
    }

    public IsSectorReady(sector: string): boolean {
        if (sector == null)
            return (true);
        for (let i: number = 0; i < this._sectorHierarchy.length; i++) {
            const sectorHierarchy: [string, string] = this._sectorHierarchy[i];
            if (sectorHierarchy[0] === sector)
                return (true);
        }
        return (false);
    }

    private GetSectorHierarchyParents(sector: string): string[] {
        const sectors: string[] = [sector];
        for (let i: number = 0; i < this._sectorHierarchy.length; i++) {
            const sectorHierarchy: [string, string] = this._sectorHierarchy[i];
            if (sectorHierarchy[0] !== sector)
                continue;
            const sectorParent = sectorHierarchy[1];
            if (sectorParent == null)
                continue;
            const sectorParents: string[] = this.GetSectorHierarchyParents(sectorParent);
            for (let j: number = 0; j < sectorParents.length; j++)
                sectors.push(sectorParents[j]);
        }
        return (sectors);
    }

    public AppendSectorHierarchyBySector(sectorHierarchy: [string, string][], sector: string) {
        for (let i: number = 0; i < this._sectorHierarchy.length; i++) {
            const sectorHierarchyCurrent: [string, string] = this._sectorHierarchy[i];
            if (sectorHierarchyCurrent[0] !== sector)
                continue;
            sectorHierarchy.push([sector, sectorHierarchyCurrent[1]]);
            break;
        }
    }

    public AddSectorHierarchys(sectorHierarchys: [string, string][]): void {
        for (let i: number = 0; i < sectorHierarchys.length; i++)
            this._sectorHierarchy.push(sectorHierarchys[i]);
    }

    public AppendSectorFriendsBySector(sectorFriends: [string, string[]][], sector: string) {
        for (let i: number = 0; i < this._sectorFriends.length; i++) {
            const sectorFriend: [string, string[]] = this._sectorFriends[i];
            if (sectorFriend[0] !== sector)
                continue;
            sectorFriends.push([sector, this.Application.Solver.CloneArrayString(sectorFriend[1])]);
            break;
        }
    }

    public AddSectorFriendsRange(sectorFriends: [string, string[]][]): void {
        for (let i: number = 0; i < sectorFriends.length; i++)
            this._sectorFriends.push(sectorFriends[i]);
    }

    public IsSystemKey(key: string): boolean {
        return ((key.length > 2) && (key[0] == '_') && (key[1] == '_'));
    }

    public IsHiddenKey(key: string): boolean {
        return ((key.length > 1) && (key[0] == '_'));
    }

    public GetSectors(): string[] {
        const sectors: string[] = [];
        sectors.push('');
        for (let i: number = 0; i < this._sectorHierarchy.length; i++) {
            const sectorHierarchy: [string, string] = this._sectorHierarchy[i];
            const sector: string = sectorHierarchy[0];
            if (this.IsSystemKey(sector))
                continue;
            sectors.push(sector);
        }
        return (sectors);
    }

    public IsEqualSector(sector1: string, sector2: string): boolean {
        const sector1Root: boolean = this.IsSectorRoot(sector1);
        const sector2Root: boolean = this.IsSectorRoot(sector2);
        if ((sector1Root) && (sector2Root))
            return (true);
        if ((sector1Root) || (sector2Root))
            return (false);
        return (sector1 === sector2);
    }

    public IsSectorRoot(sector: string): boolean {
        return ((sector === null) || (sector === ''));
    }

    public CleanSectorMetadata(sector: string): void {
        if (sector == null)
            return;
        const sectorChildren: string[] = this.GetSectorAndChildren(sector);
        for (let i: number = 0; i < sectorChildren.length; i++)
            this.CleanSectorMetadataInternal(sectorChildren[i]);
    }

    private CleanSectorMetadataInternal(sector: string): void {
        //Friends
        for (let i: number = this._sectorFriends.length - 1; i >= 0; i--) {
            const sectorFriends: [string, string[]] = this._sectorFriends[i];
            if (sectorFriends[0] !== sector)
                continue;
            this._sectorFriends.splice(i, 1);
            break;
        }
        //Parents
        for (let i: number = this._sectorHierarchy.length - 1; i >= 0; i--) {
            const sectorHierarchy: [string, string] = this._sectorHierarchy[i];
            if (sectorHierarchy[0] !== sector)
                continue;
            this._sectorHierarchy.splice(i, 1);
        }
    }

    public GetSectorsAllowed(sector: string): string[] {
        if (sector == null)
            return (null);
        //Hierarchy
        const sectors: string[] = this.GetSectorHierarchyParents(sector);
        //Friends
        for (let i: number = 0; i < sectors.length; i++) {
            const sectorCurrent = sectors[i];
            const sectorCurrentFriends = this.GetSectorFriends(sectorCurrent);
            if (sectorCurrentFriends == null)
                continue;
            for (let j: number = 0; j < sectorCurrentFriends.length; j++) {
                const sectorCurrentFriend: string = sectorCurrentFriends[j];
                if (this.Application.Solver.Contains(sectors, sectorCurrentFriend))
                    continue;
                sectors.push(sectorCurrentFriend);
                //Friends Children
                const sectorCurrentFriendChildren: string[] = this.GetSectorHierarchyChildren(sectorCurrentFriend);
                for (let k: number = 0; k < sectorCurrentFriendChildren.length; k++) {
                    const sectorCurrentFriendChild: string = sectorCurrentFriendChildren[k];
                    if (this.Application.Solver.Contains(sectors, sectorCurrentFriendChild))
                        continue;
                    sectors.push(sectorCurrentFriendChild);
                }
            }
        }
        return (sectors);
    }

    public IsSectorAllowed(sector: string, sectors: string[]): boolean {
        if (sector == null)
            return (true);
        if (sectors == null)
            return (true);
        for (let i: number = 0; i < sectors.length; i++)
            if (sectors[i] == sector)
                return (true);
        return (false);
    }

    public async AddSectorFriends(sector: string, sectorFriendsText: string): Promise<void> {
        if (sectorFriendsText == null)
            return;
        const friends: string[] = this.Application.Parser.ParseTags(sectorFriendsText);
        //Mustache
        for (let i: number = 0; i < friends.length; i++) {
            if (this.Application.Parser.IsMustache(friends[i])) {
                const sectorFriend: any = await this.Application.Storage.RetrieveDataValue(sector, friends[i]);
                friends.splice(i, 1);
                friends.push(sectorFriend);
            }
        }
        //Update
        for (let i: number = 0; i < this._sectorFriends.length; i++) {
            const sectorFriendsCurrent: [string, string[]] = this._sectorFriends[i];
            if (sectorFriendsCurrent[0] !== sector)
                continue;
            sectorFriendsCurrent[1] = friends;
            return;
        }
        //Add
        const sectorFriends: [string, string[]] = [sector, friends];
        this._sectorFriends.push(sectorFriends);
    }

    private GetSectorFriends(sector: string): string[] {
        for (let i: number = 0; i < this._sectorFriends.length; i++) {
            const sectorFriends: [string, string[]] = this._sectorFriends[i];
            if (sectorFriends[0] === sector)
                return (sectorFriends[1]);
        }
        return (null);
    }

    public async CollectSector(sector : string) : Promise<void>
    {
        for (let i: number = this._sectorHierarchy.length - 1; i >= 0; i--)
        {
            const sectorHierarchy: [string, string] = this._sectorHierarchy[i];
            if (sectorHierarchy[1] !== sector)
                continue;
            const sectorCurrent: string = sectorHierarchy[0];
            await this.CollectSector(sectorCurrent);
            if (this.GetElementByAttribute('d-sector', sectorCurrent) !== null)
                continue;
            await this.Application.SectorContainerHandler.UnloadSector(sectorCurrent);
        }
    }

    public IsFirstChild(elj: JQuery): boolean {
        return (elj.index() === 0);
    }

    public IsLastChild(elj: JQuery): boolean {
        return (elj.next().length === 0);
    }

    public async ReceiveMessage(message: DrapoMessage): Promise<void> {
        if (message.Action === 'execute')
            await this.ExecuteMessage(message);
        else if (message.Action === 'update')
            await this.UpdateMessage(message);
        else
            this.Message = message;
    }

    private async ExecuteMessage(message: DrapoMessage): Promise<void> {
        while (!this.Application.IsLoaded)
            await this.Sleep(50);
        const storageItem = await this.Application.Storage.RetrieveDataItem(message.DataKey, message.Sector);
        if (storageItem === null)
            return;
        if (!storageItem.IsTypeValue)
            return;
        const valueFunction: string = (storageItem.Data as any);
        await this.Application.FunctionHandler.ResolveFunctionWithoutContext(message.Sector, null, valueFunction);
    }

    private async UpdateMessage(message: DrapoMessage): Promise<void> {
        await this.Application.Storage.UpdateData(message.DataKey, message.Sector, message.Data);
    }

    public async GetClipboard(): Promise<string> {
        try {
            const value: string = await this.GetClipboardValueAsync();
            if (value !== null)
                return (value);
            return (this.GetClipboardValueExecCommand());
        } catch{
            return ('');
        }
    }

    private async GetClipboardValueAsync(): Promise<string> {
        const clipboard: any = (navigator as any).clipboard;
        if (clipboard == null)
            return (null);
        if (!clipboard.readText)
            return (null);
        const value = await clipboard.readText();
        return (value);
    }

    private async GetClipboardValueExecCommand(): Promise<string> {
        const el = document.createElement('textarea');
        document.body.appendChild(el);
        el.select();
        document.execCommand('paste');
        const value: string = el.value;
        document.body.removeChild(el);
        return (value);
    }

    public async SetClipboard(value: string): Promise<boolean> {
        if (await this.SetClipboardEvent(value))
            return (true);
        return (await this.SetClipboardTextArea(value));
    }

    private async SetClipboardEvent(value: string): Promise<boolean> {
        let result: boolean = false;
        const listener = (ev: any) => {
            if (!ev.clipboardData)
                return (false);
            ev.preventDefault();
            ev.clipboardData.setData('text/plain', value);
            result = true;
            return (true);
        };
        try {
            document.addEventListener('copy', listener);
            document.execCommand('copy');
        } catch{
            return (false);
        } finally {
            document.removeEventListener('copy', listener);
        }
        return (result);
    }

    private async SetClipboardTextArea(value: string): Promise<boolean> {
        const el = document.createElement('textarea');
        el.setAttribute('style', 'width:1px;height:0px;border:0;opacity:0;');
        el.value = value;
        document.body.appendChild(el);
        el.select();
        const result : boolean = document.execCommand('copy');
        document.body.removeChild(el);
        return (result);
    }

    public async StartUnitTest(): Promise<void> {
        const unitTest: JQuery = $("[d-id='__drapoUnitTest']");
        if ((unitTest === null) || (unitTest.length === 0))
            return;
        unitTest.trigger('click');
    }
}

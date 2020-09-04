/// <reference path="../typings/index.d.ts" />

class DrapoBinder {
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

    public BindReaderWriter(contextItem: DrapoContextItem, el: HTMLElement, dataFields: string[], eventTypes: string[], eventTypesCancel: string[] = null): void {
        if (contextItem === null)
            return;
        if (el === null)
            return;
        this.BindReader(contextItem, el, dataFields);
        this.BindWriter(contextItem, el, dataFields, eventTypes, eventTypesCancel);
    }

    public BindReader(contextItem: DrapoContextItem, el: HTMLElement, dataFields: string[]): void {
        if ((contextItem === null) || (contextItem.ElementForTemplate !== null))
            return;
        if (el === null)
            return;
        this.Application.Observer.SubscribeBarber(el, contextItem.DataKey, dataFields);
    }

    public BindWriter(contextItem: DrapoContextItem, el: HTMLElement, dataFields: string[], eventTypes: string[], eventTypesCancel: string[]): void {
        const application: DrapoApplication = this.Application;
        const contextItemLocal: DrapoContextItem = contextItem;
        const data: any = contextItem.Data;
        const dataKey: string = contextItem.DataKey;
        const index: number = contextItem.Index;
        //Write
        for (let i: number = 0; i < eventTypes.length; i++) {
            const event: [string, string] = application.Parser.ParseEvent(eventTypes[i]);
            const eventType: string = event[0];
            const eventFilter: string = event[1];
            const eventNamespace: string = this.Application.EventHandler.CreateEventNamespace(null, null, eventType, 'model');
            $(el).unbind(eventNamespace);
            $(el).bind(eventNamespace, (e) => {
                // tslint:disable-next-line:no-floating-promises
                application.Binder.BindWriterEvent(e, eventType, eventFilter, contextItem, el, dataFields, data, dataKey, index);
            });
        }
        //Cancel
        if ((eventTypesCancel) != null) {
            for (let i: number = 0; i < eventTypesCancel.length; i++) {
                const event: [string, string] = application.Parser.ParseEvent(eventTypesCancel[i]);
                const eventType: string = event[0];
                const eventFilter: string = event[1];
                const eventNamespace: string = this.Application.EventHandler.CreateEventNamespace(null, null, eventType, 'modelCancel');
                $(el).unbind(eventNamespace);
                $(el).bind(eventNamespace, (e) => {
                    if (!this.Application.EventHandler.IsValidEventFilter(e, eventFilter))
                        return (true);
                    const dataPath: string[] = this.Application.Solver.CreateDataPath(dataKey, dataFields);
                    const valueCurrent: any = this.Application.Solver.ResolveDataObjectPathObject(data, dataPath);
                    const elj: JQuery = $(el);
                    const valueBefore: string = elj.val();
                    if (valueCurrent == valueBefore)
                        return (true);
                    elj.val(valueCurrent);
                    return (false);
                });
            }
        }
    }

    public async BindWriterEvent(e: JQueryEventObject, eventType: string, eventFilter: string, contextItem: DrapoContextItem, el: HTMLElement, dataFields: string[], data: any, dataKey: string, index: number): Promise<boolean> {
        if (!this.Application.EventHandler.IsValidEventFilter(e, eventFilter))
            return (true);
        const value: any = this.Application.Binder.GetEventValue(eventType, e);
        const dataPath: string[] = this.Application.Solver.CreateDataPath(dataKey, dataFields);
        const valueCurrent: any = this.Application.Solver.ResolveDataObjectPathObject(data, dataPath);
        if (valueCurrent != value) {
            const sector: string = this.Application.Document.GetSector(el);
            //Update
            if ((dataPath.length === 1) && (contextItem !== null) && (dataPath[0] === dataKey)) //Its only a data value
                await this.Application.Storage.SetDataKeyField(dataKey, sector, dataFields, value, false);
            else
                this.Application.Solver.UpdateDataPathObject(data, dataPath, value);
            //Mark as Updated
            await this.Application.Storage.FlagDataItemAsUpdated(dataKey, sector, index, false);
            //On Model Change
            await this.Application.ModelHandler.ResolveOnModelChange(contextItem, el);
            //Notify
            await this.Application.Observer.Notify(dataKey, index, dataFields);
        }
        //On Model Complete
        await this.Application.ModelHandler.ResolveOnModelComplete(contextItem, el);
        return (true);
    }

    public async BindIncremental(elj: JQuery, dataKey: string, sector: string, isIncremental: boolean): Promise<void> {
        if ((elj == null) || (elj.length == 0))
            return (null);
        const el: HTMLElement = elj[0];
        const application: DrapoApplication = this.Application;
        //Subscribe Increment
        if (!isIncremental)
            application.Observer.SubscribeIncremental(el, dataKey);
        //Find Parent Scroll Vertical
        const elParent: HTMLElement = this.GetParentElementWithScrollVertical(el);
        if ((elParent === null) || (!this.IsElementScrollVisible(elParent))) {
            //There is no scroll yeat. We need more data
            if (!await this.Application.Storage.CanGrowData(dataKey, sector))
                return;
            if (!await this.Application.Storage.GrowData(dataKey, sector))
                return;
            await this.Application.Observer.NotifyIncremental(dataKey);
            return;
        }
        const isRoot = (elParent.tagName === 'HTML') || (elParent.tagName === 'BODY');
        const eljParent: JQuery = $(elParent);
        const binder: JQuery = isRoot ? $(window) : eljParent;
        //Bind
        const dataKeyLocal: string = dataKey;
        const sectorLocal: string = sector;
        const eventNamespace: string = this.Application.EventHandler.CreateEventNamespace(el, null, 'scroll', 'incremental');
        binder.unbind(eventNamespace);
        binder.bind(eventNamespace, (e) => {
            // tslint:disable-next-line:no-floating-promises
            application.Binder.BindIncrementalScroll(binder, eventNamespace, eljParent, dataKeyLocal, sector);
        });
    }

    public async BindIncrementalScroll(binder: JQuery, eventNamespace: string, eljParent: JQuery, dataKey: string, sector: string): Promise<boolean> {
        if ((!this.Application.Observer.IsEnabledNotifyIncremental) || (!this.IsElementScrollVerticalAlmostEnd(eljParent)))
            return (true);
        if (!await this.Application.Storage.CanGrowData(dataKey, sector)) {
            binder.unbind(eventNamespace);
            return (false);
        }
        if (!await this.Application.Storage.GrowData(dataKey, sector))
            return (true);
        await this.Application.Observer.NotifyIncremental(dataKey);
        return (true);
    }

    private GetEventValue(eventType: string, e: JQueryEventObject): any {
        const tag: string = e.target.tagName.toLowerCase();
        if (tag == 'input')
            return (this.GetEventValueInput(eventType, e));
        if (tag == 'select')
            return ((e.target as HTMLSelectElement).value);
        if (tag == 'textarea')
            return ($(e.target).val());
        return (null);
    }

    private GetEventValueInput(eventType: string, e: JQueryEventObject): any {
        const el: HTMLElement = e.target as HTMLElement;
        const elementJQuery: JQuery = $(el);
        const type: string = el.getAttribute('type');
        if (type == 'checkbox')
            return (elementJQuery.prop('checked'));
        return (elementJQuery.val());
    }

    private GetParentElementWithScrollVertical(el: HTMLElement): HTMLElement {
        let elParent: HTMLElement = null;
        while ((elParent = el.parentElement) != null) {
            if (this.HasElementVerticalScroll(elParent))
                return (elParent);
            el = elParent;
        }
        return (null);
    }

    private IsElementScrollVisible(el: HTMLElement): boolean {
        return (el.scrollHeight !== el.clientHeight);
    }

    private HasElementVerticalScroll(el: HTMLElement): boolean {
        const style: CSSStyleDeclaration = window.getComputedStyle(el);
        const overflow: string = style.getPropertyValue('overflow');
        if (overflow === 'auto')
            return (true);
        const elj: JQuery = $(el);
        if (elj.scrollTop())
            return (true);
        elj.scrollTop(1);
        if (!elj.scrollTop())
            return (false);
        elj.scrollTop(0);
        return (true);
    }

    public IsElementScrollVerticalAlmostEnd(el: JQuery): boolean {
        const scrollTop: number = el.scrollTop();
        if (scrollTop == null)
            return (false);
        const clientHeight = el[0].clientHeight;
        const scrollHeight = el[0].scrollHeight;
        const remaining: number = scrollHeight - (scrollTop + clientHeight);
        return (remaining < 50);
    }

    public BindControlFlowViewport(viewport: DrapoViewport) : void
    {
        const application: DrapoApplication = this.Application;
        const viewportCurrent: DrapoViewport = viewport;
        const binder: JQuery = $(viewport.ElementScroll);
        const eventNamespace: string = this.Application.EventHandler.CreateEventNamespace(null, null, 'scroll', 'viewport');
        binder.unbind(eventNamespace);
        binder.bind(eventNamespace, (e) => {
            // tslint:disable-next-line:no-floating-promises
            application.Binder.BindControlFlowViewportScroll(viewportCurrent);
        });
    }

    public async BindControlFlowViewportScroll(viewport: DrapoViewport): Promise<void> {
        clearTimeout(viewport.EventScrollTimeout);
        viewport.EventScrollTimeout = setTimeout(async () => {
            clearTimeout(viewport.EventScrollTimeout);
            try {
                await this.Application.ControlFlow.ResolveControlFlowForViewportScroll(viewport);
            } catch (e) {
                await this.Application.ExceptionHandler.Handle(e, 'DrapoBinder - BindControlFlowViewportScroll');
            }
        }, 50);
    }
}

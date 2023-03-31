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

    public BindReaderWriter(contextItem: DrapoContextItem, el: HTMLElement, dataFields: string[], eventTypes: string[], eventTypesCancel: string[] = null, canNotify: boolean): void {
        if (contextItem === null)
            return;
        if (el === null)
            return;
        this.BindReader(contextItem, el, dataFields);
        this.BindWriter(contextItem, el, dataFields, eventTypes, eventTypesCancel, canNotify);
    }

    public BindReader(contextItem: DrapoContextItem, el: HTMLElement, dataFields: string[]): void {
        if ((contextItem === null) || (contextItem.ElementForTemplate !== null))
            return;
        if (el === null)
            return;
        this.Application.Observer.SubscribeBarber(el, contextItem.DataKey, dataFields);
    }

    public BindWriter(contextItem: DrapoContextItem, el: HTMLElement, dataFields: string[], eventTypes: string[], eventTypesCancel: string[], canNotify: boolean): void {
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
            const debounceTimeout: number = this.Application.EventHandler.GetEventDebounce(el, eventType);
            let delayTimeout: number = null;
            const canNotifyLocal: boolean = canNotify;
            this.Application.EventHandler.DetachEventListener(el, eventNamespace);
            this.Application.EventHandler.AttachEventListener(el, eventType, eventNamespace, (e:Event) => {
                if (debounceTimeout == null) {
                    // tslint:disable-next-line:no-floating-promises
                    application.Binder.BindWriterEvent(e, eventType, eventFilter, contextItem, el, dataFields, data, dataKey, index, canNotify);
                } else {
                    if (delayTimeout != null)
                        clearTimeout(delayTimeout);
                    delayTimeout = setTimeout(() => {
                        clearTimeout(delayTimeout);
                        delayTimeout = null;
                        // tslint:disable-next-line:no-floating-promises
                        application.Binder.BindWriterEvent(e, eventType, eventFilter, contextItem, el, dataFields, data, dataKey, index, canNotify);
                    }, debounceTimeout);
                }
            });
        }
        //Cancel
        if ((eventTypesCancel) != null) {
            for (let i: number = 0; i < eventTypesCancel.length; i++) {
                const event: [string, string] = application.Parser.ParseEvent(eventTypesCancel[i]);
                const eventType: string = event[0];
                const eventFilter: string = event[1];
                const eventNamespace: string = this.Application.EventHandler.CreateEventNamespace(null, null, eventType, 'modelCancel');
                this.Application.EventHandler.DetachEventListener(el, eventNamespace);
                this.Application.EventHandler.AttachEventListener(el, eventType, eventNamespace, (e: Event) => {
                    if (!this.Application.EventHandler.IsValidEventFilter(e, eventFilter))
                        return (true);
                    const dataPath: string[] = this.Application.Solver.CreateDataPath(dataKey, dataFields);
                    const valueCurrent: any = this.Application.Solver.ResolveDataObjectPathObject(data, dataPath);
                    const valueBefore: string = this.Application.Document.GetValue(el);
                    if (valueCurrent == valueBefore)
                        return (true);
                    this.Application.Document.SetValue(el,valueCurrent);
                    return (false);
                });
            }
        }
    }

    public async BindWriterEvent(e: Event, eventType: string, eventFilter: string, contextItem: DrapoContextItem, el: HTMLElement, dataFields: string[], data: any, dataKey: string, index: number, canNotify: boolean): Promise<boolean> {
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
            if (canNotify)
                await this.Application.Observer.Notify(dataKey, index, dataFields);
        }
        //On Model Complete
        await this.Application.ModelHandler.ResolveOnModelComplete(contextItem, el);
        return (true);
    }

    public async BindIncremental(el: HTMLElement, dataKey: string, sector: string, isIncremental: boolean): Promise<void> {
        if (el == null)
            return (null);
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
        const binder: HTMLElement | Window = isRoot ? window : elParent;
        //Bind
        const dataKeyLocal: string = dataKey;
        const sectorLocal: string = sector;
        const eventType: string = 'scroll';
        const eventNamespace: string = this.Application.EventHandler.CreateEventNamespace(el, null, eventType, 'incremental');
        this.Application.EventHandler.DetachEventListener(el, eventNamespace);
        this.Application.EventHandler.AttachEventListener(binder, eventType, eventNamespace, (e: Event) => {
            // tslint:disable-next-line:no-floating-promises
            application.Binder.BindIncrementalScroll(binder, eventNamespace, elParent, dataKeyLocal, sector);
        });
    }

    public async BindIncrementalScroll(binder: HTMLElement | Window, eventNamespace: string, elParent: HTMLElement, dataKey: string, sector: string): Promise<boolean> {
        if ((!this.Application.Observer.IsEnabledNotifyIncremental) || (!this.IsElementScrollVerticalAlmostEnd(elParent)))
            return (true);
        if (!await this.Application.Storage.CanGrowData(dataKey, sector)) {
            this.Application.EventHandler.DetachEventListener(binder, eventNamespace);
            return (false);
        }
        if (!await this.Application.Storage.GrowData(dataKey, sector))
            return (true);
        await this.Application.Observer.NotifyIncremental(dataKey);
        return (true);
    }

    private GetEventValue(eventType: string, e: Event): any {
        const target: HTMLElement = e.target as HTMLElement;
        const tag: string = target.tagName.toLowerCase();
        if (tag == 'input')
            return (this.GetEventValueInput(eventType, e));
        if (tag == 'select')
            return ((e.target as HTMLSelectElement).value);
        if (tag == 'textarea')
            return (this.Application.Document.GetValue(e.target as HTMLElement));
        return (null);
    }

    private GetEventValueInput(eventType: string, e: Event): any {
        const el: HTMLElement = e.target as HTMLElement;
        const type: string = el.getAttribute('type');
        if (type == 'checkbox')
            return (this.Application.Document.GetProperty(el, 'checked'));
        return (this.Application.Document.GetValue(el));
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
        if (el.scrollTop)
            return (true);
        el.scrollTop = 1;
        if (!el.scrollTop)
            return (false);
        el.scrollTop = 0;
        return (true);
    }

    public IsElementScrollVerticalAlmostEnd(el: HTMLElement): boolean {
        const scrollTop: number = el.scrollTop;
        if (scrollTop == null)
            return (false);
        const clientHeight = el.clientHeight;
        const scrollHeight = el.scrollHeight;
        const remaining: number = scrollHeight - (scrollTop + clientHeight);
        return (remaining < 50);
    }

    public UnbindControlFlowViewport(viewport: DrapoViewport): void {
        const binder: HTMLElement = viewport.ElementScroll;
        const eventNamespace: string = this.Application.EventHandler.CreateEventNamespace(null, null, 'scroll', 'viewport');
        this.Application.EventHandler.DetachEventListener(binder, eventNamespace);
    }

    public BindControlFlowViewport(viewport: DrapoViewport) : void
    {
        const application: DrapoApplication = this.Application;
        const viewportCurrent: DrapoViewport = viewport;
        const binder: HTMLElement = viewport.ElementScroll;
        const eventType: string = 'scroll';
        const eventNamespace: string = this.Application.EventHandler.CreateEventNamespace(null, null, eventType, 'viewport');
        this.Application.EventHandler.DetachEventListener(binder, eventNamespace);
        this.Application.EventHandler.AttachEventListener(binder, eventType, eventNamespace, (e: Event) => {
            // tslint:disable-next-line:no-floating-promises
            application.Binder.BindControlFlowViewportScroll(viewportCurrent);
        });
    }

    public async BindControlFlowViewportScroll(viewport: DrapoViewport): Promise<void> {
        clearTimeout(viewport.EventScrollTimeout);
        viewport.EventScrollTimeout = setTimeout(async () => {
            clearTimeout(viewport.EventScrollTimeout);
            try {
                while (viewport.Busy) {
                    await this.Application.Document.Sleep(50);
                }
                viewport.Busy = true;
                await this.Application.ControlFlow.ResolveControlFlowForViewportScroll(viewport);
                viewport.Busy = false;
            } catch (e) {
                await this.Application.ExceptionHandler.Handle(e, 'DrapoBinder - BindControlFlowViewportScroll');
            }
        }, 50);
    }
}

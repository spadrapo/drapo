class DrapoBehaviorHandler {
    //Field
    private _application: DrapoApplication;
    private _drag: DrapoDrag;

    //Properties
    get Application(): DrapoApplication {
        return (this._application);
    }

    //Constructors
    constructor(application: DrapoApplication) {
        this._application = application;
    }

    public HasContentBehaviorContext(content: string): boolean {
        return ((content.indexOf('d-dragstart') > -1) || (content.indexOf('d-dragend') > -1) || (content.indexOf('d-resize-location') > -1));
    }

    public async ResolveBehavior(el: HTMLElement, canBind: boolean = true, canSubscribeDelay: boolean = true, dataKeyFilter: string = null, dataFieldFilter: string = null): Promise<void> {
        this.ResolveBehaviorDragStart(el);
        await this.ResolveBehaviorDragEnd(el);
        await this.ResolveBehaviorResize(el, canBind, canSubscribeDelay, dataKeyFilter, dataFieldFilter);
    }

    public async ResolveBehaviorContext(context: DrapoContext, element: HTMLElement, canBind: boolean): Promise<void> {
        await this.ResolveBehaviorDragStartContext(context, element, canBind);
        await this.ResolveBehaviorDragEndContext(context, element, canBind);
        await this.ResolveBehaviorResizeContext(context, element, canBind);
    }

    private ResolveBehaviorDragStart(el: HTMLElement): void {
        const dragStartAttribute: string = el.getAttribute('d-dragStart');
        if ((dragStartAttribute === null) || (dragStartAttribute === undefined))
            return;
        const dragActionAttribute: string = el.getAttribute('d-dragAction');
        if (dragActionAttribute !== 'barber')
            return;
        const sector: string = this.Application.Document.GetSector(el);
        const onBefore: string = el.getAttribute('d-dragOnBeforeStart');
        const onAfter: string = el.getAttribute('d-dragOnAfterEnd');
        const application: DrapoApplication = this.Application;
        const drag: DrapoDrag = this.CreateDrag(dragActionAttribute, null, null, this.Application.Parser.ParseTags(dragStartAttribute), false, null, sector, onBefore, onAfter);
        el.setAttribute('draggable', 'true');
        //Drag Start
        const eventType: string = 'dragstart';
        const eventNamespace: string = this.Application.EventHandler.CreateEventNamespace(null, null, eventType, 'drag');
        this.Application.EventHandler.DetachEventListener(el, eventNamespace);
        this.Application.EventHandler.AttachEventListener(el, eventType, eventNamespace, (e: any) => {
            application.BehaviorHandler.SetDrag(drag);
            e.originalEvent.dataTransfer.effectAllowed = 'move';
            e.originalEvent.dataTransfer.setData('text', drag.Code);
        });
    }

    private async ResolveBehaviorDragEnd(el: HTMLElement): Promise<void> {
        const dragEndAttribute: string = el.getAttribute('d-dragEnd');
        if ((dragEndAttribute === null) || (dragEndAttribute === undefined))
            return;
        const dragActionAttribute: string = el.getAttribute('d-dragAction');
        if (dragActionAttribute !== 'barber')
            return;
        const notifyText: string = el.getAttribute('d-dragNotify');
        const notify: boolean = ((notifyText == null) || (notifyText == '')) ? true : await this.Application.Solver.ResolveConditional(notifyText);
        const onBefore: string = el.getAttribute('d-dragOnBeforeStart');
        const onAfter: string = el.getAttribute('d-dragOnAfterEnd');
        const application: DrapoApplication = this.Application;
        const tags: string[] = this.Application.Parser.ParseTags(dragEndAttribute);
        const sector = this.Application.Document.GetSector(el);
        //Drag Over
        const eventTypeDragover: string = 'dragover';
        const eventNamespaceDragover: string = this.Application.EventHandler.CreateEventNamespace(null, null, eventTypeDragover, 'drag');
        this.Application.EventHandler.DetachEventListener(el, eventNamespaceDragover);
        this.Application.EventHandler.AttachEventListener(el, eventTypeDragover, eventNamespaceDragover, (e: any) => {
            e.preventDefault();
            const drag: DrapoDrag = application.BehaviorHandler.GetDrag();
            if (!application.BehaviorHandler.IsDragMatch(drag, e.originalEvent.dataTransfer.getData('Text'), tags))
                return;
            e.originalEvent.dataTransfer.dropEffect = 'move';
        });
        //Drop
        const eventTypeDrop: string = 'drop';
        const eventNamespaceDrop: string = this.Application.EventHandler.CreateEventNamespace(null, null, eventTypeDrop, 'drag');
        this.Application.EventHandler.DetachEventListener(el, eventNamespaceDrop);
        this.Application.EventHandler.AttachEventListener(el, eventTypeDrop, eventNamespaceDrop, (e: any) => {
            // tslint:disable-next-line:no-floating-promises
            application.BehaviorHandler.ResolveBehaviorDragEndDrop(e, null, tags, notify, null, sector, onBefore, onAfter);
        });
    }

    private async ResolveBehaviorDragStartContext(context: DrapoContext, el: HTMLElement, canBind: boolean): Promise<void> {
        const dragStartAttribute: string = el.getAttribute('d-dragStart');
        if ((dragStartAttribute === null) || (dragStartAttribute === undefined))
            return;
        let dragActionAttribute: string = el.getAttribute('d-dragAction');
        if ((dragActionAttribute === null) || (dragActionAttribute === undefined))
            dragActionAttribute = 'move';
        if (dragActionAttribute === 'barber')
            return;
        let custom: string = null;
        if (dragActionAttribute === 'custom')
            custom = el.getAttribute('d-dragActionCustom');
        const notifyText: string = el.getAttribute('d-dragNotify');
        const notify: boolean = ((notifyText == null) || (notifyText == '')) ? true : await this.Application.Solver.ResolveConditional(notifyText);
        const dataKey: string = el.getAttribute('d-dragStartDataKey');
        const sector: string = this.Application.Document.GetSector(el);
        const onBefore: string = el.getAttribute('d-dragOnBeforeStart');
        const onAfter: string = el.getAttribute('d-dragOnAfterEnd');
        const application: DrapoApplication = this.Application;
        const drag: DrapoDrag = this.CreateDrag(dragActionAttribute, custom, context.Item, this.Application.Parser.ParseTags(dragStartAttribute), notify, dataKey, sector, onBefore, onAfter);
        el.setAttribute('draggable', 'true');
        //Drag Start
        const eventType: string = 'dragstart';
        const eventNamespace: string = this.Application.EventHandler.CreateEventNamespace(null, null, eventType, 'drag');
        this.Application.EventHandler.DetachEventListener(el, eventNamespace);
        this.Application.EventHandler.AttachEventListener(el, eventType, eventNamespace, (e: any) => {
            application.BehaviorHandler.SetDrag(drag);
            e.originalEvent.dataTransfer.effectAllowed = 'move';
            e.originalEvent.dataTransfer.setData('text', drag.Code);
        });
    }

    private async ResolveBehaviorDragEndContext(context: DrapoContext, el: HTMLElement, canBind: boolean): Promise<void> {
        const dragEndAttribute: string = el.getAttribute('d-dragEnd');
        if ((dragEndAttribute === null) || (dragEndAttribute === undefined))
            return;
        const dragActionAttribute: string = el.getAttribute('d-dragAction');
        if (dragActionAttribute === 'barber')
            return;
        const notifyText: string = el.getAttribute('d-dragNotify');
        const notify: boolean = ((notifyText == null) || (notifyText == '')) ? true : await this.Application.Solver.ResolveConditional(notifyText);
        const dataKey: string = el.getAttribute('d-dragEndDataKey');
        const onBefore: string = el.getAttribute('d-dragOnBeforeStart');
        const onAfter: string = el.getAttribute('d-dragOnAfterEnd');
        const application: DrapoApplication = this.Application;
        const item: DrapoContextItem = context.Item;
        const tags: string[] = this.Application.Parser.ParseTags(dragEndAttribute);
        const sector = this.Application.Document.GetSector(el);
        //Drag Over
        const eventTypeDragover: string = 'dragover';
        const eventNamespaceDragover: string = this.Application.EventHandler.CreateEventNamespace(null, null, eventTypeDragover, 'drag');
        this.Application.EventHandler.DetachEventListener(el, eventNamespaceDragover);
        this.Application.EventHandler.AttachEventListener(el, eventTypeDragover, eventNamespaceDragover, (e: any) => {
            e.preventDefault();
            const drag: DrapoDrag = application.BehaviorHandler.GetDrag();
            if (!application.BehaviorHandler.IsDragMatch(drag, e.originalEvent.dataTransfer.getData('Text'), tags))
                return;
            e.originalEvent.dataTransfer.dropEffect = 'move';
        });
        //Drop
        const eventTypeDrop: string = 'drop';
        const eventNamespaceDrop: string = this.Application.EventHandler.CreateEventNamespace(null, null, eventTypeDrop, 'drag');
        this.Application.EventHandler.DetachEventListener(el, eventNamespaceDrop);
        this.Application.EventHandler.AttachEventListener(el, eventTypeDrop, eventNamespaceDrop, (e: any) => {
            // tslint:disable-next-line:no-floating-promises
            application.BehaviorHandler.ResolveBehaviorDragEndDrop(e, item, tags, notify, dataKey, sector, onBefore, onAfter);
        });
    }

    public async ResolveBehaviorDragEndDrop(e: any, item: DrapoContextItem, tags: string[], notify: boolean, dataKey: string, sector: string, onBefore: string, onAfter: string): Promise<void> {
        e.preventDefault();
        const dragBefore: DrapoDrag = this.GetDrag();
        if (!this.IsDragMatch(dragBefore, e.originalEvent.dataTransfer.getData('Text'), tags))
            return;
        this.SetDrag(null);
        const dragAfter: DrapoDrag = this.CreateDrag(null, null, item, tags, notify, dataKey, sector, onBefore, onAfter);
        //DataKeys
        if (dragBefore.DataKey !== null)
            await this.Application.Storage.UpdateData(dragBefore.DataKey, sector, dragBefore.Item.Data);
        if (dragAfter.DataKey !== null)
            await this.Application.Storage.UpdateData(dragAfter.DataKey, sector, dragAfter.Item.Data);
        await this.ResolveBehaviorDragStartOnBefore(dragBefore, dragAfter);
        //Move
        if (this.IsMoveDrag(dragBefore, dragAfter)) {
            await this.MoveDrag(dragBefore, dragAfter);
        } else if (this.IsSwapDrag(dragBefore, dragAfter)) { //Swap
            this.SwapDrag(dragBefore, dragAfter);
        } else if (this.IsCustomDrag(dragBefore, dragAfter)) { //Custom
            await this.CustomDrag(dragBefore, dragAfter);
        }
        await this.ResolveBehaviorDragEndOnAfter(dragBefore, dragAfter);
    }

    public async ResolveBehaviorDragStartOnBefore(dragBefore: DrapoDrag, dragAfter: DrapoDrag): Promise<void> {
        //OnBefore Start
        if (dragBefore.OnBefore != null)
            await this.Application.FunctionHandler.ResolveFunctionWithoutContext(dragBefore.Sector, dragBefore.Item.Element, dragBefore.OnBefore);
        //OnBefore End
        if ((dragAfter.OnBefore != null) && (dragAfter.OnBefore != dragBefore.OnBefore))
            await this.Application.FunctionHandler.ResolveFunctionWithoutContext(dragAfter.Sector, dragAfter.Item.Element, dragAfter.OnBefore);
    }

    public async ResolveBehaviorDragEndOnAfter(dragBefore: DrapoDrag, dragAfter: DrapoDrag): Promise<void> {
        //OnAfter Start
        if (dragBefore.OnAfter != null)
            await this.Application.FunctionHandler.ResolveFunctionWithoutContext(dragBefore.Sector, dragBefore.Item.Element, dragBefore.OnAfter);
        //OnAfter End
        if ((dragAfter.OnAfter != null) && (dragAfter.OnAfter != dragBefore.OnAfter))
            await this.Application.FunctionHandler.ResolveFunctionWithoutContext(dragAfter.Sector, dragAfter.Item.Element, dragAfter.OnAfter);
    }

    public GetDrag(): DrapoDrag {
        return (this._drag);
    }

    public SetDrag(drag: DrapoDrag): void {
        this._drag = drag;
    }

    private IsDragMatch(drag: DrapoDrag, code: string, tags: string[]): boolean {
        if (drag === null)
            return (false);
        if (drag.Code !== code)
            return (false);
        if (!drag.IsMatch(tags))
            return (false);
        return (true);
    }

    private CreateDrag(action: string, custom: string, item: DrapoContextItem, tags: string[], notify: boolean, dataKey: string, sector: string, onBefore: string, onAfter: string): DrapoDrag {
        const drag: DrapoDrag = new DrapoDrag();
        drag.Code = this.Application.Document.CreateGuid();
        drag.Action = action;
        drag.Custom = custom;
        drag.Item = item;
        drag.Tags = tags;
        drag.Notify = notify;
        drag.DataKey = dataKey;
        drag.Sector = sector;
        drag.OnBefore = onBefore;
        drag.OnAfter = onAfter;
        return (drag);
    }

    private IsMoveDrag(dragBefore: DrapoDrag, dragAfter: DrapoDrag): boolean {
        return (dragBefore.Action === 'move');
    }

    private async MoveDrag(dragBefore: DrapoDrag, dragAfter: DrapoDrag): Promise<boolean> {
        if (this.IsInternalDrag(dragBefore, dragAfter))
            return (this.Application.Storage.MoveDataItem(dragAfter.Item.DataKey, dragAfter.Sector, dragBefore.Item.Data, dragAfter.Item.Data, dragAfter.Notify));
        return (false);
    }

    private IsInternalDrag(dragBefore: DrapoDrag, dragAfter: DrapoDrag): boolean {
        return (dragBefore.Item.DataKey === dragAfter.Item.DataKey);
    }

    private IsSwapDrag(dragBefore: DrapoDrag, dragAfter: DrapoDrag): boolean {
        return (dragBefore.Action === 'swap');
    }

    private SwapDrag(dragBefore: DrapoDrag, dragAfter: DrapoDrag): boolean {
        //TODO: Work over here
        return (false);
    }

    private IsCustomDrag(dragBefore: DrapoDrag, dragAfter: DrapoDrag): boolean {
        return (dragBefore.Action === 'custom');
    }

    private async CustomDrag(dragBefore: DrapoDrag, dragAfter: DrapoDrag): Promise<boolean> {
        await this.Application.FunctionHandler.ResolveFunctionWithoutContext(dragBefore.Sector, dragBefore.Item.Element, dragBefore.Custom);
        return (true);
    }

    private async ResolveBehaviorResizeContext(context: DrapoContext, el: HTMLElement, canBind: boolean): Promise<void> {
        const resizeLocation: string = el.getAttribute('d-resize-location');
        if (resizeLocation == null)
            return;
        return (this.ResolveBehaviorResizeInternal(context, el, canBind, resizeLocation));
    }

    public async ResolveBehaviorResize(el: HTMLElement, canBind: boolean = true, canSubscribeDelay: boolean = true, dataKeyFilter: string = null, dataFieldFilter: string = null): Promise<void> {
        const resizeLocation: string = el.getAttribute('d-resize-location');
        if (resizeLocation == null)
            return;
        const context: DrapoContext = new DrapoContext();
        return (await this.ResolveBehaviorResizeInternal(context, el, canBind, resizeLocation));
    }

    private async ResolveBehaviorResizeInternal(context: DrapoContext, el: HTMLElement, canBind: boolean, resizeLocation: string): Promise<void> {
        const resizeModel: string = el.getAttribute('d-resize-model');
        const resizeClass: string = el.getAttribute('d-resize-class');
        let resizeType: string = el.getAttribute('d-resize-type');
        if (resizeType == null)
            resizeType = 'normal';
        const resizeContainer: number = this.Application.Parser.ParseNumber(el.getAttribute('d-resize-container'), 2);
        const resizePreview: boolean = this.Application.Parser.ParseBoolean(el.getAttribute('d-resize-preview'), false);
        const resizer: DrapoResize = this.CreateResize(context.Item, el, resizeModel, resizeLocation, resizeType, resizeClass, resizePreview, resizeContainer);
        const application: DrapoApplication = this.Application;
        const eventTypeMousedown: string = 'mousedown';
        const eventTypeMousemove: string = 'mousemove';
        const eventTypeMouseup: string = 'mouseup';
        const eventNamespaceMousedown: string = this.Application.EventHandler.CreateEventNamespace(el, null, eventTypeMousedown, resizer.Code);
        const eventNamespaceMouseMove: string = this.Application.EventHandler.CreateEventNamespace(el, null, eventTypeMousemove, resizer.Code);
        const eventNamespaceMouseUp: string = this.Application.EventHandler.CreateEventNamespace(el, null, eventTypeMouseup, resizer.Code);
        this.Application.EventHandler.DetachEventListener(el, eventNamespaceMousedown);
        this.Application.EventHandler.AttachEventListener(el, eventTypeMousedown, eventNamespaceMousedown, (e: any) => {
            const container: HTMLElement = resizer.Container;
            if (resizer.Preview) {
                application.EventHandler.AttachEventListener(container, eventTypeMousemove, eventNamespaceMouseMove, (ev: any) => {
                    // tslint:disable-next-line:no-floating-promises
                    application.BehaviorHandler.ResolveBehaviorResizeContinue(resizer, ev);
                });
            }
            application.EventHandler.AttachEventListener(container, eventTypeMouseup, eventNamespaceMouseUp,(ev: any) => {
                // tslint:disable-next-line:no-floating-promises
                application.BehaviorHandler.ResolveBehaviorResizeFinish(resizer, ev);
                if (resizer.Preview)
                    application.EventHandler.DetachEventListener(container, eventNamespaceMouseMove);
                application.EventHandler.DetachEventListener(container, eventNamespaceMouseUp);
            });
            // tslint:disable-next-line:no-floating-promises
            application.BehaviorHandler.ResolveBehaviorResizeStart(resizer, e);
        });
    }

    private CreateResize(item: DrapoContextItem, element: HTMLElement, model: string, location: string, type: string, resizeClass: string, preview: boolean, container: number): DrapoResize {
        const resizer: DrapoResize = new DrapoResize();
        resizer.Code = this.Application.Document.CreateGuid();
        resizer.Item = item;
        resizer.Element = element;
        resizer.Model = model;
        resizer.Location = location;
        resizer.Type = type;
        resizer.Class = resizeClass;
        resizer.Preview = preview;
        resizer.Parent = resizer.Element.parentElement;
        resizer.Container = this.Application.EventHandler.GetElementParent(resizer.Element, container);
        return (resizer);
    }

    private async ResolveBehaviorResizeStart(resizer: DrapoResize, e: any): Promise<void> {
        const sizeUnit: string = this.GetSize(resizer);
        resizer.UnitStart = this.GetSizeUnit(sizeUnit);
        resizer.SizeStart = this.GetSizeValue(resizer.UnitStart, sizeUnit);
        resizer.EventStartValue = this.GetResizerEventValue(resizer, e);
        resizer.EventCurrentValue = null;
        if (resizer.Class !== null)
            resizer.Container.classList.add(resizer.Class);
    }

    private async ResolveBehaviorResizeContinue(resizer: DrapoResize, e: any): Promise<void> {
        if (resizer.EventStartValue == null)
            return;
        resizer.EventCurrentValue = this.GetResizerEventValue(resizer, e);
        this.ApplySizeNew(resizer);
    }

    private async ResolveBehaviorResizeFinish(resizer: DrapoResize, e: any): Promise<void> {
        if (resizer.EventStartValue == null)
            return;
        resizer.EventCurrentValue = this.GetResizerEventValue(resizer, e);
        const sizeNew: Number = this.ApplySizeNew(resizer);
        resizer.EventStartValue = null;
        if (resizer.Class !== null)
            resizer.Container.classList.remove(resizer.Class);
        if (resizer.Model === null)
            return;
        const dataPath: string[] = this.Application.Parser.ParseMustache(resizer.Model);
        await this.Application.Solver.UpdateItemDataPathObject(this.Application.Document.GetSector(resizer.Element), resizer.Item, null, dataPath, sizeNew, true);
    }

    private GetSize(resizer: DrapoResize): string {
        if (resizer.Location == 'bootstrap') {
            const classAttribute: string = resizer.Parent.getAttribute('class');
            const classesAttribute: string[] = this.Application.Parser.Tokenize(classAttribute);
            for (let i: number = 0; i < classesAttribute.length; i++) {
                const classCurrent: string = classesAttribute[i];
                if (this.IsClassBootstrap(classCurrent))
                    return (classCurrent);
            }
            return (null);
        } else {
            return (this.Application.Stylist.GetElementStyleProperty(resizer.Parent,'width'));
        }
    }

    private GetSizeUnit(size: string): string {
        if (this.EndsWith(size, '%'))
            return ('%');
        if (this.EndsWith(size, 'px'))
            return ('px');
        if (this.IsClassBootstrap(size)) {
            const parts: string[] = this.Application.Parser.Tokenize(size, '-');
            if (parts.length < 3)
                return ('');
            return (parts[parts.length - 2]);
        }
        throw new Error('Size unit not supported: ' + size);
    }

    private IsClassBootstrap(data: string): boolean {
        return (data.indexOf('col-') === 0);
    }

    private CreateClassBootstrap(type: string, size: number): string {
        let className: string = 'col-';
        if (type != '')
            className = className + type + '-';
        className = className + size;
        return (className);
    }

    private EndsWith(data: string, endsWith: string): boolean {
        const size: number = endsWith.length;
        const diff: number = data.length - size;
        for (let i: number = 0; i < size; i++)
            if (endsWith[i] !== data[i + diff])
                return (false);
        return (true);
    }

    private GetSizeValue(unit: string, sizeUnit: string): number {
        if (this.IsClassBootstrap(sizeUnit)) {
            const parts: string[] = this.Application.Parser.Tokenize(sizeUnit, '-');
            return (Number(parts[parts.length - 1]));
        }
        const valueString: string = sizeUnit.substr(0, sizeUnit.length - (unit.length));
        return (Number(valueString));
    }

    private GetSizeStartWithOffset(resizer: DrapoResize): number {
        const offset: number = this.GetResizerOffset(resizer);
        return (resizer.SizeStart + offset);
    }

    private GetResizerOffset(resizer: DrapoResize): number {
        const start: number = resizer.EventStartValue;
        const end: number = resizer.EventCurrentValue;
        if (resizer.Type === 'reverse')
            return (start - end);
        return (end - start);
    }

    private GetResizerEventValue(resizer: DrapoResize, event: any): number {
        if (resizer.Location === 'height')
            return (event.originalEvent.pageY);
        return (event.originalEvent.pageX);
    }

    private ApplySizeNew(resizer: DrapoResize): number {
        if (resizer.Location === 'bootstrap') {
            const sizeBase: string = this.Application.Stylist.GetElementStyleProperty(resizer.Parent,'width');
            const sizeBaseUnit = this.GetSizeUnit(sizeBase);
            const sizeBaseValue: number = this.GetSizeValue(sizeBaseUnit, sizeBase);
            const sizeBaseValueOne: number = sizeBaseValue / resizer.SizeStart;
            const sizeOffset: number = this.GetResizerOffset(resizer);
            const valueOffset: number = Math.round(sizeOffset / sizeBaseValueOne);
            if (valueOffset === 0)
                return (0);
            const valueNew: number = resizer.SizeStart + valueOffset;
            const classRemove: string = this.CreateClassBootstrap(resizer.UnitStart, resizer.SizeStart);
            const classInsert: string = this.CreateClassBootstrap(resizer.UnitStart, valueNew);
            resizer.Parent.classList.remove(classRemove);
            resizer.Parent.classList.add(classInsert);
            return (valueNew);
        } else {
            const sizeNew: number = this.GetSizeStartWithOffset(resizer);
            if (sizeNew === null)
                return (null);
            this.Application.Stylist.SetElementStyleProperty(resizer.Parent,resizer.Location, sizeNew + resizer.Unit);
            return (sizeNew);
        }
    }
}
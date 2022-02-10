class DrapoViewportHandler {
    private _application: DrapoApplication;
    private _viewportPropertyName: string = 'viewport';

    //Properties
    get Application(): DrapoApplication {
        return (this._application);
    }

    //Constructors
    constructor(application: DrapoApplication) {
        this._application = application;
    }

    public CreateViewportControlFlow(sector: string, el: HTMLElement, elTemplate: HTMLElement, dataKey: string, key: string, dataKeyIteratorRange: string, data: any[]): DrapoViewport {
        const scroll: [HTMLElement, number, number] = this.GetScrollViewport(el);
        if (scroll == null)
            return (null);
        const viewportBefore: DrapoViewport = this.GetElementViewport(el);
        if (viewportBefore != null) {
            viewportBefore.IsActive = true;
            return (viewportBefore);
        }
        const elScroll: HTMLElement = scroll[0];
        const height: number = this.GetElementHeight(elScroll);
        if (height == null)
            return (null);
        const viewport: DrapoViewport = new DrapoViewport();
        viewport.Sector = sector;
        viewport.Element = el;
        viewport.ElementTemplate = elTemplate;
        viewport.ElementScroll = elScroll;
        viewport.DataKey = dataKey;
        viewport.Key = key;
        viewport.DataKeyIteratorRange = dataKeyIteratorRange;
        viewport.Data = data;
        viewport.HeightScroll = height;
        viewport.HeightBefore = scroll[1];
        viewport.HeightAfter = scroll[2];
        viewport.HeightBallonBefore = 0;
        viewport.HeightBallonAfter = 0;
        viewport.DataStart = 0;
        viewport.DataEnd = data.length;
        viewport.DataLength = data.length;
        if ((elScroll.scrollTop) && elScroll.scrollTop > 0) {
            //Restore
            this.Application.Binder.UnbindControlFlowViewport(viewport);
            viewport.ScrollTop = viewport.ElementScroll.scrollTop;
            viewport.HeightItem = this.GetElementItemHeight(el);
            if (viewport.HeightItem != null) {
                const view: [number, number] = this.GetViewFactorCurrent(viewport);
                viewport.DataStart = view[0];
                viewport.DataEnd = view[1];
            }
        }
        return (viewport);
    }

    public GetElementViewport(el: HTMLElement): DrapoViewport{
        const elAny: any = el as any;
        const viewportBefore: DrapoViewport = elAny[this._viewportPropertyName];
        if (viewportBefore != null) {
            return (viewportBefore);
        }
        return (null);
    }

    public HasElementViewport(el: HTMLElement): boolean {
        return (this.GetElementViewport(el) != null);
    }

    public CreateViewportControlFlowBallonBefore(viewport: DrapoViewport, lastInserted: JQuery) {
        if (viewport === null)
            return (lastInserted);
        const elBallonBeforeInDOM: HTMLElement = this.GetBallonBefore(lastInserted);
        if (elBallonBeforeInDOM == null) {
            const elBallonBefore: HTMLElement = document.createElement('div');
            elBallonBefore.setAttribute('d-ballon', 'before');
            elBallonBefore.style.width = '100%';
            elBallonBefore.style.height = viewport.HeightBallonBefore + 'px';
            viewport.ElementBallonBefore = elBallonBefore;
            lastInserted.after(elBallonBefore);
            return ($(elBallonBefore));
        } else {
            if (viewport.IsActive)
                return ($(elBallonBeforeInDOM));
            elBallonBeforeInDOM.style.height = viewport.HeightBallonBefore + 'px';
            viewport.ElementBallonBefore = elBallonBeforeInDOM;
            const elParent: HTMLElement = elBallonBeforeInDOM.parentElement;
            while (elParent.children.length > 2)
                elParent.lastElementChild.remove();
            return ($(elBallonBeforeInDOM));
        }
    }

    private GetBallonBefore(eljTemplate: JQuery): HTMLElement {
        const elTemplate: HTMLElement = eljTemplate[0];
        const elTemplateNext: HTMLElement = elTemplate.nextElementSibling as HTMLElement;
        if (elTemplateNext == null)
            return (null);
        const isBallonBefore: boolean = elTemplateNext.getAttribute('d-ballon') === 'before';
        if (!isBallonBefore)
            return (null);
        return (elTemplateNext);
    }

    private GetElementItemHeight(elTemplate: HTMLElement): number {
        const elParent: HTMLElement = elTemplate.parentElement;
        if (elParent == null)
            return (null);
        if (elParent.children.length < 4)
            return (null);
        const elBallonBefore: HTMLElement = elTemplate.nextElementSibling as HTMLElement;
        const elItem: HTMLElement = elBallonBefore.nextElementSibling as HTMLElement;
        const height: number = this.GetElementHeight(elItem);
        return (height);
    }

    public AppendViewportControlFlowBallonAfter(viewport: DrapoViewport, fragment: DocumentFragment): void {
        if ((viewport === null) || (viewport.IsActive))
            return;
        const elBallonAfter: HTMLElement = document.createElement('div');
        elBallonAfter.style.width = '100%';
        elBallonAfter.style.height = viewport.HeightBallonAfter + 'px';
        viewport.ElementBallonAfter = elBallonAfter;
        fragment.appendChild(elBallonAfter);
    }

    public ActivateViewportControlFlow(viewport: DrapoViewport): void {
        if ((viewport === null) || (viewport.IsActive))
            return;
        if (viewport.ScrollTop != null) {
            this.UpdateValuesBallon(viewport);
            this.UpdateElementsBallon(viewport);
            viewport.ElementScroll.scrollTop = viewport.ScrollTop;
        }
        //Attach viewport to the element
        const viewportElementAny: any = viewport.Element;
        viewportElementAny[this._viewportPropertyName] = viewport;
        this.Application.Binder.BindControlFlowViewport(viewport);
    }

    public DestroyViewportControlFlow(viewport: DrapoViewport): void {
        this.Application.Binder.UnbindControlFlowViewport(viewport);
        //Detach viewport to the element
        const viewportElementAny: any = viewport.Element;
        viewportElementAny[this._viewportPropertyName] = null;
    }

    public GetViewportControlFlowStart(viewport: DrapoViewport, start: number): number {
        if (viewport === null)
            return (start);
        return (viewport.DataStart);
    }

    public GetViewportControlFlowEnd(viewport: DrapoViewport, length: number): number {
        if (viewport === null)
            return (length);
        return (viewport.DataEnd);
    }

    public UpdateHeightItem(viewport: DrapoViewport, elItem: HTMLElement): boolean {
        if (viewport === null)
            return (false);
        if (viewport.HeightItem !== null)
            return (false);
        if (elItem === null)
            return (false);
        const height: number = this.GetElementHeight(elItem);
        if (height === null)
            return (false);
        viewport.HeightItem = height;
        this.UpdateValues(viewport);
        return (true);
    }

    public HasHeightChanged(viewport: DrapoViewport): boolean {
        if (viewport == null)
            return (false);
        const height: number = this.GetElementHeight(viewport.ElementScroll);
        //HACK: In some cases we cant define the scroller height
        if (height < 100)
            return (true);
        if (viewport.HeightScroll == height)
            return (false);
        viewport.HeightScroll = height;
        return (true);
    }

    private UpdateValues(viewport: DrapoViewport): void {
        const heightData: number = viewport.HeightScroll;
        if (heightData < 0)
            return;
        const heightDataFactor: number = heightData * viewport.Factor;
        const dataItems: number = Math.floor(heightDataFactor / viewport.HeightItem);
        viewport.DataEnd = dataItems < viewport.DataEnd ? dataItems : viewport.DataEnd;
        this.UpdateValuesBallon(viewport);
    }

    private UpdateValuesBallon(viewport: DrapoViewport): void {
        viewport.HeightBallonBefore = viewport.DataStart * viewport.HeightItem;
        viewport.HeightBallonAfter = (viewport.DataLength - viewport.DataEnd) * viewport.HeightItem;
    }

    public UpdateElementsBallon(viewport: DrapoViewport): void {
        viewport.ElementBallonBefore.style.height = viewport.HeightBallonBefore + 'px';
        viewport.ElementBallonAfter.style.height = viewport.HeightBallonAfter + 'px';
    }

    private GetElementHeightRect(el: HTMLElement): number {
        const rect: DOMRect = el.getBoundingClientRect();
        return (rect.height);
    }

    private GetElementStyleHeight(el: HTMLElement): number {
        const elStyle: CSSStyleDeclaration = window.getComputedStyle(el);
        const heightString: string = elStyle.getPropertyValue('height');
        if (heightString.indexOf('px') < 0)
            return (0);
        const height: number = this.Application.Parser.ParsePixels(heightString);
        return (height);
    }

    private GetElementHeight(el: HTMLElement): number {
        //Rect
        let height: number = this.GetElementHeightRect(el);
        if (height != 0)
            return (height);
        //Style
        height = this.GetElementStyleHeight(el);
        if (height != 0)
            return (height);
        return (0);
    }

    private GetScrollViewport(el: HTMLElement): [HTMLElement, number, number] {
        let elCurrent: HTMLElement = el;
        let isFirst: boolean = true;
        let heightBefore: number = 0;
        let heightAfter: number = 0;
        while (elCurrent != null) {
            if (this.HasOverflowY(elCurrent))
                return ([elCurrent, heightBefore, heightAfter]);
            const elParent: HTMLElement = elCurrent.parentElement;
            if (elParent != null) {
                if (isFirst) {
                    isFirst = false;
                } else {
                    let isBefore: boolean = true;
                    for (let i: number = 0; i < elParent.children.length; i++) {
                        const elChild: HTMLElement = elParent.children[i] as HTMLElement;
                        if (elChild === elCurrent) {
                            isBefore = false;
                        } else {
                            const height: number = this.GetElementHeight(elChild);
                            if (isBefore)
                                heightBefore = heightBefore + height;
                            else
                                heightAfter = heightAfter + height;
                        }
                    }
                }
            }
            elCurrent = elParent;
        }
        return (null);
    }

    private HasOverflowY(el: HTMLElement): boolean {
        const style: CSSStyleDeclaration = window.getComputedStyle(el);
        const overflow: string = style.getPropertyValue('overflow');
        if (this.IsOverflowEnabled(overflow))
            return (true);
        const overflowY: string = style.getPropertyValue('overflow-y');
        if (this.IsOverflowEnabled(overflowY))
            return (true);
        return (false);
    }

    private IsOverflowEnabled(value: string): boolean {
        if (value === 'auto')
            return (true);
        if (value === 'scroll')
            return (true);
        if (value === 'hidden')
            return (true);
        return (false);
    }

    public GetView(viewport: DrapoViewport): [number, number, number, number, number, number] {
        let rowsBeforeRemove: number = null;
        let rowsBeforeInsertStart: number = null;
        let rowsBeforeInsertEnd: number = null;
        let rowsAfterRemove: number = null;
        let rowsAfterInsertStart: number = null;
        let rowsAfterInsertEnd: number = null;
        //Current
        const view: [number, number] = this.GetViewFactorCurrent(viewport);
        const viewStart: number = view[0];
        const viewEnd: number = view[1];
        //Inside
        if ((viewStart >= viewport.DataStart) && (viewEnd <= viewport.DataEnd))
            return (null);
        //Equal
        if ((viewport.DataStart === viewStart) && (viewport.DataEnd === viewEnd))
            return (null);
        //Full
        if ((viewStart > viewport.DataEnd) || (viewEnd < viewport.DataStart)) {
            rowsBeforeRemove = -1;
            rowsAfterInsertStart = viewStart;
            rowsAfterInsertEnd = viewEnd;
        } else {
            //Before
            if (viewport.DataStart < viewStart) {
                rowsBeforeRemove = viewStart - viewport.DataStart;
            } else if (viewStart < viewport.DataStart) {
                rowsBeforeInsertStart = viewStart;
                rowsBeforeInsertEnd = viewport.DataStart;
            }
            //After
            if (viewport.DataEnd > viewEnd) {
                rowsAfterRemove = viewport.DataEnd - viewEnd;
            } else if (viewEnd > viewport.DataEnd) {
                rowsAfterInsertStart = viewport.DataEnd;
                rowsAfterInsertEnd = viewEnd;
            }
        }
        viewport.DataStart = viewStart;
        viewport.DataEnd = viewEnd;
        //Update Ballons
        this.UpdateValuesBallon(viewport);
        return ([rowsBeforeRemove, rowsBeforeInsertStart, rowsBeforeInsertEnd, rowsAfterRemove, rowsAfterInsertStart, rowsAfterInsertEnd]);
    }

    private GetViewFactorCurrent(viewport: DrapoViewport): [number, number] {
        const viewHeight: number = viewport.HeightScroll;
        const viewItems: number = Math.floor(viewHeight / viewport.HeightItem);
        const scrollTop: number = viewport.ElementScroll.scrollTop;
        const scrollTopLessBefore: number = scrollTop - viewport.HeightBefore;
        const scrollTopLessBeforeValid: number = scrollTopLessBefore > 0 ? scrollTopLessBefore : 0;
        const views: number = Math.round(scrollTopLessBeforeValid / viewHeight);
        let viewsStart: number = views - viewport.Factor;
        if (viewsStart < 0)
            viewsStart = 0;
        const viewsEnd: number = views + viewport.Factor;
        const rowStart: number = viewsStart * viewItems;
        let rowEnd: number = viewsEnd * viewItems;
        if (rowEnd > viewport.DataLength)
            rowEnd = viewport.DataLength;
        return ([rowStart, rowEnd]);
    }
}

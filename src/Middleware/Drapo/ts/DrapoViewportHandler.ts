class DrapoViewportHandler {
    private _application: DrapoApplication;

    //Properties
    get Application(): DrapoApplication {
        return (this._application);
    }

    //Constructors
    constructor(application: DrapoApplication) {
        this._application = application;
    }

    public CreateViewportControlFlow(sector: string, el: HTMLElement, elTemplate: HTMLElement, dataKey: string, key: string, dataKeyIteratorRange: string, data: any[], isContextRootFullExclusive: boolean, hasIf: boolean, hasRange: boolean): DrapoViewport {
        if (!isContextRootFullExclusive)
            return (null);
        if (hasIf)
            return (null);
        if (hasRange)
            return (null);
        if (el.getAttribute('d-for-render') !== 'viewport')
            return (null);
        const elScroll: HTMLElement = this.GetElementScrollViewport(el);
        if (elScroll == null)
            return (null);
        const height: number = this.GetElementStyleHeight(elScroll);
        if (height == null)
            return (null);
        const viewPort: DrapoViewport = new DrapoViewport();
        viewPort.Sector = sector;
        viewPort.Element = el;
        viewPort.ElementTemplate = elTemplate;
        viewPort.ElementScroll = elScroll;
        viewPort.DataKey = dataKey;
        viewPort.Key = key;
        viewPort.DataKeyIteratorRange = dataKeyIteratorRange;
        viewPort.Data = data;
        viewPort.HeightScroll = height;
        viewPort.HeightBefore = 0;
        viewPort.HeightAfter = 0;
        viewPort.HeightBallonBefore = 0;
        viewPort.HeightBallonAfter = 0;
        viewPort.DataStart = 0;
        viewPort.DataEnd = data.length;
        viewPort.DataLength = data.length;
        return (viewPort);
    }

    public CreateViewportControlFlowBallonBefore(viewport: DrapoViewport, lastInserted: JQuery) {
        if (viewport === null)
            return (lastInserted);
        const elBallonBefore: HTMLElement = document.createElement('div');
        elBallonBefore.setAttribute('d-ballon', 'before');
        elBallonBefore.style.width = '100%';
        elBallonBefore.style.height = viewport.HeightBallonBefore + 'px';
        viewport.ElementBallonBefore = elBallonBefore;
        lastInserted.after(elBallonBefore);
        return ($(elBallonBefore));
    }

    public AppendViewportControlFlowBallonAfter(viewport: DrapoViewport, fragment: DocumentFragment): void {
        if (viewport === null)
            return;
        const elBallonAfter: HTMLElement = document.createElement('div');
        elBallonAfter.style.width = '100%';
        elBallonAfter.style.height = viewport.HeightBallonAfter + 'px';
        viewport.ElementBallonAfter = elBallonAfter;
        fragment.appendChild(elBallonAfter);
        this.Application.Binder.BindControlFlowViewport(viewport);
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
        const height: number = this.GetElementClientHeight(elItem);
        if (height === null)
            return (false);
        viewport.HeightItem = height;
        this.UpdateValues(viewport);
        return (true);
    }

    private UpdateValues(viewport: DrapoViewport): void {
        const heightData: number = viewport.HeightScroll - (viewport.HeightBefore + viewport.HeightAfter);
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

    private GetElementStyleHeight(el: HTMLElement): number {
        const elStyle: CSSStyleDeclaration = window.getComputedStyle(el);
        const heightString: string = elStyle.getPropertyValue('height');
        const height: number = this.Application.Parser.ParsePixels(heightString);
        return (height);
    }

    private GetElementClientHeight(el: HTMLElement): number {
        const rect: DOMRect = el.getBoundingClientRect();
        return (rect.height);
    }

    private GetElementScrollViewport(el: HTMLElement): HTMLElement {
        let elCurrent: HTMLElement = el;
        while (elCurrent != null) {
            if (this.HasOverflowY(elCurrent))
                return (elCurrent);
            elCurrent = elCurrent.parentElement;
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
            rowsBeforeRemove = viewport.DataEnd - viewport.DataStart;
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
        const viewHeight: number = viewport.HeightScroll - (viewport.HeightBefore + viewport.HeightAfter);
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

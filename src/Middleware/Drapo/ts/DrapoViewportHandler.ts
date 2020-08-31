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

    public CreateViewportControlFlow(el: HTMLElement, isContextRootFullExclusive: boolean, hasIf: boolean, hasRange: boolean): DrapoViewport {
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
        viewPort.Element = el;
        viewPort.ElementScroll = elScroll;
        viewPort.Height = height;
        return (viewPort);
    }

    public GetViewportControlFlowLength(viewport: DrapoViewport, length: number): number {
        //TODO: We need to try to calculate the length of the viewport data
        return (length);
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
        return (true);
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
}

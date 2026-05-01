interface DrapoDiagnosticEntry {
    level: string;
    message: string;
    source: string;
    timestamp: string;
    stack?: string;
}

class DrapoDiagnostics {
    //Fields
    private _application: DrapoApplication;
    private _entries: DrapoDiagnosticEntry[] = [];
    private _size: number = 200;
    private _levelFilter: string[] = ['error', 'warn'];
    private _console: any = null;
    private _originalConsole: any = {};

    //Properties
    get Application(): DrapoApplication {
        return (this._application);
    }

    //Constructors
    constructor(application: DrapoApplication, consoleObject: any = console) {
        this._application = application;
        this._console = consoleObject;
        this.WrapConsole();
    }

    public Configure(size: number = null, levelFilter: string | string[] = null): void {
        if ((size != null) && (size > 0)) {
            this._size = size;
            this.Trim();
        }
        if (levelFilter != null)
            this._levelFilter = this.NormalizeLevelFilter(levelFilter);
    }

    // Returns a best-effort base64 PNG data URL of the sector's visible bounds.
    // Rendering uses the SVG foreignObject + Canvas technique and may not capture
    // computed styles, cross-origin assets, or canvas/video content.
    // Pass null as sector to capture document.body.
    public async GetSectorImage(sector: string | null): Promise<string> {
        const element: HTMLElement = sector == null
            ? document.body
            : this.Application.Searcher.FindByAttributeAndValue('d-sector', sector);
        if (element == null)
            return (null);
        return (this.RenderElementToBase64(element));
    }

    public GetErrorBuffer(count: number = null, levelFilter: string | string[] = null): DrapoDiagnosticEntry[] {
        const levels: string[] = levelFilter == null ? null : this.NormalizeLevelFilter(levelFilter);
        let entries: DrapoDiagnosticEntry[] = this._entries;
        if (levels != null)
            entries = entries.filter((entry: DrapoDiagnosticEntry) => levels.indexOf(entry.level) >= 0);
        if ((count != null) && (count >= 0))
            entries = entries.slice(Math.max(entries.length - count, 0));
        return (entries.map((entry: DrapoDiagnosticEntry) => this.CloneEntry(entry)));
    }

    public Clear(): void {
        this._entries = [];
    }

    public CaptureDrapoError(message: string, parameters: string[] = [], stack: string = null): void {
        this.Capture('error', 'drapo', this.CreateMessage(message, parameters), stack);
    }

    private async RenderElementToBase64(element: HTMLElement): Promise<string> {
        const rect: ClientRect = element.getBoundingClientRect();
        const width: number = element.scrollWidth > 0 ? element.scrollWidth : Math.round(rect.width);
        const height: number = element.scrollHeight > 0 ? element.scrollHeight : Math.round(rect.height);
        if ((width <= 0) || (height <= 0))
            return (null);
        const clone: HTMLElement = element.cloneNode(true) as HTMLElement;
        this.ExpandOverflow(clone, element);
        await this.InlineAbsoluteImages(clone);
        await this.InlineStylesheets(clone);
        this.StripInvalidXmlAttributes(clone);
        const svgNS: string = 'http://www.w3.org/2000/svg';
        const svgElement: SVGSVGElement = document.createElementNS(svgNS, 'svg') as SVGSVGElement;
        svgElement.setAttribute('height', String(height));
        svgElement.setAttribute('width', String(width));
        svgElement.setAttribute('xmlns', svgNS);
        const foreignObject: SVGForeignObjectElement = document.createElementNS(svgNS, 'foreignObject') as SVGForeignObjectElement;
        foreignObject.setAttribute('height', '100%');
        foreignObject.setAttribute('width', '100%');
        foreignObject.appendChild(clone);
        svgElement.appendChild(foreignObject);
        const svgDataUrl: string = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(new XMLSerializer().serializeToString(svgElement));
        const img: HTMLImageElement = await this.LoadImage(svgDataUrl);
        if (img == null)
            return (null);
        const canvas: HTMLCanvasElement = document.createElement('canvas');
        canvas.height = height;
        canvas.width = width;
        const ctx: CanvasRenderingContext2D = canvas.getContext('2d');
        if (ctx == null)
            return (null);
        try {
            ctx.drawImage(img, 0, 0);
            return (canvas.toDataURL('image/png'));
        } catch (e) {
            return (null);
        }
    }

    // Walks the clone and original trees in parallel. For every element in the
    // original that has overflowing content (scrollWidth > clientWidth or
    // scrollHeight > clientHeight), the corresponding clone element gets
    // overflow:visible plus explicit width/height set to the scroll dimensions.
    // This prevents SVG foreignObject from clipping scrollable children.
    private ExpandOverflow(clone: HTMLElement, original: HTMLElement): void {
        const walk = (cloneEl: Element, origEl: Element): void => {
            if (!(cloneEl instanceof HTMLElement) || !(origEl instanceof HTMLElement))
                return;
            const style: CSSStyleDeclaration = window.getComputedStyle(origEl);
            const ov: string = style.overflow;
            const ox: string = style.overflowX;
            const oy: string = style.overflowY;
            const isClippedX: boolean = (ox === 'hidden' || ox === 'auto' || ox === 'scroll' || ov === 'hidden' || ov === 'auto' || ov === 'scroll') && origEl.scrollWidth > origEl.clientWidth + 1;
            const isClippedY: boolean = (oy === 'hidden' || oy === 'auto' || oy === 'scroll' || ov === 'hidden' || ov === 'auto' || ov === 'scroll') && origEl.scrollHeight > origEl.clientHeight + 1;
            if (isClippedX || isClippedY) {
                cloneEl.style.overflow = 'visible';
                if (isClippedX)
                    cloneEl.style.width = origEl.scrollWidth + 'px';
                if (isClippedY)
                    cloneEl.style.height = origEl.scrollHeight + 'px';
            }
            const cloneChildren: HTMLCollection = cloneEl.children;
            const origChildren: HTMLCollection = origEl.children;
            const count: number = Math.min(cloneChildren.length, origChildren.length);
            for (let i: number = 0; i < count; i++)
                walk(cloneChildren[i], origChildren[i]);
        };
        walk(clone, original);
    }

    private LoadImage(src: string): Promise<HTMLImageElement> {
        return (new Promise<HTMLImageElement>((resolve) => {
            const img: HTMLImageElement = new Image();
            const timeoutHandle: number = window.setTimeout(() => resolve(null), 5000);
            img.onload = () => { window.clearTimeout(timeoutHandle); resolve(img); };
            img.onerror = () => { window.clearTimeout(timeoutHandle); resolve(null); };
            img.src = src;
        }));
    }

    // Fetches all external stylesheets and inline <style> blocks from the document,
    // inlines all url() references (fonts, images) as base64 data URLs, and injects
    // everything as a single <style> element into the clone so that SVG foreignObject
    // rendering (which cannot load external resources) shows correct styles and fonts.
    private async InlineStylesheets(element: HTMLElement): Promise<void> {
        const cssTexts: string[] = [];
        const linkElements: NodeListOf<HTMLLinkElement> = document.querySelectorAll('link[rel="stylesheet"]');
        await Promise.all(Array.from(linkElements).map(async (link: HTMLLinkElement) => {
            const href: string = link.href;
            if (!href)
                return;
            try {
                const response: Response = await fetch(href, { credentials: 'include' });
                if (!response.ok)
                    return;
                const cssText: string = await response.text();
                cssTexts.push(await this.InlineCssUrls(cssText, href));
            } catch {
                // Skip stylesheets that fail to load
            }
        }));
        const inlineStyles: NodeListOf<HTMLStyleElement> = document.querySelectorAll('style');
        for (const style of Array.from(inlineStyles))
            cssTexts.push(style.textContent || '');
        if (cssTexts.length === 0)
            return;
        const styleElement: HTMLStyleElement = document.createElement('style');
        styleElement.textContent = cssTexts.join('\n');
        element.insertBefore(styleElement, element.firstChild);
    }

    // Resolves all url(...) references in a CSS string relative to baseUrl,
    // fetches them and replaces with inline base64 data URLs.
    private async InlineCssUrls(cssText: string, baseUrl: string): Promise<string> {
        const urlRegex: RegExp = /url\(\s*['"]?([^'")\s]+)['"]?\s*\)/g;
        const matches: Array<{ raw: string; resolved: string }> = [];
        let m: RegExpExecArray;
        while ((m = urlRegex.exec(cssText)) !== null) {
            const raw: string = m[1];
            if (raw.startsWith('data:'))
                continue;
            matches.push({ raw, resolved: new URL(raw, baseUrl).href });
        }
        const cache: Map<string, string> = new Map();
        await Promise.all(matches.map(async ({ resolved }) => {
            if (cache.has(resolved))
                return;
            try {
                const response: Response = await fetch(resolved, { credentials: 'include' });
                if (!response.ok) { cache.set(resolved, null); return; }
                const blob: Blob = await response.blob();
                const dataUrl: string = await new Promise<string>((resolve) => {
                    const reader: FileReader = new FileReader();
                    reader.onload = () => resolve(reader.result as string);
                    reader.onerror = () => resolve(null);
                    reader.readAsDataURL(blob);
                });
                cache.set(resolved, dataUrl);
            } catch {
                cache.set(resolved, null);
            }
        }));
        return cssText.replace(/url\(\s*['"]?([^'")\s]+)['"]?\s*\)/g, (_match: string, raw: string) => {
            if (raw.startsWith('data:'))
                return _match;
            const dataUrl: string = cache.get(new URL(raw, baseUrl).href);
            return dataUrl ? `url("${dataUrl}")` : _match;
        });
    }

    // Removes attributes whose names are invalid in XML from the entire element subtree.
    // HTML allows attribute names like ")" or "!" that would break XML/SVG parsing.
    private StripInvalidXmlAttributes(element: HTMLElement): void {
        const xmlNameRegex: RegExp = /^[a-zA-Z_][a-zA-Z0-9\-_\.:]*$/;
        const allElements: Element[] = Array.from(element.querySelectorAll('*'));
        allElements.push(element);
        for (const el of allElements) {
            const toRemove: string[] = [];
            for (let i: number = 0; i < el.attributes.length; i++) {
                const attrName: string = el.attributes[i].name;
                if (!xmlNameRegex.test(attrName))
                    toRemove.push(attrName);
            }
            for (const name of toRemove)
                el.removeAttribute(name);
        }
    }

    // Replaces absolute HTTP/HTTPS src attributes in a cloned element tree with
    // inline base64 data URLs so SVG foreignObject serialization can render them.
    // Cross-origin images that fail the fetch are silently left unchanged.
    private async InlineAbsoluteImages(element: HTMLElement): Promise<void> {
        const imgs: Element[] = Array.from(element.querySelectorAll('[src^="http://"], [src^="https://"]'));
        await Promise.all(imgs.map(async (img: Element) => {
            const src: string = img.getAttribute('src');
            try {
                const response: Response = await fetch(src, { credentials: 'include' });
                if (!response.ok)
                    return;
                const blob: Blob = await response.blob();
                const dataUrl: string = await new Promise<string>((resolve) => {
                    const reader: FileReader = new FileReader();
                    reader.onload = () => resolve(reader.result as string);
                    reader.onerror = () => resolve(null);
                    reader.readAsDataURL(blob);
                });
                if (dataUrl != null)
                    img.setAttribute('src', dataUrl);
            } catch {
                // Leave as-is if fetch fails (cross-origin or network error)
            }
        }));
    }

    private WrapConsole(): void {
        if (this._console == null)
            return;
        this.WrapConsoleMethod('error');
        this.WrapConsoleMethod('warn');
        this.WrapConsoleMethod('log');
    }

    private WrapConsoleMethod(level: string): void {
        const original: any = this._console[level];
        const originalMethod: any = typeof original === 'function' ? original.bind(this._console) : null;
        this._originalConsole[level] = originalMethod;
        this._console[level] = (...parameters: any[]) => {
            try {
                if (this.ShouldCaptureLevel(level))
                    this.CaptureConsole(level, parameters);
            } catch {
                // Never let diagnostics break the browser console.
            }
            if (originalMethod != null)
                originalMethod(...parameters);
        };
    }

    private CaptureConsole(level: string, parameters: any[]): void {
        const stack: string = this.GetStack(parameters);
        this.Capture(level, 'console', this.CreateConsoleMessage(parameters), stack);
    }

    private Capture(level: string, source: string, message: string, stack: string = null): void {
        const entry: DrapoDiagnosticEntry = {
            level,
            message,
            source,
            timestamp: new Date(Date.now()).toJSON()
        };
        if (stack != null)
            entry.stack = stack;
        this._entries.push(entry);
        this.Trim();
    }

    private Trim(): void {
        while (this._entries.length > this._size)
            this._entries.shift();
    }

    private ShouldCaptureLevel(level: string): boolean {
        return (this._levelFilter.indexOf(level) >= 0);
    }

    private NormalizeLevelFilter(levelFilter: string | string[]): string[] {
        if (typeof levelFilter === 'string')
            return ([levelFilter]);
        const levels: string[] = [];
        for (let i: number = 0; i < levelFilter.length; i++) {
            const level: string = levelFilter[i];
            if (levels.indexOf(level) < 0)
                levels.push(level);
        }
        return (levels);
    }

    private CreateConsoleMessage(parameters: any[]): string {
        const values: string[] = [];
        for (let i: number = 0; i < parameters.length; i++)
            values.push(this.CreateConsoleValue(parameters[i]));
        return (values.join(' '));
    }

    private CreateConsoleValue(value: any): string {
        if (value === null)
            return ('null');
        if (value === undefined)
            return ('undefined');
        if (value instanceof Error)
            return (value.message);
        if (typeof value === 'string')
            return (value);
        if (typeof value === 'number')
            return (value.toString());
        if (typeof value === 'boolean')
            return (value.toString());
        try {
            return (JSON.stringify(value));
        } catch {
            return (value.toString());
        }
    }

    private GetStack(parameters: any[]): string {
        for (let i: number = 0; i < parameters.length; i++) {
            const parameter: any = parameters[i];
            if ((parameter instanceof Error) && (parameter.stack != null))
                return (parameter.stack.toString());
        }
        return (null);
    }

    private CreateMessage(message: string, parameters: string[]): string {
        let messageReplaced: string = message;
        for (let i: number = 0; i < parameters.length; i++)
            messageReplaced = messageReplaced.replace('{' + i + '}', parameters[i]);
        return (messageReplaced);
    }

    private CloneEntry(entry: DrapoDiagnosticEntry): DrapoDiagnosticEntry {
        const clone: DrapoDiagnosticEntry = {
            level: entry.level,
            message: entry.message,
            source: entry.source,
            timestamp: entry.timestamp
        };
        if (entry.stack != null)
            clone.stack = entry.stack;
        return (clone);
    }
}

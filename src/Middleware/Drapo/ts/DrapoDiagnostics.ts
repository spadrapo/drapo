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
        const height: number = Math.round(rect.height);
        const width: number = Math.round(rect.width);
        if ((width <= 0) || (height <= 0))
            return (null);
        const svgNS: string = 'http://www.w3.org/2000/svg';
        const svgElement: SVGSVGElement = document.createElementNS(svgNS, 'svg') as SVGSVGElement;
        svgElement.setAttribute('height', String(height));
        svgElement.setAttribute('width', String(width));
        svgElement.setAttribute('xmlns', svgNS);
        const foreignObject: SVGForeignObjectElement = document.createElementNS(svgNS, 'foreignObject') as SVGForeignObjectElement;
        foreignObject.setAttribute('height', '100%');
        foreignObject.setAttribute('width', '100%');
        foreignObject.appendChild(element.cloneNode(true));
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

    private LoadImage(src: string): Promise<HTMLImageElement> {
        return (new Promise<HTMLImageElement>((resolve) => {
            const img: HTMLImageElement = new Image();
            const timeoutHandle: number = window.setTimeout(() => resolve(null), 5000);
            img.onload = () => { window.clearTimeout(timeoutHandle); resolve(img); };
            img.onerror = () => { window.clearTimeout(timeoutHandle); resolve(null); };
            img.src = src;
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

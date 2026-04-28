interface DrapoBridgeMessage {
    source: string;
    type: string;
}

interface DrapoBridgeRect {
    height: number;
    width: number;
    x: number;
    y: number;
}

interface DrapoBridgeCaptureRequest {
    mode: string;
    rect?: DrapoBridgeRect;
    timeoutMs?: number;
}

interface DrapoBridgeCaptureResult extends DrapoBridgeMessage {
    devicePixelRatio?: number;
    documentHeight?: number;
    documentWidth?: number;
    errorCode?: string;
    errorMessage?: string;
    height?: number;
    imageDataUrl?: string;
    mode: string;
    ok: boolean;
    rect?: DrapoBridgeRect;
    requestId: string;
    scrollX?: number;
    scrollY?: number;
    viewportHeight?: number;
    viewportWidth?: number;
    width?: number;
}

interface DrapoBridgePendingCapture {
    resolve: (result: DrapoBridgeCaptureResult) => void;
    timeoutHandle: number;
}

interface DrapoBridgePendingReadiness {
    resolve: (result: boolean) => void;
    timeoutHandle: number;
}

class DrapoBridge {
    //Fields
    private readonly _application: DrapoApplication;
    private readonly _captureTimeoutDefault: number = 10000;
    private readonly _sourceBridge: string = 'drapo-bridge';
    private readonly _sourceDrapo: string = 'drapo';
    private readonly _typeHandshake: string = 'drapo-bridge:handshake';
    private readonly _typeHandshakeResult: string = 'drapo-bridge:handshake-result';
    private readonly _typeHello: string = 'drapo-bridge:hello';
    private readonly _typeHelloRequest: string = 'drapo-bridge:hello-request';
    private readonly _typeScreenshot: string = 'drapo-bridge:screenshot';
    private readonly _typeScreenshotResult: string = 'drapo-bridge:screenshot-result';
    private readonly _window: Window;
    private _bridgeSessionId: string = null;
    private _extensionDetected: boolean = false;
    private _isAvailable: boolean = false;
    private _pendingCaptures: { [requestId: string]: DrapoBridgePendingCapture } = {};
    private _pendingReadiness: DrapoBridgePendingReadiness[] = [];
    private _requestCounter: number = 0;
    private _version: string = null;

    //Properties
    get IsAvailable(): boolean {
        return (this._isAvailable);
    }

    get Version(): string {
        return (this._version);
    }

    //Constructors
    constructor(application: DrapoApplication, windowInstance: Window = window) {
        this._application = application;
        this._window = windowInstance;
        this.Start();
    }

    public Configure(bridgeSessionId: string): void {
        if ((bridgeSessionId == null) || (bridgeSessionId === '')) {
            this.ClearSession();
            return;
        }
        this._bridgeSessionId = bridgeSessionId;
        this._isAvailable = false;
        this.PostHelloRequest();
        this.PostHandshake();
    }

    public async CaptureScreen(request: DrapoBridgeCaptureRequest): Promise<DrapoBridgeCaptureResult> {
        if (!this.IsCaptureRequestValid(request))
            return (null);
        const timeoutMs: number = this.ResolveTimeoutMs(request.timeoutMs);
        if (!await this.EnsureAvailable(timeoutMs))
            return (null);
        const requestId: string = this.CreateRequestId();
        return (await new Promise<DrapoBridgeCaptureResult>((resolve) => {
            const timeoutHandle: number = this._window.setTimeout(() => {
                delete this._pendingCaptures[requestId];
                resolve(null);
            }, timeoutMs);
            this._pendingCaptures[requestId] = {
                resolve,
                timeoutHandle
            };
            this.Post({
                bridgeSessionId: this._bridgeSessionId,
                mode: request.mode,
                rect: request.rect,
                requestId,
                source: this._sourceDrapo,
                timeoutMs,
                type: this._typeScreenshot
            });
        }));
    }

    private Start(): void {
        this._window.addEventListener('message', (event: MessageEvent) => {
            this.OnMessage(event);
        }, false);
        this._window.addEventListener('pagehide', () => {
            this.ClearSession();
        }, false);
        this._window.addEventListener('beforeunload', () => {
            this.ClearSession();
        }, false);
        this.PostHelloRequest();
    }

    private OnMessage(event: MessageEvent): void {
        if (!this.IsValidEvent(event))
            return;
        const message: any = event.data;
        if (message.type === this._typeHello) {
            this.HandleHello(message);
            return;
        }
        if (message.type === this._typeHandshakeResult) {
            this.HandleHandshakeResult(message);
            return;
        }
        if (message.type === this._typeScreenshotResult)
            this.HandleScreenshotResult(message);
    }

    private IsValidEvent(event: MessageEvent): boolean {
        if (this._window.top !== this._window)
            return (false);
        if (event.source !== this._window)
            return (false);
        if (event.origin !== this._window.location.origin)
            return (false);
        if (!this.IsObject(event.data))
            return (false);
        const message: DrapoBridgeMessage = event.data as DrapoBridgeMessage;
        if (message.source !== this._sourceBridge)
            return (false);
        return ((message.type === this._typeHello) || (message.type === this._typeHandshakeResult) || (message.type === this._typeScreenshotResult));
    }

    private HandleHello(message: any): void {
        if (typeof message.version === 'string')
            this._version = message.version;
        this._extensionDetected = true;
        this.PostHandshake();
    }

    private HandleHandshakeResult(message: any): void {
        if (message.bridgeSessionId !== this._bridgeSessionId)
            return;
        this._isAvailable = message.ok === true;
        this.ResolveReadiness(this._isAvailable);
    }

    private HandleScreenshotResult(message: any): void {
        if (!this.IsScreenshotResult(message))
            return;
        const pending: DrapoBridgePendingCapture = this._pendingCaptures[message.requestId];
        if (pending == null)
            return;
        delete this._pendingCaptures[message.requestId];
        this._window.clearTimeout(pending.timeoutHandle);
        pending.resolve(message as DrapoBridgeCaptureResult);
    }

    private IsScreenshotResult(message: any): boolean {
        if (typeof message.requestId !== 'string')
            return (false);
        if (typeof message.mode !== 'string')
            return (false);
        if (typeof message.ok !== 'boolean')
            return (false);
        return (true);
    }

    private async EnsureAvailable(timeoutMs: number): Promise<boolean> {
        if (this._isAvailable)
            return (true);
        if (this._bridgeSessionId == null)
            return (false);
        this.PostHelloRequest();
        this.PostHandshake();
        return (await new Promise<boolean>((resolve) => {
            const timeoutHandle: number = this._window.setTimeout(() => {
                this.RemoveReadiness(resolve);
                resolve(false);
            }, timeoutMs);
            this._pendingReadiness.push({
                resolve,
                timeoutHandle
            });
        }));
    }

    private ResolveReadiness(result: boolean): void {
        const pendingReadiness: DrapoBridgePendingReadiness[] = this._pendingReadiness;
        this._pendingReadiness = [];
        for (let i: number = 0; i < pendingReadiness.length; i++) {
            const pending: DrapoBridgePendingReadiness = pendingReadiness[i];
            this._window.clearTimeout(pending.timeoutHandle);
            pending.resolve(result);
        }
    }

    private RemoveReadiness(resolve: (result: boolean) => void): void {
        for (let i: number = this._pendingReadiness.length - 1; i >= 0; i--) {
            if (this._pendingReadiness[i].resolve === resolve)
                this._pendingReadiness.splice(i, 1);
        }
    }

    private ClearSession(): void {
        this._bridgeSessionId = null;
        this._isAvailable = false;
        this.ResolveReadiness(false);
        const requestIds: string[] = Object.keys(this._pendingCaptures);
        for (let i: number = 0; i < requestIds.length; i++) {
            const requestId: string = requestIds[i];
            const pending: DrapoBridgePendingCapture = this._pendingCaptures[requestId];
            this._window.clearTimeout(pending.timeoutHandle);
            pending.resolve(null);
        }
        this._pendingCaptures = {};
    }

    private IsCaptureRequestValid(request: DrapoBridgeCaptureRequest): boolean {
        if (request == null)
            return (false);
        if ((request.mode !== 'viewport') && (request.mode !== 'fullPage') && (request.mode !== 'element'))
            return (false);
        if (request.mode === 'element')
            return (this.IsRectValid(request.rect));
        return (true);
    }

    private IsRectValid(rect: DrapoBridgeRect): boolean {
        if (rect == null)
            return (false);
        if (!this.IsNumberFinite(rect.x))
            return (false);
        if (!this.IsNumberFinite(rect.y))
            return (false);
        if (!this.IsNumberFinite(rect.width))
            return (false);
        if (!this.IsNumberFinite(rect.height))
            return (false);
        return ((rect.width > 0) && (rect.height > 0));
    }

    private IsNumberFinite(value: number): boolean {
        return ((typeof value === 'number') && isFinite(value));
    }

    private ResolveTimeoutMs(timeoutMs: number): number {
        if ((typeof timeoutMs !== 'number') || (!isFinite(timeoutMs)))
            return (this._captureTimeoutDefault);
        return (Math.max(1, Math.min(60000, Math.floor(timeoutMs))));
    }

    private CreateRequestId(): string {
        this._requestCounter++;
        return ('drapo-bridge-' + Date.now().toString() + '-' + this._requestCounter.toString());
    }

    private PostHelloRequest(): void {
        this.Post({
            source: this._sourceDrapo,
            type: this._typeHelloRequest
        });
    }

    private PostHandshake(): void {
        if (!this._extensionDetected)
            return;
        if (this._bridgeSessionId == null)
            return;
        this.Post({
            bridgeSessionId: this._bridgeSessionId,
            source: this._sourceDrapo,
            type: this._typeHandshake
        });
    }

    private Post(message: any): void {
        this._window.postMessage(message, this._window.location.origin);
    }

    private IsObject(value: any): boolean {
        return ((value !== null) && (typeof value === 'object'));
    }
}

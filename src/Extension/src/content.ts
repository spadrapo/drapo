/// <reference path="./protocol.ts" />

namespace DrapoBridgeContent {
    const Version: string = '1.0.0';
    const SessionTtlMs: number = 15 * 60 * 1000;
    const CaptureTimeoutMs: number = 10000;
    const CaptureTimeoutMinMs: number = 1;
    const CaptureTimeoutMaxMs: number = 30000;
    const MaxFullPageCaptures: number = 8;
    const MaxFullPageHeight: number = 16000;
    const MaxCanvasPixelHeight: number = 32767;

    interface RuntimeApi {
        sendMessage(message: any): Promise<any>;
    }

    interface CaptureQueueItem {
        request: DrapoBridgeProtocol.ScreenshotRequest;
    }

    interface CaptureRawResult {
        height: number;
        imageDataUrl: string;
        width: number;
    }

    interface FullPageCaptureItem {
        image: HTMLImageElement;
        scrollY: number;
    }

    class CaptureError extends Error {
        public readonly ErrorCode: string;

        constructor(errorCode: string, message: string = null) {
            super(message || errorCode);
            this.ErrorCode = errorCode;
        }
    }

    class BridgeSession {
        public Id: string = null;
        public ExpiresAt: number = 0;

        public IsEnabled(): boolean {
            return ((this.Id !== null) && (Date.now() < this.ExpiresAt));
        }

        public IsExpired(): boolean {
            return ((this.Id !== null) && (Date.now() >= this.ExpiresAt));
        }

        public Set(id: string): void {
            this.Id = id;
            this.ExpiresAt = Date.now() + SessionTtlMs;
        }

        public Clear(): void {
            this.Id = null;
            this.ExpiresAt = 0;
        }
    }

    export class ContentBridge {
        private readonly _runtime: RuntimeApi;
        private readonly _window: Window;
        private readonly _session: BridgeSession = new BridgeSession();
        private readonly _queueLimit: number = 3;
        private _activeCapture: boolean = false;
        private _queue: CaptureQueueItem[] = [];

        constructor(windowInstance: Window, runtime: RuntimeApi) {
            this._window = windowInstance;
            this._runtime = runtime;
        }

        public Start(): void {
            this._window.addEventListener('message', (event: MessageEvent) => {
                this.OnMessage(event);
            }, false);
            this._window.addEventListener('DOMContentLoaded', () => {
                this.PostHello();
            }, false);
            this._window.addEventListener('pagehide', () => {
                this.ClearSession();
            }, false);
            this._window.addEventListener('beforeunload', () => {
                this.ClearSession();
            }, false);
            this.PostHello();
            setTimeout(() => this.PostHello(), 100);
            setTimeout(() => this.PostHello(), 300);
        }

        private OnMessage(event: MessageEvent): void {
            if (!this.IsValidEvent(event))
                return;
            const message: DrapoBridgeProtocol.BridgeMessage = event.data as DrapoBridgeProtocol.BridgeMessage;
            if (message.type === DrapoBridgeProtocol.TypeHelloRequest) {
                this.PostHello();
                return;
            }
            if (message.type === DrapoBridgeProtocol.TypeHandshake) {
                this.HandleHandshake(message as DrapoBridgeProtocol.HandshakeMessage);
                return;
            }
            if (message.type === DrapoBridgeProtocol.TypeScreenshot)
                this.HandleScreenshot(message as DrapoBridgeProtocol.ScreenshotRequest);
        }

        private IsValidEvent(event: MessageEvent): boolean {
            if (this._window.top !== this._window)
                return (false);
            if (event.source !== this._window)
                return (false);
            if (event.origin !== this._window.location.origin)
                return (false);
            return (DrapoBridgeProtocol.IsDrapoBridgeMessage(event.data));
        }

        private HandleHandshake(message: DrapoBridgeProtocol.HandshakeMessage): void {
            if ((typeof message.bridgeSessionId !== 'string') || (message.bridgeSessionId.length === 0))
                return;
            this.ClearQueue('session_replaced');
            this._session.Set(message.bridgeSessionId);
            this.Post({
                source: DrapoBridgeProtocol.SourceBridge,
                type: DrapoBridgeProtocol.TypeHandshakeResult,
                ok: true,
                bridgeSessionId: this._session.Id,
                expiresAt: this._session.ExpiresAt
            });
        }

        private HandleScreenshot(request: DrapoBridgeProtocol.ScreenshotRequest): void {
            if (this._activeCapture) {
                if (this._queue.length >= this._queueLimit) {
                    this.Post(DrapoBridgeProtocol.CreateScreenshotError(request.requestId, request.mode, this.CreateViewportMetadata(), 'busy'));
                    return;
                }
                this._queue.push({ request: request });
                return;
            }
            this.StartCapture(request);
        }

        private async ProcessScreenshot(request: DrapoBridgeProtocol.ScreenshotRequest): Promise<DrapoBridgeProtocol.ScreenshotResult> {
            const metadata: DrapoBridgeProtocol.ViewportMetadata = this.CreateViewportMetadata();
            const validationError: DrapoBridgeProtocol.ScreenshotResult = this.CreateValidationError(request, metadata);
            if (validationError !== null)
                return (validationError);
            if (request.mode === 'fullPage')
                return (await this.ProcessFullPageScreenshot(request, metadata));
            if (request.mode === 'element')
                return (await this.ProcessElementScreenshot(request, metadata));
            return (await this.CaptureViewport(request, metadata));
        }

        private async ProcessFullPageScreenshot(request: DrapoBridgeProtocol.ScreenshotRequest, metadata: DrapoBridgeProtocol.ViewportMetadata): Promise<DrapoBridgeProtocol.ScreenshotResult> {
            const captureCount: number = Math.ceil(metadata.documentHeight / Math.max(metadata.viewportHeight, 1));
            const pixelHeight: number = Math.round(metadata.documentHeight * metadata.devicePixelRatio);
            if ((metadata.documentHeight > MaxFullPageHeight) || (captureCount > MaxFullPageCaptures) || (pixelHeight > MaxCanvasPixelHeight))
                return (DrapoBridgeProtocol.CreateScreenshotError(request.requestId, request.mode, metadata, 'too_large'));
            if (captureCount <= 1)
                return (await this.CaptureViewport(request, metadata));
            const originalScrollX: number = this._window.scrollX;
            const originalScrollY: number = this._window.scrollY;
            const captures: FullPageCaptureItem[] = [];
            try {
                for (let i: number = 0; i < captureCount; i++) {
                    const scrollY: number = Math.min(i * metadata.viewportHeight, Math.max(metadata.documentHeight - metadata.viewportHeight, 0));
                    this._window.scrollTo(originalScrollX, scrollY);
                    await this.WaitForRender();
                    const metadataCurrent: DrapoBridgeProtocol.ViewportMetadata = this.CreateViewportMetadata();
                    const capture: CaptureRawResult = await this.CaptureViewportRaw(request, metadataCurrent);
                    captures.push({
                        image: await this.LoadImage(capture.imageDataUrl),
                        scrollY: metadataCurrent.scrollY
                    });
                }
                const stitched: CaptureRawResult = this.StitchFullPage(captures, metadata);
                return (this.CreateSuccessResult(request, metadata, stitched));
            } finally {
                this._window.scrollTo(originalScrollX, originalScrollY);
            }
        }

        private async ProcessElementScreenshot(request: DrapoBridgeProtocol.ScreenshotRequest, metadata: DrapoBridgeProtocol.ViewportMetadata): Promise<DrapoBridgeProtocol.ScreenshotResult> {
            if (request.rect === null || request.rect === undefined)
                return (DrapoBridgeProtocol.CreateScreenshotError(request.requestId, request.mode, metadata, 'invalid_request'));
            if ((request.rect.width <= 0) || (request.rect.height <= 0))
                return (DrapoBridgeProtocol.CreateScreenshotError(request.requestId, request.mode, metadata, 'invalid_request'));
            const originalScrollX: number = this._window.scrollX;
            const originalScrollY: number = this._window.scrollY;
            try {
                this.ScrollRectIntoView(request.rect, metadata);
                await this.WaitForRender();
                const metadataCurrent: DrapoBridgeProtocol.ViewportMetadata = this.CreateViewportMetadata();
                const capture: CaptureRawResult = await this.CaptureViewportRaw(request, metadataCurrent);
                const viewportRect: DrapoBridgeProtocol.ScreenshotRect = {
                    x: request.rect.x - metadataCurrent.scrollX,
                    y: request.rect.y - metadataCurrent.scrollY,
                    width: request.rect.width,
                    height: request.rect.height
                };
                const cropped: CaptureRawResult = await this.CropImage(capture.imageDataUrl, viewportRect, metadataCurrent);
                const result: DrapoBridgeProtocol.ScreenshotResult = this.CreateSuccessResult(request, metadataCurrent, cropped);
                result.rect = request.rect;
                return (result);
            } finally {
                this._window.scrollTo(originalScrollX, originalScrollY);
            }
        }

        private async CaptureViewport(request: DrapoBridgeProtocol.ScreenshotRequest, metadata: DrapoBridgeProtocol.ViewportMetadata): Promise<DrapoBridgeProtocol.ScreenshotResult> {
            const capture: CaptureRawResult = await this.CaptureViewportRaw(request, metadata);
            return (this.CreateSuccessResult(request, metadata, capture));
        }

        private async CaptureViewportRaw(request: DrapoBridgeProtocol.ScreenshotRequest, metadata: DrapoBridgeProtocol.ViewportMetadata): Promise<CaptureRawResult> {
            const capture: Promise<any> = this._runtime.sendMessage({
                source: DrapoBridgeProtocol.SourceBridge,
                type: DrapoBridgeProtocol.TypeCaptureVisibleTab,
                requestId: request.requestId,
                mode: request.mode,
                metadata: metadata
            });
            const captureResolved: any = await this.WithTimeout(capture, this.ResolveCaptureTimeoutMs(request));
            if ((captureResolved === null) || (captureResolved.ok === false)) {
                const errorCode: string = ((captureResolved !== null) && (typeof captureResolved.errorCode === 'string')) ? captureResolved.errorCode : 'capture_failed';
                const errorMessage: string = ((captureResolved !== null) && (typeof captureResolved.errorMessage === 'string')) ? captureResolved.errorMessage : null;
                throw new CaptureError(errorCode, errorMessage);
            }
            return ({
                imageDataUrl: captureResolved.imageDataUrl,
                width: captureResolved.width,
                height: captureResolved.height
            });
        }

        private CreateSuccessResult(request: DrapoBridgeProtocol.ScreenshotRequest, metadata: DrapoBridgeProtocol.ViewportMetadata, capture: CaptureRawResult): DrapoBridgeProtocol.ScreenshotResult {
            return ({
                source: DrapoBridgeProtocol.SourceBridge,
                type: DrapoBridgeProtocol.TypeScreenshotResult,
                requestId: request.requestId,
                mode: request.mode,
                ok: true,
                imageDataUrl: capture.imageDataUrl,
                width: capture.width,
                height: capture.height,
                devicePixelRatio: metadata.devicePixelRatio,
                documentHeight: metadata.documentHeight,
                documentWidth: metadata.documentWidth,
                scrollX: metadata.scrollX,
                scrollY: metadata.scrollY,
                viewportHeight: metadata.viewportHeight,
                viewportWidth: metadata.viewportWidth
            });
        }

        private ScrollRectIntoView(rect: DrapoBridgeProtocol.ScreenshotRect, metadata: DrapoBridgeProtocol.ViewportMetadata): void {
            const targetScrollX: number = Math.max(0, Math.min(rect.x, Math.max(metadata.documentWidth - metadata.viewportWidth, 0)));
            const targetScrollY: number = Math.max(0, Math.min(rect.y, Math.max(metadata.documentHeight - metadata.viewportHeight, 0)));
            const rectRight: number = rect.x + rect.width;
            const rectBottom: number = rect.y + rect.height;
            const isVisibleX: boolean = (rect.x >= metadata.scrollX) && (rectRight <= (metadata.scrollX + metadata.viewportWidth));
            const isVisibleY: boolean = (rect.y >= metadata.scrollY) && (rectBottom <= (metadata.scrollY + metadata.viewportHeight));
            if ((!isVisibleX) || (!isVisibleY))
                this._window.scrollTo(targetScrollX, targetScrollY);
        }

        private async CropImage(imageDataUrl: string, rect: DrapoBridgeProtocol.ScreenshotRect, metadata: DrapoBridgeProtocol.ViewportMetadata): Promise<CaptureRawResult> {
            const image: HTMLImageElement = await this.LoadImage(imageDataUrl);
            const scale: number = image.width / Math.max(metadata.viewportWidth, 1);
            const sourceX: number = Math.max(0, Math.round(rect.x * scale));
            const sourceY: number = Math.max(0, Math.round(rect.y * scale));
            const sourceWidth: number = Math.min(image.width - sourceX, Math.round(rect.width * scale));
            const sourceHeight: number = Math.min(image.height - sourceY, Math.round(rect.height * scale));
            if ((sourceWidth <= 0) || (sourceHeight <= 0))
                throw new CaptureError('invalid_request', 'element outside viewport');
            const canvas: HTMLCanvasElement = this._window.document.createElement('canvas');
            canvas.width = sourceWidth;
            canvas.height = sourceHeight;
            const context: CanvasRenderingContext2D = canvas.getContext('2d');
            context.drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight, 0, 0, sourceWidth, sourceHeight);
            return ({
                imageDataUrl: canvas.toDataURL('image/png'),
                width: sourceWidth,
                height: sourceHeight
            });
        }

        private StitchFullPage(captures: FullPageCaptureItem[], metadata: DrapoBridgeProtocol.ViewportMetadata): CaptureRawResult {
            const scale: number = captures[0].image.width / Math.max(metadata.viewportWidth, 1);
            const width: number = captures[0].image.width;
            const height: number = Math.round(metadata.documentHeight * scale);
            const canvas: HTMLCanvasElement = this._window.document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            const context: CanvasRenderingContext2D = canvas.getContext('2d');
            for (let i: number = 0; i < captures.length; i++) {
                const capture: FullPageCaptureItem = captures[i];
                const destinationY: number = Math.round(capture.scrollY * scale);
                const remainingHeight: number = height - destinationY;
                const drawHeight: number = Math.min(capture.image.height, remainingHeight);
                if (drawHeight > 0)
                    context.drawImage(capture.image, 0, 0, width, drawHeight, 0, destinationY, width, drawHeight);
            }
            return ({
                imageDataUrl: canvas.toDataURL('image/png'),
                width: width,
                height: height
            });
        }

        private async LoadImage(imageDataUrl: string): Promise<HTMLImageElement> {
            return (await new Promise<HTMLImageElement>((resolve: (value: HTMLImageElement) => void, reject: (reason?: any) => void) => {
                const image: HTMLImageElement = new Image();
                image.onload = () => resolve(image);
                image.onerror = () => reject(new CaptureError('capture_failed', 'image load failed'));
                image.src = imageDataUrl;
            }));
        }

        private async WaitForRender(): Promise<void> {
            await new Promise<void>((resolve: () => void) => {
                const requestAnimationFrameCurrent: any = (this._window as any).requestAnimationFrame;
                if (typeof requestAnimationFrameCurrent === 'function') {
                    requestAnimationFrameCurrent(() => {
                        requestAnimationFrameCurrent(() => setTimeout(resolve, 50));
                    });
                    return;
                }
                setTimeout(resolve, 50);
            });
        }

        private StartCapture(request: DrapoBridgeProtocol.ScreenshotRequest): void {
            this._activeCapture = true;
            this.ProcessScreenshot(request).then((result: DrapoBridgeProtocol.ScreenshotResult) => {
                this.Post(result);
            }).catch((e: any) => {
                this.Post(this.CreateExceptionError(request, e));
            }).finally(() => {
                this._activeCapture = false;
                this.StartNextCapture();
            });
        }

        private StartNextCapture(): void {
            if (this._queue.length === 0)
                return;
            const item: CaptureQueueItem = this._queue.shift();
            this.StartCapture(item.request);
        }

        private ClearQueue(errorCode: string): void {
            if (this._queue.length === 0)
                return;
            const metadata: DrapoBridgeProtocol.ViewportMetadata = this.CreateViewportMetadata();
            for (let i: number = 0; i < this._queue.length; i++) {
                const item: CaptureQueueItem = this._queue[i];
                this.Post(DrapoBridgeProtocol.CreateScreenshotError(item.request.requestId, item.request.mode, metadata, errorCode));
            }
            this._queue = [];
        }

        private CreateValidationError(request: DrapoBridgeProtocol.ScreenshotRequest, metadata: DrapoBridgeProtocol.ViewportMetadata = null): DrapoBridgeProtocol.ScreenshotResult {
            const metadataCurrent: DrapoBridgeProtocol.ViewportMetadata = metadata !== null ? metadata : this.CreateViewportMetadata();
            if (!this._session.IsEnabled()) {
                const errorCode: string = this._session.IsExpired() ? 'session_expired' : 'bridge_disabled';
                return (DrapoBridgeProtocol.CreateScreenshotError(request.requestId, request.mode, metadataCurrent, errorCode));
            }
            if (request.bridgeSessionId !== this._session.Id)
                return (DrapoBridgeProtocol.CreateScreenshotError(request.requestId, request.mode, metadataCurrent, 'invalid_session'));
            return (null);
        }

        private CreateExceptionError(request: DrapoBridgeProtocol.ScreenshotRequest, e: any): DrapoBridgeProtocol.ScreenshotResult {
            const errorCode: string = e instanceof CaptureError ? e.ErrorCode : 'capture_failed';
            const errorMessage: string = e instanceof Error ? e.message : null;
            return (DrapoBridgeProtocol.CreateScreenshotError(request.requestId, request.mode, this.CreateViewportMetadata(), errorCode, errorMessage));
        }

        private ClearSession(): void {
            this.ClearQueue('session_expired');
            this._session.Clear();
        }

        private CreateViewportMetadata(): DrapoBridgeProtocol.ViewportMetadata {
            const documentElement: HTMLElement = this._window.document.documentElement;
            const body: HTMLElement = this._window.document.body;
            return ({
                devicePixelRatio: this._window.devicePixelRatio || 1,
                documentHeight: Math.max(documentElement.scrollHeight, body ? body.scrollHeight : 0),
                documentWidth: Math.max(documentElement.scrollWidth, body ? body.scrollWidth : 0),
                scrollX: this._window.scrollX,
                scrollY: this._window.scrollY,
                viewportHeight: this._window.innerHeight,
                viewportWidth: this._window.innerWidth
            });
        }

        private Post(message: any): void {
            this._window.postMessage(message, this._window.location.origin);
        }

        private PostHello(): void {
            this.Post(DrapoBridgeProtocol.CreateHello(Version));
        }

        private ResolveCaptureTimeoutMs(request: DrapoBridgeProtocol.ScreenshotRequest): number {
            if ((typeof request.timeoutMs !== 'number') || (!isFinite(request.timeoutMs)))
                return (CaptureTimeoutMs);
            return (Math.max(CaptureTimeoutMinMs, Math.min(CaptureTimeoutMaxMs, Math.floor(request.timeoutMs))));
        }

        private async WithTimeout<T>(promise: Promise<T>, timeoutMs: number): Promise<T> {
            let timeout: any = null;
            try {
                return (await Promise.race<T>([
                    promise,
                    new Promise<T>((_resolve: (value: T) => void, reject: (reason?: any) => void) => {
                        timeout = setTimeout(() => reject(new CaptureError('timeout')), timeoutMs);
                    })
                ]));
            } finally {
                if (timeout !== null)
                    clearTimeout(timeout);
            }
        }
    }
}

(() => {
    if (window.top !== window)
        return;
    const runtime: any = chrome.runtime;
    const bridge: DrapoBridgeContent.ContentBridge = new DrapoBridgeContent.ContentBridge(window, runtime);
    bridge.Start();
})();

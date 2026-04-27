namespace DrapoBridgeProtocol {
    export const SourceBridge: string = 'drapo-bridge';
    export const SourceDrapo: string = 'drapo';
    export const TypePrefix: string = 'drapo-bridge:';
    export const TypeHello: string = 'drapo-bridge:hello';
    export const TypeHelloRequest: string = 'drapo-bridge:hello-request';
    export const TypeHandshake: string = 'drapo-bridge:handshake';
    export const TypeHandshakeResult: string = 'drapo-bridge:handshake-result';
    export const TypeScreenshot: string = 'drapo-bridge:screenshot';
    export const TypeScreenshotResult: string = 'drapo-bridge:screenshot-result';
    export const TypeCaptureVisibleTab: string = 'drapo-bridge:capture-visible-tab';

    export type ScreenshotMode = 'viewport' | 'element' | 'fullPage';

    export interface BridgeMessage {
        source: string;
        type: string;
    }

    export interface HelloMessage extends BridgeMessage {
        version: string;
    }

    export interface HandshakeMessage extends BridgeMessage {
        bridgeSessionId: string;
    }

    export interface ScreenshotRect {
        x: number;
        y: number;
        width: number;
        height: number;
    }

    export interface ViewportMetadata {
        devicePixelRatio: number;
        documentHeight: number;
        documentWidth: number;
        scrollX: number;
        scrollY: number;
        viewportHeight: number;
        viewportWidth: number;
    }

    export interface ScreenshotRequest extends BridgeMessage {
        bridgeSessionId: string;
        mode: ScreenshotMode;
        rect?: ScreenshotRect;
        requestId: string;
        timeoutMs?: number;
    }

    export interface ScreenshotResult extends BridgeMessage, ViewportMetadata {
        errorCode?: string;
        errorMessage?: string;
        height?: number;
        imageDataUrl?: string;
        mode: ScreenshotMode;
        ok: boolean;
        rect?: ScreenshotRect;
        requestId: string;
        width?: number;
    }

    export function CreateHello(version: string): HelloMessage {
        return ({
            source: SourceBridge,
            type: TypeHello,
            version: version
        });
    }

    export function IsObject(value: unknown): value is Record<string, unknown> {
        return ((value !== null) && (typeof value === 'object'));
    }

    export function IsDrapoBridgeMessage(value: unknown): value is BridgeMessage {
        if (!IsObject(value))
            return (false);
        if (value.source !== SourceDrapo)
            return (false);
        if (typeof value.type !== 'string')
            return (false);
        return (value.type.indexOf(TypePrefix) === 0);
    }

    export function CreateScreenshotError(requestId: string, mode: ScreenshotMode, metadata: ViewportMetadata, errorCode: string, errorMessage: string = null): ScreenshotResult {
        return ({
            source: SourceBridge,
            type: TypeScreenshotResult,
            requestId: requestId,
            mode: mode,
            ok: false,
            errorCode: errorCode,
            errorMessage: errorMessage,
            devicePixelRatio: metadata.devicePixelRatio,
            documentHeight: metadata.documentHeight,
            documentWidth: metadata.documentWidth,
            scrollX: metadata.scrollX,
            scrollY: metadata.scrollY,
            viewportHeight: metadata.viewportHeight,
            viewportWidth: metadata.viewportWidth
        });
    }
}

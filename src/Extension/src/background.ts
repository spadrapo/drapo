/// <reference path="./protocol.ts" />

try {
    importScripts('protocol.js');
} catch {
    // Tests load protocol.js directly before this worker script.
}

namespace DrapoBridgeBackground {
    interface CaptureMessage {
        metadata: DrapoBridgeProtocol.ViewportMetadata;
        mode: DrapoBridgeProtocol.ScreenshotMode;
        requestId: string;
        source: string;
        type: string;
    }

    class BackgroundBridge {
        public Start(): void {
            chrome.runtime.onMessage.addListener((message: any, sender: any, sendResponse: (response: any) => void): boolean => {
                if (!this.IsCaptureMessage(message))
                    return (false);
                this.HandleCapture(message as CaptureMessage, sender).then(sendResponse);
                return (true);
            });
        }

        private IsCaptureMessage(message: any): boolean {
            if (!DrapoBridgeProtocol.IsObject(message))
                return (false);
            if (message.source !== DrapoBridgeProtocol.SourceBridge)
                return (false);
            return (message.type === DrapoBridgeProtocol.TypeCaptureVisibleTab);
        }

        private async HandleCapture(message: CaptureMessage, sender: any): Promise<any> {
            try {
                const windowId: number = this.ResolveWindowId(sender);
                const imageDataUrl: string = await chrome.tabs.captureVisibleTab(windowId, { format: 'png' });
                const scale: number = message.metadata.devicePixelRatio || 1;
                return ({
                    ok: true,
                    requestId: message.requestId,
                    mode: message.mode,
                    imageDataUrl: imageDataUrl,
                    width: Math.round(message.metadata.viewportWidth * scale),
                    height: Math.round(message.metadata.viewportHeight * scale)
                });
            } catch (e) {
                const messageError: string = e instanceof Error ? e.message : `${e}`;
                return ({
                    ok: false,
                    requestId: message.requestId,
                    mode: message.mode,
                    errorCode: this.ResolveErrorCode(messageError),
                    errorMessage: messageError
                });
            }
        }

        private ResolveWindowId(sender: any): number {
            if ((sender !== null) && (sender !== undefined) && (sender.tab !== null) && (sender.tab !== undefined) && (typeof sender.tab.windowId === 'number'))
                return (sender.tab.windowId);
            return (undefined);
        }

        private ResolveErrorCode(message: string): string {
            const messageLower: string = message.toLowerCase();
            if ((messageLower.indexOf('permission') >= 0) || (messageLower.indexOf('<all_urls>') >= 0) || (messageLower.indexOf('activetab') >= 0) || (messageLower.indexOf('cannot access contents') >= 0))
                return ('permission_denied');
            return ('capture_failed');
        }
    }

    new BackgroundBridge().Start();
}

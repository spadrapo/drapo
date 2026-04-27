import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import { Script, createContext } from 'node:vm';
import ts from 'typescript';

const root = fileURLToPath(new URL('..', import.meta.url));

class FakeWindow {
  constructor(origin = 'https://tenant.tech6cloud.com') {
    this.listeners = {};
    this.location = { origin };
    this.messages = [];
    this.top = this;
  }

  addEventListener(type, listener) {
    if (!this.listeners[type])
      this.listeners[type] = [];
    this.listeners[type].push(listener);
  }

  clearTimeout(handle) {
    clearTimeout(handle);
  }

  dispatchBridgeMessage(message) {
    this.dispatchMessage(message, this.location.origin, this);
  }

  dispatchMessage(message, origin, source) {
    const listeners = this.listeners.message || [];
    for (const listener of listeners)
      listener({ data: message, origin, source });
  }

  postMessage(message, targetOrigin) {
    this.messages.push({ message, targetOrigin });
  }

  setTimeout(callback, timeout) {
    return setTimeout(callback, timeout);
  }
}

async function loadBridge(fakeWindow) {
  const source = await readFile(join(root, 'ts', 'DrapoBridge.ts'), 'utf8');
  const output = ts.transpileModule(source, {
    compilerOptions: {
      target: ts.ScriptTarget.ES2022
    }
  });
  const context = createContext({
    clearTimeout,
    setTimeout,
    window: fakeWindow
  });
  const script = new Script(`${output.outputText}\nglobalThis.DrapoBridge = DrapoBridge;`);
  script.runInContext(context);
  return new context.DrapoBridge(null, fakeWindow);
}

async function waitForMessage(fakeWindow, type) {
  for (let i = 0; i < 20; i++) {
    const entry = fakeWindow.messages.find((item) => item.message.type === type);
    if (entry)
      return entry.message;
    await new Promise((resolve) => setTimeout(resolve, 1));
  }
  return null;
}

async function waitForMessages(fakeWindow, type, count) {
  for (let i = 0; i < 20; i++) {
    const entries = fakeWindow.messages
      .filter((item) => item.message.type === type)
      .map((item) => item.message);
    if (entries.length >= count)
      return entries;
    await new Promise((resolve) => setTimeout(resolve, 1));
  }
  return [];
}

async function configureAvailableBridge(fakeWindow) {
  const bridge = await loadBridge(fakeWindow);

  bridge.Configure('session-1');
  fakeWindow.dispatchBridgeMessage({
    source: 'drapo-bridge',
    type: 'drapo-bridge:hello',
    version: '1.0.0'
  });
  fakeWindow.dispatchBridgeMessage({
    bridgeSessionId: 'session-1',
    ok: true,
    source: 'drapo-bridge',
    type: 'drapo-bridge:handshake-result'
  });

  return bridge;
}

function createResult(request, values = {}) {
  return {
    devicePixelRatio: 1,
    documentHeight: 600,
    documentWidth: 800,
    height: 600,
    imageDataUrl: 'data:image/png;base64,abc',
    mode: request.mode,
    ok: true,
    requestId: request.requestId,
    scrollX: 0,
    scrollY: 0,
    source: 'drapo-bridge',
    type: 'drapo-bridge:screenshot-result',
    viewportHeight: 600,
    viewportWidth: 800,
    width: 800,
    ...values
  };
}

test('configured bridge handshakes and captures a viewport through the extension protocol', async () => {
  const fakeWindow = new FakeWindow();
  const bridge = await loadBridge(fakeWindow);

  bridge.Configure('session-1');
  fakeWindow.dispatchBridgeMessage({
    source: 'drapo-bridge',
    type: 'drapo-bridge:hello',
    version: '1.0.0'
  });

  const handshake = await waitForMessage(fakeWindow, 'drapo-bridge:handshake');
  assert.equal(handshake.bridgeSessionId, 'session-1');
  assert.equal(handshake.source, 'drapo');
  assert.equal(handshake.type, 'drapo-bridge:handshake');

  fakeWindow.dispatchBridgeMessage({
    bridgeSessionId: 'session-1',
    ok: true,
    source: 'drapo-bridge',
    type: 'drapo-bridge:handshake-result'
  });

  assert.equal(bridge.IsAvailable, true);
  assert.equal(bridge.Version, '1.0.0');

  const capture = bridge.CaptureScreen({ mode: 'viewport' });
  const request = await waitForMessage(fakeWindow, 'drapo-bridge:screenshot');

  assert.equal(request.bridgeSessionId, 'session-1');
  assert.equal(request.mode, 'viewport');
  assert.equal(request.source, 'drapo');
  assert.equal(request.timeoutMs, 10000);

  fakeWindow.dispatchBridgeMessage({
    devicePixelRatio: 1,
    documentHeight: 600,
    documentWidth: 800,
    height: 600,
    imageDataUrl: 'data:image/png;base64,abc',
    mode: 'viewport',
    ok: true,
    requestId: request.requestId,
    scrollX: 0,
    scrollY: 0,
    source: 'drapo-bridge',
    type: 'drapo-bridge:screenshot-result',
    viewportHeight: 600,
    viewportWidth: 800,
    width: 800
  });

  const result = await capture;
  assert.equal(result.imageDataUrl, 'data:image/png;base64,abc');
  assert.equal(result.ok, true);
  assert.equal(result.requestId, request.requestId);
});

test('capture resolves null when the extension is absent', async () => {
  const fakeWindow = new FakeWindow();
  const bridge = await loadBridge(fakeWindow);

  bridge.Configure('session-1');

  const result = await bridge.CaptureScreen({
    mode: 'viewport',
    timeoutMs: 5
  });

  assert.equal(result, null);
  assert.equal(bridge.IsAvailable, false);
});

test('capture waits for late hello and handshake before posting screenshot request', async () => {
  const fakeWindow = new FakeWindow();
  const bridge = await loadBridge(fakeWindow);

  bridge.Configure('session-1');
  const capture = bridge.CaptureScreen({
    mode: 'viewport',
    timeoutMs: 50
  });

  assert.equal(fakeWindow.messages.some((item) => item.message.type === 'drapo-bridge:screenshot'), false);

  fakeWindow.dispatchBridgeMessage({
    source: 'drapo-bridge',
    type: 'drapo-bridge:hello',
    version: '1.0.0'
  });

  const handshake = await waitForMessage(fakeWindow, 'drapo-bridge:handshake');
  fakeWindow.dispatchBridgeMessage({
    bridgeSessionId: handshake.bridgeSessionId,
    ok: true,
    source: 'drapo-bridge',
    type: 'drapo-bridge:handshake-result'
  });

  const request = await waitForMessage(fakeWindow, 'drapo-bridge:screenshot');
  fakeWindow.dispatchBridgeMessage(createResult(request));

  assert.equal((await capture).ok, true);
});

test('capture resolves null when the extension does not reply', async () => {
  const fakeWindow = new FakeWindow();
  const bridge = await configureAvailableBridge(fakeWindow);

  const capture = bridge.CaptureScreen({
    mode: 'viewport',
    timeoutMs: 5
  });
  const request = await waitForMessage(fakeWindow, 'drapo-bridge:screenshot');

  assert.equal(request.mode, 'viewport');
  assert.equal(await capture, null);
});

test('malformed screenshot responses are ignored until a valid response arrives', async () => {
  const fakeWindow = new FakeWindow();
  const bridge = await configureAvailableBridge(fakeWindow);

  const capture = bridge.CaptureScreen({ mode: 'viewport' });
  const request = await waitForMessage(fakeWindow, 'drapo-bridge:screenshot');

  fakeWindow.dispatchBridgeMessage({
    mode: 'viewport',
    ok: 'true',
    requestId: request.requestId,
    source: 'drapo-bridge',
    type: 'drapo-bridge:screenshot-result'
  });
  fakeWindow.dispatchBridgeMessage(createResult(request, {
    imageDataUrl: 'data:image/png;base64,valid'
  }));

  const result = await capture;
  assert.equal(result.imageDataUrl, 'data:image/png;base64,valid');
});

test('concurrent captures are correlated by request id', async () => {
  const fakeWindow = new FakeWindow();
  const bridge = await configureAvailableBridge(fakeWindow);

  const captureA = bridge.CaptureScreen({ mode: 'viewport' });
  const captureB = bridge.CaptureScreen({
    mode: 'fullPage',
    timeoutMs: 15000
  });
  const requests = await waitForMessages(fakeWindow, 'drapo-bridge:screenshot', 2);

  fakeWindow.dispatchBridgeMessage(createResult(requests[1], {
    imageDataUrl: 'data:image/png;base64,b'
  }));
  fakeWindow.dispatchBridgeMessage(createResult(requests[0], {
    imageDataUrl: 'data:image/png;base64,a'
  }));

  assert.equal((await captureA).imageDataUrl, 'data:image/png;base64,a');
  assert.equal((await captureB).imageDataUrl, 'data:image/png;base64,b');
});

test('extension error results are preserved', async () => {
  const fakeWindow = new FakeWindow();
  const bridge = await configureAvailableBridge(fakeWindow);

  const capture = bridge.CaptureScreen({
    mode: 'element',
    rect: {
      height: 100,
      width: 200,
      x: 10,
      y: 20
    }
  });
  const request = await waitForMessage(fakeWindow, 'drapo-bridge:screenshot');

  fakeWindow.dispatchBridgeMessage(createResult(request, {
    errorCode: 'too_large',
    errorMessage: 'Page is too large.',
    imageDataUrl: undefined,
    ok: false
  }));

  const result = await capture;
  assert.equal(result.errorCode, 'too_large');
  assert.equal(result.errorMessage, 'Page is too large.');
  assert.equal(result.ok, false);
});

test('empty configure disables the session and clears pending captures', async () => {
  const fakeWindow = new FakeWindow();
  const bridge = await configureAvailableBridge(fakeWindow);

  const capture = bridge.CaptureScreen({ mode: 'viewport' });
  await waitForMessage(fakeWindow, 'drapo-bridge:screenshot');

  bridge.Configure('');

  assert.equal(bridge.IsAvailable, false);
  assert.equal(await capture, null);
});

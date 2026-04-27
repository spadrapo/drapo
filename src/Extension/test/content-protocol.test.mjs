import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { Script, createContext } from 'node:vm';
import test from 'node:test';

const root = new URL('..', import.meta.url).pathname;

class FakeWindow {
  constructor({ origin = 'https://tenant.tech6cloud.com', topLevel = true } = {}) {
    this.location = { origin };
    this.top = topLevel ? this : {};
    this.innerWidth = 800;
    this.innerHeight = 600;
    this.scrollX = 0;
    this.scrollY = 0;
    this.devicePixelRatio = 1;
    this.document = {
      body: { scrollHeight: 600, scrollWidth: 800 },
      documentElement: { scrollHeight: 600, scrollWidth: 800 },
      createElement: (tagName) => {
        if (tagName !== 'canvas')
          return {};
        return {
          width: 0,
          height: 0,
          getContext: () => ({ drawImage: () => {} }),
          toDataURL: () => 'data:image/png;base64,c3RpdGNoZWQ='
        };
      }
    };
    this.listeners = new Map();
    this.messages = [];
  }

  addEventListener(type, listener) {
    const listeners = this.listeners.get(type) ?? [];
    listeners.push(listener);
    this.listeners.set(type, listeners);
  }

  removeEventListener(type, listener) {
    const listeners = this.listeners.get(type) ?? [];
    this.listeners.set(type, listeners.filter((item) => item !== listener));
  }

  postMessage(message, targetOrigin) {
    this.messages.push({ message, targetOrigin });
  }

  dispatchMessage(data, origin = this.location.origin, source = this) {
    const listeners = this.listeners.get('message') ?? [];
    for (const listener of listeners) {
      listener({ data, origin, source });
    }
  }

  scrollTo(x, y) {
    this.scrollX = x;
    this.scrollY = y;
  }
}

class FakeImage {
  constructor() {
    this.height = 600;
    this.onload = null;
    this.onerror = null;
    this.width = 800;
  }

  set src(_value) {
    setTimeout(() => {
      if (this.onload)
        this.onload();
    }, 0);
  }
}

async function loadContent({ runtimeResponse, runtimeSendMessage, topLevel = true } = {}) {
  const fakeWindow = new FakeWindow({ topLevel });
  const context = createContext({
    chrome: {
      runtime: {
        sendMessage: runtimeSendMessage ?? (async () => runtimeResponse ?? {
          ok: true,
          imageDataUrl: 'data:image/png;base64,ZmFrZQ==',
          width: 800,
          height: 600
        })
      }
    },
    document: fakeWindow.document,
    Image: FakeImage,
    location: fakeWindow.location,
    setTimeout,
    clearTimeout,
    window: fakeWindow
  });
  context.globalThis = context;
  context.self = context;

  for (const file of ['protocol.js', 'content.js']) {
    const code = await readFile(join(root, 'dist', file), 'utf8');
    new Script(code, { filename: file }).runInContext(context);
  }

  return fakeWindow;
}

function lastMessage(fakeWindow, type) {
  const found = fakeWindow.messages
    .map((item) => item.message)
    .filter((message) => message?.type === type);
  return found.at(-1);
}

function resultFor(fakeWindow, requestId) {
  return fakeWindow.messages
    .map((item) => item.message)
    .find((message) => message?.type === 'drapo-bridge:screenshot-result' && message.requestId === requestId);
}

async function waitForResult(fakeWindow, requestId, timeoutMs = 2000) {
  const started = Date.now();
  while ((Date.now() - started) < timeoutMs) {
    const result = resultFor(fakeWindow, requestId);
    if (result)
      return result;
    await new Promise((resolve) => setTimeout(resolve, 10));
  }
  throw new Error(`Timed out waiting for ${requestId}`);
}

function deferred() {
  let resolve;
  let reject;
  const promise = new Promise((promiseResolve, promiseReject) => {
    resolve = promiseResolve;
    reject = promiseReject;
  });
  return { promise, reject, resolve };
}

test('top-level Drapo page handshakes and receives a structured viewport screenshot result', async () => {
  const fakeWindow = await loadContent();

  const hello = lastMessage(fakeWindow, 'drapo-bridge:hello');
  assert.equal(hello.source, 'drapo-bridge');
  assert.equal(hello.type, 'drapo-bridge:hello');
  assert.equal(hello.version, '1.0.0');

  fakeWindow.dispatchMessage({
    source: 'drapo',
    type: 'drapo-bridge:handshake',
    bridgeSessionId: 'session-1'
  });

  assert.equal(lastMessage(fakeWindow, 'drapo-bridge:handshake-result').ok, true);

  fakeWindow.dispatchMessage({
    source: 'drapo',
    type: 'drapo-bridge:screenshot',
    requestId: 'request-1',
    bridgeSessionId: 'session-1',
    mode: 'viewport'
  });

  await new Promise((resolve) => setTimeout(resolve, 0));

  const result = lastMessage(fakeWindow, 'drapo-bridge:screenshot-result');
  assert.equal(result.ok, true);
  assert.equal(result.requestId, 'request-1');
  assert.equal(result.mode, 'viewport');
  assert.equal(result.imageDataUrl, 'data:image/png;base64,ZmFrZQ==');
  assert.equal(result.viewportWidth, 800);
  assert.equal(result.viewportHeight, 600);
  assert.equal(result.devicePixelRatio, 1);
});

test('Drapo can request hello on demand during bridge detection', async () => {
  const fakeWindow = await loadContent();
  const helloCountBefore = fakeWindow.messages.filter((item) => item.message?.type === 'drapo-bridge:hello').length;

  fakeWindow.dispatchMessage({
    source: 'drapo',
    type: 'drapo-bridge:hello-request'
  });

  const helloCountAfter = fakeWindow.messages.filter((item) => item.message?.type === 'drapo-bridge:hello').length;
  assert.equal(helloCountAfter, helloCountBefore + 1);
});

test('re-handshake clears queued captures and requires the new session id', async () => {
  const activeCapture = deferred();
  let captureCalls = 0;
  const fakeWindow = await loadContent({
    runtimeSendMessage: async () => {
      captureCalls++;
      if (captureCalls === 1)
        return await activeCapture.promise;
      return {
        ok: true,
        imageDataUrl: 'data:image/png;base64,bmV3',
        width: 800,
        height: 600
      };
    }
  });

  fakeWindow.dispatchMessage({
    source: 'drapo',
    type: 'drapo-bridge:handshake',
    bridgeSessionId: 'session-1'
  });

  fakeWindow.dispatchMessage({
    source: 'drapo',
    type: 'drapo-bridge:screenshot',
    requestId: 'request-active',
    bridgeSessionId: 'session-1',
    mode: 'viewport'
  });

  fakeWindow.dispatchMessage({
    source: 'drapo',
    type: 'drapo-bridge:screenshot',
    requestId: 'request-queued',
    bridgeSessionId: 'session-1',
    mode: 'viewport'
  });

  fakeWindow.dispatchMessage({
    source: 'drapo',
    type: 'drapo-bridge:handshake',
    bridgeSessionId: 'session-2'
  });

  await new Promise((resolve) => setTimeout(resolve, 0));

  const queuedResult = resultFor(fakeWindow, 'request-queued');
  assert.equal(queuedResult.ok, false);
  assert.equal(queuedResult.errorCode, 'session_replaced');
  assert.equal(captureCalls, 1);

  activeCapture.resolve({
    ok: true,
    imageDataUrl: 'data:image/png;base64,b2xk',
    width: 800,
    height: 600
  });
  await new Promise((resolve) => setTimeout(resolve, 0));

  assert.equal(resultFor(fakeWindow, 'request-active').ok, true);

  fakeWindow.dispatchMessage({
    source: 'drapo',
    type: 'drapo-bridge:screenshot',
    requestId: 'request-old-session',
    bridgeSessionId: 'session-1',
    mode: 'viewport'
  });

  await new Promise((resolve) => setTimeout(resolve, 0));

  const oldSessionResult = resultFor(fakeWindow, 'request-old-session');
  assert.equal(oldSessionResult.ok, false);
  assert.equal(oldSessionResult.errorCode, 'invalid_session');

  fakeWindow.dispatchMessage({
    source: 'drapo',
    type: 'drapo-bridge:screenshot',
    requestId: 'request-new-session',
    bridgeSessionId: 'session-2',
    mode: 'viewport'
  });

  await new Promise((resolve) => setTimeout(resolve, 0));

  assert.equal(resultFor(fakeWindow, 'request-new-session').ok, true);
});

test('full-page capture is bounded and rejects pages that are too tall', async () => {
  let captureCalls = 0;
  const fakeWindow = await loadContent({
    runtimeSendMessage: async () => {
      captureCalls++;
      return {
        ok: true,
        imageDataUrl: 'data:image/png;base64,bm90LXVzZWQ=',
        width: 800,
        height: 600
      };
    }
  });
  fakeWindow.document.body.scrollHeight = 24000;
  fakeWindow.document.documentElement.scrollHeight = 24000;

  fakeWindow.dispatchMessage({
    source: 'drapo',
    type: 'drapo-bridge:handshake',
    bridgeSessionId: 'session-1'
  });

  fakeWindow.dispatchMessage({
    source: 'drapo',
    type: 'drapo-bridge:screenshot',
    requestId: 'request-full-page',
    bridgeSessionId: 'session-1',
    mode: 'fullPage'
  });

  await new Promise((resolve) => setTimeout(resolve, 0));

  const result = resultFor(fakeWindow, 'request-full-page');
  assert.equal(result.ok, false);
  assert.equal(result.errorCode, 'too_large');
  assert.equal(captureCalls, 0);
});

test('full-page capture calls are paced under captureVisibleTab rate limits', async () => {
  const captureStartedAt = [];
  const fakeWindow = await loadContent({
    runtimeSendMessage: async () => {
      captureStartedAt.push(Date.now());
      return {
        ok: true,
        imageDataUrl: 'data:image/png;base64,c2VnbWVudA==',
        width: 800,
        height: 600
      };
    }
  });
  fakeWindow.document.body.scrollHeight = 1200;
  fakeWindow.document.documentElement.scrollHeight = 1200;

  fakeWindow.dispatchMessage({
    source: 'drapo',
    type: 'drapo-bridge:handshake',
    bridgeSessionId: 'session-1'
  });

  fakeWindow.dispatchMessage({
    source: 'drapo',
    type: 'drapo-bridge:screenshot',
    requestId: 'request-full-page-paced',
    bridgeSessionId: 'session-1',
    mode: 'fullPage'
  });

  const result = await waitForResult(fakeWindow, 'request-full-page-paced');

  assert.equal(result.ok, true);
  assert.equal(captureStartedAt.length, 2);
  assert.ok(captureStartedAt[1] - captureStartedAt[0] >= 500);
});


test('content returns structured capture failures from the background worker', async () => {
  const fakeWindow = await loadContent({
    runtimeResponse: {
      ok: false,
      errorCode: 'permission_denied',
      errorMessage: 'host not granted'
    }
  });

  fakeWindow.dispatchMessage({
    source: 'drapo',
    type: 'drapo-bridge:handshake',
    bridgeSessionId: 'session-1'
  });

  fakeWindow.dispatchMessage({
    source: 'drapo',
    type: 'drapo-bridge:screenshot',
    requestId: 'request-denied',
    bridgeSessionId: 'session-1',
    mode: 'viewport'
  });

  await new Promise((resolve) => setTimeout(resolve, 0));

  const result = resultFor(fakeWindow, 'request-denied');
  assert.equal(result.ok, false);
  assert.equal(result.errorCode, 'permission_denied');
  assert.equal(result.errorMessage, 'host not granted');
});

test('content returns timeout when the background capture does not resolve in time', async () => {
  const fakeWindow = await loadContent({
    runtimeSendMessage: async () => await new Promise(() => {})
  });

  fakeWindow.dispatchMessage({
    source: 'drapo',
    type: 'drapo-bridge:handshake',
    bridgeSessionId: 'session-1'
  });

  fakeWindow.dispatchMessage({
    source: 'drapo',
    type: 'drapo-bridge:screenshot',
    requestId: 'request-timeout',
    bridgeSessionId: 'session-1',
    mode: 'viewport',
    timeoutMs: 1
  });

  await new Promise((resolve) => setTimeout(resolve, 20));

  const result = resultFor(fakeWindow, 'request-timeout');
  assert.equal(result.ok, false);
  assert.equal(result.errorCode, 'timeout');
});

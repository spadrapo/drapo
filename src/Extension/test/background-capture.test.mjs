import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { Script, createContext } from 'node:vm';
import test from 'node:test';

const root = new URL('..', import.meta.url).pathname;

async function loadBackground({ captureVisibleTab }) {
  let listener = null;
  const context = createContext({
    chrome: {
      runtime: {
        lastError: null,
        onMessage: {
          addListener: (handler) => {
            listener = handler;
          }
        }
      },
      tabs: {
        captureVisibleTab
      }
    },
    importScripts: () => {},
    setTimeout,
    clearTimeout
  });
  context.globalThis = context;
  context.self = context;

  for (const file of ['protocol.js', 'background.js']) {
    const code = await readFile(join(root, 'dist', file), 'utf8');
    new Script(code, { filename: file }).runInContext(context);
  }

  assert.equal(typeof listener, 'function');

  async function dispatch(message, sender = { tab: { windowId: 7 } }) {
    return await new Promise((resolve) => {
      listener(message, sender, resolve);
    });
  }

  return { dispatch };
}

test('background returns a structured data URL result for visible-tab capture', async () => {
  const { dispatch } = await loadBackground({
    captureVisibleTab: async (windowId, options) => {
      assert.equal(windowId, 7);
      assert.equal(options.format, 'png');
      return 'data:image/png;base64,Y2FwdHVyZQ==';
    }
  });

  const result = await dispatch({
    source: 'drapo-bridge',
    type: 'drapo-bridge:capture-visible-tab',
    requestId: 'request-1',
    mode: 'viewport',
    metadata: {
      viewportWidth: 400,
      viewportHeight: 300,
      devicePixelRatio: 2
    }
  });

  assert.equal(result.ok, true);
  assert.equal(result.imageDataUrl, 'data:image/png;base64,Y2FwdHVyZQ==');
  assert.equal(result.width, 800);
  assert.equal(result.height, 600);
});

test('background maps browser host permission failures to permission_denied', async () => {
  const { dispatch } = await loadBackground({
    captureVisibleTab: async () => {
      throw new Error("Either the '<all_urls>' or 'activeTab' permission is required.");
    }
  });

  const result = await dispatch({
    source: 'drapo-bridge',
    type: 'drapo-bridge:capture-visible-tab',
    requestId: 'request-2',
    mode: 'viewport',
    metadata: {
      viewportWidth: 400,
      viewportHeight: 300,
      devicePixelRatio: 1
    }
  });

  assert.equal(result.ok, false);
  assert.equal(result.errorCode, 'permission_denied');
});

# Drapo Bridge Extension

Manifest V3 extension that gives authorized Drapo edit sessions a pixel-faithful page screenshot path through `chrome.tabs.captureVisibleTab`.

## Scope

- Chrome and Edge from one TypeScript codebase.
- Screenshot only: viewport, element crop, bounded full-page scroll/stitch.
- No screenshot upload from the extension.
- No persistent extension settings.
- Top-level Drapo page only.

## Build

```bash
npm install
npm test
npm run build
```

Outputs:

- `artifacts/drapo-bridge-chrome.zip`
- `artifacts/drapo-bridge-edge.zip`

Customer-specific managed package from the same codebase:

```bash
DRAPO_BRIDGE_HOSTS=https://drapo.customer.com/* npm run build:customer
```

Development unpacked package:

```bash
npm run build:dev
```

Load `build/dev` as an unpacked extension. Dev builds include localhost host permissions and source maps. Store/customer packages do not include source maps.

## Protocol

The content script announces presence:

```ts
{
  source: "drapo-bridge",
  type: "drapo-bridge:hello",
  version: "1.0.0"
}
```

Drapo enables the bridge only inside an authorized edit session:

```ts
{
  source: "drapo",
  type: "drapo-bridge:handshake",
  bridgeSessionId: "<opaque-backend-issued-session-id>"
}
```

Screenshot request:

```ts
{
  source: "drapo",
  type: "drapo-bridge:screenshot",
  requestId: "<caller-generated-id>",
  bridgeSessionId: "<same-session-id>",
  mode: "viewport" | "element" | "fullPage",
  rect: { "x": 0, "y": 0, "width": 400, "height": 300 },
  timeoutMs: 10000
}
```

Element `rect` is in document CSS pixels. Drapo computes it.
`timeoutMs` is optional and defaults to 10000ms.

Result:

```ts
{
  source: "drapo-bridge",
  type: "drapo-bridge:screenshot-result",
  requestId: "<caller-generated-id>",
  mode: "viewport",
  ok: true,
  imageDataUrl: "data:image/png;base64,...",
  width: 1440,
  height: 900,
  devicePixelRatio: 2,
  scrollX: 0,
  scrollY: 320,
  viewportWidth: 720,
  viewportHeight: 450,
  documentWidth: 720,
  documentHeight: 1800
}
```

Common `errorCode` values:

- `bridge_disabled`
- `session_expired`
- `session_replaced`
- `invalid_session`
- `permission_denied`
- `timeout`
- `busy`
- `too_large`
- `capture_failed`

The content script emits `drapo-bridge:hello` at startup, again during the first 300ms detection window, and in response to a `drapo-bridge:hello-request` message from Drapo.

## Host Permissions

The backend cannot grant extension host permissions. Browser host access must come from the extension manifest, optional user grant, or enterprise browser policy.

SaaS package:

```json
"host_permissions": ["https://*.tech6cloud.com/*"]
```

On-prem customer deployments should default to exact app hosts:

```json
"https://drapo.customer.com/*"
```

Use wildcard customer domains only when the customer intentionally hosts Drapo on multiple subdomains.

## Chrome Enterprise Policy

Replace `EXTENSION_ID_HERE` and `https://drapo.customer.com`.

```json
{
  "EXTENSION_ID_HERE": {
    "installation_mode": "force_installed",
    "update_url": "https://clients2.google.com/service/update2/crx",
    "runtime_allowed_hosts": ["https://drapo.customer.com"]
  }
}
```

## Edge Enterprise Policy

Replace `EXTENSION_ID_HERE` and `https://drapo.customer.com`.

```json
{
  "EXTENSION_ID_HERE": {
    "installation_mode": "force_installed",
    "update_url": "https://edge.microsoft.com/extensionwebstorebase/v1/crx",
    "runtime_allowed_hosts": ["https://drapo.customer.com"]
  }
}
```

## Mock Page

For local manual validation:

1. Run `npm run build:dev`.
2. Load `build/dev` as an unpacked extension in Chrome or Edge.
3. Serve this directory on localhost.
4. Open `mock/index.html`.
5. Start a mock session and request screenshots.

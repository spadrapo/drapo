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

Packaging requires the system `zip` command to be available in `PATH`.

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

## Security Contract

The extension only runs on configured hosts and only accepts top-level, same-window, same-origin, namespaced messages. Within that boundary, the page origin is trusted: any script running in the authorized top-level page can see the backend-issued bridge session id and can send the same bridge messages.

The backend must only emit the opaque `bridgeSessionId` into pages where the current user/session is authorized for T6 GPT CMS editing. Avoid adding untrusted third-party scripts to those edit pages. The extension does not validate the session id cryptographically and does not contact the backend; server-side authorization and auditing belong to Drapo/PowerPlanning.

## Host Permissions

The backend cannot grant extension host permissions. Browser host access must come from the extension manifest, optional user grant, or enterprise browser policy.

Chrome requires the `"<all_urls>"` host permission for `chrome.tabs.captureVisibleTab` when capture is not triggered by a direct extension user gesture. A button click inside the Drapo page does not create an `activeTab` grant for the extension. The generated manifests therefore request `"<all_urls>"` for capture access, while content-script injection remains restricted to the generated app-host match list.

This means Chrome can show the site-access warning as `On all sites`. That permission is required for page-initiated pixel screenshots with `captureVisibleTab`; it is not used to inject Drapo Bridge on every site. If a package must avoid the broad browser warning, the product flow must change to an extension-action/`activeTab` capture flow or a non-pixel-faithful in-page capture implementation.

SaaS package content-script matches:

```json
"permissions": [],
"host_permissions": ["<all_urls>"],
"content_scripts": [{ "matches": ["https://*.tech6cloud.com/*"] }]
```

The extension still uses explicit content-script matches to decide where Drapo can handshake.

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

The mock files are committed developer fixtures. They are not copied into packaged extensions; `scripts/package-extension.mjs` only packages `dist`, `icons`, and `manifest.json`.

Use the Drapo client mock to validate `window.drapo.Bridge` against the unpacked dev extension:

```bash
cd src/Middleware/Drapo
npm install
npx tsc -p tsconfig/development/tsconfig.json

cd ../../Extension
npm install
npm run build:dev
npm run mock
```

Then load `src/Extension/build/dev` as an unpacked extension in Chrome or Edge and open:

```text
http://localhost:6335/src/Extension/mock/drapo-client.html
```

The mock page has one button for each bridge client method:

- `Configure` calls `window.drapo.Bridge.Configure`.
- `Capture Viewport`, `Capture Element`, and `Capture Full Page` call `window.drapo.Bridge.CaptureScreen`.
- `Clear Session` calls `Configure("")`.

Use `PORT=6336 npm run mock` if port `6335` is already in use.

`mock/index.html` remains as a lower-level protocol fixture that posts bridge messages directly without going through Drapo's client API.

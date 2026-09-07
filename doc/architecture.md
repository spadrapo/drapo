# Drapo Architecture

This document describes how the Drapo codebase is organized: the technology stack,
the solution layout, and how the client runtime and server middleware fit together.
For day-to-day build/test commands and conventions, see [development.md](development.md).

## What Drapo is

Drapo is a declarative Single Page Application (SPA) framework. Applications are built
with `d-*` HTML attributes and mustache `{{ }}` binding instead of hand-written
JavaScript. It ships as two cooperating parts:

- a **client runtime** (`drapo.js`) compiled from TypeScript, which processes the DOM,
  binds data, runs control flow and events, and talks to the server; and
- an **ASP.NET Core middleware** (NuGet package `Drapo`, assembly
  `Sysphera.Middleware.Drapo`) that serves the runtime, pages, components, packs,
  themes, and data endpoints, and supports dynamic/multi-tenant routing.

## Technology stack

| Area | Technology |
|------|------------|
| Client runtime | TypeScript 7.0.2 (native compiler) → `drapo.js`; production target ES2017, development target ES2022 |
| Client lint | TSLint 6.1.3 (`tslint.json`), running on the `@typescript/typescript6` compiler API via `scripts/tslint.cjs` |
| Real-time | `@microsoft/signalr` 10.0.11 browser build (WebSocket pipes); its ES2019 syntax sets the floor of the bundle |
| Minification | `uglify-js` (compress + mangle) |
| Server | ASP.NET Core middleware in C# |
| Target frameworks | `netcoreapp3.1`, `netcoreapp6.0`, `net8.0`, `net10.0` |
| .NET SDK | `10.0.100` (pinned in `global.json`, `rollForward: latestFeature`) |
| Tests | Selenium WebDriver + NUnit |
| Editor tooling | VS Code extension (`src/Extension/`) |

## Solution layout

```
src/
├── Drapo.sln                       # Solution
├── Middleware/Drapo/               # Core framework (the published package)
│   ├── ts/                         # TypeScript source — 80+ Drapo*.ts files (the runtime)
│   ├── js/                         # Compiled JS output
│   ├── tsconfig/development/       # Dev tsconfig (used for Debug builds)
│   ├── tsconfig/production/        # Prod tsconfig (used for TSLint + Release builds)
│   ├── tslint.json                 # TSLint rules
│   ├── scripts/                    # create-lib.mjs (bundle drapo.js) and tslint.cjs (TSLint on TypeScript 7)
│   ├── components/                 # Built-in components (e.g. debugger)
│   ├── lib/<tfm>/                  # Per-framework build artifacts
│   ├── *.cs                        # ASP.NET Core middleware + server-side types
│   └── Drapo.csproj                # Multi-target project; compiles TS during build
├── Web/WebDrapo/                   # Host web app used to exercise the framework
│   └── wwwroot/DrapoPages/         # 500+ feature/test pages (*.html)
├── Test/WebDrapo.Test/             # Selenium-based end-to-end tests
│   ├── Pages/                      # Expected rendered HTML (*.Test.html, Embedded Resource)
│   └── ReleaseTest.cs              # Main test class; one ValidatePage(...) per feature
└── Extension/                      # VS Code extension (editor support for d-* syntax)
```

## Client runtime (TypeScript)

The runtime lives in `src/Middleware/Drapo/ts/` as ~80 `Drapo*.ts` files. It is
organized around a central application object plus focused handlers and services:

- **`DrapoApplication`** — the root object (exposed as `drapo` in the browser). It owns
  the handlers/services below and exposes `_isLoaded`, which tests wait on.
- **Handlers** (`Drapo*Handler.ts`) — each owns one concern:
  - `DrapoAttributeHandler` — processes `d-*` attributes on elements
  - `DrapoModelHandler` — two-way binding (`d-model`)
  - `DrapoEventHandler` — `d-on-*` event wiring
  - `DrapoFunctionHandler` — built-in functions used in expressions/handlers (large surface)
  - `DrapoComponentHandler` / `DrapoSectorContainerHandler` — components & sectors
  - `DrapoClassHandler` — dynamic CSS (`d-class`)
  - `DrapoCacheHandler` / `DrapoIndexedDBHandler` / `DrapoCookieHandler` — storage
  - `DrapoPackHandler` — resource packs
  - `DrapoViewportHandler` — virtual scrolling
  - `DrapoWindowHandler` / `DrapoBehaviorHandler` / `DrapoExceptionHandler`
- **Core services** — `DrapoStorage` (data lifecycle, the largest module),
  `DrapoDocument` (DOM processing), `DrapoParser`/`DrapoSolver`/`DrapoExpressionItem`
  (expression parsing & evaluation), `DrapoControlFlow` (`d-for`/`d-if`; each `d-for`
  tags the rows it renders in an owned-items registry so a loop only ever touches its own
  items and never consumes following siblings),
  `DrapoObserver` (reactivity), `DrapoServer`/`DrapoServerRequest`/`DrapoServerResponse`
  (HTTP), `DrapoRouter`/`DrapoRoute` (client routing), `DrapoValidator` (validation),
  `DrapoGlobalization`, `DrapoTheme`/`DrapoStylist` (theming), and `DrapoPipeMessage*`
  (SignalR real-time pipes).
- **Tooling/introspection** — `DrapoDiagnostics`, `DrapoIntrospection`,
  `DrapoRuntimeSnapshot`, and `DrapoDebugger` support diagnostics and LLM/agent tooling.

## Server middleware (C#)

The middleware in `src/Middleware/Drapo/*.cs` (namespace `Sysphera.Middleware.Drapo`)
serves the framework and its resources:

- **`DrapoMiddleware` / `DrapoMiddlewareExtension` / `DrapoMiddlewareOptions`** —
  registration (`AddDrapo()` / `UseDrapo()`) and configuration entry points.
- **`DrapoConfig`** — runtime configuration (caching strategy, storage, etc.).
- **Components** — `DrapoComponent`, `DrapoComponentFile{Disk,Embedded}` resolve
  component files from disk or embedded resources.
- **Packs** — `DrapoPack`, `DrapoPackFile`, `DrapoPackRequest/Response` bundle resources.
- **Dynamic / multi-tenant** — `DrapoDynamic*`, `DrapoRoute`, plus `RouteDelegate` and
  `RouteIndexDelegate` hooks (see [dynamic-routes.md](dynamic-routes.md) and
  [RouteIndexDelegate.md](RouteIndexDelegate.md)).
- **Views / windows / themes** — `DrapoView`, `DrapoWindow`, `DrapoTheme`.

## Build pipeline

The TypeScript build is wired into the C# project (`Drapo.csproj`), so building the
package also lints and compiles the runtime. The commands live in
`src/Middleware/Drapo/package.json` and run the TypeScript 7 native compiler from
`node_modules`:

- **Release** builds run `npm run lint` (TSLint) and then `npm run compile`
  (`tsconfig/production/tsconfig.json`, target ES2017, native async/await).
- **Debug** builds run `npm run compile:dev` (`tsconfig/development/tsconfig.json`,
  target ES2022, source maps).
- TypeScript is compiled **once** in the outer (cross-target) build before the
  per-framework inner builds run in parallel, avoiding races on the shared `js/`
  output. Each inner build then bundles `js/` with the runtime dependencies into
  `lib/<tfm>/drapo.js`, minifies it with `uglify-js -c -m` (local names are mangled; top-level names such as the
  `Drapo*` classes are kept), and embeds both files.
- The `Microsoft.TypeScript.MSBuild` package (7.x) is referenced for the Visual Studio
  integration only; its own compilation is blocked (`TypeScriptCompileBlocked`) so the
  runtime is never compiled twice. `WebDrapo` does use that package to compile its
  demo components (`wwwroot/components/**/*.ts`) with the project's `tsconfig.json`.

**TypeScript 7 notes.** The native compiler has no JavaScript API and no ES5 target.
TSLint needs that API, so `scripts/tslint.cjs` redirects its `require('typescript')`
to Microsoft's `@typescript/typescript6` compatibility package while `tsc` itself is
TypeScript 7. The production output moved from ES5 to ES2017 (TypeScript 7 supports
ES2015 and up; ES2017 additionally keeps `async`/`await` native instead of compiling
every async function into a generator state machine). The bundled SignalR client is an
ES2019 build (optional catch binding, object spread), so the shipped `drapo.js` as a
whole needs an ES2019 browser: Chrome 66, Firefox 58, Safari 11.1, Chromium Edge 79 or
newer. The former `es6-promise` polyfill is gone; every such browser has a native
`Promise`.

This is why **TSLint passing is a hard gate**: a Release build will fail if it doesn't.
See [development.md](development.md) for the exact commands.

## Request/data flow (high level)

1. The browser loads a page that includes `<script src="/drapo.js"></script>`. The
   middleware serves the embedded bundle brotli- or gzip-compressed when the browser
   accepts it (`DrapoMiddlewareOptions.UseCompression`, on by default; see
   `DrapoCompressedContent`), with a per-representation ETag for revalidation.
2. `DrapoApplication` boots, scans the DOM, and resolves `d-datakey` data contexts
   (loading from `d-dataurlget`/`d-dataurl` endpoints served by the middleware as needed).
3. Control-flow attributes (`d-for`, `d-if`) expand the DOM; binding (`{{ }}`, `d-model`)
   and `d-class` render values; `d-on-*` wires events to built-in functions.
4. `drapo._isLoaded` flips to `true` once processing completes — the signal the test
   suite waits on before snapshotting the rendered HTML.
5. Optional SignalR pipes push real-time updates that re-render bound regions.

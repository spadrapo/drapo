# Reviewer persona for spadrapo/drapo

## About the repository

Drapo is a declarative SPA framework: pages use `d-*` attributes and `{{ }}` mustaches instead of hand-written JavaScript. It ships as the `Drapo` NuGet package, an ASP.NET Core middleware plus a TypeScript runtime (`drapo.js`). **Every merge to `master` publishes it to nuget.org** to external consumers you cannot see. What matters most is backward compatibility, then a test that really covers the change.

| Path | Content |
|------|---------|
| `src/Middleware/Drapo/ts/` | Runtime (`Drapo*.ts`): `DrapoControlFlow` (d-for/d-if), `DrapoDocument` (DOM, difference patch), `DrapoStorage` (data), `DrapoFunctionHandler` (built-in functions), `DrapoObserver`, `DrapoParser`/`DrapoSolver`, `DrapoValidator`, `DrapoComponentHandler`, `DrapoPackHandler`, `DrapoPlumber` (SignalR) |
| `src/Middleware/Drapo/` (`*.cs`, `Pipe/`, `Request/`, `components/`) | Middleware and built-in components |
| `src/Web/WebDrapo/` | Test host: `Startup.cs`, `Controllers/`, `wwwroot/DrapoPages/`, `wwwroot/components/` |
| `src/Test/WebDrapo.Test/` | NUnit + Selenium; `Pages/<Page>.Test.html` is the expected rendering |
| `src/Extension/` | Drapo Bridge browser extension with its own `package.json` |

Background: `.specify/memory/constitution.md`, `doc/development.md`, `doc/architecture.md`, the guides in `doc/`, the API reference in `README.md`. The "Active feature" section of `CLAUDE.md` is unrelated to the pull request unless its issue says so. If the `drapo` MCP tools are available they help, but the runtime source is the truth.

The CI workflow **Build Artifact** runs only after a pull request is approved (and on push to `master`). A pull request without CI results is normal, so your own run is the evidence.

`CLAUDE.md` tells interactive agents never to approve or merge. In a saci review your verdict is what saci posts as the review: approve when the pull request meets every gate, since the approval is what starts **Build Artifact**. The merge is a release and always a maintainer's decision; never suggest merging, and say in the review what a maintainer still has to look at.

## Build and test

All commands start at the repository root. A fresh worktree has no `node_modules` and no compiled runtime.

```bash
(cd src/Middleware/Drapo && npm install)
(cd src/Web/WebDrapo && npm install)
dotnet build src/Drapo.sln
(cd src/Middleware/Drapo && npm run lint)     # TSLint, zero errors
dotnet build src/Drapo.sln -c Release         # what CI and the package use
```

- **A green Debug build is not enough.** Debug compiles the runtime with `lib: es2022` and does not lint. Release lints and compiles with `lib: es2017`, so a newer API passes Debug and breaks the release.
- Only a solution build or a build of `src/Middleware/Drapo/Drapo.csproj` recompiles the TypeScript. Building WebDrapo alone serves a stale `drapo.js`.
- The middleware targets `netcoreapp3.1`, `netcoreapp6.0`, `net8.0` and `net10.0`; its C# must compile as C# 8.
- A running host locks its binaries: stop it before rebuilding.

### Full suite

It needs Google Chrome and a host started from the pull request's head on your own port. Run it the way `.github/workflows/build-artifact.yml` does, with the run settings pointed at that port:

```bash
sed "s#http://localhost:9991/#http://localhost:$SACI_PORT/#" src/Test/WebDrapo.Test/Test.Debug.runsettings > "${TMPDIR:-/tmp}/drapo-$SACI_PORT.runsettings"
(cd src/Web/WebDrapo && dotnet run --no-build -c Release -- --Kestrel:Endpoints:Http:Url=http://localhost:$SACI_PORT)     # background job
dotnet test src/Test/WebDrapo.Test/WebDrapo.Test.csproj -c Release --no-build \
  --settings "${TMPDIR:-/tmp}/drapo-$SACI_PORT.runsettings"
```

- **Never use port 9991**, the one fixed in `Program.cs`: other checkouts and people use it, and a host there may be serving other code. The harness strips URLs before comparing, so every test passes on any port.
- It is several hundred browser tests and takes minutes: use a long timeout or a background job.
- **Never use `Test.runsettings`**: it points to a shared remote server that does not run this code.
- One test or an area: add `--filter "Name=<Page>Test"` or `--filter "Name~ControlFlowFor"`.
- `ReleaseTest.cs` and `CompressionTest.cs` need the host. `DrapoRequestReaderTest.cs` runs in process.
- CI has no retries. A test that passes only when rerun alone is flaky, so name it.
- Changes under `src/Extension/` are not covered by the above: `cd src/Extension && npm install && npm test`.

## Running the application for a browser test

- Build first, then start in the background on your port (this setting overrides the fixed 9991):
  `cd src/Web/WebDrapo && dotnet run --no-build -- --Kestrel:Endpoints:Http:Url=http://localhost:$SACI_PORT`
  Add `-c Release` if the Release build is the one you just made: `--no-build` runs whatever that configuration last built.
- URL: `http://localhost:$SACI_PORT/DrapoPages/<Page>.html`. Ready when `http://localhost:$SACI_PORT/drapo.js` answers.
- No sign-in, database or secrets are needed. Only `Authentication.html` logs in, with the test values already on the page.
- No outside services: the Redis backplane is used only when `BackplaneRedis` is set, which WebDrapo does not do. `FunctionRedirectPage.html` has a button that navigates to an external site; do not click it.
- Stop it by the process id **listening on the port** (`dotnet run` starts a child process), then confirm the port is free.
- The launch profile sets Development, even with `-c Release`, which serves the unminified bundle. When a change could behave differently minified or compiled for production (reflection on names, load order, compression), also run `dotnet run --no-build -c Release --no-launch-profile -- --Kestrel:Endpoints:Http:Url=http://localhost:$SACI_PORT`.

How to observe:

- Wait for `drapo._isLoaded === true`. If it stays false, read the console and `drapo.Diagnostics.GetErrorBuffer()`. `drapo.Introspection.GetSnapshot()` shows sectors and data keys.
- The runtime itself clicks `d-id="__drapoUnitTest"` during load. `input[driverunittest="click"]` is clicked only by Selenium: click it yourself.
- The hidden `d-for`/`d-if` template (`display: none`) staying in the DOM is expected.
- The client caches in local storage and the controllers keep state in static fields: for a second attempt use a clean browser context and restart the host.
- Scratch pages in `DrapoPages/` (with `<script src="/drapo.js"></script>`) are served without a rebuild; a new controller endpoint needs one. Delete scratch files afterwards.

## Feature map

Pages are under `/DrapoPages/`.

- d-for: `ControlFlowForArray.html` → open → hidden template `li`, then one `li` each for 0 to 9.
- Viewport d-for: `ControlFlowForViewport.html` → open, scroll the box → rows start at `Key: L0K0`, only part of the 200 items is rendered, and each key stays paired with its value.
- Difference patch: `ControlFlowForDifferenceMixedIdentity.html` → click `input.row-update` → visible rows read `Qty C: !` and `Qty D:`, and their `input.row-input` are the same DOM nodes as before.
- Data loading: `DataSimpleLoad.html` → open → list `K0`, `K1`, … from `/Data/GetData`.
- Events and functions: `FunctionUpdateDataField.html` → click `V1` → "Selected item list" changes from `None` to that item's key.
- Function on startup: `FunctionCastNumber.html` → open → the span bound to `object.v1` shows `15`.
- Conditional class: `ClassConditional.html` → click a row → all rows have `ppUserListRow`, the clicked one also `ppUserSelected`.
- Validation: `ValidationEventInputText.html` → open (it validates itself) → the `d-validation="agree"` block has class `validatorInvalid`.
- Windows: `WindowShowWindow.html` → open → window content inside the `Windows` sector shows `500 +1`.
- Components: `ComponentLabelContext.html` → open → one `d-labelcontext` per item; the first shows `objects.[0].Key` and `L0K0`.
- Sectors: `FunctionUpdateSector.html` → open → tab buttons exist and the `content` sector shows a page; Type1/2/3 add tabs.
- Parent sector: `RouterOne.html` → open → rendered inside the `RouterMaster` layout with `1` in the sector.
- Pipes (SignalR): `DataPipesReloadPipeAsync.html` → open, wait a few seconds → `A:` and `B:` both show `2`.
- Drag and drop: `BehaviorDragAndDropActive.html` → open → user row B has `draggable="false"`; click "Edit A" → A becomes false and B true.
- `drapo.js` compression: `CompressionTest.cs` → brotli or gzip by `Accept-Encoding`, one ETag per representation, 304 on revalidation.

## Review guidelines

### Tests

- A runtime change comes with `DrapoPages/<Page>.html`, `Pages/<Page>.Test.html` (embedded by the project's glob) and `<Page>Test` in `ReleaseTest.cs`. For server behavior a rendered page cannot show, existing precedent is `DrapoRequestReaderTest.cs` (in process) and `CompressionTest.cs` (HTTP).
- **Check that the new test fails without the fix**: restore the changed runtime or middleware files from the merge base, rebuild the solution, restart the host, run the test; then restore the head and rebuild.
- Read the expected snapshot: it must show the correct behavior, not just what the code happens to render. Dynamic sectors appear as `d-sector="@"`.
- A modified **existing** snapshot means rendering changed. Unless the issue asks for it, treat it as a breaking change.
- The harness waits about 2 s for load, clicks `driverunittest` inputs and waits 5 s, and adds 3 s for names containing `Async`. It ignores whitespace outside tags, `<script>`, `<style>` and `src` values. A snapshot cannot show live input or select values or whether a node was replaced; those need `ExecuteScript` assertions (see `ControlFlowForDifferenceSelectAsyncTest`).
- Flag pages that depend on window size, timing luck or static controller state shared with another test, and changes to `Startup.cs`, shared endpoints or components that alter other tests.
- `src/Web/WebDrapo/.gitignore` ignores `*.js` and `*.d.ts`: a component a test needs must be committed as `.ts`.

### Compatibility surface

- `d-*` attribute names and meanings; built-in function names, parameter order, optional parameters and their defaults.
- Public C# types, `DrapoMiddlewareOptions` / `DrapoConfig` members and defaults, interfaces consumers may implement, and the configuration the runtime reads from the server.
- The browser `drapo` object and `Drapo*` classes used by consumer component scripts, and the shipped `index.d.ts`.
- Pipe messages (C# `Pipe/` and TS must agree), `drapo-bridge:` window messages used by `src/Extension/`, cache and storage formats left in a user's browser.
- Package contents and targets (`Package.nuspec`), and the browser floor (ES2019).
- A change to `.github/workflows/**`, `Package.nuspec`, `azure-pipelines.yml`, `.saci/**` or the constitution that the issue does not call for is a finding.

### Where regressions are common

Exercise the neighboring pages (`ControlFlowFor*`, `Data*`, `Function*`, `Component*`, `Sector*`, `Validation*`, `Window*`, `Pack*`, `Route*`) when a change touches:

- **Difference patch and viewport re-render**: `Notify`, `UpdateDataField` and pipe reloads take paths a full render hides. Check optional `d-if` siblings, mixed text and elements, `select` values, focus, and item index binding after scrolling.
- **Concurrency across `await`**: indexes or state read before a load and written after it, component or pack scripts activated twice, events arriving before `window.drapo` exists. Races need a delayed endpoint to show.
- **Observers and sector unload**: parallel lists must stay in sync; private data keys exist once per sector.
- **Strict mode**: the shipped classes throw on writes to primitive values, which can stop a function chain or the page load.
- **Runtime structure**: no `import`/`export`; compiled files are concatenated in alphabetical order into `drapo.js`, so load-time dependencies between files matter.

### Conventions

- New capability extends `d-*` attributes or built-in functions; page authors are not asked to write JavaScript.
- Public behavior added or changed is described in the `README.md` API reference or a guide in `doc/`. The full documentation lives in the separate `spadrapo/docs` repository.
- Test pages PascalCase, methods `<Page>Test`, data keys camelCase, CSS classes kebab-case.
- Titles follow `git log`: `fix(<issue>): …`, also `feat`, `perf`, `build`, `ci`.
- Generated output is not committed: `src/Middleware/Drapo/js/`, `lib/`, compiled component `.js`, `package-lock.json`.

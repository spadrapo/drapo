# Developer persona for spadrapo/drapo

## About the repository

Drapo is a declarative SPA framework: pages use `d-*` attributes and `{{ }}` mustaches instead of hand-written JavaScript. It ships as the `Drapo` NuGet package (an ASP.NET Core middleware plus the TypeScript runtime `drapo.js`). Every merge to `master` publishes it to nuget.org for external consumers, so public attribute, function and middleware behavior must stay backward compatible, and new capability is additive.

| Path | Content |
|------|---------|
| `src/Middleware/Drapo/ts/` | Runtime (`Drapo*.ts`): `DrapoControlFlow` (d-for/d-if), `DrapoDocument` (DOM, difference patch), `DrapoStorage` (data), `DrapoFunctionHandler` (built-in functions), `DrapoObserver`, `DrapoParser`/`DrapoSolver`, `DrapoValidator`, `DrapoComponentHandler` |
| `src/Middleware/Drapo/` (`*.cs`, `Pipe/`, `Request/`, `components/`) | Middleware and built-in components |
| `src/Web/WebDrapo/` | Test host: `Startup.cs`, `Controllers/` (data endpoints), `wwwroot/DrapoPages/` (feature pages), `wwwroot/components/` |
| `src/Test/WebDrapo.Test/` | NUnit + Selenium tests; `Pages/<Page>.Test.html` is the expected output |
| `src/Extension/` | Drapo Bridge browser extension, with its own `package.json` |

Read `.specify/memory/constitution.md`, `doc/development.md`, `doc/architecture.md` and the feature guide in `doc/` for your area. If the `drapo` MCP tools are available (attributes, functions, `validate_drapo`), use them, but the runtime source is the truth.

## Build and test

All commands start at the repository root.

### Build

A fresh worktree has no `node_modules` and no compiled runtime:

```bash
(cd src/Middleware/Drapo && npm install)
(cd src/Web/WebDrapo && npm install)
dotnet build src/Drapo.sln
```

- Lint (must report zero errors): `cd src/Middleware/Drapo && npm run lint`
- **After any `.ts` change, build the solution or `src/Middleware/Drapo/Drapo.csproj`.** Building or running only WebDrapo does not recompile the runtime and serves a stale `drapo.js`.
- **A green Debug build is not enough.** Debug compiles with `lib: es2022`; Release lints and compiles with `lib: es2017`. A newer API (`Array.at`, `Object.fromEntries`) passes Debug and breaks the release. Always run `dotnet build src/Drapo.sln -c Release` before finishing.
- The middleware targets `netcoreapp3.1`, `netcoreapp6.0`, `net8.0` and `net10.0`. C# under `src/Middleware/Drapo/` must compile as C# 8 (the 3.1 default): no file-scoped namespaces, records, `new()` and the like.
- Stop the host before rebuilding: a running WebDrapo locks its binaries.

### Run the host

```bash
cd src/Web/WebDrapo && dotnet run --no-build -- --Kestrel:Endpoints:Http:Url=http://localhost:$SACI_PORT      # background job
```

- The setting overrides the 9991 fixed in `Program.cs`. Never use 9991: other checkouts and people use it.
- Pages are at `http://localhost:$SACI_PORT/DrapoPages/<Page>.html`. It is ready when `http://localhost:$SACI_PORT/drapo.js` answers. No database, secrets or outside services are needed.
- `dotnet run` starts a child process. When done, stop the job you started and the process it left listening on your port (by process id), then confirm the port is free.

### Tests

The tests read the host's address from the run settings. Point a scratch copy at your port, outside the worktree (the harness strips URLs before comparing, so every test passes on any port):

```bash
sed "s#http://localhost:9991/#http://localhost:$SACI_PORT/#" src/Test/WebDrapo.Test/Test.Debug.runsettings > "${TMPDIR:-/tmp}/drapo-$SACI_PORT.runsettings"
# one test, or an area with Name~ControlFlowFor
dotnet test src/Test/WebDrapo.Test/WebDrapo.Test.csproj --no-build \
  --settings "${TMPDIR:-/tmp}/drapo-$SACI_PORT.runsettings" --filter "Name=<Page>Test"
```

**Full suite, required before finishing**, the way CI (`.github/workflows/build-artifact.yml`) runs it:

```bash
dotnet build src/Drapo.sln -c Release
(cd src/Web/WebDrapo && dotnet run --no-build -c Release -- --Kestrel:Endpoints:Http:Url=http://localhost:$SACI_PORT)   # background job
dotnet test src/Test/WebDrapo.Test/WebDrapo.Test.csproj -c Release --no-build \
  --settings "${TMPDIR:-/tmp}/drapo-$SACI_PORT.runsettings"
```

- It is several hundred browser tests and takes minutes: use a long timeout or a background job.
- It needs Google Chrome.
- **Never use `Test.runsettings`**: it points to a shared remote server that does not run your code.
- `ReleaseTest.cs` and `CompressionTest.cs` need the host. `DrapoRequestReaderTest.cs` runs in process (`--filter "FullyQualifiedName~DrapoRequestReaderTest"`) and is the model for a middleware unit test.
- Some tests are timing sensitive. Rerun a failure alone to diagnose it, but CI has no retries and an isolated pass does not make the full run green: report it.
- Browser extension changes: `cd src/Extension && npm install && npm test`.

### Writing a test

1. Page: `src/Web/WebDrapo/wwwroot/DrapoPages/<Page>.html`, with `<script src="/drapo.js"></script>` and a title. Start from a neighbor with the same prefix (`ControlFlowFor*`, `Data*`, `Function*`, `Component*`, `Sector*`, `Validation*`, `Window*`).
2. Method in `ReleaseTest.cs`, in alphabetical order: `<Page>Test` calling `ValidatePage("<Page>")`.
3. Expected output: `src/Test/WebDrapo.Test/Pages/<Page>.Test.html` (embedded by the project's glob). Capture it from a real browser rendering of the fixed code (`document.documentElement.outerHTML` after `drapo._isLoaded === true` and the same interactions), never write it by hand, and read it to confirm it shows the correct behavior. Replace every `d-sector="..."` value with `d-sector="@"`: the harness does that only on the rendered side.

How the harness drives a page:

- It polls `drapo._isLoaded` for about 2 s.
- It clicks every visible `<input driverunittest="click">`, then waits 5 s. The runtime itself clicks an element with `d-id="__drapoUnitTest"` during load.
- A page name containing `Async` gets 3 more seconds.
- The comparison ignores whitespace outside tags, `<script>`, `<style>` and `src` values.

What a snapshot cannot show (live input or select values, whether a node was kept or replaced) is asserted with Selenium and `ExecuteScript`; see `ControlFlowForDifferenceSelectAsyncTest` and `ControlFlowForDifferenceMixedIdentityTest`.

Keep pages deterministic:

- Do not depend on the window size (lazy loading stops once the page scrolls; use a fixed-size `overflow:auto` container).
- WebDrapo controllers keep state in static fields: use a counter or key unique to your page and reset it from the page.
- Changing `Startup.cs`, a shared endpoint or a shared component can change other tests' snapshots.

A regression test for a runtime fix only fails or passes after the solution is rebuilt and the host restarted: do both when checking it with and without the fix. List the page, its snapshot and `ReleaseTest.cs` together as its files.

### Seeing it work

Open your page in a browser against your host, wait for `drapo._isLoaded === true`, interact, and inspect the DOM and console.

- If `_isLoaded` stays false, check `drapo.Diagnostics.GetErrorBuffer()`; `drapo.Introspection.GetSnapshot()` shows sectors and data keys.
- `driverunittest` inputs are clicked only by Selenium: click them yourself.
- The hidden `d-for`/`d-if` template (`display: none`) staying in the DOM is expected.
- `Notify`, `UpdateDataField` and pipe reloads can take the difference-patch path, while a full render can hide a bug there. Races need a delayed endpoint in `DataController.cs` to show.
- Use a clean browser context for a second attempt: the client caches in local storage.

## Conventions

- Declarative first: extend the `d-*` attribute and built-in function vocabulary; do not require page authors to write JavaScript.
- The runtime has no `import`/`export`: classes are globals, and the compiled files are concatenated in alphabetical order into `drapo.js`.
- Follow the surrounding style: explicit types on declarations, explicit `public`/`private`, `this.Application.<Handler>` for collaborators. `tslint.json` forbids `console` and floating promises, among others.
- Built-in functions are dispatched by lowercase name in `DrapoFunctionHandler.ts`, each with its own `ExecuteFunction<Name>` method.
- Naming: PascalCase test pages, `<Page>Test` methods, camelCase data keys, kebab-case CSS classes.
- When public behavior is added or changed, update the API reference in `README.md` or the guide in `doc/`. The full documentation lives in the separate `spadrapo/docs` repository: do not edit it from here.
- Commit and pull request titles: `fix(<issue>): <what now happens>` (also `feat`, `perf`, `build`, `ci`), as in `git log`.

## Do not

- Do not edit `.saci/**`, `.github/workflows/**`, `Package.nuspec`, `azure-pipelines.yml` or `.specify/memory/constitution.md` (protected in `.saci/config.json`). If the issue needs it, ask.
- Do not edit or commit generated output: `src/Middleware/Drapo/js/`, `src/Middleware/Drapo/lib/`, compiled component `.js`, `package-lock.json`.
- `src/Web/WebDrapo/.gitignore` ignores every `*.js` and `*.d.ts`: write component scripts as `.ts`, and check `git status` shows every file your test needs.
- Do not add test retries.
- Do not regenerate an existing snapshot just to make a test pass: a changed snapshot is a behavior change the issue must ask for.
- Do not create or update Spec Kit files (`specs/`, the managed section of `CLAUDE.md`) for an issue. The "Active feature" named in `CLAUDE.md` is not your task unless the issue says so.

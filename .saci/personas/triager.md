# Triager persona for spadrapo/drapo

## About the repository

Drapo is a declarative SPA framework: pages use `d-*` attributes and `{{ }}` mustaches instead of hand-written JavaScript. It ships as the `Drapo` NuGet package: an ASP.NET Core middleware plus a TypeScript runtime (`drapo.js`). Other applications consume it, so reports often come from a downstream app you cannot see. Reduce them to a small Drapo page.

| Path | Content |
|------|---------|
| `src/Middleware/Drapo/ts/` | Runtime (`Drapo*.ts`): `DrapoControlFlow` (d-for/d-if), `DrapoDocument` (DOM and difference patch), `DrapoStorage` (data), `DrapoFunctionHandler` (built-in functions), `DrapoObserver`, `DrapoParser`/`DrapoSolver`, `DrapoValidator`, `DrapoComponentHandler`, `DrapoPlumber` (SignalR) |
| `src/Middleware/Drapo/*.cs`, `Pipe/`, `Request/`, `components/` | Middleware and built-in components |
| `src/Web/WebDrapo/` | Test host: `Startup.cs` (Drapo configuration), `Controllers/` (data endpoints), `wwwroot/DrapoPages/` (feature pages), `wwwroot/components/` |
| `src/Test/WebDrapo.Test/` | NUnit tests; `Pages/<Page>.Test.html` holds the expected output |
| `src/Extension/` | Drapo Bridge browser extension, with its own `package.json` (`npm test`) |

Read `doc/architecture.md`, `doc/development.md` and `.specify/memory/constitution.md` before judging. `README.md` and `doc/` hold the feature guides. If the session has the `drapo` MCP tools (attributes, functions, `validate_drapo`), use them, but the runtime source is the truth.

## Getting it running

A fresh worktree has no `node_modules` and no compiled `js/`. From the repository root:

```bash
(cd src/Middleware/Drapo && npm install)
(cd src/Web/WebDrapo && npm install)
dotnet build src/Drapo.sln
```

- **Build the solution (or `src/Middleware/Drapo/Drapo.csproj`) after any `.ts` change.** Building or `dotnet run`-ning only WebDrapo does not recompile the TypeScript, and serves a stale or missing `drapo.js`.
- Lint: `cd src/Middleware/Drapo && npm run lint`. Debug builds do not lint; Release builds do.
- Run the host on your own port (background job): `cd src/Web/WebDrapo && dotnet run --no-build -- --Kestrel:Endpoints:Http:Url=http://localhost:$SACI_PORT`. The setting overrides the 9991 fixed in `Program.cs`; never use 9991, which other checkouts and people use. Pages are at `http://localhost:$SACI_PORT/DrapoPages/<Page>.html`. It is ready when `http://localhost:$SACI_PORT/drapo.js` answers. No credentials, database or secrets are needed.
- `dotnet run` starts a child process. When done, stop both the job you started and the process that then listens on your port (by process id), and confirm the port is free.
- WebDrapo calls no outside services (the Redis backplane is only used when `BackplaneRedis` is set, and WebDrapo does not set it).

### Tests

Build first, start the host on `SACI_PORT`, point a scratch copy of the run settings at it (outside the checkout), then:

```bash
sed "s#http://localhost:9991/#http://localhost:$SACI_PORT/#" src/Test/WebDrapo.Test/Test.Debug.runsettings > "${TMPDIR:-/tmp}/drapo-$SACI_PORT.runsettings"
dotnet test src/Test/WebDrapo.Test/WebDrapo.Test.csproj --no-build \
  --settings "${TMPDIR:-/tmp}/drapo-$SACI_PORT.runsettings" --filter "Name=<Page>Test"
```

The harness strips URLs before comparing, so every test passes on any port.

- Omit `--filter` for the whole suite (hundreds of browser tests). For triage, run the tests of the affected area, e.g. `--filter "Name~ControlFlowFor"`.
- **Never use `Test.runsettings`**: it points to a shared remote server.
- Selenium needs Google Chrome and opens a visible window.
- `ReleaseTest.cs` (page rendering) and `CompressionTest.cs` need the host running. `DrapoRequestReaderTest.cs` runs in process and is the model for a middleware unit test.
- A failure in a full run: rerun that test alone before using it as evidence. Some are timing sensitive. CI does not retry, so a real flaky test is a bug of its own.

## Reproducing problems

1. Look for an existing page close to the report: `src/Web/WebDrapo/wwwroot/DrapoPages/` is named by area (`ControlFlowFor*`, `Data*`, `Function*`, `Component*`, `Sector*`, `Validation*`, `Window*`, `Router*`, `Pack*`, `Behavior*`).
2. Otherwise write a scratch page there with `<script src="/drapo.js"></script>`. A running host serves new and edited pages without a rebuild. Inline data (`d-dataType` with `d-dataValue` or `d-dataProperty-*`) avoids controller changes; `DataController.cs` already has many sample endpoints (including delayed ones for race conditions). A new endpoint needs a rebuild.
3. Open it with Playwright. Wait for `drapo._isLoaded === true`, interact, then inspect the DOM, not just a screenshot.

What to know while observing:

- `_isLoaded` stays false if startup throws. Check `drapo.Diagnostics.GetErrorBuffer()` and the browser console. `drapo.Introspection.GetSnapshot()` shows sectors, data keys and runtime state; `drapo.Storage.RetrieveData(key, sector)` reads data.
- The runtime itself clicks an element with `d-id="__drapoUnitTest"` during load. `driverunittest="click"` is clicked only by the Selenium harness: click it yourself in Playwright.
- Rendered `d-for` and `d-if` output keeps the hidden template (`style="display: none;"`) in the DOM. That is not a bug.
- `UpdateData` followed by its default notification can do a full render and hide a difference-patch bug. `Notify`, `UpdateDataField` and pipe reloads can take the difference path.
- Overlapping renders and loads show up only with slow responses: use a delayed endpoint rather than concluding "cannot reproduce" from a fast run.
- WebDrapo controllers keep data in static fields, and the client caches in local storage: restart the host and use a clean browser context for a second attempt.
- The Development environment (the default `dotnet run` profile) serves the unminified debug bundle. A report that happens only in production may involve minification or Release compilation: try `dotnet build src/Drapo.sln -c Release`, then `dotnet run --no-build -c Release`, and check which bundle was served.

### Feature map

Paths are under `/DrapoPages/`. Expected output is in `src/Test/WebDrapo.Test/Pages/<Page>.Test.html`.

- d-for: `ControlFlowForArray.html` → open → hidden template `li` followed by one `li` each for 0 to 9.
- Data loading: `DataSimpleLoad.html` → open → list filled with `K0`, `K1`, … from `/Data/GetData`.
- Functions and events: `FunctionUpdateDataField.html` → click a list item → "Selected item list" changes from `None` to that item's key.
- Function with d-model: `FunctionCastNumber.html` → open → the span bound to `object.v1` shows `15`.
- Conditional classes: `ClassConditional.html` → click a row → rows have `ppUserListRow`, the clicked one also gets `ppUserSelected`.
- Validation: `ValidationEventInputText.html` → open (auto-clicks Validate) → the `d-validation="agree"` block has class `validatorInvalid`.
- Windows: `WindowShowWindow.html` → open → window content renders inside the `Windows` sector, showing `500 +1`.
- Components: `ComponentLabelContext.html` → open → one `d-labelcontext` per item, showing `objects.[0].Key` and `L0K0` for the first.
- Sectors: `FunctionUpdateSector.html` → open → tab buttons are created and the `content` sector shows a loaded type page; Type1/2/3 add more.
- Router/parent sector: `RouterOne.html` → open → rendered inside the `RouterMaster` layout, with `1` in the sector.
- Pipes (SignalR): `DataPipesReloadPipeAsync.html` → open, wait about 3 s → `A:` and `B:` both show `2`.
- Compression of `drapo.js`: covered by `CompressionTest.cs`.

## Versions and "already fixed"

- Every push to `master` publishes `Drapo` to nuget.org as `yyyy.M.d.N` (UTC build date; `N` is a run or revision counter). A `-prNNN` suffix is a pull request build that was never published.
- There are no release tags. Find a fix's merge date with `git log --first-parent --date=short --format='%h %cd %s'`; it ships in the first version built from that merge.
- A failed build publishes nothing. For merges since the GitHub workflow took over (October 2026), check with `gh run list --workflow build-artifact.yml --branch master`; if that run failed, the fix ships with a later successful one. Same-day versions need this check too.
- `ApplicationBuild` is the consuming application's own setting, not the Drapo version. Reports often give versions as "since 2026.x.y.z": compare with the dates above.

## Triage guidelines

- **Confirmed** needs a page or test showing the wrong DOM, data, request or error on current `master`, with the expected result. A race or large-data problem you could only trace in code must say so in the evidence.
- **Intended behavior**: check the README API reference, `doc/`, existing pages and their expected snapshots. If a snapshot asserts the reported behavior, changing it is a compatibility decision.
- **Compatibility**: public attribute, function and middleware behavior must stay stable. A change that breaks it, or that asks page authors to write JavaScript, is `needsDesign`. Features should extend the `d-*` and built-in function vocabulary.
- **Targets**: middleware must work on every framework in `Drapo.csproj` (`netcoreapp3.1`, `netcoreapp6.0`, `net8.0`, `net10.0`). The runtime bundle needs an ES2019 browser; older browsers are not supported.
- **Documentation reports**: check the claim against the runtime (e.g. parameter order in `DrapoFunctionHandler.ts`). Full function and attribute documentation lives in the separate `spadrapo/docs` repository; say which repository needs the change.
- **Duplicates**: search closed issues too. Recurring clusters are the d-for difference patch, viewport and concurrent renders; component and pack script activation; observers and sector unload; data reload, cache and pipes; strict-mode or newer-output regressions after the TypeScript 7 move; `Cast`/number formatting; DiagnosticsImage. Search by function or attribute name, class name (`DrapoControlFlow`) and error text. Same area is not the same cause.
- **Criteria and notes** for developers: a behavior change needs a DrapoPages page, its `Pages/<Page>.Test.html` captured from real rendering (embedded by the project's `Pages\*.Test.html` glob), and a `<Page>Test` method in `ReleaseTest.cs`; build, TSLint and the whole suite green; no test retries. Naming: PascalCase pages, camelCase data keys, kebab-case CSS classes.
- Changes to `.github/workflows/**`, `Package.nuspec`, `azure-pipelines.yml`, `.saci/**` or the constitution are protected from the saci developer (`.saci/config.json`): say when a request needs one.
- **Rewritten descriptions**: the repository has no issue template. Follow the style of its good issues: `## Problem`, `## Reproduction` (minimal markup and steps, expected, actual), `## Fix` (only what you can support), `## Tests`.

# Tester persona for spadrapo/drapo

## About the application

Drapo is a declarative SPA framework: pages use `d-*` attributes and `{{ }}` mustaches instead of hand-written JavaScript. It ships as the `Drapo` NuGet package (ASP.NET Core middleware plus the TypeScript runtime `drapo.js`), and every merge to `master` publishes it to consumers you cannot see. What matters is that the documented attributes and functions render and update correctly.

`src/Web/WebDrapo` is only the test host. **A finding is a defect in the framework** (`src/Middleware/Drapo/`) or in `src/Extension/`, shown through a WebDrapo page.

| Path | Content |
|------|---------|
| `src/Middleware/Drapo/ts/` | Runtime: `DrapoControlFlow` (d-for/d-if), `DrapoDocument` (DOM, difference patch), `DrapoStorage` (data), `DrapoFunctionHandler` (functions), `DrapoObserver`, `DrapoParser`/`DrapoSolver`, `DrapoValidator`, `DrapoComponentHandler`, `DrapoPackHandler`, `DrapoPlumber` (SignalR) |
| `src/Middleware/Drapo/` (`*.cs`, `Pipe/`, `Request/`, `components/`) | Middleware and built-in components |
| `src/Web/WebDrapo/` | Host: `Startup.cs`, `Controllers/`, `wwwroot/DrapoPages/`, `wwwroot/components/` |
| `src/Test/WebDrapo.Test/` | NUnit + Selenium; `Pages/<Page>.Test.html` is the expected rendering |

Expected behavior comes from the API reference in `README.md`, the guides in `doc/`, and the test snapshots. If the `drapo` MCP tools are available (attributes, functions, `validate_drapo`) they help, but the runtime source is the truth. Check that markup you wrote is valid before blaming the framework. The "Active feature" section of `CLAUDE.md` is not your task.

## Running it for a test session

All commands start at the repository root. A fresh worktree has no `node_modules` and no compiled runtime.

### Build

```bash
(cd src/Middleware/Drapo && npm install)
(cd src/Web/WebDrapo && npm install)
dotnet build src/Drapo.sln
(cd src/Middleware/Drapo && npm run lint)     # TSLint, zero errors
dotnet build src/Drapo.sln -c Release         # what CI and the package use
```

- Debug compiles the runtime with `lib: es2022` and does not lint. Release lints and compiles with `lib: es2017`, so check both.
- Only a build of the solution or of `Drapo.csproj` recompiles the TypeScript. Building WebDrapo alone serves a stale `drapo.js`.
- A running host locks its binaries: stop it before building.

### Automated tests

The suite needs Google Chrome and a host on your own port. Run it before exploring, then stop that host. This is how `.github/workflows/build-artifact.yml` does it, after the Release build, with the run settings pointed at your port:

```bash
sed "s#http://localhost:9991/#http://localhost:$SACI_PORT/#" src/Test/WebDrapo.Test/Test.Debug.runsettings > "${TMPDIR:-/tmp}/drapo-$SACI_PORT.runsettings"
(cd src/Web/WebDrapo && dotnet run --no-build -c Release -- --Kestrel:Endpoints:Http:Url=http://localhost:$SACI_PORT)   # separate background process
dotnet test src/Test/WebDrapo.Test/WebDrapo.Test.csproj -c Release --no-build \
  --settings "${TMPDIR:-/tmp}/drapo-$SACI_PORT.runsettings"
```

- **Never use port 9991**, the one fixed in `Program.cs`: other checkouts and people use it. The harness strips URLs before comparing, so every test passes on any port.
- It is several hundred browser tests and takes minutes: use a background process or a long timeout.
- **Never use `Test.runsettings`**: it points to a shared remote server.
- Rerun a failure alone (`--filter "Name=<Page>Test"`) to diagnose it. CI has no retries, so a test that fails in the suite and passes alone is flaky, not green. Name it, and say how often it failed.
- `DrapoRequestReaderTest.cs` runs in process; the other tests need the host.
- Browser extension: `cd src/Extension && npm install && npm test`.

### Start the application for exploring

```bash
cd src/Web/WebDrapo && dotnet run --no-build -- --Kestrel:Endpoints:Http:Url=http://localhost:$SACI_PORT
```

- Start it as a separate process with output redirected to a log file. It must run from `src/Web/WebDrapo`, since the content root is the current directory.
- Add `-c Release` to run the Release build: `--no-build` runs whatever that configuration last built.
- Ready when `http://localhost:$SACI_PORT/drapo.js` answers. Pages are at `http://localhost:$SACI_PORT/DrapoPages/<Page>.html`.
- The launch profile sets Development, which serves the unminified bundle. For production behavior (the minified bundle consumers get), also run with `-c Release --no-launch-profile` and play the main flows again.
- No database or secrets. No sign-in except on `Authentication.html`, whose test credentials are already filled in.
- Outside services: none to switch off. The Redis backplane is used only when `BackplaneRedis` is set, which WebDrapo does not do. `FunctionRedirectPage.html` has a button that navigates to an external site: do not click it.
- `dotnet run` starts a child process. Stop the process you started and the one **listening on the port**, by process id, then confirm the port is free.

### Observing and building scenarios

- Wait for `drapo._isLoaded === true`. If it stays false, read the console and `drapo.Diagnostics.GetErrorBuffer()`. `drapo.Introspection.GetSnapshot()` shows sectors and data keys; `drapo.Storage.RetrieveData(key, sector)` reads data.
- The runtime itself clicks `d-id="__drapoUnitTest"` during load. `input[driverunittest="click"]` is clicked only by Selenium: click it yourself.
- For a case no page covers, write a scratch page in `wwwroot/DrapoPages/` with `<script src="/drapo.js"></script>` and a `SaciTester` name prefix. The host serves it without a rebuild. Use inline data (`d-dataType` with `d-dataValue` or `d-dataProperty-*`) or the endpoints in `Controllers/DataController.cs`, which include delayed ones. Delete scratch pages when done.
- Put the full scratch markup in the finding, so the developer can reproduce it without your files.
- Controllers keep state in static fields and the client caches in local storage. For the second reproduction, restart the host and use a clean browser context.

## Where to look

### Feature map

Pages are under `/DrapoPages/` unless the path starts with `/`.

- d-for: `ControlFlowForArray.html` → open → hidden template `li`, then one `li` each for 0 to 9.
- Data loading: `DataSimpleLoad.html` → open → list `K0`, `K1`, … from `/Data/GetData`.
- Two-way binding: `ModelObject.html` → type in the text box and leave it → the span after "Reply:" shows the same text.
- d-if: `ControlFlowForIf.html` → click "Toggle" → the hidden list appears with the keys from `/Data` (`K0` to `K4`); click again → it hides.
- Functions and events: `FunctionUpdateDataField.html` → click a list item → "Selected item list" changes from `None` to that item's key.
- Add item: `FunctionAddDataItem.html` → click "Add" → one more `li` with `1` per click.
- Numeric functions: `FunctionRound.html` → open → `#r2` shows `3`, `#r3` `-3`, `#r4` `2.57`, `#r17` `25`.
- Conditional class: `ClassConditional.html` → click a row → all rows have `ppUserListRow`, only the clicked one also `ppUserSelected`.
- Validation: `ValidationEventInputText.html` → open (validates itself) → the `d-validation="agree"` block has class `validatorInvalid`.
- Windows: `WindowShowWindow.html` → open → the window in the `Windows` sector shows `500 +1`.
- Components: `ComponentLabelContext.html` → open → one `d-labelcontext` per item; the first shows `objects.[0].Key` and `L0K0`.
- Routing: `/city/1/floripa` → open → "City", code `1`, name `floripa`; `/` shows "Main".
- Pipes (SignalR): `DataPipesReloadPipeAsync.html` → open, wait a few seconds → `A:` and `B:` both show `2`.
- Todo app: `Todo.html` → type a task, press Enter → it is listed and the box clears; it survives a reload and appears in a second tab.
- Login: `Authentication.html` → click "Login" → `Ok`; with a wrong password → `Error`.
- `drapo.js` compression: request `/drapo.js` with `Accept-Encoding: br` or `gzip` → matching `Content-Encoding`, an ETag per representation, 304 on revalidation.

### Areas that break often or changed recently

Check `git log` for the current list. Recurring clusters:

- **d-for difference patch and viewport re-render**: `Notify`, `UpdateDataField` and pipe reloads take paths a full render hides. Try `d-if` siblings, mixed text and elements, `select` values, focus, and which item a row is bound to after scrolling.
- **Concurrency across `await`**: items removed while a reload is pending, component or pack scripts activated twice, window messages before `window.drapo` exists. These need a delayed endpoint to show.
- **Sector unload and observers**, private data keys per sector, pipe reload scope.
- **Strict mode and newer JavaScript output**: writes to primitive values, differences between the Debug and Release bundles.
- **Function chains**: blank or null operands in numeric expressions, `Cast`, `Async`, expressions evaluated against the event row.
- Pages whose test is commented out in `ReleaseTest.cs` (for example several `ControlFlowForViewport*`) have less coverage and are worth exploring. Confirm their expected behavior from the code, not from an old snapshot.

## What not to report

- The hidden `d-for`/`d-if` template (`display: none`) staying in the DOM, including a hidden `span` around the `option` template inside a `select`. Generated `d-sector` ids.
- Console errors and failed requests that a page provokes on purpose: error and bad-request pages (`BadRequest`, `DataBadRequest`, `DataError`, `DataPostError`), and the unauthorized `/Authorization/GetUserName` call on `Authentication.html`, which is expected to add `admin` to its list.
- Test host shortcuts: hard-coded credentials, shared in-memory state, data lost on restart, missing input checks in demo controllers, plain styling, accessibility, performance or security headers of demo pages, HTTP without TLS.
- Browsers older than ES2019.
- A missing capability, or a request that would need page authors to write JavaScript: this is a feature request, not a bug.

# Demo persona for spadrapo/drapo

## About the product

Drapo is a declarative SPA framework. Developers write pages with `d-*` HTML attributes, `{{ }}` mustaches and built-in functions instead of hand-written JavaScript. It ships as the `Drapo` NuGet package: an ASP.NET Core middleware (`src/Middleware/Drapo/`) plus a TypeScript runtime served as `/drapo.js`. `src/Extension/` is a separate browser extension (Drapo Bridge).

Drapo has no screens or menus of its own, apart from the built-in debugger (Ctrl+F2 on any Drapo page). **The product the viewer sees is a web application built with Drapo, together with the markup that makes it work.**

`src/Web/WebDrapo` is the test host. Its pages are bare, with data like `K0`/`V0`. Use them to learn how a feature behaves, **never as the screens of a video**.

Vocabulary: attribute (`d-for`, `d-if`, `d-model`, `d-on-click`, `d-class`), data key, mustache, function (`UpdateSector`, `PostData`, `Round`), sector, component, window, pipe, validation. The `drapo` MCP tools (attributes, functions, `validate_drapo`), when available, help check markup. The runtime source is the truth.

## Audience

- Developers who build applications with the package, and their tech leads. They know HTML, ASP.NET Core and what a SPA costs to write. They care about less code, no hand-written JavaScript, behaviour they can rely on, and upgrading without breaking pages.
- Language: **English** for narration, captions, cards and the demo application.
- Advantages are things they would say: "I round totals in the markup, without a script."
- Public behaviour must stay backward compatible. Say "nothing to change in your pages" only when the diff confirms it.
- Build, CI, tests, refactoring, or a server API with no visible effect is `nothingToShow`. A fix or speed-up is worth a video only if a user of a page can see the difference. Never mock a "before".

## Content that makes sense

- One story for every video: **Harbor & Pine Supply**, an invented wholesaler of café and kitchen equipment. Its developers build the internal app **Harbor & Pine Operations**, with pages for Orders, Inventory, Customers and Purchase Requests.
- Departments: Sales, Warehouse, Purchasing, Finance. People, customers (cafés, bakeries, hotels) and products are invented and stay consistent across videos.
- Amounts in USD. Orders from about $180 to $12,400, in the current quarter. Lists of 40 to 200 rows where size matters, never three.
- Never: real companies or people, names from the issue, WebDrapo sample values, `test`, `foo`, `Item 1`, lorem ipsum.
- The app is a sample built for the video. Never present it as part of Drapo or as a customer's system.

### The demo application

WebDrapo cannot hold this content without changing the checkout, so the app is a **separate ASP.NET Core host kept in the kit** (create it if missing), with the issue's pages and data in the demo folder.

- Target `net10.0` and add a `ProjectReference` to `src/Middleware/Drapo/Drapo.csproj`, with the checkout path passed as an MSBuild property. Never use the published NuGet package, which may not contain the feature.
- Model it on `src/Web/WebDrapo/Startup.cs` and `Program.cs`: `AddDrapo()`, `UseDrapo(...)`, static files, controllers. Do not hard-code the URL, so `--urls` can set it.
- Keep JSON property names unchanged (`PropertyNamingPolicy = null` and Newtonsoft's `DefaultContractResolver`), or mustaches will not match the C# names.
- `Config.UseRouter` is on by default. Set it to `false` unless the feature is routing; routing needs `wwwroot/index.html` and `Config.CreateRoute`.
- Pipes need `AddSignalR`, `Config.UsePipes = true`, `MapHub<DrapoPlumberHub>("/" + Config.PipeHubName)` and `IDrapoPlumber.Send` (see `Controllers/ChatController.cs`).
- Saving data: copy the pattern of `Controllers/TodoController.cs` or `ChatController.cs`. In-memory data is enough; a restart resets it.
- Custom components: a folder per component with `.html`, `.css` and `.js`, loaded with `Config.LoadComponents`.
- Write pages the way a good Drapo user would: declarative only, no custom JavaScript doing the feature's work, `d-cloak` so raw mustaches never flash, camelCase data keys, kebab-case CSS classes. Check them with `validate_drapo` when available.
- Make the pages look like a finished business application (header, navigation, tables, aligned and formatted numbers). Navigation between them should work.

## Style

- **Maximum length**: 3 minutes. A single function or fix usually needs 60 to 90 seconds.
- 1920x1080, file name `i<issue number>.mp4`.
- **Show the markup.** After or before showing the behaviour, show the few lines that produce it (about 5 to 15), large and syntax-coloured, with the new attribute or function highlighted. Read them from the file the app is serving, never retype them. For a developer this is the proof of "how little I write".
- When saved or pushed data is the point, show it on screen again: reload the page, or put two windows side by side for pipes.
- Visual identity: the repository has no Drapo logo, colour tokens or brand fonts, and the extension icons belong to Drapo Bridge only. Use this series look for cards, captions, highlights, code panels and the demo app:
  - Dark `#0F172A`, accent `#2563EB`, surface `#FFFFFF`, page `#F1F5F9`, body text `#1E293B`, highlight `#FDE68A`.
  - Inter for text and JetBrains Mono for code (both OFL, downloaded once into the kit). 8 px corner radius.
  - The wordmark is the word "Drapo" set in Inter bold. Do not invent a logo.
- Opening card: "Drapo", the feature name and a one-line promise. Closing card: the advantages in a developer's words, plus the attribute or function name.
- Captions: on, bottom centre, a few words on a dark band, never over the code or the control being discussed.
- Pointer: about the size of a real pointer, with a small accent-coloured ring on click.

## Voice and music

- **Voice**: `af_heart` (language `en-us`), speed 1.0. Calm and direct, one developer showing another. No marketing superlatives.
- **Engine**: Kokoro, run locally with the Python package `kokoro-onnx` (plus `soundfile`) in a virtual environment inside the kit. Model files `kokoro-v1.0.onnx` and `voices-v1.0.bin` are downloaded once from the `model-files-v1.0` release of `github.com/thewh1teagle/kokoro-onnx`. Output is WAV; resample to 48 kHz stereo in the mix.
- No online voice is offered.
- **Pronunciation** (respell or give phonemes in the spoken text only; captions keep the real spelling):
  - Drapo: "DRAH-poh"
  - `d-for`, `d-model`: "dee for", "dee model"
  - `drapo.js`: "Drapo dot J S"
  - `.NET`: "dot net"; NuGet: "new get"; SignalR: "signal R"
  - Never read code, braces or parameter lists aloud. Say what they do.
- **Music style**: light, optimistic soft electronic, about 100 bpm, major chords, warm pad with clean plucked arpeggio, no drums. Generated by the session (a kit script). About 20 dB under the voice.

## Running it for the recording

All commands start at the root of the checkout. No database, secrets, sign-in or outside services are needed.

- Prepare (a fresh worktree has no `node_modules` or compiled runtime):

  ```bash
  (cd src/Middleware/Drapo && npm install)
  dotnet build src/Middleware/Drapo/Drapo.csproj -c Release
  ```

  This must run before building the demo host: a project reference builds only one target framework and does **not** compile the TypeScript. Rebuild this project after switching commits, or `drapo.js` is stale. Release also lints, and serves what consumers get.
- Then build the kit's host in Release and start it as a background process, output to a file, with `--urls http://localhost:$SACI_PORT`. Its content root must contain the `wwwroot` with the issue's pages. Leave `DrapoMiddlewareOptions.Debug` false.
- Ready when `http://localhost:$SACI_PORT/drapo.js` answers.
- A page is loaded when `drapo._isLoaded === true`. Wait for that, then for the element you expect. If it stays false, read the console and `drapo.Diagnostics.GetErrorBuffer()`. `drapo.Introspection.GetSnapshot()` lists sectors and data keys.
- The client caches in local storage: use a fresh browser context for every take, and restart the host to reset data.
- Hidden `d-for`/`d-if` template nodes stay in the DOM. Select visible elements only.
- **Reference host** (only to study a behaviour):

  ```bash
  (cd src/Web/WebDrapo && npm install)
  dotnet build src/Drapo.sln -c Release
  cd src/Web/WebDrapo && dotnet run --no-build -c Release -- --Kestrel:Endpoints:Http:Url=http://localhost:$SACI_PORT
  ```

  Pages are at `/DrapoPages/<Page>.html`. It must run from `src/Web/WebDrapo`. Stop it before recording on the same port.
- Cleanup: stop the process you started and the one listening on your port, by process id (`dotnet run` starts a child). Data lives in memory, so nothing else needs removing. Never commit the build output.
- Outside services: none. The Redis backplane is off unless `BackplaneRedis` is set; leave it unset.

## Feature map

Reference pages under `/DrapoPages/` in WebDrapo. Reproduce the behaviour with Harbor & Pine content.

- Two-way binding: `ModelObject.html` → type in the box and leave it → the text appears after "Reply:".
- Show and hide with `d-if`: `ControlFlowForIf.html` → click "Toggle" → the list of keys appears; click again → it hides.
- Conditional style: `ClassConditional.html` → click a row → only that row is highlighted.
- Update data from an event: `FunctionUpdateDataField.html` → click a list item → "Selected item list" shows its key.
- Validation: `ValidationEventInputText.html` → leave the text empty and click "Validate" → "You must fill the value" is shown.
- Windows: `WindowShowWindow.html` → open → a window is rendered inside the page's `Windows` sector.
- Queries in markup: `DataQueryInnerJoin.html` → open → rows combining two data sources.
- Numeric functions: `FunctionRound.html` → open → labelled results of nearest, `floor` and `ceiling` rounding.
- Live updates over pipes: `Chat.html` in two windows → send a message in one → it appears in the other without reload.
- Themes: `Themes.html` → pick a theme in the list → the page reloads with it selected.
- Debugger: any Drapo page → Ctrl+F2 → the built-in debugger panel opens; again to close.

## Where features live in the code

| What | Where |
|---|---|
| Built-in functions | `src/Middleware/Drapo/ts/DrapoFunctionHandler.ts`, dispatched by lowercase name to `ExecuteFunction<Name>` (read it for parameters and defaults) |
| `d-for`, `d-if` | `ts/DrapoControlFlow.ts`; `doc/dfor.md` |
| Data loading and saving | `ts/DrapoStorage.ts` |
| Events, binding, validation, components | `ts/DrapoEventHandler.ts`, `DrapoBinder.ts`, `DrapoModelHandler.ts`, `DrapoValidator.ts`, `DrapoComponentHandler.ts` |
| Other attributes | search `ts/` for the literal `d-name` |
| Middleware and options | `src/Middleware/Drapo/*.cs` (`DrapoConfig.cs`, `DrapoMiddlewareOptions.cs`, `Pipe/`); `doc/dynamic-routes.md`, `doc/RouteIndexDelegate.md` |
| Reference pages | `src/Web/WebDrapo/wwwroot/DrapoPages/<Page>.html` |
| What each page should render | `src/Test/WebDrapo.Test/Pages/<Page>.Test.html`, test `<Page>Test` in `ReleaseTest.cs` |

- To demo a pull request, start with the test page it added or changed: it shows the exact markup and the expected result. A commented-out test is not evidence that the page works.
- Pages with `input[driverunittest="click"]` are clicked only by the Selenium harness: click them yourself. The runtime clicks `d-id="__drapoUnitTest"` by itself during load, so do not copy that id into demo pages.
- There are no permissions or feature flags. Behaviour is switched by `options.Config.*` in the host's `UseDrapo` call.

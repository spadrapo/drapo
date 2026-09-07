# Drapo Development Guide

How to build, lint, and test Drapo, and the conventions to follow when contributing.
For the system design and code layout, see [architecture.md](architecture.md).

## ⚠️ Mandatory quality gates

**Every code change MUST satisfy all three before it is considered complete:**

1. **Compiles** — `cd src && dotnet build Drapo.sln`
2. **Passes TSLint with zero errors** —
   `cd src/Middleware/Drapo && npm run lint`
3. **Has tests** — new functionality includes tests; modified functionality updates
   the affected tests (see [Testing workflow](#testing-workflow)).
4. **Passes the full test suite** — every test must be green. A PR can only be approved
   once all tests pass (see [Running the tests](#running-the-tests)).

These are non-negotiable. A Release build runs TSLint and will fail if it does not pass.

## Prerequisites

- .NET SDK `10.0.100` (pinned in `global.json`; `rollForward: latestFeature`)
- Node.js 16.20+ + npm (TypeScript 7 ships as a native binary for Windows, Linux, and
  macOS on x64/arm64)

## Build & lint commands

```bash
# Install npm dependencies (run first, from the middleware dir)
cd src/Middleware/Drapo && npm install

# MANDATORY: TypeScript lint — must pass with zero errors
# (runs TSLint through scripts/tslint.cjs, which gives it the TypeScript 6 compiler API)
cd src/Middleware/Drapo && npm run lint

# Compile the TypeScript runtime directly (optional; the build also does this)
cd src/Middleware/Drapo && npm run compile       # production tsconfig (ES2015, no source maps)
cd src/Middleware/Drapo && npm run compile:dev   # development tsconfig (ES2022, source maps)

# Build the full solution
cd src && dotnet build Drapo.sln

# Build just the test project (faster; isolates C# issues)
cd src && dotnet build Test/WebDrapo.Test/WebDrapo.Test.csproj
```

**Error-resolution order:**
TSLint first → C# compilation (build the individual project to isolate) → install any
missing npm/NuGet dependencies → fix all errors before moving on.

## Testing workflow

Tests are end-to-end and run with **Selenium WebDriver + NUnit**. Each test navigates to
a page in `src/Web/WebDrapo/wwwroot/DrapoPages/`, waits for the runtime to finish
(`drapo._isLoaded === true`), captures the final rendered HTML, and compares it against a
stored expected snapshot in `src/Test/WebDrapo.Test/Pages/`.

> **PR approval requires a fully green test suite.** A pull request may only be approved
> and merged once **all** tests pass. There are no exceptions and no "known failing"
> tests. The Azure pipeline's automated `Test` step is currently disabled, so reviewers
> and authors must run the suite locally (steps below) and confirm every test passes
> before approving.

### Running the tests

The test project is `src/Test/WebDrapo.Test/WebDrapo.Test.csproj` (targets `net10.0`,
NUnit + `Selenium.WebDriver`). Because the tests drive a real browser against a running
site, two prerequisites must be in place:

1. **Google Chrome** must be installed (Selenium uses ChromeDriver; the setup looks for
   `chrome.exe` under `C:\Program Files\Google\Chrome\...` or the x86 path).
2. **The WebDrapo host app must be running** and serving the `DrapoPages/` at the URL the
   tests point to (default `http://localhost:9991/`).

**Step 1 — start WebDrapo** (serves on `http://localhost:9991/`):

```bash
cd src && dotnet run --project Web/WebDrapo
```

(Equivalently, launch the `WebDrapo` or `IIS Express` profile from Visual Studio.)

**Step 2 — run the suite** against that instance, leaving WebDrapo running in another
terminal. The target URL comes from a `.runsettings` `WebDrapoURL` parameter:

```bash
# Run all tests against the local WebDrapo (localhost:9991)
cd src && dotnet test Test/WebDrapo.Test/WebDrapo.Test.csproj \
  --settings Test/WebDrapo.Test/Test.Debug.runsettings
```

- `Test.Debug.runsettings` → `http://localhost:9991/` (local development).
- `Test.runsettings` → the shared remote/staging instance. Use this only when targeting
  that environment instead of a local server.

**Run a single test** while developing:

```bash
cd src && dotnet test Test/WebDrapo.Test/WebDrapo.Test.csproj \
  --settings Test/WebDrapo.Test/Test.Debug.runsettings \
  --filter "Name=YourFeatureTest"
```

You can also run/debug the tests from the Visual Studio **Test Explorer** — select the
matching `.runsettings` via *Test → Configure Run Settings* first.

**What a test run does:** for each `[TestCase]`, ChromeDriver opens
`{WebDrapoURL}DrapoPages/<Page>.html`, polls `drapo._isLoaded` (up to ~2s), performs any
`driverunittest="click"` interactions and async waits, captures `Driver.PageSource`,
normalizes volatile content (absolute URLs, dynamic `d-sector` ids), and asserts it
equals the embedded `Pages/<Page>.Test.html`. The suite currently has 350+ test cases.

### Adding a test for a new feature

1. **Create the test page:**
   `src/Web/WebDrapo/wwwroot/DrapoPages/YourFeature.html` — standard HTML using Drapo
   attributes. Always include `<script src="/drapo.js"></script>` and a meaningful title.

2. **Generate the expected output:**
   - Run the WebDrapo app locally and open the page in a browser.
   - Wait for Drapo to fully load and process the page.
   - Copy the final rendered page source.
   - Save it (unformatted) as
     `src/Test/WebDrapo.Test/Pages/YourFeature.Test.html`.
   - Set its **Build Action to `Embedded Resource`**.

3. **Register the test** in `src/Test/WebDrapo.Test/ReleaseTest.cs`:
   ```csharp
   [TestCase]
   public void YourFeatureTest()
   {
       ValidatePage("YourFeature");
   }
   ```
   `ValidatePage()` loads `DrapoPages/YourFeature.html`, waits for `drapo._isLoaded`,
   handles any test-specific interactions (clicks, delays), and compares the rendered
   HTML with `Pages/YourFeature.Test.html`.

4. **Run and verify** the test passes.

### What to cover

- **Data binding** — two-way binding, model updates, data sync
- **Control flow** — `d-for` loops, `d-if` conditionals, nested structures
- **Events** — click, keyboard, form interactions
- **Components** — lifecycle, data passing, sector management
- **Validation** — form validation, custom rules, error handling
- **Advanced** — drag & drop, resizing, viewport scrolling
- **Edge cases & async** — empty/null data, large datasets, data loading, timers, delays

## Conventions

| Item | Convention | Example |
|------|------------|---------|
| Test pages | PascalCase, descriptive | `DataBindingArray.html` |
| Test methods | page name + `Test` suffix | `DataBindingArrayTest` |
| Data keys | camelCase | `userData`, `formModel` |
| Custom CSS classes | kebab-case | `product-card` |

Additional guidance:

- Prefer declarative `d-*` attributes over hand-written JavaScript.
- Use mustache syntax for binding: `{{object.property}}`.
- Define data early in the page (via `d-datakey`) before it is used; use meaningful
  data-key names.
- Create reusable UI with `d-sector` components.
- Test with various data states (empty, loading, error).

## Contributing checklist

Before opening a PR:

- [ ] `npm run lint` passes with zero errors
- [ ] `dotnet build Drapo.sln` succeeds
- [ ] New/changed behavior has DrapoPages tests, registered in `ReleaseTest.cs`
- [ ] **The full test suite passes** (run against a local WebDrapo — see
      [Running the tests](#running-the-tests)). **A PR is only approved when all tests pass.**
- [ ] Public attribute/function/middleware behavior remains backward compatible (or a
      breaking change is justified with a migration path)

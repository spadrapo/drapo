# Implementation Plan: Round function

**Branch**: `668-round-function` | **Date**: 2026-08-04 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `/specs/002-round-function/spec.md`

## Summary

Add a new declarative Drapo function `Round(value, digits, mode)` to the TypeScript
client runtime. It resolves a numeric expression and rounds it to `digits` decimal
places (default `0`) using one of three directions — `round` (nearest, ties half away
from zero; default), `floor` (toward −∞), or `ceiling` (toward +∞). The function returns
a numeric value so it composes with `UpdateItemField`, `Cast`, and any other
expression/function chain. Delivery includes a DrapoPages render-comparison test and
public documentation (separate `spadrapo/docs` repo).

## Technical Context

**Language/Version**: TypeScript (compiled to `drapo.js`) for the runtime; C# / .NET
(netcoreapp3.1, net8.0, net10.0) for the middleware and test host.

**Primary Dependencies**: Existing Drapo runtime classes — `DrapoFunctionHandler`
(dispatch + `ExecuteFunction*`), `DrapoParser` (`ParseNumber`, `ParseNumberBlock`),
`DrapoBarber`/`DrapoSolver` (mustache + arithmetic resolution). No new dependencies.

**Storage**: N/A.

**Testing**: Selenium WebDriver + NUnit end-to-end "DrapoPages" snapshot tests — a
feature page in `src/Web/WebDrapo/wwwroot/DrapoPages/Round.html`, an expected rendered
snapshot in `src/Test/WebDrapo.Test/Pages/Round.Test.html` (Embedded Resource), and a
`ValidatePage("Round")` case in `src/Test/WebDrapo.Test/ReleaseTest.cs`. Run with
`dotnet test` against a local WebDrapo. See [doc/development.md](../../doc/development.md).

**Target Platform**: Browser client runtime; ASP.NET Core middleware.

**Project Type**: Declarative SPA framework (single solution) — runtime + middleware + docs.

**Performance Goals**: Rounding is O(1) arithmetic per call; no measurable impact.

**Constraints**: Backward compatible / additive only; TSLint zero errors; full suite green.

**Scale/Scope**: One new function (~1 dispatch entry + 1 `ExecuteFunctionRound` method),
one test page + snapshot + test method, one docs function folder.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **I. Declarative-First** — PASS. Adds a function to the declarative vocabulary; page
  authors use `Round(...)` in attributes, no hand-written JS.
- **II. Green Build (NON-NEGOTIABLE)** — PLANNED. `dotnet build Drapo.sln` and
  `npx tslint --project tsconfig/production/` must pass; enforced before PR.
- **III. Test-Backed Changes** — PLANNED. New DrapoPages page + expected snapshot +
  `ReleaseTest.cs` method covering all modes/digits/negatives/midpoints.
- **IV. Render-Comparison Fidelity** — PLANNED. Expected snapshot generated from real
  runtime rendering (drapo `_isLoaded`), not hand-guessed.
- **V. Backward Compatibility & Multi-Target** — PASS. Purely additive new function;
  no existing behavior changed; works across all targeted runtimes.

Result: **PASS** (no violations; Complexity Tracking not required).

## Project Structure

### Documentation (this feature)

```text
specs/002-round-function/
├── plan.md              # This file
├── spec.md              # Feature spec
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/
│   └── round-function.md  # Function contract (signature, modes, cases)
├── checklists/
│   └── requirements.md
└── tasks.md             # Phase 2 output (/speckit-tasks)
```

### Source Code (repository root)

```text
src/Middleware/Drapo/ts/
├── DrapoFunctionHandler.ts   # + dispatch case 'round'; + ExecuteFunctionRound(...)
└── DrapoParser.ts            # reuse ParseNumberBlock / ParseNumber (no change expected)

src/Web/WebDrapo/wwwroot/DrapoPages/
└── Round.html                # NEW feature page exercising all modes/digits/composition

src/Test/WebDrapo.Test/
├── Pages/Round.Test.html     # NEW expected rendered snapshot (Embedded Resource)
└── ReleaseTest.cs            # + RoundTest() -> ValidatePage("Round")
```

Docs repository (`spadrapo/docs`, separate git repo at `C:\git\drapo\docs`):

```text
src/WebDocs/wwwroot/app/functions/Round/
├── description.html
├── parameters.json
└── samples/001/{content.html,description.html}
```

**Structure Decision**: Single-function additive change following the existing
`ExecuteFunction*` pattern in `DrapoFunctionHandler.ts`; test via the standard DrapoPages
snapshot workflow; docs via the existing per-function folder convention. Two repos get a
linked issue/branch/PR: `spadrapo/drapo` (code + test) and `spadrapo/docs` (docs).

## Complexity Tracking

> No constitution violations. Section intentionally empty.

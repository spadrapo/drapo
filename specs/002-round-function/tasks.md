---

description: "Task list for Round function"
---

# Tasks: Round function

**Input**: Design documents from `/specs/002-round-function/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/round-function.md

**Tests**: MANDATORY (constitution — Test-Backed Changes). Delivered via the DrapoPages
render-comparison workflow.

> **Note**: the DrapoPages test files use the `Function<Name>` convention, so the page is
> `FunctionRound.html` / `FunctionRound.Test.html` and the test is `FunctionRoundTest`.

## Phase 1: Setup

- [x] T001 Ensure runtime deps installed: `cd src/Middleware/Drapo && npm install`.

## Phase 2: Core implementation (US1, US2, US3 — all P1)

- [x] T002 [US1/US2/US3] Add dispatch entry `if (functionParsed.Name === 'round')` in
  `src/Middleware/Drapo/ts/DrapoFunctionHandler.ts` calling a new `ExecuteFunctionRound(...)`.
- [x] T003 [US1/US2/US3] Implement `ExecuteFunctionRound(...)` in
  `src/Middleware/Drapo/ts/DrapoFunctionHandler.ts`:
  - Resolve `value` via `ResolveControlFlowMustacheStringFunction` + `ParseNumberBlock`
    (same path as `Cast`), so nested `Cast`/arithmetic composes (FR-002, FR-010).
  - Resolve `digits` (default 0) and `mode` (default `round`) via `ResolveFunctionParameter`.
  - Scale by `10^digits`; apply direction: `round` = half **away from zero**, `floor` =
    `Math.floor`, `ceiling` = `Math.ceil`; unscale; return the number (FR-003..FR-008, FR-011).
- [x] T004 Verify TSLint zero errors: `cd src/Middleware/Drapo && npx tslint --project tsconfig/production/`.
- [x] T005 Verify build: `dotnet build src/Drapo.sln` (regenerates `drapo.js`).

## Phase 3: Test (US1–US4)

- [x] T006 Create feature page `src/Web/WebDrapo/wwwroot/DrapoPages/FunctionRound.html` covering
  every reference case in `contracts/round-function.md`: nearest/floor/ceiling, digits 0
  and >0, negatives, midpoints, unknown-mode fallback, and composition with `Cast` and
  `UpdateItemField` (via a startup function loader).
- [x] T007 Capture expected rendered snapshot into
  `src/Test/WebDrapo.Test/Pages/FunctionRound.Test.html` from the real runtime DOM (drapo
  `_isLoaded`); auto-embedded via the `Pages\*.Test.html` glob.
- [x] T008 Add `FunctionRoundTest()` `[TestCase]` in `src/Test/WebDrapo.Test/ReleaseTest.cs`
  calling `ValidatePage("FunctionRound")`.
- [ ] T009 Run the suite against a running WebDrapo and confirm `FunctionRoundTest` + full suite green:
  `dotnet test src/Test/WebDrapo.Test --settings src/Test/WebDrapo.Test/Test.Debug.runsettings`.

## Phase 4: Documentation (US-docs, FR-014) — `spadrapo/docs` repo

- [x] T010 Create `src/WebDocs/wwwroot/app/functions/Round/description.html`.
- [x] T011 Create `src/WebDocs/wwwroot/app/functions/Round/parameters.json` (value, digits, mode).
- [x] T012 Create `src/WebDocs/wwwroot/app/functions/Round/samples/001/{content.html,description.html}`
  with a runnable sample demonstrating all three modes and `digits`.

## Phase 5: Delivery

- [ ] T013 Commit + push branch `668-round-function` on `spadrapo/drapo`; open PR linked to issue #668.
- [ ] T014 Commit + push docs branch on `spadrapo/docs`; open PR; cross-link both PRs and issue #668.

## Dependencies

- T002 → T003 → (T004, T005) → T006 → T007 → T008 → T009.
- Docs (T010–T012) independent of code; can proceed in parallel after spec is fixed.
- Delivery (T013–T014) after their respective phases pass.

# Implementation Plan: Support consecutive d-for loops as siblings

**Branch**: `661-dfor-consecutive-siblings` | **Date**: 2026-07-01 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `specs/001-dfor-consecutive-siblings/spec.md`

## Summary

`d-for` only renders correctly when it is the **last child** of its parent. When a loop
renders, `DrapoControlFlow.ResolveControlFlowForInternal` computes the loop's
"previously rendered items" as `Document.GetNextAll(elAnchor)` — **every** sibling that
follows the hidden template anchor — and then removes/diffs that whole set. Any content
after the loop (a second `d-for`, or static markup) is therefore treated as the loop's
own output and destroyed.

The fix bounds each loop's rendered-item region to only the elements that loop produced,
using an **ownership marker** on each rendered clone (the same class of technique already
used by the viewport path's "Ballon Before/After" boundary markers and by the `d-hash`
attribute on rendered items). Item collection, removal, and difference logic then operate
only on contiguous siblings the loop owns, leaving following siblings untouched. No public
attribute syntax changes; the change is behavioral and backward compatible.

## Technical Context

**Language/Version**: TypeScript (compiled to `drapo.js`), targeting the Drapo client
runtime; C# / .NET middleware unaffected except for the bundled `drapo.js` output.

**Primary Dependencies**: Drapo client runtime (`src/Middleware/Drapo/ts/`). Key files:
`DrapoControlFlow.ts` (loop rendering), `DrapoDocument.ts` (`GetNextAll`, DOM helpers).
TSLint config in `tsconfig/production/`.

**Storage**: N/A (in-DOM rendering only).

**Testing**: Selenium WebDriver + NUnit end-to-end "DrapoPages" snapshot tests — a
feature page in `src/Web/WebDrapo/wwwroot/DrapoPages/`, an expected rendered snapshot in
`src/Test/WebDrapo.Test/Pages/` (Embedded Resource), and a `ValidatePage(...)` case in
`src/Test/WebDrapo.Test/ReleaseTest.cs`. Run with `dotnet test` against a local WebDrapo.
Per the constitution, tests are mandatory and the full suite must pass before a PR is
approved. See [doc/development.md](../../doc/development.md).

**Target Platform**: Browser DOM (all Drapo-supported browsers); netcoreapp3.1 / net8.0 /
net10.0 for the hosting middleware.

**Project Type**: Declarative SPA framework — TypeScript client runtime + ASP.NET Core
middleware (single repository, not frontend/backend split).

**Performance Goals**: No regression in loop render time. The item-ownership scan must
stay O(rendered items of this loop) and must not re-introduce O(all following siblings)
work on hot re-render paths.

**Constraints**: Fully backward compatible — every existing `d-for` scenario (last-child
loops, nested loops, ranges, `d-for` + `d-if`, `d-for-render` viewport/incremental,
`d-hash`) must render byte-for-byte identically. No new public attribute a page author
must write.

**Scale/Scope**: Localized change in the control-flow rendering path. One or two runtime
methods touched plus a small helper; new DrapoPages tests. No data-model or API surface
changes.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **I. Declarative-First** — PASS. The feature makes existing declarative markup (two
  adjacent `d-for` loops) behave correctly. No logic is pushed to page-author JavaScript;
  if an internal ownership attribute is used it is framework-managed, never authored.
- **II. Green Build (NON-NEGOTIABLE)** — PLANNED. Change compiles via
  `dotnet build Drapo.sln`; `npx tslint --project tsconfig/production/` must report zero
  errors. Gate enforced before PR approval.
- **III. Test-Backed Changes** — PLANNED. New DrapoPages test page(s) for consecutive
  loops and loop-followed-by-static-content, with captured expected snapshots and
  `ValidatePage` registration in `ReleaseTest.cs`.
- **IV. Render-Comparison Fidelity** — PLANNED. Expected outputs captured from real
  runtime rendering, asserted after `drapo._isLoaded`. Existing `d-for` snapshots must
  remain unchanged (regression guard).
- **V. Backward Compatibility & Multi-Target** — PASS. Additive, behavioral fix; no
  breaking change to attributes, functions, or middleware. Any internal ownership marker
  is an implementation detail, not a public API.

**Result**: PASS (no violations; Complexity Tracking not required).

## Project Structure

### Documentation (this feature)

```text
specs/001-dfor-consecutive-siblings/
├── plan.md              # This file (/speckit-plan command output)
├── spec.md              # Feature specification (/speckit-specify)
├── research.md          # Phase 0 output (/speckit-plan command)
├── data-model.md        # Phase 1 output (/speckit-plan command)
├── quickstart.md        # Phase 1 output (/speckit-plan command)
├── contracts/           # Phase 1 output (/speckit-plan command)
│   └── d-for-rendering.md
├── checklists/
│   └── requirements.md  # Spec quality checklist (/speckit-specify)
└── tasks.md             # Phase 2 output (/speckit-tasks command - NOT created here)
```

### Source Code (repository root)

```text
src/Middleware/Drapo/ts/
├── DrapoControlFlow.ts      # Loop rendering; bound item collection to owned items
│                            #   (ResolveControlFlowForInternal, RemoveList paths,
│                            #    ownership tagging on rendered clones)
└── DrapoDocument.ts         # GetNextAll + new owned-siblings helper (if added here)

src/Middleware/Drapo/          # drapo.js rebuilt from the above (build output)

src/Web/WebDrapo/wwwroot/DrapoPages/
├── ForConsecutive.html       # NEW test page: two adjacent d-for loops under one parent
└── ForTrailingStatic.html    # NEW test page: d-for followed by static sibling content

src/Test/WebDrapo.Test/
├── Pages/
│   ├── ForConsecutive.html    # NEW expected snapshot (Embedded Resource)
│   └── ForTrailingStatic.html # NEW expected snapshot (Embedded Resource)
└── ReleaseTest.cs             # NEW ValidatePage(...) cases registering the pages
```

**Structure Decision**: Single-repository Drapo layout. The behavioral change lives in
the TypeScript control-flow runtime (`DrapoControlFlow.ts`, with an optional helper in
`DrapoDocument.ts`); verification uses the standard DrapoPages render-comparison workflow
with new pages, snapshots, and `ReleaseTest.cs` registrations. Naming follows project
conventions (PascalCase pages, `<Page>Test` methods, camelCase data keys).

## Complexity Tracking

> No constitution violations — no entries required.

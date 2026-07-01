# Quickstart & Validation: Support consecutive d-for loops as siblings

**Feature**: `661-dfor-consecutive-siblings` · **Date**: 2026-07-01

This guide describes how to build, validate, and demonstrate the feature end-to-end using
the project's DrapoPages render-comparison workflow. Implementation code goes in the
runtime and test files listed in [plan.md](./plan.md); this file is the run/validation
guide, not the implementation.

## Prerequisites

- .NET SDK per `global.json`; Node/npm for the TypeScript build.
- Client deps installed once: `cd src/Middleware/Drapo && npm install`.
- A local WebDrapo instance for the Selenium tests (see
  [doc/development.md](../../doc/development.md#running-the-tests)).

## Build & lint gates (must pass — constitution II)

```bash
# TypeScript lint (zero errors required)
cd src/Middleware/Drapo && npx tslint --project tsconfig/production/

# C# / .NET build
cd src && dotnet build Drapo.sln
```

## Author-facing demonstration

The feature is proven by markup that previously failed. Two new DrapoPages exercise it.

### Scenario 1 — Two consecutive loops (`ForConsecutive`)

Markup shape (parent holds two adjacent `d-for` loops over different collections):

```html
<ul>
    <li d-for="a in listA">A:{{a}} </li>
    <li d-for="b in listB">B:{{b}} </li>
</ul>
```

Expected: every `listA` item renders, followed by every `listB` item; none missing or
duplicated (Contract C3, SC-001). Updating `listA` leaves the `listB` items untouched
(C5, SC-002).

### Scenario 2 — Loop followed by static content (`ForTrailingStatic`)

```html
<ul>
    <li d-for="a in listA">A:{{a}} </li>
    <li class="footer-row">Total</li>
</ul>
```

Expected: `listA` items render and the static `Total` row survives initial render and any
re-render of `listA` (Contract C4, SC-003).

## Add the render-comparison tests

Follow the standard workflow (see [doc/development.md](../../doc/development.md)):

1. Add feature pages under `src/Web/WebDrapo/wwwroot/DrapoPages/`:
   `ForConsecutive.html`, `ForTrailingStatic.html`.
2. Capture the expected rendered snapshots (generated from real runtime output after
   `drapo._isLoaded`) into `src/Test/WebDrapo.Test/Pages/` as Embedded Resources with the
   same names.
3. Register `ValidatePage(...)` cases in `src/Test/WebDrapo.Test/ReleaseTest.cs`, mirroring
   the existing `ControlFlowForArrayTest` pattern:

   ```csharp
   [TestCase]
   public void ForConsecutiveTest()
   {
       ValidatePage("ForConsecutive");
   }

   [TestCase]
   public void ForTrailingStaticTest()
   {
       ValidatePage("ForTrailingStatic");
   }
   ```

## Run the tests

```bash
# From the test project, against a running WebDrapo
dotnet test --settings Test/WebDrapo.Test/Test.Debug.runsettings
```

## Acceptance / done criteria

- [ ] `ForConsecutiveTest` passes — both loops render fully and independently (SC-001, SC-002).
- [ ] `ForTrailingStaticTest` passes — trailing static content preserved (SC-003).
- [ ] Full existing suite is green with **no** changes to existing `d-for` snapshots
      (SC-004; regression sweep over last-child, nested, range, `d-for`+`d-if`, viewport).
- [ ] TSLint reports zero errors; `Drapo.sln` builds (constitution II).

## Notes for implementers

- The runtime change is in `src/Middleware/Drapo/ts/DrapoControlFlow.ts` (route the
  item-collection / removal / viewport-reset / incremental paths through an "owned items"
  query) with an optional helper in `DrapoDocument.ts`. See
  [research.md](./research.md) decisions D2–D3 and
  [contracts/d-for-rendering.md](./contracts/d-for-rendering.md).
- If an internal ownership marker appears in rendered output, confirm how existing internal
  attributes (e.g. `d-hash`) are treated by the snapshot comparison before finalizing the
  expected snapshots.

---

description: "Task list for feature: Support consecutive d-for loops as siblings"
---

# Tasks: Support consecutive d-for loops as siblings

**Input**: Design documents from `specs/001-dfor-consecutive-siblings/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/d-for-rendering.md, quickstart.md

**Tests**: MANDATORY (constitution — Test-Backed Changes + Render-Comparison Fidelity).
Each behavior story ships a DrapoPages page + expected snapshot + `ValidatePage` case, and
the full suite must be green before PR approval.

**Organization**: Tasks are grouped by user story. Note this is a **single-defect runtime
fix**: all three user stories are served by one shared runtime change (Phase 2), then each
story is an independent test/verification increment.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: US1, US2, US3 (maps to spec.md user stories)

## Path Conventions (Drapo repo)

- Client runtime (TS): `src/Middleware/Drapo/ts/Drapo*.ts`
- Feature pages: `src/Web/WebDrapo/wwwroot/DrapoPages/<Feature>.html`
- Expected snapshots: `src/Test/WebDrapo.Test/Pages/<Feature>.Test.html` (Embedded Resource; `Pages\*.Test.html` wildcard already in csproj)
- Test registration: `src/Test/WebDrapo.Test/ReleaseTest.cs`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Ensure a clean, buildable baseline before changing runtime behavior.

- [ ] T001 Install client deps if needed: `cd src/Middleware/Drapo && npm install`
- [ ] T002 Capture green baseline: `cd src && dotnet build Drapo.sln` and `cd src/Middleware/Drapo && npx tslint --project tsconfig/production/` both succeed before any change
- [ ] T003 [P] Re-read the anchor/item logic in `src/Middleware/Drapo/ts/DrapoControlFlow.ts` (`ResolveControlFlowForInternal`, lines ~150–260) and `GetNextAll` in `src/Middleware/Drapo/ts/DrapoDocument.ts` (~1427) to confirm the three item-collection call sites (viewport reset ~171, items ~184, incremental ~237) per research.md D1/D3

**Checkpoint**: Baseline builds and lints clean; call sites confirmed.

---

## Phase 2: Foundational (Blocking Prerequisites) 🎯 Core fix

**Purpose**: The single runtime change every user story depends on — bound each loop's
rendered-item region to only the elements it owns (research.md D2/D3, data-model.md
"Rendered Item Run", contract C1/C2).

**⚠️ CRITICAL**: No user story can pass until this phase is complete.

- [ ] T004 Add an owned-items query helper (e.g. `GetForRenderedItems(anchor)`) in `src/Middleware/Drapo/ts/DrapoDocument.ts` that returns the maximal run of contiguous siblings after `anchor` carrying the loop ownership marker (empty run when none) — do NOT alter existing `GetNextAll`
- [ ] T005 Tag each rendered clone with the framework-managed ownership marker in `src/Middleware/Drapo/ts/DrapoControlFlow.ts` at the insertion path (`lastInserted.after(template)`, ~line 331) and the template-reuse/hash paths, without disturbing existing `d-hash` handling
- [ ] T006 Route the primary item collection through the helper: replace `GetNextAll(elAnchor)` for `items` at `src/Middleware/Drapo/ts/DrapoControlFlow.ts` ~line 184 so removal/difference (`RemoveList`, ~246 and ~249–251) act only on the owned run (contract C1, FR-002/FR-004)
- [ ] T007 Route the viewport-reset collection (`src/Middleware/Drapo/ts/DrapoControlFlow.ts` ~line 171) and the incremental `start`/`lastInserted` computation (~lines 237–240) through the owned-items query, leaving viewport Ballon-bounded logic (~817–819) intact (research.md D3, contract C7)
- [ ] T008 Guard the empty-data `isContextRootFullExclusive` rebuild branch (`src/Middleware/Drapo/ts/DrapoControlFlow.ts` ~lines 256–262, `SetHTML(elForParent, content)`) so trailing siblings are preserved when the loop is first-but-not-last child (FR-005/FR-007, edge case: empty first loop)
- [ ] T009 Gate check: `cd src/Middleware/Drapo && npx tslint --project tsconfig/production/` zero errors, then `cd src && dotnet build Drapo.sln` (rebuilds `drapo.js`) — constitution II

**Checkpoint**: Runtime fix compiles and lints; loops bound to their own item run.

---

## Phase 3: User Story 1 - Two consecutive d-for loops (Priority: P1) 🎯 MVP

**Goal**: Two adjacent `d-for` loops under one parent render independently; updating one
leaves the other intact (spec US1, contract C3/C5, SC-001/SC-002).

**Independent Test**: Load a page with two adjacent loops over two collections; both
collections render fully and in order; changing one collection does not disturb the other.

- [ ] T010 [P] [US1] Create `src/Web/WebDrapo/wwwroot/DrapoPages/ForConsecutive.html` with a parent containing two adjacent `d-for` loops over two data keys (`listA`, `listB`), plus a control that mutates `listA` to exercise independent re-render (C5)
- [ ] T011 [US1] Run the page in a local WebDrapo, confirm correct rendering after `drapo._isLoaded`, and capture the real rendered output into `src/Test/WebDrapo.Test/Pages/ForConsecutive.Test.html` (Embedded Resource) per constitution IV
- [ ] T012 [US1] Register `ForConsecutiveTest` `[TestCase]` calling `ValidatePage("ForConsecutive")` in `src/Test/WebDrapo.Test/ReleaseTest.cs` (mirror `ControlFlowForArrayTest`)
- [ ] T013 [US1] Run `ForConsecutiveTest` and confirm it passes (SC-001, SC-002)

**Checkpoint**: US1 independently green — the exact issue #661 scenario works.

---

## Phase 4: User Story 2 - d-for followed by static sibling content (Priority: P2)

**Goal**: A `d-for` loop that is not the last child preserves trailing static content on
initial render and re-render (spec US2, contract C4, SC-003).

**Independent Test**: Load a page with a `d-for` loop followed by a static element; the
static element survives initial render and a subsequent loop re-render.

- [ ] T014 [P] [US2] Create `src/Web/WebDrapo/wwwroot/DrapoPages/ForTrailingStatic.html` with a `d-for` loop followed by static sibling markup (e.g. a footer/summary row) plus a control that re-renders the loop
- [ ] T015 [US2] Run the page, confirm the static sibling persists after render and re-render, and capture the rendered output into `src/Test/WebDrapo.Test/Pages/ForTrailingStatic.Test.html` (Embedded Resource)
- [ ] T016 [US2] Register `ForTrailingStaticTest` `[TestCase]` calling `ValidatePage("ForTrailingStatic")` in `src/Test/WebDrapo.Test/ReleaseTest.cs`
- [ ] T017 [US2] Run `ForTrailingStaticTest` and confirm it passes (SC-003)

**Checkpoint**: US1 and US2 both independently green.

---

## Phase 5: User Story 3 - Existing single-loop usage unaffected (Priority: P1)

**Goal**: Zero regressions — last-child, nested, range, `d-for`+`d-if`, and
viewport/incremental pages render byte-for-byte identically (spec US3, contract C7, SC-004).

**Independent Test**: The full existing DrapoPages suite passes with no changes to existing
expected snapshots.

- [ ] T018 [US3] Run the full suite (`dotnet test --settings Test/WebDrapo.Test/Test.Debug.runsettings`) and confirm all existing `d-for`-related cases (`ControlFlowFor*`, `ClassFor*`, `ComponentFor*`, nested/range/viewport) still pass
- [ ] T019 [US3] Confirm no existing `src/Test/WebDrapo.Test/Pages/*.Test.html` snapshot was modified (`git status`/`git diff` shows only new files) — if the ownership marker leaks into output, decide snapshot-normalization consistent with `d-hash` handling (research.md R2, contract "internal")
- [ ] T020 [US3] Add a nested/interleaved edge-case page `src/Web/WebDrapo/wwwroot/DrapoPages/ForConsecutiveMixed.html` (three loops or loop+static+loop, including an empty first loop) with snapshot `Pages/ForConsecutiveMixed.Test.html` and `ForConsecutiveMixedTest` in `ReleaseTest.cs` (spec edge cases; FR-007)

**Checkpoint**: All stories green; no regressions.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Documentation and final gates.

- [ ] T021 [P] Update `doc/dfor.md` to document that `d-for` may be placed anywhere among its siblings and that consecutive loops / trailing static content are supported
- [ ] T022 [P] If a new internal attribute/marker was introduced, note it in `doc/architecture.md` under `DrapoControlFlow` (implementation detail, not author-facing)
- [ ] T023 Run `quickstart.md` validation end-to-end (build + lint + `ForConsecutiveTest` + `ForTrailingStaticTest` + full suite green)
- [ ] T024 Final gate: `cd src/Middleware/Drapo && npx tslint --project tsconfig/production/` (zero errors) and `cd src && dotnet build Drapo.sln`; commit rebuilt `drapo.js`; push to PR #662

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — start immediately.
- **Foundational (Phase 2)**: Depends on Setup — **BLOCKS all user stories** (shared runtime fix).
- **User Stories (Phases 3–5)**: All depend on Phase 2. US1 and US2 are independent of each other; US3 (regression) is most meaningful after US1/US2 exist but can run any time after Phase 2.
- **Polish (Phase 6)**: Depends on all user stories complete.

### Within Each User Story

- Test page (author) → run + capture real snapshot → register `ValidatePage` → run test.
- Snapshot capture depends on the Phase 2 fix being built into `drapo.js`.

### Parallel Opportunities

- T003 (review) is [P] within Setup.
- Test-page authoring T010 [US1] and T014 [US2] are [P] (different files) once Phase 2 is done.
- Doc tasks T021/T022 are [P].
- Snapshot capture/registration/run within a story are sequential (same test flow / shared `ReleaseTest.cs`).

---

## Parallel Example (after Phase 2)

```bash
# Author both new test pages in parallel:
Task: "Create DrapoPages/ForConsecutive.html"      # T010 [US1]
Task: "Create DrapoPages/ForTrailingStatic.html"   # T014 [US2]
```

Note: `ReleaseTest.cs` registrations (T012, T016, T020) touch the same file — do them
sequentially to avoid merge conflicts.

---

## Implementation Strategy

### MVP First (User Story 1)

1. Phase 1 Setup → 2. Phase 2 Foundational (the fix) → 3. Phase 3 US1 → **STOP & VALIDATE**
   the issue #661 scenario. This is the minimum that closes the reported bug.

### Incremental Delivery

1. Setup + Foundational → runtime fix ready.
2. US1 (consecutive loops) → green → MVP (closes #661).
3. US2 (trailing static) → green.
4. US3 (regression sweep + mixed edge case) → green.
5. Polish (docs + final gates + push).

---

## Notes

- [P] = different files, no dependencies. [Story] label maps task → user story.
- Constitution gates are non-negotiable: TSLint zero errors, `Drapo.sln` builds, full suite green before PR approval.
- Expected snapshots MUST be captured from real runtime output (constitution IV), never hand-authored.
- Commit after each logical group; keep existing `*.Test.html` snapshots untouched (regression signal).

---

description: "Task list for empty-operand coalescing fix"
---

# Tasks: Empty/non-numeric operands coalesce to zero

**Input**: Design docs in `/specs/003-cast-empty-number-coalesce/`

**Tests**: MANDATORY (constitution). DrapoPages render-comparison.

## Phase 1: Fix

- [x] T001a In `src/Middleware/Drapo/ts/DrapoParser.ts` `ParseBlockMathematicalExpressionSignals`,
  insert a `'0'` operand when an operator appears while an operand is expected (missing/blank
  operand) — the primary fix (prevents the tokenizer from dropping the next value).
- [x] T001b In `ParseNumber`, change `if (Number.NaN === value)` to `if (Number.isNaN(value))`
  (defense-in-depth; the dead guard never fired).
- [ ] T002 TSLint zero errors (`npx tslint --project tsconfig/production/`).
- [ ] T003 Build (`dotnet build src/Drapo.sln`) — regenerates `drapo.js`.

## Phase 2: Test

- [ ] T004 Create `src/Web/WebDrapo/wwwroot/DrapoPages/CastNumberEmptyField.html`
  reproducing the customer scenario: six `value` keys, some empty, summed via
  `Cast({{t1}}+…+{{t6}},number)`; include all-empty, partially-filled, and a
  `Round(Cast(...),0)` row.
- [ ] T005 Capture expected snapshot from the real runtime into
  `src/Test/WebDrapo.Test/Pages/CastNumberEmptyField.Test.html`.
- [ ] T006 Add `CastNumberEmptyFieldTest()` to `src/Test/WebDrapo.Test/ReleaseTest.cs`.
- [ ] T007 Run `CastNumberEmptyFieldTest` + full suite; confirm green (and no existing
  snapshot changed).

## Phase 3: Docs (`spadrapo/docs`)

- [ ] T008 Update `functions/Cast/description.html` to note empty/non-numeric operands
  resolve to 0 in numeric casts.

## Phase 4: Delivery

- [ ] T009 Commit/push `670-cast-empty-number-coalesce`; PR linked to #670.
- [ ] T010 Docs branch/commit/push; PR; cross-link both PRs and #670.

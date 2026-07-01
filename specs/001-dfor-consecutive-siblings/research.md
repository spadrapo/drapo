# Phase 0 Research: Support consecutive d-for loops as siblings

**Feature**: `661-dfor-consecutive-siblings` · **Date**: 2026-07-01

There were no `NEEDS CLARIFICATION` markers in the spec. This research documents the
root-cause analysis and the technical decisions that resolve the open design questions
for the fix.

## R1 — Root cause of the "must be last child" limitation

**Finding**: In `DrapoControlFlow.ResolveControlFlowForInternal`
(`src/Middleware/Drapo/ts/DrapoControlFlow.ts`), a loop keeps its `display:none` template
element in the DOM as an **anchor** (`elAnchor`) and inserts rendered clones immediately
after it (`lastInserted.after(template)`). On (re-)render, the loop determines its
"previously rendered items" with:

```ts
const items: HTMLElement[] = isContextRootFullExclusive
    ? null
    : this.Application.Document.GetNextAll(elAnchor);   // line ~184
```

`Document.GetNextAll(el)` (`DrapoDocument.ts:1427`) returns **all** siblings that follow
`el` under the same parent. Those `items` are then removed or diffed:

- `RemoveList(items)` — line ~246 (full re-render path)
- trailing removal in the difference path — lines ~249-251
- viewport reset — `RemoveList(GetNextAll(elAnchor))` — line ~171

Because `GetNextAll` does not stop at the loop's own output, **any** sibling after the
loop — a second `d-for` template, its rendered items, or static markup — is collected and
destroyed. Only when the loop is the last child is there nothing after it to destroy,
which is why the limitation manifests as "d-for must be the last child".

**Decision**: The loop must collect only the elements **it** produced, never arbitrary
following siblings. This is the single behavioral change; everything else follows from it.

## R2 — How to identify a loop's own rendered items

**Options considered**:

| Option | Approach | Assessment |
|--------|----------|------------|
| A. Ownership marker attribute | Tag each rendered clone with a framework-managed attribute identifying its owning loop anchor; collect only contiguous following siblings carrying that marker. | **Chosen.** Minimal, consistent with existing `d-hash` attribute on items; no extra layout nodes; robustly bounds the region for both consecutive-loop and trailing-static cases. |
| B. Boundary marker elements | Insert an invisible "end" marker node after the loop's items (mirrors the viewport `BallonBefore`/`BallonAfter` pair). Collect siblings between anchor and end marker. | Viable and already precedented for viewport, but adds DOM nodes for **every** loop, risking layout/CSS-sibling-selector regressions (`:first-child`, `+`, `~`) and snapshot churn. Rejected for the general path. |
| C. Stop at next `d-for` template | Collect following siblings until one has a `d-for` attribute. | Handles consecutive loops only; does **not** handle a loop followed by static content (FR-005). Insufficient. |
| D. Count-based | Remember how many items were produced last render and only touch that many following siblings. | Fragile across `d-if` filtering, viewport, difference re-entry, and external DOM mutation; state must be stored somewhere anyway. Rejected. |

**Decision**: Option **A** — a framework-managed ownership marker on rendered clones. The
loop's item set becomes the maximal run of contiguous siblings immediately after the
anchor that carry this loop's ownership marker. On first render the run is empty, so
following siblings are preserved (fixes the initial-render deletion).

**Rationale**: Drapo already annotates rendered items with internal attributes (`d-hash`)
and already relies on boundary markers for viewport; an ownership attribute is the least
invasive way to make item collection precise without changing layout for the common case.

**Open implementation detail (for Phase 1/tasks, not blocking)**: whether the marker is a
single shared attribute (e.g. presence indicates "loop-rendered, owned by the immediately
preceding anchor run") or carries an anchor identity. Contiguity from the anchor plus a
presence marker is sufficient because a loop's items are always inserted as one
contiguous block directly after its anchor; a following sibling that is another loop's
anchor (`display:none` + `d-for`) or static content will not carry the marker and thus
terminates the run.

## R3 — Interaction with existing rendering modes

**Finding**: The change must preserve five existing behaviors driven by flags in
`ResolveControlFlowForInternal`:

- **`isContextRootFullExclusive`** (first child, full re-render, not wrapped): currently
  sets `items = null` and rebuilds. Must remain correct; when the loop is first child but
  **not** last child, the trailing siblings must survive the rebuild path (`SetHTML`
  branch at lines ~256-262 rebuilds `elForParent` from stored `content` — this must not
  clobber trailing siblings).
- **Difference rendering** (`isDifference`): reuses `items` as old nodes to diff against
  new data; must diff only owned items.
- **Viewport / incremental (`d-for-render`)**: already uses `BallonBefore`/`BallonAfter`
  boundary markers (lines ~817-819) — the general fix must not conflict with these; the
  viewport reset at line ~171 that calls `GetNextAll` must likewise be scoped to owned
  items.
- **`d-if` on the loop**: filtered-out items are skipped; owned-item collection must still
  align old/new nodes correctly.
- **`d-hash`**: item hashing for change detection must continue to work; the ownership
  marker must not collide with or disturb `d-hash`.

**Decision**: Introduce a single helper (e.g. `Document.GetForRenderedItems(anchor)` or an
equivalent scoped scan) and route the three `GetNextAll(elAnchor)`-for-items call sites
(lines ~171, ~184, and the incremental computation at ~237) through it. Leave viewport's
own ballon-bounded logic intact. Verify the `isContextRootFullExclusive` empty-data
rebuild branch does not delete trailing siblings.

**Rationale**: Centralizing the "owned items" query keeps every removal/diff path
consistent and makes the regression surface small and auditable.

## R4 — Verification strategy (constitution-aligned)

**Decision**: Add DrapoPages render-comparison tests:

1. **ForConsecutive** — a parent containing two adjacent `d-for` loops over two
   collections; asserts both render fully and independently, and that updating one leaves
   the other intact.
2. **ForTrailingStatic** — a `d-for` loop followed by static sibling content; asserts the
   static content survives initial render and re-render.

Plus a **regression sweep**: run the full existing suite so last-child, nested, range,
`d-for`+`d-if`, and viewport pages remain byte-for-byte identical.

**Rationale**: Directly maps to User Stories 1-3 and Success Criteria SC-001…SC-005, and
satisfies Constitution principles III (Test-Backed) and IV (Render-Comparison Fidelity).

## Summary of decisions

- **D1**: Root cause is `GetNextAll(elAnchor)` over-collecting following siblings as loop
  items. (R1)
- **D2**: Fix by tagging rendered clones with a framework-managed ownership marker and
  collecting only the contiguous owned run after the anchor. (R2 — Option A)
- **D3**: Centralize owned-item collection in one helper; route the item/removal/viewport-
  reset/incremental call sites through it; leave viewport ballon logic intact; guard the
  empty-data `isContextRootFullExclusive` rebuild branch. (R3)
- **D4**: Verify with two new DrapoPages tests + full-suite regression sweep. (R4)

All `NEEDS CLARIFICATION`: none outstanding.

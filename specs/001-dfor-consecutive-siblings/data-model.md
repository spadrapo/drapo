# Phase 1 Data Model: Support consecutive d-for loops as siblings

**Feature**: `661-dfor-consecutive-siblings` · **Date**: 2026-07-01

This feature does not introduce persisted data or new application storage. The "entities"
here are the **runtime DOM constructs** the control-flow renderer manipulates. They are
documented so the implementation and tests share a precise vocabulary.

## Entities

### Loop Template Anchor

- **What it is**: The original element that carries the `d-for` attribute. Drapo hides it
  (`display:none`) and leaves it in the DOM as the fixed insertion point for the loop.
- **Key attributes**: `d-for` (iteration expression); optionally `d-if`, `d-for-if`,
  `d-for-render`.
- **Relationships**: Owns exactly one contiguous **Rendered Item Run** inserted directly
  after it. May have sibling anchors (other loops) and **Trailing Sibling** content under
  the same parent.
- **Invariant**: The anchor's identity and position are stable across re-renders; item
  collection is always relative to this anchor.

### Rendered Item

- **What it is**: A clone of the template produced for one element of the bound collection
  (after `d-if` filtering), inserted after the anchor.
- **Key attributes**: framework-managed **ownership marker** (new — identifies the item as
  belonging to its loop); optional `d-hash` (existing, for change detection).
- **Relationships**: Belongs to exactly one Loop Template Anchor; ordered within the
  Rendered Item Run.
- **State transitions**: created (new data element) → updated in place (difference/hash) →
  removed (data element gone). Only items of the owning loop may be created/updated/removed
  by that loop.

### Rendered Item Run

- **What it is**: The maximal set of contiguous siblings, immediately following an anchor,
  that carry that loop's ownership marker.
- **Relationships**: One-to-one with a Loop Template Anchor. Bounded on the near side by
  the anchor and on the far side by the first sibling that does **not** carry the marker
  (another loop's anchor, another loop's items, or static content) — or the end of the
  parent's child list.
- **Invariant (the fix)**: Removal and difference operations act **only** within this run.
  On first render the run is empty. The run never extends into a Trailing Sibling.

### Trailing Sibling

- **What it is**: Any element under the same parent positioned after a loop's Rendered
  Item Run — either another Loop Template Anchor or static markup.
- **Invariant (the fix)**: Never collected, removed, or mutated by the preceding loop, on
  initial render or any re-render.

### Viewport Ballon Markers (existing, unchanged)

- **What it is**: `ElementBallonBefore` / `ElementBallonAfter` boundary nodes used by
  `d-for-render="viewport"` to delimit the recycled region.
- **Relationship to this feature**: Precedent for boundary-delimited rendering. The general
  ownership-marker fix must coexist with these; viewport's ballon-bounded collection stays
  as-is.

## Relationship diagram (conceptual)

```text
parent
├── Loop A Anchor (d-for, display:none)
│     └── Rendered Item Run A  ── owned by A ──┐
├── [Rendered Item Run A items…]              │  (contiguous, marker=A)
├── Loop B Anchor (d-for, display:none)   ←── run A stops here (no A marker)
│     └── Rendered Item Run B  ── owned by B
├── [Rendered Item Run B items…]
└── Trailing Sibling (static)             ←── never touched by A or B
```

## Validation rules (derived from Functional Requirements)

- FR-002 / FR-004: A loop's create/update/remove set == its Rendered Item Run only.
- FR-003: Multiple anchors under one parent each own a disjoint Rendered Item Run.
- FR-005: Trailing Siblings are excluded from every run.
- FR-006 / FR-007: Runs remain correct across empty collections, later population, and
  viewport/incremental rendering; existing single-loop output is unchanged.

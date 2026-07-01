# Contract: d-for rendering & sibling ownership

**Feature**: `661-dfor-consecutive-siblings` · **Date**: 2026-07-01

Drapo's public interface is its `d-*` attribute vocabulary. This contract defines the
observable rendering behavior of `d-for` with respect to sibling elements. It is the
authoritative behavioral spec the DrapoPages tests assert against.

## Public attribute (unchanged)

`d-for="<item> in <collection>"` — repeats the annotated element (the template) once per
element of `<collection>`. Syntax, ranges (`(a..b)`), nesting, `d-if`, `d-for-if`,
`d-for-render`, and `d-hash` are unchanged. **No new author-facing attribute is
introduced by this feature.**

## Behavioral contract

### C1 — Loop owns only its rendered items

A `d-for` loop MUST create, update, and remove only the elements it rendered from its own
collection. It MUST NOT remove, reorder, or mutate any sibling element it did not render.

### C2 — Placement independence

A `d-for` loop MUST render correctly regardless of its position among its parent's
children: first child, middle child, or last child. Being the last child MUST NOT be
required.

### C3 — Consecutive loops

Two or more `d-for` loops that are direct siblings under the same parent MUST each render
their own collection independently and in document order. The rendered output MUST be all
of loop 1's items, then all of loop 2's items, etc., with none missing or duplicated.

### C4 — Trailing static content

Static (non-`d-for`) siblings that follow a `d-for` loop MUST be preserved in their
original order on initial render and after every re-render of the loop.

### C5 — Independent re-render

When one loop's collection changes, only that loop re-renders. Sibling loops and their
items, and trailing static siblings, MUST remain byte-for-byte unchanged.

### C6 — Empty and late-populated collections

- A loop bound to an empty collection MUST render nothing and MUST NOT consume or delete
  following siblings.
- Populating a previously empty loop later MUST insert its items in the loop's own region
  (between its anchor and the next sibling) without disturbing following siblings.

### C7 — Backward compatibility

All existing supported behaviors MUST produce identical output to the pre-change runtime:
last-child loops, nested loops, ranges, `d-for` + `d-if`, `d-for-render` viewport /
incremental rendering, and `d-hash` change detection.

## Internal contract (implementation-facing, not author-facing)

- Rendered clones carry a **framework-managed ownership marker**. This marker is an
  internal detail; page authors neither write it nor depend on it. Tests MAY normalize or
  ignore it in snapshots if the render-comparison harness would otherwise flag it (to be
  decided during implementation based on how existing internal attributes like `d-hash`
  are handled in snapshots).
- A single "owned items" query bounds every removal/difference/viewport-reset path to the
  loop's Rendered Item Run.

## Conformance mapping

| Contract | Spec requirement | Success criterion |
|----------|------------------|-------------------|
| C1, C2   | FR-001, FR-002   | SC-005            |
| C3       | FR-003           | SC-001            |
| C4       | FR-005           | SC-003            |
| C5       | FR-004           | SC-002            |
| C6       | FR-007           | SC-001, SC-003    |
| C7       | FR-006           | SC-004            |

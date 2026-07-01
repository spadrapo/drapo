# Feature Specification: Support consecutive d-for loops as siblings

**Feature Branch**: `661-dfor-consecutive-siblings`

**Created**: 2026-07-01

**Status**: Draft

**Input**: GitHub issue #661 — "Problem in d-for": `d-for` currently only renders
correctly when it is the last child of its parent, because Drapo removes every element
that follows the `d-for` when it renders. Two consecutive `d-for` loops under the same
parent must be supported.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Two consecutive d-for loops under the same parent (Priority: P1)

A page author places two `d-for` loops as direct siblings inside the same parent
element (for example, two lists of items rendered one after another inside a single
container). Both loops must render their own collections independently, and neither loop
may consume, overwrite, or delete the elements produced by the other.

**Why this priority**: This is the exact defect reported in issue #661 and the core
capability the feature must deliver. Without it, authors are forced to introduce extra
wrapper elements purely to isolate each loop, which distorts their markup and layout.

**Independent Test**: Create a page with a parent element that contains two adjacent
`d-for` loops bound to two different collections, load the page, and confirm that the
rendered output contains all items from both collections in the correct order.

**Acceptance Scenarios**:

1. **Given** a parent element containing two adjacent `d-for` loops bound to
   collections A and B, **When** the page finishes loading, **Then** all items of A are
   rendered followed by all items of B, and no items are missing or duplicated.
2. **Given** the two consecutive loops have rendered, **When** collection A changes
   (items added, removed, or reordered), **Then** loop A re-renders correctly and the
   items produced by loop B remain intact and unchanged.
3. **Given** the two consecutive loops have rendered, **When** collection B changes,
   **Then** loop B re-renders correctly and the items produced by loop A remain intact.

---

### User Story 2 - d-for followed by static sibling content (Priority: P2)

A page author places a `d-for` loop that is **not** the last child of its parent,
followed by static markup (for example, a footer row after a repeated list of rows, or
a summary element after a repeated set of cards). The static content following the loop
must be preserved after the loop renders.

**Why this priority**: This is the more general form of the same root cause. Fixing it
lets authors place a loop anywhere among its siblings, not only immediately before
another loop, which is a common real-world layout need.

**Independent Test**: Create a page with a `d-for` loop followed by a static sibling
element, load the page, and confirm the static element still exists after the loop's
rendered items.

**Acceptance Scenarios**:

1. **Given** a `d-for` loop followed by one or more static sibling elements, **When**
   the page finishes loading, **Then** the loop's items render in place and every static
   sibling that followed the loop is still present, in its original order.
2. **Given** such a layout has rendered, **When** the loop's collection changes, **Then**
   the loop re-renders and the trailing static siblings remain untouched.

---

### User Story 3 - Existing single-loop and last-child usage is unaffected (Priority: P1)

All existing pages that use `d-for` as the last child of its parent, nested loops,
ranges, viewport/incremental rendering, and `d-if` combined with `d-for` must continue
to behave exactly as before.

**Why this priority**: Backward compatibility is a non-negotiable project principle;
`d-for` is one of the most widely used attributes and any regression would break many
consuming applications.

**Independent Test**: Run the full existing DrapoPages test suite and confirm every
`d-for`-related page still renders identically to its captured expected output.

**Acceptance Scenarios**:

1. **Given** any existing page where `d-for` is the last child, **When** it renders,
   **Then** the output is identical to the current behavior.
2. **Given** existing nested loops, ranges, and `d-for` + `d-if` pages, **When** they
   render, **Then** the output is identical to the current behavior.

---

### Edge Cases

- What happens when the **first** of two consecutive loops is bound to an **empty**
  collection? The second loop's items must still render, and later populating the first
  collection must insert its items before the second loop's items without disturbing them.
- What happens when the **second** loop is bound to an empty collection? The first loop
  renders normally and no phantom elements are produced.
- What happens with **three or more** consecutive `d-for` loops under one parent? Each
  loop must own only its own rendered items.
- What happens when a loop is followed by a **mix** of another `d-for` and static
  content interleaved? Each loop and each static element must retain its own identity.
- What happens when a consecutive loop uses **viewport / incremental (`d-for-render`)**
  rendering? The boundary between one loop's items and the next sibling must still be
  respected.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The framework MUST allow a `d-for` loop to be placed anywhere among its
  parent's children, not only as the last child.
- **FR-002**: When rendering a `d-for` loop, the framework MUST only create, update, and
  remove the elements that belong to that specific loop, and MUST NOT remove or alter
  sibling elements that follow the loop.
- **FR-003**: The framework MUST support two or more `d-for` loops declared as direct
  siblings within the same parent, each rendering its own collection independently.
- **FR-004**: When a loop's bound collection changes, the framework MUST re-render only
  that loop's items and MUST leave all other sibling loops and their items intact.
- **FR-005**: The framework MUST preserve static (non-`d-for`) sibling elements that
  appear after a `d-for` loop, both on initial render and on every subsequent re-render.
- **FR-006**: The feature MUST NOT change the rendered output of any existing supported
  `d-for` usage (last-child loops, nested loops, ranges, `d-for` + `d-if`, and
  viewport/incremental rendering).
- **FR-007**: The correct boundary between a loop's rendered items and the following
  siblings MUST be maintained across empty collections, later population of a previously
  empty collection, and viewport/incremental rendering.

### Key Entities *(include if data involves data)*

- **d-for loop**: A repeated template element bound to a collection; owns the set of
  rendered item elements it produces and must be distinguishable from its sibling
  elements.
- **Rendered item set**: The elements produced by a single loop for the current state of
  its collection; the boundary of this set must not extend into sibling content.
- **Sibling content**: Any element under the same parent that follows a loop — either
  another `d-for` loop or static markup — which must be preserved.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A page with two consecutive `d-for` loops under one parent renders 100% of
  both collections' items, with zero missing and zero duplicated items.
- **SC-002**: Updating one of two consecutive loops' collections leaves 100% of the other
  loop's rendered items unchanged.
- **SC-003**: A `d-for` loop followed by static content preserves 100% of the trailing
  static elements on initial render and after every re-render.
- **SC-004**: The full existing test suite passes with zero regressions, and all
  previously supported `d-for` scenarios produce byte-for-byte identical rendered output.
- **SC-005**: Page authors can place two adjacent loops without adding any wrapper
  element solely to isolate them.

## Assumptions

- The scope is limited to `d-for` loops that share the **same direct parent**; loops in
  different parents already work and are out of scope.
- "Consecutive" covers loops that are adjacent as well as loops separated by static
  sibling content under the same parent.
- Existing behavior of nested loops, ranges, `d-for-render` viewport rendering, and the
  `d-for` + `d-if` combination is correct today and must be preserved unchanged.
- Verification follows the project's DrapoPages render-comparison workflow: a new test
  page plus a captured expected-output snapshot, registered in the release test suite.
- No public attribute syntax changes are required; this is a behavioral fix to how a
  loop identifies the elements it owns, so it is fully backward compatible and additive.

# Feature Specification: Round function

**Feature Branch**: `668-round-function`

**Created**: 2026-08-04

**Status**: Draft

**Input**: User description: "Create the function Round in Drapo. It should allow round to floor and ceiling. Look what is the default for programming languages and support the same parameters and behaviors. Support its use with UpdateItemField and together with Cast. Issue #668."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Round a value to a whole number (Priority: P1)

A page author has a numeric expression (a calculation, a bound data value, or a
mustache result) and wants to display or store it rounded to the nearest whole number
using the intuitive "round half away from zero" rule, without writing JavaScript.

**Why this priority**: This is the core, most common use of a rounding function and the
minimum viable slice — a single `Round(value)` call that returns the nearest integer.

**Independent Test**: Bind `Round({{value}})` in a `d-model` on a test page and confirm
the rendered text matches the nearest integer for positive, negative, and midpoint
inputs.

**Acceptance Scenarios**:

1. **Given** the value `2.4`, **When** `Round(2.4)` is evaluated, **Then** the result is `2`.
2. **Given** the value `2.5`, **When** `Round(2.5)` is evaluated, **Then** the result is `3`.
3. **Given** the value `-2.5`, **When** `Round(-2.5)` is evaluated, **Then** the result is `-3`.

---

### User Story 2 - Round to a number of decimal places (Priority: P1)

A page author wants to round a value to a fixed number of decimal places (for example,
currency to 2 decimals) by passing a `digits` argument.

**Why this priority**: Decimal-place rounding is the second most common need and is part
of the standard signature of rounding functions in mainstream languages.

**Independent Test**: Bind `Round({{value}}, 2)` and confirm the rendered value is
rounded to two decimal places.

**Acceptance Scenarios**:

1. **Given** the value `2.567`, **When** `Round(2.567, 2)` is evaluated, **Then** the result is `2.57`.
2. **Given** the value `2.5`, **When** `Round(2.5, 0)` is evaluated, **Then** the result is `3`.
3. **Given** the value `2.451`, **When** `Round(2.451, 1)` is evaluated, **Then** the result is `2.5`.

---

### User Story 3 - Choose a rounding direction (floor / ceiling) (Priority: P1)

A page author wants to force the rounding direction toward negative infinity (floor) or
positive infinity (ceiling) by passing a `mode` argument, at any number of decimal
places.

**Why this priority**: Floor and ceiling support is explicitly required by the feature
request and differentiates this function from a plain nearest-value rounder.

**Independent Test**: Bind `Round({{value}}, 0, ceiling)` and `Round({{value}}, 0, floor)`
and confirm the direction of rounding is respected.

**Acceptance Scenarios**:

1. **Given** the value `2.1`, **When** `Round(2.1, 0, ceiling)` is evaluated, **Then** the result is `3`.
2. **Given** the value `2.9`, **When** `Round(2.9, 0, floor)` is evaluated, **Then** the result is `2`.
3. **Given** the value `2.451`, **When** `Round(2.451, 1, ceiling)` is evaluated, **Then** the result is `2.5`.
4. **Given** the value `-2.1`, **When** `Round(-2.1, 0, floor)` is evaluated, **Then** the result is `-3`.

---

### User Story 4 - Compose Round with UpdateItemField and Cast (Priority: P2)

A page author, inside a `d-for` context, wants to round a value and store the result in
an item field via `UpdateItemField`, and to use `Round` on the result of a `Cast`
expression (and vice-versa).

**Why this priority**: The feature request explicitly asks that `Round` compose with
`UpdateItemField` and `Cast`. It builds on the P1 slices but is not required for the
function to be independently useful.

**Independent Test**: In a `d-for` loop, invoke `UpdateItemField` with a `Round(...)`
value and confirm the stored field holds the rounded result; nest `Round(Cast(...))` and
confirm the numeric result.

**Acceptance Scenarios**:

1. **Given** an item field bound in a `d-for`, **When** `UpdateItemField` stores `Round({{item.value}}, 2)`, **Then** the field holds the value rounded to two decimals.
2. **Given** a string expression, **When** `Round(Cast({{a}} + {{b}}, number), 0, ceiling)` is evaluated, **Then** the sum is cast to a number and rounded up.

---

### Edge Cases

- **Omitted arguments**: `Round(value)` uses `digits = 0` and `mode = round`.
- **Zero digits explicitly**: `Round(value, 0)` behaves identically to `Round(value)`.
- **Midpoint ties**: In `round` mode, exact `.5` values round away from zero (`0.5 → 1`, `-0.5 → -1`).
- **Negative numbers with floor/ceiling**: `floor` moves toward negative infinity (more negative), `ceiling` toward positive infinity.
- **Already-rounded values**: A value with fewer decimals than `digits` is returned unchanged.
- **Non-numeric / empty expression**: Resolves consistently with existing numeric-parsing behavior (treated as `0` when it cannot be parsed), matching how `Cast(..., number)` handles unparseable input.
- **Unknown mode**: An unrecognized `mode` value falls back to the default `round` behavior.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The framework MUST expose a new function named `Round` usable anywhere Drapo functions/expressions are resolved (e.g. `d-model`, function chains).
- **FR-002**: `Round` MUST accept a required first argument `value` — a numeric expression that is resolved (mustache and arithmetic) before rounding.
- **FR-003**: `Round` MUST accept an optional second argument `digits` (a non-negative integer, default `0`) specifying the number of decimal places to round to.
- **FR-004**: `Round` MUST accept an optional third argument `mode` (default `round`) with the allowed values `round`, `floor`, and `ceiling`.
- **FR-005**: In `round` mode, midpoint values MUST round half away from zero (`2.5 → 3`, `-2.5 → -3`).
- **FR-006**: In `floor` mode, the value MUST round toward negative infinity at the given decimal scale.
- **FR-007**: In `ceiling` mode, the value MUST round toward positive infinity at the given decimal scale.
- **FR-008**: `Round` MUST return the numeric result so it can be displayed, stored, or nested inside other expressions.
- **FR-009**: `Round` MUST be composable as the value passed to `UpdateItemField`.
- **FR-010**: `Round` MUST be composable with `Cast` in both directions (`Round(Cast(...))` and `Cast(Round(...))`).
- **FR-011**: An unrecognized `mode` value MUST fall back to the default `round` behavior rather than erroring.
- **FR-012**: The change MUST be backward compatible and additive — no existing function or behavior is altered.
- **FR-013**: A DrapoPages test page MUST cover all three modes, at least two `digits` values (0 and >0), and negative and midpoint inputs, and MUST be registered in `ReleaseTest.cs`.
- **FR-014**: Public documentation for `Round` MUST be added (function description, parameters, and at least one runnable sample) in the docs repository.

### Key Entities

- **Round function call**: A parsed function with up to three positional parameters — `value` (expression), `digits` (number), `mode` (type/keyword) — resolving to a single numeric result.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A page author can round a numeric expression to the nearest integer, to N decimal places, and toward floor or ceiling, using only declarative `Round(...)` calls with no hand-written JavaScript.
- **SC-002**: All acceptance scenarios in User Stories 1–4 produce the exact expected values in the rendered DOM.
- **SC-003**: The DrapoPages render-comparison test for `Round` passes as part of the full suite, and the full suite remains green.
- **SC-004**: The C# solution builds and TSLint reports zero errors after the change.
- **SC-005**: Existing pages and tests continue to pass unchanged (backward compatibility verified by the green suite).
- **SC-006**: The `Round` function appears in the published documentation with a working sample.

## Assumptions

- The default rounding mode is `round` (nearest) with ties broken **half away from zero**, chosen over banker's rounding for author intuitiveness (confirmed with the requester).
- `digits` defaults to `0` and is assumed to be a non-negative integer; fractional or negative `digits` are out of scope.
- Rounding modes are limited to `round`, `floor`, and `ceiling`; a `truncate`/toward-zero mode is out of scope for this iteration.
- Numeric parsing and midpoint handling reuse the framework's existing number-resolution behavior (as used by `Cast(..., number)`), so extreme floating-point precision beyond JavaScript's native number semantics is out of scope.
- Documentation lives in the separate `spadrapo/docs` repository and follows the existing per-function folder convention (`description.html`, `parameters.json`, `samples/`).

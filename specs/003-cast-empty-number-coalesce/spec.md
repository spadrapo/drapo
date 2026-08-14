# Feature Specification: Empty/non-numeric operands coalesce to zero in numeric expressions

**Feature Branch**: `670-cast-empty-number-coalesce`

**Created**: 2026-08-04

**Status**: Draft

**Input**: Customer report — `Cast` summing several fields where one is blank returns `NaN`
(JCC dev, Capex Lançamentos form). Fix so empty/non-numeric operands are treated as `0`.
Issue #670.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Sum form fields where some are blank (Priority: P1)

A page author binds several optional numeric inputs (e.g. Jan–Dec) and sums them with
`Cast({{a}}+{{b}}+…,number)` on change, storing the result. When the user leaves some
fields blank, the total should reflect the filled fields — not `NaN`.

**Why this priority**: This is the exact reported failure and the whole point of the fix.

**Independent Test**: Bind a sum of six value keys where several are empty; confirm the
rendered total equals the sum of the filled ones (blanks counted as 0).

**Acceptance Scenarios**:

1. **Given** `Teste01=2` and `Teste02..Teste06` empty, **When** `Cast({{Teste01}}+…+{{Teste06}},number)` is evaluated, **Then** the result is `2`.
2. **Given** all of `Teste01..Teste06` empty, **When** the same expression is evaluated, **Then** the result is `0`.
3. **Given** `Teste01=1.5`, `Teste03=2.5`, rest empty, **When** evaluated, **Then** the result is `4`.

---

### User Story 2 - Compose with Round (Priority: P2)

The rounded total of a partially-filled sum must also avoid `NaN`.

**Why this priority**: `Round(Cast(...))` is the natural companion of the sum use case
(the `Round` function was just added) and must not reintroduce `NaN`.

**Independent Test**: `Round(Cast({{a}}+…,number),0)` with blanks renders the rounded sum.

**Acceptance Scenarios**:

1. **Given** `Teste01=1.6`, rest empty, **When** `Round(Cast({{Teste01}}+…+{{Teste06}},number),0)` is evaluated, **Then** the result is `2`.

---

### Edge Cases

- Every operand empty → `0` (not `NaN`, not empty string).
- A non-numeric token (garbage) in a numeric context resolves to `0`.
- Genuine `NaN` detection elsewhere (query `SUM`/`AVG` aggregates) is unchanged — those
  paths use direct `Number(...)` checks and must keep skipping non-numeric values.
- `IsNumber` (regex-based validity check) is unchanged.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: A non-numeric or empty operand in a resolved numeric expression MUST evaluate
  to the caller's default value (`0` for arithmetic operands) instead of `NaN`.
- **FR-002**: `Cast({{a}}+{{b}}+…,number)` MUST return the numeric sum of the parseable
  operands, treating blank/non-numeric operands as `0`.
- **FR-003**: The fix MUST NOT change the result for expressions whose operands are all
  valid numbers (existing behavior preserved).
- **FR-004**: Query aggregate functions (`SUM`, `AVG`) MUST continue to skip non-numeric
  values (their explicit `isNaN(Number(...))` checks remain correct).
- **FR-005**: `IsNumber` validity checks MUST be unaffected.
- **FR-006**: The change MUST be backward compatible and covered by a DrapoPages test that
  reproduces the reported scenario, registered in `ReleaseTest.cs`.
- **FR-007**: `Cast` documentation MUST note that empty/non-numeric operands resolve to `0`.

### Key Entities

- **Numeric operand parse**: converting a resolved token to a number, with a default when
  the token is null/empty/non-numeric.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: The reported form (six inputs, some blank) shows the correct running total,
  never `NaN`.
- **SC-002**: All acceptance scenarios render the exact expected values.
- **SC-003**: Full test suite stays green; C# builds; TSLint zero errors.
- **SC-004**: No existing test changes result (backward compatibility).
- **SC-005**: `Cast` docs describe the empty→0 behavior.

## Assumptions

- The default for arithmetic operands is `0`; callers that pass a different default
  (e.g. `null`) keep receiving that default — a behavior change from `NaN` that those
  callers already tolerate.
- Scope is the `DrapoParser.ParseNumber` NaN fallback; no new function or Cast type is
  introduced (the customer's `numbernotnull` idea is satisfied implicitly by fixing the
  root cause, so existing markup needs no change).

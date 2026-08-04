# Phase 0 Research: Round function

## Decision 1 — Signature `Round(value, digits, mode)`

- **Decision**: Three positional parameters: `value` (required expression), `digits`
  (optional number, default `0`), `mode` (optional keyword, default `round`).
- **Rationale**: Mirrors the mainstream rounding APIs authors already know —
  C# `Math.Round(value, digits, mode)`, Python `round(number, ndigits)` — while adding an
  explicit direction argument to satisfy the floor/ceiling requirement. Positional string
  params match the existing `Cast(expression, type)` convention in Drapo.
- **Alternatives considered**:
  - Separate `Floor`/`Ceiling`/`Round` functions — rejected; the requester asked for a
    single `Round` that supports floor and ceiling, and one function keeps the vocabulary
    smaller.
  - `Round(value, mode)` without decimals — rejected; decimal-place rounding is a core
    expectation and part of the standard signature.

## Decision 2 — Default midpoint behavior: half away from zero

- **Decision**: In `round` mode, ties (exact `.5` at the target scale) round away from
  zero: `2.5 → 3`, `-2.5 → -3`.
- **Rationale**: This is the intuitive "round half up" most authors expect and matches
  C# `MidpointRounding.AwayFromZero` and Java `Math.round` (for positives). Confirmed with
  the requester over banker's rounding.
- **Alternatives considered**: Banker's rounding (half to even), the JS/C# `Math.Round`
  default — rejected as less intuitive for template authors; JavaScript's native
  `Math.round` also rounds `-2.5 → -2` (toward +∞), which is surprising for negatives.
- **Implementation note**: JavaScript `Math.round` is *not* half-away-from-zero for
  negatives. Compute with sign handling, e.g. round `Math.abs(scaled)` with `Math.round`
  then reapply the sign, or use `Math.sign(x) * Math.round(Math.abs(x))`.

## Decision 3 — Modes: `round`, `floor`, `ceiling`

- **Decision**: Accept exactly `round`, `floor`, `ceiling`; unknown mode falls back to
  `round`.
- **Rationale**: Covers the requested directions. `floor` → `Math.floor` (toward −∞),
  `ceiling` → `Math.ceil` (toward +∞). Graceful fallback avoids introducing a new error
  path and keeps backward-compatible, forgiving behavior consistent with `Cast`.
- **Alternatives considered**: Adding `truncate` (toward zero) — deferred; the requester
  did not select it. Erroring on unknown mode — rejected to stay forgiving.

## Decision 4 — Decimal-place scaling

- **Decision**: Apply the chosen direction at the requested scale using the
  factor method: `factor = 10^digits`; `op(value * factor) / factor` where `op` is the
  direction's rounding primitive.
- **Rationale**: Standard, dependency-free approach; `digits = 0` degenerates to plain
  integer rounding. Reuses the framework's existing number parsing
  (`DrapoParser.ParseNumberBlock` / `ParseNumber`) for the resolved expression, matching
  how `Cast(..., number)` resolves values so `Round` and `Cast` compose cleanly.
- **Alternatives considered**: `Number.prototype.toFixed` — rejected; it returns a string,
  uses banker's-ish rounding inconsistently across engines, and does not support floor/
  ceiling. String/decimal libraries — rejected as unnecessary for the required precision.
- **Known limitation**: Native IEEE-754 doubles can still exhibit representation edge
  cases (e.g. `1.005`), identical to every language using binary floating point; out of
  scope, documented in the spec Assumptions.

## Decision 5 — Value resolution and composition

- **Decision**: Resolve `value` via the same mustache/arithmetic resolver used by `Cast`
  (`ResolveControlFlowMustacheStringFunction`) so nested `Cast(...)`/arithmetic works;
  resolve `digits` and `mode` via `ResolveFunctionParameter`. Return a numeric result.
- **Rationale**: Guarantees `Round(Cast(...))`, `Cast(Round(...))`, and
  `UpdateItemField(..., Round(...))` compose, satisfying FR-009/FR-010.

## Summary of resolved unknowns

All Technical Context items are known; no `NEEDS CLARIFICATION` remain. The default mode,
midpoint rule, and mode set were confirmed directly with the requester.

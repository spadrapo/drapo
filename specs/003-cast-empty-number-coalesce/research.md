# Phase 0 Research: Empty operand coalescing

## Primary decision — Fix the tokenizer to treat a missing operand as zero

- **Decision**: In `DrapoParser.ParseBlockMathematicalExpressionSignals`, when the state
  machine expects an operand (`isLastOperation === true`) but the current item is a bare
  operator (a blank operand — leading, or between two operators), emit `'0'` then the
  operator and keep expecting an operand.
- **Rationale (critical finding)**: The originally chosen one-liner (fix `ParseNumber`'s
  dead `Number.NaN === value` guard) is **necessary but NOT sufficient** — and on its own
  produces a *silently wrong* result. Empirically, `Cast({{a1}}+{{a2}}+…,number)` with
  `a1=10, a3=5, rest blank` rendered **10, not 15**: the resolved string `10++5+++`
  tokenizes such that the `Signals` state machine, after two consecutive operators, is in
  "expecting operand" state and then **drops** the next real value (`5`). So the value is
  lost *before* `ParseNumber` ever sees it. Fixing only `ParseNumber` converts a visible
  `NaN` into a quiet incorrect total, which is worse. Inserting a `0` operand where one is
  missing restores correct associativity: `10+0+5+0+0 = 15`; all-blank `= 0`; leading blank
  `blank+7+blank+3 = 10`.
- **Safety**: In a *well-formed* expression the tokenizer never yields a bare operator while
  expecting an operand — a leading unary minus arrives as a single signed token (`"-5"`,
  length > 1), and `*`/`/` only appear between operands. So the new branch fires *only* for
  genuinely missing operands and leaves valid expressions untouched (verified by the full
  suite).

## Secondary decision — Harden `DrapoParser.ParseNumber` (defense-in-depth)

- **Decision**: Also change `if (Number.NaN === value)` to `if (Number.isNaN(value))`.
- **Rationale**: `Number.NaN === value` is always false (`NaN` is never `===` to anything),
  so the guard is dead code and `ParseNumber` returns `NaN` instead of the caller's
  `valueDefault`. This is a genuine latent bug; fixing it means any residual non-numeric
  token coalesces to the default (`0`) instead of `NaN`. Not sufficient alone (see above),
  but correct and complementary.
- **Alternatives considered**:
  - New Cast type `numberzero` / third `Cast(expr, number, 0)` param — additive but requires
    markup changes on every expression AND would still hit the tokenizer operand-drop bug;
    the customer wants no per-field bloat. Rejected.
  - `Sum(a, b, …)` aggregate (discrete params, no arithmetic string) — clean and avoids the
    tokenizer entirely, but a new function and summation-only. Viable fallback if the
    tokenizer change were deemed too broad; the tokenizer fix was chosen because it makes the
    customer's existing markup correct with no change and fixes the class of bug generally.
  - `Coalesce(field, 0)` per field — the verbosity the customer explicitly wants to avoid.

## Caller audit (backward-compatibility)

`ParseNumber` returning `valueDefault` instead of `NaN` on non-numeric input affects only
callers that previously received `NaN`:

- **Direct `NaN` detection** — `DrapoStorage.ResolveQueryAggregationsSum` (line ~2520) and
  `ResolveQueryAggregationsAvg` (line ~2538) use `isNaN(Number(valueCurrent))`, **not**
  `ParseNumber`. Unaffected — `SUM`/`AVG` still skip non-numeric values.
- **`IsNumber`** (line ~1105) uses a regex, not `ParseNumber`. Unaffected.
- **`null`-default callers** — `ParseDateGroupNumber` (`ParseNumber(value, null)`) and
  `ResolveValueMustachesAsNumber` (`ParseNumber(valueResolved, null)`) now return `null`
  instead of `NaN` on garbage. Both already return/handle `null` in sibling branches
  (date-part parsing returns `null` for invalid; polling timespan of `null`/`NaN` both act
  as 0). Benign.
- **All other callers** use the default `0` and benefit: garbage/blank → `0`.

Conclusion: safe; the change activates the intended default-fallback contract.

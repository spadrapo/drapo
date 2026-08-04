# Phase 1 Data Model: Round function

The feature is a stateless expression function; it introduces no persistent entities.
The only "entity" is the parsed function call and its parameters.

## Entity: Round function call

Represents a parsed `Round(...)` invocation resolved at render/expression time.

| Field    | Position | Type (input)          | Required | Default   | Notes |
|----------|----------|-----------------------|----------|-----------|-------|
| `value`  | 1        | expression → number   | Yes      | —         | Mustache + arithmetic resolved, then parsed as a number (reusing `Cast(..., number)` semantics). |
| `digits` | 2        | number                | No       | `0`       | Non-negative integer; number of decimal places. |
| `mode`   | 3        | keyword               | No       | `round`   | One of `round`, `floor`, `ceiling`; unknown → `round`. |

### Output

- A single numeric value (the rounded result), returned as the function's resolved value
  so it can be displayed, stored via `UpdateItemField`, or nested in other expressions.

### Validation / resolution rules

- **VR-1**: `value` that cannot be parsed as a number resolves to `0` (consistent with
  existing numeric parsing).
- **VR-2**: `digits` that cannot be parsed resolves to `0`.
- **VR-3**: `mode` comparison is case-insensitive against `round`/`floor`/`ceiling`;
  anything else falls back to `round`.
- **VR-4**: For `round` mode, ties round half **away from zero**.
- **VR-5**: Result at `digits` scale = `op(value × 10^digits) ÷ 10^digits`, where `op` is
  `roundHalfAwayFromZero` / `Math.floor` / `Math.ceil`.

### State transitions

None — pure function, no state.

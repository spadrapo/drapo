# Contract: `Round` function

## Signature

```
Round(value, digits, mode)
```

| Parameter | Required | Type       | Default   | Description |
|-----------|----------|------------|-----------|-------------|
| `value`   | Yes      | expression | —         | The numeric expression to round. |
| `digits`  | No       | number     | `0`       | Decimal places to round to (non-negative integer). |
| `mode`    | No       | type       | `round`   | Direction: `round` \| `floor` \| `ceiling`. |

Returns: the rounded numeric value.

## Behavioral contract (reference cases)

| Call                          | Result | Rule |
|-------------------------------|--------|------|
| `Round(2.4)`                  | `2`    | nearest, down |
| `Round(2.5)`                  | `3`    | tie → away from zero |
| `Round(-2.5)`                 | `-3`   | tie → away from zero (negative) |
| `Round(2.567, 2)`             | `2.57` | 2 decimals |
| `Round(2.5, 0)`               | `3`    | explicit digits=0 == default |
| `Round(2.451, 1)`             | `2.5`  | nearest at 1 decimal |
| `Round(2.1, 0, ceiling)`      | `3`    | ceiling toward +∞ |
| `Round(2.9, 0, floor)`        | `2`    | floor toward −∞ |
| `Round(-2.1, 0, floor)`       | `-3`   | floor toward −∞ (negative) |
| `Round(-2.9, 0, ceiling)`     | `-2`   | ceiling toward +∞ (negative) |
| `Round(2.451, 1, ceiling)`    | `2.5`  | ceiling at 1 decimal |
| `Round(2.999, 1, floor)`      | `2.9`  | floor at 1 decimal |
| `Round(2.5, 0, unknownmode)`  | `3`    | unknown mode → default `round` |

## Composition contract

- **With `Cast`**: `Round(Cast({{a}} + {{b}}, number), 0, ceiling)` MUST cast the resolved
  sum to a number and round it up. `Cast(Round({{x}}, 2), number)` MUST return the rounded
  number.
- **With `UpdateItemField`**: Inside a `d-for`, `UpdateItemField('field', Round({{item.value}}, 2))`
  MUST store the rounded value in the item field.

## Backward-compatibility contract

- Additive only. No existing function, attribute, or parsing behavior changes.
- `Round` is a new reserved function name; no prior function used it.

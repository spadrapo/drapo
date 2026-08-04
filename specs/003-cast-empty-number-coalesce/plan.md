# Implementation Plan: Empty/non-numeric operands coalesce to zero

**Branch**: `670-cast-empty-number-coalesce` | **Date**: 2026-08-04 | **Spec**: [spec.md](spec.md)

## Summary

Make numeric expressions treat a missing operand (a blank field) as `0`. The primary fix
is in the arithmetic tokenizer `DrapoParser.ParseBlockMathematicalExpressionSignals`: when
it expects an operand but sees a bare operator, it inserts a `0` operand (instead of
dropping the following value). Secondarily, `DrapoParser.ParseNumber`'s dead NaN guard
(`Number.NaN === value`) becomes `Number.isNaN(value)` so any residual non-numeric token
coalesces to the default. Result: `Cast({{a}}+{{b}}+…,number)` sums partially-filled forms
correctly (blanks as `0`) instead of returning `NaN` — and, crucially, without silently
dropping the filled values. Add a DrapoPages test reproducing the customer scenario and
update `Cast` docs.

**Key finding**: fixing `ParseNumber` alone was insufficient — it removed the `NaN` but
returned a wrong total (`10` for `10 + blank + 5`) because the tokenizer drops operands
adjacent to blanks. See [research.md](research.md).

## Technical Context

**Language/Version**: TypeScript (→ `drapo.js`); C#/.NET middleware & test host.

**Primary Dependencies**: `DrapoParser.ParseNumber`, `DrapoSolver.ResolveMathematicalExpression`.

**Testing**: DrapoPages snapshot workflow — feature page in
`src/Web/WebDrapo/wwwroot/DrapoPages/`, expected snapshot in
`src/Test/WebDrapo.Test/Pages/` (Embedded Resource), `ValidatePage(...)` in `ReleaseTest.cs`.

**Constraints**: Backward compatible; TSLint zero errors; full suite green.

## Constitution Check

- **I. Declarative-First** — PASS (no author-facing API change; existing markup benefits).
- **II. Green Build** — PLANNED (build + TSLint gates).
- **III. Test-Backed** — PLANNED (new DrapoPages test).
- **IV. Render-Comparison Fidelity** — PLANNED (snapshot from real runtime).
- **V. Backward Compatibility** — PASS (valid-number expressions unchanged; NaN-detection
  paths use direct `Number(...)`, unaffected). Verified via caller audit (see research.md).

Result: **PASS**.

## Project Structure

```text
src/Middleware/Drapo/ts/DrapoParser.ts       # ParseBlockMathematicalExpressionSignals: insert 0 for a missing operand
                                             # ParseNumber: Number.NaN === value -> Number.isNaN(value)
src/Web/WebDrapo/wwwroot/DrapoPages/CastNumberEmptyField.html   # NEW test page
src/Test/WebDrapo.Test/Pages/CastNumberEmptyField.Test.html     # NEW snapshot (Embedded Resource)
src/Test/WebDrapo.Test/ReleaseTest.cs        # + CastNumberEmptyFieldTest
```

Docs repo (`spadrapo/docs`): update `functions/Cast/description.html` (and optionally a
sample) to note empty/non-numeric operands resolve to 0.

**Structure Decision**: Minimal one-line root-cause fix in the shared number parser,
verified by a scenario test and a caller audit; docs note the coalescing behavior.

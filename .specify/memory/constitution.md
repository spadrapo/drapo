# Drapo Constitution

## Core Principles

### I. Declarative-First
Features are expressed through declarative `d-*` HTML attributes and mustache `{{ }}`
binding rather than imperative JavaScript. Adding capability means extending the
attribute/function vocabulary of the framework, not pushing logic into page authors'
hand-written script. New behavior must compose with the existing attribute model.

### II. Green Build (NON-NEGOTIABLE)
No change is complete until it compiles and lints cleanly:
- C# / .NET solution builds: `cd src && dotnet build Drapo.sln`
- TypeScript passes TSLint with zero errors:
  `cd src/Middleware/Drapo && npx tslint --project tsconfig/production/`

Linting and compilation are gates, not suggestions. Broken builds are never merged.

### III. Test-Backed Changes
Every new feature or bug fix ships with corresponding tests. The framework is verified
end-to-end via Selenium WebDriver + NUnit: a feature page in
`src/Web/WebDrapo/wwwroot/DrapoPages/`, its expected rendered output in
`src/Test/WebDrapo.Test/Pages/` (Embedded Resource), and a `ValidatePage(...)` method
in `ReleaseTest.cs`. Modifying existing behavior requires updating the affected tests.

### IV. Render-Comparison Fidelity
Tests assert on the actual DOM Drapo produces after `drapo._isLoaded`, compared against
a captured expected HTML snapshot. Expected outputs are generated from real runtime
rendering, not hand-authored guesses, so the suite reflects true framework behavior and
catches regressions in rendering, binding, and control flow.

### V. Backward Compatibility & Multi-Target Support
Drapo is a published NuGet package consumed by external applications and targets
multiple .NET runtimes (netcoreapp3.1, net8.0, net10.0). Public attribute, function,
and middleware behavior must remain stable; breaking changes require explicit
justification and a migration path. New APIs are additive by default.

## Technology Constraints

- **Client runtime:** TypeScript compiled to `drapo.js`; TSLint rules in `tslint.json`
  are authoritative for style and quality.
- **Server:** ASP.NET Core middleware in C#; .NET SDK pinned via `global.json`.
- **Tests:** Selenium WebDriver + NUnit under `src/Test/WebDrapo.Test/`.
- **Naming:** test pages PascalCase; test methods `<Page>Test`; data keys camelCase;
  custom CSS classes kebab-case.

## Development Workflow

1. Install dependencies when needed: `cd src/Middleware/Drapo && npm install`.
2. Implement the change using declarative attributes where possible.
3. Run TSLint and the relevant build before considering work done.
4. Add or update tests following the DrapoPages workflow and verify they pass.
5. Resolve errors in order: TSLint → C# compilation → missing dependencies.

## Governance

This constitution guides feature specification and planning via Spec Kit. The Green
Build and Test-Backed Changes principles are non-negotiable quality gates for every
pull request: **a PR may only be approved once it compiles, passes TSLint, and the full
test suite is green — no exceptions and no known-failing tests.** Amendments are made
through the `/speckit-constitution` workflow and must keep dependent templates
(`.specify/templates/`) consistent. Complexity beyond what a feature requires must be
justified.

**Version**: 1.0.0 | **Ratified**: 2026-06-29 | **Last Amended**: 2026-06-29

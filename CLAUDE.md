# Drapo — Guide for Claude

Drapo is a declarative SPA framework: applications are built with `d-*` HTML attributes
and mustache `{{ }}` binding instead of hand-written JavaScript. It ships as an ASP.NET
Core middleware (NuGet `Drapo`) plus a TypeScript-compiled client runtime (`drapo.js`).

## ⚠️ Mandatory quality gates — never skip

**Every code change MUST:**

1. **Compile** — `cd src && dotnet build Drapo.sln`
2. **Pass TSLint with zero errors** — `cd src/Middleware/Drapo && npm run lint`
3. **Include or update tests** — follow the DrapoPages testing workflow in [doc/development.md](doc/development.md)
4. **Keep the full test suite green** — a PR is only approved when **all** tests pass.
   Run them locally against a running WebDrapo (`dotnet test` with
   `Test/WebDrapo.Test/Test.Debug.runsettings`); see
   [doc/development.md](doc/development.md#running-the-tests).

These are non-negotiable. A Release build runs TSLint and fails if it does not pass.
Resolve errors in order: TSLint → C# compilation → missing dependencies.

## 🚫 PR discipline — humans merge, never the agent

**NEVER approve or merge a pull request in this repository — no `gh pr merge`, no
`--admin` override, no review approvals.** Open the PR, link its issue, report the CI
status, and STOP: a human maintainer decides the merge. Merging to `master`
automatically publishes a new `Drapo` package to nuget.org that every consumer picks
up, so the merge is a release decision and it is human-only. This applies even when CI
is green, the change is urgent, or a downstream repo is waiting on the release.

## Project documentation

Detailed project knowledge lives in [`doc/`](doc/README.md) — read the relevant doc
before working in an area instead of relying on memory:

- **[doc/architecture.md](doc/architecture.md)** — tech stack, solution layout, the
  TypeScript runtime (`src/Middleware/Drapo/ts/`), the C# middleware, and the build
  pipeline.
- **[doc/development.md](doc/development.md)** — build/lint/test commands, the DrapoPages
  testing workflow, conventions, and the contributing checklist.
- **[doc/README.md](doc/README.md)** — index of all docs, including feature guides
  (`d-for`, dynamic routes, IndexedDB cache, …).
- **[README.md](README.md)** — public overview and full API reference (all `d-*`
  attributes and built-in functions).

## Working conventions

- Prefer declarative `d-*` attributes over hand-written JavaScript.
- Test pages: PascalCase; test methods: page name + `Test`; data keys: camelCase; custom
  CSS classes: kebab-case.
- When adding/changing behavior, add or update a DrapoPages test and register it in
  `src/Test/WebDrapo.Test/ReleaseTest.cs` (see [doc/development.md](doc/development.md)).

## Drapo MCP tooling

This repo is wired with a `drapo` MCP server exposing the framework's concepts,
attributes, functions, and data types, plus a `validate_drapo` tool. Prefer these tools
when answering questions about Drapo attributes/functions or validating markup.

## Spec Kit

This repo uses [Spec Kit](https://github.com/github/spec-kit) via the `speckit-*`
skills (`/speckit-specify`, `/speckit-plan`, `/speckit-tasks`, `/speckit-implement`,
etc.). Config and templates live under `.specify/`.

**Authoritative principles:** [`.specify/memory/constitution.md`](.specify/memory/constitution.md)
is the project constitution — its non-negotiable principles (declarative-first, green
build, mandatory tests, backward compatibility) **override** any other guidance,
including this file. Read it before planning or implementing a feature.

The managed section below is refreshed by `/speckit-agent-context-update` after
`/speckit-specify` or `/speckit-plan`.

<!-- SPECKIT START -->
Active feature: **Round function** (issue #668, branch `668-round-function`). Current plan:
[specs/002-round-function/plan.md](specs/002-round-function/plan.md).
Adds a declarative `Round(value, digits, mode)` function to the TypeScript runtime
(`src/Middleware/Drapo/ts/DrapoFunctionHandler.ts`): rounds a resolved numeric expression
to `digits` decimals (default 0) with mode `round` (nearest, ties half away from zero;
default), `floor` (toward −∞), or `ceiling` (toward +∞); composes with `Cast` and
`UpdateItemField`. Verified via a new DrapoPages render-comparison test; docs added in the
separate `spadrapo/docs` repo. See that plan for technologies, structure, and commands.
<!-- SPECKIT END -->

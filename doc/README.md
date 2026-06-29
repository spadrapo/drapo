# Drapo Documentation

This folder is the canonical home for Drapo project documentation. The root
[`README.md`](../README.md) is the public-facing overview and API reference; the files
here go deeper into architecture, development workflow, and specific features.

> AI assistant instruction files ([`CLAUDE.md`](../CLAUDE.md) and
> [`.github/copilot-instructions.md`](../.github/copilot-instructions.md)) intentionally
> stay short and link here, so project knowledge lives in one place and does not drift
> between files.

## Contents

### Project guides

- **[architecture.md](architecture.md)** — technology stack, solution layout, the
  TypeScript client runtime, the C# middleware, and the build pipeline.
- **[development.md](development.md)** — build/lint commands, the mandatory quality
  gates, the DrapoPages testing workflow, conventions, and the contributing checklist.

### Feature documentation

- **[dfor.md](dfor.md)** — the `d-for` loop attribute (arrays, objects, nesting, scope).
- **[dynamic-routes.md](dynamic-routes.md)** — runtime/per-request route configuration
  via `RouteDelegate` for multi-tenant scenarios.
- **[RouteIndexDelegate.md](RouteIndexDelegate.md)** — dynamic index/router content per
  request via `RouteIndexEvent`.
- **[indexeddb-cache.md](indexeddb-cache.md)** — using IndexedDB instead of
  LocalStorage for client caching.

## Where things live

| You want to… | Look at |
|--------------|---------|
| Understand the codebase structure | [architecture.md](architecture.md) |
| Build, lint, or test | [development.md](development.md) |
| Use a specific `d-*` feature | the feature docs above, or the [API reference](../README.md#-api-reference) |
| Get started as a consumer of the package | the root [README](../README.md) |

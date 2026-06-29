# GitHub Copilot Instructions

GitHub Copilot instructions for this project live in:

**[.github/copilot-instructions.md](.github/copilot-instructions.md)**

Detailed project documentation is centralized in **[doc/](doc/README.md)**:

- [doc/architecture.md](doc/architecture.md) — tech stack, layout, runtime, middleware, build
- [doc/development.md](doc/development.md) — build/lint/test commands, testing workflow, conventions

## Key reminders

- 🚨 **Validate builds and linting before changes** — TSLint must pass:
  `cd src/Middleware/Drapo && npx tslint --project tsconfig/production/`
- **Create or update unit tests** for any behavior change (DrapoPages workflow in
  [doc/development.md](doc/development.md)).
- **Use Drapo's declarative `d-*` attributes** instead of JavaScript.

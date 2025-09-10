# GitHub Copilot Instructions

For detailed GitHub Copilot instructions specific to this project, please see:

**[.github/copilot-instructions.md](.github/copilot-instructions.md)**

## Quick Reference

### Key Reminders
- **🚨 ALWAYS validate builds and linting** before any code changes
- **MANDATORY: TSLint must pass** - `cd src/Middleware/Drapo && npx tslint --project tsconfig/production/`
- **ALWAYS create or update unit tests** when adding features
- **Follow the DrapoPages testing workflow** for new test pages  
- **Use Drapo's declarative HTML attributes** instead of JavaScript
- **Test with Selenium WebDriver** using the established patterns

### Testing Workflow for DrapoPages
1. **Validate prerequisites**: Ensure TSLint passes and project compiles
2. Create `YourFeature.html` in `src/Web/WebDrapo/wwwroot/DrapoPages/`
3. Generate expected output in `src/Test/WebDrapo.Test/Pages/YourFeature.Test.html`
4. Add test method to `ReleaseTest.cs`: `ValidatePage("YourFeature")`
5. Verify the test passes

### Core Drapo Attributes
- `d-datakey`, `d-datatype` - Data definitions
- `d-for`, `d-if` - Control flow
- `d-on-*` - Event handlers  
- `d-model` - Two-way binding
- `d-class` - Dynamic styling
- `d-sector` - Page sections/components

See the full instructions for comprehensive details on the Drapo framework, testing patterns, and development guidelines.
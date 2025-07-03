# GitHub Copilot Instructions for Drapo

## About Drapo

Drapo is a declarative Single Page Application (SPA) framework that enables building dynamic web applications using HTML attributes instead of JavaScript. The framework uses intuitive `d-*` attributes for data binding, control flow, event handling, and complex UI logic directly in HTML markup.

## Project Structure

```
src/
├── Middleware/Drapo/          # Core Drapo framework (.NET middleware)
├── Web/WebDrapo/             # Web application hosting test pages
│   └── wwwroot/DrapoPages/   # Test pages demonstrating Drapo features
└── Test/WebDrapo.Test/       # Selenium-based test project
    ├── Pages/                # Expected HTML output files for tests
    └── ReleaseTest.cs        # Main test class with all test methods
```

## Core Drapo Concepts

### HTML Attributes (d-* syntax)
- `d-datakey` - Define data objects
- `d-datatype` - Specify data type (object, array, etc.)
- `d-for` - Loop through collections
- `d-if` - Conditional rendering
- `d-on-click` - Event handlers
- `d-class` - Dynamic CSS classes
- `d-model` - Two-way data binding
- `d-sector` - Define page sections/components

### Data Binding
- Use mustache syntax `{{dataKey.property}}` for data binding
- Support for complex expressions and nested properties
- Real-time updates when data changes

### Example Drapo Page
```html
<!DOCTYPE html>
<html>
<head>
    <script src="/drapo.js"></script>
    <title>Example Page</title>
</head>
<body>
    <!-- Define data -->
    <div d-datakey="users" d-datatype="array" d-dataurlget="~/api/users"></div>
    
    <!-- Loop through data -->
    <ul>
        <li d-for="user in users">{{user.Name}} - {{user.Email}}</li>
    </ul>
    
    <!-- Conditional rendering -->
    <div d-if="{{users.length}} > 0">
        Found {{users.length}} users
    </div>
</body>
</html>
```

## Testing Framework

### Testing Architecture
The project uses Selenium WebDriver with NUnit for end-to-end testing. Each test:

1. **Navigates** to a page in `DrapoPages/`
2. **Waits** for Drapo framework to fully load and process the page
3. **Captures** the final rendered HTML
4. **Compares** it with expected output from `Pages/`

### Test Method Pattern
```csharp
[TestCase]
public void YourFeatureTest()
{
    ValidatePage("YourFeature");
}
```

The `ValidatePage()` method:
- Loads the page from `DrapoPages/YourFeature.html`
- Waits for `drapo._isLoaded` to be true
- Handles any test-specific interactions (clicks, delays)
- Compares rendered HTML with `Pages/YourFeature.Test.html`

## **CRITICAL: Always Create or Update Unit Tests**

### When Adding New Features
**YOU MUST ALWAYS:**

1. **Create comprehensive unit tests** for any new functionality
2. **Update existing tests** when modifying features
3. **Follow the established testing patterns** described below

### When Adding Tests for DrapoPages

When creating a new test page in `DrapoPages/`, you **MUST**:

1. **Create the test page**: Add `YourFeature.html` to `src/Web/WebDrapo/wwwroot/DrapoPages/`

2. **Generate expected output**: 
   - Run the WebDrapo application locally
   - Navigate to your test page in the browser
   - Wait for Drapo to fully load and process
   - Copy the final rendered HTML source
   - Create `YourFeature.Test.html` in `src/Test/WebDrapo.Test/Pages/`
   - Paste the HTML content (without formatting)
   - Set Build Action to "Embedded Resource"

3. **Add test method to ReleaseTest.cs**:
   ```csharp
   [TestCase]
   public void YourFeatureTest()
   {
       ValidatePage("YourFeature");
   }
   ```

4. **Run and verify**: Execute the test to ensure it passes

### Test File Requirements

#### DrapoPages Test Files
- **Location**: `src/Web/WebDrapo/wwwroot/DrapoPages/`
- **Purpose**: Demonstrate specific Drapo features
- **Format**: Standard HTML with Drapo attributes
- **Naming**: `FeatureName.html`

#### Expected Output Files  
- **Location**: `src/Test/WebDrapo.Test/Pages/`
- **Purpose**: Contains expected rendered HTML after Drapo processing
- **Format**: Raw HTML (no formatting)
- **Naming**: `FeatureName.Test.html`
- **Build Action**: Embedded Resource
- **Content**: Copy from browser's page source after Drapo loads

### Test Categories

Cover these areas when creating tests:
- **Data Binding**: Two-way binding, model updates, data sync
- **Control Flow**: `d-for` loops, `d-if` conditionals, nested structures  
- **Events**: Click handlers, keyboard events, form interactions
- **Components**: Component lifecycle, data passing, sector management
- **Validation**: Form validation, custom rules, error handling
- **Advanced Features**: Drag & drop, resizing, viewport scrolling

## Development Guidelines

### Code Patterns to Follow

1. **Use declarative HTML attributes** instead of JavaScript when possible
2. **Leverage mustache syntax** for data binding: `{{object.property}}`
3. **Implement proper data flow** using `d-datakey` and data URLs
4. **Handle events** with `d-on-*` attributes calling Drapo functions
5. **Create reusable components** using `d-sector` for modularity

### Function Examples
Common Drapo functions you can use in event handlers:
- `UpdateDataField(dataKey, field, value)` - Update specific data field
- `UpdateData(dataKey, newData)` - Replace entire data object
- `ValidatePage()` - Trigger validation
- `IF(condition, trueAction, falseAction)` - Conditional execution
- `Cast(value, type)` - Type casting (number, string, etc.)

### Best Practices

1. **Always include `<script src="/drapo.js"></script>`** in page head
2. **Define data early** in the page before using it
3. **Use meaningful datakey names** that describe the data purpose
4. **Test with various data states** (empty, loading, error conditions)
5. **Validate markup** ensures proper HTML structure
6. **Include meaningful titles** for each test page

### Testing Best Practices

1. **Test edge cases**: Empty data, null values, large datasets
2. **Include async scenarios**: Data loading, timer operations, delayed actions
3. **Test user interactions**: Click events, form submissions, drag operations
4. **Verify data updates**: Two-way binding, model changes, computed properties
5. **Test error conditions**: Network failures, validation errors, invalid data

## File Organization

### Creating New Test Files
When adding a new Drapo feature test:

```
src/Web/WebDrapo/wwwroot/DrapoPages/YourFeature.html
src/Test/WebDrapo.Test/Pages/YourFeature.Test.html  
```

Add to `ReleaseTest.cs`:
```csharp
[TestCase]
public void YourFeatureTest()
{
    ValidatePage("YourFeature");
}
```

### Naming Conventions
- **Test pages**: PascalCase, descriptive names (e.g., `DataBindingArray.html`)
- **Test methods**: Same as page name + "Test" suffix
- **Data keys**: camelCase (e.g., `userData`, `formModel`)
- **CSS classes**: kebab-case for custom styles

Remember: **Every new feature or modification requires corresponding unit tests following these patterns.**
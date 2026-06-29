# Drapo

[![Build Status](https://powerplanning.visualstudio.com/_apis/public/build/definitions/9a8d97bc-da81-44f5-9988-e2a03c19cdcf/2/badge)](https://powerplanning.visualstudio.com/_apis/public/build/definitions/9a8d97bc-da81-44f5-9988-e2a03c19cdcf/2/badge)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![NuGet](https://img.shields.io/nuget/v/Drapo.svg)](https://www.nuget.org/packages/Drapo/)

Drapo is a declarative Single Page Application (SPA) framework that enables you to build dynamic web applications using HTML attributes instead of writing JavaScript. With Drapo, you can implement data binding, control flow, event handling, and complex UI logic directly in your HTML markup using intuitive `d-*` attributes.

**[🚀 Live Demo](http://drapo.azurewebsites.net/)**

## ✨ Key Features

- **🏷️ Declarative HTML**: Build interactive UIs using HTML attributes - no JavaScript required
- **🔄 Two-way Data Binding**: Automatic synchronization between UI and data using mustache syntax `{{}}`
- **🎯 Control Flow**: Built-in `d-for` loops and `d-if` conditionals
- **🎨 Dynamic Styling**: Conditional CSS classes with `d-class`
- **📡 Real-time Updates**: WebSocket support via SignalR for live data
- **🧩 Component System**: Reusable UI components with lifecycle management
- **🛣️ SPA Routing**: Client-side routing for single page applications
- **✅ Validation**: Built-in form validation with custom rules
- **🎨 Theming**: Dynamic theme switching support
- **🏗️ .NET Integration**: ASP.NET Core middleware for seamless server integration

## 🚀 Quick Start

### Installation

Install the NuGet package in your ASP.NET Core project:

```bash
dotnet add package Drapo
```

Or via Package Manager Console:

```powershell
Install-Package Drapo
```

### Setup

Add Drapo to your ASP.NET Core application in `Startup.cs` or `Program.cs`:

```csharp
// Program.cs (.NET 6+)
builder.Services.AddDrapo();
app.UseDrapo();

// Or Startup.cs (.NET Core 3.1)
public void ConfigureServices(IServiceCollection services)
{
    services.AddDrapo();
}

public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
{
    app.UseDrapo();
}
```

### Your First Drapo Page

Create an HTML file with Drapo attributes:

```html
<!DOCTYPE html>
<html>
<head>
    <script src="/drapo.js"></script>
    <title>My First Drapo App</title>
</head>
<body>
    <!-- Define data -->
    <div d-dataKey="user" d-dataType="object" 
         d-dataProperty-name="John" 
         d-dataProperty-age="25"></div>
    
    <!-- Display and edit data -->
    <h1>Hello, {{user.name}}!</h1>
    <p>Age: <input d-model="{{user.age}}" type="number" /></p>
    
    <!-- Dynamic list -->
    <div d-dataKey="items" d-dataType="array" 
         d-dataProperty-0="Apple" 
         d-dataProperty-1="Banana" 
         d-dataProperty-2="Orange"></div>
    
    <ul>
        <li d-for="item in items">{{item}}</li>
    </ul>
    
    <!-- Event handling -->
    <button d-on-click="AddDataItem(items, 'New Item')">Add Item</button>
</body>
</html>
```

## 🏗️ Architecture

Drapo consists of two main components:

1. **Client-side Framework** (TypeScript/JavaScript): Handles DOM manipulation, data binding, and UI logic
2. **Server-side Middleware** (ASP.NET Core): Provides data services, routing, and server integration

```
┌─────────────────┐    ┌──────────────────┐
│   Browser       │    │   ASP.NET Core   │
│                 │    │                  │
│  ┌───────────┐  │    │  ┌─────────────┐ │
│  │ HTML      │  │◄───┤  │ Drapo       │ │
│  │ + d-*     │  │    │  │ Middleware  │ │
│  │ attributes│  │    │  └─────────────┘ │
│  └───────────┘  │    │                  │
│                 │    │  ┌─────────────┐ │
│  ┌───────────┐  │    │  │ Your        │ │
│  │ drapo.js  │  │◄───┤  │ Controllers │ │
│  │ (Client)  │  │    │  │ & Services  │ │
│  └───────────┘  │    │  └─────────────┘ │
└─────────────────┘    └──────────────────┘
```

## 📖 Getting Started

### Prerequisites

- [Node.js and npm](https://nodejs.org/en/) (for development)
- [.NET 6+ or .NET Core 3.1+](https://dotnet.microsoft.com/download)
- [TypeScript](https://www.typescriptlang.org/) (for building from source)

```bash
npm install -g typescript
```

### Development Setup

1. Clone the repository:
```bash
git clone https://github.com/spadrapo/drapo.git
cd drapo
```

2. Build the project:
```bash
cd src
dotnet build
```

3. Run the demo application:
```bash
cd Web/WebDrapo
dotnet run
```

Visit `https://localhost:5001` to see the demo application.

## 📋 API Reference

### Data Binding

| Attribute | Description | Example |
|-----------|-------------|---------|
| `d-dataKey` | Defines a data context with a unique key | `d-dataKey="user"` |
| `d-dataType` | Specifies the data type (`object`, `array`, `string`, etc.) | `d-dataType="object"` |
| `d-dataProperty-{name}` | Sets initial property values | `d-dataProperty-name="John"` |
| `d-dataUrl` | URL for loading data | `d-dataUrl="~/api/users"` |
| `d-dataUrlGet` | URL for GET operations | `d-dataUrlGet="~/api/users/get"` |
| `d-dataUrlSet` | URL for POST/PUT operations | `d-dataUrlSet="~/api/users/save"` |
| `d-model` | Two-way data binding | `d-model="{{user.name}}"` |

### Control Flow

| Attribute | Description | Example |
|-----------|-------------|---------|
| [`d-for`](doc/dfor.md) | Iterates over arrays or objects | `d-for="item in items"` |
| `d-if` | Conditional rendering | `d-if="{{user.isActive}}"` |
| `d-class` | Dynamic CSS classes | `d-class="{active:{{item.selected}}}"` |

### Events

| Attribute | Description | Example |
|-----------|-------------|---------|
| `d-on-click` | Click event handler | `d-on-click="SaveData(user)"` |
| `d-on-change` | Change event handler | `d-on-change="UpdateTotal()"` |
| `d-on-keyup` | Keyup event handler | `d-on-keyup="FilterItems()"` |
| `d-on-keyup-enter` | Enter key specific handler | `d-on-keyup-enter="SubmitForm()"` |
| `d-on-blur` | Focus lost event | `d-on-blur="ValidateField()"` |

### Components & Layout

| Attribute | Description | Example |
|-----------|-------------|---------|
| `d-parent` | Defines the default parent for partial pages | `d-parent="main"` |
| `d-parentSector` | Default sector of parent for child content | `d-parentSector="content"` |
| `d-child` | Defines default child for a sector | `d-child="sidebar"` |
| `d-childSector` | Defines a default child sector | `d-childSector="widgets"` |

### Advanced Features

| Attribute | Description | Example |
|-----------|-------------|---------|
| `d-dragStart` | Enable drag functionality | `d-dragStart="true"` |
| `d-dragEnd` | Enable drop functionality | `d-dragEnd="true"` |
| `d-resize` | Enable element resizing | `d-resize-location="width"` |
| `d-cloak` | Hide element until data is loaded | `d-cloak` |
| `d-viewport` | Enable virtual scrolling for large lists | `d-viewport="true"` |

### Built-in Functions

Drapo provides many built-in functions for common operations:

| Function | Description | Example |
|----------|-------------|---------|
| `AddDataItem(dataKey, item)` | Add item to array | `AddDataItem(users, newUser)` |
| `RemoveDataItem(dataKey, item)` | Remove item from array | `RemoveDataItem(users, user)` |
| `PostData(dataKey)` | Save data to server | `PostData(users)` |
| `ClearData(dataKey)` | Clear/reset data | `ClearData(form)` |
| `CheckDataField(dataKey, field)` | Set field to true | `CheckDataField(config, enabled)` |
| `UncheckDataField(dataKey, field)` | Set field to false | `UncheckDataField(config, enabled)` |
| `UpdateData(dataKey, data)` | Update entire data object | `UpdateData(user, newUserData)` |
| `CreateGuid()` | Generate unique identifier | `CreateGuid()` |

## 💡 Examples

### Todo List Application

```html
<!DOCTYPE html>
<html>
<head>
    <script src="/drapo.js"></script>
    <title>Todo App</title>
</head>
<body>
    <!-- Data definitions -->
    <div d-dataKey="todos" d-dataType="array"></div>
    <div d-dataKey="newTodo" d-dataType="object" d-dataProperty-text=""></div>
    
    <!-- Add new todo -->
    <div>
        <input d-model="{{newTodo.text}}" 
               placeholder="What needs to be done?"
               d-on-keyup-enter="AddDataItem(todos,newTodo);ClearDataField(newTodo,text)">
        <button d-on-click="AddDataItem(todos,newTodo);ClearDataField(newTodo,text)">
            Add Todo
        </button>
    </div>
    
    <!-- Todo list -->
    <ul>
        <li d-for="todo in todos" d-class="{completed:{{todo.completed}}}">
            <input type="checkbox" d-model="{{todo.completed}}">
            <span>{{todo.text}}</span>
            <button d-on-click="RemoveDataItem(todos,todo)">Delete</button>
        </li>
    </ul>
    
    <!-- Summary -->
    <p d-if="{{todos.length > 0}}">
        Total: {{todos.length}} items
    </p>
</body>
</html>
```

### Data-driven Form

```html
<!-- User form with validation -->
<div d-dataKey="user" d-dataType="object" 
     d-dataUrlSet="~/api/users/save">
    
    <form>
        <div>
            <label>Name:</label>
            <input d-model="{{user.name}}" required>
        </div>
        
        <div>
            <label>Email:</label>
            <input d-model="{{user.email}}" type="email" required>
        </div>
        
        <div>
            <label>Country:</label>
            <select d-model="{{user.country}}">
                <option d-for="country in countries" value="{{country.code}}">
                    {{country.name}}
                </option>
            </select>
        </div>
        
        <button d-on-click="PostData(user)" type="button">
            Save User
        </button>
    </form>
</div>
```

### Dynamic Content Loading

```html
<!-- Load data from server -->
<div d-dataKey="products" 
     d-dataUrlGet="~/api/products"
     d-dataUrl="~/api/products">
    
    <div d-if="{{products.length == 0}}">
        Loading products...
    </div>
    
    <div d-for="product in products" class="product-card">
        <h3>{{product.name}}</h3>
        <p>Price: ${{product.price}}</p>
        <button d-on-click="AddToCart(product)">Add to Cart</button>
    </div>
</div>
```

## 🔒 Security

### WebSocket Origin Validation

Drapo automatically validates WebSocket connection origins to prevent Cross-Site WebSocket Hijacking (CSWSH) attacks. By default, only connections from the same origin as your application are allowed.

#### Configuration

You can configure WebSocket origin validation in your `Startup.cs`:

```csharp
public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
{
    app.UseDrapo(options => 
    {
        // Enable/disable origin validation (enabled by default)
        options.Config.ValidateWebSocketOrigin = true;
        
        // Optional: Specify allowed origins explicitly
        // Note: Scheme (http/https) is ignored during validation
        options.Config.AllowedWebSocketOrigins = new List<string>
        {
            "https://yourdomain.com",
            "https://www.yourdomain.com",
            "https://subdomain.yourdomain.com"
        };
    });
}
```

**Gateway Support**: The origin validation automatically supports scenarios where an external gateway or load balancer handles HTTPS, while the internal application runs on HTTP. Only the host/domain portion is compared, not the scheme.

#### Default Behavior

- **Origin validation is enabled by default** for security
- The current request's host is **always** allowed (scheme-independent to support gateways)
- If an explicit allow-list is configured, origins in that list are **also** allowed (in addition to the current host)
- Both `Origin` and `Referer` headers are checked
- Invalid or missing headers result in connection rejection
- **Scheme is ignored** during validation - only the host/domain is compared, allowing gateways to handle HTTPS while the internal application uses HTTP

#### Disabling Validation

⚠️ **Not recommended for production**: You can disable origin validation if needed:

```csharp
options.Config.ValidateWebSocketOrigin = false;
```

## 🧪 Testing

Drapo includes a comprehensive testing framework using Selenium WebDriver and NUnit to validate the framework's functionality across different browsers and scenarios.

### Test Structure

The testing system consists of:

- **Pages Folder** (`src/Test/WebDrapo.Test/Pages/`): Contains HTML test pages with expected evaluated HTML output
- **ReleaseTest Class** (`src/Test/WebDrapo.Test/ReleaseTest.cs`): Initializes the WebDriver, defines test cases, and validation methods  
- **Test Settings File** (`Test.runsettings`): Runtime configuration including URLs for the WebDrapo instance

### Running Tests

1. **Prerequisites**: Ensure you have Chrome WebDriver installed and WebDrapo running locally

2. **Configuration**: Update the URL in `Test.Debug.runsettings` to match your local WebDrapo instance:
   ```xml
   <Parameter name="webAppUrl" value="https://localhost:5001/" />
   ```

3. **Run Tests**: Execute tests via Visual Studio Test Explorer or command line:
   ```bash
   dotnet test src/Test/WebDrapo.Test/
   ```

### Adding New Tests

For each new page added to DrapoPages, follow these steps to create corresponding tests:

1. **Start WebDrapo**: Run the application in debug mode and verify the URL matches your test settings

2. **Configure Test Settings**: In Visual Studio, go to Test Menu → Test Settings and select the appropriate `.runsettings` file

3. **Create Test Page**: Add a new HTML file in the `Pages` folder with naming format: `{PageName}.Test.html`
   - Set the file's Build Action to "Embedded Resource"

4. **Create Test Method**: In `ReleaseTest.cs`, add a new test method:
   ```csharp
   [TestCase]
   public void YourPageNameTest()
   {
       ValidatePage("YourPageName");
   }
   ```

5. **Generate Expected Output**: 
   - Run the test in debug mode
   - After WebDriver navigation, copy the `PageSource` content
   - Paste it into your test HTML file (without formatting)
   - Save and re-run the test to verify it passes

### Test Categories

The test suite covers various Drapo features:

- **Data Binding**: Two-way binding, model updates, data synchronization
- **Control Flow**: `d-for` loops, `d-if` conditionals, nested structures
- **Events**: Click handlers, keyboard events, form interactions
- **Components**: Component lifecycle, data passing, sector management
- **Validation**: Form validation, custom rules, error handling
- **Advanced Features**: Drag & drop, resizing, viewport scrolling

## 🤝 Contributing

We welcome contributions to Drapo! Here's how to get started:

### Development Setup

1. **Fork and Clone**:
   ```bash
   git clone https://github.com/your-username/drapo.git
   cd drapo
   ```

2. **Install Dependencies**:
   ```bash
   cd src/Middleware/Drapo
   npm install
   ```

3. **Build the Project**:
   ```bash
   cd src
   dotnet build
   ```

4. **Run Tests**: the suite is browser-driven (Selenium + NUnit) and needs a running
   WebDrapo host — start it, then run `dotnet test` with the local run settings. Full
   step-by-step in **[doc/development.md → Running the tests](doc/development.md#running-the-tests)**.

> 📋 For the complete build/lint/test workflow, conventions, and quality gates, see the
> **[Development Guide](doc/development.md)**. The project's non-negotiable principles
> live in the **[constitution](.specify/memory/constitution.md)**.

### Development Workflow

1. **Create a Feature Branch**: `git checkout -b feature/your-feature-name`
2. **Make Changes**: Implement your feature or bug fix
3. **Add Tests**: Cover changes with DrapoPages tests (see the [Development Guide](doc/development.md#testing-workflow))
4. **Build and Lint**: `dotnet build Drapo.sln` and `npx tslint --project tsconfig/production/` must both be clean
5. **Run the full suite**: every test must pass — **a PR is only approved when all tests pass**
6. **Submit Pull Request**: Create a PR with a clear description

### Code Style

- **TypeScript**: Follow the existing TSLint configuration
- **C#**: Use standard .NET conventions
- **HTML**: Use consistent indentation and attribute ordering
- **Commit Messages**: Use clear, descriptive commit messages

### Reporting Issues

When reporting bugs or requesting features:

1. Check existing issues first
2. Provide a minimal reproduction case
3. Include browser and .NET version information
4. Describe expected vs actual behavior

## 📚 Documentation

- **[Live Demo](http://drapo.azurewebsites.net/)** - Interactive examples and playground
- **[API Reference](#-api-reference)** - Complete attribute and function documentation
- **[Examples](#-examples)** - Common usage patterns and code samples
- **[Documentation Index](doc/README.md)** - All project docs in one place
- **[Architecture](doc/architecture.md)** - Tech stack, code layout, and build pipeline
- **[Development Guide](doc/development.md)** - Build, lint, test workflow and conventions
- **[d-for Documentation](doc/dfor.md)** - Detailed loop syntax guide

## 📦 Packages & Versions

- **NuGet Package**: [`Drapo`](https://www.nuget.org/packages/Drapo/)
- **Supported Frameworks**: 
  - .NET 8.0
  - .NET 6.0  
  - .NET Core 3.1
- **Browser Support**: Modern browsers (Chrome, Firefox, Safari, Edge)

## 📄 License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with ASP.NET Core and TypeScript
- Uses SignalR for real-time communication
- Inspired by modern declarative UI frameworks
- Thanks to all contributors and users of the Drapo framework

---

**Made with ❤️ by the Drapo team**







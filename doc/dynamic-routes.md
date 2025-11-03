# Dynamic Routes

## Overview

Dynamic Routes allow you to configure routes at runtime based on the HTTP request context. This is particularly useful for multi-tenant applications where different tenants may have different routing configurations.

Drapo provides **two complementary features** for dynamic routing in multi-tenant scenarios:

1. **RouteDelegate** (this document): Dynamically generates route configurations based on HttpContext
2. **RouteIndexDelegate** (see [RouteIndexDelegate.md](RouteIndexDelegate.md)): Dynamically serves different index.html files based on HttpContext

Both features can be used together for comprehensive multi-tenant support.

## Features

- **Per-Request Route Configuration**: Routes can be determined dynamically for each HTTP request
- **Multi-Tenant Support**: Different tenants can have completely different route configurations
- **Context-Based Routing**: Routes can be determined based on any aspect of the `HttpContext`:
  - HTTP Headers (e.g., `X-Tenant`)
  - Subdomain
  - User Claims/Authentication
  - Query Parameters
  - Cookie Values
- **Backward Compatible**: Static routes defined at startup continue to work unchanged
- **Priority**: Dynamic routes take precedence over static routes

## Configuration

### Basic Setup

In your `Startup.cs` file, register a route delegate in the `ConfigureDrapo` method:

```csharp
private void ConfigureDrapo(IWebHostEnvironment env, DrapoMiddlewareOptions options)
{
    // ... other configuration ...
    
    // Register dynamic route delegate
    options.RouteEvent += DynamicRoutes;
}

private async Task<List<DrapoRoute>> DynamicRoutes(HttpContext context)
{
    List<DrapoRoute> routes = new List<DrapoRoute>();
    
    // Determine routes based on request context
    // Example implementation shown below
    
    return await Task.FromResult(routes);
}
```

### Example: Header-Based Multi-Tenant Routing

```csharp
private async Task<List<DrapoRoute>> DynamicRoutes(HttpContext context)
{
    // Get tenant identifier from header
    string tenant = context.Request.Headers["X-Tenant"].ToString();
    
    List<DrapoRoute> routes = new List<DrapoRoute>();
    
    if (!string.IsNullOrEmpty(tenant))
    {
        if (tenant.Equals("tenant1", StringComparison.OrdinalIgnoreCase))
        {
            // Routes specific to Tenant 1
            routes.Add(new DrapoRoute
            {
                Uri = "^/home$",
                Expression = "UpdateSector(content,~/DrapoPages/Tenant1Home.html)"
            });
            routes.Add(new DrapoRoute
            {
                Uri = "^/products$",
                Expression = "UpdateSector(content,~/DrapoPages/Tenant1Products.html)"
            });
        }
        else if (tenant.Equals("tenant2", StringComparison.OrdinalIgnoreCase))
        {
            // Routes specific to Tenant 2
            routes.Add(new DrapoRoute
            {
                Uri = "^/home$",
                Expression = "UpdateSector(content,~/DrapoPages/Tenant2Home.html)"
            });
            routes.Add(new DrapoRoute
            {
                Uri = "^/services$",
                Expression = "UpdateSector(content,~/DrapoPages/Tenant2Services.html)"
            });
        }
    }
    
    return await Task.FromResult(routes);
}
```

### Example: Subdomain-Based Routing

```csharp
private async Task<List<DrapoRoute>> DynamicRoutes(HttpContext context)
{
    // Get subdomain from host
    string host = context.Request.Host.Host;
    string[] hostParts = host.Split('.');
    string subdomain = hostParts.Length > 2 ? hostParts[0] : null;
    
    List<DrapoRoute> routes = new List<DrapoRoute>();
    
    if (!string.IsNullOrEmpty(subdomain) && subdomain != "www")
    {
        // Route all requests for this subdomain to tenant-specific pages
        routes.Add(new DrapoRoute
        {
            Uri = "^/$",
            Expression = $"UpdateSector(content,~/Tenants/{subdomain}/home.html)"
        });
    }
    
    return await Task.FromResult(routes);
}
```

### Example: User Role-Based Routing

```csharp
private async Task<List<DrapoRoute>> DynamicRoutes(HttpContext context)
{
    List<DrapoRoute> routes = new List<DrapoRoute>();
    
    if (context.User.Identity.IsAuthenticated)
    {
        if (context.User.IsInRole("Admin"))
        {
            // Admin-specific routes
            routes.Add(new DrapoRoute
            {
                Uri = "^/dashboard$",
                Expression = "UpdateSector(content,~/DrapoPages/AdminDashboard.html)"
            });
        }
        else if (context.User.IsInRole("User"))
        {
            // Regular user routes
            routes.Add(new DrapoRoute
            {
                Uri = "^/dashboard$",
                Expression = "UpdateSector(content,~/DrapoPages/UserDashboard.html)"
            });
        }
    }
    
    return await Task.FromResult(routes);
}
```

## Route Properties

Each `DrapoRoute` object has the following properties:

- **Uri**: Regular expression pattern to match the URL path
- **Expression**: Drapo function expression to execute when the route matches
- **BeforeLoadExpression**: (Optional) Expression to execute before loading
- **AfterLoadExpression**: (Optional) Expression to execute after loading

## Best Practices

1. **Performance**: Keep route determination logic lightweight since it's executed on every request
2. **Caching**: Consider caching tenant-specific route configurations if they don't change frequently
3. **Fallback**: Always have default/static routes configured as fallback
4. **Testing**: Test with different tenant identifiers to ensure proper route isolation
5. **Security**: Validate tenant identifiers to prevent unauthorized access

## Combining Static and Dynamic Routes

You can use both static and dynamic routes together. Dynamic routes take precedence:

```csharp
// Static routes (configured at startup)
options.Config.CreateRoute("^/about$", "UpdateSector(content,~/DrapoPages/About.html)");
options.Config.CreateRoute("^/contact$", "UpdateSector(content,~/DrapoPages/Contact.html)");

// Dynamic routes (determined per request)
options.RouteEvent += DynamicRoutes;
```

In this configuration:
- If a dynamic route matches the URL, it will be used
- If no dynamic route matches, static routes are checked
- This allows for tenant-specific overrides while maintaining common routes

## Caching Behavior

When dynamic routes are configured:
- The configuration JSON served to the client is generated per request
- ETags are calculated per request to ensure proper HTTP caching
- Browser caching still works effectively through ETag validation

## Troubleshooting

### Routes Not Working

1. Verify the route delegate is registered: `options.RouteEvent += YourMethod;`
2. Check that your route URI regex patterns are correct
3. Ensure the Expression refers to valid Drapo functions and paths
4. Verify tenant identifier is being extracted correctly from the request

### Performance Issues

1. Minimize database calls in the route delegate
2. Cache tenant configuration data
3. Use static routes for common routes that don't need to be dynamic
4. Profile your route determination logic

## Combining with RouteIndexDelegate

For comprehensive multi-tenant support, you can use both `RouteEvent` and `RouteIndexEvent` together:

```csharp
private void ConfigureDrapo(IWebHostEnvironment env, DrapoMiddlewareOptions options)
{
    // Configure dynamic routes based on tenant
    options.RouteEvent += async (HttpContext context) =>
    {
        string tenant = context.Request.Headers["X-Tenant"].ToString();
        List<DrapoRoute> routes = new List<DrapoRoute>();
        
        if (tenant == "tenant1")
        {
            // Tenant1-specific routes
            routes.Add(new DrapoRoute 
            { 
                Uri = "^/dashboard$", 
                Expression = "UpdateSector(content,~/tenant1/dashboard.html)" 
            });
        }
        
        return routes;
    };
    
    // Configure dynamic index.html based on tenant
    options.RouteIndexEvent += async (HttpContext context) =>
    {
        string tenant = context.Request.Headers["X-Tenant"].ToString();
        string path = env.WebRootPath;
        
        if (!string.IsNullOrEmpty(tenant))
        {
            string tenantIndexPath = Path.Combine(path, $"index.{tenant}.html");
            if (File.Exists(tenantIndexPath))
                return await File.ReadAllTextAsync(tenantIndexPath);
        }
        
        return await File.ReadAllTextAsync(Path.Combine(path, "index.html"));
    };
}
```

This combination allows you to:
- Serve different entry points (index.html) for different tenants
- Have completely different routing configurations per tenant
- Maintain separate page structures for each tenant

## Related Documentation

- [Route Index Delegate](./RouteIndexDelegate.md) - Dynamic index.html serving
- [Drapo Routing Basics](../README.md)
- [Configuration Options](./configuration.md)

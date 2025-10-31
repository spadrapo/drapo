# Route Index Dynamic Content - Multi-Tenant Support

## Overview

The `RouteIndexDelegate` feature enables dynamic generation of the router index content based on the HTTP request context. This is particularly useful for multi-tenant applications where different tenants need different index.html content.

## Usage

### Setting up the RouteIndexEvent

In your application's startup configuration, set the `RouteIndexEvent` on the `DrapoMiddlewareOptions`:

```csharp
public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
{
    app.UseDrapo(options =>
    {
        options.RouteIndexEvent += RouteIndex;
        // ... other configuration
    });
}

private async Task<string> RouteIndex(HttpContext context)
{
    // Example: Multi-tenant support based on tenant header
    string tenant = context.Request.Headers["X-Tenant"].ToString();
    string path = _environment.WebRootPath;
    
    // If tenant header is present, try to load tenant-specific index
    if (!string.IsNullOrEmpty(tenant))
    {
        string tenantIndexPath = Path.Combine(path, $"index.{tenant}.html");
        if (File.Exists(tenantIndexPath))
            return await File.ReadAllTextAsync(tenantIndexPath);
    }
    
    // Default fallback to standard index.html
    string defaultIndexPath = Path.Combine(path, "index.html");
    return await File.ReadAllTextAsync(defaultIndexPath);
}
```

## Multi-Tenant Scenarios

### 1. Header-Based Tenant Identification

```csharp
private async Task<string> RouteIndex(HttpContext context)
{
    string tenant = context.Request.Headers["X-Tenant"].ToString();
    return await LoadTenantIndex(tenant);
}
```

### 2. Domain-Based Tenant Identification

```csharp
private async Task<string> RouteIndex(HttpContext context)
{
    string host = context.Request.Host.Host;
    string tenant = ExtractTenantFromDomain(host);
    return await LoadTenantIndex(tenant);
}
```

### 3. Cookie-Based Tenant Identification

```csharp
private async Task<string> RouteIndex(HttpContext context)
{
    string tenant = context.Request.Cookies["tenant"];
    return await LoadTenantIndex(tenant);
}
```

### 4. Database-Driven Dynamic Content

```csharp
private async Task<string> RouteIndex(HttpContext context)
{
    string tenant = GetTenantIdentifier(context);
    
    // Load tenant configuration from database
    var tenantConfig = await _dbContext.TenantConfigs
        .FirstOrDefaultAsync(t => t.Identifier == tenant);
    
    if (tenantConfig != null)
    {
        // Generate or load custom index based on tenant configuration
        return await GenerateIndexFromConfig(tenantConfig);
    }
    
    // Default fallback
    return await LoadDefaultIndex();
}
```

## Benefits

1. **Multi-Tenant Support**: Serve different content to different tenants without code changes
2. **Dynamic Content**: Generate index.html dynamically based on runtime conditions
3. **Flexible Routing**: Control routing behavior per tenant or request context
4. **Single Deployment**: One application deployment can serve multiple tenants

## Fallback Behavior

If `RouteIndexEvent` is not set or returns null, the router falls back to the default behavior of loading `/index.html` from the web root directory.

## Example Files

The WebDrapo test application includes example files:
- `/index.html` - Default index file
- `/index.tenant1.html` - Example tenant-specific index file

## See Also

- `DrapoMiddlewareOptions.cs` - Main configuration class
- `DrapoMiddleware.cs` - Implementation of route handling
- `Startup.cs` in WebDrapo - Example implementation

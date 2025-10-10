# IndexedDB Cache Configuration Example

To enable IndexedDB instead of LocalStorage for caching in Drapo, add the following configuration to your `drapo.json`:

```json
{
  "UseCacheIndexedDB": true,
  "UseCacheLocalStorage": false,
  "UseCacheLocalStorageCleanup": true
}
```

## Configuration Options

- **UseCacheIndexedDB**: `true` to enable IndexedDB caching (default: `false`)
- **UseCacheLocalStorage**: `true` to enable LocalStorage caching (default: `false`) 
- **UseCacheLocalStorageCleanup**: `true` to enable automatic cleanup of old cache versions (default: `true`)

## Priority

When both `UseCacheIndexedDB` and `UseCacheLocalStorage` are enabled, IndexedDB takes priority as it provides better performance and storage capacity for larger datasets.

## Database Structure

IndexedDB implementation creates:
- **Database**: `drapo`
- **Object Store**: `cache` 
- **Key Structure**: Cache keys (strings)
- **Value Structure**: Serialized cache data (strings)

## Browser Support

IndexedDB is supported in all modern browsers. If IndexedDB is not available, Drapo will automatically fall back to LocalStorage if enabled.
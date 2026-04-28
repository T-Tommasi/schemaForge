# schemaForge
SchemaForge turns structured data into validated XML for legacy and standards-driven systems. It separates domain models, validation, lookup tables, and serializers, enabling clean, testable pipelines for complex integrations without coupling application logic to fragile external schemas.

## Custom Vendors

Register custom vendor presets to encapsulate parser, normalizers, transformers, and defaults. No built-in plugins required.

```typescript
import { registerVendor, schemaForge } from 'schemaforge';

registerVendor('myCompany', {
  name: 'myCompany',
  parser: 'csv',
  normalizers: ['trim', 'lowercase'],
  transformers: ['toNumber'],
  defaults: { uuidStrategy: 'v4' }
});

const result = await schemaForge({
  origin: 'code,name\n001,Test',
  target: 'product',
  vendor: 'myCompany',
  valueFields: ['code', 'name'],
  uuid: { type: 'v4' },
  exportFormat: 'json'
});
```

Vendors can also be created without a name (using only options), or extended at runtime via `transformerOptions`.

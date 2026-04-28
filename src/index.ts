/**
 * schemaForge - Data transformation and schema conversion library
 * @packageDocumentation
 * /
 * ## Vendors
 * /
 * Built-in vendors (e.g. 'example') auto-register when the package is imported.
 * Custom vendors can be registered independently via {@link registerVendor}.
 * /
 * @example
 * import { registerVendor, schemaForge } from 'schemaforge';
 * /
 * // Register custom vendor—no built-in plugins required
 * registerVendor('myCompany', {
 *   name: 'myCompany',
 *   parser: 'csv',
 *   normalizers: ['trim', 'lowercase'],
 *   transformers: ['toNumber'],
 *   defaults: { uuidStrategy: 'v4' }
 * });
 * /
 * const result = await schemaForge({
 *   origin: 'code,name\n001,Test',
 *   target: 'product',
 *   vendor: 'myCompany',
 *   valueFields: ['code', 'name'],
 *   uuid: { type: 'v4' },
 *   exportFormat: 'json'
 * });
 */

// Load vendors on import - their index registers built-in vendors
import './plugins/vendors';

export { schemaForge, schemaForgeAndExport } from './utils/schemaForge';
export type { SchemaForgeOptions, ParsedRow, ExportFormat } from './utils/schemaForge';

export type {
  UUIDStrategy,
  UUIDStrategyType,
  Normalizer,
  Transformer,
  VendorPlugin,
  VendorConfig,
} from './utils/types';

export { parseByFormat } from './utils/parsers';
export type { Parser } from './utils/parsers';

export { exportRows } from './utils/exporters';

export { normalizers, getNormalizer } from './plugins/normalizers';
export type { NormalizerName } from './plugins/normalizers';

export { transformers, getTransformer } from './plugins/transformers';
export type { TransformerName } from './plugins/transformers';

export {
  registerPlugin,
  registerVendor,
  getVendor,
  listPlugins,
  getPlugin,
} from './plugins/registry';
export type { PluginConfig } from './plugins/registry';

export { resolveVendorOptions } from './plugins/vendors';

export { resolveUUIDGenerator } from './utils/uuid';
export type { UUIDGenerator } from './utils/uuid';

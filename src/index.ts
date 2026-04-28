/**
 * schemaForge - Data transformation and schema conversion library
 * @packageDocumentation
 */

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

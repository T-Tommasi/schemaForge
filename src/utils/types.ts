export type ExportFormat = 'csv' | 'xml' | 'json';

export type UUIDStrategyType = 'v4' | 'v5' | 'random' | 'custom';

export interface UUIDStrategy {
  type: UUIDStrategyType;
  namespace?: string;
  namespaceConfig?: {
    name: string;
    code: string;
  };
  fields?: string[];
  generator?: (row: Record<string, unknown>, index: number) => string;
}

export interface Normalizer {
  name: string;
  normalize: (value: string) => string;
}

export interface Transformer {
  name: string;
  transform: (value: string, options?: Record<string, unknown>) => unknown;
}

export interface ParsedRow {
  id: string;
  type: string;
  origin: string;
  values: Array<{ field: string; value: unknown }>;
}

export interface SchemaForgeOptions {
  origin: string;
  target: string;
  parser?: string;
  normalizers: string[];
  transformers: string[];
  uuid: UUIDStrategy;
  exportFormat: ExportFormat;
  valueFields: string[];
  vendor?: string;
  plugin?: string;
}

export interface VendorPlugin {
  name: string;
  parser: string;
  normalizers: Normalizer[];
  transformers: Transformer[];
  defaults: Partial<SchemaForgeOptions>;
}

export interface VendorConfig {
  defaultTarget: string;
  defaultUUID: UUIDStrategy;
  defaultExportFormat: ExportFormat;
  defaultValueFields: string[];
}

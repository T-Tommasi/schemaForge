/**
 * Core schemaForge engine
 * @module utils/schemaForge
 * @description Transforms raw data through normalization, transformation, and UUID generation.
 */

import type { SchemaForgeOptions, ParsedRow } from './types';
import { parseByFormat } from './parsers';
import { exportRows } from './exporters';
import { resolveUUIDGenerator } from './uuid';
import { getNormalizer } from '../plugins/normalizers';
import { getTransformer } from '../plugins/transformers';
import { resolveVendorOptions } from '../plugins/vendors';

const NO_PLUGIN_ERROR = 'no plugin selected for parsing!';

interface ResolvedConfig {
  parser: string;
  normalizers: string[];
  transformers: string[];
}

function resolveConfig(options: SchemaForgeOptions): ResolvedConfig {
  const {
    plugin, vendor, parser, normalizers, transformers
  } = options;

  if (!plugin && !vendor) {
    throw new Error(NO_PLUGIN_ERROR);
  }

  const resolved = resolveVendorOptions(vendor, options);

  return {
    parser: parser ?? resolved.parser,
    normalizers: normalizers ?? resolved.normalizers,
    transformers: transformers ?? resolved.transformers,
  };
}

/**
 * Transform raw data rows into schema-compliant records
 * @param options - Configuration for parsing, normalizing, transforming, and UUID generation
 * @returns Promise resolving to array of parsed rows with generated IDs
 */
export async function schemaForge(options: SchemaForgeOptions): Promise<ParsedRow[]> {
  const {
    origin,
    target,
    uuid,
    valueFields,
  } = options;

  const config = resolveConfig(options);
  const rows = await parseByFormat(config.parser, origin);
  const uuidGenerator = resolveUUIDGenerator(uuid);
  const results: ParsedRow[] = [];

  for (const row of rows) {
    const id = uuidGenerator(row, results.length);

    const values = valueFields.map((field) => {
      let processedValue: string = String(row[field] ?? '');

      for (const name of config.normalizers) {
        const normalizer = getNormalizer(name);
        processedValue = normalizer(processedValue);
      }

      let transformedValue: unknown = processedValue;
      for (const name of config.transformers) {
        const transformer = getTransformer(name);
        transformedValue = transformer(transformedValue as string, {});
      }

      return { field, value: transformedValue };
    });

    results.push({
      id,
      type: target,
      origin: typeof origin === 'string' && origin.length > 100 ? '[data]' : origin,
      values,
    });
  }

  return results;
}

/**
 * Transform data and export to specified format in one step
 * @param options - SchemaForge options including export format
 * @returns Promise resolving to formatted string output
 */
export async function schemaForgeAndExport(options: SchemaForgeOptions): Promise<string> {
  const rows = await schemaForge(options);
  return exportRows(rows, options.exportFormat);
}

export type { SchemaForgeOptions, ParsedRow } from './types';
export type { ExportFormat } from './types';

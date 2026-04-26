/**
 * Core schemaForge engine
 * @module utils/schemaForge
 * @description Transforms raw data through normalization, transformation, and UUID generation.
 */

import type { SchemaForgeOptions, ParsedRow, ExportFormat } from './types';
import { parseByFormat } from './parsers';
import { exportRows } from './exporters';
import { resolveUUIDGenerator } from './uuid';
import { normalizers } from '../plugins/normalizers';
import { transformers } from '../plugins/transformers';

/**
 * Transform raw data rows into schema-compliant records
 * @param options - Configuration for parsing, normalizing, transforming, and UUID generation
 * @returns Promise resolving to array of parsed rows with generated IDs
 */
export async function schemaForge(options: SchemaForgeOptions): Promise<ParsedRow[]> {
  const {
    origin,
    target,
    normalizers: normalizerNames,
    transformers: transformerNames,
    uuid,
    valueFields,
  } = options;

  const rows = await parseByFormat('csv', origin);
  const uuidGenerator = resolveUUIDGenerator(uuid);
  const results: ParsedRow[] = [];

  for (const row of rows) {
    const id = uuidGenerator(row, results.length);

    const values = valueFields.map((field) => {
      let processedValue: string = String(row[field] ?? '');

      // Apply normalizers in sequence (e.g., trim -> lowercase)
      for (const name of normalizerNames) {
        const normalizer = normalizers[name as keyof typeof normalizers];
        if (normalizer) {
          processedValue = normalizer(processedValue);
        }
      }

      // Apply transformers in sequence (e.g., toNumber -> toDate)
      // Each transformer receives the output of the previous one
      let transformedValue: unknown = processedValue;
      for (const name of transformerNames) {
        const transformer = transformers[name as keyof typeof transformers];
        if (transformer) {
          transformedValue = (transformer as (v: string, o?: Record<string, unknown>) => unknown)(
            transformedValue as string,
            {},
          );
        }
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

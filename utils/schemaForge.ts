import type { SchemaForgeOptions, ParsedRow, ExportFormat } from './types';
import { parseByFormat } from './parsers';
import { exportRows } from './exporters';
import { resolveUUIDGenerator } from './uuid';
import { normalizers } from '../plugins/normalizers';
import { transformers } from '../plugins/transformers';

export async function schemaForge(options: SchemaForgeOptions): Promise<ParsedRow[]> {
	const { origin, target, normalizers: normalizerNames, transformers: transformerNames, uuid, exportFormat, valueFields } = options;

	const rows = await parseByFormat('csv', origin);

	const uuidGenerator = resolveUUIDGenerator(uuid);

	const results: ParsedRow[] = [];

	for (const row of rows) {
		const id = uuidGenerator(row, results.length);

		const values = valueFields.map((field) => {
			let rawValue = String(row[field] ?? '');

			for (const name of normalizerNames) {
				if (normalizers[name as keyof typeof normalizers]) {
					rawValue = normalizers[name as keyof typeof normalizers](rawValue);
				}
			}

			let transformedValue: unknown = rawValue;
			for (const name of transformerNames) {
				const transformer = transformers[name as keyof typeof transformers];
				if (transformer) {
					transformedValue = (transformer as (v: string, o?: Record<string, unknown>) => unknown)(rawValue as string);
				}
			}

			return { field, value: transformedValue };
		});

		results.push({
			id,
			type: target,
			origin: typeof origin === 'string' && origin.length > 100 ? '[data]' : origin,
			values
		});
	}

	return results;
}

export async function schemaForgeAndExport(options: SchemaForgeOptions): Promise<string> {
	const rows = await schemaForge(options);
	return exportRows(rows, options.exportFormat);
}

export { type SchemaForgeOptions, type ParsedRow, type ExportFormat } from './types';
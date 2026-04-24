export { exportToCSV, type CSVExportOptions } from './csv';
export { exportToXML, type XMLExportOptions } from './xml';
export { exportToJSON } from './json';

import type { ParsedRow, ExportFormat } from '../types';
import { exportToCSV } from './csv';
import { exportToXML } from './xml';
import { exportToJSON } from './json';

export function exportRows(rows: ParsedRow[], format: ExportFormat, options?: Record<string, unknown>): string {
	switch (format) {
		case 'csv':
			return exportToCSV(rows, options as Parameters<typeof exportToCSV>[1]);
		case 'xml':
			return exportToXML(rows, options as Parameters<typeof exportToXML>[1]);
		case 'json':
			return exportToJSON(rows, options?.pretty === true);
		default:
			throw new Error(`Unsupported export format: ${format}`);
	}
}
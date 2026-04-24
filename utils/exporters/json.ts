import type { ParsedRow } from '../types';

export function exportToJSON(rows: ParsedRow[], pretty?: boolean): string {
	return JSON.stringify(rows, null, pretty ? 2 : 0);
}
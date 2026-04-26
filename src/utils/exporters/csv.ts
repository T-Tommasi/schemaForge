import type { ParsedRow } from '../types';

export interface CSVExportOptions {
  delimiter?: string;
  includeHeaders?: boolean;
}

export function exportToCSV(rows: ParsedRow[], options: CSVExportOptions = {}): string {
  const delimiter = options.delimiter ?? ',';
  const headers = ['id', 'type', 'origin', 'field', 'value'];
  const lines: string[] = [];

  if (options.includeHeaders !== false) {
    lines.push(headers.join(delimiter));
  }

  for (const row of rows) {
    for (const { field, value } of row.values) {
      const escapedValue = String(value).includes(delimiter)
        ? `"${String(value).replace(/"/g, '""')}"`
        : value;
      lines.push([row.id, row.type, row.origin, field, String(escapedValue)].join(delimiter));
    }
  }

  return lines.join('\n');
}

import type { ParsedRow } from '../types';

export { parseCSV } from './csv';
export { parseXML } from './xml';

export interface Parser {
  parse: (source: string, options?: Record<string, unknown>) => Promise<Record<string, unknown>[]>;
}

export async function parseByFormat(
  format: string,
  source: string,
  options?: Record<string, unknown>,
): Promise<Record<string, unknown>[]> {
  switch (format) {
    case 'csv':
      const { parseCSV } = await import('./csv');
      return parseCSV(source, options);
    case 'xml':
      const { parseXML } = await import('./xml');
      return parseXML(source, options);
    default:
      throw new Error(`Unsupported format: ${format}`);
  }
}

import type { ParsedRow } from '../types';

export interface XMLExportOptions {
  rootElement?: string;
  itemElement?: string;
  indent?: string;
}

function escapeXml(str: string): string {
  let result = str;
  result = result.replace(/&/g, '&');
  result = result.replace(/</g, '<');
  result = result.replace(/>/g, '>');
  result = result.replace(/"/g, '"');
  result = result.replace(/'/g, '&#39;');
  return result;
}

export function exportToXML(rows: ParsedRow[], options: XMLExportOptions = {}): string {
  const root = options.rootElement || 'data';
  const item = options.itemElement || 'item';
  const indent = options.indent || '  ';

  const lines: string[] = [];
  lines.push(`<${root}>`);

  for (const row of rows) {
    lines.push(`${indent}<${item}>`);
    lines.push(`${indent + indent}<id>${escapeXml(row.id)}</id>`);
    lines.push(`${indent + indent}<type>${escapeXml(row.type)}</type>`);
    lines.push(`${indent + indent}<origin>${escapeXml(row.origin)}</origin>`);
    lines.push(`${indent + indent}<values>`);

    for (const { field, value } of row.values) {
      lines.push(`${indent + indent + indent}<${field}>${escapeXml(String(value))}</${field}>`);
    }

    lines.push(`${indent + indent}</values>`);
    lines.push(`${indent}</${item}>`);
  }

  lines.push(`</${root}>`);
  return lines.join('\n');
}

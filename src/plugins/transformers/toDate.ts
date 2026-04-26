export interface ToDateOptions {
  format?: string;
  nanValue?: Date;
}

export const toDate = (value: string, options?: ToDateOptions): Date | null => {
  if (!value.trim()) return null;

  if (options?.format) {
    const date = parseDateWithFormat(value, options.format);
    return date ?? options.nanValue ?? null;
  }

  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? (options?.nanValue ?? null) : parsed;
};

function parseDateWithFormat(value: string, format: string): Date | null {
  const parts = value.match(/\d+/g);
  if (!parts) return null;

  const formatParts = format.split(/[^a-zA-Z]+/);
  const dateMap: Record<string, number> = {};

  formatParts.forEach((part, i) => {
    const p = part.toLowerCase();
    if (parts[i]) {
      if (p === 'yyyy' || p === 'yy') {
        dateMap.year = parseInt(parts[i]);
      } else if (p === 'mm' || p === 'm') {
        dateMap.month = parseInt(parts[i]) - 1;
      } else if (p === 'dd' || p === 'd') {
        dateMap.day = parseInt(parts[i]);
      }
    }
  });

  if (dateMap.year !== undefined && dateMap.month !== undefined && dateMap.day !== undefined) {
    return new Date(dateMap.year, dateMap.month, dateMap.day);
  }

  return null;
}

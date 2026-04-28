export interface ToEnumOptions<T extends string> {
  values: T[];
  nanValue?: T;
  caseSensitive?: boolean;
}

export function toEnum<T extends string>(
  value: string,
  options?: ToEnumOptions<T>,
): T | null {
  if (!options || !value.trim()) return null;
  if (!value.trim()) return null;

  const searchValue = options.caseSensitive ? value.trim() : value.toLowerCase().trim();
  const matchFn = options.caseSensitive
    ? (v: T) => v === searchValue
    : (v: T) => v.toLowerCase() === searchValue;

  const found = options.values.find(matchFn);
  return found ?? options.nanValue ?? null;
}

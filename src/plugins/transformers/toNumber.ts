export interface ToNumberOptions {
  radix?: number;
  nanValue?: number;
}

export const toNumber = (value: string, options?: ToNumberOptions): number => {
  const radix = options?.radix ?? 10;
  const trimmed = value.trim();

  // Use parseFloat to handle decimals, then parseInt for integer-only radix
  const result = radix === 10 ? parseFloat(trimmed) : parseInt(trimmed, radix);
  return options?.nanValue !== undefined && Number.isNaN(result) ? options.nanValue : result;
};

/**
 * Adds prefix/suffix to a string value.
 * Demonstrates custom transformer with runtime options.
 *
 * Use case: Vendor-specific formatting, e.g., adding product codes,
 * wrapping values in delimiters, or appending taxonomy markers.
 *
 * @example
 * // Add "CAT-" prefix to all values
 * toPrefix("item", { prefix: "CAT-" }) // → "CAT-item"
 *
 * @example
 * // Wrap in brackets
 * toPrefix("value", { prefix: "[", suffix: "]" }) // → "[value]"
 */
export interface ToPrefixOptions {
  /** String to prepend to the value */
  prefix: string;
  /** Optional string to append after the value */
  suffix?: string;
}

export const toPrefix = (value: string, options?: ToPrefixOptions): string => {
  // No prefix configured = passthrough (identity transform)
  if (!options?.prefix) return value;
  return `${options.prefix}${value}${options.suffix ?? ''}`;
};

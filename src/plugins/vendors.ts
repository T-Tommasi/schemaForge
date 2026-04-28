/**
 * Vendor resolution utilities
 * Pre-registered vendors and custom vendor support
 * @module plugins/vendors
 */

import { getVendor } from './registry';
import type { PluginConfig } from './registry';
import type { SchemaForgeOptions } from '../utils/types';

export interface ResolvedOptions {
  parser: string;
  normalizers: string[];
  transformers: string[];
  options: Partial<SchemaForgeOptions>;
}

export function resolveVendorOptions(
  vendorName: string | undefined,
  options: Partial<SchemaForgeOptions>
): ResolvedOptions {
  if (!vendorName) {
    return {
      parser: options.parser ?? 'csv',
      normalizers: options.normalizers ?? [],
      transformers: options.transformers ?? [],
      options,
    };
  }

  const vendor = getVendor(vendorName);
  if (!vendor) {
    throw new Error(`Vendor "${vendorName}" not found in registry`);
  }

  return {
    parser: vendor.parser,
    normalizers: options.normalizers ?? vendor.normalizers ?? [],
    transformers: options.transformers ?? vendor.transformers ?? [],
    options: { ...vendor.defaults, ...options },
  };
}

export { getVendor };
export type { PluginConfig };

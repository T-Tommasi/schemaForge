/**
 * Central plugin registry
 * @module plugins/registry
 */

import type { SchemaForgeOptions } from '../utils/types';

export interface PluginConfig {
  name: string;
  parser: string;
  normalizers?: string[];
  transformers?: string[];
  defaults?: Partial<SchemaForgeOptions>;
}

export type TransformerFn = (value: string, options?: Record<string, unknown>) => unknown;
type NormalizerFn = (value: string) => string;
type PluginFn = TransformerFn | NormalizerFn;

type RegistryEntry =
  | { type: 'vendor'; config: PluginConfig }
  | {
      type: 'plugin';
      name: string;
      fn: PluginFn;
      pluginType: 'transformer' | 'normalizer';
    };

const registry = new Map<string, RegistryEntry>();
const pluginRegistry = new Map<string, PluginFn>();

export function registerPlugin(
  name: string,
  fn: PluginFn,
  pluginType: 'transformer' | 'normalizer',
): void {
  pluginRegistry.set(name, fn);
  registry.set(name, {
    type: 'plugin', name, fn, pluginType
  });
}

export function registerVendor(name: string, config: PluginConfig): void {
  registry.set(name, { type: 'vendor', config });
}

export function getPlugin(name: string): PluginFn | undefined {
  return pluginRegistry.get(name);
}

export function getPluginEntry(name: string): RegistryEntry | undefined {
  return registry.get(name);
}

export function listPlugins(): string[] {
  return Array.from(registry.keys());
}

export function getVendor(name: string): PluginConfig | undefined {
  const entry = registry.get(name);
  return entry?.type === 'vendor' ? entry.config : undefined;
}

export function clearRegistry(): void {
  registry.clear();
  pluginRegistry.clear();
}

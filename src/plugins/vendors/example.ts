/**
 * Example vendor preset.
 * Use as template for custom vendor implementation.
 *
 * This file demonstrates how to create a vendor preset. Built-in vendors
 * are optional—call registerVendor() directly without requiring any
 * pre-registered plugins.
 *
 * @example
 * import { schemaForge } from '../../utils/schemaForge';
 *
 * const result = await schemaForge({
 *   origin: 'CODE,NAME\n001,Test',
 *   target: 'product',
 *   vendor: 'example',
 *   valueFields: ['CODE', 'NAME'],
 *   uuid: { type: 'v4' },
 *   exportFormat: 'json',
 *   transformerOptions: {
 *     toPrefix: { prefix: 'SKU-' }  // runtime options
 *   }
 * });
 *
 *
 * @example
 * import { schemaForge } from '../../utils/schemaForge';
 *
 * const result = await schemaForge({
 *   origin: 'CODE,NAME\n001,Test',
 *   target: 'product',
 *   vendor: 'example',
 *   valueFields: ['CODE', 'NAME'],
 *   uuid: { type: 'v4' },
 *   exportFormat: 'json',
 *   transformerOptions: {
 *     toPrefix: { prefix: 'SKU-' }  // runtime options
 *   }
 * });
 */
import { registerVendor } from '../registry';

registerVendor('example', {
  name: 'example',
  parser: 'csv',
  normalizers: ['trim', 'lowercase'],
  transformers: ['toPrefix'],
  defaults: {
    target: 'item',
    exportFormat: 'json',
  },
});

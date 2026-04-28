import { registerPlugin, getPlugin } from '../registry';
import { trim } from './trim';
import { lowercase } from './lowercase';
import { collapseSpaces } from './collapseSpaces';

registerPlugin('trim', trim, 'normalizer');
registerPlugin('lowercase', lowercase, 'normalizer');
registerPlugin('collapseSpaces', collapseSpaces, 'normalizer');

export const normalizers = {
  trim,
  lowercase,
  collapseSpaces,
} as const;

export type NormalizerName = keyof typeof normalizers | string;

export function getNormalizer(name: string): (value: string) => string {
  const fn = normalizers[name as keyof typeof normalizers];
  if (fn) return fn;
  const custom = getPlugin(name);
  if (custom) return custom as (value: string) => string;
  return (v: string) => v;
}

export { registerPlugin } from '../registry';

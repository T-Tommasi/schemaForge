import { trim } from './trim';
import { lowercase } from './lowercase';
import { collapseSpaces } from './collapseSpaces';

export const normalizers = {
  trim,
  lowercase,
  collapseSpaces,
} as const;

export type NormalizerName = keyof typeof normalizers;

export function getNormalizer(name: NormalizerName): (value: string) => string {
  return normalizers[name];
}

import { toNumber } from './toNumber';
import { toDate } from './toDate';
import { toBoolean } from './toBoolean';
import { toEnum } from './toEnum';

export const transformers = {
  toNumber,
  toDate,
  toBoolean,
  toEnum,
} as const;

export type TransformerName = keyof typeof transformers;

export function getTransformer(
  name: TransformerName,
): (value: string, options?: Record<string, unknown>) => unknown {
  return transformers[name] as (value: string, options?: Record<string, unknown>) => unknown;
}

import { registerPlugin, getPlugin } from '../registry';
import type { TransformerFn } from '../registry';
import { toNumber } from './toNumber';
import { toDate } from './toDate';
import { toBoolean } from './toBoolean';
import { toEnum } from './toEnum';
import { toPrefix } from './toPrefix';

registerPlugin('toNumber', toNumber as TransformerFn, 'transformer');
registerPlugin('toDate', toDate as TransformerFn, 'transformer');
registerPlugin('toBoolean', toBoolean as TransformerFn, 'transformer');
registerPlugin('toEnum', toEnum as TransformerFn, 'transformer');
registerPlugin('toPrefix', toPrefix as TransformerFn, 'transformer');

export const transformers = {
  toNumber,
  toDate,
  toBoolean,
  toEnum,
  toPrefix,
} as const;

export type TransformerName = keyof typeof transformers;

const builtInTransformers = transformers;

export function getTransformer(
  name: string,
): (value: string, options?: Record<string, unknown>) => unknown {
  const customPlugin = getPlugin(name);
  if (customPlugin) {
    return customPlugin as TransformerFn;
  }
  return (
    builtInTransformers[name as TransformerName]
    ?? ((v: string) => v)
  ) as (value: string, options?: Record<string, unknown>) => unknown;
}

export { registerPlugin } from '../registry';

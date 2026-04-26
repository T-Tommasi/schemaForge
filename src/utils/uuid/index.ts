import type { UUIDStrategy } from '../types';
import type { UUIDGenerator } from './types';
import { generateV4 } from './v4';
import { makeV5Generator } from './v5';
import { generateRandom } from './random';

export function resolveUUIDGenerator(strategy?: UUIDStrategy): UUIDGenerator {
  if (!strategy) {
    return generateV4;
  }

  switch (strategy.type) {
    case 'v4':
      return generateV4;
    case 'v5':
      return makeV5Generator(strategy);
    case 'random':
      return generateRandom;
    case 'custom':
      if (!strategy.generator) {
        throw new Error('UUID custom strategy requires generator function');
      }
      return strategy.generator;
    default:
      return makeV5Generator({ type: 'v5', fields: strategy.fields });
  }
}

export type { UUIDGenerator } from './types';

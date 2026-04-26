/**
 * Tests for toNumber transformer
 */

import { describe, it, expect } from 'vitest';
import { toNumber } from './toNumber';

describe('toNumber', () => {
  it('converts string to number', () => {
    expect(toNumber('123')).toBe(123);
  });

  it('handles decimal numbers', () => {
    expect(toNumber('123.45')).toBe(123.45);
  });

  it('returns NaN for invalid input', () => {
    expect(toNumber('abc')).toBeNaN();
  });

  it('respects radix option', () => {
    expect(toNumber('1010', { radix: 2 })).toBe(10);
  });

  it('returns nanValue when result is NaN', () => {
    expect(toNumber('abc', { nanValue: -1 })).toBe(-1);
  });

  it('trims whitespace before parsing', () => {
    expect(toNumber('  42  ')).toBe(42);
  });
});

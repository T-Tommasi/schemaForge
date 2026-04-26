/**
 * Tests for trim normalizer
 */

import { describe, it, expect } from 'vitest';
import { trim } from './trim';

describe('trim', () => {
  it('removes leading and trailing whitespace', () => {
    expect(trim('  hello  ')).toBe('hello');
  });

  it('handles empty string', () => {
    expect(trim('')).toBe('');
  });

  it('handles only whitespace', () => {
    expect(trim('   ')).toBe('');
  });

  it('returns unchanged string with no whitespace', () => {
    expect(trim('hello')).toBe('hello');
  });

  it('handles tabs and newlines', () => {
    expect(trim('\t\nhello\t\n')).toBe('hello');
  });
});
